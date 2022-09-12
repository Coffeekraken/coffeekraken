import type { ISBuilderSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import __SGlob from '@coffeekraken/s-glob';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __dirname, __getFiles } from '@coffeekraken/sugar/fs';
import { __monorepoToPackageAbsolutePathDeepMap } from '@coffeekraken/sugar/monorepo';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
import __currentModuleSystem from '@coffeekraken/sugar/shared/module/currentModuleSystem';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs, { promises as __fsPromise } from 'fs';
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
    js: string;
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
        settings: Partial<ISTypescriptBuilderSettings> = {},
    ): Promise<ISTypescriptBuildTemporaryResult> {
        return new Promise(async (resolve, reject) => {
            if (path.match(/\.ts$/)) {
                const builder = new STypescriptBuilder(settings ?? {});

                let res;

                function remove() {
                    try {
                        __fs.unlinkSync(res.files[0].file.path);
                    } catch (e) {}
                }

                // make sure the file does not stay when an error occured, etc...
                __onProcessExit(() => {
                    remove();
                });

                // @ts-ignore
                res = await builder.build({
                    inDir: __path.dirname(path),
                    glob: __path.basename(path),
                    outDir: __path.dirname(path),
                    formats: [__currentModuleSystem()],
                    buildInitial: true,
                    ...(params ?? {}),
                });

                resolve({
                    path: res.files[0]?.file.path,
                    remove,
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
                const {
                    default: __STypescriptBuilderBuildParamsInterface,
                    // @ts-ignore
                } = await import(
                    `${__dirname()}/interface/STypescriptBuilderBuildParamsInterface`
                );

                const buildedFiles: ISTypescriptBuilderResultFile[] = [];

                // @ts-ignore
                const finalParams: ISTypescriptBuilderBuildParams =
                    __monorepoToPackageAbsolutePathDeepMap(
                        __STypescriptBuilderBuildParamsInterface.apply(params),
                        params.packageRoot ?? process.cwd(),
                    );

                // this can be overrided by customSettings bellow
                let formats = Array.isArray(finalParams.formats)
                    ? finalParams.formats
                    : [finalParams.formats];

                const globs = Array.isArray(finalParams.glob)
                    ? finalParams.glob
                    : [finalParams.glob];

                if (!finalParams.silent) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Globs              : <yellow>${globs.join(
                            ',',
                        )}</yellow>`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Input directory   : <cyan>${finalParams.inDir}</cyan>`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Output directory  : <cyan>${finalParams.outDir}</cyan>`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Formats           : <yellow>${formats.join(
                            ',',
                        )}</yellow>`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Platform          : <yellow>${finalParams.platform}</yellow>`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Watch             : ${
                            finalParams.watch
                                ? `<green>true</green>`
                                : `<red>false</red>`
                        }`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Build initial     : ${
                            finalParams.buildInitial
                                ? `<green>true</green>`
                                : `<red>false</red>`
                        }`,
                    });
                }

                // watch using chokidar
                const filesPromise = __getFiles(globs, {
                    cwd: finalParams.inDir,
                    ignoreInitial:
                        finalParams.watch && !finalParams.buildInitial,
                    watch: finalParams.watch,
                });

                // handle no watch
                filesPromise.then(() => {
                    resolve({
                        glob: finalParams.glob,
                        inDir: finalParams.inDir,
                        outDir: finalParams.outDir,
                        format: finalParams.formats,
                        platform: finalParams.platform,
                        files: buildedFiles,
                    });
                });

                // save all the file paths that has just been savec by the formatter
                // to avoid process it over and over...
                const buildedStack: string[] = [];

                // listen for files change and add
                filesPromise.on(
                    'add,change',
                    async ({ file: filePath, resolve: resolveFile }) => {
                        // avoid to process in loop the same file saved over and over
                        const savedFileIdx = buildedStack.indexOf(filePath);
                        if (savedFileIdx !== -1) {
                            return;
                        }

                        const relPath = __path.relative(
                            finalParams.inDir,
                            filePath,
                        );

                        let buildParams = Object.assign({}, finalParams);

                        for (let [id, customSettings] of Object.entries(
                            __SSugarConfig.getSafe(
                                'typescriptBuilder.customSettings',
                            ) ?? {},
                        )) {
                            if (__SGlob.match(filePath, customSettings.glob)) {
                                formats =
                                    customSettings.settings?.formats ?? formats;
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

                        for (let i = 0; i < formats.length; i++) {
                            const format = formats[i];
                            const buildedFilePromise = pipe(
                                this._buildFile(
                                    __deepMerge(
                                        {
                                            cwd: finalParams.inDir,
                                            relPath,
                                            path: filePath,
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
                            const buildedFileRes = await buildedFilePromise;

                            if (!buildedFiles.includes(buildedFileRes)) {
                                buildedFiles.push(buildedFileRes);
                            }
                        }

                        // set the file as resolved
                        resolveFile();
                    },
                );
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

            // delete output file if exists and that a proper ts file exists also
            // if (__fs.existsSync(file.path) && __fs.existsSync(outFilePath)) {
            //     try {
            //         __fs.unlinkSync(outFilePath);
            //     } catch (e) {}
            // }

            const source = __fs.readFileSync(file.path).toString();

            const tsconfig =
                __SSugarConfig.getSafe('typescriptBuilder.tsconfig') ?? {};

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

                await __fsPromise.writeFile(outFilePath, result.outputText);

                // dirty hash to make the bin file(s) executable
                if (__path.basename(outFilePath) === 'sugar.cli.js') {
                    __fs.chmodSync(outFilePath, 0o755);
                }
            }

            // package.json
            if (params.save) {
                const packageJsonOutFolderPath =
                    __path.dirname(packageJsonOutPath);
                if (!__fs.existsSync(packageJsonOutFolderPath)) {
                    __fs.mkdirSync(packageJsonOutFolderPath, {
                        recursive: true,
                    });
                }
                if (!__fs.existsSync(packageJsonOutPath)) {
                    __fs.writeFileSync(
                        packageJsonOutPath,
                        JSON.stringify({
                            // avoid specifying a name to prevent yarn to yiel for ducplicate workspaces
                            // name: `@coffeekraken/internal-${__uniqid()}-${
                            //     file.format === 'cjs' ? 'commonjs' : 'module'
                            // }`,
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
