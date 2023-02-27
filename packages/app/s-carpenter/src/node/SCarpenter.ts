import __SClass from '@coffeekraken/s-class';
import __SSpecs from '@coffeekraken/s-specs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __express from 'express';
import __fs from 'fs';
import __SCarpenterStartParamsInterface from './interface/SCarpenterStartParamsInterface';

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
}

export interface ISCarpenterSettingsSource {
    title: string;
    inDir: string;
    glob: string;
}

export interface ISCarpenterSettingsSources {
    [key: string]: Partial<ISCarpenterSettingsSource>;
}

export interface ISCarpenterSettings {
    sources: ISCarpenterSettingsSources;
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
     * This method allows you to load the specs specified in the config.carpenter.sources configuration
     *
     * @return        {Promise}                                     A promise resolved with the corresponding specs loaded
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    loadSpecs(settings?: Partial<ISCarpenterSettings>): Promise<any> {
        const finalSettings = __deepMerge(this.settings, settings ?? {});

        return new Promise((resolve) => {
            const specsMap = {},
                specsBySources = {};

            for (let [key, source] of Object.entries(finalSettings.sources)) {
                if (!specsBySources[key]) {
                    specsBySources[key] = {
                        // @ts-ignore
                        ...source,
                        specs: {},
                    };
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
    start(params: Partial<ISCarpenterStartParams>): Promise<any> {
        const finalParams = <ISCarpenterStartParams>(
            __deepMerge(__SCarpenterStartParamsInterface.defaults(), params)
        );

        return new Promise(async (resolve) => {
            console.log(
                `<yellow>[start]</yellow> Starting a new carpenter server...`,
            );

            const app: any = __express(),
                watchers = {};

            const { specsMap, specsBySources } = await this.loadSpecs();

            // listen for requesting the global data like specs by sources, etc...
            app.get(`/carpenter`, async (req, res) => {
                res.type('application/json');
                res.send({
                    specsMap,
                    specsBySources,
                });
            });

            app.get('/', async (req, res) => {
                // load html here to have updated html without reloading the server
                const html = __fs
                    .readFileSync(
                        `${__packageRootDir(__dirname())}/src/views/index.html`,
                    )
                    .toString();

                res.type('text/html');
                res.send(html);
            });
            app.get('/dist/css/index.css', async (req, res) => {
                const cssFilePath = `${__packageRootDir(
                    __dirname(),
                )}/dist/css/index.css`;
                res.sendFile(cssFilePath);
            });
            app.get('/dist/js/index.esm.js', async (req, res) => {
                const jsFilePath = `${__packageRootDir(
                    __dirname(),
                )}/dist/js/index.esm.js`;
                res.sendFile(jsFilePath);
            });

            let server;
            await new Promise((_resolve) => {
                server = app.listen(finalParams.port, () => {
                    _resolve();
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
                    `<red>[kill]</red> Gracefully killing the <cyan>mitosis server</cyan>...`,
                );
                return new Promise((resolve) => {
                    server.close(async () => {
                        // @ts-ignore
                        resolve();
                    });
                });
            });
        });
    }
}

export default SCarpenter;
