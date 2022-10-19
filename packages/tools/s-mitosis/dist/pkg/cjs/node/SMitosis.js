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
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_view_renderer_1 = __importDefault(require("@coffeekraken/s-view-renderer"));
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const process_1 = require("@coffeekraken/sugar/process");
const string_1 = require("@coffeekraken/sugar/string");
const chokidar_1 = __importDefault(require("chokidar"));
const express_1 = __importDefault(require("express"));
const fs_2 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const path_2 = __importDefault(require("path"));
const vite_1 = require("vite");
const SMitosisBuildParamsInterface_1 = __importDefault(require("./interface/SMitosisBuildParamsInterface"));
const SMitosisStartParamsInterface_1 = __importDefault(require("./interface/SMitosisStartParamsInterface"));
class SMitosis extends s_class_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super((0, object_1.__deepMerge)({
            metas: {
                id: 'SMitosis',
            },
        }, settings || {}));
        // watch file
        // @ts-ignore
        if (!this.constructor.watcher) {
            // @ts-ignore
            this.constructor.watcher = chokidar_1.default.watch(s_sugar_config_1.default.get('docmap.read.input'));
            // @ts-ignore
            this.constructor.watcher.on('change', () => {
                // @ts-ignore
                delete this.constructor._cachedDocmapJson.current;
            });
        }
    }
    /**
     * @name          start
     * @type          Function
     *
     * This method allows you to start a server in order to develop your mitosis component easily
     * with feature like multiple frameworks testing, auto compilation, etc...
     *
     * @param         {Partial<ISMitosisStartParams>}          params        The params to use to start your mitosis env
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params) {
        const finalParams = ((0, object_1.__deepMerge)(SMitosisStartParamsInterface_1.default.defaults(), params));
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[start]</yellow> Starting a new mitosis server...`,
            });
            const app = (0, express_1.default)();
            app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const viewRenderer = new s_view_renderer_1.default({
                    rootDirs: [`${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/src/views`],
                });
                const componentFiles = glob_1.default.sync('src/js/build/**/*.*', {
                    cwd: (0, path_1.__packageRootDir)(),
                }), components = [];
                const componentInterfacePath = glob_1.default.sync('dist/pkg/esm/js/interface/*.*', {
                    cwd: (0, path_1.__packageRootDir)(),
                });
                let ComponentInterface, componentSpecs = {};
                if (componentInterfacePath.length) {
                    const finalComponentInterfacePath = `../../../../${path_2.default.relative((0, path_1.__packageRootDir)((0, fs_1.__dirname)()), `${(0, path_1.__packageRootDir)()}/${componentInterfacePath[0]}`)}`;
                    // import the interface
                    ComponentInterface = (yield Promise.resolve().then(() => __importStar(require(finalComponentInterfacePath)))).default;
                    // convert interface to specs
                    componentSpecs = s_specs_1.default.fromInterface(ComponentInterface);
                }
                for (let i = 0; i < componentFiles.length; i++) {
                    const componentFilePath = componentFiles[i];
                    const target = componentFilePath.split('/')[3], absoluteComponentFilePath = `${(0, path_1.__packageRootDir)()}/${componentFilePath}`, name = path_2.default
                        .basename(componentFilePath)
                        .replace(path_2.default.extname(componentFilePath), '')
                        .replace(/Component$/, '');
                    components.push({
                        target,
                        name,
                        specs: componentSpecs,
                        tagName: (0, string_1.__dashCase)(name),
                        path: `/${componentFilePath}`,
                    });
                }
                const result = yield viewRenderer.render('index', Object.assign(Object.assign({}, params), { components }));
                // const htmlFilePath = `${__packageRootDir(
                //     __dirname(),
                // )}/src/public/index.html`;
                res.type('text/html');
                res.send(result.value);
            }));
            app.get('/dist/css/index.css', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const cssFilePath = `${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/dist/css/index.css`;
                res.sendFile(cssFilePath);
            }));
            app.get('/dist/js/index.esm.js', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const jsFilePath = `${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/dist/js/index.esm.js`;
                res.sendFile(jsFilePath);
            }));
            let server;
            yield new Promise((_resolve) => {
                server = app.listen(8082, () => {
                    _resolve();
                });
            });
            const viteServer = yield (0, vite_1.createServer)((0, object_1.__deepMerge)(s_sugar_config_1.default.get('mitosis.vite'), {
                // any valid user config options, plus `mode` and `configFile`
                configFile: false,
                root: (0, path_1.__packageRootDir)(),
                resolve: {
                    dedupe: ['react', 'react-dom'],
                    alias: {
                    // vue: 'vue/dist/vue.esm-bundler.js',
                    },
                },
                optimizeDeps: {
                    esbuildOptions: {
                        // mainFields: ['module', 'main'],
                        resolveExtensions: ['.js', '.ts'],
                    },
                },
                server: {
                    port: finalParams.port,
                },
            }));
            yield viteServer.listen();
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<green>[start]</green> Your mitosis server is available at:`,
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<green>[start]</green> <cyan>http://127.0.0.1:${finalParams.port}</cyan>`,
            });
            (0, process_1.__onProcessExit)(() => {
                emit('log', {
                    value: `<red>[kill]</red> Gracefully killing the <cyan>mitosis server</cyan>...`,
                });
                return new Promise((resolve) => {
                    server.close(() => __awaiter(this, void 0, void 0, function* () {
                        yield viteServer.close();
                        // @ts-ignore
                        resolve();
                    }));
                });
            });
        }));
    }
    /**
     * @name          build
     * @type          Function
     *
     * This method allows you to specify one or more glob patterns to scan files for "@namespace" docblock tags
     * and extract all the necessary informations to build the docmap.json file
     *
     * @param         {Partial<ISMitosisBuildParams>}          params        The params to use to build your docmap
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    build(params) {
        const finalParams = ((0, object_1.__deepMerge)(SMitosisBuildParamsInterface_1.default.defaults(), params));
        return new s_promise_1.default(({ resolve, reject, emit, pipe, on }) => __awaiter(this, void 0, void 0, function* () {
            this._mitosisConfig = (yield Promise.resolve().then(() => __importStar(require(`${(0, path_1.__packageRootDir)()}/mitosis.config.js`)))).default;
            // build first
            yield pipe(this._build(finalParams));
            // watch
            if (finalParams.watch) {
                const watcher = chokidar_1.default.watch(this._mitosisConfig.files, {
                    cwd: (0, path_1.__packageRootDir)(),
                    ignoreInitial: true,
                });
                watcher.on('add', () => {
                    pipe(this._build(finalParams));
                });
                watcher.on('change', () => {
                    pipe(this._build(finalParams));
                });
                (0, process_1.__onProcessExit)(() => __awaiter(this, void 0, void 0, function* () {
                    yield watcher.close();
                }));
                on('cancel', () => {
                    watcher.close();
                });
            }
            if (!finalParams.watch) {
                resolve();
            }
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
    _build(params) {
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[build]</yellow> Start building your component(s)`,
            });
            const pro = (0, process_1.__spawn)('npm exec mitosis build');
            pro.on('log', (data) => {
                console.log(data._logObj.value);
            });
            yield pro;
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<green>[build]</green> Component(s) builded <green>successfully</green>!`,
            });
            if (params.watch) {
                emit('log', {
                    type: s_log_1.default.TYPE_INFO,
                    value: `<yellow>[watch]</yellow> Watching for files changes...`,
                });
            }
            const files = glob_1.default.sync(`output/**/*.*`, {
                cwd: (0, path_1.__packageRootDir)(),
            });
            files.forEach((filePath) => {
                const absoluteFilePath = `${(0, path_1.__packageRootDir)()}/${filePath}`, target = filePath.split('/')[1], destFilePath = `${(0, path_1.__packageRootDir)()}/src/js/build/${target}/${path_2.default.basename(filePath)}`;
                (0, fs_1.__ensureDirSync)(`${(0, path_1.__packageRootDir)()}/src/js/build/${target}`);
                fs_2.default.renameSync(absoluteFilePath, destFilePath);
                let code = fs_2.default.readFileSync(destFilePath).toString();
                code = code.replace(/%packageRootDir\//gm, '../../../../');
                fs_2.default.writeFileSync(destFilePath, code);
            });
            (0, fs_1.__removeSync)(`${(0, path_1.__packageRootDir)()}/output`);
            resolve();
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
}
exports.default = SMitosis;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsZ0VBQXlDO0FBQ3pDLHdFQUFpRDtBQUNqRCxvRUFBNkM7QUFDN0Msa0ZBQTBEO0FBQzFELG9GQUE0RDtBQUM1RCwrQ0FJZ0M7QUFDaEMsdURBQXlEO0FBQ3pELG1EQUE0RDtBQUM1RCx5REFBdUU7QUFDdkUsdURBQXdEO0FBQ3hELHdEQUFrQztBQUNsQyxzREFBZ0M7QUFDaEMsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQixnREFBMEI7QUFDMUIsK0JBQW9DO0FBQ3BDLDRHQUFzRjtBQUN0Riw0R0FBc0Y7QUFxQ3RGLE1BQU0sUUFBUyxTQUFRLGlCQUFRO0lBYTNCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBcUM7UUFDN0MsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsVUFBVTthQUNqQjtTQUNKLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBRUYsYUFBYTtRQUNiLGFBQWE7UUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDM0IsYUFBYTtZQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLGtCQUFVLENBQUMsS0FBSyxDQUN2Qyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUMxQyxDQUFDO1lBQ0YsYUFBYTtZQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsR0FBRyxFQUFFO2dCQUN2QyxhQUFhO2dCQUNiLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUM7WUFDdEQsQ0FBQyxDQUFDLENBQUM7U0FDTjtJ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