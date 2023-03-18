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
import __bodyParser from 'body-parser';
import __expressHttpProxy from 'express-http-proxy';
import { __packageRootDir } from '@coffeekraken/sugar/path';
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
     * This method allows you to load the specs specified in the config.carpenter.sources configuration
     *
     * @return        {Promise}                                     A promise resolved with the corresponding specs loaded
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    loadSpecs(settings) {
        const finalSettings = __deepMerge(this.settings, settings !== null && settings !== void 0 ? settings : {});
        return new Promise((resolve) => {
            const specsMap = {}, specsBySources = {};
            for (let [key, source] of Object.entries(finalSettings.sources)) {
                if (!specsBySources[key]) {
                    specsBySources[key] = Object.assign(Object.assign({}, source), { specs: {} });
                }
                const specsInstance = new __SSpecs();
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
            // load the specs files
            const specs = yield this.loadSpecs();
            // listen for requesting the global data like specs by sources, etc...
            app.get(`/carpenter.json`, (req, res) => __awaiter(this, void 0, void 0, function* () {
                res.type('application/json');
                res.send(specs);
            }));
            app.get('/carpenter/index.css', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const cssFilePath = `${__packageRootDir(__dirname())}/dist/css/index.css`;
                res.sendFile(cssFilePath);
            }));
            app.get('/carpenter/index.esm.js', (req, res) => __awaiter(this, void 0, void 0, function* () {
                const jsFilePath = `${__packageRootDir(__dirname())}/dist/js/index.esm.js`;
                res.sendFile(jsFilePath);
            }));
            app.get('/favicon.ico', (req, res) => {
                res.send(null);
            });
            ['get', 'post'].forEach((method) => {
                app[method]('/carpenter/:dotpath', (req, res) => {
                    __carpenterViewHandler({
                        req,
                        res,
                        specs,
                        params: finalParams,
                    });
                });
            });
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
}
export default SCarpenter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUNuRCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQzlELE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUNoQyxPQUFPLGdDQUFnQyxNQUFNLDRDQUE0QyxDQUFDO0FBRTFGLE9BQU8sWUFBWSxNQUFNLGFBQWEsQ0FBQztBQUV2QyxPQUFPLGtCQUFrQixNQUFNLG9CQUFvQixDQUFDO0FBRXBELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRTVELE9BQU8sc0JBQXNCLE1BQU0saUNBQWlDLENBQUM7QUFxRHJFLE1BQU0sVUFBVyxTQUFRLFFBQVE7SUFDN0I7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF1QztRQUMvQyxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxZQUFZO2FBQ25CO1NBQ0osRUFDRCxjQUFjLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxFQUMvQixRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQVMsQ0FBQyxRQUF1QztRQUM3QyxNQUFNLGFBQWEsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLGFBQVIsUUFBUSxj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