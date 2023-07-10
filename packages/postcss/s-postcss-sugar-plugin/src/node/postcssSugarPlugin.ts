// import __postcss from 'postcss';
import __SEnv from '@coffeekraken/s-env';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __STheme from '@coffeekraken/s-theme';
import { __dirname, __folderHashSync } from '@coffeekraken/sugar/fs';
import { __deepMerge, __objectHash } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __unquote } from '@coffeekraken/sugar/string';
import { __replaceTokens } from '@coffeekraken/sugar/token';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __postcss from 'postcss';
import __getRoot from './utils/getRoot';

import __CssVars from './CssVars';

const mixinsStack = {},
    functionsStack = {};
const externalPackagesHashes: string[] = [];
let packageHash = __folderHashSync(__path.dirname(__dirname()));
let loadedPromise, compileFileTimeout;

import type { ISClassmapSettings } from '@coffeekraken/s-classmap';

const sharedData = {
    isPristine: true,
};

const frontData = {};

export interface IPostcssSugarPluginLodSettings {
    enabled: boolean;
    method: 'class' | 'file';
}

export interface IPostcssSugarPluginCleanSettings {
    variables: boolean;
}

export interface IPostcssSugarPluginSettings {
    outDir: string;
    lod: IPostcssSugarPluginLodSettings;
    classmap: ISClassmapSettings | false;
    clean: Partial<IPostcssSugarPluginCleanSettings>;
    excludeByTypes?: string[];
    excludeCommentByTypes?: string[];
    excludeCodeByTypes?: string[];
    inlineImport?: boolean;
    target?: 'development' | 'production' | 'vite';
    chunks: boolean;
    verbose: boolean;
    plugins: any[];
}

export function getFunctionsList() {
    return getMixinsOrFunctionsList('functions');
}
export function getMixinsList() {
    return getMixinsOrFunctionsList('mixins');
}

export function getMixinsOrFunctionsList(what: 'mixins' | 'functions') {
    // process some tokens
    const folderPath = __replaceTokens(`${__dirname()}/${what}`);
    const paths = __glob
        .sync(`${folderPath}/**/*.js`, {
            cwd: '',
        })
        .map((path) => {
            const relativePath = __path.relative(folderPath, path);
            let dotPath = relativePath
                    .replace(/\//g, '.')
                    .split('.')
                    .slice(0, -1)
                    .join('.'),
                dotCall = dotPath;
            const parts = dotPath.split('.');

            if (parts.slice(-2)[0] === parts.slice(-1)[0]) {
                dotCall = parts.slice(0, -1).join('.');
            }

            return {
                path,
                dotPath,
                dotCall,
            };
        });

    return paths;
}

let _configLoaded = false;

const plugin = (settings: IPostcssSugarPluginSettings = {}) => {
    settings = __deepMerge(
        {
            outDir: '',
            excludeByTypes: [],
            excludeCommentByTypes: [],
            excludeCodeByTypes: [],
            lod: {},
            classmap: {},
            clean: {
                variables: undefined,
            },
            target: __SEnv.get('target') ?? 'vite',
            plugins: [],
            chunks: true,
            verbose: __SEnv.is('verbose'),
        },
        settings,
    );

    let themeHash, settingsHash, bench;

    if (_configLoaded) {
        updateConfig();
    }

    function updateConfig() {
        settings = __deepMerge(settings, {
            outDir: __SSugarConfig.get('postcssSugarPlugin.outDir'),
            excludeByTypes: __SSugarConfig.get(
                'postcssSugarPlugin.excludeByTypes',
            ),
            excludeCommentByTypes: __SSugarConfig.get(
                'postcssSugarPlugin.excludeCommentByTypes',
            ),
            excludeCodeByTypes: __SSugarConfig.get(
                'postcssSugarPlugin.excludeCodeByTypes',
            ),
            classmap: __SSugarConfig.get('postcssSugarPlugin.classmap'),
            clean: __SSugarConfig.get('postcssSugarPlugin.clean'),
            lod: __STheme.get('lod'),
        });

        // clean if set to undefined and target is production
        if (settings.target === 'production') {
            if (settings.clean.variables === undefined) {
                settings.clean.variables = true;
            }
        }

        // lod method if the target is not production
        if (settings.target !== 'production') {
            if (
                settings.lod.method !== 'class' &&
                !_configLoaded &&
                sharedData.isPristine
            ) {
                console.log(
                    `<yellow>[postcssSugarPlugin]</yellow> You're lod.method setting has been updated to "<magenta>class</magenta>" cause the "<yellow>${settings.lod.method}</yellow>" method is only available for "<cyan>production</cyan>" target...`,
                );
            }
            settings.lod.method = 'class';
        }

        // set the settings hash
        settingsHash = __objectHash(settings);

        // set theme hash
        themeHash = __STheme.hash();

        if (settings.excludeByTypes?.length) {
            __CssVars.excludeByTypes(settings.excludeByTypes);
        }
        if (settings.excludeCommentByTypes?.length) {
            __CssVars.excludeCommentByTypes(settings.excludeCommentByTypes);
        }
        if (settings.excludeCodeByTypes?.length) {
            __CssVars.excludeCodeByTypes(settings.excludeCodeByTypes);
        }
    }

    async function _loadConfig() {
        await __SSugarConfig.load();

        // update config
        updateConfig();

        _configLoaded = true;
        return true;
    }

    function contentToArray(content) {
        if (content instanceof __CssVars) {
            content = content.toString();
        }
        if (!Array.isArray(content)) content = [content];
        return content;
    }

    function contentToString(content) {
        return contentToArray(content).join('\n');
    }

    function findUp(node, checker) {
        if (!node) return;
        const res = checker(node);
        if (!res && node.parent) return findUp(node.parent, checker);
        else if (res) return res;
        return;
    }

    function nodesToString(nodes) {
        return nodes
            .map((node) => node.toString())
            .map((l) => l.trim())
            .map((n) => {
                if (!n.match(/(\{|\}|\*\/|;)$/)) n += ';';
                return n;
            })
            .join('\n');
    }

    function replaceWith(atRule, nodes) {
        nodes = contentToArray(nodes);

        if (atRule.parent) {
            let finalNodes: any[] = [];

            nodes
                .map((n) => (typeof n === 'string' ? n.trim() : n))
                .forEach((n) => {
                    if (typeof n === 'string') {
                        finalNodes = [
                            ...finalNodes,
                            ...(__postcss.parse(n).nodes ?? []),
                        ];
                    } else {
                        finalNodes.push(n);
                    }
                });

            for (const node of finalNodes.reverse()) {
                if (!node) continue;
                atRule.parent.insertAfter(atRule, node);
            }
        }
        atRule.remove();
    }

    const postProcessorsRegisteredFn: Function[] = [];

    async function _loadFolder(folderPath, type: 'xins' | 'functions') {
        // process some tokens
        folderPath = __replaceTokens(folderPath);

        // update plugin hash with these new folders hash
        externalPackagesHashes.push(__folderHashSync(folderPath));

        const paths = __glob.sync(`${folderPath}/**/*.js`, {
            // cwd: __dirname(),
            cwd: '',
        });

        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            const {
                default: fn,
                interface: int,
                dependencies,
            } = await import(path);
            if (type === 'mixins') {
                mixinsStack[
                    `${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')
                        .toLowerCase()}`
                ] = {
                    path,
                    fn,
                    interface: int,
                    dependencies,
                };
                mixinsStack[
                    `${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')}`
                ] = {
                    path,
                    fn,
                    interface: int,
                    dependencies,
                };
            } else {
                functionsStack[
                    `${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')
                        .toLowerCase()}`
                ] = {
                    path,
                    fn,
                    interface: int,
                    dependencies,
                };
                functionsStack[
                    `${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')}`
                ] = {
                    path,
                    fn,
                    interface: int,
                    dependencies,
                };
            }
        }
    }

    async function _processDeclaration(value: string, atRule?: any) {
        // replace vh units
        const vhMatches = value.match(/(var\(--vh,)?([0-9\.]+)vh(\s|;)?/gm);
        if (vhMatches) {
            vhMatches.forEach((match) => {
                if (match.match(/^var\(--vh,/)) return;
                const val = match.replace('vh', '');
                value = value.replace(match, `calc(${val} * var(--vh,1vh)) `);
            });
        }
        if (!value.match(/\s?sugar\.[a-zA-Z0-9]+.*/)) return value;

        const calls = value.match(
            /@?sugar\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,){0,999999999999999999999}\)/gm,
        );

        if (!calls || !calls.length) return value;

        for (let i = 0; i < calls.length; i++) {
            let sugarStatement: string = calls[i] ?? '';

            // FIX. sugarStatement comes with none corresponding count of "(" and ")"
            const openingParenthesisCount = (sugarStatement.match(/\(/g) || [])
                .length;
            const closingParenthesisCount = (sugarStatement.match(/\)/g) || [])
                .length;

            if (openingParenthesisCount > closingParenthesisCount) {
                sugarStatement += ')'.repeat(
                    openingParenthesisCount - closingParenthesisCount,
                );
            }

            let stack = functionsStack;
            if (sugarStatement.trim().match(/^\@/)) {
                stack = mixinsStack;
            }

            // @ts-ignore
            const functionName = sugarStatement.match(
                /sugar\.([a-zA-Z0-9\.]+)/,
            )[1];
            const paramsStatement = sugarStatement.replace(
                /sugar\.[a-zA-Z0-9\.]+/,
                '',
            );

            let fnId = functionName;
            if (!stack[fnId]) {
                fnId = `${fnId}.${fnId.split('.').slice(-1)[0]}`;
            }

            const fnObject = stack[fnId];

            if (!fnObject) {
                throw new Error(
                    `<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${fnId}</yellow>" does not exists...`,
                );
            }

            const functionInterface = stack[fnId].interface;
            const params = functionInterface.apply(paramsStatement, {});
            delete params.help;

            function themeValueProxy(dotPathOrValue: string): any {
                const value = __STheme.getSafe(dotPathOrValue);
                if (value !== undefined) {
                    return value;
                }
                if (dotPathOrValue.match(/^ui\.[a-zA-Z0-9]+\./)) {
                    const defaultValue = __STheme.getSafe(
                        dotPathOrValue.replace(
                            /^ui\.[a-zA-Z0-9]+\./,
                            'ui.default.',
                        ),
                    );
                    if (defaultValue !== undefined) {
                        return defaultValue;
                    }
                }
                return dotPathOrValue;
            }

            try {
                const result = await fnObject.fn({
                    params,
                    atRule,
                    settings,
                    // cacheDir,
                    packageHash,
                    themeHash,
                    themeValueProxy,
                });
                value = value.replace(sugarStatement, result);
            } catch (e) {
                console.log(e.message);
                throw e;
            }
        }
        return value;
    }

    function _load() {
        if (loadedPromise) return loadedPromise;
        loadedPromise = new Promise(async (resolve, reject) => {
            // load config
            await _loadConfig();

            // func sugar json
            const sugarJsonInstance = new __SSugarJson();
            const sugarJson = await sugarJsonInstance.read();

            for (let i = 0; i < Object.keys(sugarJson).length; i++) {
                const packageName = Object.keys(sugarJson)[i];
                const packageSugarJson = sugarJson[packageName];
                if (!packageSugarJson.postcss) continue;

                // mixins loading
                const mixinsFolders =
                    packageSugarJson.postcss.folders?.mixins ?? [];
                for (let j = 0; j < mixinsFolders.length; j++) {
                    const folderObj = mixinsFolders[j];

                    if (!folderObj.path) continue;
                    const finalPath = __replaceTokens(
                        __path.resolve(
                            packageSugarJson.metas.folderPath,
                            folderObj.path,
                        ),
                    );

                    await _loadFolder(finalPath, 'mixins');
                }

                // functions loading
                const functionsFolders =
                    packageSugarJson.postcss.folders?.functions ?? [];
                for (let j = 0; j < functionsFolders.length; j++) {
                    const folderObj = functionsFolders[j];

                    if (!folderObj.path) continue;
                    const finalPath = __replaceTokens(
                        __path.resolve(
                            packageSugarJson.metas.folderPath,
                            folderObj.path,
                        ),
                    );

                    await _loadFolder(finalPath, 'functions');
                }
            }

            // list all mixins
            await _loadFolder(`${__dirname()}/mixins`, 'mixins');

            // list all functions
            await _loadFolder(`${__dirname()}/functions`, 'functions');

            resolve(true);
        });
        return loadedPromise;
    }

    /**
     * Run the postProcessors on the passed AST
     *
     * @async
     */
    async function postProcessors(root) {
        for (let i = 0; i < postProcessorsRegisteredFn.length; i++) {
            const fn = postProcessorsRegisteredFn[i];
            await fn(root);
        }

        const postProcessorsPaths = __glob
            .sync('**/*.js', {
                cwd: `${__dirname()}/postProcessors`,
            })
            // just to ensure lod are last
            .sort((a, b) => {
                if (a.includes('lod')) {
                    return 1;
                }
                return 0;
            });

        for (let i = 0; i < postProcessorsPaths.length; i++) {
            const path = postProcessorsPaths[i];

            const { default: processorFn } = await import(
                `${__dirname()}/postProcessors/${path}`
            );
            await processorFn({
                CssVars: __CssVars,
                packageHash,
                themeHash,
                postcssApi: __postcss,
                getRoot: __getRoot,
                settings,
                root,
                sharedData,
                frontData,
            });
        }

        return root;
    }

    const pluginObj = {
        postcssPlugin: 'sugar',
        async Once(root, ...args) {
            // save the rootFilePath in shared data
            // for use in mixins, postcss, etc...
            if (!sharedData.rootFilePath) {
                sharedData.rootFilePath = root.source?.input?.file;
            }

            // bench = new __SBench(
            //     `postcssSugarPlugin.${root.source.input.file
            //         ?.replace(__packageRootDir(), '')
            //         .replace(
            //             __packageRootDir(process.cwd(), {
            //                 highest: true,
            //             }),
            //             '',
            //         )}`,
            // );
            await _load();

            // calculate the final hash depending on the
            // packageHash, settingsHash and themeHash
            // cacheHash = `${packageHash}-${settingsHash}-${themeHash}-${__base64.encrypt(
            //     externalPackagesHashes.join('-'),
            // )}`;

            // message when a file takes time to compile
            clearTimeout(compileFileTimeout);
            compileFileTimeout = setTimeout(() => {
                console.log(
                    `<yellow>[postcss]</yellow> Your file <cyan>${__path.relative(
                        __packageRootDir(),
                        root.source.input.file,
                    )}</cyan> take some times to compile. Please wait...`,
                );
            }, 3000);
        },

        async OnceExit(root) {
            // post processors
            await postProcessors(root);

            // front data only in the main file
            if (Object.keys(frontData).length) {
                root.nodes.push(
                    __postcss.rule({
                        selector: 'body:after',
                        nodes: __postcss
                            .parse(
                                `
                    display: none;
                    content: '${JSON.stringify(frontData ?? {})}';
                `,
                            )
                            .nodes.map((decl) => {
                                decl.value += ';';
                                return decl;
                            }),
                    }),
                );
            }

            // end the bench
            // bench.end();

            // mark the plugin as not pristine anymore... slut... :)
            sharedData.isPristine = false;
        },
        async AtRule(atRule, postcssApi) {
            if (atRule.name.match(/^sugar\./)) {
                let mixinId = atRule.name.replace(/^sugar\./, '');

                if (!mixinsStack[mixinId]) {
                    mixinId = `${mixinId}.${mixinId.split('.').slice(-1)[0]}`;
                }

                if (!mixinsStack[mixinId]) {
                    throw new Error(
                        `<red>[postcssSugarPlugin]</red> Sorry but the requested sugar mixin "<yellow>${atRule.name}</yellow>" does not exists...`,
                    );
                }

                const root = __getRoot(atRule);
                const sourcePath =
                    typeof root.source.input.file === 'string'
                        ? __path.dirname(root.source.input.file)
                        : __dirname();

                const mixinFn = mixinsStack[mixinId].fn;
                const mixinInterface = mixinsStack[mixinId].interface;

                const processedParams = await _processDeclaration(
                    atRule.params,
                    atRule,
                );

                const params = mixinInterface.apply(processedParams, {});

                let mixinResult;

                delete params.help;
                mixinResult = await mixinFn({
                    params,
                    atRule,
                    findUp,
                    nodesToString,
                    CssVars: __CssVars,
                    packageHash,
                    themeHash,
                    // cacheDir,
                    getRoot: __getRoot,
                    replaceWith(nodes) {
                        replaceWith(atRule, nodes);
                    },
                    atRootStart(css) {
                        const root = __getRoot(atRule);
                        root.prepend(css);
                    },
                    atRootEnd(css) {
                        const root = __getRoot(atRule);
                        root.append(css);
                    },
                    postcssApi,
                    sourcePath,
                    sharedData,
                    frontData,
                    registerPostProcessor(fn: Function) {
                        postProcessorsRegisteredFn.push(fn);
                    },
                    postcss: __postcss,
                    settings,
                });

                if (mixinResult) {
                    mixinResult = contentToString(mixinResult);
                    replaceWith(atRule, mixinResult);
                }
            } else if (atRule.name.match(/^import/)) {
                // check settings
                if (settings.target === 'vite') return;

                // do not take care of imported assets using url('...');
                if (atRule.params.match(/^url\(/)) return;

                // do not take care of imported assets that are not "local"
                // and that starts by https?
                if (atRule.params.match(/^https?:\/\//)) return;

                // if (!atRule.source?.input) {
                //     throw new Error(
                //         `Make sure to import your stylesheets using the "<cyan>@import url(...);</cyan>" syntax and not the "<red>@import '...';</red>" one...`,
                //     );
                // }

                const dirName =
                    typeof atRule.source?.input?.file === 'string'
                        ? __path.dirname(atRule.source.input.file)
                        : __dirname();

                const path = __path.resolve(dirName, __unquote(atRule.params));

                if (!__fs.existsSync(path)) {
                    throw new Error(
                        `<red>[postcssSugarPlugin.@import]</red> You try to load the file "<yellow>${path}</yellow>" but this file does not exists`,
                    );
                }

                const contentStr = __fs.readFileSync(path, 'utf8').toString();

                atRule.after(contentStr);
                atRule.remove();
            }
        },
        async Declaration(decl) {
            if (!decl.prop) return;

            decl.value = await _processDeclaration(decl.value);
        },
    };
    return pluginObj;
};
plugin.postcss = true;
export const postcss = true;
export default plugin;
