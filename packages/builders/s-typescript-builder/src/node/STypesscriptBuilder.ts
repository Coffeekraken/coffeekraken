import type { ISBuilderCtorSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';
import __chokidar from 'chokidar';
import __fs from 'fs';
import __path from 'path';
import __ts from 'typescript';
import __STypescriptBuilderBuildParamsInterface from './interface/STypescriptBuilderBuildParamsInterface';

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
 * @feature             Different output folders using the `%format` and `%platform` token in the `outDir`
 * @feature             Watch capabilities to work live on your codebase
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

export interface ISTypescriptBuilderResult {
    glob: string[];
    inDir: string;
    outDir: string;
    formats: ('esm' | 'cjs')[];
    platform: 'node' | 'browser';
    files: ISTypescriptBuilderResultFile[];
}

export interface ISTypescriptBuilderBuildParams {
    glob: string[] | string;
    inDir: string;
    outDir: string;
    formats: ('esm' | 'cjs')[];
    platform: 'node' | 'browser';
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
            async ({ resolve, reject, emit, pipe }) => {
                let buildedFiles: ISTypescriptBuilderResultFile[] = [],
                    watchersReady: any[] = [],
                    buildPromises: Promise<any>[] = [];

                // @ts-ignore
                const finalParams: ISTypescriptBuilderBuildParams = __STypescriptBuilderBuildParamsInterface.apply(
                    params,
                );

                const formats = Array.isArray(finalParams.formats)
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
                            // generate all the requested formats
                            formats.forEach(async (format) => {
                                const pro = pipe(
                                    this._buildFile({
                                        cwd: finalParams.inDir,
                                        relPath,
                                        path: `${finalParams.inDir}/${relPath}`,
                                        format,
                                        platform: finalParams.platform,
                                        outDir: finalParams.outDir,
                                    }),
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
    ): Promise<ISTypescriptBuilderResultFile> {
        return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
            const packageRoot = __packageRoot();
            const module = file.format === 'cjs' ? 'commonjs' : 'es6';
            const outPath = __path.dirname(
                `${file.outDir}/${file.relPath}`
                    .replace('%format', file.format)
                    .replace('%platform', file.platform),
            );

            const packageJsonOutPath = `${packageRoot}/dist/pkg/${file.format}/package.json`;

            // output file
            let outFilePath = `${outPath}/${__path.basename(file.path)}`
                .replace('%format', file.format)
                .replace(/\.ts$/, '.js');

            const source = __fs.readFileSync(file.path).toString();

            const tsconfig =
                __SSugarConfig.get('typescriptBuilder.tsconfig') ?? {};

            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `Compiling "<cyan>${file.relPath}</cyan>" to <yellow>${
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

            if (result.outputText) {
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
            const packageJsonOutFolderPath = __path.dirname(packageJsonOutPath);
            if (!__fs.existsSync(packageJsonOutFolderPath)) {
                __fs.mkdirSync(packageJsonOutFolderPath, { recursive: true });
            }
            if (!__fs.existsSync(packageJsonOutPath)) {
                __fs.writeFileSync(
                    packageJsonOutPath,
                    JSON.stringify({
                        name: `@lostInTheDarkNight/${__uniqid()}`,
                        type: file.format === 'cjs' ? 'commonjs' : 'module',
                        private: true,
                    }),
                );
            }

            resolve({
                input: file,
                format: file.format,
                platform: file.platform,
                module: tsconfig.module ?? module,
                file: new __SFile(outFilePath),
            });
        });
    }
}
