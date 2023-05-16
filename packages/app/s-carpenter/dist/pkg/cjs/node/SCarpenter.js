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
const s_specs_1 = __importDefault(require("@coffeekraken/s-specs"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_vite_1 = __importDefault(require("@coffeekraken/s-vite"));
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const process_1 = require("@coffeekraken/sugar/process");
const express_1 = __importDefault(require("express"));
const SCarpenterStartParamsInterface_1 = __importDefault(require("./interface/SCarpenterStartParamsInterface"));
const fs_2 = __importDefault(require("fs"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const path_1 = require("@coffeekraken/sugar/path");
const carpenterNodesHandler_1 = __importDefault(require("./handlers/carpenterNodesHandler"));
const carpenterPagesHandler_1 = __importDefault(require("./handlers/carpenterPagesHandler"));
const carpenterViewHandler_1 = __importDefault(require("./handlers/carpenterViewHandler"));
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
     * @name          loadSpecs
     * @type          Function
     *
     * This method allows you to load the specs specified in the config.carpenter.categories configuration
     *
     * @return        {Promise}                                     A promise resolved with the corresponding specs loaded
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    loadSpecs(settings) {
        const finalSettings = (0, object_1.__deepMerge)(this.settings, settings !== null && settings !== void 0 ? settings : {});
        return new Promise((resolve) => {
            var _a;
            const finalSpecs = {};
            const specsInstance = new s_specs_1.default({
                previewUrl({ path, specs }) {
                    return `/carpenter/api/specs/${specs}/preview.png`;
                },
            });
            const specsArray = specsInstance.list((_a = finalSettings.namespaces) !== null && _a !== void 0 ? _a : ['views']);
            specsArray.forEach((specs) => {
                const specsJson = specs.read({
                    metas: true,
                });
                finalSpecs[specs.dotpath] = specsJson;
            });
            resolve(finalSpecs);
        });
    }
    /**
     * @name          start
     * @type          Function
     *
     * This method allows you to start a server in order display your components library in a nice and coherent interface
     *
     * @param         {Partial<ISCarpenterStartParams>}          params        The params to use to start your mitosis env
     * @return        {Promise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params) {
        const finalParams = ((0, object_1.__deepMerge)(SCarpenterStartParamsInterface_1.default.defaults(), params));
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            console.log(`<yellow>[start]</yellow> Starting a new carpenter server...`);
            if (finalParams.dev) {
                const vite = new s_vite_1.default({
                    processConfig(viteConfig) {
                        delete viteConfig.server.proxy;
                        viteConfig.server.proxy = {
                            get '^(?!\\/carpenter).*'() {
                                return {
                                    target: `http://localhost:3000`,
                                    changeOrigin: true,
                                    rewrite: (path) => {
                                        return path;
                                    },
                                };
                            },
                        };
                        return viteConfig;
                    },
                });
                yield vite.start({
                    port: finalParams.vitePort,
                });
            }
            // init the express app
            const app = (0, express_1.default)();
            app.use(body_parser_1.default.json({ limit: '120mb' }));
            // proxy all non carpenter to the main vite server
            app.get(/^(?!\/carpenter).*/, (0, express_http_proxy_1.default)('http://0.0.0.0:3000'));
            let server;
            yield new Promise((_resolve) => {
                server = app.listen(finalParams.port, () => {
                    _resolve(null);
                });
            });
            console.log(`<green>[start]</green> Your carpenter server is available at:`);
            console.log(`<green>[start]</green> <cyan>http://127.0.0.1:${finalParams.port}</cyan>`);
            (0, process_1.__onProcessExit)(() => {
                console.log(`<red>[kill]</red> Gracefully killing the <cyan>Carpenter server</cyan>...`);
                return new Promise((resolve) => {
                    setTimeout(() => {
                        console.warn(`<yellow>[kill]</yellow> The server take times to shutdown. It will be killed.`);
                        process.kill(0);
                    }, 3000);
                    server.close(() => {
                        // @ts-ignore
                        resolve();
                    });
                });
            });
        }));
    }
    /**
     * @name            initOnExpressServer
     * @type            Function
     * @async
     *
     * This method allows you to init the carpenter handlers on an existing express server
     *
     * @param       {Express}           expressServer       The express server on which to init the carpenter handlers
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    initOnExpressServer(expressServer) {
        return __awaiter(this, void 0, void 0, function* () {
            // load the specs files
            const allSpecs = yield this.loadSpecs();
            const allSpecsWithoutMetas = {};
            for (let [key, obj] of Object.entries(allSpecs)) {
                allSpecsWithoutMetas[key] = Object.assign({}, obj);
                delete allSpecsWithoutMetas.metas;
            }
            // Retrieve all the specs
            expressServer.get('/carpenter/api/specs', (req, res) => __awaiter(this, void 0, void 0, function* () {
                res.type('application/json');
                res.send(allSpecsWithoutMetas !== null && allSpecsWithoutMetas !== void 0 ? allSpecsWithoutMetas : {});
            }));
            // retrieve the available scopes
            expressServer.get('/carpenter/api/scopes', (req, res) => {
                res.status(200);
                res.type('application/json');
                res.send(s_sugar_config_1.default.get('carpenter.scopes'));
            });
            // Retrieve a specific spec
            expressServer.get('/carpenter/api/specs/:specs', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const specs = req.params.specs;
                let finalSpecs;
                // try with the passed specs
                if (allSpecs[specs]) {
                    finalSpecs = allSpecs[specs];
                }
                // try by adding the name at the end
                if (!finalSpecs) {
                    const longSpecs = `${specs}.${specs.split('.').pop()}`;
                    finalSpecs = allSpecs[longSpecs];
                }
                if (finalSpecs) {
                    delete finalSpecs.metas;
                }
                res.type('application/json');
                res.send(finalSpecs !== null && finalSpecs !== void 0 ? finalSpecs : {});
            }));
            // add "preview" property in specs
            for (let [dotpath, specObj] of Object.entries(allSpecs)) {
                const potentialPreviewFilePath = specObj.metas.path.replace('.spec.json', '.preview.png');
                if (fs_2.default.existsSync(potentialPreviewFilePath)) {
                    // expose a URL to access the preview
                    expressServer.get('/carpenter/api/specs/:specs/preview.png', (req, res) => __awaiter(this, void 0, void 0, function* () {
                        res.status(200);
                        res.type('image/png');
                        res.sendFile(potentialPreviewFilePath);
                    }));
                }
            }
            expressServer.get('/carpenter.css', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const cssFilePath = `${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/dist/css/index.css`;
                res.sendFile(cssFilePath);
            }));
            expressServer.get('/carpenter.js', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const jsFilePath = `${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/dist/js/index.esm.js`;
                res.sendFile(jsFilePath);
            }));
            // nodes
            [
                'put',
                'post',
                'delete',
                'get', // get a node json
            ].forEach((method) => {
                expressServer[method]('/carpenter/api/nodes/:uid?', (req, res) => {
                    (0, carpenterNodesHandler_1.default)({
                        req,
                        res,
                        allSpecs,
                    });
                });
            });
            // check if a passed node uid already exists
            expressServer.get('/carpenter/api/nodes/:uid/status', (req, res) => {
                const status = {
                    exists: false,
                };
                if (fs_2.default.existsSync(`${s_sugar_config_1.default.get('storage.src.nodesDir')}/${req.params.uid}.json`)) {
                    status.exists = true;
                }
                res.type('application/json');
                res.status(200);
                res.send(status);
            });
            // pages
            [
                'put',
                'post',
                'delete',
                'get', // get a page json
            ].forEach((method) => {
                expressServer[method]('/carpenter/api/pages/:uid?', (req, res) => {
                    (0, carpenterPagesHandler_1.default)({
                        req,
                        res,
                        allSpecs,
                    });
                });
            });
            // check if a passed page uid already exists
            expressServer.get('/carpenter/api/pages/:uid/status', (req, res) => {
                const status = {
                    exists: false,
                };
                if (fs_2.default.existsSync(`${s_sugar_config_1.default.get('storage.src.pagesDir')}/${req.params.uid}.json`)) {
                    status.exists = true;
                }
                res.type('application/json');
                res.status(200);
                res.send(status);
            });
            // render a default node
            expressServer.get('/carpenter/:specs', (req, res) => {
                (0, carpenterViewHandler_1.default)({
                    req,
                    res,
                    allSpecs,
                });
            });
        });
    }
}
exports.default = SCarpenter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9FQUE2QztBQUM3QyxrRkFBMEQ7QUFDMUQsa0VBQTJDO0FBQzNDLCtDQUFtRDtBQUNuRCx1REFBeUQ7QUFDekQseURBQThEO0FBQzlELHNEQUFnQztBQUNoQyxnSEFBMEY7QUFFMUYsNENBQXNCO0FBRXRCLDhEQUF1QztBQUV2Qyw0RUFBb0Q7QUFFcEQsbURBQTREO0FBRTVELDZGQUF1RTtBQUN2RSw2RkFBdUU7QUFDdkUsMkZBQXFFO0FBMkNyRSxNQUFNLFVBQVcsU0FBUSxpQkFBUTtJQUM3Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXVDO1FBQy9DLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQ1A7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLFlBQVk7YUFDbkI7U0FDSixFQUNELHdCQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUMvQixRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQVMsQ0FBQyxRQUF1QztRQUM3QyxNQUFNLGFBQWEsR0FBRyxJQUFBLG9CQUFXLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQztRQUVqRSxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7O1lBQzNCLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUV0QixNQUFNLGFBQWEsR0FBRyxJQUFJLGlCQUFRLENBQUM7Z0JBQy9CLFVBQVUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUU7b0JBQ3RCLE9BQU8sd0JBQXdCLEtBQUssY0FBYyxDQUFDO2dCQUN2RCxDQUFDO2FBQ0osQ0FBQyxDQUFD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