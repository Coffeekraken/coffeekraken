import __SClass from '@coffeekraken/s-class';
import __SSpecs from '@coffeekraken/s-specs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SVite from '@coffeekraken/s-vite';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __express from 'express';
import __SCarpenterStartParamsInterface from './interface/SCarpenterStartParamsInterface';

import { __clone } from '@coffeekraken/sugar/object';

import __fs from 'fs';

import __bodyParser from 'body-parser';

import __expressHttpProxy from 'express-http-proxy';

import { __packageRootDir } from '@coffeekraken/sugar/path';

import __carpenterNodesHandler from './handlers/carpenterNodesHandler';
import __carpenterPagesHandler from './handlers/carpenterPagesHandler';
import __carpenterViewHandler from './handlers/carpenterViewHandler';

/**
 * @name                SCarpenter
 * @namespace           node
 * @type                Class
 * @extends             SPromise
 * @platform            js
 * @status              wip
 *
 * This class allows you to use the display your components library as well as your sections, etc... in a
 * nice and easy interface that let you customize the props of your components live
 *
 * @param           {Object}        [settings={}]           An object of settings to configure your SCarpenter instance:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __SCarpenter($1)
 * const carpenter = new __SCarpenter($1);
 * carpenter.start();
 *
 * @example             js
 * import SCarpenter from '@coffeekraken/s-carpenter';
 * const carpenter = new SCarpenter();
 * carpenter.start();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISCarpenterStartParams {
    port: number;
    vitePort: number;
    dev: boolean;
    env: 'development' | 'production';
}

export interface ISCarpenterSettings {
    namespaces: string[];
}

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
    constructor(settings?: Partial<ISCarpenterSettings>) {
        super(
            __deepMerge(
                {
                    metas: {
                        id: 'SCarpenter',
                    },
                },
                __SSugarConfig.get('carpenter'),
                settings || {},
            ),
        );
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
    loadSpecs(settings?: Partial<ISCarpenterSettings>): Promise<any> {
        const finalSettings = __deepMerge(this.settings, settings ?? {});

        return new Promise((resolve) => {
            const finalSpecs = {};

            const specsInstance = new __SSpecs({
                previewUrl({ path, specs, name }) {
                    return `/carpenter/api/specs/${specs}/${name}.preview.png`;
                },
            });
            const specsArray = specsInstance.list(
                finalSettings.namespaces ?? ['views'],
            );
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
    start(params: Partial<ISCarpenterStartParams>): Promise<any> {
        const finalParams = <ISCarpenterStartParams>(
            __deepMerge(__SCarpenterStartParamsInterface.defaults(), params)
        );

        return new Promise(async (resolve) => {
            console.log(
                `<yellow>[start]</yellow> Starting a new carpenter server...`,
            );

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
                await vite.start({
                    port: finalParams.vitePort,
                });
            }

            // init the express app
            const app: any = __express();
            app.use(__bodyParser.json({ limit: '120mb' }));

            // proxy all non carpenter to the main vite server
            app.get(
                /^(?!\/carpenter).*/,
                __expressHttpProxy('http://0.0.0.0:3000'),
            );

            let server;
            await new Promise((_resolve) => {
                server = app.listen(finalParams.port, () => {
                    _resolve(null);
                });
            });

            console.log(
                `<green>[start]</green> Your carpenter server is available at:`,
            );
            console.log(
                `<green>[start]</green> <cyan>http://127.0.0.1:${finalParams.port}</cyan>`,
            );

            __onProcessExit(() => {
                console.log(
                    `<red>[kill]</red> Gracefully killing the <cyan>Carpenter server</cyan>...`,
                );
                return new Promise((resolve) => {
                    setTimeout(() => {
                        console.warn(
                            `<yellow>[kill]</yellow> The server take times to shutdown. It will be killed.`,
                        );
                        process.kill(0);
                    }, 3000);
                    server.close(() => {
                        // @ts-ignore
                        resolve();
                    });
                });
            });
        });
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
    async initOnExpressServer(expressServer: any): Promise<void> {
        // load the specs files
        const allSpecs = await this.loadSpecs();
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
        expressServer.get('/carpenter/api/specs', async (req, res) => {
            res.type('application/json');
            res.send(allSpecsWithoutMetas ?? {});
        });

        // retrieve the available scopes
        expressServer.get('/carpenter/api/scopes', (req, res) => {
            res.status(200);
            res.type('application/json');
            res.send(__SSugarConfig.get('carpenter.scopes'));
        });

        // Retrieve a specific spec
        expressServer.get('/carpenter/api/specs/:specs', async (req, res) => {
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
            res.send(finalSpecs ?? {});
        });
        // add "preview" property in specs
        for (let [dotpath, specObj] of Object.entries(allSpecs)) {
            const potentialPreviewFilePath = `${specObj.metas.dir}/${specObj.metas.name}.preview.png`;
            if (__fs.existsSync(potentialPreviewFilePath)) {
                // expose a URL to access the preview
                expressServer.get(
                    `/carpenter/api/specs/:specs/${specObj.metas.name}.preview.png`,
                    async (req, res) => {
                        res.status(200);
                        res.type('image/png');
                        res.sendFile(potentialPreviewFilePath);
                    },
                );
            }

            // models preview
            if (specObj.models) {
                for (let [modelName, modelObj] of Object.entries(
                    specObj.models,
                )) {
                    const potentialModelPreviewFilePath = `${modelObj.metas.dir}/${modelObj.metas.name}.preview.png`;
                    if (__fs.existsSync(potentialModelPreviewFilePath)) {
                        // expose a URL to access the preview
                        expressServer.get(
                            `/carpenter/api/specs/:specs/${modelObj.metas.name}.preview.png`,
                            async (req, res) => {
                                res.status(200);
                                res.type('image/png');
                                res.sendFile(potentialModelPreviewFilePath);
                            },
                        );
                    }
                }
            }
        }

        expressServer.get('/carpenter.css', async (req, res) => {
            const cssFilePath = `${__packageRootDir(
                __dirname(),
            )}/dist/css/index.css`;
            res.sendFile(cssFilePath);
        });
        expressServer.get('/carpenter.js', async (req, res) => {
            const jsFilePath = `${__packageRootDir(
                __dirname(),
            )}/dist/js/index.esm.js`;
            res.sendFile(jsFilePath);
        });

        // nodes
        [
            'put', // update a node HTML
            'post', // save a node
            'delete', // delete a node
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
            if (
                __fs.existsSync(
                    `${__SSugarConfig.get('storage.src.nodesDir')}/${
                        req.params.uid
                    }.json`,
                )
            ) {
                status.exists = true;
            }
            res.type('application/json');
            res.status(200);
            res.send(status);
        });

        // pages
        [
            'put', // update a page HTML
            'post', // save/create a page
            'delete', // delete a page
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
            if (
                __fs.existsSync(
                    `${__SSugarConfig.get('storage.src.pagesDir')}/${
                        req.params.uid
                    }.json`,
                )
            ) {
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
    }
}

export default SCarpenter;
