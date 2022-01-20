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
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __fileHash from '@coffeekraken/sugar/node/fs/fileHash';
import __objectHash from '@coffeekraken/sugar/shared/object/objectHash';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __urlCompliant from '@coffeekraken/sugar/shared/string/urlCompliant';
import __fileName from '@coffeekraken/sugar/node/fs/filename';
let _mixinsPaths;
const mixinsStack = {}, functionsStack = {};
let pluginHash = __folderHash(__path.resolve(__dirname(), '../../..'), {
    include: {
        ctime: true,
    },
}), rootDir;
let loadedPromise, alreadyLoaded = false;
const plugin = (settings = {}) => {
    settings = __deepMerge({
        target: 'prod',
        inlineImport: true,
        cache: __SSugarConfig.get('postcssSugarPlugin.cache'),
    }, settings);
    pluginHash = `${Math.round(Math.random() * 9999)}`;
    pluginHash = 'aaa';
    function contentToArray(content) {
        if (content instanceof CssVars) {
            content = content._stack;
        }
        if (!Array.isArray(content))
            content = [content];
        return content;
    }
    function contentToString(content) {
        return contentToArray(content).join('\n');
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
            if (!settings.cache)
                return;
            const idHash = __md5.encrypt(id);
            const fileName = `${__md5.encrypt(`${__urlCompliant(__fileName(id))}.${idHash}.${hash}`)}.css`;
            const cachePath = `${__packageCacheDir()}/postcssSugarPlugin/${pluginHash}/${fileName}`;
            if (!__fs.existsSync(cachePath))
                return;
            let objectId = id;
            if (__fs.existsSync(objectId)) {
                objectId = __path.relative(__packageRoot(), objectId);
            }
            console.log(`<green>[postcss]</green> File "<cyan>${objectId}</cyan>" taken from cache`);
            return `@import url('${cachePath}');`;
        });
    }
    function toCache(hash, content, id = 'unknown') {
        return __awaiter(this, void 0, void 0, function* () {
            if (id.match(/\/postcssSugarPlugin\//))
                return;
            const idHash = __md5.encrypt(id);
            const fileName = `${__md5.encrypt(`${__urlCompliant(__fileName(id))}.${idHash}.${hash}`)}.css`;
            const cachePath = `${__packageCacheDir()}/postcssSugarPlugin/${pluginHash}/${fileName}`;
            const importMatches = content.match(/@import\surl\(['\`"]?([^\)'\`"]+)['\`"]?\);?/gm);
            importMatches === null || importMatches === void 0 ? void 0 : importMatches.forEach((importStatement) => {
                const path = importStatement
                    .replace(/^@import url\(['\`"]?/, '')
                    .replace(/['\`"]?\);?/, '');
                if (path.match(/^https?:\/\//))
                    return;
                if (path.match(/^\//))
                    return;
                if (!path.match(/\.css$/))
                    return;
                const absolutePath = __path.resolve(rootDir, path);
                content = content.replace(importStatement, `@import url("${absolutePath}");\n`);
            });
            let objectId = id;
            if (__fs.existsSync(objectId)) {
                objectId = __path.relative(__packageRoot(), objectId);
            }
            console.log(`<yellow>[postcss]</yellow> Compiling the "<cyan>${objectId}</cyan>" file.`);
            __writeFileSync(cachePath, contentToString(content));
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
        return settings.target !== 'vite';
    }
    function replaceWith(atRule, nodes) {
        nodes = contentToArray(nodes);
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
    const postProcessorsRegisteredFn = [];
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
    function _processDeclaration(value) {
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
            const calls = value.match(/sugar\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,){0,999999999999999999999}\)/gm);
            if (!calls || !calls.length)
                return value;
            for (let i = 0; i < calls.length; i++) {
                let sugarStatement = (_a = calls[i]) !== null && _a !== void 0 ? _a : '';
                // FIX. sugarStatement comes with none corresponding count of "(" and ")"
                const openingParenthesisCount = (sugarStatement.match(/\(/g) || []).length;
                const closingParenthesisCount = (sugarStatement.match(/\)/g) || []).length;
                if (openingParenthesisCount > closingParenthesisCount) {
                    sugarStatement += ')'.repeat(openingParenthesisCount - closingParenthesisCount);
                }
                // @ts-ignore
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
                try {
                    const result = yield fnObject.fn({
                        params,
                        settings,
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
            resolve(true);
        }));
        return loadedPromise;
    }
    class CssVars {
        constructor(str) {
            this._stack = [];
            if (str)
                this._stack.push(str);
        }
        comment(str) {
            if (!commentsNeeded())
                return this;
            if (typeof str === 'function')
                str = str();
            if (Array.isArray(str))
                str = str.join('\n');
            this._stack.push(str);
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
        Once(root) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                __SBench.start('postcssSugarPlugin');
                yield _load();
                if ((_b = (_a = root.source) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.from) {
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
                    // const cached = await fromCache(hash, root.source.input.from);
                    // if (cached) {
                    //     root._fromCache = cached;
                    //     root.walk((node) => {
                    //         if (node.name?.match(/import$/)) {
                    //         } else {
                    //             node.remove();
                    //         }
                    //     });
                    // }
                }
            });
        },
        OnceExit(root) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                if (root._fromCache) {
                    root.append(root._fromCache);
                    return;
                }
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
                // if (root.source?.input?.from) {
                //     const fileHash = __fileHash(root.source.input.from, {
                //         include: {
                //             ctime: true,
                //         },
                //     });
                //     const hash = __objectHash({
                //         fileHash,
                //         theme: __STheme.hash,
                //     });
                //     await toCache(hash, root.toString(), root.source.input.from);
                // }
                __SBench.end('postcssSugarPlugin').log({
                    body: `File: <cyan>${__path.relative(__packageRoot(), (_b = (_a = root.source) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.from)}</cyan>`,
                });
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
                    const root = __getRoot(atRule);
                    const sourcePath = typeof root.source.input.file === 'string'
                        ? __path.dirname(root.source.input.file)
                        : __dirname();
                    const mixinFn = mixinsStack[mixinId].mixin;
                    const mixinInterface = mixinsStack[mixinId].interface;
                    const processedParams = yield _processDeclaration(atRule.params);
                    const params = mixinInterface.apply(processedParams, {});
                    delete params.help;
                    let result = yield mixinFn({
                        params,
                        atRule,
                        findUp,
                        fromCache,
                        toCache,
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
                        result = contentToString(result);
                        replaceWith(atRule, result);
                    }
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
                if (!decl.prop)
                    return;
                decl.value = yield _processDeclaration(decl.value);
            });
        },
    };
};
plugin.postcss = true;
export const postcss = true;
export default plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGNzc1N1Z2FyUGx1Z2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicG9zdGNzc1N1Z2FyUGx1Z2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLGlCQUFpQixNQUFNLCtDQUErQyxDQUFDO0FBQzlFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sS0FBSyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3pELE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLFNBQVMsTUFBTSxpQkFBaUIsQ0FBQztBQUl4QyxPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLFVBQVUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RCxPQUFPLFlBQVksTUFBTSw4Q0FBOEMsQ0FBQztBQUN4RSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUV4RSxPQUFPLGNBQWMsTUFBTSxnREFBZ0QsQ0FBQztBQUM1RSxPQUFPLFVBQVUsTUFBTSxzQ0FBc0MsQ0FBQztBQUc5RCxJQUFJLFlBQVksQ0FBQztBQUVqQixNQUFNLFdBQVcsR0FBRyxFQUFFLEVBQ2xCLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDeEIsSUFBSSxVQUFVLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsVUFBVSxDQUFDLEVBQUU7SUFDL0QsT0FBTyxFQUFFO1FBQ0wsS0FBSyxFQUFFLElBQUk7S0FDZDtDQUNKLENBQUMsRUFDRixPQUFPLENBQUM7QUFDWixJQUFJLGFBQWEsRUFDYixhQUFhLEdBQUcsS0FBSyxDQUFDO0FBRTFCLE1BQU0sTUFBTSxHQUFHLENBQUMsV0FBZ0IsRUFBRSxFQUFFLEVBQUU7SUFDbEMsUUFBUSxHQUFHLFdBQVcsQ0FDbEI7UUFDSSxNQUFNLEVBQUUsTUFBTTtRQUNkLFlBQVksRUFBRSxJQUFJO1FBQ2xCLEtBQUssRUFBRSxjQUFjLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDO0tBQ3hELEVBQ0QsUUFBUSxDQUNYLENBQUM7SUFFRixVQUFVLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO0lBQ25ELFVBQVUsR0FBRyxLQUFLLENBQUM7SUFFbkIsU0FBUyxjQUFjLENBQUMsT0FBTztRQUMzQixJQUFJLE9BQU8sWUFBWSxPQUFPLEVBQUU7WUFDNUIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7U0FDNUI7UUFDRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFBRSxPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxPQUFPLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBRUQsU0FBUyxlQUFlLENBQUMsT0FBTztRQUM1QixPQUFPLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELFNBQVMsTUFBTSxDQUFDLElBQUksRUFBRSxPQUFPO1FBQ3pCLE1BQU0sR0FBRyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNO1lBQUUsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQzthQUN4RCxJQUFJLEdBQUc7WUFBRSxPQUFPLEdBQUcsQ0FBQztRQUN6QixPQUFPO0lBQ1gsQ0FBQztJQUVELFNBQWUsU0FBUyxDQUFDLElBQUksRUFBRSxFQUFFLEdBQUcsU0FBUzs7WUFDekMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLO2dCQUFFLE9BQU87WUFDNUIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNqQyxNQUFNLFFBQVEsR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQzdCLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUUsQ0FDeEQsTUFBTSxDQUFDO1lBQ1IsTUFBTSxTQUFTLEdBQUcsR0FBRyxpQkFBaUIsRUFBRSx1QkFBdUIsVUFBVSxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ3hGLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQztnQkFBRSxPQUFPO1lBRXhDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNsQixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzNCLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3pEO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDUCx3Q0FBd0MsUUFBUSwyQkFBMkIsQ0FDOUUsQ0FBQztZQUNGLE9BQU8sZ0JBQWdCLFNBQVMsS0FBSyxDQUFDO1FBQzFDLENBQUM7S0FBQTtJQUVELFNBQWUsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFHLFNBQVM7O1lBQ2hELElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQztnQkFBRSxPQUFPO1lBRS9DLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDakMsTUFBTSxRQUFRLEdBQUcsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUM3QixHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFLENBQ3hELE1BQU0sQ0FBQztZQUNSLE1BQU0sU0FBUyxHQUFHLEdBQUcsaUJBQWlCLEVBQUUsdUJBQXVCLFVBQVUsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUV4RixNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUMvQixnREFBZ0QsQ0FDbkQsQ0FBQztZQUVGLGFBQWEsYUFBYixhQUFhLHVCQUFiLGFBQWEsQ0FBRSxPQUFPLENBQUMsQ0FBQyxlQUFlLEVBQUUsRUFBRTtnQkFDdkMsTUFBTSxJQUFJLEdBQUcsZUFBZTtxQkFDdkIsT0FBTyxDQUFDLHVCQUF1QixFQUFFLEVBQUUsQ0FBQztxQkFDcEMsT0FBTyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFaEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztvQkFBRSxPQUFPO2dCQUN2QyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUFFLE9BQU87Z0JBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztvQkFBRSxPQUFPO2dCQUVsQyxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbkQsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQ3JCLGVBQWUsRUFDZixnQkFBZ0IsWUFBWSxPQUFPLENBQ3RDLENBQUM7WUFDTixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUNsQixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQzNCLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2FBQ3pEO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FDUCxtREFBbUQsUUFBUSxnQkFBZ0IsQ0FDOUUsQ0FBQztZQUVGLGVBQWUsQ0FBQyxTQUFTLEVBQUUsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDekQsQ0FBQztLQUFBO0lBRUQsU0FBUyxhQUFhLENBQUMsTUFBZ0IsRUFBRSxRQUFRO1FBQzdDLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMxQyxJQUFJLENBQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLElBQUksTUFBSyxnQkFBZ0I7Z0JBQUUsT0FBTyxJQUFJLENBQUM7WUFDakQsT0FBTztRQUNYLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxXQUFXLElBQUksV0FBVyxDQUFDLE1BQU0sRUFBRTtZQUNuQyxNQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTTtpQkFDOUIsSUFBSSxFQUFFO2lCQUNOLE9BQU8sQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO2lCQUNsQixPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQztpQkFDbEIsS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDZCxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBRTFCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDdEMsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxTQUFTLENBQUM7U0FDcEI7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDO0lBRUQsU0FBUyxjQUFjO1FBQ25CLE9BQU8sUUFBUSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUM7SUFDdEMsQ0FBQztJQUVELFNBQVMsV0FBVyxDQUFDLE1BQU0sRUFBRSxLQUFLO1FBQzlCLEtBQUssR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFOUIsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzVCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsQ0FBQztRQUVILElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztRQUNyQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDaEIsSUFBSSxDQUFDLFNBQVM7Z0JBQUUsT0FBTztZQUN2QixJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVE7Z0JBQUUsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUNqRCxDQUFDLENBQUMsQ0FBQztRQUNILElBQUksU0FBUztZQUFFLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUUxQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLFVBQVUsR0FBVSxFQUFFLENBQUM7WUFFM0IsS0FBSztpQkFDQSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNsRCxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTs7Z0JBQ1gsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLEVBQUU7b0JBQ3ZCLFVBQVUsR0FBRzt3QkFDVCxHQUFHLFVBQVU7d0JBQ2IsR0FBRyxDQUFDLE1BQUEsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLG1DQUFJLEVBQUUsQ0FBQztxQkFDdEMsQ0FBQztpQkFDTDtxQkFBTTtvQkFDSCxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN0QjtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRVAsS0FBSyxNQUFNLElBQUksSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxJQUFJO29CQUFFLFNBQVM7Z0JBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMzQztTQUNKO1FBQ0QsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFRCxNQUFNLFVBQVUsR0FBRztRQUNmLFFBQVEsRUFBRSxFQUFFO0tBQ2YsQ0FBQztJQUNGLE1BQU0sMEJBQTBCLEdBQWUsRUFBRSxDQUFDO0lBRWxELFNBQWUsV0FBVyxDQUFDLFVBQVUsRUFBRSxJQUE0Qjs7WUFDL0QsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsVUFBVSxFQUFFO2dCQUMvQyxvQkFBb0I7Z0JBQ3BCLEdBQUcsRUFBRSxFQUFFO2FBQ1YsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEIsTUFBTSxFQUNGLE9BQU8sRUFBRSxFQUFFLEVBQ1gsU0FBUyxFQUFFLEdBQUcsRUFDZCxZQUFZLEdBQ2YsR0FBRyxNQUFNLE1BQU0sQ0FBQyxHQUFHLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzVCLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDbkIsV0FBVyxDQUNQLEdBQUcsSUFBSTt5QkFDRixPQUFPLENBQUMsR0FBRyxVQUFVLEdBQUcsRUFBRSxFQUFFLENBQUM7eUJBQzdCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO3lCQUNwQixPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQzt5QkFDcEIsV0FBVyxFQUFFLEVBQUUsQ0FDdkIsR0FBRzt3QkFDQSxJQUFJO3dCQUNKLEtBQUssRUFBRSxFQUFFO3dCQUNULFNBQVMsRUFBRSxHQUFHO3dCQUNkLFlBQVk7cUJBQ2YsQ0FBQztvQkFDRixXQUFXLENBQ1AsR0FBRyxJQUFJO3lCQUNGLE9BQU8sQ0FBQyxHQUFHLFVBQVUsR0FBRyxFQUFFLEVBQUUsQ0FBQzt5QkFDN0IsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUM7eUJBQ3BCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FDOUIsR0FBRzt3QkFDQSxJQUFJO3dCQUNKLEtBQUssRUFBRSxFQUFFO3dCQUNULFNBQVMsRUFBRSxHQUFHO3dCQUNkLFlBQVk7cUJBQ2YsQ0FBQztpQkFDTDtxQkFBTTtvQkFDSCxjQUFjLENBQ1YsR0FBRyxJQUFJO3lCQUNGLE9BQU8sQ0FBQyxHQUFHLFVBQVUsR0FBRyxFQUFFLEVBQUUsQ0FBQzt5QkFDN0IsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUM7eUJBQ3BCLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDO3lCQUNwQixXQUFXLEVBQUUsRUFBRSxDQUN2QixHQUFHO3dCQUNBLElBQUk7d0JBQ0osRUFBRTt3QkFDRixTQUFTLEVBQUUsR0FBRzt3QkFDZCxZQUFZO3FCQUNmLENBQUM7b0JBQ0YsY0FBYyxDQUNWLEdBQUcsSUFBSTt5QkFDRixPQUFPLENBQUMsR0FBRyxVQUFVLEdBQUcsRUFBRSxFQUFFLENBQUM7eUJBQzdCLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO3lCQUNwQixPQUFPLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQzlCLEdBQUc7d0JBQ0EsSUFBSTt3QkFDSixFQUFFO3dCQUNGLFNBQVMsRUFBRSxHQUFHO3dCQUNkLFlBQVk7cUJBQ2YsQ0FBQztpQkFDTDthQUNKO1FBQ0wsQ0FBQztLQUFBO0lBRUQsU0FBZSxtQkFBbUIsQ0FBQyxLQUFhOzs7WUFDNUMsbUJBQW1CO1lBQ25CLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQ3pCLG9DQUFvQyxDQUN2QyxDQUFDO1lBQ0YsSUFBSSxTQUFTLEVBQUU7Z0JBQ1gsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO29CQUN4QixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO3dCQUFFLE9BQU87b0JBQ3ZDLE1BQU0sR0FBRyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUNwQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FDakIsS0FBSyxFQUNMLFFBQVEsR0FBRyxvQkFBb0IsQ0FDbEMsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQzthQUNOO1lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsMEJBQTBCLENBQUM7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFDM0QsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FDckIsK0VBQStFLENBQ2xGLENBQUM7WUFFRixJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFFMUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQUksY0FBYyxHQUFXLE1BQUEsS0FBSyxDQUFDLENBQUMsQ0FBQyxtQ0FBSSxFQUFFLENBQUM7Z0JBRTVDLHlFQUF5RTtnQkFDekUsTUFBTSx1QkFBdUIsR0FBRyxDQUM1QixjQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FDcEMsQ0FBQyxNQUFNLENBQUM7Z0JBQ1QsTUFBTSx1QkFBdUIsR0FBRyxDQUM1QixjQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FDcEMsQ0FBQyxNQUFNLENBQUM7Z0JBRVQsSUFBSSx1QkFBdUIsR0FBRyx1QkFBdUIsRUFBRTtvQkFDbkQsY0FBYyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQ3hCLHVCQUF1QixHQUFHLHVCQUF1QixDQUNwRCxDQUFDO2lCQUNMO2dCQUVELGFBQWE7Z0JBQ2IsTUFBTSxZQUFZLEdBQUcsY0FBYyxDQUFDLEtBQUssQ0FDckMseUJBQXlCLENBQzVCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ0wsTUFBTSxlQUFlLEdBQUcsY0FBYyxDQUFDLE9BQU8sQ0FDMUMsdUJBQXVCLEVBQ3ZCLEVBQUUsQ0FDTCxDQUFDO2dCQUVGLElBQUksSUFBSSxHQUFHLFlBQVksQ0FBQztnQkFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDdkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztpQkFDcEQ7Z0JBRUQsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUV0QyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNYLE1BQU0sSUFBSSxLQUFLLENBQ1gsNkVBQTZFLElBQUksK0JBQStCLENBQ25ILENBQUM7aUJBQ0w7Z0JBRUQsTUFBTSxpQkFBaUIsR0FBRyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDO2dCQUN6RCxNQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUM1RCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBRW5CLElBQUk7b0JBQ0EsTUFBTSxNQUFNLEdBQUcsTUFBTSxRQUFRLENBQUMsRUFBRSxDQUFDO3dCQUM3QixNQUFNO3dCQUNOLFFBQVE7cUJBQ1gsQ0FBQyxDQUFDO29CQUNILEtBQUssR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDakQ7Z0JBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ1IsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7aUJBQzVCO2FBQ0o7WUFDRCxPQUFPLEtBQUssQ0FBQzs7S0FDaEI7SUFFRCxTQUFTLEtBQUs7UUFDVixJQUFJLGFBQWE7WUFBRSxPQUFPLGFBQWEsQ0FBQztRQUN4QyxhQUFhLEdBQUcsSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O1lBQ2xELGtCQUFrQjtZQUNsQixNQUFNLGlCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7WUFDN0MsTUFBTSxTQUFTLEdBQUcsTUFBTSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUVqRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3BELE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTlDLE1BQU0sZ0JBQWdCLEdBQUcsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTztvQkFBRSxTQUFTO2dCQUV4QyxpQkFBaUI7Z0JBQ2pCLE1BQU0sYUFBYSxHQUNmLE1BQUEsTUFBQSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsT0FBTywwQ0FBRSxNQUFNLG1DQUFJLEVBQUUsQ0FBQztnQkFDbkQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzNDLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFbkMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO3dCQUFFLFNBQVM7b0JBQzlCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQzVCLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQ2pDLFNBQVMsQ0FBQyxJQUFJLENBQ2pCLENBQUM7b0JBRUYsTUFBTSxXQUFXLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUMxQztnQkFFRCxvQkFBb0I7Z0JBQ3BCLE1BQU0sZ0JBQWdCLEdBQ2xCLE1BQUEsTUFBQSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsT0FBTywwQ0FBRSxTQUFTLG1DQUFJLEVBQUUsQ0FBQztnQkFDdEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDOUMsTUFBTSxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXRDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTt3QkFBRSxTQUFTO29CQUM5QixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUM1QixnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUNqQyxTQUFTLENBQUMsSUFBSSxDQUNqQixDQUFDO29CQUVGLE1BQU0sV0FBVyxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQztpQkFDN0M7YUFDSjtZQUVELGtCQUFrQjtZQUNsQixNQUFNLFdBQVcsQ0FBQyxHQUFHLFNBQVMsRUFBRSxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFFckQscUJBQXFCO1lBQ3JCLE1BQU0sV0FBVyxDQUFDLEdBQUcsU0FBUyxFQUFFLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztZQUUzRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNILE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxNQUFNLE9BQU87UUFFVCxZQUFZLEdBQUc7WUFEZixXQUFNLEdBQWEsRUFBRSxDQUFDO1lBRWxCLElBQUksR0FBRztnQkFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQ0QsT0FBTyxDQUFDLEdBQUc7WUFDUCxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUFFLE9BQU8sSUFBSSxDQUFDO1lBQ25DLElBQUksT0FBTyxHQUFHLEtBQUssVUFBVTtnQkFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDM0MsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztnQkFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO1FBQ0QsSUFBSSxDQUFDLEdBQUc7WUFDSixJQUFJLE9BQU8sR0FBRyxLQUFLLFVBQVU7Z0JBQUUsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQzNDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdEIsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztRQUNELFFBQVE7WUFDSixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xDLENBQUM7S0FDSjtJQUVELE9BQU87UUFDSCxhQUFhLEVBQUUsT0FBTztRQUNoQixJQUFJLENBQUMsSUFBSTs7O2dCQUNYLFFBQVEsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFFckMsTUFBTSxLQUFLLEVBQUUsQ0FBQztnQkFFZCxJQUFJLE1BQUEsTUFBQSxJQUFJLENBQUMsTUFBTSwwQ0FBRSxLQUFLLDBDQUFFLElBQUksRUFBRTtvQkFDMUIsSUFBSSxDQUFDLE9BQU8sRUFBRTt3QkFDVixPQUFPLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUNsRDtvQkFFRCxNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFO3dCQUNoRCxPQUFPLEVBQUU7NEJBQ0wsS0FBSyxFQUFFLElBQUk7eUJBQ2Q7cUJBQ0osQ0FBQyxDQUFDO29CQUNILE1BQU0sSUFBSSxHQUFHLFlBQVksQ0FBQzt3QkFDdEIsUUFBUTt3QkFDUixLQUFLLEVBQUUsUUFBUSxDQUFDLElBQUk7cUJBQ3ZCLENBQUMsQ0FBQztvQkFFSCxnRUFBZ0U7b0JBQ2hFLGdCQUFnQjtvQkFDaEIsZ0NBQWdDO29CQUNoQyw0QkFBNEI7b0JBQzVCLDZDQUE2QztvQkFDN0MsbUJBQW1CO29CQUNuQiw2QkFBNkI7b0JBQzdCLFlBQVk7b0JBQ1osVUFBVTtvQkFDVixJQUFJO2lCQUNQOztTQUNKO1FBRUssUUFBUSxDQUFDLElBQUk7OztnQkFDZixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUM3QixPQUFPO2lCQUNWO2dCQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRywwQkFBMEIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3hELE1BQU0sRUFBRSxHQUFHLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN6QyxNQUFNLEVBQUUsRUFBRSxDQUFDO2lCQUNkO2dCQUVELE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7b0JBQy9DLEdBQUcsRUFBRSxHQUFHLFNBQVMsRUFBRSxpQkFBaUI7aUJBQ3ZDLENBQUMsQ0FBQztnQkFFSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsbUJBQW1CLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNqRCxNQUFNLElBQUksR0FBRyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEMsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsR0FBRyxNQUFNLE1BQU0sQ0FDekMsR0FBRyxTQUFTLEVBQUUsbUJBQW1CLElBQUksRUFBRSxDQUMxQyxDQUFDO29CQUNGLE1BQU0sV0FBVyxDQUFDO3dCQUNkLElBQUk7d0JBQ0osVUFBVTtxQkFDYixDQUFDLENBQUM7aUJBQ047Z0JBRUQsa0NBQWtDO2dCQUNsQyw0REFBNEQ7Z0JBQzVELHFCQUFxQjtnQkFDckIsMkJBQTJCO2dCQUMzQixhQUFhO2dCQUNiLFVBQVU7Z0JBQ1Ysa0NBQWtDO2dCQUNsQyxvQkFBb0I7Z0JBQ3BCLGdDQUFnQztnQkFDaEMsVUFBVTtnQkFFVixvRUFBb0U7Z0JBQ3BFLElBQUk7Z0JBRUosUUFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQztvQkFDbkMsSUFBSSxFQUFFLGVBQWUsTUFBTSxDQUFDLFFBQVEsQ0FDaEMsYUFBYSxFQUFFLEVBQ2YsTUFBQSxNQUFBLElBQUksQ0FBQyxNQUFNLDBDQUFFLEtBQUssMENBQUUsSUFBSSxDQUMzQixTQUFTO2lCQUNiLENBQUMsQ0FBQzs7U0FDTjtRQUNLLE1BQU0sQ0FBQyxNQUFNLEVBQUUsVUFBVTs7Z0JBQzNCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQy9CLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztvQkFFbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRTt3QkFDdkIsT0FBTyxHQUFHLEdBQUcsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztxQkFDN0Q7b0JBRUQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRTt3QkFDdkIsTUFBTSxJQUFJLEtBQUssQ0FDWCxnRkFBZ0YsTUFBTSxDQUFDLElBQUksK0JBQStCLENBQzdILENBQUM7cUJBQ0w7b0JBRUQsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUMvQixNQUFNLFVBQVUsR0FDWixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxRQUFRO3dCQUN0QyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7d0JBQ3hDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFFdEIsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQztvQkFDM0MsTUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQztvQkFFdEQsTUFBTSxlQUFlLEdBQUcsTUFBTSxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7b0JBQ2pFLE1BQU0sTUFBTSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO29CQUV6RCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUM7b0JBQ25CLElBQUksTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDO3dCQUN2QixNQUFNO3dCQUNOLE1BQU07d0JBQ04sTUFBTTt3QkFDTixTQUFTO3dCQUNULE9BQU87d0JBQ1AsT0FBTzt3QkFDUCxjQUFjO3dCQUNkLGFBQWEsQ0FBQyxNQUFNLEdBQUcsRUFBRTs0QkFDckIsT0FBTyxhQUFhLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUN6QyxDQUFDO3dCQUNELFdBQVcsQ0FBQyxLQUFLOzRCQUNiLFdBQVcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQy9CLENBQUM7d0JBQ0QsV0FBVyxDQUFDLEdBQUc7NEJBQ1gsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUMvQixJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUN0QixDQUFDO3dCQUNELFNBQVMsQ0FBQyxHQUFHOzRCQUNULE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQzs0QkFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDckIsQ0FBQzt3QkFDRCxVQUFVO3dCQUNWLFVBQVU7d0JBQ1YsVUFBVTt3QkFDVixxQkFBcUIsQ0FBQyxFQUFZOzRCQUM5QiwwQkFBMEIsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ3hDLENBQUM7d0JBQ0QsT0FBTyxFQUFFLFNBQVM7d0JBQ2xCLFFBQVE7cUJBQ1gsQ0FBQyxDQUFDO29CQUVILElBQUksTUFBTSxFQUFFO3dCQUNSLE1BQU0sR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7d0JBQ2pDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7cUJBQy9CO2lCQUNKO3FCQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQUU7b0JBQ3JDLGlCQUFpQjtvQkFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZO3dCQUFFLE9BQU87b0JBRW5DLHdEQUF3RDtvQkFDeEQsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7d0JBQUUsT0FBTztvQkFFMUMsTUFBTSxPQUFPLEdBQ1QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUTt3QkFDeEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO3dCQUMxQyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBRXRCLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztvQkFFL0QsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ3hCLE1BQU0sSUFBSSxLQUFLLENBQ1gsNkVBQTZFLElBQUksMENBQTBDLENBQzlILENBQUM7cUJBQ0w7b0JBRUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBRTlELE1BQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3pCLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztpQkFDbkI7WUFDTCxDQUFDO1NBQUE7UUFDSyxXQUFXLENBQUMsSUFBSTs7Z0JBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSTtvQkFBRSxPQUFPO2dCQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLE1BQU0sbUJBQW1CLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZELENBQUM7U0FBQTtLQUNKLENBQUM7QUFDTixDQUFDLENBQUM7QUFDRixNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztBQUN0QixNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQzVCLGVBQWUsTUFBTSxDQUFDIn0=