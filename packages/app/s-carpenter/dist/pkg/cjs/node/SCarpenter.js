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
            const specsMap = {}, specsBySources = {};
            for (let [key, source] of Object.entries(finalSettings.sources)) {
                if (!specsBySources[key]) {
                    specsBySources[key] = Object.assign(Object.assign({}, source), { specs: {} });
                }
                const specsInstance = new s_specs_1.default();
                const specsArray = specsInstance.list(source.specsNamespaces);
                specsArray.forEach((specs) => {
                    const specsJson = specs.read();
                    specsBySources[key].specs[specs.dotpath] = specsJson;
                    specsMap[specs.dotpath] = specsJson;
                });
            }
            resolve({
                specsMap,
                specsBySources,
            });
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
            // load the specs files
            const specs = yield this.loadSpecs();
            // listen for requesting the global data like specs by sources, etc...
            app.get(`/carpenter.json`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                res.type('application/json');
                res.send(specs);
            }));
            app.get('/carpenter/index.css', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const cssFilePath = `${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/dist/css/index.css`;
                res.sendFile(cssFilePath);
            }));
            app.get('/carpenter/index.esm.js', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const jsFilePath = `${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/dist/js/index.esm.js`;
                res.sendFile(jsFilePath);
            }));
            app.get('/favicon.ico', (req, res) => {
                res.send(null);
            });
            ['get', 'post'].forEach((method) => {
                app[method]('/carpenter/:dotpath', (req, res) => {
                    (0, carpenterViewHandler_1.default)({
                        req,
                        res,
                        specs,
                        params: finalParams,
                    });
                });
            });
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
}
exports.default = SCarpenter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9FQUE2QztBQUM3QyxrRkFBMEQ7QUFDMUQsa0VBQTJDO0FBQzNDLCtDQUFtRDtBQUNuRCx1REFBeUQ7QUFDekQseURBQThEO0FBQzlELHNEQUFnQztBQUNoQyxnSEFBMEY7QUFFMUYsOERBQXVDO0FBRXZDLDRFQUFvRDtBQUVwRCxtREFBNEQ7QUFFNUQsMkZBQXFFO0FBcURyRSxNQUFNLFVBQVcsU0FBUSxpQkFBUTtJQUM3Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXVDO1FBQy9DLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQ1A7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLFlBQVk7YUFDbkI7U0FDSixFQUNELHdCQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUMvQixRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQVMsQ0FBQyxRQUF1QztRQUM3QyxNQUFNLGFBQWEsR0FBRyxJQUFBLG9CQUFXLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQztRQUVqRSxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDM0IsTUFBTSxRQUFRLEdBQUcsRUFBRSxFQUNmLGNBQWMsR0FBRyxFQUFFLENBQUM7WUFFeEIsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUM3RCxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUN0QixjQUFjLENBQUMsR0FBRyxDQUFDLG1DQUVaLE1BQU0sS0FDVCxLQUFLLEVBQUUsRUFBRSxHQUNaLENBQUM7aUJBQ0w7Z0JBRUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7Z0JBQ3JDLE1BQU0sVUFBVSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUU5RCxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7b0JBQ3pCLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDL0IsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO29CQUNyRCxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLFNBQVMsQ0FBQztnQkFDeEMsQ0FBQyxDQUFDLENBQUM7YUFDTjtZQUVELE9BQU8sQ0FBQztnQkFDSixRQUFRO2dCQUNSLGNBQWM7YUFDakIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxLQUFLLENBQUMsTUFBdUM7UUFDekMsTUFBTSxXQUFXLEdBQTJCLENBQ3hDLElBQUEsb0JBQVcsRUFBQyx3Q0FBZ0MsQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FDbkUsQ0FBQztRQUVGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTtZQUNqQyxPQUFPLENBQUMsR0FBRyxDQUNQLDZEQUE2RCxDQUNoRSxDQUFDO1lBRUYsSUFBSSxXQUFXLENBQUMsR0FBRyxFQUFFO2dCQUNqQixNQUFNLElBQUksR0FBRyxJQUFJLGdCQUFPLENBQUM7b0JBQ3JCLGFBQWEsQ0FBQyxVQUFVO3dCQUNwQixPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO3dCQUMvQixVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRzs0QkFDdEIsSUFBSSxxQkFBcUI7Z0NBQ3JCLE9BQU87b0NBQ0gsTUFBTSxFQUFFLHVCQUF1QjtvQ0FDL0IsWUFBWSxFQUFFLElBQUk7b0NBQ2xCLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO3dDQUNkLE9BQU8sSUFBSSxDQUFDO29DQUNoQixDQUFDO2lDQUNKLENBQUM7NEJBQ04sQ0FBQzt5QkFDSixDQUFDO3dCQUNGLE9BQU8sVUFBVSxDQUFDO29CQUN0QixDQUFDO2lCQUNKLENBQUMsQ0FBQztnQkFDSCxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUM7b0JBQ2IsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRO2lCQUM3QixDQUFDLENBQUM7YUFDTjtZQUVELHVCQUF1QjtZQUN2QixNQUFNLEdBQUcsR0FBUSxJQUFBLGlCQUFTLEdBQUUsQ0FBQztZQUM3QixHQUFHLENBQUMsR0FBRyxDQUFDLHFCQUFZLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztZQUUvQyx1QkFBdUI7WUFDdkIsTUFBTSxLQUFLLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFFckMsc0VBQXNFO1lBQ3RFLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUUsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7Z0JBQzFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDN0IsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUEsQ0FBQyxDQUFDO1lBRUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtnQkFDL0MsTUFBTSxXQUFXLEdBQUcsR0FBRyxJQUFBLHVCQUFnQixFQUNuQyxJQUFBLGNBQVMsR0FBRSxDQUNkLHFCQUFxQixDQUFDO2dCQUN2QixHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzlCLENBQUMsQ0FBQSxDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLENBQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUNsRCxNQUFNLFVBQVUsR0FBRyxHQUFHLElBQUEsdUJBQWdCLEVBQ2xDLElBQUEsY0FBUyxHQUFFLENBQ2QsdUJBQXVCLENBQUM7Z0JBQ3pCLEdBQUcsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztZQUVILEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25CLENBQUMsQ0FBQyxDQUFDO1lBRUgsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7Z0JBQy9CLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDNUMsSUFBQSw4QkFBc0IsRUFBQzt3QkFDbkIsR0FBRzt3QkFDSCxHQUFHO3dCQUNILEtBQUs7d0JBQ0wsTUFBTSxFQUFFLFdBQVc7cUJBQ3RCLENBQUMsQ0FBQztnQkFDUCxDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBRUgsa0RBQWtEO1lBQ2xELEdBQUcsQ0FBQyxHQUFHLENBQ0gsb0JBQW9CLEVBQ3BCLElBQUEsNEJBQWtCLEVBQUMscUJBQXFCLENBQUMsQ0FDNUMsQ0FBQztZQUVGLElBQUksTUFBTSxDQUFDO1lBQ1gsTUFBTSxJQUFJLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUMzQixNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtvQkFDdkMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FDUCwrREFBK0QsQ0FDbEUsQ0FBQztZQUNGLE9BQU8sQ0FBQyxHQUFHLENBQ1AsaURBQWlELFdBQVcsQ0FBQyxJQUFJLFNBQVMsQ0FDN0UsQ0FBQztZQUVGLElBQUEseUJBQWUsRUFBQyxHQUFHLEVBQUU7Z0JBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQ1AsMkVBQTJFLENBQzlFLENBQUM7Z0JBQ0YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO29CQUMzQixVQUFVLENBQUMsR0FBRyxFQUFFO3dCQUNaLE9BQU8sQ0FBQyxJQUFJLENBQ1IsK0VBQStFLENBQ2xGLENBQUM7d0JBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDcEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNULE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFO3dCQUNkLGFBQWE7d0JBQ2IsT0FBTyxFQUFFLENBQUM7b0JBQ2QsQ0FBQyxDQUFDLENBQUM7Z0JBQ1AsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFFRCxrQkFBZSxVQUFVLENBQUMifQ==