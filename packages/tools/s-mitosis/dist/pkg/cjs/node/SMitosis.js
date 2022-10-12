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
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_view_renderer_1 = __importDefault(require("@coffeekraken/s-view-renderer"));
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const process_1 = require("@coffeekraken/sugar/process");
const string_1 = require("@coffeekraken/sugar/string");
const chokidar_1 = __importDefault(require("chokidar"));
const express_1 = __importDefault(require("express"));
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
                const componentFiles = glob_1.default.sync('output/**/*.*', {
                    cwd: (0, path_1.__packageRootDir)(),
                }), components = [];
                componentFiles.forEach((componentFilePath) => {
                    const target = componentFilePath.split('/')[1], absoluteComponentFilePath = `${(0, path_1.__packageRootDir)()}/${componentFilePath}`, name = path_2.default
                        .basename(componentFilePath)
                        .replace(path_2.default.extname(componentFilePath), '')
                        .replace(/Component$/, '');
                    components.push({
                        target,
                        name,
                        tagName: (0, string_1.__dashCase)(name),
                        path: `/${componentFilePath}`,
                    });
                });
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
            const viteServer = yield (0, vite_1.createServer)({
                // any valid user config options, plus `mode` and `configFile`
                configFile: false,
                root: (0, path_1.__packageRootDir)(),
                optimizeDeps: {
                    esbuildOptions: {
                        // mainFields: ['module', 'main'],
                        resolveExtensions: ['.js', '.ts'],
                    },
                },
                // plugins: [__dynamicImportPlugin()],
                server: {
                    port: finalParams.port,
                    proxy: s_sugar_config_1.default.get('mitosis.server.proxy'),
                },
            });
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
            // const files = __glob.sync(`output/**/*.*`, {
            //     cwd: __packageRootDir(),
            // });
            // files.forEach((filePath) => {
            //     const absoluteFilePath = `${__packageRootDir()}/${filePath}`,
            //         target = filePath.split('/')[1];
            //     __ensureDirSync(
            //         `${__packageRootDir()}/src/js/build/${target}`,
            //     );
            //     __fs.renameSync(
            //         absoluteFilePath,
            //         `${__packageRootDir()}/src/js/build/${target}/${__path.basename(
            //             filePath,
            //         )}`,
            //     );
            // });
            // __removeSync(`${__packageRootDir()}/output`);
            resolve();
        }), {
            metas: {
                id: this.constructor.name,
            },
        });
    }
}
exports.default = SMitosis;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsZ0VBQXlDO0FBQ3pDLHdFQUFpRDtBQUNqRCxrRkFBMEQ7QUFDMUQsb0ZBQTREO0FBQzVELCtDQUFtRDtBQUNuRCx1REFBeUQ7QUFDekQsbURBQTREO0FBQzVELHlEQUF1RTtBQUN2RSx1REFBd0Q7QUFDeEQsd0RBQWtDO0FBQ2xDLHNEQUFnQztBQUNoQyxnREFBMEI7QUFDMUIsZ0RBQTBCO0FBQzFCLCtCQUFvQztBQUNwQyw0R0FBc0Y7QUFDdEYsNEdBQXNGO0FBdUN0RixNQUFNLFFBQVMsU0FBUSxpQkFBUTtJQWEzQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXFDO1FBQzdDLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQ1A7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLFVBQVU7YUFDakI7U0FDSixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQUVGLGFBQWE7UUFDYixhQUFhO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQzNCLGFBQWE7WUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FDdkMsd0JBQWMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FDMUMsQ0FBQztZQUNGLGFBQWE7WUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDdkMsYUFBYTtnQkFDYixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztP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