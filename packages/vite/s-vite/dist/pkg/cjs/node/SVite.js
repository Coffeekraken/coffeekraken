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
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
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
            config.plugins = plugins;
            if (!(yield (0, network_1.__isPortFree)(config.server.port))) {
                emit('log', {
                    type: s_log_1.default.TYPE_ERROR,
                    value: `Port <yellow>${config.server.port}</yellow> already in use. Please make sure to make it free before retrying...`,
                });
                process.exit(1);
            }
            const server = yield (0, vite_1.createServer)(config);
            let listen;
            try {
                listen = yield server.listen();
            }
            catch (e) {
                console.log('ERRROR', e);
            }
            (0, process_1.__onProcessExit)(() => __awaiter(this, void 0, void 0, function* () {
                emit('log', {
                    value: `<red>[kill]</red> Gracefully killing the <cyan>vite server</cyan>...`,
                });
                yield server.close();
                return true;
            }));
            // make sure it's the last emitted log for user convinience...
            setTimeout(() => {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: [
                        `<yellow>Vite</yellow> server started <green>successfully</green> and is available at:`,
                    ].join('\n'),
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: [
                        `<yellow>http://${config.server.host}</yellow>:<cyan>${config.server.port}</cyan>`,
                    ].join('\n'),
                });
            }, 1000);
        }), {
            metas: {
                id: this.metas.id,
            },
        });
    }
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
    build(params) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            const viteConfig = s_sugar_config_1.default.get('vite'), outputDir = viteConfig.build.outDir, outputAssetsDir = `${outputDir}/${viteConfig.build.assetsDir}`;
            const duration = new s_duration_1.default();
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
                finalParams.type.indexOf('bundle') === -1)
                finalParams.type = ['bundle'];
            for (let i = 0; i < finalParams.type.length; i++) {
                const buildType = finalParams.type[i];
                // @ts-ignore
                const buildParams = (0, object_1.__deepMerge)(Object.assign(finalParams), {});
                // shortcuts
                if (buildType === 'lib') {
                    buildParams.minify = 'esbuild';
                }
                if (buildParams.prod) {
                    buildParams.minify = 'esbuild';
                }
                const config = (0, object_1.__deepMerge)(viteConfig, {
                    logLevel: 'silent',
                    build: {
                        watch: buildParams.watch ? {} : false,
                        target: (_a = buildParams.target) !== null && _a !== void 0 ? _a : 'modules',
                        write: false,
                        minify: buildParams.minify,
                        cssCodeSplit: false,
                        rollupOptions: {
                            input: buildParams.input,
                            external: [],
                            plugins: [],
                            output: {
                            // compact: true,
                            // manualChunks(id) {
                            //     return 'index';
                            // },
                            },
                            onwarn(warning, warn) {
                                var _a, _b, _c;
                                const onwarnRes = (_c = (_b = (_a = viteConfig.build) === null || _a === void 0 ? void 0 : _a.rollupOptions) === null || _b === void 0 ? void 0 : _b.onwarn) === null || _c === void 0 ? void 0 : _c.call(_b, warning, warn);
                                emit('log', {
                                    margin: {
                                        top: 1,
                                    },
                                    type: s_log_1.default.TYPE_WARNING,
                                    value: `<yellow>[warn]</yellow> (<magenta>${warning.code}</magenta>) ${warning.message}`,
                                });
                                emit('log', {
                                    margin: {
                                        bottom: 1,
                                    },
                                    type: s_log_1.default.TYPE_WARNING,
                                    value: `at <cyan>${warning.loc.file}</cyan>:<yellow>${warning.loc.column}:${warning.loc.line}</yellow>`,
                                });
                                // emit('log', {
                                //     margin: {
                                //         bottom: 2,
                                //     },
                                //     type: __SLog.TYPE_WARNING,
                                //     value: warning.frame,
                                // });
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
                config.plugins.unshift((0, rewritesPlugin_1.default)((_b = config.rewrites) !== null && _b !== void 0 ? _b : []));
                // resolve plugins paths
                const plugins = [];
                for (let i = 0; i < config.plugins.length; i++) {
                    const p = config.plugins[i];
                    if (typeof p === 'string') {
                        const { default: plug } = yield Promise.resolve().then(() => __importStar(require(p)));
                        plugins.push((_c = plug.default) !== null && _c !== void 0 ? _c : plug);
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
                    config.build.target = (_d = buildParams.target) !== null && _d !== void 0 ? _d : 'es2015';
                }
                else if (buildType.toLowerCase() === 'lib') {
                    config.build.target = (_e = buildParams.target) !== null && _e !== void 0 ? _e : 'esnext';
                }
                else if (buildType.toLowerCase() === 'module') {
                    config.build.target = (_f = buildParams.target) !== null && _f !== void 0 ? _f : 'modules';
                }
                // external packages for library mode
                if (buildType.toLowerCase() === 'lib') {
                    config.build.rollupOptions.external = [
                        ...((_g = config.build.rollupOptions.external) !== null && _g !== void 0 ? _g : []),
                        ...Object.keys((0, listNodeModulesPackages_1.default)({ monorepo: true }))
                            .filter((item) => {
                            return !item.match(/^(\/|\.)/);
                        })
                            .map((item) => {
                            return new RegExp(`^${item}`);
                        }),
                    ];
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
                // setup outputs
                const outputs = [];
                let outputsFilenames = [];
                finalFormats.forEach((format) => {
                    var _a;
                    outputs.push((0, object_1.__deepMerge)(Object.assign({ dir: path_2.default.resolve(viteConfig.build.outDir), format }, ((_a = config.build.rollupOptions.output) !== null && _a !== void 0 ? _a : {}))));
                    outputsFilenames.push(`index.${format}.js`);
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Starting "<magenta>${buildType}</magenta>" build`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Target      : ${buildParams.prod
                        ? '<green>production</green>'
                        : '<yellow>development</yellow>'}`,
                });
                outputsFilenames.forEach((filename) => {
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<yellow>○</yellow> Output      : <cyan>${path_2.default.relative(process.cwd(), `${path_2.default.resolve(viteConfig.build.outDir)}/${filename}`)}</cyan>`,
                    });
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Type        : ${buildType.toLowerCase()}`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Target      : ${config.build.target}`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Format      : ${finalFormats.join(',')}`,
                });
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>○</yellow> Minify      : ${typeof buildParams.minify === 'string'
                        ? `<green>${buildParams.minify}</green>`
                        : buildParams.minify === false
                            ? '<red>false</red>'
                            : '<green>esbuild</green>'}`,
                });
                // set the outputs
                config.build.rollupOptions.output = outputs;
                // process to bundle
                const res = yield (0, vite_1.build)(config);
                // console.log(res[0].output);
                if (((_h = res.constructor) === null || _h === void 0 ? void 0 : _h.name) === 'WatchEmitter') {
                    // @ts-ignore
                    res.on('change', () => __awaiter(this, void 0, void 0, function* () {
                        emit('log', {
                            type: s_log_1.default.TYPE_INFO,
                            value: `<yellow>[watch]</yellow> Update detected. Re-building...`,
                        });
                        yield pipe(this.build(Object.assign(Object.assign({}, params), { watch: false, verbose: false })));
                        emit('log', {
                            type: s_log_1.default.TYPE_INFO,
                            value: `<cyan>[watch]</cyan> Watching for changes...`,
                        });
                    }));
                    yield pipe(this.build(Object.assign(Object.assign({}, params), { watch: false, verbose: false })));
                    emit('log', {
                        type: s_log_1.default.TYPE_INFO,
                        value: `<cyan>[watch]</cyan> Watching for changes...`,
                    });
                    return;
                }
                // @TODO        check to replace this dirty fix
                let outCode = res[0].output[0].code;
                // var SCodeExample_vue_vue_type_style_index_0_scoped_true_lang
                const cssVarMatches = outCode.match(/var\s[a-zA-Z0-9-_]+type_style[a-zA-Z0-9-_]+/gm);
                if (cssVarMatches) {
                    cssVarMatches.forEach((match) => {
                        const varName = match.replace(/var\s?/, '').trim();
                        const injectCode = `
                var $style = document.querySelector('style#${varName}');
                if (!$style) {
                  $style = document.createElement('style');
                  $style.setAttribute('id', '${varName}');
                  $style.type = 'text/css';
                  $style.appendChild(document.createTextNode(${varName}));
                  document.head.appendChild($style);
                }
              `;
                        outCode += injectCode;
                        res[0].output[0].code = outCode;
                    });
                }
                // stacking res inside the results object
                results[buildType] = res;
                // handle generated bundles
                if (!buildParams.noWrite) {
                    let entryFileName, entryFinalFileName;
                    // @ts-ignore
                    res.forEach((bundleObj, i) => {
                        const output = bundleObj.output[0];
                        bundleObj.output.forEach((outputObj) => {
                            if (outputObj.fileName.match(/\.css$/)) {
                                return;
                            }
                            let finalCode = outputObj.code;
                            let finalFileName = outputObj.fileName;
                            if (outputObj.isEntry) {
                                entryFileName = finalFileName;
                                finalFileName = finalFileName
                                    .replace(/^index\./, `index.${finalFormats[0]}.`)
                                    .replace(/\.[a-zA-Z0-9]+\.js/, '.js');
                                entryFinalFileName = finalFileName;
                            }
                            else if (entryFileName) {
                                finalCode = finalCode
                                    .split(`/${entryFileName}`)
                                    .join(`/${entryFinalFileName}`);
                            }
                            (0, fs_1.__writeFileSync)(`${outputAssetsDir}/${finalFileName}`, finalCode);
                            const file = new s_file_1.default(`${outputAssetsDir}/${finalFileName}`);
                            emit('log', {
                                type: s_log_1.default.TYPE_INFO,
                                value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                            });
                        });
                    });
                }
            }
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<green>[success]</green> Build completed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
            });
            resolve(results);
        }), {
            metas: {
                id: this.metas.id,
            },
        });
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
            const command = `npx vitest --dir "${path_2.default.relative((0, path_1.__packageRootDir)(), finalParams.dir)}" --config ${configPath} --root ${(0, path_1.__packageRootDir)()} --passWithNoTests --dom --globals ${finalParams.watch ? '--watch' : '--run'}`;
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
        }), {
            metas: {
                id: this.metas.id,
            },
        });
    }
}
exports.default = SVite;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsMEVBQW1EO0FBQ25ELGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELGtGQUF5RDtBQUN6RCwrQ0FJZ0M7QUFDaEMseURBQTJEO0FBQzNELG1IQUE2RjtBQUM3Rix1REFBeUQ7QUFDekQsbURBQTREO0FBQzVELHlEQUE4RDtBQUM5RCxrRUFBMkM7QUFDM0MsZ0RBQTBCO0FBQzFCLG9GQUE0RDtBQUM1RCwrREFBZ0U7QUFDaEUsK0JBQTBFO0FBQzFFLHNHQUFnRjtBQUNoRixzR0FBZ0Y7QUFDaEYsb0dBQThFO0FBQzlFLHdHQUF1RjtBQUN2Riw4RUFBd0Q7QUF5QnhELE1BQXFCLEtBQU0sU0FBUSxpQkFBUTtJQUN2Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXlCO1FBQ2pDLEtBQUssQ0FBQyxJQUFBLG9CQUFXLEVBQUMsRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxLQUFLLENBQUMsTUFBa0M7UUFDcEMsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1lBQ2hDLE1BQU0sV0FBVyxHQUFHLG1DQUEyQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU5RCxNQUFNLE1BQU0sbUJBQ1IsVUFBVSxFQUFFLEtBQUssSUFFZCx3QkFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FDL0IsQ0FBQztZQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztnQkFBRSxNQUFNLENBQUMsT0FBTyxHQUFH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