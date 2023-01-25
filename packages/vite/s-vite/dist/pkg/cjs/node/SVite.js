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
                console.log({
                    value: [
                        `<yellow>Vite</yellow> server started <green>successfully</green> and is available at:`,
                    ].join('\n'),
                });
                console.log({
                    type: s_log_1.default.TYPE_SUCCESS,
                    value: [
                        `<yellow>http://${config.server.host}</yellow>:<cyan>${config.server.port}</cyan>`,
                    ].join('\n'),
                    notify: true,
                    metas: {
                        title: 'Coffeekraken',
                        subtitle: 'Server ready at:',
                        open: `http://${config.server.host}:${config.server.port}`,
                    },
                });
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
                if (buildParams.target === 'production') {
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
                        target: (_b = buildParams.version) !== null && _b !== void 0 ? _b : 'modules',
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
                if (buildParams.target === 'production') {
                    config.mode = 'production';
                }
                // target
                if (buildType.toLowerCase() === 'bundle') {
                    config.build.target = (_e = buildParams.version) !== null && _e !== void 0 ? _e : 'es2015';
                }
                else if (buildType.toLowerCase() === 'lib') {
                    config.build.target = (_f = buildParams.version) !== null && _f !== void 0 ? _f : 'esnext';
                }
                else if (buildType.toLowerCase() === 'module') {
                    config.build.target = (_g = buildParams.version) !== null && _g !== void 0 ? _g : 'modules';
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
                    value: `<yellow>○</yellow> Target      : ${buildParams.target === 'production'
                        ? '<green>production</green>'
                        : '<yellow>development</yellow>'}`,
                });
                outputsFilenames.forEach((filename) => {
                    console.log(`<yellow>○</yellow> Output      : <cyan>${path_2.default.relative(process.cwd(), `${path_2.default.resolve(viteConfig.build.outDir)}/${filename}`)}</cyan>`);
                });
                console.log(`<yellow>○</yellow> Type        : ${buildType.toLowerCase()}`);
                console.log(`<yellow>○</yellow> Versiom     : ${config.build.target}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsMEVBQW1EO0FBQ25ELGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELGtGQUF5RDtBQUN6RCwrQ0FJZ0M7QUFDaEMseURBQTJEO0FBQzNELG1IQUE2RjtBQUM3Rix1REFBeUQ7QUFDekQsbURBQTREO0FBQzVELHlEQUE4RDtBQUM5RCxrRUFBMkM7QUFDM0MsZ0RBQTBCO0FBQzFCLG9GQUE0RDtBQUM1RCwrREFBZ0U7QUFDaEUsK0JBQTBFO0FBQzFFLHVFQUF5RTtBQUN6RSxzR0FBZ0Y7QUFDaEYsc0dBQWdGO0FBQ2hGLG9HQUE4RTtBQUM5RSx3R0FBdUY7QUFDdkYsOEVBQXdEO0FBOEN4RCxNQUFxQixLQUFNLFNBQVEsaUJBQVE7SUFDdkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF5QjtRQUNqQyxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBOEYzQzs7Ozs7Ozs7OztXQVVHO1FBQ0gseUJBQW9CLEdBQUcsRUFBRSxDQUFDO0lBeEcxQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILEtBQUssQ0FBQyxNQUFrQztRQUNwQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztZQUN6QyxNQUFNLFdBQVcsR0FBRyxtQ0FBMkIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFOUQsTUFBTSxNQUFNLG1CQUNSLFVBQVUsRUFBRSxLQUFLLElBRWQsd0JBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQy9CLENBQUM7WUFFRixJQUFJLENBQUMs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