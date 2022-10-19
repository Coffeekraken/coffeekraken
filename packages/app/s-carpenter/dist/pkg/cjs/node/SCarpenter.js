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
const s_view_renderer_1 = __importDefault(require("@coffeekraken/s-view-renderer"));
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const process_1 = require("@coffeekraken/sugar/process");
const express_1 = __importDefault(require("express"));
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
            const viewRenderer = new s_view_renderer_1.default({
                rootDirs: [`${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/src/views`],
            });
            const app = (0, express_1.default)(), watchers = {}, specsBySources = {};
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
                    specsBySources[key] = Object.assign(Object.assign({}, source), { specs: [] });
                }
                // console.log(key, source);
                const specs = new s_specs_1.default();
                const specsArray = specs.list(source.specsNamespaces);
                specsBySources[key].specs = [
                    ...specsBySources[key].specs,
                    specsArray,
                ];
                specsArray.forEach((spec) => {
                    // listen for request on that particular component
                    app.get(`/${spec.dotpath}`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                        console.log(specsBySources);
                        const result = yield viewRenderer.render('index', {});
                        res.type('text/html');
                        res.send(result.value);
                    }));
                });
            }
            app.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
                res.type('text/html');
                res.send('Hello');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsb0VBQTZDO0FBQzdDLGtGQUEwRDtBQUMxRCxvRkFBNEQ7QUFDNUQsK0NBQW1EO0FBQ25ELHVEQUF5RDtBQUN6RCxtREFBNEQ7QUFDNUQseURBQThEO0FBQzlELHNEQUFnQztBQUNoQyxnSEFBMEY7QUE2QzFGLE1BQU0sVUFBVyxTQUFRLGlCQUFRO0lBQzdCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBdUM7UUFDL0MsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsWUFBWTthQUNuQjtTQUNKLEVBQ0Qsd0JBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQy9CLFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILEtBQUssQ0FBQyxNQUF1QztRQUN6QyxNQUFNLFdBQVcsR0FBMkIsQ0FDeEMsSUFBQSxvQkFBVyxFQUFDLHdDQUFnQyxDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUNuRSxDQUFDO1FBRUYsT0FBTyxJQUFJLG1CQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDNUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixJQUFJLEVBQUUsZUFBTSxDQUFDLFNBQVM7Z0JBQ3RCLEtBQUssRUFBRSw2REFBNkQ7YUFDdkUsQ0FBQyxDQUFDO1lBRUgsTUFBTSxZQUFZLEdBQUcsSUFBSSx5QkFBZSxDQUFDO2dCQUNyQyxRQUFRLEVBQUUsQ0FBQyxHQUFHLElBQUEsdUJBQWdCLEVBQUMsSUFBQSxjQUFTLEdBQUUs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