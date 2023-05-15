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
            const specsInstance = new __SSpecs();
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
                    // add the "preview" property in the spec json
                    allSpecsWithoutMetas[dotpath].preview = `/carpenter/api/specs/${dotpath}/preview.png`;
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