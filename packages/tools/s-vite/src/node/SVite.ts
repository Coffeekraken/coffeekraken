import __SClass from '@coffeekraken/s-class';
import __SDuration from '@coffeekraken/s-duration';
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __sRiotjsPluginPostcssPreprocessor from '@coffeekraken/s-riotjs-plugin-postcss-preprocessor';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __listNodeModulesPackages from '@coffeekraken/sugar/node/npm/utils/listNodeModulesPackages';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __path from 'path';
import __rollupAnalyzerPlugin from 'rollup-plugin-analyzer';
import { uglify as __uglifyPlugin } from 'rollup-plugin-uglify';
import { build as __viteBuild, createServer as __viteServer } from 'vite';
import __sInternalWatcherReloadVitePlugin from './plugins/internalWatcherReloadPlugin';
import __rewritesPlugin from './plugins/rewritesPlugin';
import __SViteStartParamsInterface from './interface/SViteStartParamsInterface';
import __kill from '@coffeekraken/sugar/node/process/kill';
import __isPortFree from '@coffeekraken/sugar/node/network/utils/isPortFree';
import __SViteBuildParamsInterface from './interface/SViteBuildParamsInterface';
import __SLog from '@coffeekraken/s-log';

export interface ISViteSettings {}
export interface ISViteCtorSettings {
    vite: Partial<ISViteSettings>;
}

export interface ISViteStartParams {}
export interface ISViteBuildParams {
    input: string;
    prod: boolean;
    noWrite: boolean;
    watch: boolean;
    verbose: boolean;
    target: string;
    format: ('es' | 'umd' | 'cjs' | 'iife')[];
    type: ('module' | 'modules' | 'lib' | 'bundle')[];
    chunks: boolean;
    bundle: boolean;
    lib: boolean;
    minify: boolean;
    analyze: boolean;
}

export default class SVite extends __SClass {
    static interfaces = {
        startParams: __SViteStartParamsInterface,
    };

    /**
     * @name            viteSettings
     * @type            ISViteSettings
     * @get
     *
     * Access the vite settings
     *
     * @since           2.0.09
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get viteSettings(): ISViteSettings {
        return (<any>this)._settings.vite;
    }

    /**
     * @name            constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings?: ISViteCtorSettings) {
        super(
            __deepMerge(
                {
                    vite: {},
                },
                settings ?? {},
            ),
        );

        // register some riotjs preprocessors
        __sRiotjsPluginPostcssPreprocessor(
            __SugarConfig.get('postcss.plugins'),
        );
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    start(params: ISViteStartParams) {
        return new __SPromise(
            async ({ resolve, reject, emit }) => {
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
                config.plugins = plugins;

                if (!(await __isPortFree(config.server.port))) {
                    emit('log', {
                        type: __SLog.TYPE_WARN,
                        value: `Port <yellow>${config.server.port}</yellow> already in use. Try to kill it before continue...`,
                    });
                    await __kill(`:${config.server.port}`);
                }

                const server = await __viteServer(config);
                let listen;
                try {
                    listen = await server.listen();
                } catch(e) {
                    console.log('ERRROR', e);
                }

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: [
                        `<yellow>Vite</yellow> server started <green>successfully</green>`,
                    ].join('\n'),
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: [
                        `<yellow>http://${listen.config.server.host}</yellow>:<cyan>${listen.config.server.port}</cyan>`,
                    ].join('\n'),
                });
                // emit('log', {
                //     type: __SLog.TYPE_SUMMARY,
                //     value: {
                //         status: 'success',
                //         value: `<yellow>http://${listen.config.server.host}</yellow>:<cyan>${listen.config.server.port}</cyan>`,
                //         collapse: true,
                //     },
                // });
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    build(params: ISViteBuildParams | String) {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                const viteConfig = __SugarConfig.get('vite');
                const duration = new __SDuration();

                const finalParams: ISViteBuildParams =
                    __SViteBuildParamsInterface.apply(params);

                // if (params.watch) {
                //   throw new Error('The watch feature is not implemented yet...');
                // }

                // object to store results of each "type"
                const results = {};

                // types shortcuts
                if (finalParams.lib && finalParams.type.indexOf('lib') === -1)
                    finalParams.type = ['lib'];
                if (
                    finalParams.bundle &&
                    finalParams.type.indexOf('bundle') === -1
                )
                    finalParams.type = ['bundle'];

                for (let i = 0; i < finalParams.type.length; i++) {
                    const buildType = finalParams.type[i];

                    const config: any = __deepMerge(viteConfig, {
                        logLevel: 'silent',
                        build: {
                            watch: finalParams.watch ? {} : false,
                            target: finalParams.target ?? 'modules',
                            write: false,
                            minify: finalParams.minify,
                            cssCodeSplit: false,
                            rollupOptions: {
                                input: finalParams.input,
                                plugins: [],
                                output: {
                                    compact: true,
                                    manualChunks(id) {
                                        return 'index';
                                    },
                                },
                            },
                        },
                    });

                    // shortcuts
                    if (finalParams.prod) {
                        finalParams.minify = true;
                    }

                    // library mode
                    if (buildType.toLowerCase() !== 'lib') {
                        delete config.build.lib;
                    }

                    // plugins
                    if (finalParams.minify) {
                        config.build.rollupOptions.plugins.push(
                            __uglifyPlugin(),
                        );
                    }
                    if (finalParams.analyze) {
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
                    if (finalParams.prod) {
                        config.mode = 'production';
                    }

                    // target
                    if (buildType.toLowerCase() === 'bundle') {
                        config.build.target = finalParams.target ?? 'es2015';
                    } else if (buildType.toLowerCase() === 'lib') {
                        config.build.target = finalParams.target ?? 'esnext';
                    } else if (buildType.toLowerCase() === 'module') {
                        config.build.target = finalParams.target ?? 'modules';
                    }

                    // external packages for library mode
                    if (buildType.toLowerCase() === 'lib') {
                        config.build.rollupOptions.external = [
                            ...(config.build.rollupOptions.external ?? []),
                            ...Object.keys(
                                __listNodeModulesPackages({ monorepo: true }),
                            ),
                            'vue',
                        ];
                    }

                    // automatic formats
                    let finalFormats = finalParams.format;
                    if (!finalParams.format.length) {
                        switch (buildType) {
                            case 'bundle':
                                finalFormats = ['iife'];
                                break;
                            case 'module':
                            case 'lib':
                                finalFormats = ['es'];
                                break;
                        }
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
                        outputsFilenames.push(
                            `${
                                buildType === 'bundle' ? 'index' : buildType
                            }.${format}.js`,
                        );
                    });

                    // // prod filename
                    // if (finalParams.prod) {
                    //     outputsFilenames = outputsFilenames.map((filename) => {
                    //         return filename.replace(/\.js$/, '.prod.js');
                    //     });
                    // }

                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[build]</yellow> Starting "<magenta>${buildType}</magenta>" build`,
                    });
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Environment : ${
                            finalParams.prod
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
                        value: `<yellow>○</yellow> Format(s)   : ${finalFormats.join(
                            ',',
                        )}`,
                    });

                    // set the outputs
                    config.build.rollupOptions.output = outputs;

                    // process to bundle
                    const res = await __viteBuild(config);

                    if (res.constructor?.name === 'WatchEmitter') {
                        // @ts-ignore
                        res.on('change', async () => {
                            emit('log', {
                                type: __SLog.TYPE_INFO,
                                value: `<yellow>[watch]</yellow> Update detected. Re-building...`,
                            });
                            await pipe(
                                this.build({
                                    ...params,
                                    watch: false,
                                    verbose: false,
                                }),
                            );
                            emit('log', {
                                type: __SLog.TYPE_INFO,
                                value: `<cyan>[watch]</cyan> Watching for changes...`,
                            });
                        });
                        await pipe(
                            this.build({
                                ...params,
                                watch: false,
                                verbose: false,
                            }),
                        );
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<cyan>[watch]</cyan> Watching for changes...`,
                        });
                        return;
                    }

                    // @TODO        check to replace this dirty fix
                    let outCode = res[0].output[0].code;
                    // var SCodeExample_vue_vue_type_style_index_0_scoped_true_lang
                    const cssVarMatches = outCode.match(
                        /var\s[a-zA-Z0-9-_]+type_style[a-zA-Z0-9-_]+/gm,
                    );
                    if (cssVarMatches) {
                        cssVarMatches.forEach((match) => {
                            const varName = match.replace(/var\s?/, '').trim();
                            const injectCode = `
                var $style = document.querySelector('style#${varName}');
                if (!$style) {
                  $style = document.createElement('style');
                  $style.setAttribute('id', '${varName}');
                  $style.type = 'text/css';
                  $style.appendChild(document.createTextNode(${varName}));
                  document.head.appendChild($style);
                }
              `;
                            outCode += injectCode;
                            res[0].output[0].code = outCode;
                        });
                    }

                    // stacking res inside the results object
                    results[buildType] = res;

                    // handle generated bundles
                    if (!finalParams.noWrite) {
                        // @ts-ignore
                        res.forEach((bundleObj, i) => {
                            const output = bundleObj.output[0];

                            const baseOutputConfig = outputs[i],
                                baseOutputFilenames = outputsFilenames[i];

                            __writeFileSync(
                                `${baseOutputConfig.dir}/${baseOutputFilenames}`,
                                output.code,
                            );

                            const file = new __SFile(
                                `${baseOutputConfig.dir}/${baseOutputFilenames}`,
                            );

                            emit('log', {
                                type: __SLog.TYPE_INFO,
                                value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                            });
                        });
                    }
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
}
