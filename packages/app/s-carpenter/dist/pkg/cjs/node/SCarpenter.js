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
const SCarpenterStartParamsInterface_js_1 = __importDefault(require("./interface/SCarpenterStartParamsInterface.js"));
const object_2 = require("@coffeekraken/sugar/object");
const fs_2 = __importDefault(require("fs"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_http_proxy_1 = __importDefault(require("express-http-proxy"));
const path_1 = require("@coffeekraken/sugar/path");
const carpenterNodesHandler_js_1 = __importDefault(require("./handlers/carpenterNodesHandler.js"));
const carpenterPagesHandler_js_1 = __importDefault(require("./handlers/carpenterPagesHandler.js"));
const carpenterViewHandler_js_1 = __importDefault(require("./handlers/carpenterViewHandler.js"));
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
                previewUrl({ path, specs, name }) {
                    return `/carpenter/api/specs/${specs}/${name}.preview.png`;
                },
            });
            const specsArray = specsInstance.list((_a = finalSettings.namespaces) !== null && _a !== void 0 ? _a : ['views']);
            specsArray.forEach((specs) => {
                const specsJson = specs.read({
                    metas: true,
                    models: true,
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
        const finalParams = ((0, object_1.__deepMerge)(SCarpenterStartParamsInterface_js_1.default.defaults(), params));
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
            const allSpecsWithoutMetas = (0, object_2.__clone)(allSpecs, {
                deep: true,
            });
            for (let [key, obj] of Object.entries(allSpecsWithoutMetas)) {
                delete obj.metas;
                if (obj.models) {
                    for (let [n, modelObj] of Object.entries(obj.models)) {
                        delete modelObj.metas;
                    }
                }
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
                if (allSpecsWithoutMetas[specs]) {
                    finalSpecs = allSpecsWithoutMetas[specs];
                }
                // try by adding the name at the end
                if (!finalSpecs) {
                    const longSpecs = `${specs}.${specs.split('.').pop()}`;
                    finalSpecs = allSpecsWithoutMetas[longSpecs];
                }
                if (finalSpecs) {
                    delete finalSpecs.metas;
                }
                res.type('application/json');
                res.send(finalSpecs !== null && finalSpecs !== void 0 ? finalSpecs : {});
            }));
            // add "preview" property in specs
            for (let [dotpath, specObj] of Object.entries(allSpecs)) {
                const potentialPreviewFilePath = `${specObj.metas.dir}/${specObj.metas.name}.preview.png`;
                if (fs_2.default.existsSync(potentialPreviewFilePath)) {
                    // expose a URL to access the preview
                    expressServer.get(`/carpenter/api/specs/:specs/${specObj.metas.name}.preview.png`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                        res.status(200);
                        res.type('image/png');
                        res.sendFile(potentialPreviewFilePath);
                    }));
                }
                // models preview
                if (specObj.models) {
                    for (let [modelName, modelObj] of Object.entries(specObj.models)) {
                        const potentialModelPreviewFilePath = `${modelObj.metas.dir}/${modelObj.metas.name}.preview.png`;
                        if (fs_2.default.existsSync(potentialModelPreviewFilePath)) {
                            // expose a URL to access the preview
                            expressServer.get(`/carpenter/api/specs/:specs/${modelObj.metas.name}.preview.png`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                                res.status(200);
                                res.type('image/png');
                                res.sendFile(potentialModelPreviewFilePath);
                            }));
                        }
                    }
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
                    (0, carpenterNodesHandler_js_1.default)({
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
                    (0, carpenterPagesHandler_js_1.default)({
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
                (0, carpenterViewHandler_js_1.default)({
                    req,
                    res,
                    allSpecs,
                });
            });
        });
    }
}
exports.default = SCarpenter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9FQUE2QztBQUM3QyxrRkFBMEQ7QUFDMUQsa0VBQTJDO0FBQzNDLCtDQUFtRDtBQUNuRCx1REFBeUQ7QUFDekQseURBQThEO0FBQzlELHNEQUFnQztBQUNoQyxzSEFBNkY7QUFFN0YsdURBQXFEO0FBRXJELDRDQUFzQjtBQUV0Qiw4REFBdUM7QUFFdkMsNEVBQW9EO0FBRXBELG1EQUE0RDtBQUU1RCxtR0FBMEU7QUFDMUUsbUdBQTBFO0FBQzFFLGlHQUF3RTtBQTJDeEUsTUFBTSxVQUFXLFNBQVEsaUJBQVE7SUFDN0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF1QztRQUMvQyxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUNQO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxZQUFZO2FBQ25CO1NBQ0osRUFDRCx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsRUFDL0IsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxTQUFTLENBQUMsUUFBdUM7UUFDN0MsTUFBTSxhQUFhLEdBQUcsSUFBQSxvQkFBVyxFQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUM7UUFFakUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFOztZQUMzQixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFFdEIsTUFBTSxhQUFhLEdBQUcsSUFBSSxpQkFBUSxDQUFDO2dCQUMvQixVQUFVLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRTtvQkFDNUIsT0FBTyx3QkFBd0IsS0FBSyxJQUFJLElBQUksY0FB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