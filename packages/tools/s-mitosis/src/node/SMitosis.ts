import __SClass from '@coffeekraken/s-class';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSpecs from '@coffeekraken/s-specs';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __SViewRenderer from '@coffeekraken/s-view-renderer';
import {
    __dirname,
    __ensureDirSync,
    __removeSync,
} from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __onProcessExit, __spawn } from '@coffeekraken/sugar/process';
import { __dashCase } from '@coffeekraken/sugar/string';
import __chokidar from 'chokidar';
import __express from 'express';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
import { createServer } from 'vite';
import __SMitosisBuildParamsInterface from './interface/SMitosisBuildParamsInterface';
import __SMitosisStartParamsInterface from './interface/SMitosisStartParamsInterface';

/**
 * @name                SMitosis
 * @namespace           node
 * @type                Class
 * @extends             SPromise
 * @status              wip
 *
 * This class allows you to use the AMAZING @builder.io/mitosis compiler on your project with additional features like
 * the possibility to watch your components changes and rebuild it automatically.
 *
 * @param           {Object}        [settings={}]           An object of settings to configure your SMitosis instance:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import SMitosis from '@coffeekraken/s-mitosis';
 * const mitosis = new SMitosis();
 * mitosis.build();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISMitosisBuildParams {
    watch: boolean;
}

export interface ISMitosisStartParams {
    port: number;
}

export interface ISMitosisSettings {}

class SMitosis extends __SClass {
    /**
     * @name    _mitosisConfig
     * @type    Object
     * @private
     *
     * Store the mitosis config
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _mitosisConfig: any;

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
    constructor(settings?: Partial<ISMitosisSettings>) {
        super(
            __deepMerge(
                {
                    metas: {
                        id: 'SMitosis',
                    },
                },
                settings || {},
            ),
        );

        // watch file
        // @ts-ignore
        if (!this.constructor.watcher) {
            // @ts-ignore
            this.constructor.watcher = __chokidar.watch(
                __SSugarConfig.get('docmap.read.input'),
            );
            // @ts-ignore
            this.constructor.watcher.on('change', () => {
                // @ts-ignore
                delete this.constructor._cachedDocmapJson.current;
            });
        }
    }

    /**
     * @name          start
     * @type          Function
     *
     * This method allows you to start a server in order to develop your mitosis component easily
     * with feature like multiple frameworks testing, auto compilation, etc...
     *
     * @param         {Partial<ISMitosisStartParams>}          params        The params to use to start your mitosis env
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params: Partial<ISMitosisStartParams>): Promise<any> {
        const finalParams = <ISMitosisStartParams>(
            __deepMerge(__SMitosisStartParamsInterface.defaults(), params)
        );
        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[start]</yellow> Starting a new mitosis server...`,
            });

            const app: any = __express();

            app.get('/', async (req, res) => {
                const viewRenderer = new __SViewRenderer({
                    rootDirs: [`${__packageRootDir(__dirname())}/src/views`],
                });

                const componentFiles = __glob.sync('src/js/build/**/*.*', {
                        cwd: __packageRootDir(),
                    }),
                    components: any[] = [];

                const componentInterfacePath = __glob.sync(
                    'dist/pkg/esm/js/interface/*.*',
                    {
                        cwd: __packageRootDir(),
                    },
                );

                let ComponentInterface,
                    componentSpecs = {};

                if (componentInterfacePath.length) {
                    const finalComponentInterfacePath = `../../../../${__path.relative(
                        __packageRootDir(__dirname()),
                        `${__packageRootDir()}/${componentInterfacePath[0]}`,
                    )}`;

                    // import the interface
                    ComponentInterface = (
                        await import(finalComponentInterfacePath)
                    ).default;

                    // convert interface to specs
                    componentSpecs = __SSpecs.fromInterface(ComponentInterface);
                }

                for (let i = 0; i < componentFiles.length; i++) {
                    const componentFilePath = componentFiles[i];
                    const target = componentFilePath.split('/')[3],
                        absoluteComponentFilePath = `${__packageRootDir()}/${componentFilePath}`,
                        name = __path
                            .basename(componentFilePath)
                            .replace(__path.extname(componentFilePath), '')
                            .replace(/Component$/, '');

                    components.push({
                        target,
                        name,
                        specs: componentSpecs,
                        tagName: __dashCase(name),
                        path: `/${componentFilePath}`,
                    });
                }

                const result = await viewRenderer.render('index', {
                    ...params,
                    components,
                });

                // const htmlFilePath = `${__packageRootDir(
                //     __dirname(),
                // )}/src/public/index.html`;
                res.type('text/html');
                res.send(result.value);
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
                server = app.listen(8082, () => {
                    _resolve();
                });
            });

            const viteServer = await createServer(
                __deepMerge(__SSugarConfig.get('mitosis.vite'), {
                    // any valid user config options, plus `mode` and `configFile`
                    configFile: false,
                    root: __packageRootDir(),
                    resolve: {
                        dedupe: ['react', 'react-dom'],
                        alias: {
                            // vue: 'vue/dist/vue.esm-bundler.js',
                        },
                    },
                    optimizeDeps: {
                        esbuildOptions: {
                            // mainFields: ['module', 'main'],
                            resolveExtensions: ['.js', '.ts'],
                        },
                    },
                    server: {
                        port: finalParams.port,
                    },
                }),
            );
            await viteServer.listen();

            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[start]</green> Your mitosis server is available at:`,
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
                        await viteServer.close();
                        // @ts-ignore
                        resolve();
                    });
                });
            });
        });
    }

    /**
     * @name          build
     * @type          Function
     *
     * This method allows you to specify one or more glob patterns to scan files for "@namespace" docblock tags
     * and extract all the necessary informations to build the docmap.json file
     *
     * @param         {Partial<ISMitosisBuildParams>}          params        The params to use to build your docmap
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    build(params: Partial<ISMitosisBuildParams>): Promise<any> {
        const finalParams = <ISMitosisBuildParams>(
            __deepMerge(__SMitosisBuildParamsInterface.defaults(), params)
        );
        return new __SPromise(
            async ({ resolve, reject, emit, pipe, on }) => {
                this._mitosisConfig = (
                    await import(`${__packageRootDir()}/mitosis.config.js`)
                ).default;

                // build first
                await pipe(this._build(finalParams));

                // watch
                if (finalParams.watch) {
                    const watcher = __chokidar.watch(
                        this._mitosisConfig.files,
                        {
                            cwd: __packageRootDir(),
                            ignoreInitial: true,
                        },
                    );
                    watcher.on('add', () => {
                        pipe(this._build(finalParams));
                    });
                    watcher.on('change', () => {
                        pipe(this._build(finalParams));
                    });
                    __onProcessExit(async () => {
                        await watcher.close();
                    });
                    on('cancel', () => {
                        watcher.close();
                    });
                }

                if (!finalParams.watch) {
                    resolve();
                }
            },
            {
                metas: {
                    id: this.constructor.name,
                },
            },
        );
    }

    _build(params: ISMitosisBuildParams): void {
        return new __SPromise(
            async ({ resolve, reject, emit }) => {
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Start building your component(s)`,
                });

                const pro = __spawn('npm exec mitosis build');

                pro.on('log', (data) => {
                    console.log(data._logObj.value);
                });
                await pro;

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[build]</green> Component(s) builded <green>successfully</green>!`,
                });

                if (params.watch) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[watch]</yellow> Watching for files changes...`,
                    });
                }

                const files = __glob.sync(`output/**/*.*`, {
                    cwd: __packageRootDir(),
                });

                files.forEach((filePath) => {
                    const absoluteFilePath = `${__packageRootDir()}/${filePath}`,
                        target = filePath.split('/')[1],
                        destFilePath = `${__packageRootDir()}/src/js/build/${target}/${__path.basename(
                            filePath,
                        )}`;

                    __ensureDirSync(
                        `${__packageRootDir()}/src/js/build/${target}`,
                    );
                    __fs.renameSync(absoluteFilePath, destFilePath);

                    let code = __fs.readFileSync(destFilePath).toString();
                    code = code.replace(/%packageRootDir\//gm, '../../../../');
                    __fs.writeFileSync(destFilePath, code);
                });
                __removeSync(`${__packageRootDir()}/output`);

                resolve();
            },
            {
                metas: {
                    id: this.constructor.name,
                },
            },
        );
    }
}

export default SMitosis;
