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
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const network_1 = require("@coffeekraken/sugar/network");
const listNodeModulesPackages_1 = __importDefault(require("@coffeekraken/sugar/node/npm/listNodeModulesPackages"));
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const process_1 = require("@coffeekraken/sugar/process");
const child_process_1 = __importDefault(require("child_process"));
const path_2 = __importDefault(require("path"));
const rollup_plugin_analyzer_1 = __importDefault(require("rollup-plugin-analyzer"));
const rollup_plugin_uglify_1 = require("rollup-plugin-uglify");
const vite_1 = require("vite");
const vite_plugin_compression2_1 = require("vite-plugin-compression2");
const SViteBuildParamsInterface_1 = __importDefault(require("./interface/SViteBuildParamsInterface"));
const SViteStartParamsInterface_1 = __importDefault(require("./interface/SViteStartParamsInterface"));
const SViteTestParamsInterface_1 = __importDefault(require("./interface/SViteTestParamsInterface"));
const internalWatcherReloadPlugin_1 = __importDefault(require("./plugins/internalWatcherReloadPlugin"));
const rewritesPlugin_1 = __importDefault(require("./plugins/rewritesPlugin"));
class SVite extends s_class_1.default {
    /**
     * @name            constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name          build
         * @type          Function
         *
         * Build the assets
         *
         * @param         {ISViteStartParams}         [params={}]             Some parameters to customize your process
         *
         * @since         2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this.rebuildTimeoutByPath = {};
    }
    /**
     * @name          start
     * @type          Function
     *
     * Start the vite service with the server and the compilers
     *
     * @param         {ISViteStartParams}         [params={}]             Some parameters to customize your process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const finalParams = SViteStartParamsInterface_1.default.apply(params);
            const config = Object.assign({ configFile: false }, s_sugar_config_1.default.get('vite'));
            if (!config.plugins)
                config.plugins = [];
            config.plugins.unshift((0, rewritesPlugin_1.default)((_a = config.rewrites) !== null && _a !== void 0 ? _a : []));
            config.plugins.unshift((0, internalWatcherReloadPlugin_1.default)());
            // resolve plugins paths
            const plugins = [];
            for (let i = 0; i < config.plugins.length; i++) {
                const p = config.plugins[i];
                if (typeof p === 'string') {
                    const { default: plug } = yield Promise.resolve().then(() => __importStar(require(p)));
                    plugins.push((_b = plug.default) !== null && _b !== void 0 ? _b : plug);
                }
                else {
                    plugins.push(p);
                }
            }
            config.plugins.push((0, vite_plugin_compression2_1.compression)({
                include: /.*\.(css|js|jsx|ts|tsx)(\?.*)?/,
            }));
            config.plugins = plugins;
            if (!(yield (0, network_1.__isPortFree)(config.server.port))) {
                console.log(`Port <yellow>${config.server.port}</yellow> already in use. Please make sure to make it free before retrying...`);
                process.exit(1);
            }
            const server = yield (0, vite_1.createServer)(config);
            let listen;
            try {
                listen = yield server.listen();
            }
            catch (e) {
                console.error(e);
            }
            (0, process_1.__onProcessExit)(() => __awaiter(this, void 0, void 0, function* () {
                console.log(`<red>[kill]</red> Gracefully killing the <cyan>vite server</cyan>...`);
                yield server.close();
                return true;
            }));
            // make sure it's the last emitted log for user convinience...
            setTimeout(() => {
                console.log([
                    `<yellow>Vite</yellow> server started <green>successfully</green> and is available at:`,
                ].join('\n'));
                console.log([
                    `<yellow>http://${config.server.host}</yellow>:<cyan>${config.server.port}</cyan>`,
                ].join('\n'));
            }, 1000);
        }));
    }
    build(params) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
            const viteConfig = s_sugar_config_1.default.get('vite'), outputDir = viteConfig.build.outDir, outputAssetsDir = `${outputDir}/${viteConfig.build.assetsDir}`;
            let duration = new s_duration_1.default();
            // clean previous build
            (0, fs_1.__removeSync)(outputAssetsDir);
            // @ts-ignore
            const finalParams = SViteBuildParamsInterface_1.default.apply(params);
            // object to store results of each "type"
            const results = {};
            // types shortcuts
            if (finalParams.lib && finalParams.type.indexOf('lib') === -1)
                finalParams.type = ['lib'];
            if (finalParams.bundle &&
                finalParams.type.indexOf('bundle') === -1) {
                finalParams.type = ['bundle'];
            }
            for (let i = 0; i < finalParams.type.length; i++) {
                const buildType = finalParams.type[i];
                let buildResult;
                // @ts-ignore
                const buildParams = (0, object_1.__deepMerge)(Object.assign(finalParams), {
                    outputDir,
                    outputAssetsDir,
                });
                // shortcuts
                if (buildType === 'lib') {
                    buildParams.minify = 'esbuild';
                }
                if (buildParams.prod) {
                    buildParams.minify = 'esbuild';
                }
                // automatic formats
                let finalFormats = buildParams.format;
                if (!buildParams.format.length) {
                    switch (buildType) {
                        case 'bundle':
                            finalFormats = ['amd'];
                            break;
                        case 'module':
                        case 'lib':
                            finalFormats = ['esm'];
                            break;
                    }
                }
                // set the formats in buildParams
                buildParams.formats = finalFormats;
                const _this = this;
                let isFirstGenerated; // track if the first build has been made using the "watch" param
                const config = (0, object_1.__deepMerge)(viteConfig, {
                    logLevel: 'silent',
                    plugins: [
                        ...((_a = viteConfig.plugins) !== null && _a !== void 0 ? _a : []),
                        {
                            name: 's-vite-end-detection',
                            generateBundle(bundle, chunks) {
                                return __awaiter(this, void 0, void 0, function* () {
                                    if (!buildParams.watch) {
                                        return;
                                    }
                                    const buildResult = {
                                        type: buildType,
                                        format: finalFormats[0],
                                        files: [],
                                    };
                                    for (let [key, chunkObj] of Object.entries(chunks)) {
                                        buildResult.files.push({
                                            isEntry: chunkObj.isEntry,
                                            format: finalFormats[0],
                                            fileName: chunkObj.fileName,
                                            outDir: outputDir,
                                            code: chunkObj.code,
                                        });
                                    }
                                    // handle result
                                    yield _this._handleBuildResult(buildResult, buildParams);
                                    console.log(`<green>[success]</green> Build completed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`);
                                    // display the watch message
                                    if (buildParams.watch) {
                                        console.log(`<cyan>[watch]</cyan> Watching for changes...`);
                                    }
                                });
                            },
                        },
                    ],
                    build: {
                        watch: buildParams.watch
                            ? {
                                chokidar: {
                                    usePolling: true,
                                    interval: 500,
                                },
                            }
                            : false,
                        target: (_b = buildParams.target) !== null && _b !== void 0 ? _b : 'modules',
                        write: false,
                        minify: buildParams.minify,
                        terserOptions: {
                            ecma: 2016,
                            module: true,
                            toplevel: true,
                            compress: {
                                arguments: true,
                                booleans_as_integers: true,
                                drop_console: true,
                                keep_fargs: false,
                                toplevel: true,
                                ecma: 2016,
                                hoist_funs: true,
                                passes: 2,
                                unsafe: true,
                                unsafe_methods: true,
                                unsafe_proto: true,
                            },
                            // format: {
                            //     comments: false,
                            // },
                            mangle: {
                                toplevel: true,
                                properties: {
                                    regex: /^_/,
                                },
                            },
                            // toplevel: true,
                        },
                        cssCodeSplit: false,
                        rollupOptions: {
                            input: buildParams.input,
                            external: [],
                            plugins: [],
                            output: {},
                            onwarn(warning, warn) {
                                var _a, _b, _c;
                                const onwarnRes = (_c = (_b = (_a = viteConfig.build) === null || _a === void 0 ? void 0 : _a.rollupOptions) === null || _b === void 0 ? void 0 : _b.onwarn) === null || _c === void 0 ? void 0 : _c.call(_b, warning, warn);
                                console.log({
                                    margin: {
                                        top: 1,
                                    },
                                    type: s_log_1.default.TYPE_WARNING,
                                    value: `<yellow>[warn]</yellow> (<magenta>${warning.code}</magenta>) ${warning.message}`,
                                });
                                console.log({
                                    margin: {
                                        bottom: 1,
                                    },
                                    type: s_log_1.default.TYPE_WARNING,
                                    value: `at <cyan>${warning.loc.file}</cyan>:<yellow>${warning.loc.column}:${warning.loc.line}</yellow>`,
                                });
                                return onwarnRes;
                            },
                        },
                    },
                    server: {},
                });
                // library mode
                if (buildType.toLowerCase() !== 'lib') {
                    delete config.build.lib;
                }
                // plugins
                if (buildParams.minify) {
                    config.build.rollupOptions.plugins.push((0, rollup_plugin_uglify_1.uglify)());
                }
                if (buildParams.analyze) {
                    config.build.rollupOptions.plugins.push((0, rollup_plugin_analyzer_1.default)({
                        limit: 10,
                        summaryOnly: true,
                    }));
                }
                // plugins
                if (!config.plugins)
                    config.plugins = [];
                config.plugins.unshift((0, rewritesPlugin_1.default)((_c = config.rewrites) !== null && _c !== void 0 ? _c : []));
                // resolve plugins paths
                const plugins = [];
                for (let i = 0; i < config.plugins.length; i++) {
                    const p = config.plugins[i];
                    if (typeof p === 'string') {
                        const { default: plug } = yield Promise.resolve().then(() => __importStar(require(p)));
                        plugins.push((_d = plug.default) !== null && _d !== void 0 ? _d : plug);
                    }
                    else {
                        plugins.push(p);
                    }
                }
                config.plugins = plugins;
                // mode (production, development)
                if (buildParams.prod) {
                    config.mode = 'production';
                }
                // target
                if (buildType.toLowerCase() === 'bundle') {
                    config.build.target = (_e = buildParams.target) !== null && _e !== void 0 ? _e : 'es2015';
                }
                else if (buildType.toLowerCase() === 'lib') {
                    config.build.target = (_f = buildParams.target) !== null && _f !== void 0 ? _f : 'esnext';
                }
                else if (buildType.toLowerCase() === 'module') {
                    config.build.target = (_g = buildParams.target) !== null && _g !== void 0 ? _g : 'modules';
                }
                // external packages for library mode
                if (buildType.toLowerCase() === 'lib') {
                    config.build.rollupOptions.external = [
                        ...((_h = config.build.rollupOptions.external) !== null && _h !== void 0 ? _h : []),
                        ...Object.keys((0, listNodeModulesPackages_1.default)({ monorepo: true }))
                            .filter((item) => {
                            return !item.match(/^(\/|\.)/);
                        })
                            .map((item) => {
                            return new RegExp(`^${item}`);
                        }),
                    ];
                }
                // setup outputs
                const outputs = [];
                let outputsFilenames = [];
                finalFormats.forEach((format) => {
                    var _a;
                    outputs.push((0, object_1.__deepMerge)(Object.assign({ dir: path_2.default.resolve(viteConfig.build.outDir), format }, ((_a = config.build.rollupOptions.output) !== null && _a !== void 0 ? _a : {}))));
                    outputsFilenames.push(`index.${format}.js`);
                });
                console.log(`<yellow>[build]</yellow> Starting "<magenta>${buildType}</magenta>" build`);
                console.log({
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Target      : ${buildParams.prod
                        ? '<green>production</green>'
                        : '<yellow>development</yellow>'}`,
                });
                outputsFilenames.forEach((filename) => {
                    console.log(`<yellow>○</yellow> Output      : <cyan>${path_2.default.relative(process.cwd(), `${path_2.default.resolve(viteConfig.build.outDir)}/${filename}`)}</cyan>`);
                });
                console.log(`<yellow>○</yellow> Type        : ${buildType.toLowerCase()}`);
                console.log(`<yellow>○</yellow> Target      : ${config.build.target}`);
                console.log(`<yellow>○</yellow> Format      : ${finalFormats.join(',')}`);
                console.log(`<yellow>○</yellow> Minify      : ${typeof buildParams.minify === 'string'
                    ? `<green>${buildParams.minify}</green>`
                    : buildParams.minify === false
                        ? '<red>false</red>'
                        : '<green>esbuild</green>'}`);
                // set the outputs
                config.build.rollupOptions.output = outputs;
                // process to bundle
                buildResult = yield (0, vite_1.build)(config);
                // if the buildResult is a WatchEmitter instance,
                // it means that the build has been launchec with the "watch" attribute
                // and vite will returns something different that a normal build.
                // Handle that here...
                if (((_j = buildResult.constructor) === null || _j === void 0 ? void 0 : _j.name) === 'WatchEmitter') {
                    buildResult.on('change', () => {
                        duration = new s_duration_1.default();
                    });
                    // stop here if the vite instance is set to watch mode
                    return;
                }
                const finalBuildResult = {
                    type: buildType,
                    format: finalFormats[0],
                    files: [],
                };
                for (let i = 0; i < ((_k = buildResult[0].output) === null || _k === void 0 ? void 0 : _k.length); i++) {
                    const output = buildResult[0].output[i];
                    finalBuildResult.files.push({
                        isEntry: (_l = output.isEntry) !== null && _l !== void 0 ? _l : false,
                        format: finalFormats[0],
                        fileName: output.fileName,
                        outDir: outputDir,
                        code: output.code,
                    });
                }
                buildResult = yield this._handleBuildResult(finalBuildResult, buildParams);
            }
            console.log(`<green>[success]</green> Build completed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`);
            resolve(results);
        }));
    }
    _handleBuildResult(buildResult, buildParams) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < buildResult.files.length; i++) {
                const buildFileResult = buildResult.files[i];
                //             const cssVarMatches = buildFileResult.code.match(
                //                 /var\s[a-zA-Z0-9-_]+type_style[a-zA-Z0-9-_]+/gm,
                //             );
                //             if (cssVarMatches) {
                //                 cssVarMatches.forEach((match) => {
                //                     const varName = match.replace(/var\s?/, '').trim();
                //                     const injectCode = `
                //     var $style = document.querySelector('style#${varName}');
                //     if (!$style) {
                //     $style = document.createElement('style');
                //     $style.setAttribute('id', '${varName}');
                //     $style.type = 'text/css';
                //     $style.appendChild(document.createTextNode(${varName}));
                //     document.head.appendChild($style);
                //     }
                // `;
                //                     buildFileResult.code += injectCode;
                //                 });
                //             }
                // handle generated bundles
                if (!buildParams.noWrite) {
                    // handle only js files
                    if (!buildFileResult.fileName.match(/\.js$/)) {
                        continue;
                    }
                    // rename the entry file with "index.%format.js"
                    if (buildFileResult.isEntry) {
                        buildFileResult.fileName = buildFileResult.fileName
                            .replace(/^index\./, `index.${buildFileResult.format}.`)
                            .replace(/\.[a-zA-Z0-9]+\.js/, '.js');
                    }
                    // write the file on the disk
                    (0, fs_1.__writeFileSync)(`${buildFileResult.outDir}/${buildFileResult.fileName}`, buildFileResult.code);
                    const file = new s_file_1.default(`${buildFileResult.outDir}/${buildFileResult.fileName}`);
                    console.log(`<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`);
                }
            }
            resolve(buildResult);
        }));
    }
    /**
     * @name          test
     * @type          Function
     *
     * Launch the tests
     *
     * @param         {ISViteTestParams}         [params={}]             Some parameters to customize your process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    test(params) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe, on }) => __awaiter(this, void 0, void 0, function* () {
            const viteConfig = s_sugar_config_1.default.get('vite');
            const duration = new s_duration_1.default();
            // @ts-ignore
            const finalParams = SViteTestParamsInterface_1.default.apply(params);
            const finalConfig = (0, object_1.__deepMerge)(viteConfig, {
                test: finalParams,
            });
            const configPath = (0, fs_1.__writeTmpFileSync)(`export default ${JSON.stringify(finalConfig)};`, {
                path: 'vite.config.js',
            });
            const command = `npx vitest --dir "${path_2.default.relative((0, path_1.__packageRootDir)(), finalParams.dir)}" --config ${configPath} --root ${(0, path_1.__packageRootDir)()} --passWithNoTests --dom --globals ${finalParams.watch ? '--watch --changed' : '--run'} --ui --open`;
            // run the test
            const pro = child_process_1.default.spawn(command, [], {
                stdio: ['ignore', 1, 2],
                shell: true,
                detached: true,
                cwd: (0, path_1.__packageRootDir)(),
            });
            pro.on('close', (e) => {
                if (!finalParams.watch) {
                    resolve();
                }
            });
            (0, process_1.__onProcessExit)(() => __awaiter(this, void 0, void 0, function* () {
                pro.kill();
                return true;
            }));
            // cancel
            on('cancel', () => {
                var _a;
                (_a = pro.kill) === null || _a === void 0 ? void 0 : _a.call(pro);
            });
            if (!finalParams.watch) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<green>[success]</green> Tests completed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
                });
            }
        }));
    }
}
exports.default = SVite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsMEVBQW1EO0FBQ25ELGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELGtGQUF5RDtBQUN6RCwrQ0FJZ0M7QUFDaEMseURBQTJEO0FBQzNELG1IQUE2RjtBQUM3Rix1REFBeUQ7QUFDekQsbURBQTREO0FBQzVELHlEQUE4RDtBQUM5RCxrRUFBMkM7QUFDM0MsZ0RBQTBCO0FBQzFCLG9GQUE0RDtBQUM1RCwrREFBZ0U7QUFDaEUsK0JBQTBFO0FBQzFFLHVFQUF5RTtBQUN6RSxzR0FBZ0Y7QUFDaEYsc0dBQWdGO0FBQ2hGLG9HQUE4RTtBQUM5RSx3R0FBdUY7QUFDdkYsOEVBQXdEO0FBOEN4RCxNQUFxQixLQUFNLFNBQVEsaUJBQVE7SUFDdkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF5QjtRQUNqQyxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBdUYzQzs7Ozs7Ozs7OztXQVVHO1FBQ0gseUJBQW9CLEdBQUcsRUFBRSxDQUFDO0lBakcxQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILEtBQUssQ0FBQyxNQUFrQztRQUNwQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztZQUN6QyxNQUFNLFdBQVcsR0FBRyxtQ0FBMkIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFOUQsTUFBTSxNQUFNLG1CQUNSLFVBQVUsRUFBRSxLQUFLLElBRWQsd0JBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQy9CLENBQUM7WUFFRixJQUFJLENBQUMs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