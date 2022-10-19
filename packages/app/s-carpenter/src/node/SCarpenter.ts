import __SClass from '@coffeekraken/s-class';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSpecs from '@coffeekraken/s-specs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import { __dirname } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __express from 'express';
import __SCarpenterStartParamsInterface from './interface/SCarpenterStartParamsInterface';

/**
 * @name                SCarpenter
 * @namespace           node
 * @type                Class
 * @extends             SPromise
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
     * @name          start
     * @type          Function
     *
     * This method allows you to start a server in order display your components library in a nice and coherent interface
     *
     * @param         {Partial<ISCarpenterStartParams>}          params        The params to use to start your mitosis env
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params: Partial<ISCarpenterStartParams>): Promise<any> {
        const finalParams = <ISCarpenterStartParams>(
            __deepMerge(__SCarpenterStartParamsInterface.defaults(), params)
        );

        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[start]</yellow> Starting a new carpenter server...`,
            });

            const viewRenderer = new __SViewRenderer({
                rootDirs: [`${__packageRootDir(__dirname())}/src/views`],
            });

            const app: any = __express(),
                watchers = {},
                specsBySources = {};

            for (let [key, source] of Object.entries(this.settings.sources)) {
                // watchers[key] = __chokidar.watch(source.glob, {
                //     cwd: source.inDir,
                //     ignoreInitial: false,
                // });
                // watchers[key].on('add', (newFileRelPath) => {
                //     const newFileAbsPath = `${source.inDir}/${newFileRelPath}`;
                //     const spec = new __SSpecs();
                //     console.log(newFileAbsPath);
                //     console.log(spec.read(newFileAbsPath));
                // });
                // watchers[key].on('change', (updatedFilePath) => {});

                if (!specsBySources[key]) {
                    specsBySources[key] = {
                        // @ts-ignore
                        ...source,
                        specs: [],
                    };
                }

                // console.log(key, source);

                const specs = new __SSpecs();
                const specsArray = specs.list(source.specsNamespaces);

                specsBySources[key].specs = [
                    ...specsBySources[key].specs,
                    specsArray,
                ];

                specsArray.forEach((spec) => {
                    // listen for request on that particular component
                    app.get(`/${spec.dotpath}`, async (req, res) => {
                        console.log(specsBySources);

                        const result = await viewRenderer.render('index', {});

                        res.type('text/html');
                        res.send(result.value);
                    });
                });
            }

            app.get('/', async (req, res) => {
                res.type('text/html');
                res.send('Hello');
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

            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[start]</green> Your carpenter server is available at:`,
            });
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[start]</green> <cyan>http://127.0.0.1:${finalParams.port}</cyan>`,
            });

            __onProcessExit(() => {
                emit('log', {
                    value: `<red>[kill]</red> Gracefully killing the <cyan>mitosis server</cyan>...`,
                });
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
