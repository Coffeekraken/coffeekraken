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
import __SCarpenterStartParamsInterface from './interface/SCarpenterStartParamsInterface.js';
import { __clone } from '@coffeekraken/sugar/object';
import __fs from 'fs';
import __bodyParser from 'body-parser';
import __expressHttpProxy from 'express-http-proxy';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __carpenterNodesHandler from './handlers/carpenterNodesHandler.js';
import __carpenterPagesHandler from './handlers/carpenterPagesHandler.js';
import __carpenterViewHandler from './handlers/carpenterViewHandler.js';
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
            const allSpecsWithoutMetas = __clone(allSpecs, {
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
                res.send(__SSugarConfig.get('carpenter.scopes'));
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
                if (__fs.existsSync(potentialPreviewFilePath)) {
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
                        if (__fs.existsSync(potentialModelPreviewFilePath)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLGdDQUFnQyxNQUFNLCtDQUErQyxDQUFDO0FBRTdGLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVyRCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFFdEIsT0FBTyxZQUFZLE1BQU0sYUFBYSxDQUFDO0FBRXZDLE9BQU8sa0JBQWtCLE1BQU0sb0JBQW9CLENBQUM7QUFFcEQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFNUQsT0FBTyx1QkFBdUIsTUFBTSxxQ0FBcUMsQ0FBQztBQUMxRSxPQUFPLHVCQUF1QixNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sc0JBQXNCLE1BQU0sb0NBQW9DLENBQUM7QUEyQ3hFLE1BQU0sVUFBVyxTQUFRLFFBQVE7SUFDN0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF1QztRQUMvQyxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxZQUFZO2FBQ25CO1NBQ0osRUFDRCxjQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUMvQixRQUFR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