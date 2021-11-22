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
            const pluginHash = __folderHash(`${__dirname()}`, {
                include: {
                    ctime: true,
                },
            });
            console.log('plugin', pluginHash);
            try {
                cached = yield __cacache.get(cacheDir, hash);
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
    function replaceWith(atRule, nodes) {
        nodes = !Array.isArray(nodes) ? [nodes] : nodes;
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
                // root.walkComments((comment) => {
                //     comment.remove();
                // });
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
                            console.log(`<yellow>[cache]</yellow> Caching "<cyan>${cacheId !== null && cacheId !== void 0 ? cacheId : cacheHash}</cyan>"...`);
                            yield __cacache.put(cacheDir, cacheHash, cacheStr);
                        }
                        // handle code coming from cache
                        const fromCacheMatches = comment.text
                            .trim()
                            .match(/^FROMCACHE\:([a-zA-Z0-9_-]+):?(.*)?$/);
                        if (fromCacheMatches) {
                            const cacheHash = fromCacheMatches[1];
                            const cacheId = (_b = fromCacheMatches[2]) !== null && _b !== void 0 ? _b : 'unkown';
                            const cached = yield __cacache.get(cacheDir, cacheHash);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLGlCQUFpQixNQUFNLCtDQUErQyxDQUFDO0FBRTlFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUV4QyxPQUFPLFNBQVMsTUFBTSxTQUFTLENBQUM7QUFLaEMsSUFBSSxZQUFZLENBQUM7QUFDakIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxXQUFnQixFQUFFLEVBQUUsRUFBRTtJQUNsQyxRQUFRLEdBQUcsV0FBVyxDQUNsQjtRQUNJLFlBQVksRUFBRSxJQUFJO1FBQ2xCLEtBQUssRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDO0tBQ3hELEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFDRixNQUFNLFFBQVEsR0FBRyxHQUFHLGlCQUFpQixFQUFFLHFCQUFxQixDQUFDO0lBRTdELHNCQUFzQjtJQUV0QixrRUFBa0U7SUFDbEUsa0NBQWtDO0lBQ2xDLGtDQUFrQztJQUNsQyxnRUFBZ0U7SUFD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