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
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const process_1 = require("@coffeekraken/sugar/process");
const glob_1 = __importDefault(require("glob"));
const path_2 = __importDefault(require("path"));
class SCarpenter extends s_class_1.default {
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
     * This method allows you to start a server in order to develop your mitosis component easily
     * with feature like multiple frameworks testing, auto compilation, etc...
     *
     * @param         {Partial<ISCarpenterStartParams>}          params        The params to use to start your mitosis env
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params) {
        const finalParams = ((0, object_1.__deepMerge)(__SMitosisStartParamsInterface.defaults(), params));
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[start]</yellow> Starting a new mitosis server...`,
            });
            const app = __express();
            app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const viewRenderer = new __SViewRenderer({
                    rootDirs: [`${(0, path_1.__packageRootDir)(__dirname())}/src/views`],
                });
                const componentFiles = glob_1.default.sync('src/js/build/**/*.*', {
                    cwd: (0, path_1.__packageRootDir)(),
                }), components = [];
                const componentInterfacePath = glob_1.default.sync('dist/pkg/esm/js/interface/*.*', {
                    cwd: (0, path_1.__packageRootDir)(),
                });
                let ComponentInterface, componentSpecs = {};
                if (componentInterfacePath.length) {
                    const finalComponentInterfacePath = `../../../../${path_2.default.relative((0, path_1.__packageRootDir)(__dirname()), `${(0, path_1.__packageRootDir)()}/${componentInterfacePath[0]}`)}`;
                    // import the interface
                    ComponentInterface = (yield Promise.resolve().then(() => __importStar(require(finalComponentInterfacePath)))).default;
                    // convert interface to specs
                    componentSpecs = __SSpecs.fromInterface(ComponentInterface);
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
                        tagName: __dashCase(name),
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
                const cssFilePath = `${(0, path_1.__packageRootDir)(__dirname())}/dist/css/index.css`;
                res.sendFile(cssFilePath);
            }));
            app.get('/dist/js/index.esm.js', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const jsFilePath = `${(0, path_1.__packageRootDir)(__dirname())}/dist/js/index.esm.js`;
                res.sendFile(jsFilePath);
            }));
            let server;
            yield new Promise((_resolve) => {
                server = app.listen(8082, () => {
                    _resolve();
                });
            });
            const viteServer = yield createServer((0, object_1.__deepMerge)(s_sugar_config_1.default.get('mitosis.vite'), {
                // any valid user config options, plus `mode` and `configFile`
                configFile: false,
                root: (0, path_1.__packageRootDir)(),
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
}
exports.default = SCarpenter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsZ0VBQXlDO0FBQ3pDLHdFQUFpRDtBQUNqRCxrRkFBMEQ7QUFDMUQsdURBQXlEO0FBQ3pELG1EQUE0RDtBQUM1RCx5REFBOEQ7QUFDOUQsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQVExQixNQUFNLFVBQVcsU0FBUSxpQkFBUTtJQUM3Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXVDO1FBQy9DLEtBQUssQ0FBQyxJQUFBLG9CQUFXLEVBQUMsRUFBRSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILEtBQUssQ0FBQyxNQUF1QztRQUN6QyxNQUFNLFdBQVcsR0FBMkIsQ0FDeEMsSUFBQSxvQkFBVyxFQUFDLDhCQUE4QixDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUNqRSxDQUFDO1FBQ0YsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDNUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixJQUFJLEVBQUUsZUFBTSxDQUFDLFNBQVM7Z0JBQ3RCLEtBQUssRUFBRSwyREFBMkQ7YUFDckUsQ0FBQyxDQUFDO1lBRUgsTUFBTSxHQUFHLEdBQVEsU0FBUyxFQUFFLENBQUM7WUFFN0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0JBQzVCLE1BQU0sWUFBWSxHQUFHLElBQUksZUFBZSxDQUFDO29CQUNyQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLElBQUEs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