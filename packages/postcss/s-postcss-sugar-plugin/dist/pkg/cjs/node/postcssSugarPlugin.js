"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postcss = exports.getMixinsOrFunctionsList = exports.getMixinsList = exports.getFunctionsList = void 0;
// import __postcss from 'postcss';
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_sugar_json_1 = __importDefault(require("@coffeekraken/s-sugar-json"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const crypto_1 = require("@coffeekraken/sugar/crypto");
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const string_1 = require("@coffeekraken/sugar/string");
const token_1 = require("@coffeekraken/sugar/token");
const fs_2 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const path_2 = __importDefault(require("path"));
const postcss_1 = __importDefault(require("postcss"));
const getRoot_1 = __importDefault(require("./utils/getRoot"));
const css_1 = require("@coffeekraken/sugar/css");
const object_2 = require("@coffeekraken/sugar/object");
const CssVars_1 = __importDefault(require("./CssVars"));
const mixinsStack = {}, functionsStack = {};
let pluginHash = (0, fs_1.__folderHash)(path_2.default.resolve((0, fs_1.__dirname)(), '../../..'), {
    include: {
        ctime: true,
    },
}), rootDir;
let loadedPromise;
const _cacheObjById = {}, _cachedIds = [];
function getFunctionsList() {
    return getMixinsOrFunctionsList('functions');
}
exports.getFunctionsList = getFunctionsList;
function getMixinsList() {
    return getMixinsOrFunctionsList('mixins');
}
exports.getMixinsList = getMixinsList;
function getMixinsOrFunctionsList(what) {
    // process some tokens
    const folderPath = (0, token_1.__replaceTokens)(`${(0, fs_1.__dirname)()}/${what}`);
    const paths = glob_1.default
        .sync(`${folderPath}/**/*.js`, {
        cwd: '',
    })
        .map((path) => {
        const relativePath = path_2.default.relative(folderPath, path);
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
exports.getMixinsOrFunctionsList = getMixinsOrFunctionsList;
let _configLoaded = false;
const plugin = (settings = {}) => {
    settings = (0, object_1.__deepMerge)({
        outDir: '',
        excludeByTypes: [],
        excludeCommentByTypes: [],
        excludeCodeByTypes: [],
        target: 'production',
        inlineImport: true,
        cache: false,
        cacheDir: `${(0, path_1.__packageCacheDir)()}/postcssSugarPlugin`,
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
        settings = (0, object_1.__deepMerge)(settings, {
            outDir: s_sugar_config_1.default.get('postcssSugarPlugin.outDir'),
            excludeByTypes: s_sugar_config_1.default.get('postcssSugarPlugin.excludeByTypes'),
            excludeCommentByTypes: s_sugar_config_1.default.get('postcssSugarPlugin.excludeCommentByTypes'),
            excludeCodeByTypes: s_sugar_config_1.default.get('postcssSugarPlugin.excludeCodeByTypes'),
            cache: s_sugar_config_1.default.get('postcssSugarPlugin.cache'),
        });
        // if (settings.partials === undefined) {
        //     settings.partials = settings.target !== 'vite';
        // }
        // remove cache if not for vite target
        if (settings.cache === undefined && settings.target !== 'vite') {
            settings.cache = false;
        }
        // set theme hash
        themeHash = s_theme_1.default.hash();
        // set cache directory
        cacheDir = `${(0, path_1.__packageCacheDir)()}/postcssSugarPlugin`;
        if ((_a = settings.excludeByTypes) === null || _a === void 0 ? void 0 : _a.length) {
            CssVars_1.default.excludeByTypes(settings.excludeByTypes);
        }
        if ((_b = settings.excludeCommentByTypes) === null || _b === void 0 ? void 0 : _b.length) {
            CssVars_1.default.excludeCommentByTypes(settings.excludeCommentByTypes);
        }
        if ((_c = settings.excludeCodeByTypes) === null || _c === void 0 ? void 0 : _c.length) {
            CssVars_1.default.excludeCodeByTypes(settings.excludeCodeByTypes);
        }
    }
    function _loadConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            yield s_sugar_config_1.default.load();
            _configLoaded = true;
            // update config
            updateConfig();
            return true;
        });
    }
    function contentToArray(content) {
        if (content instanceof CssVars_1.default) {
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
        return `${(0, path_1.__packageCacheDir)()}/postcssSugarPlugin/${pluginHash}/${fileName}`;
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
                        ...((_a = postcss_1.default.parse(n).nodes) !== null && _a !== void 0 ? _a : []),
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
        fs_2.default.readdirSync(`${settings.cacheDir}`).forEach((fileName) => {
            const filePath = `${settings.cacheDir}/${fileName}`;
            const fileStats = fs_2.default.statSync(filePath);
            if (Date.now() > fileStats.birthtimeMs + settings.cacheTtl) {
                // delete the cache file
                fs_2.default.unlinkSync(filePath);
            }
        });
    }
    function isCached(id) {
        const cacheFilePath = `${settings.cacheDir}/${id}.txt`;
        return _cachedIds.includes(id) || fs_2.default.existsSync(cacheFilePath);
    }
    const sharedData = {
        noScopes: [],
    };
    const postProcessorsRegisteredFn = [];
    function _loadFolder(folderPath, type) {
        return __awaiter(this, void 0, void 0, function* () {
            // process some tokens
            folderPath = (0, token_1.__replaceTokens)(folderPath);
            // update plugin hash with these new folders hash
            const hashes = [
                pluginHash,
                (0, fs_1.__folderHash)(folderPath, {
                    include: {
                        ctime: true,
                    },
                }),
            ];
            pluginHash = crypto_1.__sha256.encrypt(hashes.join('-'));
            const paths = glob_1.default.sync(`${folderPath}/**/*.js`, {
                // cwd: __dirname(),
                cwd: '',
            });
            for (let i = 0; i < paths.length; i++) {
                const path = paths[i];
                const { default: fn, interface: int, dependencies, } = yield Promise.resolve().then(() => __importStar(require(path)));
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
                    const value = s_theme_1.default.getSafe(dotPathOrValue);
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
            const sugarJsonInstance = new s_sugar_json_1.default();
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
                    const finalPath = (0, token_1.__replaceTokens)(path_2.default.resolve(packageSugarJson.metas.folderPath, folderObj.path));
                    yield _loadFolder(finalPath, 'mixins');
                }
                // functions loading
                const functionsFolders = (_d = (_c = packageSugarJson.postcss.folders) === null || _c === void 0 ? void 0 : _c.functions) !== null && _d !== void 0 ? _d : [];
                for (let j = 0; j < functionsFolders.length; j++) {
                    const folderObj = functionsFolders[j];
                    if (!folderObj.path)
                        continue;
                    const finalPath = (0, token_1.__replaceTokens)(path_2.default.resolve(packageSugarJson.metas.folderPath, folderObj.path));
                    yield _loadFolder(finalPath, 'functions');
                }
            }
            // list all mixins
            yield _loadFolder(`${(0, fs_1.__dirname)()}/mixins`, 'mixins');
            // list all functions
            yield _loadFolder(`${(0, fs_1.__dirname)()}/functions`, 'functions');
            resolve(true);
        }));
        return loadedPromise;
    }
    const pluginObj = {
        postcssPlugin: 'sugar',
        Once(root) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                s_bench_1.default.start('postcssSugarPlugin');
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
                        rootDir = (0, fs_1.__folderPath)(root.source.input.from);
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
                            fs_2.default.existsSync(cachePath)) {
                            loadedCacheById[cacheId] = fs_2.default
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
                        (0, fs_1.__writeFileSync)(`${settings.cacheDir}/${cacheId}.txt`, nodesToString(cacheObj.nodes));
                    }
                }
                for (let i = 0; i < postProcessorsRegisteredFn.length; i++) {
                    const fn = postProcessorsRegisteredFn[i];
                    yield fn(root);
                }
                const postProcessorsPaths = glob_1.default.sync('**/*.js', {
                    cwd: `${(0, fs_1.__dirname)()}/postProcessors`,
                });
                for (let i = 0; i < postProcessorsPaths.length; i++) {
                    const path = postProcessorsPaths[i];
                    const { default: processorFn } = yield Promise.resolve().then(() => __importStar(require(`${(0, fs_1.__dirname)()}/postProcessors/${path}`)));
                    yield processorFn({
                        CssVars: CssVars_1.default,
                        pluginHash,
                        themeHash,
                        cacheDir,
                        getRoot: getRoot_1.default,
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
                            const compressedProp = (0, css_1.__compressVarName)(node.prop);
                            node.prop = compressedProp;
                        }
                    }
                    const valueMatches = node.value.match(/--s-theme-[^,\)]+/gm);
                    if (valueMatches) {
                        valueMatches.forEach((match) => {
                            node.value = node.value.replace(match, (0, css_1.__compressVarName)(match));
                        });
                    }
                });
                s_bench_1.default.end('postcssSugarPlugin').log({
                    body: `File: <cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), (_b = (_a = root.source) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.from)}</cyan>`,
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
                    const root = (0, getRoot_1.default)(atRule);
                    const sourcePath = typeof root.source.input.file === 'string'
                        ? path_2.default.dirname(root.source.input.file)
                        : (0, fs_1.__dirname)();
                    const mixinFn = mixinsStack[mixinId].fn;
                    const mixinInterface = mixinsStack[mixinId].interface;
                    const processedParams = yield _processDeclaration(atRule.params, atRule);
                    const params = mixinInterface.apply(processedParams, {});
                    let mixinResult, mixinCacheId, mixinCacheFilePath, fromCache = false;
                    // leverage cache if wanted
                    if (settings.cache) {
                        mixinCacheId = (0, object_2.__objectHash)({
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
                            CssVars: CssVars_1.default,
                            pluginHash,
                            themeHash,
                            cacheDir,
                            getRoot: getRoot_1.default,
                            getCacheFilePath,
                            replaceWith(nodes) {
                                replaceWith(atRule, nodes);
                            },
                            atRootStart(css) {
                                const root = (0, getRoot_1.default)(atRule);
                                root.prepend(css);
                            },
                            atRootEnd(css) {
                                const root = (0, getRoot_1.default)(atRule);
                                root.append(css);
                            },
                            postcssApi,
                            sourcePath,
                            sharedData,
                            registerPostProcessor(fn) {
                                postProcessorsRegisteredFn.push(fn);
                            },
                            postcss: postcss_1.default,
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
                        ? path_2.default.dirname(atRule.source.input.file)
                        : (0, fs_1.__dirname)();
                    const path = path_2.default.resolve(dirName, (0, string_1.__unquote)(atRule.params));
                    if (!fs_2.default.existsSync(path)) {
                        throw new Error(`<red>[postcssSugarPlugin.@import]</red> You try to load the file "<yellow>${path}</yellow>" but this file does not exists`);
                    }
                    const contentStr = fs_2.default.readFileSync(path, 'utf8').toString();
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
exports.postcss = true;
exports.default = plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLG9FQUE2QztBQUM3QyxrRkFBMEQ7QUFDMUQsOEVBQXNEO0FBQ3RELG9FQUE2QztBQUM3Qyx1REFBc0Q7QUFDdEQsK0NBS2dDO0FBQ2hDLHVEQUF5RDtBQUN6RCxtREFBK0U7QUFDL0UsdURBQXVEO0FBQ3ZELHFEQUE0RDtBQUM1RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQUMxQixzREFBZ0M7QUFDaEMsOERBQXdDO0FBRXhDLGlEQUE0RDtBQUM1RCx1REFBMEQ7QUFDMUQsd0RBQWtDO0FBRWxDLE1BQU0sV0FBVyxHQUFHLEVBQUUsRUFDbEIsY0FBYyxHQUFHLEVBQUUsQ0FBQztBQUN4QixJQUFJLFVBQVUsR0FBRyxJQUFBLGlCQUFZLEVBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFBLGNBQVMsR0FBRSxFQUFFLFVBQVUsQ0FBQyxFQUFFO0lBQy9ELE9BQU8sRUFBRTtRQUNMLEtBQUssRUFBRSxJQUFJO0tBQ2Q7Q0FDSixDQUFDLEVBQ0YsT0FBTyxDQUFDO0FBQ1osSUFBSSxhQUFhLENBQUM7QUFFbEIsTUFBTSxhQUFhLEdBQUcsRUFBRSxFQUNwQixVQUFVLEdBQUcsRUFBRSxDQUFDO0FBZXBCLFNBQWdCLGdCQUFnQjtJQUM1QixPQUFPLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFGRCw0Q0FFQztBQUNELFNBQWdCLGFBQWE7SUFDekIsT0FBTyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRkQsc0NBRUM7QUFFRCxTQUFnQix3QkFBd0IsQ0FBQyxJQUE0QjtJQUNqRSxzQkFBc0I7SUFDdEIsTUFBTSxVQUFVLEdBQUcsSUFBQSx1QkFBZSxFQUFDLEdBQUcs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