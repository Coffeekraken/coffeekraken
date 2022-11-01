var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// import __postcss from 'postcss';
import __SBench from '@coffeekraken/s-bench';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __STheme from '@coffeekraken/s-theme';
import { __sha256 } from '@coffeekraken/sugar/crypto';
import { __dirname, __folderHash, __folderPath, __writeFileSync, } from '@coffeekraken/sugar/fs';
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
const mixinsStack = {}, functionsStack = {};
let pluginHash = __folderHash(__path.resolve(__dirname(), '../../..'), {
    include: {
        ctime: true,
    },
}), rootDir;
let loadedPromise;
const _cacheObjById = {}, _cachedIds = [];
export function getFunctionsList() {
    return getMixinsOrFunctionsList('functions');
}
export function getMixinsList() {
    return getMixinsOrFunctionsList('mixins');
}
export function getMixinsOrFunctionsList(what) {
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
            .join('.'), dotCall = dotPath;
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
const plugin = (settings = {}) => {
    settings = __deepMerge({
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
    }, settings);
    // if (settings.partials === undefined) {
    //     settings.partials = settings.target !== 'vite';
    // }
    let themeHash, cacheDir;
    if (_configLoaded) {
        updateConfig();
    }
    function updateConfig() {
        var _a, _b, _c;
        settings = __deepMerge(settings, {
            outDir: __SSugarConfig.get('postcssSugarPlugin.outDir'),
            excludeByTypes: __SSugarConfig.get('postcssSugarPlugin.excludeByTypes'),
            excludeCommentByTypes: __SSugarConfig.get('postcssSugarPlugin.excludeCommentByTypes'),
            excludeCodeByTypes: __SSugarConfig.get('postcssSugarPlugin.excludeCodeByTypes'),
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
        if ((_a = settings.excludeByTypes) === null || _a === void 0 ? void 0 : _a.length) {
            __CssVars.excludeByTypes(settings.excludeByTypes);
        }
        if ((_b = settings.excludeCommentByTypes) === null || _b === void 0 ? void 0 : _b.length) {
            __CssVars.excludeCommentByTypes(settings.excludeCommentByTypes);
        }
        if ((_c = settings.excludeCodeByTypes) === null || _c === void 0 ? void 0 : _c.length) {
            __CssVars.excludeCodeByTypes(settings.excludeCodeByTypes);
        }
    }
    function _loadConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            yield __SSugarConfig.load();
            _configLoaded = true;
            // update config
            updateConfig();
            return true;
        });
    }
    function contentToArray(content) {
        if (content instanceof __CssVars) {
            content = content.toString();
        }
        if (!Array.isArray(content))
            content = [content];
        return content;
    }
    function contentToString(content) {
        return contentToArray(content).join('\n');
    }
    function findUp(node, checker) {
        if (!node)
            return;
        const res = checker(node);
        if (!res && node.parent)
            return findUp(node.parent, checker);
        else if (res)
            return res;
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
            if (!n.match(/(\{|\}|\*\/|;)$/))
                n += ';';
            return n;
        })
            .join('\n');
    }
    function replaceWith(atRule, nodes) {
        nodes = contentToArray(nodes);
        if (atRule.parent) {
            let finalNodes = [];
            nodes
                .map((n) => (typeof n === 'string' ? n.trim() : n))
                .forEach((n) => {
                var _a;
                if (typeof n === 'string') {
                    finalNodes = [
                        ...finalNodes,
                        ...((_a = __postcss.parse(n).nodes) !== null && _a !== void 0 ? _a : []),
                    ];
                }
                else {
                    finalNodes.push(n);
                }
            });
            for (const node of finalNodes.reverse()) {
                if (!node)
                    continue;
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
    function isCached(id) {
        const cacheFilePath = `${settings.cacheDir}/${id}.txt`;
        return _cachedIds.includes(id) || __fs.existsSync(cacheFilePath);
    }
    const sharedData = {
        noScopes: [],
    };
    const postProcessorsRegisteredFn = [];
    function _loadFolder(folderPath, type) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const { default: fn, interface: int, dependencies, } = yield import(path);
                if (type === 'mixins') {
                    mixinsStack[`${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')
                        .toLowerCase()}`] = {
                        path,
                        fn,
                        interface: int,
                        dependencies,
                    };
                    mixinsStack[`${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')}`] = {
                        path,
                        fn,
                        interface: int,
                        dependencies,
                    };
                }
                else {
                    functionsStack[`${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')
                        .toLowerCase()}`] = {
                        path,
                        fn,
                        interface: int,
                        dependencies,
                    };
                    functionsStack[`${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')}`] = {
                        path,
                        fn,
                        interface: int,
                        dependencies,
                    };
                }
            }
        });
    }
    function _processDeclaration(value, atRule) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            // replace vh units
            const vhMatches = value.match(/(var\(--vh,)?([0-9\.]+)vh(\s|;)?/gm);
            if (vhMatches) {
                vhMatches.forEach((match) => {
                    if (match.match(/^var\(--vh,/))
                        return;
                    const val = match.replace('vh', '');
                    value = value.replace(match, `calc(${val} * var(--vh,1vh)) `);
                });
            }
            if (!value.match(/\s?sugar\.[a-zA-Z0-9]+.*/))
                return value;
            const calls = value.match(/@?sugar\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,){0,999999999999999999999}\)/gm);
            if (!calls || !calls.length)
                return value;
            for (let i = 0; i < calls.length; i++) {
                let sugarStatement = (_a = calls[i]) !== null && _a !== void 0 ? _a : '';
                // FIX. sugarStatement comes with none corresponding count of "(" and ")"
                const openingParenthesisCount = (sugarStatement.match(/\(/g) || [])
                    .length;
                const closingParenthesisCount = (sugarStatement.match(/\)/g) || [])
                    .length;
                if (openingParenthesisCount > closingParenthesisCount) {
                    sugarStatement += ')'.repeat(openingParenthesisCount - closingParenthesisCount);
                }
                let stack = functionsStack;
                if (sugarStatement.trim().match(/^\@/)) {
                    stack = mixinsStack;
                }
                // @ts-ignore
                const functionName = sugarStatement.match(/sugar\.([a-zA-Z0-9\.]+)/)[1];
                const paramsStatement = sugarStatement.replace(/sugar\.[a-zA-Z0-9\.]+/, '');
                let fnId = functionName;
                if (!stack[fnId]) {
                    fnId = `${fnId}.${fnId.split('.').slice(-1)[0]}`;
                }
                const fnObject = stack[fnId];
                if (!fnObject) {
                    throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${fnId}</yellow>" does not exists...`);
                }
                const functionInterface = stack[fnId].interface;
                const params = functionInterface.apply(paramsStatement, {});
                delete params.help;
                function themeValueProxy(dotPathOrValue) {
                    const value = __STheme.getSafe(dotPathOrValue);
                    if (value !== undefined)
                        return value;
                    return dotPathOrValue;
                }
                try {
                    const result = yield fnObject.fn({
                        params,
                        atRule,
                        settings,
                        cacheDir,
                        pluginHash,
                        themeHash,
                        themeValueProxy,
                    });
                    value = value.replace(sugarStatement, result);
                }
                catch (e) {
                    console.error(e.message);
                }
            }
            return value;
        });
    }
    function _load() {
        if (loadedPromise)
            return loadedPromise;
        loadedPromise = new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            // load config
            yield _loadConfig();
            // func sugar json
            const sugarJsonInstance = new __SSugarJson();
            const sugarJson = yield sugarJsonInstance.read();
            for (let i = 0; i < Object.keys(sugarJson).length; i++) {
                const packageName = Object.keys(sugarJson)[i];
                const packageSugarJson = sugarJson[packageName];
                if (!packageSugarJson.postcss)
                    continue;
                // mixins loading
                const mixinsFolders = (_b = (_a = packageSugarJson.postcss.folders) === null || _a === void 0 ? void 0 : _a.mixins) !== null && _b !== void 0 ? _b : [];
                for (let j = 0; j < mixinsFolders.length; j++) {
                    const folderObj = mixinsFolders[j];
                    if (!folderObj.path)
                        continue;
                    const finalPath = __replaceTokens(__path.resolve(packageSugarJson.metas.folderPath, folderObj.path));
                    yield _loadFolder(finalPath, 'mixins');
                }
                // functions loading
                const functionsFolders = (_d = (_c = packageSugarJson.postcss.folders) === null || _c === void 0 ? void 0 : _c.functions) !== null && _d !== void 0 ? _d : [];
                for (let j = 0; j < functionsFolders.length; j++) {
                    const folderObj = functionsFolders[j];
                    if (!folderObj.path)
                        continue;
                    const finalPath = __replaceTokens(__path.resolve(packageSugarJson.metas.folderPath, folderObj.path));
                    yield _loadFolder(finalPath, 'functions');
                }
            }
            // list all mixins
            yield _loadFolder(`${__dirname()}/mixins`, 'mixins');
            // list all functions
            yield _loadFolder(`${__dirname()}/functions`, 'functions');
            resolve(true);
        }));
        return loadedPromise;
    }
    const pluginObj = {
        postcssPlugin: 'sugar',
        Once(root) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                __SBench.start('postcssSugarPlugin');
                yield _load();
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
                if ((_b = (_a = root.source) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.from) {
                    if (!rootDir) {
                        rootDir = __folderPath(root.source.input.from);
                    }
                }
            });
        },
        OnceExit(root) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
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
                            .split(':')[1], cachePath = `${settings.cacheDir}/${cacheId}.txt`;
                        if (!loadedCacheById[cacheId] &&
                            __fs.existsSync(cachePath)) {
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
                        if (node.type === 'comment' &&
                            node.text.startsWith('! S-CACHE-START:')) {
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
                        }
                        else if (node.type === 'comment' &&
                            node.text.startsWith('! S-CACHE-END:')) {
                            const cacheId = node.text
                                .replace(/^!\s/, '')
                                .split(':')[1];
                            const cacheObj = cachedContentById[cacheId];
                            cacheObj === null || cacheObj === void 0 ? void 0 : cacheObj.ended = true;
                            cacheObj === null || cacheObj === void 0 ? void 0 : cacheObj.active = false;
                        }
                        else {
                            for (let [id, cacheObj] of Object.entries(cachedContentById)) {
                                if (cacheObj.active && !cacheObj.ended) {
                                    cacheObj.nodes.push(node);
                                }
                            }
                        }
                    });
                    for (let [cacheId, cacheObj] of Object.entries(cachedContentById)) {
                        __writeFileSync(`${settings.cacheDir}/${cacheId}.txt`, nodesToString(cacheObj.nodes));
                    }
                }
                for (let i = 0; i < postProcessorsRegisteredFn.length; i++) {
                    const fn = postProcessorsRegisteredFn[i];
                    yield fn(root);
                }
                const postProcessorsPaths = __glob.sync('**/*.js', {
                    cwd: `${__dirname()}/postProcessors`,
                });
                for (let i = 0; i < postProcessorsPaths.length; i++) {
                    const path = postProcessorsPaths[i];
                    const { default: processorFn } = yield import(`${__dirname()}/postProcessors/${path}`);
                    yield processorFn({
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
                            node.value = node.value.replace(match, __compressVarName(match));
                        });
                    }
                });
                __SBench.end('postcssSugarPlugin').log({
                    body: `File: <cyan>${__path.relative(__packageRootDir(), (_b = (_a = root.source) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.from)}</cyan>`,
                });
            });
        },
        AtRule(atRule, postcssApi) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                if (atRule.name.match(/^sugar\./)) {
                    let mixinId = atRule.name.replace(/^sugar\./, '');
                    if (!mixinsStack[mixinId]) {
                        mixinId = `${mixinId}.${mixinId.split('.').slice(-1)[0]}`;
                    }
                    if (!mixinsStack[mixinId]) {
                        throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested sugar mixin "<yellow>${atRule.name}</yellow>" does not exists...`);
                    }
                    const root = __getRoot(atRule);
                    const sourcePath = typeof root.source.input.file === 'string'
                        ? __path.dirname(root.source.input.file)
                        : __dirname();
                    const mixinFn = mixinsStack[mixinId].fn;
                    const mixinInterface = mixinsStack[mixinId].interface;
                    const processedParams = yield _processDeclaration(atRule.params, atRule);
                    const params = mixinInterface.apply(processedParams, {});
                    let mixinResult, mixinCacheId, mixinCacheFilePath, fromCache = false;
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
                        mixinResult = yield mixinFn({
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
                            registerPostProcessor(fn) {
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
                        }
                        else if (settings.cache && mixinCacheId) {
                            if (!_cachedIds.includes(mixinCacheId)) {
                                _cachedIds.push(mixinCacheId);
                            }
                            replaceWith(atRule, `
                            /*! S-CACHE-START:${mixinCacheId} */
                            ${mixinResult}
                            /*! S-CACHE-END:${mixinCacheId} */
                        `);
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
                }
                else if (atRule.name.match(/^import/)) {
                    // check settings
                    if (!settings.inlineImport)
                        return;
                    // do not take care of imported assets using url('...');
                    if (atRule.params.match(/^url\(/))
                        return;
                    if (!((_a = atRule.source) === null || _a === void 0 ? void 0 : _a.input)) {
                        throw new Error(`Make sure to import your stylesheets using the "<cyan>@import url(...);</cyan>" syntax and not the "<red>@import '...';</red>" one...`);
                    }
                    const dirName = typeof atRule.source.input.file === 'string'
                        ? __path.dirname(atRule.source.input.file)
                        : __dirname();
                    const path = __path.resolve(dirName, __unquote(atRule.params));
                    if (!__fs.existsSync(path)) {
                        throw new Error(`<red>[postcssSugarPlugin.@import]</red> You try to load the file "<yellow>${path}</yellow>" but this file does not exists`);
                    }
                    const contentStr = __fs.readFileSync(path, 'utf8').toString();
                    atRule.after(contentStr);
                    atRule.remove();
                }
            });
        },
        Declaration(decl) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!decl.prop)
                    return;
                decl.value = yield _processDeclaration(decl.value);
            });
        },
    };
    return pluginObj;
};
plugin.postcss = true;
export const postcss = true;
export default plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEQsT0FBTyxFQUNILFNBQVMsRUFDVCxZQUFZLEVBQ1osWUFBWSxFQUNaLGVBQWUsR0FDbEIsTUFBTSx3QkFBd0IsQ0FBQztBQUNoQyxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDL0UsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3ZELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFDaEMsT0FBTyxTQUFTLE1BQU0saUJBQWlCLENBQUM7QUFFeEMsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQzFELE9BQU8sU0FBUyxNQUFNLFdBQVcsQ0FBQztBQUVsQyxNQUFNLFdBQVcsR0FBRyxFQUFFLEVBQ2xCLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDeEIsSUFBSSxVQUFVLEdBQUcs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