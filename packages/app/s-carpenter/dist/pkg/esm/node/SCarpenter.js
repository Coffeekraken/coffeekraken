var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SSpecs from '@coffeekraken/s-specs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SVite from '@coffeekraken/s-vite';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __express from 'express';
import __SCarpenterStartParamsInterface from './interface/SCarpenterStartParamsInterface';
import __fs from 'fs';
import __bodyParser from 'body-parser';
import __expressHttpProxy from 'express-http-proxy';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __carpenterNodesHandler from './handlers/carpenterNodesHandler';
import __carpenterPagesHandler from './handlers/carpenterPagesHandler';
import __carpenterViewHandler from './handlers/carpenterViewHandler';
class SCarpenter extends __SClass {
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
        super(__deepMerge({
            metas: {
                id: 'SCarpenter',
            },
        }, __SSugarConfig.get('carpenter'), settings || {}));
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
        const finalSettings = __deepMerge(this.settings, settings !== null && settings !== void 0 ? settings : {});
        return new Promise((resolve) => {
            var _a;
            const finalSpecs = {};
            const specsInstance = new __SSpecs({
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
        const finalParams = (__deepMerge(__SCarpenterStartParamsInterface.defaults(), params));
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            console.log(`<yellow>[start]</yellow> Starting a new carpenter server...`);
            if (finalParams.dev) {
                const vite = new __SVite({
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
            const app = __express();
            app.use(__bodyParser.json({ limit: '120mb' }));
            // proxy all non carpenter to the main vite server
            app.get(/^(?!\/carpenter).*/, __expressHttpProxy('http://0.0.0.0:3000'));
            let server;
            yield new Promise((_resolve) => {
                server = app.listen(finalParams.port, () => {
                    _resolve(null);
                });
            });
            console.log(`<green>[start]</green> Your carpenter server is available at:`);
            console.log(`<green>[start]</green> <cyan>http://127.0.0.1:${finalParams.port}</cyan>`);
            __onProcessExit(() => {
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
                res.send(__SSugarConfig.get('carpenter.scopes'));
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
                if (__fs.existsSync(potentialPreviewFilePath)) {
                    // expose a URL to access the preview
                    expressServer.get('/carpenter/api/specs/:specs/preview.png', (req, res) => __awaiter(this, void 0, void 0, function* () {
                        res.status(200);
                        res.type('image/png');
                        res.sendFile(potentialPreviewFilePath);
                    }));
                }
            }
            expressServer.get('/carpenter.css', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const cssFilePath = `${__packageRootDir(__dirname())}/dist/css/index.css`;
                res.sendFile(cssFilePath);
            }));
            expressServer.get('/carpenter.js', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const jsFilePath = `${__packageRootDir(__dirname())}/dist/js/index.esm.js`;
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
                    __carpenterNodesHandler({
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
                if (__fs.existsSync(`${__SSugarConfig.get('storage.src.nodesDir')}/${req.params.uid}.json`)) {
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
                    __carpenterPagesHandler({
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
                if (__fs.existsSync(`${__SSugarConfig.get('storage.src.pagesDir')}/${req.params.uid}.json`)) {
                    status.exists = true;
                }
                res.type('application/json');
                res.status(200);
                res.send(status);
            });
            // render a default node
            expressServer.get('/carpenter/:specs', (req, res) => {
                __carpenterViewHandler({
                    req,
                    res,
                    allSpecs,
                });
            });
        });
    }
}
export default SCarpenter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLGdDQUFnQyxNQUFNLDRDQUE0QyxDQUFDO0FBRTFGLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUV0QixPQUFPLFlBQVksTUFBTSxhQUFhLENBQUM7QUFFdkMsT0FBTyxrQkFBa0IsTUFBTSxvQkFBb0IsQ0FBQztBQUVwRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUU1RCxPQUFPLHVCQUF1QixNQUFNLGtDQUFrQyxDQUFDO0FBQ3ZFLE9BQU8sdUJBQXVCLE1BQU0sa0NBQWtDLENBQUM7QUFDdkUsT0FBTyxzQkFBc0IsTUFBTSxpQ0FBaUMsQ0FBQztBQTJDckUsTUFBTSxVQUFXLFNBQVEsUUFBUTtJQUM3Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXVDO1FBQy9DLEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLFlBQVk7YUFDbkI7U0FDSixFQUNELGNBQWMsQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLEVBQy9CLFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7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