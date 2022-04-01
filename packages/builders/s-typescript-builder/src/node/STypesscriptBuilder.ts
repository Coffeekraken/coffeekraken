import type { ISBuilderCtorSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __STypescriptBuilderBuildParamsInterface from './interface/STypescriptBuilderBuildParamsInterface';
import __chokidar from 'chokidar';

/**
 * @name                STypescriptBuilder
 * @namespace           node
 * @type                Class
 * @extends             SBuilder
 * @platform            node
 * @status              beta
 *
 * This class represent the postcss builder that you can use to build your postcss files
 * with a simple and efficient API.
 *
 * @feature            Support Sugar postcss plugin out of the boxs low as possible using PurgeCSS.
 *
 * @param           {ISTypescriptBuilderCtorSettings}          [settings={}]           Some settings to configure your builder instance
 *
 * @example         js
 * import STypescriptBuilder from '@coffeekraken/s-postcss-builder';
 * const builder = new STypescriptBuilder({
 *      typescriptBuilder: {
 *          // settings here...
 *      }
 * });
 * await builder.build({
 *      input: 'my-cool-file.css',
 *      output: 'my/cool/file-output.css'
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISTypescriptBuilderSettings {}

export interface ISTypescriptBuilderCtorSettings extends ISBuilderCtorSettings {
    typescriptBuilder: Partial<ISTypescriptBuilderSettings>;
}

export interface ISTypescriptBuilderResult {
    inputFile?: __SFile;
    outputFile?: __SFile;
    css: string;
    map: null;
}

export interface ISTypescriptBuilderBuildParams {
    glob: string[] | string;
    inDir: string;
    outDir: string;
    formats: ('esm' | 'cjs')[];
    watch: boolean;
    buildInitial: boolean;
    exclude: string[];
}

export default class STypescriptBuilder extends __SBuilder {
    /**
     * @name            typescriptBuilderSettings
     * @type            ISTypescriptBuilderSettings
     * @get
     *
     * Access the postcss builder settings
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get typescriptBuilderSettings(): ISTypescriptBuilderSettings {
        return (<any>this)._settings.typescriptBuilder;
    }

    /**
     * Store the chokidar watchers in an object where the key is the glob
     */
    _watchersByGlob: Record<string, any> = {};

    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISTypescriptBuilderCtorSettings>) {
        super(
            __deepMerge(
                {
                    typescriptBuilder: {
                        ...__SSugarConfig.get('typescriptBuilder'),
                    },
                },
                settings ?? {},
            ),
        );
    }

    /**
     * @name            _build
     * @type            Function
     * @async
     *
     * This method is the internal builder _build one.
     * It will be called by the SBuilder class with the final params
     * for the build
     *
     * @param       {Partial<ISTypescriptBuilderBuildParams>}          [params={}]         Some params for your build
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the build
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _build(
        params: ISTypescriptBuilderBuildParams,
    ): Promise<ISTypescriptBuilderResult> {
        return new __SPromise(
            async ({ resolve, reject, emit }) => {
                let finalCss;

                const finalParams: ISTypescriptBuilderBuildParams = __STypescriptBuilderBuildParamsInterface.apply(
                    params,
                );

                const res = '';

                const globs = Array.isArray(finalParams.glob)
                    ? finalParams.glob
                    : [finalParams.glob];

                // loop on each glob(s) and build the files
                globs.forEach((glob) => {
                    // listen for file update and add
                    const watcher = __chokidar.watch(glob, {
                        cwd: finalParams.inDir,
                        ignored: finalParams.exclude,
                        ignoreInitial:
                            finalParams.watch && !finalParams.buildInitial,
                    });
                    watcher.on('add', this._buildFile.bind(this));
                    watcher.on('change', this._buildFile.bind(this));

                    // store the watcher for later use
                    this._watchersByGlob[glob] = watcher;
                });

                resolve(res);
            },
            {
                metas: {
                    id: this.constructor.name,
                },
            },
        );
    }

    _buildFile(filePath: string) {
        console.log('build', filePath);
    }
}
