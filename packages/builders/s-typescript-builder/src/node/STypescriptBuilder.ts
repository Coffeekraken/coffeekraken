import type { ISBuilderSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import __SGlob from '@coffeekraken/s-glob';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __dirname, __getFiles } from '@coffeekraken/sugar/fs';
import { __deepMerge } from '@coffeekraken/sugar/object';
import {
    __packageCacheDir,
    __packageRootDir,
    __srcRootDir,
} from '@coffeekraken/sugar/path';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __currentModuleSystem from '@coffeekraken/sugar/shared/module/currentModuleSystem';
import __fs, { promises as __fsPromise } from 'fs';
import __path from 'path';
import __ts from 'typescript';

import * as __tsMorph from 'ts-morph';

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
    declarationFile: boolean;
    outDir: string;
}

export interface ISTypescriptBuilderResultFile {
    input: ISTypescriptBuilderFileToBuild;
    format: 'esm' | 'cjs';
    platform: 'node' | 'browser';
    declarationFiles: boolean;
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
    declarationFiles: boolean;
    watch: boolean;
    silent: boolean;
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

    _tsHost: any;

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
        return new Promise(async (resolve) => {
            if (path.match(/\.ts$/)) {
                const builder = new STypescriptBuilder(settings ?? {});

                let res;

                // @ts-ignore
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
                    silent: true,
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
        return new Promise(async (resolve) => {
            const {
                default: __STypescriptBuilderBuildParamsInterface,
                // @ts-ignore
            } = await import(
                `${__dirname()}/interface/STypescriptBuilderBuildParamsInterface`
            );

            const buildedFiles: ISTypescriptBuilderResultFile[] = [];

            // // @ts-ignore
            // const finalParams: ISTypescriptBuilderBuildParams =
            //     __monorepoToPackageAbsolutePathDeepMap(
            //         __STypescriptBuilderBuildParamsInterface.apply(params),
            //         params.packageRoot ?? process.cwd(),
            //     );
            const finalParams: ISTypescriptBuilderBuildParams =
                __STypescriptBuilderBuildParamsInterface.apply(params);

            // this can be overrided by customSettings bellow
            let formats = Array.isArray(finalParams.formats)
                ? finalParams.formats
                : [finalParams.formats];

            const globs = Array.isArray(finalParams.glob)
                ? finalParams.glob
                : [finalParams.glob];

            if (!finalParams.silent) {
                console.log(
                    `<yellow>○</yellow> Globs              : <yellow>${globs.join(
                        ',',
                    )}</yellow>`,
                );
                console.log(
                    `<yellow>○</yellow> Input directory   : <cyan>${finalParams.inDir.replace(
                        `${__packageRootDir()}/`,
                        '',
                    )}</cyan>`,
                );
                console.log(
                    `<yellow>○</yellow> Output directory  : <cyan>${finalParams.outDir.replace(
                        `${__packageRootDir()}/`,
                        '',
                    )}</cyan>`,
                );
                console.log(
                    `<yellow>○</yellow> Formats           : <yellow>${formats.join(
                        ',',
                    )}</yellow>`,
                );
                console.log(
                    `<yellow>○</yellow> Platform          : <yellow>${finalParams.platform}</yellow>`,
                );
                console.log(
                    `<yellow>○</yellow> Watch             : ${
                        finalParams.watch
                            ? `<green>true</green>`
                            : `<red>false</red>`
                    }`,
                );
                console.log(
                    `<yellow>○</yellow> Build initial     : ${
                        finalParams.buildInitial
                            ? `<green>true</green>`
                            : `<red>false</red>`
                    }`,
                );
            }

            // watch getFiles
            const filesPromise = __getFiles(globs, {
                cwd: finalParams.inDir,
                ignoreInitial: finalParams.watch && !finalParams.buildInitial,
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
                    declarationFiles: finalParams.declarationFiles,
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
                    // buildParams = __monorepoToPackageAbsolutePathDeepMap(
                    //     buildParams,
                    //     finalParams.packageRoot ?? process.cwd(),
                    // );

                    // generate all the requested formats

                    for (let i = 0; i < formats.length; i++) {
                        const format = formats[i];
                        const buildedFilePromise = this._buildFile(
                            __deepMerge(
                                {
                                    cwd: finalParams.inDir,
                                    relPath,
                                    path: filePath,
                                    format,
                                    silent: finalParams.silent,
                                    platform: finalParams.platform,
                                    declarationFile:
                                        finalParams.declarationFiles,
                                    outDir: finalParams.outDir,
                                },
                                buildParams,
                                {
                                    watch: false,
                                },
                            ),
                            finalParams,
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
        });
    }

    _tsProject;
    _createTsProgramIfNeeded(
        compilerOptions: __ts.CompilerOptions,
        packageRoot = process.cwd(),
    ): __tsMorph.Project {
        if (this._tsProject) {
            return this._tsProject;
        }
        const relSrcRootDir = __srcRootDir().replace(
                `${__packageRootDir()}/`,
                '',
            ),
            globs = [`${packageRoot}/${relSrcRootDir}/**/*.ts`];

        this._tsProject = new __tsMorph.Project({
            skipAddingFilesFromTsConfig: true,
            compilerOptions,
        });

        this._tsProject.addSourceFilesAtPaths(globs);

        return this._tsProject;
    }

    _buildDeclarationFile(
        filePath: string,
        outputFilePath: string,
        packageRoot = process.cwd(),
        silent: boolean = false,
    ): Promise<string> {
        return new Promise(async (resolve) => {
            const compilerOptions = {
                allowJs: true,
                declaration: true,
                emitDeclarationOnly: true,
                outDir: `${__packageCacheDir()}/s-typescript-builder`,
            };

            if (!silent) {
                console.verbose?.(
                    `<yellow>[d.ts]</yellow> Generating .d.ts file for "<cyan>${__path.relative(
                        __packageRootDir(),
                        outputFilePath,
                    )}</cyan>"`,
                );
            }

            const project = this._createTsProgramIfNeeded(
                compilerOptions,
                packageRoot,
            );
            const sourceFile = project.getSourceFile(filePath);

            // if (!sourceFile) {
            //     return resolve('');
            // }

            // update the file in memory with the one on the filesystem
            await sourceFile.refreshFromFileSystem();

            if (!sourceFile) {
                return resolve('');
            }

            const emitOutput = sourceFile.getEmitOutput(),
                outputFile = emitOutput.getOutputFiles()[0];

            if (!outputFile || !outputFile.getText) {
                return resolve('');
            }

            const text = outputFile
                .getText()
                .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');

            if (!silent) {
                console.verbose?.(
                    `<green>[d.ts]</green> .d.ts file generated <green>successfully</green> for "<cyan>${__path.relative(
                        __packageRootDir(),
                        outputFilePath,
                    )}</cyan>"`,
                );
            }
            resolve(text);
        });
    }

    _buildFile(
        file: ISTypescriptBuilderFileToBuild,
        params: ISTypescriptBuilderBuildParams,
    ): Promise<ISTypescriptBuilderResultFile> {
        return new Promise(async (resolve) => {
            const packageRoot = params.packageRoot;
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
            if (process.cwd() !== __packageRootDir(file.path)) {
                filePath = __path.relative(packageRoot, file.path);
            }

            if (!params.silent) {
                console.log(
                    `Compiling "<cyan>${filePath}</cyan>" to <yellow>${
                        file.format
                    }</yellow> format, <magenta>${
                        tsconfig.module ?? module
                    }</magenta> module system and <cyan>${
                        tsconfig.target ?? 'es6'
                    }</cyan> as target...`,
                );
            }

            let result = __ts.transpileModule(
                source,
                __deepMerge(tsconfig, {
                    compilerOptions: {
                        declaration: true,
                        lib:
                            tsconfig.lib ?? file.platform === 'node'
                                ? ['esnext']
                                : ['esnext', 'DOM'],
                        target: tsconfig.target ?? 'es6',
                        module: tsconfig.module ?? module,
                    },
                }),
            );

            // generating .d.ts file
            if (file.declarationFile && outFilePath.match(/\/dist\//)) {
                try {
                    __fs.unlinkSync(outFilePath.replace(/\.js$/, '.d.ts'));
                } catch (e) {}

                const declarationPromise = this._buildDeclarationFile(
                    file.path,
                    outFilePath.replace(/\.js$/, '.d.ts'),
                    params.packageRoot,
                    params.silent,
                );
                declarationPromise.then(async (declarationStr) => {
                    // prevent empty file
                    if (!declarationStr) {
                        return;
                    }

                    // try {
                    //     __fs.unlinkSync(outFilePath.replace(/\.js$/, '.d.ts'));
                    // } catch (e) {
                    //     console.log(e);
                    // }

                    // save declaration file if needed
                    __fs.writeFileSync(
                        outFilePath.replace(/\.js$/, '.d.ts'),
                        declarationStr,
                    );
                });
            }

            if (params.save && result.outputText) {
                // write the output file
                if (!__fs.existsSync(outPath)) {
                    __fs.mkdirSync(outPath, { recursive: true });
                }

                // save js file
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
                declarationFiles: file.declarationFile,
                module: tsconfig.module ?? module,
                js: result.outputText,
                file: params.save ? new __SFile(outFilePath) : undefined,
            });
        });
    }
}
