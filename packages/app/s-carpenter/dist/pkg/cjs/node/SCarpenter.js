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
     * This method allows you to load the specs specified in the config.carpenter.sources configuration
     *
     * @return        {Promise}                                     A promise resolved with the corresponding specs loaded
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    loadSpecs(settings) {
        const finalSettings = (0, object_1.__deepMerge)(this.settings, settings !== null && settings !== void 0 ? settings : {});
        return new Promise((resolve) => {
            const finalSpecs = {};
            for (let [key, source] of Object.entries(finalSettings.sources)) {
                const specsInstance = new s_specs_1.default();
                const specsArray = specsInstance.list(source.specsNamespaces);
                specsArray.forEach((specs) => {
                    const specsJson = specs.read({
                        metas: false,
                    });
                    finalSpecs[specs.dotpath] = specsJson;
                });
            }
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
            // Retrieve all the specs
            expressServer.get('/carpenter/api/specs', (req, res) => __awaiter(this, void 0, void 0, function* () {
                res.type('application/json');
                res.send(allSpecs !== null && allSpecs !== void 0 ? allSpecs : {});
            }));
            // retrieve the available scopes
            expressServer.get('/carpenter/api/scopes', (req, res) => {
                res.status(200);
                res.type('application/json');
                res.send(s_sugar_config_1.default.get('carpenter.scopes'));
            });
            // retrieve the available categories
            expressServer.get('/carpenter/api/categories', (req, res) => {
                res.status(200);
                res.type('application/json');
                res.send(s_sugar_config_1.default.get('carpenter.categories'));
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
            expressServer.get('/carpenter.css', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const cssFilePath = `${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/dist/css/index.css`;
                res.sendFile(cssFilePath);
            }));
            expressServer.get('/carpenter.js', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const jsFilePath = `${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/dist/js/index.esm.js`;
                res.sendFile(jsFilePath);
            }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9FQUE2QztBQUM3QyxrRkFBMEQ7QUFDMUQsa0VBQTJDO0FBQzNDLCtDQUFtRDtBQUNuRCx1REFBeUQ7QUFDekQseURBQThEO0FBQzlELHNEQUFnQztBQUNoQyxnSEFBMEY7QUFFMUYsOERBQXVDO0FBRXZDLDRFQUFvRDtBQUVwRCxtREFBNEQ7QUFFNUQsNkZBQXVFO0FBQ3ZFLDZGQUF1RTtBQUN2RSwyRkFBcUU7QUFxRHJFLE1BQU0sVUFBVyxTQUFRLGlCQUFRO0lBQzdCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBdUM7UUFDL0MsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsWUFBWTthQUNuQjtTQUNKLEVBQ0Qsd0JBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQy9CLFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsU0FBUyxDQUFDLFFBQXVDO1FBQzdDLE1BQU0sYUFBYSxHQUFHLElBQUEsb0JBQVcsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRWpFLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtZQUMzQixNQUFNLFVBQVUsR0FBRyxFQUFFLENBQUM7WUFFdEIsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM3RCxNQUFNLGFBQWEsR0FBRyxJQUFJLGlCQUFRLEVBQUUsQ0FBQztnQkFDckMsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBRTlELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtvQkFDekIsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFDekIsS0FBSyxFQUFFLEtBQUs7cUJBQ2YsQ0FBQyxDQUFDO29CQUNILFVBQVUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO2dCQUMxQyxDQUFDLENBQUMsQ0FBQzthQUNOO1lBRUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsS0FBSyxDQUFDLE1BQXVDO1FBQ3pDLE1BQU0sV0FBVyxHQUEyQixDQUN4QyxJQUFBLG9CQUFXLEVBQUMsd0NBQWdDLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQ25FLENBQUM7UUFFRixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7WUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FDUCw2REFBNkQsQ0FDaEUsQ0FBQztZQUVGLElBQUksV0FBVyxDQUFDLEdBQUcsRUFBRTtnQkFDakIsTUFBTSxJQUFJLEdBQUcsSUFBSSxnQkFBTyxDQUFDO29CQUNyQixhQUFhLENBQUMsVUFBVTt3QkFDcEIsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQzt3QkFDL0IsVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUc7NEJBQ3RCLElBQUkscUJBQXFCO2dDQUNyQixPQUFPO29DQUNILE1BQU0sRUFBRSx1QkFBdUI7b0NBQy9CLFlBQVksRUFBRSxJQUFJO29DQUNsQixPQUFPLEVBQUUsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3Q0FDZCxPQUFPLElBQUksQ0FBQztvQ0FDaEIsQ0FBQztpQ0FDSixDQUFDOzRCQUNOLENBQUM7eUJBQ0osQ0FBQzt3QkFDRixPQUFPLFVBQVUsQ0FBQztvQkFDdEIsQ0FBQztpQkFDSixDQUFDLENBQUM7Z0JBQ0gsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDO29CQUNiLElBQUksRUFBRSxXQUFXLENBQUMsUUFBUTtpQkFDN0IsQ0FBQyxDQUFDO2FBQ047WUFFRCx1QkFBdUI7WUFDdkIsTUFBTSxHQUFHLEdBQVEsSUFBQSxpQkFBUyxHQUFFLENBQUM7WUFDN0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxxQkFBWSxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFL0Msa0RBQWtEO1lBQ2xELEdBQUcsQ0FBQyxHQUFHLENBQ0gsb0JBQW9CLEVBQ3BCLElBQUEsNEJBQWtCLEVBQUMscUJBQXFCLENBQUMsQ0FDNUMsQ0FBQztZQUVGLElBQUksTUFBTSxDQUFDO1lBQ1gsTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUMzQixNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtvQkFDdkMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FDUCwrREFBK0QsQ0FDbEUsQ0FBQztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQ1AsaURBQWlELFdBQVcsQ0FBQyxJQUFJLFNBQVMsQ0FDN0UsQ0FBQztZQUVGLElBQUEseUJBQWUsRUFBQyxHQUFHLEVBQUU7Z0JBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQ1AsMkVBQTJFLENBQzlFLENBQUM7Z0JBQ0YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUMzQixVQUFVLENBQUMsR0FBRyxFQUFFO3dCQUNaLE9BQU8sQ0FBQyxJQUFJLENBQ1IsK0VBQStFLENBQ2xGLENBQUM7d0JBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO3dCQUNkLGFBQWE7d0JBQ2IsT0FBTyxFQUFFLENBQUM7b0JBQ2QsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDRyxtQkFBbUIsQ0FBQyxhQUFrQjs7WUFDeEMsdUJBQXVCO1lBQ3ZCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBRXhDLHlCQUF5QjtZQUN6QixhQUFhLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUN6RCxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztZQUVILGdDQUFnQztZQUNoQyxhQUFhLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUNwRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQzdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsd0JBQWMsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQ3JELENBQUMsQ0FBQyxDQUFDO1lBRUgsb0NBQW9DO1lBQ3BDLGFBQWEsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0JBQ3hELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7WUFDekQsQ0FBQyxDQUFDLENBQUM7WUFFSCwyQkFBMkI7WUFDM0IsYUFBYSxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDaEUsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7Z0JBQy9CLElBQUksVUFBVSxDQUFDO2dCQUVmLDRCQUE0QjtnQkFDNUIsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ2pCLFVBQVUsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2hDO2dCQUVELG9DQUFvQztnQkFDcEMsSUFBSSxDQUFDLFVBQVUsRUFBRTtvQkFDYixNQUFNLFNBQVMsR0FBRyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7b0JBQ3ZELFVBQVUsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7aUJBQ3BDO2dCQUVELElBQUksVUFBVSxFQUFFO29CQUNaLE9BQU8sVUFBVSxDQUFDLEtBQUssQ0FBQztpQkFDM0I7Z0JBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUM3QixHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsYUFBVixVQUFVLGNBQVYsVUFBVSxHQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLENBQUMsQ0FBQSxDQUFDLENBQUM7WUFFSCxhQUFhLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUNuRCxNQUFNLFdBQVcsR0FBRyxHQUFHLElBQUEsdUJBQWdCLEVBQ25DLElBQUEsY0FBUyxHQUFFLENBQ2QscUJBQXFCLENBQUM7Z0JBQ3ZCLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztZQUNILGFBQWEsQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUNsRCxNQUFNLFVBQVUsR0FBRyxHQUFHLElBQUEsdUJBQWdCLEVBQ2xDLElBQUEsY0FBUyxHQUFFLENBQ2QsdUJBQXVCLENBQUM7Z0JBQ3pCLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztZQUVIO2dCQUNJLEtBQUs7Z0JBQ0wsTUFBTTtnQkFDTixRQUFRO2dCQUNSLEtBQUssRUFBRSxrQkFBa0I7YUFDNUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDakIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLDRCQUE0QixFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUM3RCxJQUFBLCtCQUF1QixFQUFDO3dCQUNwQixHQUFHO3dCQUNILEdBQUc7d0JBQ0gsUUFBUTtxQkFDWCxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUVIO2dCQUNJLEtBQUs7Z0JBQ0wsTUFBTTtnQkFDTixRQUFRO2dCQUNSLEtBQUssRUFBRSxrQkFBa0I7YUFDNUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDakIsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLDRCQUE0QixFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUM3RCxJQUFBLCtCQUF1QixFQUFDO3dCQUNwQixHQUFHO3dCQUNILEdBQUc7d0JBQ0gsUUFBUTtxQkFDWCxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUVILHdCQUF3QjtZQUN4QixhQUFhLENBQUMsR0FBRyxDQUFDLG1CQUFtQixFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUNoRCxJQUFBLDhCQUFzQixFQUFDO29CQUNuQixHQUFHO29CQUNILEdBQUc7b0JBQ0gsUUFBUTtpQkFDWCxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUM7S0FBQTtDQUNKO0FBRUQsa0JBQWUsVUFBVSxDQUFDIn0=