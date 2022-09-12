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
const path_1 = require("@coffeekraken/sugar/path");
const onProcessExit_1 = __importDefault(require("@coffeekraken/sugar/node/process/onProcessExit"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
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
        super((0, deepMerge_1.default)({}, settings !== null && settings !== void 0 ? settings : {}));
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
            (0, onProcessExit_1.default)(() => __awaiter(this, void 0, void 0, function* () {
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
            const viteConfig = s_sugar_config_1.default.get('vite');
            const duration = new s_duration_1.default();
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
                const buildParams = (0, deepMerge_1.default)(Object.assign(finalParams), {});
                // shortcuts
                if (buildType === 'lib') {
                    buildParams.minify = true;
                }
                if (buildParams.prod) {
                    buildParams.minify = true;
                }
                const config = (0, deepMerge_1.default)(viteConfig, {
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
                                compact: true,
                                manualChunks(id) {
                                    return 'index';
                                },
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
                            finalFormats = ['iife'];
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
                    outputs.push((0, deepMerge_1.default)(Object.assign({ dir: path_2.default.resolve(viteConfig.build.outDir), format }, ((_a = config.build.rollupOptions.output) !== null && _a !== void 0 ? _a : {}))));
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
                // set the outputs
                config.build.rollupOptions.output = outputs;
                // process to bundle
                const res = yield (0, vite_1.build)(config);
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
                    // @ts-ignore
                    res.forEach((bundleObj, i) => {
                        const output = bundleObj.output[0];
                        const baseOutputConfig = outputs[i], baseOutputFilenames = outputsFilenames[i];
                        (0, fs_1.__writeFileSync)(`${baseOutputConfig.dir}/${baseOutputFilenames}`, output.code);
                        const file = new s_file_1.default(`${baseOutputConfig.dir}/${baseOutputFilenames}`);
                        emit('log', {
                            type: s_log_1.default.TYPE_INFO,
                            value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
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
            const finalConfig = (0, deepMerge_1.default)(viteConfig, {
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
            (0, onProcessExit_1.default)(() => __awaiter(this, void 0, void 0, function* () {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsMEVBQW1EO0FBQ25ELGtFQUEyQztBQUMzQyxnRUFBeUM7QUFDekMsd0VBQWlEO0FBQ2pELGtGQUF5RDtBQUN6RCwrQ0FBNkU7QUFDN0UseURBQTJEO0FBQzNELG1IQUE2RjtBQUM3RixtREFBNEQ7QUFDNUQsbUdBQTZFO0FBQzdFLDRGQUFzRTtBQUN0RSxrRUFBMkM7QUFDM0MsZ0RBQTBCO0FBQzFCLG9GQUE0RDtBQUM1RCwrREFBZ0U7QUFDaEUsK0JBQTBFO0FBQzFFLHNHQUFnRjtBQUNoRixzR0FBZ0Y7QUFDaEYsb0dBQThFO0FBQzlFLHdHQUF1RjtBQUN2Riw4RUFBd0Q7QUF5QnhELE1BQXFCLEtBQU0sU0FBUSxpQkFBUTtJQUN2Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXlCO1FBQ2pDLEtBQUssQ0FBQyxJQUFBLG1CQUFXLEVBQUMsRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxLQUFLLENBQUMsTUFBa0M7UUFDcEMsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1lBQ2hDLE1BQU0sV0FBVyxHQUFHLG1DQUEyQixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUU5RCxNQUFNLE1BQU0sbUJBQ1IsVUFBVSxFQUFFLEtBQUssSUFFZCx3QkFBYSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FDL0IsQ0FBQztZQUVGLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTztnQkFBRSxNQUFNLENBQUMsT0FBTyxHQUFH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