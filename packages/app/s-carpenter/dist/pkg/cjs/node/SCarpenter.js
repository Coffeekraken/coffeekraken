"use strict";
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
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const process_1 = require("@coffeekraken/sugar/process");
const express_1 = __importDefault(require("express"));
const fs_2 = __importDefault(require("fs"));
const SCarpenterStartParamsInterface_1 = __importDefault(require("./interface/SCarpenterStartParamsInterface"));
class SCarpenter extends s_class_1.default {
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
                id: 'SCarpenter',
            },
        }, s_sugar_config_1.default.get('carpenter'), settings || {}));
    }
    /**
     * @name          start
     * @type          Function
     *
     * This method allows you to start a server in order display your components library in a nice and coherent interface
     *
     * @param         {Partial<ISCarpenterStartParams>}          params        The params to use to start your mitosis env
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params) {
        const finalParams = ((0, object_1.__deepMerge)(SCarpenterStartParamsInterface_1.default.defaults(), params));
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<yellow>[start]</yellow> Starting a new carpenter server...`,
            });
            const app = (0, express_1.default)(), watchers = {}, specsMap = {}, specsBySources = {};
            for (let [key, source] of Object.entries(this.settings.sources)) {
                // watchers[key] = __chokidar.watch(source.glob, {
                //     cwd: source.inDir,
                //     ignoreInitial: false,
                // });
                // watchers[key].on('add', (newFileRelPath) => {
                //     const newFileAbsPath = `${source.inDir}/${newFileRelPath}`;
                //     const spec = new __SSpecs();
                //     console.log(newFileAbsPath);
                //     console.log(spec.read(newFileAbsPath));
                // });
                // watchers[key].on('change', (updatedFilePath) => {});
                if (!specsBySources[key]) {
                    specsBySources[key] = Object.assign(Object.assign({}, source), { specs: {} });
                }
                // console.log(key, source);
                const specsInstance = new s_specs_1.default();
                const specsArray = specsInstance.list(source.specsNamespaces);
                // specsBySources[key].specs = [
                //     ...specsBySources[key].specs,
                //     ...specsArray,
                // ];
                specsArray.forEach((specs) => {
                    const specsJson = specs.read();
                    specsBySources[key].specs[specs.dotpath] = specsJson;
                    specsMap[specs.dotpath] = specsJson;
                    // listen for request on that particular component
                    // app.get(`/json/${specs.dotpath}`, async (req, res) => {
                    //     specs.specs = specs.read();
                    //     res.type('application/json');
                    //     res.send(specs);
                    // });
                });
            }
            // // listen for request on that particular component
            // app.get(`/${specs.dotpath}`, async (req, res) => {
            //     // load html here to have updated html without reloading the server
            //     const html = __fs
            //         .readFileSync(
            //             `${__packageRootDir(
            //                 __dirname(),
            //             )}/src/views/index.html`,
            //         )
            //         .toString();
            //     res.type('text/html');
            //     res.send(html);
            // });
            // listen for requesting the global data like specs by sources, etc...
            app.get(`/carpenter`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                res.type('application/json');
                res.send({
                    specsMap,
                    specsBySources,
                });
            }));
            app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
                // load html here to have updated html without reloading the server
                const html = fs_2.default
                    .readFileSync(`${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/src/views/index.html`)
                    .toString();
                res.type('text/html');
                res.send(html);
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
                server = app.listen(finalParams.port, () => {
                    _resolve();
                });
            });
            emit('log', {
                type: s_log_1.default.TYPE_INFO,
                value: `<green>[start]</green> Your carpenter server is available at:`,
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
                        // @ts-ignore
                        resolve();
                    }));
                });
            });
        }));
    }
}
exports.default = SCarpenter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsb0VBQTZDO0FBQzdDLGtGQUEwRDtBQUMxRCwrQ0FBbUQ7QUFDbkQsdURBQXlEO0FBQ3pELG1EQUE0RDtBQUM1RCx5REFBOEQ7QUFDOUQsc0RBQWdDO0FBQ2hDLDRDQUFzQjtBQUN0QixnSEFBMEY7QUE2QzFGLE1BQU0sVUFBVyxTQUFRLGlCQUFRO0lBQzdCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBdUM7UUFDL0MsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsWUFBWTthQUNuQjtTQUNKLEVBQ0Qsd0JBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQy9CLFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILEtBQUssQ0FBQyxNQUF1QztRQUN6QyxNQUFNLFdBQVcsR0FBMkIsQ0FDeEMsSUFBQSxvQkFBVyxFQUFDLHdDQUFnQyxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUNuRSxDQUFDO1FBRUYsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDNUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixJQUFJLEVBQUUsZUFBTSxDQUFDLFNBQVM7Z0JBQ3RCLEtBQUssRUFBRSw2REFBNkQ7YUFDdkUsQ0FBQyxDQUFDO1lBRUgsTUFBTSxHQUFHLEdBQVEsSUFBQSxpQkFBUyxHQUFFLEVBQ3hCLFFBQVEsR0FBRyxFQUFFLEVBQ2IsUUFBUSxHQUFHLEVBQUUsRUFDYixjQUFjLEdBQUcsRUFB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