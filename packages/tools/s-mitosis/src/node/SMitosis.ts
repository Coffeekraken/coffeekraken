import __SClass from '@coffeekraken/s-class';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __onProcessExit, __spawn } from '@coffeekraken/sugar/process';
import __chokidar from 'chokidar';
import __SMitosisBuildParamsInterface from './interface/SMitosisBuildParamsInterface';

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
 * @param           {Object}        [settings={}]           An object of settings to configure your docmap instance:
 * - filename (docmap.json) {String}: Specify the filename you want
 * - outputDir (packageRootDir()) {String}: Specify the directory where you want to save your docmap.json file when using the ```save``` method
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

                // pro.on('log', (data) => {
                //     console.log('data', data._logObj.value);
                // });
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
