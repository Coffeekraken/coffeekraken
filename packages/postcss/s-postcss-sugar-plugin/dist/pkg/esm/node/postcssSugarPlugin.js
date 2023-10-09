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
import __getRoot from './utils/getRoot.js';
import __CssVars from './CssVars.js';
const mixinsStack = {}, functionsStack = {};
const externalPackagesHashes = [];
let packageHash = __folderHashSync(__path.dirname(__dirname()));
let loadedPromise, compileFileTimeout;
const sharedData = {
    isPristine: true,
    scope: {
        no: [],
        scope: [],
    },
};
const frontData = {};
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
    var _a;
    settings = __deepMerge({
        outDir: '',
        excludeByTypes: [],
        excludeCommentByTypes: [],
        excludeCodeByTypes: [],
        lod: {},
        classmap: {},
        clean: {
            variables: undefined,
        },
        target: (_a = __SEnv.get('target')) !== null && _a !== void 0 ? _a : 'vite',
        plugins: [],
        chunks: false,
        verbose: __SEnv.is('verbose'),
    }, settings);
    let themeHash, settingsHash;
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
            viewsRootDirs: __SSugarConfig.get('postcssSugarPlugin.viewsRootDirs'),
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
            if (settings.lod.method !== 'class' &&
                !_configLoaded &&
                sharedData.isPristine) {
                console.log(`<yellow>[postcssSugarPlugin]</yellow> You're lod.method setting has been updated to "<magenta>class</magenta>" cause the "<yellow>${settings.lod.method}</yellow>" method is only available for "<cyan>production</cyan>" target...`);
            }
            settings.lod.method = 'class';
        }
        // set the settings hash
        settingsHash = __objectHash(settings);
        // set theme hash
        themeHash = __STheme.hash();
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
            // update config
            updateConfig();
            _configLoaded = true;
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
    const postProcessorsRegisteredFn = [];
    function _loadFolder(folderPath, type) {
        return __awaiter(this, void 0, void 0, function* () {
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
                const importedProcessor = yield import(path);
                let fn = importedProcessor.default, int = importedProcessor.interface, dependencies = importedProcessor.dependencies;
                // CJS compatibility
                if (importedProcessor.__esModule) {
                    fn = fn.default;
                }
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
        var _a, _b, _c;
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
            if (!value.match(/\s?s\.[a-zA-Z0-9]+.*/))
                return value;
            const calls = value.match(/@?s\.[a-zA-Z0-9\.]+\((?:[^\)]+|\([^\(;,]*\(;,){0,999999999999999999999}\)/gm);
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
                const functionName = sugarStatement.match(/s\.([a-zA-Z0-9\.]+)/)[1];
                const paramsStatement = sugarStatement.replace(/s\.[a-zA-Z0-9\.]+/, '');
                let fnId = functionName;
                if (!stack[fnId]) {
                    fnId = `${fnId}.${fnId.split('.').slice(-1)[0]}`;
                }
                const fnObject = (_c = (_b = stack[fnId]) === null || _b === void 0 ? void 0 : _b.default) !== null && _c !== void 0 ? _c : stack[fnId];
                if (!fnObject) {
                    throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${fnId}</yellow>" does not exists...`);
                }
                const functionInterface = stack[fnId].interface;
                const params = functionInterface.apply(paramsStatement, {});
                delete params.help;
                function themeValueProxy(dotPathOrValue) {
                    const value = __STheme.getSafe(dotPathOrValue);
                    if (value !== undefined) {
                        return value;
                    }
                    if (dotPathOrValue.match(/^ui\.[a-zA-Z0-9]+\./)) {
                        const defaultValue = __STheme.getSafe(dotPathOrValue.replace(/^ui\.[a-zA-Z0-9]+\./, 'ui.default.'));
                        if (defaultValue !== undefined) {
                            return defaultValue;
                        }
                    }
                    return dotPathOrValue;
                }
                try {
                    const result = yield fnObject.fn({
                        params,
                        atRule,
                        settings,
                        // cacheDir,
                        packageHash,
                        themeHash,
                        themeValueProxy,
                    });
                    value = value.replace(sugarStatement, result);
                }
                catch (e) {
                    console.log(e.message);
                    throw e;
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
    /**
     * Run the postProcessors on the passed AST
     *
     * @async
     */
    function postProcessors(root) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < postProcessorsRegisteredFn.length; i++) {
                const fn = postProcessorsRegisteredFn[i];
                yield fn(root);
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
                let { default: processorFn } = yield import(`${__dirname()}/postProcessors/${path}`);
                if (processorFn.default)
                    processorFn = processorFn.default;
                yield processorFn({
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
        });
    }
    const pluginObj = {
        postcssPlugin: 'sugar',
        Once(root, ...args) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                // save the rootFilePath in shared data
                // for use in mixins, postcss, etc...
                if (!sharedData.rootFilePath) {
                    sharedData.rootFilePath = (_b = (_a = root.source) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.file;
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
                yield _load();
                // calculate the final hash depending on the
                // packageHash, settingsHash and themeHash
                // cacheHash = `${packageHash}-${settingsHash}-${themeHash}-${__base64.encrypt(
                //     externalPackagesHashes.join('-'),
                // )}`;
                // message when a file takes time to compile
                clearTimeout(compileFileTimeout);
                compileFileTimeout = setTimeout(() => {
                    console.log(`<yellow>[postcss]</yellow> Your file <cyan>${__path.relative(__packageRootDir(), root.source.input.file)}</cyan> take some times to compile. Please wait...`);
                }, 3000);
            });
        },
        OnceExit(root) {
            return __awaiter(this, void 0, void 0, function* () {
                // post processors
                yield postProcessors(root);
                // front data only in the main file
                if (Object.keys(frontData).length) {
                    root.nodes.push(__postcss.rule({
                        selector: 'body:after',
                        nodes: __postcss
                            .parse(`
                    display: none;
                    content: '${JSON.stringify(frontData !== null && frontData !== void 0 ? frontData : {})}';
                `)
                            .nodes.map((decl) => {
                            decl.value += ';';
                            return decl;
                        }),
                    }));
                }
                // end the bench
                // bench.end();
                // mark the plugin as not pristine anymore... slut... :)
                sharedData.isPristine = false;
            });
        },
        AtRule(atRule, postcssApi) {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function* () {
                if (atRule.name.match(/^s\./)) {
                    let mixinId = atRule.name.replace(/^s\./, '');
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
                    // handle the @s.scope(.exclude) mixins
                    if (mixinInterface.definition.scope) {
                        // "scope" that specify exactyle the scope we want
                        if (atRule._scope) {
                            params.scope = atRule._scope;
                        }
                        else if (
                        // "noScope" that specify which scope(s) to exclude
                        atRule._scopeExclude) {
                            // get the default scopes from the interface and remove the unwanted ones
                            params.scope = ((_a = mixinInterface.definition.scope.default) !== null && _a !== void 0 ? _a : []).filter((s) => !atRule._scopeExclude.includes(s));
                        }
                    }
                    let mixinResult;
                    delete params.help;
                    mixinResult = yield mixinFn({
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
                        registerPostProcessor(fn) {
                            postProcessorsRegisteredFn.push(fn);
                        },
                        postcss: __postcss,
                        settings,
                    });
                    if (typeof mixinResult === 'function') {
                        mixinResult();
                    }
                    else if (mixinResult) {
                        mixinResult = contentToString(mixinResult);
                        replaceWith(atRule, mixinResult);
                    }
                }
                else if (atRule.name.match(/^import/)) {
                    // check settings
                    if (settings.target === 'vite')
                        return;
                    // do not take care of imported assets using url('...');
                    if (atRule.params.match(/^url\(/))
                        return;
                    // do not take care of imported assets that are not "local"
                    // and that starts by https?
                    if (atRule.params.match(/^https?:\/\//))
                        return;
                    // if (!atRule.source?.input) {
                    //     throw new Error(
                    //         `Make sure to import your stylesheets using the "<cyan>@import url(...);</cyan>" syntax and not the "<red>@import '...';</red>" one...`,
                    //     );
                    // }
                    const dirName = typeof ((_c = (_b = atRule.source) === null || _b === void 0 ? void 0 : _b.input) === null || _c === void 0 ? void 0 : _c.file) === 'string'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQUN6QyxPQUFPLGNBQWMsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLFlBQVksTUFBTSw0QkFBNEIsQ0FBQztBQUN0RCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxPQUFPLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDckUsT0FBTyxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN2RSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQzVELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLFNBQVMsTUFBTSxvQkFBb0IsQ0FBQztBQUUzQyxPQUFPLFNBQVMsTUFBTSxjQUFjLENBQUM7QUFFckMsTUFBTSxXQUFXLEdBQUcsRUFBRSxFQUNsQixjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLE1BQU0sc0JBQXNCLEdBQWEsRUFBRSxDQUFDO0FBQzVDLElBQUksV0FBVyxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2hFLElBQUksYUFBYSxFQUFFLGtCQUFrQixDQUFDO0FBSXRDLE1BQU0sVUFBVSxHQUFHO0lBQ2YsVUFB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