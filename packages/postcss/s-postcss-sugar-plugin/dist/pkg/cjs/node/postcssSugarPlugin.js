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
const CssVars_1 = __importDefault(require("./CssVars"));
const mixinsStack = {}, functionsStack = {};
const externalPackagesHashes = [];
let packageHash = (0, fs_1.__folderHashSync)(path_2.default.dirname((0, fs_1.__dirname)()));
let loadedPromise, compileFileTimeout;
const sharedData = {
    isPristine: true,
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
        classmap: {},
        clean: {
            variables: undefined,
        },
        target: (_a = s_env_1.default.get('target')) !== null && _a !== void 0 ? _a : 'vite',
        plugins: [],
        partials: true,
        verbose: s_env_1.default.is('verbose'),
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
            return __awaiter(this, void 0, void 0, function* () {
                // post processors
                yield postProcessors(root);
                // // front settings
                // root.nodes.push(
                //     __postcss.rule({
                //         selector: 'body:after',
                //         nodes: __postcss
                //             .parse(
                //                 `
                //         display: none;
                //         content: '${JSON.stringify(
                //             sharedData.frontSettings ?? {},
                //         )}';
                //     `,
                //             )
                //             .nodes.map((decl) => {
                //                 decl.value += ';';
                //                 return decl;
                //             }),
                //     }),
                // );
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsbUNBQW1DO0FBQ25DLG9FQUE2QztBQUM3QyxnRUFBeUM7QUFDekMsa0ZBQTBEO0FBQzFELDhFQUFzRDtBQUN0RCxvRUFBNkM7QUFDN0MsK0NBQXFFO0FBQ3JFLHVEQUF1RTtBQUN2RSxtREFBNEQ7QUFDNUQsdURBQXVEO0FBQ3ZELHFEQUE0RDtBQUM1RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQUMxQixzREFBZ0M7QUFDaEMsOERBQXdDO0FBRXhDLHdEQUFrQztBQUVsQyxNQUFNLFdBQVcsR0FBRyxFQUFFLEVBQ2xCLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDeEIsTUFBTSxzQkFBc0IsR0FBYSxFQUFFLENBQUM7QUFDNUMsSUFBSSxXQUFXLEdBQUcsSUFBQSxxQkFBZ0IsRUFBQyxjQUFNLENBQUMsT0FBTyxDQUFDLElBQUEsY0FBUyxHQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2hFLElBQUksYUFBYSxFQUFFLGtCQUFrQixDQUFDO0FBSXRDLE1BQU0sVUFBVSxHQUFHO0lBQ2YsVUFBVSxFQUFFLElBQUk7Q0FDbkIsQ0FBQztBQTBCRixTQUFnQixnQkFBZ0I7SUFDNUIsT0FBTyx3QkFBd0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNqRCxDQUFDO0FBRkQsNENBRUM7QUFDRCxTQUFnQixhQUFhO0lBQ3pCLE9BQU8sd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUMsQ0FBQztBQUZELHNDQUVDO0FBRUQsU0FBZ0Isd0JBQXdCLENBQUMsSUFBNEI7SUFDakUsc0JBQXNCO0lBQ3RCLE1BQU0sVUFBVSxHQUFHLElBQUEsdUJBQWUsRUFBQyxHQUFHLElBQUEsY0FBUyxHQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUM3RCxNQUFN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