import type { ISBuilderSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import __SGlob from '@coffeekraken/s-glob';
import __SLog from '@coffeekraken/s-log';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __monorepoToPackageAbsolutePathDeepMap from '@coffeekraken/sugar/node/monorepo/monorepoToPackageAbsolutePathDeepMap';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __chokidar from 'chokidar';
import __fs from 'fs';
import __path from 'path';
import __ts from 'typescript';
// import __STypescriptBuilderSettingsInterface from './interface/STypescriptBuilderSettingsInterface';
// import __STypescriptBuilderBuildParamsInterface from './interface/STypescriptBuilderBuildParamsInterface';

/**
 * @name                STypescriptBuilder
 * @namespace           node
 * @type                Class
 * @extends             SBuilder
 * @platform            node
 * @status              beta
 *
 * This class represent the typescript builder that you can use to build your .ts|js files
 * with a simple and efficient API.
 *
 * @feature            Multiple formats (cjs,esm)
 * @feature             Different output folders using the `%moduleSystem` and `%platform` token in the `outDir`
 * @feature             Watch capabilities to work live on your codebase
 *
 * @param           {ISTypescriptBuilderSettings}          [settings={}]           Some settings to configure your builder instance
 *
 * @example         js
 * import STypescriptBuilder from '@coffeekraken/s-postcss-builder';
 * const builder = new STypescriptBuilder({
 *     // settings here...
 * });
 * await builder.build({
 *      input: 'my-cool-file.css',
 *      output: 'my/cool/file-output.css'
 * });
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISTypescriptBuilderSettings extends ISBuilderSettings {}

export interface ISTypescriptBuilderFileToBuild {
    cwd: string;
    relPath: string;
    path: string;
    format: 'esm' | 'cjs';
    platform: 'node' | 'browser';
    outDir: string;
}

export interface ISTypescriptBuilderResultFile {
    input: ISTypescriptBuilderFileToBuild;
    format: 'esm' | 'cjs';
    platform: 'node' | 'browser';
    module:
        | 'commonjs'
        | 'amd'
        | 'umd'
        | 'es6'
        | 'es2015'
        | 'es2020'
        | 'es2022'
        | 'esnext'
        | 'node12'
        | 'nodenext';
    file: __SFile;
}

export interface ISTypescriptBuildTemporaryResult {
    path: string;
    remove: Function;
}

export interface ISTypescriptBuilderResult {
    glob: string[];
    inDir: string;
    outDir: string;
    formats: ('esm' | 'cjs')[];
    platform: 'node' | 'browser';
    files: ISTypescriptBuilderResultFile[];
}

export interface ISTypescriptBuilderCustomSettingsItem {
    glob: string;
    settings: ISTypescriptBuilderBuildParams;
}

export interface ISTypescriptBuilderCustomSettings {
    [key: string]: ISTypescriptBuilderCustomSettingsItem;
}

export interface ISTypescriptBuilderBuildParams {
    glob: string[] | string;
    inDir: string;
    outDir: string;
    packageRoot?: string;
    formats: ('esm' | 'cjs')[];
    platform: 'node' | 'browser';
    watch: boolean;
    buildInitial: boolean;
    customSettings: ISTypescriptBuilderCustomSettings;
    exclude: string[];
    save: boolean;
}

export default class STypescriptBuilder extends __SBuilder {
    /**
     * Store the chokidar watchers in an object where the key is the glob
     */
    _watchersByGlob: Record<string, any> = {};

    /**
     * @name            buildTemporary
     * @type            Function
     * @async
     * @static
     *
     * This static method allows you to build a file for and remove it after calling the returned callback.
     * This is usefull to compile a typescript file like tests, execute your test and deleting the compiled file.
     *
     * @param       {String}            path        The file path to build
     * @param      {Partial<ISTypescriptBuilderSettings>}       [settings={}]           Some settings to configure your builder instance
     * @return     {Promise<ISTypescriptBuildTemporaryResult>}          The result of the build with the compiled file path AND the delete callback function
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static buildTemporary(
        path: string,
        params?: Partial<ISTypescriptBuilderBuildParams>,
        settings?: Partial<ISTypescriptBuilderSettings>,
    ): Promise<ISTypescriptBuildTemporaryResult> {
        return new Promise(async (resolve, reject) => {
            if (path.match(/\.ts$/)) {
                const builder = new STypescriptBuilder(settings ?? {});
                // @ts-ignore
                const res = await builder.build({
                    inDir: __path.dirname(path),
                    glob: __path.basename(path),
                    outDir: __path.dirname(path),
                    formats: ['esm'],
                    ...(params ?? {}),
                });
                resolve({
                    path: res.files[0].file.path,
                    remove() {
                        try {
                            __fs.unlinkSync(res.files[0].file.path);
                        } catch (e) {}
                    },
                });
            }
            resolve({
                path,
                remove() {},
            });
        });
    }

    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISTypescriptBuilderSettings>) {
        super(
            __deepMerge(
                {
                    // @ts-ignore
                    // @TODO        integrate the settings interface
                    // __STypescriptBuilderSettingsInterface.default(),
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
            async ({ resolve, reject, emit, pipe }) => {
                let buildedFiles: ISTypescriptBuilderResultFile[] = [],
                    watchersReady: any[] = [],
                    buildPromises: Promise<any>[] = [];

                const {
                    default: __STypescriptBuilderBuildParamsInterface,
                    // @ts-ignore
                } = await import(
                    `${__dirname()}/interface/STypescriptBuilderBuildParamsInterface`
                );

                // @ts-ignore
                const finalParams: ISTypescriptBuilderBuildParams = __monorepoToPackageAbsolutePathDeepMap(
                    __STypescriptBuilderBuildParamsInterface.apply(params),
                    params.packageRoot ?? process.cwd(),
                );

                // this can be overrided by customSettings bellow
                let formats = Array.isArray(finalParams.formats)
                    ? finalParams.formats
                    : [finalParams.formats];

                // function used only when the finalParams.watch is false
                // and keeping track on the watchers ready state.
                // when all the watchers are in ready state, this mean that the
                // buildPromises array is full of build promises and we can resolve
                // this process when they are all resolved
                function onWatcherReady(watcher: any) {
                    watchersReady.push(watcher);
                    if (watchersReady.length === finalParams.glob.length) {
                        // when all promises are resolved, resolve the promise
                        Promise.all(buildPromises).then(() => {
                            resolve(<ISTypescriptBuilderResult>{
                                glob: finalParams.glob,
                                inDir: finalParams.inDir,
                                outDir: finalParams.outDir,
                                formats,
                                platform: finalParams.platform,
                                files: buildedFiles,
                            });
                        });
                    }
                }

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

                    // keep track on the watchers ready state
                    // to know when we can watch for all the buildPromises
                    // state and resolve the process at them end...
                    if (!finalParams.watch) {
                        watcher.on('ready', () => {
                            onWatcherReady(watcher);
                        });
                    }

                    ['add', 'change'].forEach((listener) => {
                        watcher.on(listener, async (relPath) => {
                            // @TODO     Implement local file settings
                            // const localConfigFile = await __findUp(
                            //     'typescriptBuilder.config.js',
                            //     {
                            //         cwd: `${finalParams.inDir}/${__path.dirname(
                            //             relPath,
                            //         )}`,
                            //     },
                            // );

                            // let localConfig = {};
                            // if (localConfigFile?.length) {
                            //     localConfig = (
                            //         await import(localConfigFile[0].path)
                            //     ).default;
                            // }

                            let buildParams = Object.assign({}, finalParams);

                            for (let [id, customSettings] of Object.entries(
                                __SSugarConfig.get(
                                    'typescriptBuilder.customSettings',
                                ),
                            )) {
                                if (
                                    __SGlob.match(
                                        `${finalParams.inDir}/${relPath}`,
                                        customSettings.glob,
                                    )
                                ) {
                                    formats =
                                        customSettings.settings?.formats ??
                                        formats;
                                    buildParams = __deepMerge(
                                        buildParams,
                                        customSettings.settings ?? {},
                                    );
                                    break;
                                }
                            }

                            // "localize" the file paths to the current package root
                            buildParams = __monorepoToPackageAbsolutePathDeepMap(
                                buildParams,
                                finalParams.packageRoot ?? process.cwd(),
                            );

                            // generate all the requested formats
                            formats.forEach(async (format) => {
                                const pro = pipe(
                                    this._buildFile(
                                        __deepMerge(
                                            {
                                                cwd: finalParams.inDir,
                                                relPath,
                                                path: `${finalParams.inDir}/${relPath}`,
                                                format,
                                                platform: finalParams.platform,
                                                outDir: finalParams.outDir,
                                            },
                                            buildParams,
                                            {
                                                watch: false,
                                            },
                                        ),
                                        finalParams,
                                    ),
                                );
                                buildPromises.push(pro);
                                const fileResult = await pro;
                                buildedFiles.push(fileResult);
                            });
                        });
                    });

                    // store the watcher for later use
                    this._watchersByGlob[glob] = watcher;
                });
            },
            {
                metas: {
                    id: this.constructor.name,
                },
            },
        );
    }

    _buildFile(
        file: ISTypescriptBuilderFileToBuild,
        params: ISTypescriptBuilderBuildParams,
    ): Promise<ISTypescriptBuilderResultFile> {
        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            const packageRoot = __packageRoot();
            const module = file.format === 'cjs' ? 'commonjs' : 'es6';
            const outPath = __path.dirname(
                `${file.outDir}/${file.relPath}`
                    .replace('%moduleSystem', file.format)
                    .replace('%platform', file.platform),
            );

            const packageJsonOutPath = `${packageRoot}/dist/pkg/${file.format}/package.json`;

            // output file
            let outFilePath = `${outPath}/${__path.basename(file.path)}`
                .replace('%moduleSystem', file.format)
                .replace(/\.ts$/, '.js');

            const source = __fs.readFileSync(file.path).toString();

            const tsconfig =
                __SSugarConfig.get('typescriptBuilder.tsconfig') ?? {};

            let filePath = file.relPath;
            if (process.cwd() !== __packageRoot(file.path)) {
                filePath = __path.relative(packageRoot, file.path);
            }

            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `Compiling "<cyan>${filePath}</cyan>" to <yellow>${
                    file.format
                }</yellow> format, <magenta>${
                    tsconfig.module ?? module
                }</magenta> module system and <cyan>${
                    tsconfig.target ?? 'es6'
                }</cyan> as target...`,
            });

            let result = __ts.transpileModule(
                source,
                __deepMerge(tsconfig, {
                    compilerOptions: {
                        lib:
                            tsconfig.lib ?? file.platform === 'node'
                                ? ['esnext']
                                : ['esnext', 'DOM'],
                        target: tsconfig.target ?? 'es6',
                        module: tsconfig.module ?? module,
                    },
                }),
            );

            if (params.save && result.outputText) {
                // write the output file
                if (!__fs.existsSync(outPath)) {
                    __fs.mkdirSync(outPath, { recursive: true });
                }
                __fs.writeFileSync(outFilePath, result.outputText);

                // dirty hash to make the bin file(s) executable
                if (__path.basename(outFilePath) === 'sugar.cli.js') {
                    __fs.chmodSync(outFilePath, 0o755);
                }
            }

            // package.json
            if (params.save) {
                const packageJsonOutFolderPath = __path.dirname(
                    packageJsonOutPath,
                );
                if (!__fs.existsSync(packageJsonOutFolderPath)) {
                    __fs.mkdirSync(packageJsonOutFolderPath, {
                        recursive: true,
                    });
                }
                if (!__fs.existsSync(packageJsonOutPath)) {
                    __fs.writeFileSync(
                        packageJsonOutPath,
                        JSON.stringify({
                            name: `@coffeekraken/internal-${__uniqid()}-${
                                file.format === 'cjs' ? 'commonjs' : 'module'
                            }`,
                            type: file.format === 'cjs' ? 'commonjs' : 'module',
                            private: true,
                        }),
                    );
                }
            }

            resolve({
                input: file,
                format: file.format,
                platform: file.platform,
                module: tsconfig.module ?? module,
                js: result.outputText,
                file: params.save ? new __SFile(outFilePath) : undefined,
            });
        });
    }
}
