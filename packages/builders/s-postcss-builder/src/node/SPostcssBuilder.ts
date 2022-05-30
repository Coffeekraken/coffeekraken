import type { ISBuilderCtorSettings } from '@coffeekraken/s-builder';
import __SBuilder from '@coffeekraken/s-builder';
import __SDuration from '@coffeekraken/s-duration';
import __SFile from '@coffeekraken/s-file';
import __SGlob from '@coffeekraken/s-glob';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __resolvePackagePath from '@coffeekraken/sugar/node/esm/resolvePackagePath';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __packageJson from '@coffeekraken/sugar/node/package/jsonSync';
import __expandPleasantCssClassnames from '@coffeekraken/sugar/shared/html/expandPleasantCssClassnames';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __csso from 'csso';
import __fs from 'fs';
import __path from 'path';
import __postcss from 'postcss';
import { PurgeCSS } from 'purgecss';
import __SPostcssBuilderBuildParamsInterface from './interface/SPostcssBuilderBuildParamsInterface';
import __SPostcssBuilderSettingsInterface from './interface/SPostcssBuilderSettingsInterface';

/**
 * @name                SPostcssBuilder
 * @namespace           node
 * @type                Class
 * @extends             SBuilder
 * @platform            node
 * @status              beta
 *
 * This class represent the postcss builder that you can use to build your postcss files
 * with a simple and efficient API.
 *
 * @feature            Support Sugar postcss plugin out of the box
 * @feature            Support all postcss configurations
 * @feature            Allow minification of output
 * @feature            Threeshaking capabilities to compact your bundles as low as possible using PurgeCSS.
 * @feature            Support sugar "pleasant" css syntax in your views
 *
 * @param           {ISPostcssBuilderCtorSettings}          [settings={}]           Some settings to configure your builder instance
 *
 * @example         js
 * import SPostcssBuilder from '@coffeekraken/s-postcss-builder';
 * const builder = new SPostcssBuilder({
 *      postcssBuilder: {
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

export interface ISPostcssBuilderSettings {
    postcss: any;
    purgecss: any;
}

export interface ISPostcssBuilderCtorSettings extends ISBuilderCtorSettings {
    postcssBuilder: Partial<ISPostcssBuilderSettings>;
}

export interface ISPostcssBuilderResult {
    inputFile?: __SFile;
    outputFile?: __SFile;
    css: string;
    map: null;
}

export interface ISPostcssBuilderBuildParams {
    input: string;
    output: string;
    purge: boolean;
    minify: boolean;
    prod: boolean;
    saveDev: boolean;
}

export default class SPostcssBuilder extends __SBuilder {
    /**
     * @name            postcssBuilderSettings
     * @type            ISPostcssBuilderSettings
     * @get
     *
     * Access the postcss builder settings
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get postcssBuilderSettings(): ISPostcssBuilderSettings {
        return (<any>this).settings.postcssBuilder;
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
    constructor(settings?: Partial<ISPostcssBuilderCtorSettings>) {
        super(
            __deepMerge(
                {
                    // @ts-ignore
                    postcssBuilder: __SPostcssBuilderSettingsInterface.defaults(),
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
     * @param       {Partial<ISPostcssBuilderBuildParams>}          [params={}]         Some params for your build
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the build
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _build(
        params: ISPostcssBuilderBuildParams,
    ): Promise<ISPostcssBuilderResult> {
        return new __SPromise(
            async ({ resolve, reject, emit }) => {
                let finalCss;

                const defaultParams = <ISPostcssBuilderBuildParams>(
                    __SPostcssBuilderBuildParamsInterface.defaults()
                );

                // handle prod shortcut
                if (params.prod) {
                    params.minify = true;
                    params.purge = true;
                }

                // handle input
                let src = params.input,
                    from: any = undefined;
                try {
                    src = __fs.readFileSync(params.input, 'utf8').toString();
                    from = params.input;
                } catch (e) {}

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[build]</yellow> Starting Postcss Build`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Environment : ${
                        params.prod
                            ? '<green>production</green>'
                            : '<yellow>development</yellow>'
                    }`,
                });
                if (params.output) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Output      : <cyan>${__path.relative(
                            process.cwd(),
                            params.output,
                        )}</cyan>`,
                    });
                }
                if (params.saveDev && params.output) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>○</yellow> Output dev  : <cyan>${__path.relative(
                            process.cwd(),
                            params.output.replace(/\.css/, '.dev.css'),
                        )}</cyan>`,
                    });
                }
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Minify      : ${
                        params.minify
                            ? '<green>true</green>'
                            : '<red>false</red>'
                    }`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Purge       : ${
                        params.purge
                            ? '<green>true</green>'
                            : '<red>false</red>'
                    }`,
                });
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>○</yellow> Plugins     :`,
                });
                this.postcssBuilderSettings.postcss.plugins.forEach(
                    (pluginName) => {
                        emit('log', {
                            type: __SLog.TYPE_INFO,
                            value: `<yellow>|------------</yellow> : ${pluginName}`,
                        });
                    },
                );

                // resolve plugins paths
                const plugins: any[] = [];
                for (
                    let i = 0;
                    i < this.postcssBuilderSettings.postcss.plugins.length;
                    i++
                ) {
                    const p = this.postcssBuilderSettings.postcss.plugins[i];
                    if (typeof p === 'string') {
                        const { default: plugin } = await import(p);
                        const fn = plugin.default ?? plugin;
                        const options =
                            this.postcssBuilderSettings.postcss.pluginsOptions[
                                p
                            ] ?? {};
                        plugins.push(
                            fn({
                                target: params.prod ? 'prod' : 'dev',
                                ...options,
                            }),
                        );
                    } else {
                        plugins.push(p);
                    }
                }

                const compileDuration = new __SDuration();
                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<yellow>[postcss]</yellow> Compiling css...`,
                });

                // build postcss
                let result;
                try {
                    result = await __postcss(plugins).process(src ?? '', {
                        from,
                    });
                } catch (e) {
                    emit('log', {
                        type: __SLog.TYPE_ERROR,
                        value: e.toString();
                    });
                    throw e;
                }
                if (!result.css) {
                    throw new Error(
                        `<red>[${this.constructor.name}.build]</red> Something went wrong...`,
                    );
                }

                emit('log', {
                    type: __SLog.TYPE_INFO,
                    value: `<green>[postcss]</green> Compiling dev css finished <green>successfully</green> in <yellow>${
                        compileDuration.end().formatedDuration
                    }</yellow>`,
                });

                finalCss = result.css;

                // saveDev
                if (params.saveDev && params.output) {
                    __writeFileSync(
                        params.output.replace(/\.css$/, '.dev.css'),
                        finalCss,
                    );
                    const file = new __SFile(
                        params.output.replace(/\.css$/, '.dev.css'),
                    );
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<green>[save]</green> Dev file "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                    });
                }

                const purgeDuration = new __SDuration();

                // purge if needed
                if (params.purge) {
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<green>[purge]</green> Purging unused css`,
                    });

                    const purgeCssSettings = {
                        ...this.postcssBuilderSettings.purgecss,
                        safelist: {
                            standard: [],
                            deep: [],
                            greedy: [],
                            keyframes: [],
                            variables: [],
                        },
                    };

                    // get content to use
                    const content: any[] = [];
                    const globs: string[] = [];

                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[purge]</yellow> Searching for "<cyan>.spec.js</cyan>" files to grab "<magenta>purgecss</magenta>" special configs`,
                    });

                    function mergePurgecssSettings(purgecss) {
                        if (!purgecss.safelist) return;

                        if (Array.isArray(purgecss.safelist)) {
                            purgeCssSettings.safelist.standard = [
                                ...purgeCssSettings.safelist.standard,
                                ...purgecss.safelist,
                            ];
                        } else {
                            if (Array.isArray(purgecss.safelist.standard)) {
                                purgeCssSettings.safelist.standard = [
                                    ...purgeCssSettings.safelist.standard,
                                    ...purgecss.safelist.standard,
                                ];
                            }
                            if (Array.isArray(purgecss.safelist.deep)) {
                                purgeCssSettings.safelist.deep = [
                                    ...purgeCssSettings.safelist.deep,
                                    ...purgecss.safelist.deep,
                                ];
                            }
                            if (Array.isArray(purgecss.safelist.greedy)) {
                                purgeCssSettings.safelist.greedy = [
                                    ...purgeCssSettings.safelist.greedy,
                                    ...purgecss.safelist.greedy,
                                ];
                            }
                            if (Array.isArray(purgecss.safelist.keyframes)) {
                                purgeCssSettings.safelist.keyframes = [
                                    ...purgeCssSettings.safelist.keyframes,
                                    ...purgecss.safelist.keyframes,
                                ];
                            }
                            if (Array.isArray(purgecss.safelist.variables)) {
                                purgeCssSettings.safelist.variables = [
                                    ...purgeCssSettings.safelist.variables,
                                    ...purgecss.safelist.variables,
                                ];
                            }
                        }
                    }

                    const packageJson = __packageJson();
                    if (packageJson.dependencies) {
                        for (let packageName of Object.keys(
                            packageJson.dependencies,
                        )) {
                            try {
                                const packagePath = __resolvePackagePath(
                                    packageName,
                                );
                                if (!packagePath) continue;
                                const specsFiles = __SGlob.resolve(
                                    `${packagePath}/**/*.spec.js`,
                                );
                                for (let file of specsFiles) {
                                    try {
                                        // @ts-ignore
                                        if (!__fs.existsSync(file.path))
                                            continue;
                                        // @ts-ignore
                                        const purgecss = (
                                            await import(file.path)
                                        ).purgecss;
                                        // merging
                                        mergePurgecssSettings(purgecss);
                                    } catch (e) {}
                                }
                            } catch (e) {}
                        }
                    }

                    const srcJsFiles = __SGlob.resolve(
                        `${__SSugarConfig.get(
                            'storage.src.jsDir',
                        )}/**/*.spec.js`,
                    );
                    for (let file of srcJsFiles) {
                        try {
                            // @ts-ignore
                            if (!__fs.existsSync(file.path)) continue;
                            // @ts-ignore
                            const purgecss = (await import(file.path)).purgecss;
                            // merging
                            mergePurgecssSettings(purgecss);
                        } catch (e) {}
                    }

                    this.postcssBuilderSettings.purgecss.content.forEach(
                        (contentObj) => {
                            if (typeof contentObj === 'string') {
                                globs.push(contentObj);
                            } else {
                                if (contentObj.raw) {
                                    contentObj.raw = __expandPleasantCssClassnames(
                                        contentObj.raw,
                                    );
                                }
                                content.push(contentObj);
                            }
                        },
                    );
                    const files = __SGlob.resolve(globs);
                    files.forEach((file) => {
                        content.push({
                            extension: file.extension,
                            raw: __expandPleasantCssClassnames(file.content),
                        });
                    });

                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[purge]</yellow> Purging final css...`,
                    });
                    const purgeCssResult = await new PurgeCSS().purge({
                        ...purgeCssSettings,
                        content,
                        css: [
                            {
                                raw: finalCss,
                            },
                        ],
                    });

                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<green>[purge]</green> Purging final css finished <green>successfully</green> in <yellow>${
                            purgeDuration.end().formatedDuration
                        }</yellow>`,
                    });
                    finalCss = purgeCssResult[0].css;
                }

                // minify
                if (params.minify) {
                    const minifyDuration = new __SDuration();
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<yellow>[minify]</yellow> Minifiying css...`,
                    });

                    finalCss = __csso.minify(finalCss, {
                        restructure: true,
                    }).css;

                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<green>[minify]</green> Minifiying final css finished <green>successfully</green> in <yellow>${
                            minifyDuration.end().formatedDuration
                        }</yellow>`,
                    });
                }

                if (params.output) {
                    __writeFileSync(params.output, finalCss);
                    const file = new __SFile(params.output);
                    emit('log', {
                        type: __SLog.TYPE_INFO,
                        value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                    });
                }

                const res: ISPostcssBuilderResult = {
                    outputFile: params.output
                        ? __SFile.new(params.output)
                        : undefined,
                    css: finalCss,
                    map: null,
                };

                if (from) res.inputFile = __SFile.new(from);

                resolve(res);
            },
            {
                metas: {
                    id: this.constructor.name,
                },
            },
        );
    }
}
