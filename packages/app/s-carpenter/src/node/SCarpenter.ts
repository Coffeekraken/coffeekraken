import __SClass from '@coffeekraken/s-class';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __glob from 'glob';
import __path from 'path';

export interface ISCarpenterSettings {}

export interface ISCarpenterStartParams {
    port: number;
}

class SCarpenter extends __SClass {
    /**
     * @name            constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISCarpenterSettings>) {
        super(__deepMerge({}, settings ?? {}));
    }

    /**
     * @name          start
     * @type          Function
     *
     * This method allows you to start a server in order to develop your mitosis component easily
     * with feature like multiple frameworks testing, auto compilation, etc...
     *
     * @param         {Partial<ISCarpenterStartParams>}          params        The params to use to start your mitosis env
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params: Partial<ISCarpenterStartParams>): Promise<any> {
        const finalParams = <ISCarpenterStartParams>(
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
}
export default SCarpenter;
