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
        lod: {},
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
            lod: s_theme_1.default.current.get('lod'),
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
                console.log(`<yellow>[sugarcssPlugin]</yellow> You're lod.method setting has been updated to "<magenta>class</magenta>" cause the "<yellow>${settings.lod.method}</yellow>" method is only available for "<cyan>production</cyan>" target...`);
            }
            settings.lod.method = 'class';
        }
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