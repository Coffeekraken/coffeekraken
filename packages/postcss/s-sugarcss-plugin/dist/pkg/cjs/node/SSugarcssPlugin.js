"use strict";
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
const s_env_1 = __importDefault(require("@coffeekraken/s-env"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_sugar_json_1 = __importDefault(require("@coffeekraken/s-sugar-json"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const string_1 = require("@coffeekraken/sugar/string");
const token_1 = require("@coffeekraken/sugar/token");
const fs_2 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const path_2 = __importDefault(require("path"));
const postcss_1 = __importDefault(require("postcss"));
const getRoot_js_1 = __importDefault(require("./utils/getRoot.js"));
const clipboard_1 = require("@coffeekraken/sugar/clipboard");
const CssVars_js_1 = __importDefault(require("./CssVars.js"));
const mixinsStack = {}, functionsStack = {};
const externalPackagesHashes = [];
let packageHash = (0, fs_1.__folderHashSync)(path_2.default.dirname((0, fs_1.__dirname)()));
let loadedPromise, compileFileTimeout;
const sharedData = {
    isPristine: true,
    scope: {
        no: [],
        scope: [],
    },
};
const frontData = {};
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
    var _a;
    settings = (0, object_1.__deepMerge)({
        outDir: '',
        excludeByTypes: [],
        excludeCommentByTypes: [],
        excludeCodeByTypes: [],
        // lod: {},
        clean: {
            variables: undefined,
        },
        target: (_a = s_env_1.default.get('target')) !== null && _a !== void 0 ? _a : 'vite',
        plugins: [],
        chunks: false,
        verbose: s_env_1.default.is('verbose'),
    }, settings);
    let themeHash, settingsHash;
    if (_configLoaded) {
        updateConfig();
    }
    function updateConfig() {
        var _a, _b, _c;
        settings = (0, object_1.__deepMerge)(settings, {
            outDir: s_sugar_config_1.default.get('sugarcssPlugin.outDir'),
            excludeByTypes: s_sugar_config_1.default.get('sugarcssPlugin.excludeByTypes'),
            excludeCommentByTypes: s_sugar_config_1.default.get('sugarcssPlugin.excludeCommentByTypes'),
            excludeCodeByTypes: s_sugar_config_1.default.get('sugarcssPlugin.excludeCodeByTypes'),
            viewsRootDirs: s_sugar_config_1.default.get('sugarcssPlugin.viewsRootDirs'),
            clean: s_sugar_config_1.default.get('sugarcssPlugin.clean'),
            // lod: __STheme.current.get('lod'),
        });
        // clean if set to undefined and target is production
        if (settings.target === 'production') {
            if (settings.clean.variables === undefined) {
                settings.clean.variables = true;
            }
        }
        // // lod method if the target is not production
        // if (settings.target !== 'production') {
        //     if (
        //         settings.lod.method !== 'class' &&
        //         !_configLoaded &&
        //         sharedData.isPristine
        //     ) {
        //         console.log(
        //             `<yellow>[sugarcssPlugin]</yellow> You're lod.method setting has been updated to "<magenta>class</magenta>" cause the "<yellow>${settings.lod.method}</yellow>" method is only available for "<cyan>production</cyan>" target...`,
        //         );
        //     }
        //     settings.lod.method = 'class';
        // }
        // set the settings hash
        settingsHash = (0, object_1.__objectHash)(settings);
        // set theme hash
        themeHash = s_theme_1.default.current.hash();
        if ((_a = settings.excludeByTypes) === null || _a === void 0 ? void 0 : _a.length) {
            CssVars_js_1.default.excludeByTypes(settings.excludeByTypes);
        }
        if ((_b = settings.excludeCommentByTypes) === null || _b === void 0 ? void 0 : _b.length) {
            CssVars_js_1.default.excludeCommentByTypes(settings.excludeCommentByTypes);
        }
        if ((_c = settings.excludeCodeByTypes) === null || _c === void 0 ? void 0 : _c.length) {
            CssVars_js_1.default.excludeCodeByTypes(settings.excludeCodeByTypes);
        }
    }
    function _loadConfig() {
        return __awaiter(this, void 0, void 0, function* () {
            yield s_sugar_config_1.default.load();
            // update config
            updateConfig();
            _configLoaded = true;
            return true;
        });
    }
    function contentToArray(content) {
        if (content instanceof CssVars_js_1.default) {
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
    const postProcessorsRegisteredFn = [];
    function _loadFolder(folderPath, type) {
        return __awaiter(this, void 0, void 0, function* () {
            // process some tokens
            folderPath = (0, token_1.__replaceTokens)(folderPath);
            // update plugin hash with these new folders hash
            externalPackagesHashes.push((0, fs_1.__folderHashSync)(folderPath));
            const paths = glob_1.default.sync(`${folderPath}/**/*.js`, {
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
                    throw new Error(`<red>[sugarcssPlugin]</red> Sorry but the requested function "<yellow>${fnId}</yellow>" does not exists...`);
                }
                const functionInterface = stack[fnId].interface;
                const params = functionInterface.apply(paramsStatement, {});
                delete params.help;
                function themeValueProxy(dotPathOrValue) {
                    const value = s_theme_1.default.current.getSafe(dotPathOrValue);
                    if (value !== undefined) {
                        return value;
                    }
                    if (dotPathOrValue.match(/^ui\.[a-zA-Z0-9]+\./)) {
                        const defaultValue = s_theme_1.default.current.getSafe(dotPathOrValue.replace(/^ui\.[a-zA-Z0-9]+\./, 'ui.default.'));
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
            const postProcessorsPaths = glob_1.default
                .sync('**/*.js', {
                cwd: `${(0, fs_1.__dirname)()}/postProcessors`,
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
                let { default: processorFn } = yield import(`${(0, fs_1.__dirname)()}/postProcessors/${path}`);
                if (processorFn.default)
                    processorFn = processorFn.default;
                yield processorFn({
                    CssVars: CssVars_js_1.default,
                    packageHash,
                    themeHash,
                    postcssApi: postcss_1.default,
                    getRoot: getRoot_js_1.default,
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
        postcssPlugin: 'sugarcss',
        Once(root, ...args) {
            var _a, _b;
            return __awaiter(this, void 0, void 0, function* () {
                // save the rootFilePath in shared data
                // for use in mixins, postcss, etc...
                if (!sharedData.rootFilePath) {
                    sharedData.rootFilePath = (_b = (_a = root.source) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.file;
                }
                // console.log('SS', __SSugarConfig.get('carpenter'));
                yield _load();
                // message when a file takes time to compile
                clearTimeout(compileFileTimeout);
                compileFileTimeout = setTimeout(() => {
                    console.log(`<yellow>[postcss]</yellow> Your file <cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), root.source.input.file)}</cyan> take some times to compile. Please wait...`);
                }, 3000);
            });
        },
        OnceExit(root) {
            return __awaiter(this, void 0, void 0, function* () {
                // post processors
                yield postProcessors(root);
                // front data only in the main file
                if (Object.keys(frontData).length) {
                    (0, clipboard_1.__copy)(JSON.stringify(frontData));
                    const rawFrontData = JSON.parse(JSON.stringify(frontData));
                    root.nodes.push(postcss_1.default.rule({
                        selector: 'body:after',
                        nodes: postcss_1.default
                            .parse(`
                    display: none;
                    content: '${JSON.stringify((0, object_1.__deepMap)(rawFrontData !== null && rawFrontData !== void 0 ? rawFrontData : {}, ({ object, prop, value, path }) => {
                            if (typeof value === 'string') {
                                return value.replace(/\"/gm, '\\"');
                            }
                            return value;
                        }))}';
                `)
                            .nodes.map((decl) => {
                            decl.value += ';';
                            return decl;
                        }),
                    }));
                }
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
                        throw new Error(`<red>[sugarcssPlugin]</red> Sorry but the requested sugar mixin "<yellow>${atRule.name}</yellow>" does not exists...`);
                    }
                    const root = (0, getRoot_js_1.default)(atRule);
                    const sourcePath = typeof root.source.input.file === 'string'
                        ? path_2.default.dirname(root.source.input.file)
                        : (0, fs_1.__dirname)();
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
                        CssVars: CssVars_js_1.default,
                        packageHash,
                        themeHash,
                        // cacheDir,
                        getRoot: getRoot_js_1.default,
                        replaceWith(nodes) {
                            replaceWith(atRule, nodes);
                        },
                        atRootStart(css) {
                            const root = (0, getRoot_js_1.default)(atRule);
                            root.prepend(css);
                        },
                        atRootEnd(css) {
                            const root = (0, getRoot_js_1.default)(atRule);
                            root.append(css);
                        },
                        postcssApi,
                        sourcePath,
                        sharedData,
                        frontData,
                        registerPostProcessor(fn) {
                            postProcessorsRegisteredFn.push(fn);
                        },
                        postcss: postcss_1.default,
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
                        ? path_2.default.dirname(atRule.source.input.file)
                        : (0, fs_1.__dirname)();
                    const path = path_2.default.resolve(dirName, (0, string_1.__unquote)(atRule.params));
                    if (!fs_2.default.existsSync(path)) {
                        throw new Error(`<red>[sugarcssPlugin.@import]</red> You try to load the file "<yellow>${path}</yellow>" but this file does not exists`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxnRUFBeUM7QUFDekMsa0ZBQTBEO0FBQzFELDhFQUFzRDtBQUN0RCxvRUFBNkM7QUFDN0MsK0NBQXFFO0FBQ3JFLHVEQUlvQztBQUNwQyxtREFBNEQ7QUFDNUQsdURBQXVEO0FBQ3ZELHFEQUE0RDtBQUM1RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQUMxQixzREFBZ0M7QUFDaEMsb0VBQTJDO0FBRTNDLDZEQUF1RDtBQUV2RCw4REFBcUM7QUFFckMsTUFBTSxXQUFXLEdBQUcsRUFBRSxFQUNsQixjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLE1BQU0sc0JBQXNCLEdBQWEsRUFBRSxDQUFDO0FBQzVDLElBQUksV0FBVyxHQUFHLElBQUEscUJBQWdCLEVBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFBLGNBQVMsR0FBRSxDQUFDLENBQUMsQ0FBQztBQUNoRSxJQUFJLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQztBQUV0QyxNQUFNLFVBQVUsR0FBRztJQUNmLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLEtBQUssRUFBRTtRQUNILEVBQUUsRUFBRSxFQUFFO1FBQ04sS0FBSyxFQUFFLEVBQUU7S0FDWjtDQUNKLENBQUM7QUFFRixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFtQ3JCLFNBQWdCLGdCQUFnQjtJQUM1QixPQUFPLHdCQUF3QixDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFGRCw0Q0FFQztBQUNELFNBQWdCLGFBQWE7SUFDekIsT0FBTyx3QkFBd0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5QyxDQUFDO0FBRkQsc0NBRUM7QUFFRCxTQUFnQix3QkFBd0IsQ0FBQyxJQUE0QjtJQUNqRSxzQkFBc0I7SUFDdEIsTUFBTSxVQUFVLEdBQUcsSUFB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