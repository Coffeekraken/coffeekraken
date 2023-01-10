import __SClass from '@coffeekraken/s-class';
import __SDuration from '@coffeekraken/s-duration';
import __SFile from '@coffeekraken/s-file';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import {
    __removeSync,
    __writeFileSync,
    __writeTmpFileSync,
} from '@coffeekraken/sugar/fs';
import { __isPortFree } from '@coffeekraken/sugar/network';
import __listNodeModulesPackages from '@coffeekraken/sugar/node/npm/listNodeModulesPackages';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __onProcessExit } from '@coffeekraken/sugar/process';
import __childProcess from 'child_process';
import __path from 'path';
import __rollupAnalyzerPlugin from 'rollup-plugin-analyzer';
import { uglify as __uglifyPlugin } from 'rollup-plugin-uglify';
import { build as __viteBuild, createServer as __viteServer } from 'vite';
import { compression as __compression2 } from 'vite-plugin-compression2';
import __SViteBuildParamsInterface from './interface/SViteBuildParamsInterface';
import __SViteStartParamsInterface from './interface/SViteStartParamsInterface';
import __SViteTestParamsInterface from './interface/SViteTestParamsInterface';
import __sInternalWatcherReloadVitePlugin from './plugins/internalWatcherReloadPlugin';
import __rewritesPlugin from './plugins/rewritesPlugin';

export interface ISViteSettings {}

export interface ISViteTestParams {
    dir: string;
    watch: boolean;
}
export interface ISViteStartParams {}
export interface ISViteBuildParams {
    input: string;
    prod: boolean;
    noWrite: boolean;
    watch: boolean;
    buildInitial: boolean;
    verbose: boolean;
    target: string;
    format: ('esm' | 'amd' | 'umd' | 'cjs' | 'iife')[];
    type: ('module' | 'modules' | 'lib' | 'bundle')[];
    chunks: boolean;
    bundle: boolean;
    lib: boolean;
    minify: boolean | 'esbuild' | 'terser';
    analyze: boolean;
}

export interface ISViteBuildResult {
    type: 'module' | 'modules' | 'lib' | 'bundle';
    format: 'esm' | 'amd' | 'umd' | 'cjs' | 'iife';
    files: ISViteBuildFileResult[];
}

export interface ISViteBuildFileResult {
    isEntry: boolean;
    format: 'esm' | 'amd' | 'umd' | 'cjs' | 'iife';
    fileName: string;
    outDir: string;
    code: string;
}

export interface ISViteBuildParamsInternal extends ISViteBuildParams {
    outputDir: string;
    outputAssetsDir: string;
    formats: string[];
}

export default class SVite extends __SClass {
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
    constructor(settings?: ISViteSettings) {
        super(__deepMerge({}, settings ?? {}));
    }

    /**
     * @name          start
     * @type          Function
     *
     * Start the vite service with the server and the compilers
     *
     * @param         {ISViteStartParams}         [params={}]             Some parameters to customize your process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    start(params: Partial<ISViteStartParams>) {
        return new __SPromise(
            async ({ resolve, reject, emit }) => {
                const finalParams = __SViteStartParamsInterface.apply(params);

                const config = {
                    configFile: false,
                    // logLevel: 'silent',
                    ...__SugarConfig.get('vite'),
                };

                if (!config.plugins) config.plugins = [];
                config.plugins.unshift(__rewritesPlugin(config.rewrites ?? []));
                config.plugins.unshift(__sInternalWatcherReloadVitePlugin());

                // resolve plugins paths
                const plugins: any[] = [];
                for (let i = 0; i < config.plugins.length; i++) {
                    const p = config.plugins[i];
                    if (typeof p === 'string') {
                        const { default: plug } = await import(p);
                        plugins.push(plug.default ?? plug);
                    } else {
                        plugins.push(p);
                    }
                }

                config.plugins.push(
                    __compression2({
                        include: /.*\.(css|js|jsx|ts|tsx)(\?.*)?/,
                    }),
                );

                config.plugins = plugins;

                if (!(await __isPortFree(config.server.port))) {
                    emit('log', {
                        type: __SLog.TYPE_ERROR,
                        value: `Port <yellow>${config.server.port}</yellow> already in use. Please make sure to make it free before retrying...`,
                    });
                    process.exit(1);
                }

                const server = await __viteServer(config);
                let listen;
                try {
                    listen = await server.listen();
                } catch (e) {
                    console.log('ERRROR', e);
                }

                __onProcessExit(async () => {
                    emit('log', {
                        value: `<red>[kill]</red> Gracefully killing the <cyan>vite server</cyan>...`,
                    });
                    await server.close();
                    return true;
                });

                // make sure it's the last emitted log for user convinience...
                setTimeout(() => {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: [
                            `<yellow>Vite</yellow> server started <green>successfully</green> and is available at:`,
                        ].join('\n'),
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: [
                            `<yellow>http://${config.server.host}</yellow>:<cyan>${config.server.port}</cyan>`,
                        ].join('\n'),
                    });
                }, 1000);
            },
            {
                metas: {
                    id: this.metas.id,
                },
            },
        );
    }

    /**
     * @name          build
     * @type          Function
     *
     * Build the assets
     *
     * @param         {ISViteStartParams}         [params={}]             Some parameters to customize your process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    rebuildTimeoutByPath = {};
    build(params: ISViteBuildParams | String) {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                const viteConfig = __SugarConfig.get('vite'),
                    outputDir = viteConfig.build.outDir,
                    outputAssetsDir = `${outputDir}/${viteConfig.build.assetsDir}`;
                let duration = new __SDuration();

                // clean previous build
                __removeSync(outputAssetsDir);

                // @ts-ignore
                const finalParams: ISViteBuildParams =
                    __SViteBuildParamsInterface.apply(params);

                // object to store results of each "type"
                const results = {};

                // types shortcuts
                if (finalParams.lib && finalParams.type.indexOf('lib') === -1)
                    finalParams.type = ['lib'];
                if (
                    finalParams.bundle &&
                    finalParams.type.indexOf('bundle') === -1
                ) {
                    finalParams.type = ['bundle'];
                }

                for (let i = 0; i < finalParams.type.length; i++) {
                    const buildType = finalParams.type[i];

                    let buildResult;

                    // @ts-ignore
                    const buildParams: ISViteBuildParamsInternal = __deepMerge(
                        Object.assign(finalParams),
                        {
                            outputDir,
                            outputAssetsDir,
                        },
                    );

                    // shortcuts
                    if (buildType === 'lib') {
                        buildParams.minify = 'esbuild';
                    }
                    if (buildParams.prod) {
                        buildParams.minify = 'esbuild';
                    }

                    // automatic formats
                    let finalFormats = buildParams.format;
                    if (!buildParams.format.length) {
                        switch (buildType) {
                            case 'bundle':
                                finalFormats = ['amd'];
                                break;
                            case 'module':
                            case 'lib':
                                finalFormats = ['esm'];
                                break;
                        }
                    }

                    // set the formats in buildParams
                    buildParams.formats = finalFormats;

                    const _this = this;
                    let isFirstGenerated; // track if the first build has been made using the "watch" param
                    const config: any = __deepMerge(viteConfig, {
                        logLevel: 'silent',
                        plugins: [
                            ...(viteConfig.plugins ?? []),
                            {
                                name: 's-vite-end-detection',
                                async generateBundle(bundle, chunks) {
                                    if (!buildParams.watch) {
                                        return;
                                    }

                                    const buildResult: ISViteBuildResult = {
                                        type: buildType,
                                        format: finalFormats[0],
                                        files: [],
                                    };

                                    for (let [key, chunkObj] of Object.entries(
                                        chunks,
                                    )) {
                                        buildResult.files.push({
                                            isEntry: chunkObj.isEntry,
                                            format: finalFormats[0],
                                            fileName: chunkObj.fileName,
                                            outDir: outputDir,
                                            code: chunkObj.code,
                                        });
                                    }

                                    // handle result
                                    await pipe(
                                        _this._handleBuildResult(
                                            buildResult,
                                            buildParams,
                                        ),
                                    );

                                    emit('log', {
                                        type: __SLog.TYPE_INFO,
                                        value: `<green>[success]</green> Build completed <green>successfully</green> in <yellow>${
                                            duration.end().formatedDuration
                                        }</yellow>`,
                                    });

                                    // display the watch message
                                    if (buildParams.watch) {
                                        emit('log', {
                                            type: __SLog.TYPE_INFO,
                                            value: `<cyan>[watch]</cyan> Watching for changes...`,
                                        });
                                    }
                                },
                            },
                        ],
                        build: {
                            watch: buildParams.watch
                                ? {
                                      chokidar: {
                                          usePolling: true, // use this to avoid building multiple time the same file when things like "prettier" format and save the file
                                          interval: 500,
                                      },
                                  }
                                : false,
                            target: buildParams.target ?? 'modules',
                            write: false,
                            minify: buildParams.minify,
                            terserOptions: {
                                ecma: 2016,
                                module: true,
                                toplevel: true,
                                compress: {
                                    arguments: true,
                                    booleans_as_integers: true,
                                    drop_console: true,
                                    keep_fargs: false,
                                    toplevel: true,
                                    ecma: 2016,
                                    hoist_funs: true,
                                    passes: 2,
                                    unsafe: true,
                                    unsafe_methods: true,
                                    unsafe_proto: true,
                                },
                                // format: {
                                //     comments: false,
                                // },
                                mangle: {
                                    toplevel: true,
                                    properties: {
                                        regex: /^_/,
                                    },
                                },
                                // toplevel: true,
                            },
                            cssCodeSplit: false,
                            rollupOptions: {
                                input: buildParams.input,
                                external: [],
                                plugins: [],
                                output: {},
                                onwarn(warning, warn) {
                                    const onwarnRes =
                                        viteConfig.build?.rollupOptions?.onwarn?.(
                                            warning,
                                            warn,
                                        );

                                    emit('log', {
                                        margin: {
                                            top: 1,
                                        },
                                        type: __SLog.TYPE_WARNING,
                                        value: `<yellow>[warn]</yellow> (<magenta>${warning.code}</magenta>) ${warning.message}`,
                                    });
                                    emit('log', {
                                        margin: {
                                            bottom: 1,
                                        },
                                        type: __SLog.TYPE_WARNING,
                                        value: `at <cyan>${warning.loc.file}</cyan>:<yellow>${warning.loc.column}:${warning.loc.line}</yellow>`,
                                    });
                                    return onwarnRes;
                                },
                            },
                        },
                        server: {},
                    });

                    // library mode
                    if (buildType.toLowerCase() !== 'lib') {
                        delete config.build.lib;
                    }

                    // plugins
                    if (buildParams.minify) {
                        config.build.rollupOptions.plugins.push(
                            __uglifyPlugin(),
                        );
                    }
                    if (buildParams.analyze) {
                        config.build.rollupOptions.plugins.push(
                            __rollupAnalyzerPlugin({
                                limit: 10,
                                summaryOnly: true,
                            }),
                        );
                    }

                    // plugins
                    if (!config.plugins) config.plugins = [];
                    config.plugins.unshift(
                        __rewritesPlugin(config.rewrites ?? []),
                    );

                    // resolve plugins paths
                    const plugins: any[] = [];
                    for (let i = 0; i < config.plugins.length; i++) {
                        const p = config.plugins[i];
                        if (typeof p === 'string') {
                            const { default: plug } = await import(p);
                            plugins.push(plug.default ?? plug);
                        } else {
                            plugins.push(p);
                        }
                    }
                    config.plugins = plugins;

                    // mode (production, development)
                    if (buildParams.prod) {
                        config.mode = 'production';
                    }

                    // target
                    if (buildType.toLowerCase() === 'bundle') {
                        config.build.target = buildParams.target ?? 'es2015';
                    } else if (buildType.toLowerCase() === 'lib') {
                        config.build.target = buildParams.target ?? 'esnext';
                    } else if (buildType.toLowerCase() === 'module') {
                        config.build.target = buildParams.target ?? 'modules';
                    }

                    // external packages for library mode
                    if (buildType.toLowerCase() === 'lib') {
                        config.build.rollupOptions.external = [
                            ...(config.build.rollupOptions.external ?? []),
                            ...Object.keys(
                                __listNodeModulesPackages({ monorepo: true }),
                            )
                                .filter((item) => {
                                    return !item.match(/^(\/|\.)/);
                                })
                                .map((item) => {
                                    return new RegExp(`^${item}`);
                                }),
                        ];
                    }

                    // setup outputs
                    const outputs: any[] = [];
                    let outputsFilenames: string[] = [];
                    finalFormats.forEach((format) => {
                        outputs.push(
                            __deepMerge({
                                dir: __path.resolve(viteConfig.build.outDir),
                                format,
                                ...(config.build.rollupOptions.output ?? {}),
                            }),
                        );
                        outputsFilenames.push(`index.${format}.js`);
                    });

                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[build]</yellow> Starting "<magenta>${buildType}</magenta>" build`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Target      : ${
                            buildParams.prod
                                ? '<green>production</green>'
                                : '<yellow>development</yellow>'
                        }`,
                    });
                    outputsFilenames.forEach((filename) => {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>○</yellow> Output      : <cyan>${__path.relative(
                                process.cwd(),
                                `${__path.resolve(
                                    viteConfig.build.outDir,
                                )}/${filename}`,
                            )}</cyan>`,
                        });
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Type        : ${buildType.toLowerCase()}`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Target      : ${config.build.target}`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Format      : ${finalFormats.join(
                            ',',
                        )}`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Minify      : ${
                            typeof buildParams.minify === 'string'
                                ? `<green>${buildParams.minify}</green>`
                                : buildParams.minify === false
                                ? '<red>false</red>'
                                : '<green>esbuild</green>'
                        }`,
                    });

                    // set the outputs
                    config.build.rollupOptions.output = outputs;

                    // process to bundle
                    buildResult = await __viteBuild(config);

                    // if the buildResult is a WatchEmitter instance,
                    // it means that the build has been launchec with the "watch" attribute
                    // and vite will returns something different that a normal build.
                    // Handle that here...
                    if (buildResult.constructor?.name === 'WatchEmitter') {
                        buildResult.on('change', () => {
                            duration = new __SDuration();
                        });

                        // stop here if the vite instance is set to watch mode
                        return;
                    }

                    const finalBuildResult: ISViteBuildResult = {
                        type: buildType,
                        format: finalFormats[0],
                        files: [],
                    };
                    for (let i = 0; i < buildResult[0].output?.length; i++) {
                        const output = buildResult[0].output[i];
                        finalBuildResult.files.push({
                            isEntry: output.isEntry ?? false,
                            format: finalFormats[0],
                            fileName: output.fileName,
                            outDir: outputDir,
                            code: output.code,
                        });
                    }

                    buildResult = await pipe(
                        this._handleBuildResult(finalBuildResult, buildParams),
                    );
                }

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[success]</green> Build completed <green>successfully</green> in <yellow>${
                        duration.end().formatedDuration
                    }</yellow>`,
                });

                resolve(results);
            },
            {
                metas: {
                    id: this.metas.id,
                },
            },
        );
    }

    _handleBuildResult(
        buildResult: ISViteBuildResult,
        buildParams: ISViteBuildParamsInternal,
    ): Promise<ISViteBuildResult> {
        return new __SPromise(
            async ({ resolve, reject, pipe, emit }) => {
                for (let i = 0; i < buildResult.files.length; i++) {
                    const buildFileResult: ISViteBuildFileResult =
                        buildResult.files[i];

                    //             const cssVarMatches = buildFileResult.code.match(
                    //                 /var\s[a-zA-Z0-9-_]+type_style[a-zA-Z0-9-_]+/gm,
                    //             );
                    //             if (cssVarMatches) {
                    //                 cssVarMatches.forEach((match) => {
                    //                     const varName = match.replace(/var\s?/, '').trim();
                    //                     const injectCode = `
                    //     var $style = document.querySelector('style#${varName}');
                    //     if (!$style) {
                    //     $style = document.createElement('style');
                    //     $style.setAttribute('id', '${varName}');
                    //     $style.type = 'text/css';
                    //     $style.appendChild(document.createTextNode(${varName}));
                    //     document.head.appendChild($style);
                    //     }
                    // `;

                    //                     buildFileResult.code += injectCode;
                    //                 });
                    //             }

                    // handle generated bundles
                    if (!buildParams.noWrite) {
                        // handle only js files
                        if (!buildFileResult.fileName.match(/\.js$/)) {
                            continue;
                        }

                        // rename the entry file with "index.%format.js"
                        if (buildFileResult.isEntry) {
                            buildFileResult.fileName = buildFileResult.fileName
                                .replace(
                                    /^index\./,
                                    `index.${buildFileResult.format}.`,
                                )
                                .replace(/\.[a-zA-Z0-9]+\.js/, '.js');
                        }

                        // write the file on the disk
                        __writeFileSync(
                            `${buildFileResult.outDir}/${buildFileResult.fileName}`,
                            buildFileResult.code,
                        );
                        const file = new __SFile(
                            `${buildFileResult.outDir}/${buildFileResult.fileName}`,
                        );
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                        });
                    }
                }
                resolve(buildResult);
            },
            {
                metas: {
                    id: 'SVite',
                },
            },
        );
    }

    /**
     * @name          test
     * @type          Function
     *
     * Launch the tests
     *
     * @param         {ISViteTestParams}         [params={}]             Some parameters to customize your process
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    test(params: ISViteTestParams | String) {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe, on }) => {
                const viteConfig = __SugarConfig.get('vite');
                const duration = new __SDuration();

                // @ts-ignore
                const finalParams: ISViteTestParams =
                    __SViteTestParamsInterface.apply(params);

                const finalConfig = __deepMerge(viteConfig, {
                    test: finalParams,
                });

                const configPath = __writeTmpFileSync(
                    `export default ${JSON.stringify(finalConfig)};`,
                    {
                        path: 'vite.config.js',
                    },
                );

                const command = `npx vitest --dir "${__path.relative(
                    __packageRootDir(),
                    finalParams.dir,
                )}" --config ${configPath} --root ${__packageRootDir()} --passWithNoTests --dom --globals ${
                    finalParams.watch ? '--watch --changed' : '--run'
                } --ui --open`;

                // run the test
                const pro = __childProcess.spawn(command, [], {
                    stdio: ['ignore', 1, 2],
                    shell: true,
                    detached: true,
                    cwd: __packageRootDir(),
                });
                pro.on('close', (e) => {
                    if (!finalParams.watch) {
                        resolve();
                    }
                });
                __onProcessExit(async () => {
                    pro.kill();
                    return true;
                });

                // cancel
                on('cancel', () => {
                    pro.kill?.();
                });

                if (!finalParams.watch) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<green>[success]</green> Tests completed <green>successfully</green> in <yellow>${
                            duration.end().formatedDuration
                        }</yellow>`,
                    });
                }
            },
            {
                metas: {
                    id: this.metas.id,
                },
            },
        );
    }
}
