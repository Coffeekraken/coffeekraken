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
let packageHash = (0, fs_1.__folderHash)(path_2.default.dirname((0, fs_1.__dirname)()));
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
    // const classmap = new __SClassmap();
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
            // process some tokens
            folderPath = (0, token_1.__replaceTokens)(folderPath);
            // update plugin hash with these new folders hash
            externalPackagesHashes.push((0, fs_1.__folderHash)(folderPath));
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
                        // classmap,
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
                const { default: processorFn } = yield Promise.resolve().then(() => __importStar(require(`${(0, fs_1.__dirname)()}/postProcessors/${path}`)));
                yield processorFn({
                    CssVars: CssVars_1.default,
                    packageHash,
                    themeHash,
                    // classmap
                    postcssApi: postcss_1.default,
                    getRoot: getRoot_1.default,
                    settings,
                    root,
                    sharedData,
                });
            }
            // compress --s-theme-... variables
            if (settings.compress.variables) {
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
                        // classmap,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLG9FQUE2QztBQUM3QyxnRUFBeUM7QUFDekMsa0ZBQTBEO0FBQzFELDhFQUFzRDtBQUN0RCxvRUFBNkM7QUFDN0MsK0NBQWlFO0FBQ2pFLHVEQUF1RTtBQUN2RSxtREFBNEQ7QUFDNUQsdURBQXVEO0FBQ3ZELHFEQUE0RDtBQUM1RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQUMxQixzREFBZ0M7QUFDaEMsOERBQXdDO0FBRXhDLGlEQUE0RDtBQUM1RCx3REFBa0M7QUFFbEMsTUFBTSxXQUFXLEdBQUcsRUFBRSxFQUNsQixjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQ3hCLE1BQU0sc0JBQXNCLEdBQWEsRUFBRSxDQUFDO0FBQzVDLElBQUksV0FBVyxHQUFHLElBQUEsaUJBQVksRUFBQyxjQUFNLENBQUMsT0FBTyxDQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzVELElBQUksYUFBYSxFQUFFLGtCQUFrQixDQUFDO0FBRXRDLE1BQU0sVUFBVSxHQUFHO0lBQ2YsVUFBVSxFQUFFLElBQUk7SUFDaEIsYUFBYSxFQUFFLEVBQUU7Q0FDcEIsQ0FBQztBQThCRixTQUFnQixnQkFBZ0I7SUFDNUIsT0FBTyx3QkFBd0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRkQsNENBRUM7QUFDRCxTQUFnQixhQUFhO0lBQ3pCLE9BQU8sd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUZELHNDQUVDO0FBRUQsU0FBZ0Isd0JBQXdCLENBQUMsSUFBNEI7SUFDakUsc0JBQXNCO0lBQ3RCLE1BQU0sVUFBVSxHQUFHLElBQUEsdUJBQWUsRUFBQyxHQUFHLElBQUEsY0FBUyxHQUFFLElB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