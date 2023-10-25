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
        classmap: {},
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
            outDir: s_sugar_config_1.default.get('postcssSugarPlugin.outDir'),
            excludeByTypes: s_sugar_config_1.default.get('postcssSugarPlugin.excludeByTypes'),
            excludeCommentByTypes: s_sugar_config_1.default.get('postcssSugarPlugin.excludeCommentByTypes'),
            excludeCodeByTypes: s_sugar_config_1.default.get('postcssSugarPlugin.excludeCodeByTypes'),
            viewsRootDirs: s_sugar_config_1.default.get('postcssSugarPlugin.viewsRootDirs'),
            classmap: s_sugar_config_1.default.get('postcssSugarPlugin.classmap'),
            clean: s_sugar_config_1.default.get('postcssSugarPlugin.clean'),
            lod: s_theme_1.default.get('lod'),
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
        settingsHash = (0, object_1.__objectHash)(settings);
        // set theme hash
        themeHash = s_theme_1.default.hash();
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
                    throw new Error(`<red>[postcssSugarPlugin]</red> Sorry but the requested function "<yellow>${fnId}</yellow>" does not exists...`);
                }
                const functionInterface = stack[fnId].interface;
                const params = functionInterface.apply(paramsStatement, {});
                delete params.help;
                function themeValueProxy(dotPathOrValue) {
                    const value = s_theme_1.default.getSafe(dotPathOrValue);
                    if (value !== undefined) {
                        return value;
                    }
                    if (dotPathOrValue.match(/^ui\.[a-zA-Z0-9]+\./)) {
                        const defaultValue = s_theme_1.default.getSafe(dotPathOrValue.replace(/^ui\.[a-zA-Z0-9]+\./, 'ui.default.'));
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
        postcssPlugin: 'sugar',
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
                    root.nodes.push(postcss_1.default.rule({
                        selector: 'body:after',
                        nodes: postcss_1.default
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1DQUFtQztBQUNuQyxnRUFBeUM7QUFDekMsa0ZBQTBEO0FBQzFELDhFQUFzRDtBQUN0RCxvRUFBNkM7QUFDN0MsK0NBQXFFO0FBQ3JFLHVEQUF1RTtBQUN2RSxtREFBNEQ7QUFDNUQsdURBQXVEO0FBQ3ZELHFEQUE0RDtBQUM1RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQUMxQixzREFBZ0M7QUFDaEMsb0VBQTJDO0FBRTNDLDhEQUFxQztBQUVyQyxNQUFNLFdBQVcsR0FBRyxFQUFFLEVBQ2xCLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDeEIsTUFBTSxzQkFBc0IsR0FBYSxFQUFFLENBQUM7QUFDNUMsSUFBSSxXQUFXLEdBQUcsSUFBQSxxQkFBZ0IsRUFBQyxjQUFNLENBQUMsT0FBTyxDQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2hFLElBQUksYUFBYSxFQUFFLGtCQUFrQixDQUFDO0FBSXRDLE1BQU0sVUFBVSxHQUFHO0lBQ2YsVUFBVSxFQUFFLElBQUk7SUFDaEIsS0FBSyxFQUFFO1FBQ0gsRUFBRSxFQUFFLEVBQUU7UUFDTixLQUFLLEVBQUUsRUFBRTtLQUNaO0NBQ0osQ0FBQztBQUVGLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztBQW9DckIsU0FBZ0IsZ0JBQWdCO0lBQzVCLE9BQU8sd0JBQXdCLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUZELDRDQUVDO0FBQ0QsU0FBZ0IsYUFBYTtJQUN6QixPQUFPLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFGRCxzQ0FFQztBQUVELFNBQWdCLHdCQUF3QixDQUFDLElBQTRCO0lBQ2pFLHNCQUFzQjtJQUN0QixNQUFNLFVBQVUsR0FBRyxJQUFBLHVCQUFlLEVBQUMs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