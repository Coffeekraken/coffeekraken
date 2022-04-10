// import __postcss from 'postcss';
import __SBench from '@coffeekraken/s-bench';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __packageCacheDir from '@coffeekraken/sugar/node/path/packageCacheDir';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __STheme from '@coffeekraken/s-theme';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __unquote from '@coffeekraken/sugar/shared/string/unquote';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __postcss from 'postcss';
import __folderHash from '@coffeekraken/sugar/node/fs/folderHash';
import __getRoot from './utils/getRoot';
import __dependenciesHash from '@coffeekraken/sugar/node/dependencies/dependenciesHash';
import __cacache from 'cacache';
import __nodeCache from 'node-cache';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __fileHash from '@coffeekraken/sugar/node/fs/fileHash';
import __objectHash from '@coffeekraken/sugar/shared/object/objectHash';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __stripDocblocks from '@coffeekraken/sugar/shared/string/stripDocblocks';
import __urlCompliant from '@coffeekraken/sugar/shared/string/urlCompliant';
import __fileName from '@coffeekraken/sugar/node/fs/filename';
import __replaceTokens from '@coffeekraken/sugar/node/token/replaceTokens';

let _mixinsPaths;

const mixinsStack = {},
    functionsStack = {};
let pluginHash = __folderHash(__path.resolve(__dirname(), '../../..'), {
        include: {
            ctime: true,
        },
    }),
    rootDir;
let loadedPromise,
    alreadyLoaded = false;

const _cacheObjById = {};

pluginHash = 'hhh';

const plugin = (settings: any = {}) => {
    settings = __deepMerge(
        {
            target: 'prod',
            inlineImport: true,
            cache: true,
        },
        settings,
    );

    settings.cache = false;

    // remove cache if not for vite target
    if (settings.target !== 'vite') {
        settings.cache = false;
    }

    function contentToArray(content) {
        if (content instanceof CssVars) {
            content = content._stack;
        }
        if (!Array.isArray(content)) content = [content];
        return content;
    }

    function contentToString(content) {
        return contentToArray(content).join('\n');
    }

    function findUp(node, checker) {
        const res = checker(node);
        if (!res && node.parent) return findUp(node.parent, checker);
        else if (res) return res;
        return;
    }

    const _cacheHashById = {};
    function cache(id, hash, content: string | string[]): string | string[] {
        if (!settings.cache) return content;

        // store the hash for the id
        if (!_cacheObjById[id]) _cacheObjById[id] = {};
        _cacheObjById[id].hash = hash;
        _cacheObjById[id].content = content;

        const cachePath = getCacheFilePath(hash);
        if (!__fs.existsSync(cachePath)) {
            console.log(
                `<yellow>[cache]</yellow> Caching object "<cyan>${id}</cyan>"`,
            );
            const returned = `
                /* CACHE:${hash} */
                ${Array.isArray(content) ? content.join('\n') : content}
                /* ENDCACHE:${hash} */
            `;
            _cacheObjById[id].return = returned;
        }
        console.log(
            `<green>[postcss]</green> Object "<cyan>${id}</cyan>" taken from cache`,
        );
        // const returned = `/* FROMCACHE:${hash} */`;
        try {
            const returned = __fs.readFileSync(cachePath, 'utf8').toString();
            _cacheObjById[id].return = returned;
            return returned;
        } catch (e) {}
        return content;
    }

    function getCacheFilePath(cacheId) {
        const fileName = `${cacheId}.css`;
        return `${__packageCacheDir()}/postcssSugarPlugin/${pluginHash}/${fileName}`;
    }

    function applyNoScopes(scopes: string[], fromNode): string[] {
        const noScopeRule = findUp(fromNode, (node) => {
            if (node?.name === 'sugar.scope.no') return node;
            return;
        });
        if (noScopeRule && noScopeRule.params) {
            const noScopes = noScopeRule.params
                .trim()
                .replace(/^\(/, '')
                .replace(/\)$/, '')
                .split(/[,\s]/)
                .map((l) => l.trim());

            const newScopes = scopes.filter((scope) => {
                return noScopes.indexOf(scope) === -1;
            });
            return newScopes;
        }
        return scopes;
    }

    function commentsNeeded() {
        return settings.target !== 'vite';
    }

    function replaceWith(atRule, nodes) {
        nodes = contentToArray(nodes);

        // atRule.walkComments((comment) => {
        //     comment.remove();
        // });

        // let isAllText = true;
        // nodes.forEach((n) => {
        //     if (!isAllText) return;
        //     if (typeof n !== 'string') isAllText = false;
        // });
        // if (isAllText) nodes = [nodes.join('\n')];

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

    const sharedData = {
        noScopes: [],
    };
    const postProcessorsRegisteredFn: Function[] = [];

    async function _loadFolder(folderPath, type: 'mixins' | 'functions') {
        // process some tokens
        folderPath = __replaceTokens(folderPath);

        const paths = __glob.sync(`${folderPath}/**/*.js`, {
            // cwd: __dirname(),
            cwd: '',
        });
        for (let i = 0; i < paths.length; i++) {
            const path = paths[i];
            const { default: fn, interface: int, dependencies } = await import(
                `${path}`
            );
            if (type === 'mixins') {
                mixinsStack[
                    `${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')
                        .toLowerCase()}`
                ] = {
                    path,
                    mixin: fn,
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
                    mixin: fn,
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

    async function _processDeclaration(value: string) {
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
            /sugar\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,){0,999999999999999999999}\)/gm,
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

            // @ts-ignore
            const functionName = sugarStatement.match(
                /sugar\.([a-zA-Z0-9\.]+)/,
            )[1];
            const paramsStatement = sugarStatement.replace(
                /sugar\.[a-zA-Z0-9\.]+/,
                '',
            );

            let fnId = functionName;
            if (!functionsStack[fnId]) {
                fnId = `${fnId}.${fnId.split('.').slice(-1)[0]}`;
            }

            const fnObject = functionsStack[fnId];

            if (!fnObject) {
                throw new Error(
                    `<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${fnId}</yellow>" does not exists...`,
                );
            }

            const functionInterface = functionsStack[fnId].interface;
            const params = functionInterface.apply(paramsStatement, {});
            delete params.help;

            try {
                const result = await fnObject.fn({
                    params,
                    settings,
                });
                value = value.replace(sugarStatement, result);
            } catch (e) {
                console.error(e.message);
            }
        }
        return value;
    }

    function _load() {
        if (loadedPromise) return loadedPromise;
        loadedPromise = new Promise(async (resolve, reject) => {
            // sugar config
            await __SSugarConfig.load();

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
                    const finalPath = __path.resolve(
                        packageSugarJson.metas.folderPath,
                        folderObj.path,
                    );

                    await _loadFolder(finalPath, 'mixins');
                }

                // functions loading
                const functionsFolders =
                    packageSugarJson.postcss.folders?.functions ?? [];
                for (let j = 0; j < functionsFolders.length; j++) {
                    const folderObj = functionsFolders[j];

                    if (!folderObj.path) continue;
                    const finalPath = __path.resolve(
                        packageSugarJson.metas.folderPath,
                        folderObj.path,
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

    class CssVars {
        _stack: string[] = [];
        constructor(str) {
            if (str) this._stack.push(str);
        }
        comment(str) {
            if (!commentsNeeded()) return this;
            if (typeof str === 'function') str = str();
            if (Array.isArray(str)) str = str.join('\n');
            this._stack.push(str);
            return this;
        }
        code(str) {
            if (typeof str === 'function') str = str();
            if (Array.isArray(str)) str = str.join('\n');
            this._stack.push(str);
            return this;
        }
        toString() {
            return this._stack.join('\n');
        }
    }

    return {
        postcssPlugin: 'sugar',
        async Once(root) {
            __SBench.start('postcssSugarPlugin');

            await _load();

            if (root.source?.input?.from) {
                if (!rootDir) {
                    rootDir = __folderPath(root.source.input.from);
                }

                const fileHash = __fileHash(root.source.input.from, {
                    include: {
                        ctime: true,
                    },
                });
                const hash = __objectHash({
                    fileHash,
                    theme: __STheme.hash,
                });
            }
        },

        async OnceExit(root) {
            for (let i = 0; i < postProcessorsRegisteredFn.length; i++) {
                const fn = postProcessorsRegisteredFn[i];
                await fn(root);
            }

            const postProcessorsPaths = __glob.sync('**/*.js', {
                cwd: `${__dirname()}/postProcessors`,
            });

            for (let i = 0; i < postProcessorsPaths.length; i++) {
                const path = postProcessorsPaths[i];
                const { default: processorFn } = await import(
                    `${__dirname()}/postProcessors/${path}`
                );
                await processorFn({
                    root,
                    sharedData,
                });
            }

            let cssStr = root.toString();

            // CACHE
            const cacheMatches = cssStr.match(
                /\/\*\sCACHE:[a-zA-Z0-9@\._-]+\s\*\//gm,
            );
            cacheMatches?.forEach((cacheStr) => {
                const cacheId = cacheStr
                    .replace('/* CACHE:', '')
                    .replace(' */', '')
                    .trim();
                const toCache = cssStr.match(
                    new RegExp(
                        `\\/\\*\\sCACHE:${cacheId}\\s\\*\\/(.|\\r|\\t|\\n)*\\/\\*\\sENDCACHE:${cacheId}\\s\\*\\/`,
                        'g',
                    ),
                );
                if (!toCache) return;

                const cachePath = getCacheFilePath(cacheId);

                const toCacheStr = toCache[0]
                    .replace(`/* CACHE:${cacheId} */`, '')
                    .replace(`/* ENDCACHE:${cacheId} */`, '');
                __writeFileSync(cachePath, toCacheStr);
            });

            // root.walkComments((comment) => {
            //     if (comment.text.trim().match(/FROMCACHE:[a-zA-Z0-9@\._-]+/)) {

            //         const parts = comment.text.split(':').map(l => l.trim());

            //         const cacheHash = parts[1];
            //         const cacheId = parts[2];
            //         const fileName = `${cacheHash}.css`;
            //         const cacheUrl = getCacheFilePath(cacheHash);

            //         const cachedCss = __fs.readFileSync(cacheUrl).toString();

            //         // let newRule = __postcss.parse(`@import "${cacheUrl}";`);
            //         // if (settings.target === 'vite') {
            //         //     newRule = __postcss.parse(`@import url("${cacheUrl}");`);
            //         // }

            //         root.append(cachedCss);

            //         // comment.remove();
            //         // root.prepend(newRule);

            //         // comment.replaceWith(newRule);
            //     }
            // });

            __SBench.end('postcssSugarPlugin').log({
                body: `File: <cyan>${__path.relative(
                    __packageRoot(),
                    root.source?.input?.from,
                )}</cyan>`,
            });
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

                const mixinFn = mixinsStack[mixinId].mixin;
                const mixinInterface = mixinsStack[mixinId].interface;

                const processedParams = await _processDeclaration(
                    atRule.params,
                );
                const params = mixinInterface.apply(processedParams, {});

                delete params.help;
                let result = await mixinFn({
                    params,
                    atRule,
                    findUp,
                    cache,
                    CssVars,
                    pluginHash,
                    getRoot: __getRoot,
                    getCacheFilePath,
                    commentsNeeded,
                    applyNoScopes(scopes = []) {
                        return applyNoScopes(scopes, atRule);
                    },
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
                    registerPostProcessor(fn: Function) {
                        postProcessorsRegisteredFn.push(fn);
                    },
                    postcss: __postcss,
                    settings,
                });

                if (result) {
                    result = contentToString(result);
                    replaceWith(atRule, result);
                }
            } else if (atRule.name.match(/^import/)) {
                // check settings
                if (!settings.inlineImport) return;

                // do not take care of imported assets using url('...');
                if (atRule.params.match(/^url\(/)) return;

                if (!atRule.source?.input) {
                    throw new Error(
                        `Make sure to import your stylesheets using the "<cyan>@import url(...);</cyan>" syntax and not the "<red>@import '...';</red>" one...`,
                    );
                }

                const dirName =
                    typeof atRule.source.input.file === 'string'
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
};
plugin.postcss = true;
export const postcss = true;
export default plugin;
