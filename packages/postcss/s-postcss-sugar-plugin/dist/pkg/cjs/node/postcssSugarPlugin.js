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
const getRoot_1 = __importDefault(require("./utils/getRoot"));
const css_1 = require("@coffeekraken/sugar/css");
const CssVars_1 = __importDefault(require("./CssVars"));
const mixinsStack = {}, functionsStack = {};
const externalPackagesHashes = [];
let packageHash = (0, fs_1.__folderHashSync)(path_2.default.dirname((0, fs_1.__dirname)()));
let loadedPromise, compileFileTimeout;
const sharedData = {
    isPristine: true,
    frontSettings: {},
};
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
        compress: {
            variables: undefined,
        },
        target: (_a = s_env_1.default.get('target')) !== null && _a !== void 0 ? _a : 'vite',
        plugins: [],
        partials: true,
        verbose: s_env_1.default.is('verbose'),
        // @ts-ignore
    }, settings);
    let themeHash, settingsHash, bench;
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
            clean: s_sugar_config_1.default.get('postcssSugarPlugin.clean'),
            compress: s_sugar_config_1.default.get('postcssSugarPlugin.compress'),
            lod: s_theme_1.default.get('lod'),
        });
        // clean if set to undefined and target is production
        if (settings.target === 'production') {
            if (settings.clean.variables === undefined) {
                settings.clean.variables = true;
            }
        }
        // compress if set to undefined and target is production
        if (settings.target === 'production') {
            if (settings.compress.variables === undefined) {
                settings.compress.variables = true;
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
        // build the frontSettings
        sharedData.frontSettings = {
            lod: settings.lod,
            clean: settings.clean,
            compress: settings.compress,
        };
        // set the settings hash
        settingsHash = (0, object_1.__objectHash)(settings);
        // set theme hash
        themeHash = s_theme_1.default.hash();
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
            // update config
            updateConfig();
            _configLoaded = true;
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
            var _a;
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
                const { default: fn, interface: int, dependencies, } = yield (_a = path, Promise.resolve().then(() => __importStar(require(_a))));
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
            var _a;
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
                const { default: processorFn } = yield (_a = `${(0, fs_1.__dirname)()}/postProcessors/${path}`, Promise.resolve().then(() => __importStar(require(_a))));
                yield processorFn({
                    CssVars: CssVars_1.default,
                    packageHash,
                    themeHash,
                    postcssApi: postcss_1.default,
                    getRoot: getRoot_1.default,
                    settings,
                    root,
                    sharedData,
                });
            }
            // compress --s-... variables
            if (settings.compress.variables) {
                root.walkDecls((node) => {
                    if (node.variable) {
                        if (node.prop.match(/--s-/)) {
                            const compressedProp = (0, css_1.__compressCssVarName)(node.prop);
                            node.prop = compressedProp;
                        }
                    }
                    const valueMatches = node.value.match(/--s-[^,\)]+/gm);
                    if (valueMatches) {
                        valueMatches.forEach((match) => {
                            node.value = node.value.replace(match, (0, css_1.__compressCssVarName)(match));
                        });
                    }
                });
            }
            return root;
        });
    }
    const pluginObj = {
        postcssPlugin: 'sugar',
        Once(root, ...args) {
            var _a, _b, _c;
            return __awaiter(this, void 0, void 0, function* () {
                // save the rootFilePath in shared data
                // for use in mixins, postcss, etc...
                if (!sharedData.rootFilePath) {
                    sharedData.rootFilePath = (_b = (_a = root.source) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.file;
                }
                bench = new s_bench_1.default(`postcssSugarPlugin.${(_c = root.source.input.file) === null || _c === void 0 ? void 0 : _c.replace((0, path_1.__packageRootDir)(), '').replace((0, path_1.__packageRootDir)(process.cwd(), {
                    highest: true,
                }), '')}`);
                yield _load();
                // calculate the final hash depending on the
                // packageHash, settingsHash and themeHash
                // cacheHash = `${packageHash}-${settingsHash}-${themeHash}-${__base64.encrypt(
                //     externalPackagesHashes.join('-'),
                // )}`;
                // message when a file takes time to compile
                clearTimeout(compileFileTimeout);
                compileFileTimeout = setTimeout(() => {
                    console.log(`<yellow>[postcss]</yellow> Your file <cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), root.source.input.file)}</cyan> take some times to compile. Please wait...`);
                }, 3000);
            });
        },
        OnceExit(root) {
            var _a;
            return __awaiter(this, void 0, void 0, function* () {
                // post processors
                yield postProcessors(root);
                // front settings
                root.nodes.push(postcss_1.default.rule({
                    selector: 'body:after',
                    nodes: postcss_1.default
                        .parse(`
                    display: none;
                    content: '${JSON.stringify((_a = sharedData.frontSettings) !== null && _a !== void 0 ? _a : {})}';
                `)
                        .nodes.map((decl) => {
                        decl.value += ';';
                        return decl;
                    }),
                }));
                // end the bench
                bench.end();
                // mark the plugin as not pristine anymore... slut... :)
                sharedData.isPristine = false;
            });
        },
        AtRule(atRule, postcssApi) {
            var _a, _b;
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
                    let mixinResult;
                    delete params.help;
                    mixinResult = yield mixinFn({
                        params,
                        atRule,
                        findUp,
                        nodesToString,
                        CssVars: CssVars_1.default,
                        packageHash,
                        themeHash,
                        // cacheDir,
                        getRoot: getRoot_1.default,
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
                    if (mixinResult) {
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
                    const dirName = typeof ((_b = (_a = atRule.source) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.file) === 'string'
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLG9FQUE2QztBQUM3QyxnRUFBeUM7QUFDekMsa0ZBQTBEO0FBQzFELDhFQUFzRDtBQUN0RCxvRUFBNkM7QUFDN0MsK0NBQXFFO0FBQ3JFLHVEQUF1RTtBQUN2RSxtREFBNEQ7QUFDNUQsdURBQXVEO0FBQ3ZELHFEQUE0RDtBQUM1RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQUMxQixzREFBZ0M7QUFDaEMsOERBQXdDO0FBRXhDLGlEQUErRDtBQUMvRCx3REFBa0M7QUFFbEMsTUFBTSxXQUFXLEdBQUcsRUFBRSxFQUNsQixjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLE1BQU0sc0JBQXNCLEdBQWEsRUFBRSxDQUFDO0FBQzVDLElBQUksV0FBVyxHQUFHLElBQUEscUJBQWdCLEVBQUMsY0FBTSxDQUFDLE9BQU8sQ0FBQyxJQUFBLGNBQVMsR0FBRSxDQUFDLENBQUMsQ0FBQztBQUNoRSxJQUFJLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQztBQUV0QyxNQUFNLFVBQVUsR0FBRztJQUNmLFVBQVUsRUFBRSxJQUFJO0lBQ2hCLGFBQWEsRUFBRSxFQUFFO0NBQ3BCLENBQUM7QUE4QkYsU0FBZ0IsZ0JBQWdCO0lBQzVCLE9BQU8sd0JBQXdCLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDakQsQ0FBQztBQUZELDRDQUVDO0FBQ0QsU0FBZ0IsYUFBYTtJQUN6QixPQUFPLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlDLENBQUM7QUFGRCxzQ0FFQztBQUVELFNBQWdCLHdCQUF3QixDQUFDLElBQTRCO0lBQ2pFLHNCQUFzQjtJQUN0QixNQUFNLFVBQVUsR0FBRyxJQUFBLHVCQUFlLEVBQUMsR0FBRyxJQUFBLGNBQVMsR0FBRSxJ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