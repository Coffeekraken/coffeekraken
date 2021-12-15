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
import __SSugarJson from '@coffeekraken/s-sugar-json';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __packageCacheDir from '@coffeekraken/sugar/node/path/packageCacheDir';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __unquote from '@coffeekraken/sugar/shared/string/unquote';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import __postcss from 'postcss';
import __folderHash from '@coffeekraken/sugar/node/fs/folderHash';
import __getRoot from './utils/getRoot';
import __cacache from 'cacache';
let _mixinsPaths;
const plugin = (settings = {}) => {
    settings = __deepMerge({
        target: 'prod',
        inlineImport: true,
        cache: __SSugarConfig.get('postcssSugarPlugin.cache'),
    }, settings);
    const cacheDir = `${__packageCacheDir()}/postcssSugarPlugin`;
    // load all the styles
    // const stylesPaths = __glob.sync(`${__dirname}/**/*.style.css`);
    // const stylesCss: string[] = [];
    // stylesPaths.forEach((path) => {
    //   stylesCss.push(__fs.readFileSync(path, 'utf8').toString());
    // });
    function pluginIntegrityHash() {
        const hash = __folderHash(`${__dirname()}`, {
            include: {
                ctime: true,
            },
        });
        return hash;
    }
    function findUp(node, checker) {
        const res = checker(node);
        if (!res && node.parent)
            return findUp(node.parent, checker);
        else if (res)
            return res;
        return;
    }
    function fromCache(hash, id = 'unknown') {
        return __awaiter(this, void 0, void 0, function* () {
            let cached;
            if (!settings.cache)
                return;
            try {
                cached = yield __cacache.get(cacheDir, `${hash}-${pluginIntegrityHash()}`);
            }
            catch (e) { }
            if (cached) {
                if (id) {
                    return `/* FROMCACHE:${hash}:${id} */`;
                }
                return `/* FROMCACHE:${hash} */`;
            }
            return;
        });
    }
    function applyNoScopes(scopes, fromNode) {
        const noScopeRule = findUp(fromNode, (node) => {
            if ((node === null || node === void 0 ? void 0 : node.name) === 'sugar.scope.no')
                return node;
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
        return settings.target === 'dev';
    }
    function replaceWith(atRule, nodes) {
        if (nodes instanceof CssVars) {
            nodes = nodes._stack;
        }
        nodes = !Array.isArray(nodes) ? [nodes] : nodes;
        atRule.walkComments((comment) => {
            comment.remove();
        });
        let isAllText = true;
        nodes.forEach((n) => {
            if (!isAllText)
                return;
            if (typeof n !== 'string')
                isAllText = false;
        });
        if (isAllText)
            nodes = [nodes.join('\n')];
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
    const sharedData = {
        noScopes: [],
    };
    const mixinsStack = {}, functionsStack = {}, postProcessorsRegisteredFn = [];
    function _loadFolder(folderPath, type) {
        return __awaiter(this, void 0, void 0, function* () {
            const paths = __glob.sync(`${folderPath}/**/*.js`, {
                // cwd: __dirname(),
                cwd: '',
            });
            for (let i = 0; i < paths.length; i++) {
                const path = paths[i];
                const { default: fn, interface: int, dependencies, } = yield import(`${path}`);
                if (type === 'mixins') {
                    mixinsStack[`${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')
                        .toLowerCase()}`] = {
                        path,
                        mixin: fn,
                        interface: int,
                        dependencies,
                    };
                    mixinsStack[`${path
                        .replace(`${folderPath}/`, '')
                        .replace(/\//gm, '.')
                        .replace(/\.js$/, '')}`] = {
                        path,
                        mixin: fn,
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
    function _load() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
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
                    const finalPath = __path.resolve(packageSugarJson.metas.folderPath, folderObj.path);
                    yield _loadFolder(finalPath, 'mixins');
                }
                // functions loading
                const functionsFolders = (_d = (_c = packageSugarJson.postcss.folders) === null || _c === void 0 ? void 0 : _c.functions) !== null && _d !== void 0 ? _d : [];
                for (let j = 0; j < functionsFolders.length; j++) {
                    const folderObj = functionsFolders[j];
                    if (!folderObj.path)
                        continue;
                    const finalPath = __path.resolve(packageSugarJson.metas.folderPath, folderObj.path);
                    yield _loadFolder(finalPath, 'functions');
                }
            }
            // list all mixins
            yield _loadFolder(`${__dirname()}/mixins`, 'mixins');
            // list all functions
            yield _loadFolder(`${__dirname()}/functions`, 'functions');
            return true;
        });
    }
    class CssVars {
        constructor(str) {
            this._stack = [];
            if (str)
                this._stack.push(str);
        }
        comment(str) {
            // if (!commentsNeeded()) return this;
            // if (typeof str === 'function') str = str();
            // if (Array.isArray(str)) str = str.join('\n');
            // this._stack.push(str);
            return this;
        }
        code(str) {
            if (typeof str === 'function')
                str = str();
            if (Array.isArray(str))
                str = str.join('\n');
            this._stack.push(str);
            return this;
        }
        toString() {
            return this._stack.join('\n');
        }
    }
    return {
        postcssPlugin: 'sugar',
        Once() {
            return __awaiter(this, void 0, void 0, function* () {
                if (__SBench.isBenchActive('postcssSugarPlugin')) {
                    __SBench.start('postcssSugarPlugin');
                }
                // if (useCache) {
                //     try {
                //         const cached = await __cacache.get(
                //             cacheDir,
                //             'postcssSugarPlugin',
                //         );
                //         if (cached) {
                //             console.log('LOADED FROM CACHE');
                //             cacheObj = JSON.parse(cached.data.toString());
                //         }
                //     } catch (e) {}
                // }
                yield _load();
            });
        },
        OnceExit(root) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < postProcessorsRegisteredFn.length; i++) {
                    const fn = postProcessorsRegisteredFn[i];
                    yield fn();
                }
                const postProcessorsPaths = __glob.sync('**/*.js', {
                    cwd: `${__dirname()}/postProcessors`,
                });
                for (let i = 0; i < postProcessorsPaths.length; i++) {
                    const path = postProcessorsPaths[i];
                    const { default: processorFn } = yield import(`${__dirname()}/postProcessors/${path}`);
                    yield processorFn({
                        root,
                        sharedData,
                    });
                }
                if (__SBench.isBenchActive('postcssSugarPlugin')) {
                    __SBench.end('postcssSugarPlugin', true);
                }
                const pluginHash = pluginIntegrityHash();
                // caching system
                if (settings.cache) {
                    const $comments = [];
                    root.walkComments((comment) => __awaiter(this, void 0, void 0, function* () {
                        $comments.push(comment);
                    }));
                    for (let i = 0; i < $comments.length; i++) {
                        const comment = $comments[i];
                        // handle things to cache
                        const toCacheMatches = comment.text
                            .trim()
                            .match(/^CACHE\:([a-zA-Z0-9_-]+):?(.*)?$/);
                        if (toCacheMatches) {
                            const nodes = [];
                            const cacheHash = toCacheMatches[1];
                            const cacheId = (_a = toCacheMatches[2]) !== null && _a !== void 0 ? _a : 'unkown';
                            let endFinded = false, $current = comment;
                            let protectLoopIdx = 0;
                            while (!endFinded) {
                                protectLoopIdx++;
                                if (protectLoopIdx >= 9999) {
                                    console.log(`[warning] The postcssSugarPlugin cache id "${cacheHash}:${cacheId}" seems to miss his end comment "/* ENDCACHE:${cacheHash} */"...`);
                                    break;
                                }
                                $current = $current.next();
                                if ($current.type !== 'comment') {
                                    nodes.push($current);
                                    continue;
                                }
                                const endCachParts = $current.text
                                    .trim()
                                    .split(':');
                                if (endCachParts.length >= 2 &&
                                    endCachParts[0] === 'ENDCACHE') {
                                    endFinded = true;
                                    break;
                                }
                                else {
                                    nodes.push($current);
                                    continue;
                                }
                            }
                            const cacheStr = nodes
                                .map((n) => n.toString())
                                .join('\n');
                            console.log(`<yellow>[postcss]</yellow> Caching "<cyan>${cacheId !== null && cacheId !== void 0 ? cacheId : cacheHash}</cyan>"...`);
                            yield __cacache.put(cacheDir, `${cacheHash}-${pluginHash}`, cacheStr);
                        }
                        // handle code coming from cache
                        const fromCacheMatches = comment.text
                            .trim()
                            .match(/^FROMCACHE\:([a-zA-Z0-9_-]+):?(.*)?$/);
                        if (fromCacheMatches) {
                            const cacheHash = fromCacheMatches[1];
                            const cacheId = (_b = fromCacheMatches[2]) !== null && _b !== void 0 ? _b : 'unkown';
                            let cached;
                            try {
                                cached = yield __cacache.get(cacheDir, `${cacheHash}-${pluginHash}`);
                            }
                            catch (e) { }
                            if (cached) {
                                console.log(`<yellow>[cache]</yellow> Getting "<cyan>${cacheId !== null && cacheId !== void 0 ? cacheId : cacheHash}</cyan>" from cache...`);
                                // console.log(cached.data.toString());
                                comment.replaceWith(cached.data.toString());
                            }
                        }
                    }
                }
            });
        },
        AtRule(atRule, postcssApi) {
            return __awaiter(this, void 0, void 0, function* () {
                if (atRule.name.match(/^sugar\./)) {
                    let mixinId = atRule.name.replace(/^sugar\./, '');
                    if (!mixinsStack[mixinId]) {
                        mixinId = `${mixinId}.${mixinId.split('.').slice(-1)[0]}`;
                    }
                    if (!mixinsStack[mixinId]) {
                        throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested sugar mixin "<yellow>${atRule.name}</yellow>" does not exists...`);
                    }
                    const mixinObj = mixinsStack[mixinId];
                    // let dependenciesHash;
                    // if (useCache) {
                    //     dependenciesHash = await __dependenciesHash({
                    //         files: [mixinObj.path],
                    //         data: {
                    //             path: mixinObj.path,
                    //             params: atRule.params,
                    //         },
                    //     });
                    // }
                    const root = __getRoot(atRule);
                    const sourcePath = typeof root.source.input.file === 'string'
                        ? __path.dirname(root.source.input.file)
                        : __dirname();
                    const mixinFn = mixinsStack[mixinId].mixin;
                    const mixinInterface = mixinsStack[mixinId].interface;
                    const sanitizedParams = atRule.params;
                    const params = mixinInterface.apply(sanitizedParams, {});
                    delete params.help;
                    let result = yield mixinFn({
                        params,
                        atRule,
                        findUp,
                        fromCache,
                        CssVars,
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
                        registerPostProcessor(fn) {
                            postProcessorsRegisteredFn.push(fn);
                        },
                        postcss: __postcss,
                        settings,
                    });
                    if (result) {
                        if (result instanceof CssVars) {
                            result = result._stack;
                        }
                        if (!Array.isArray(result))
                            result = [result];
                        replaceWith(atRule, result);
                    }
                    // if (result && useCache) {
                    //     // cacheObj[dependenciesHash] = result.join('\n');
                    //     // __cacache.put(
                    //     //     cacheDir,
                    //     //     dependenciesHash,
                    //     //     result.join('\n'),
                    //     // );
                    //     // nodeCache.set(dependenciesHash, result.join('\n'));
                    // }
                }
                else if (atRule.name.match(/^import/)) {
                    // check settings
                    if (!settings.inlineImport)
                        return;
                    // do not take care of imported assets using url('...');
                    if (atRule.params.match(/^url\(/))
                        return;
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
                // replace vh units
                const vhMatches = decl.value.match(/(var\(--vh,)?([0-9\.]+)vh(\s|;)?/gm);
                if (vhMatches) {
                    vhMatches.forEach((match) => {
                        if (match.match(/^var\(--vh,/))
                            return;
                        const val = match.replace('vh', '');
                        decl.value = decl.value.replace(match, `calc(${val} * var(--vh,1vh))`);
                    });
                }
                if (!decl.prop || !decl.value)
                    return;
                if (!decl.value.match(/\s?sugar\.[a-zA-Z0-9]+.*/))
                    return;
                const calls = decl.value.match(/sugar\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,){0,999999999999999999999}\)/gm);
                if (!calls || !calls.length)
                    return;
                for (let i = 0; i < calls.length; i++) {
                    let sugarStatement = calls[i];
                    // FIX. sugarStatement comes with none corresponding count of "(" and ")"
                    const openingParenthesisCount = (sugarStatement.match(/\(/g) || []).length;
                    const closingParenthesisCount = (sugarStatement.match(/\)/g) || []).length;
                    if (openingParenthesisCount > closingParenthesisCount) {
                        sugarStatement += ')'.repeat(openingParenthesisCount - closingParenthesisCount);
                    }
                    const functionName = sugarStatement.match(/sugar\.([a-zA-Z0-9\.]+)/)[1];
                    const paramsStatement = sugarStatement.replace(/sugar\.[a-zA-Z0-9\.]+/, '');
                    let fnId = functionName;
                    if (!functionsStack[fnId]) {
                        fnId = `${fnId}.${fnId.split('.').slice(-1)[0]}`;
                    }
                    const fnObject = functionsStack[fnId];
                    if (!fnObject) {
                        throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${fnId}</yellow>" does not exists...`);
                    }
                    const functionInterface = functionsStack[fnId].interface;
                    const params = functionInterface.apply(paramsStatement, {});
                    delete params.help;
                    // let dependenciesHash;
                    // if (useCache) {
                    //     dependenciesHash = await __dependenciesHash({
                    //         files: [fnObject.path],
                    //         data: {
                    //             path: fnObject.path,
                    //             params,
                    //         },
                    //     });
                    //     // // check cache
                    //     // try {
                    //     //     const cached = cacheObj[dependenciesHash];
                    //     //     // const cached = await __cacache.get(
                    //     //     //     cacheDir,
                    //     //     //     dependenciesHash,
                    //     //     // );
                    //     //     // const cached = nodeCache.get(dependenciesHash);
                    //     //     if (cached) {
                    //     //         // console.log(
                    //     //         //     'From cache function',
                    //     //         //     functionName,
                    //     //         //     paramsStatement,
                    //     //         // );
                    //     //         // decl.value = cached.data.toString();
                    //     //         decl.value = cached;
                    //     //         return;
                    //     //     }
                    //     // } catch (e) {}
                    // }
                    try {
                        const result = yield fnObject.fn({
                            params,
                            settings,
                        });
                        decl.value = decl.value.replace(sugarStatement, result);
                        // if (result && useCache) {
                        //     // console.log('SET cache FN', functionName, result);
                        //     cacheObj[dependenciesHash] = result;
                        //     // __cacache.put(cacheDir, dependenciesHash, result);
                        //     // nodeCache.set(dependenciesHash, result.join('\n'));
                        // }
                    }
                    catch (e) {
                        console.error(e.message);
                    }
                }
            });
        },
    };
};
plugin.postcss = true;
export const postcss = true;
export default plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLGlCQUFpQixNQUFNLCtDQUErQyxDQUFDO0FBRTlFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUV4QyxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFLaEMsSUFBSSxZQUFZLENBQUM7QUFDakIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxXQUFnQixFQUFFLEVBQUUsRUFBRTtJQUNsQyxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLE1BQU0sRUFBRSxNQUFNO1FBQ2QsWUFBWSxFQUFFLElBQUk7UUFDbEIsS0FBSyxFQUFFLGNBQWMsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUM7S0FDeEQsRUFDRCxRQUFRLENBQ1gsQ0FBQztJQUNGLE1BQU0sUUFBUSxHQUFHLEdBQUcsaUJBQWlCLEVBQUUscUJBQXFCLENBQUM7SUFFN0Qsc0JBQXNCO0lBRXRCLGtFQUFrRTtJQUNsRSxrQ0FBa0M7SUFDbEMsa0NB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