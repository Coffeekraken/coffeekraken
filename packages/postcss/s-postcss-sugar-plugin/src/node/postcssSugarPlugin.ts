// import __postcss from 'postcss';
import __SBench from '@coffeekraken/s-bench';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __STheme from '@coffeekraken/s-theme';
import { __sha256 } from '@coffeekraken/sugar/crypto';
import {
    __dirname,
    __folderHash,
    __folderPath,
    __writeFileSync,
} from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageCacheDir, __packageRootDir } from '@coffeekraken/sugar/path';
import { __unquote } from '@coffeekraken/sugar/string';
import { __replaceTokens } from '@coffeekraken/sugar/token';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __postcss from 'postcss';
import __getRoot from './utils/getRoot';

import { __compressVarName } from '@coffeekraken/sugar/css';
import { __objectHash } from '@coffeekraken/sugar/object';
import __CssVars from './CssVars';

const mixinsStack = {},
    functionsStack = {};
let pluginHash = __folderHash(__path.resolve(__dirname(), '../../..'), {
        include: {
            ctime: true,
        },
    }),
    rootDir;
let loadedPromise;

const _cacheObjById = {},
    _cachedIds = [];

export interface IPostcssSugarPluginSettings {
    outDir: string;
    cache?: boolean;
    cacheDir: string;
    cacheTtl: number;
    excludeByTypes?: string[];
    excludeCommentByTypes?: string[];
    excludeCodeByTypes?: string[];
    inlineImport?: boolean;
    target?: 'development' | 'production' | 'vite';
    partials: boolean;
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
            target: 'production',
            inlineImport: true,
            cache: false,
            cacheDir: `${__packageCacheDir()}/postcssSugarPlugin`,
            cacheTtl: 1000 * 60 * 60 * 24 * 7,
            partials: true,
            // @ts-ignore
        },
        settings,
    );
    // if (settings.partials === undefined) {
    //     settings.partials = settings.target !== 'vite';
    // }

    let themeHash, cacheDir;

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
            cache: __SSugarConfig.get('postcssSugarPlugin.cache'),
        });
        // if (settings.partials === undefined) {
        //     settings.partials = settings.target !== 'vite';
        // }

        // remove cache if not for vite target
        if (settings.cache === undefined && settings.target !== 'vite') {
            settings.cache = false;
        }

        // set theme hash
        themeHash = __STheme.hash();

        // set cache directory
        cacheDir = `${__packageCacheDir()}/postcssSugarPlugin`;

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
        _configLoaded = true;

        // update config
        updateConfig();

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

    // const _cacheHashById = {};
    // function saveCache(): string | string[] {
    //     // store the hash for the id
    //     if (!_cacheObjById[id]) _cacheObjById[id] = {};
    //     _cacheObjById[id].hash = hash;
    //     _cacheObjById[id].content = content;

    //     const cachePath = getCacheFilePath(hash);
    //     if (!__fs.existsSync(cachePath)) {
    //         console.log(
    //             `<yellow>[cache]</yellow> Caching object "<cyan>${id}</cyan>"`,
    //         );
    //         const returned = `
    //             /* CACHE:${hash} */
    //             ${Array.isArray(content) ? content.join('\n') : content}
    //             /* ENDCACHE:${hash} */
    //         `;
    //         _cacheObjById[id].return = returned;
    //     }
    //     console.log(
    //         `<green>[postcss]</green> Object "<cyan>${id}</cyan>" taken from cache`,
    //     );
    //     // const returned = `/* FROMCACHE:${hash} */`;
    //     try {
    //         const returned = __fs.readFileSync(cachePath, 'utf8').toString();
    //         _cacheObjById[id].return = returned;
    //         return returned;
    //     } catch (e) {}
    //     return content;
    // }

    function getCacheFilePath(cacheId) {
        const fileName = `${cacheId}.css`;
        return `${__packageCacheDir()}/postcssSugarPlugin/${pluginHash}/${fileName}`;
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

    function cleanCache() {
        __fs.readdirSync(`${settings.cacheDir}`).forEach((fileName) => {
            const filePath = `${settings.cacheDir}/${fileName}`;
            const fileStats = __fs.statSync(filePath);
            if (Date.now() > fileStats.birthtimeMs + settings.cacheTtl) {
                // delete the cache file
                __fs.unlinkSync(filePath);
            }
        });
    }

    function isCached(id: string): boolean {
        const cacheFilePath = `${settings.cacheDir}/${id}.txt`;
        return _cachedIds.includes(id) || __fs.existsSync(cacheFilePath);
    }

    const sharedData = {
        noScopes: [],
    };
    const postProcessorsRegisteredFn: Function[] = [];

    async function _loadFolder(folderPath, type: 'mixins' | 'functions') {
        // process some tokens
        folderPath = __replaceTokens(folderPath);

        // update plugin hash with these new folders hash
        const hashes = [
            pluginHash,
            __folderHash(folderPath, {
                include: {
                    ctime: true,
                },
            }),
        ];
        pluginHash = __sha256.encrypt(hashes.join('-'));

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
                if (value !== undefined) return value;
                return dotPathOrValue;
            }

            try {
                const result = await fnObject.fn({
                    params,
                    atRule,
                    settings,
                    cacheDir,
                    pluginHash,
                    themeHash,
                    themeValueProxy,
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

    const pluginObj = {
        postcssPlugin: 'sugar',
        async Once(root) {
            __SBench.start('postcssSugarPlugin');
            await _load();

            // const css = __fs
            //     .readFileSync(`${__packageRootDir()}/dist/css/index.dev.css`)
            //     .toString();

            // function replaceRecursively(str) {
            //     if (!str) {
            //         return '';
            //     }

            //     // console.log('SSS', str);

            //     const cacheMatches = [
            //         ...str.matchAll(
            //             /\/\*\!\sS-CACHE-START:([a-zA-Z0-9_=-]+)\s\*\//g,
            //         ),
            //     ];
            //     const cacheIds = __unique(
            //         cacheMatches.map((cacheMatch) => {
            //             return cacheMatch[1];
            //         }),
            //     );
            //     cacheIds.forEach((cacheId) => {
            //         const matches = [
            //             ...(str?.match?.(
            //                 new RegExp(
            //                     `\\/\\*! S-CACHE-START:${cacheId.trim()} \\*\\/`,
            //                     'g',
            //                 ),
            //             ) ?? []),
            //         ];
            //         matches.forEach((matchStartComment) => {
            //             const matchId = matchStartComment
            //                 .replace(/^\/\*\!\s/, '')
            //                 .replace(/\s\*\/$/, '')
            //                 .split(':')[1];

            //             const contentMatches = [
            //                 ...(str?.match?.(
            //                     new RegExp(
            //                         `\\/\\*! S-CACHE-START:${matchId.trim()} \\*\\/([\\W\\w]*)\\/\\*! S-CACHE-END:${matchId.trim()} \\*\\/`,
            //                         'g',
            //                     ),
            //                 ) ?? []),
            //             ];

            //             contentMatches.forEach((contentMatch) => {
            //                 let toCacheStr = contentMatch
            //                     .trim()
            //                     .replace(
            //                         new RegExp(
            //                             `^\\/\\*! S-CACHE-START:${matchId} \\*\\/`,
            //                         ),
            //                         '',
            //                     )
            //                     .replace(
            //                         new RegExp(
            //                             `\\/\\*! S-CACHE-END:${matchId} \\*\\/$`,
            //                         ),
            //                         '',
            //                     );

            //                 if (
            //                     toCacheStr.match(
            //                         /\/\*\!\sS-CACHE-START:[a-zA-Z0-9]+\s\*\//,
            //                     )
            //                 ) {
            //                     toCacheStr = replaceRecursively(toCacheStr);
            //                 }

            //                 // save to cache file
            //                 __writeFileSync(
            //                     `${settings.cacheDir}/${matchId}.txt`,
            //                     toCacheStr,
            //                 );

            //                 // return the new string with the S-CACHE-ENTRY comment
            //                 // replacing the actual content
            //                 str = str.replace(
            //                     contentMatch,
            //                     `
            //                     /*! S-CACHE-ENTRY:${matchId} */
            //                 `,
            //                 );
            //             });

            //             // console.log(contentMatches);
            //         });
            //     });

            //     // return the updated css
            //     return str;
            // }

            // console.log(replaceRecursively(css));

            // // const cacheMatches = [
            // //     ...css.matchAll(
            // //         /\/\*\!\sS-CACHE-START:([a-zA-Z0-9_=-]+)\s\*\//g,
            // //     ),
            // // ];
            // // const cacheIds = __unique(
            // //     cacheMatches.map((cacheMatch) => {
            // //         return cacheMatch[1];
            // //     }),
            // // );
            // // cacheIds.forEach((cacheId) => {
            // //     const match = [
            // //         ...css.matchAll(
            // //             new RegExp(
            // //                 `/*! S-CACHE-START:${cacheId.trim()} \\*\\/`,
            // //                 'g',
            // //             ),
            // //         ),
            // //     ];
            // //     console.log(match);
            // // });

            // // console.log(cacheIds);

            // throw 'coco';

            // // clean the cache
            // if (settings.cache) {
            //     __ensureDirSync(settings.cacheDir);
            //     // let cacheSize = await __folderSize(settings.cacheDir);
            //     console.log(
            //         `<yellow>[cache]</yellow> Maintaining cache integrity...`,
            //     );
            //     cleanCache();
            //     // cacheSize = await __folderSize(settings.cacheDir);
            //     console.log(`<green>[cache]</green> Cache integrity healthy`);
            // }

            if (root.source?.input?.from) {
                if (!rootDir) {
                    rootDir = __folderPath(root.source.input.from);
                }
            }
        },

        async OnceExit(root) {
            // // replace SCACHE comments by actual content
            // let loadedCacheById = {};
            // root.walkComments((comment) => {
            //     if (comment.text.startsWith('SCACHE:')) {
            //         const cacheId = comment.text.split(':')[1],
            //             cachePath = `${settings.cacheDir}/${cacheId}.txt`;
            //         if (
            //             !loadedCacheById[cacheId] &&
            //             __fs.existsSync(cachePath)
            //         ) {
            //             loadedCacheById[cacheId] = __fs
            //                 .readFileSync(cachePath)
            //                 .toString();
            //         }
            //         // console.log('replace', loadedCacheById[cacheId]);
            //         comment.replaceWith(loadedCacheById[cacheId]);
            //     }
            // });

            // replace S-CACHE-ENTRY comments by actual content
            let loadedCacheById = {};
            root.walkComments((comment) => {
                if (comment.text.startsWith('! S-CACHE-ENTRY:')) {
                    const cacheId = comment.text
                            .replace('! ', '')
                            .split(':')[1],
                        cachePath = `${settings.cacheDir}/${cacheId}.txt`;
                    if (
                        !loadedCacheById[cacheId] &&
                        __fs.existsSync(cachePath)
                    ) {
                        loadedCacheById[cacheId] = __fs
                            .readFileSync(cachePath)
                            .toString();
                    }
                    // console.log('replace', loadedCacheById[cacheId]);
                    comment.replaceWith(loadedCacheById[cacheId]);
                }
            });

            if (settings.cache) {
                const cachedContentById = {};
                root.walk((node) => {
                    if (
                        node.type === 'comment' &&
                        node.text.startsWith('! S-CACHE-START:')
                    ) {
                        const cacheId = node.text
                            .replace(/^!\s/, '')
                            .split(':')[1];
                        console.log('to cache', cacheId);
                        if (!cachedContentById[cacheId]) {
                            cachedContentById[cacheId] = {
                                active: true,
                                ended: false,
                                nodes: [],
                            };
                        }
                    } else if (
                        node.type === 'comment' &&
                        node.text.startsWith('! S-CACHE-END:')
                    ) {
                        const cacheId = node.text
                            .replace(/^!\s/, '')
                            .split(':')[1];
                        const cacheObj = cachedContentById[cacheId];
                        cacheObj?.ended = true;
                        cacheObj?.active = false;
                    } else {
                        for (let [id, cacheObj] of Object.entries(
                            cachedContentById,
                        )) {
                            if (cacheObj.active && !cacheObj.ended) {
                                cacheObj.nodes.push(node);
                            }
                        }
                    }
                });

                for (let [cacheId, cacheObj] of Object.entries(
                    cachedContentById,
                )) {
                    __writeFileSync(
                        `${settings.cacheDir}/${cacheId}.txt`,
                        nodesToString(cacheObj.nodes),
                    );
                }
            }

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
                    CssVars: __CssVars,
                    pluginHash,
                    themeHash,
                    cacheDir,
                    getRoot: __getRoot,
                    getCacheFilePath,
                    settings,
                    root,
                    sharedData,
                });
            }

            // compress --s-theme-... variables
            root.walkDecls((node) => {
                if (node.variable) {
                    if (node.prop.match(/--s-theme/)) {
                        const compressedProp = __compressVarName(node.prop);
                        node.prop = compressedProp;
                    }
                }

                const valueMatches = node.value.match(/--s-theme-[^,\)]+/gm);
                if (valueMatches) {
                    valueMatches.forEach((match) => {
                        node.value = node.value.replace(
                            match,
                            __compressVarName(match),
                        );
                    });
                }
            });

            __SBench.end('postcssSugarPlugin').log({
                body: `File: <cyan>${__path.relative(
                    __packageRootDir(),
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

                const mixinFn = mixinsStack[mixinId].fn;
                const mixinInterface = mixinsStack[mixinId].interface;

                const processedParams = await _processDeclaration(
                    atRule.params,
                    atRule,
                );

                const params = mixinInterface.apply(processedParams, {});

                let mixinResult,
                    mixinCacheId,
                    mixinCacheFilePath,
                    fromCache = false;

                // leverage cache if wanted
                if (settings.cache) {
                    mixinCacheId = __objectHash({
                        // pluginHash,
                        params,
                        name: atRule.name,
                        sharedData,
                        settings,
                    });
                    mixinCacheFilePath = `${settings.cacheDir}/${mixinCacheId}.txt`;

                    if (isCached(mixinCacheId)) {
                        mixinResult = `/*! S-CACHE-ENTRY:${mixinCacheId} */`;
                        fromCache = true;
                    }
                }

                // if no cache
                if (!fromCache) {
                    delete params.help;
                    mixinResult = await mixinFn({
                        params,
                        atRule,
                        findUp,
                        nodesToString,
                        CssVars: __CssVars,
                        pluginHash,
                        themeHash,
                        cacheDir,
                        getRoot: __getRoot,
                        getCacheFilePath,
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
                }

                if (mixinResult) {
                    mixinResult = contentToString(mixinResult);

                    if (fromCache) {
                        replaceWith(atRule, mixinResult);
                    } else if (settings.cache && mixinCacheId) {
                        if (!_cachedIds.includes(mixinCacheId)) {
                            _cachedIds.push(mixinCacheId);
                        }
                        replaceWith(
                            atRule,
                            `
                            /*! S-CACHE-START:${mixinCacheId} */
                            ${mixinResult}
                            /*! S-CACHE-END:${mixinCacheId} */
                        `,
                        );
                    }

                    // // save cache if wanted
                    // if (
                    //     !fromCache &&
                    //     settings.cache &&
                    //     mixinCacheFilePath &&
                    //     !__fs.existsSync(mixinCacheFilePath)
                    // ) {
                    //     __writeFileSync(mixinCacheFilePath, mixinResult);
                    // }
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
    return pluginObj;
};
plugin.postcss = true;
export const postcss = true;
export default plugin;
