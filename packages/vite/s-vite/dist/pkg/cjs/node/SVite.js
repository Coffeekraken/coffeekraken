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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsMEVBQW1EO0FBQ25ELGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELGtGQUF5RDtBQUN6RCwrQ0FJZ0M7QUFDaEMseURBQTJEO0FBQzNELG1IQUE2RjtBQUM3Rix1REFBeUQ7QUFDekQsbURBQTREO0FBQzVELHlEQUE4RDtBQUM5RCxrRUFBMkM7QUFDM0MsZ0RBQTBCO0FBQzFCLG9GQUE0RDtBQUM1RCwrREFBZ0U7QUFDaEUsK0JBQTBFO0FBQzFFLHVFQUF5RTtBQUN6RSxzR0FBZ0Y7QUFDaEYsc0dBQWdGO0FBQ2hGLG9HQUE4RTtBQUM5RSx3R0FBdUY7QUFDdkYsOEVBQXdEO0FBOEN4RCxNQUFxQixLQUFNLFNBQVEsaUJBQVE7SUFDdkM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF5QjtRQUNqQyxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBOEYzQzs7Ozs7Ozs7OztXQVVHO1FBQ0gseUJBQW9CLEdBQUcsRUFBRSxDQUFDO0lBeEcxQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILEtBQUssQ0FBQyxNQUFrQztRQUNwQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFOztZQUN6QyxNQUFNLFdBQVcsR0FBRyxtQ0FBMkIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFOUQsTUFBTSxNQUFNLG1CQUNSLFVBQVUsRUFBRSxLQUFLLElBRWQsd0JBQWEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQy9CLENBQUM7WUFFRixJQUFJLENBQUMs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