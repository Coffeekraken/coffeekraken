import __SBuilder, { ISBuilderCtorSettings } from '@coffeekraken/s-builder';
import __SFile from '@coffeekraken/s-file';
import __SGlob from '@coffeekraken/s-glob';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __expandPleasantCssClassnames from '@coffeekraken/sugar/shared/html/expandPleasantCssClassnames';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SLog from '@coffeekraken/s-log';
import __csso from 'csso';
import __path from 'path';
import __fs from 'fs';
import __SPostcssBuilderBuildParamsInterface from './interface/SPostcssBuilderBuildParamsInterface';
import __postcss from 'postcss';
import { PurgeCSS } from 'purgecss';

/**
 * @name                SPostcssBuilder
 * @namespace           node
 * @type                Class
 * @extends             SBuilder
 * @platform            node
 * @platform            ts
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get postcssBuilderSettings(): ISPostcssBuilderSettings {
        return (<any>this)._settings.postcssBuilder;
    }

    /**
     * @name            constructor
     * @type            Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings?: Partial<ISPostcssBuilderCtorSettings>) {
        super(
            __deepMerge(
                {
                    postcssBuilder: {
                        ...__SSugarConfig.get('postcssBuilder'),
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
     * @param       {Partial<ISPostcssBuilderBuildParams>}          [params={}]         Some params for your build
     * @return      {SPromise}                                                          An SPromise instance that need to be resolved at the end of the build
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _build(params: ISPostcssBuilderBuildParams): Promise<ISPostcssBuilderResult> {
        return new __SPromise(
            async ({ resolve, reject, emit }) => {
                let finalCss;

                const defaultParams = <ISPostcssBuilderBuildParams>__SPostcssBuilderBuildParamsInterface.defaults();

                // handle prod shortcut
                if (params.prod) {
                    params.minify = true;
                    params.purge = true;
                }

                // handle default output
                if (params.output && params.output === defaultParams.output) {
                    if (params.prod) {
                        params.output = params.output.replace(/\.css/, '.prod.css');
                    }
                }

                // handle input
                let src = params.input,
                    from: any = undefined;
                try {
                    src = __fs.readFileSync(params.input, 'utf8').toString();
                    from = params.input;
                } catch (e) {}

                emit('log', {
                    value: `<yellow>[build]</yellow> Starting Postcss Build`,
                });
                emit('log', {
                    value: `<yellow>○</yellow> Environment : ${
                        params.prod ? '<green>production</green>' : '<yellow>development</yellow>'
                    }`,
                });
                if (params.output) {
                    emit('log', {
                        value: `<yellow>○</yellow> Output      : <cyan>${__path.relative(
                            process.cwd(),
                            params.output,
                        )}</cyan>`,
                    });
                }
                emit('log', {
                    value: `<yellow>○</yellow> Minify      : ${
                        params.minify ? '<green>true</green>' : '<red>false</red>'
                    }`,
                });
                emit('log', {
                    value: `<yellow>○</yellow> Purge       : ${
                        params.purge ? '<green>true</green>' : '<red>false</red>'
                    }`,
                });
                emit('log', {
                    value: `<yellow>○</yellow> Plugins     :`,
                });
                this.postcssBuilderSettings.postcss.plugins.forEach((pluginName) => {
                    emit('log', {
                        value: `<yellow>|------------</yellow> : ${pluginName}`,
                    });
                });

                // resolve plugins paths
                const plugins: any[] = [];
                for (let i = 0; i < this.postcssBuilderSettings.postcss.plugins.length; i++) {
                    const p = this.postcssBuilderSettings.postcss.plugins[i];
                    if (typeof p === 'string') {
                        const { default: plugin } = await import(p);
                        const fn = plugin.default ?? plugin;
                        const options = this.postcssBuilderSettings.postcss.pluginsOptions[p] ?? {};
                        plugins.push(fn(options));
                    } else {
                        plugins.push(p);
                    }
                }

                // build postcss
                let result;
                result = await __postcss(plugins).process(src ?? '', {
                    from,
                });
                if (!result.css) {
                    throw new Error(`<red>[${this.constructor.name}.build]</red> Something went wrong...`);
                }

                finalCss = result.css;

                // purge if needed
                if (params.purge) {
                    emit('log', {
                        value: `<green>[build]</green> Purging unused css`,
                    });

                    // get content to use
                    const content: any[] = [];
                    const globs: string[] = [];

                    this.postcssBuilderSettings.purgecss.content.forEach((contentObj) => {
                        if (typeof contentObj === 'string') {
                            globs.push(contentObj);
                        } else {
                            if (contentObj.raw) {
                                contentObj.raw = __expandPleasantCssClassnames(contentObj.raw);
                            }
                            content.push(contentObj);
                        }
                    });
                    const files = __SGlob.resolve(globs);
                    files.forEach((file) => {
                        content.push({
                            extension: file.extension,
                            raw: __expandPleasantCssClassnames(file.content),
                        });
                    });

                    const purgeCssResult = await new PurgeCSS().purge({
                        ...this.postcssBuilderSettings.purgecss,
                        content,
                        css: [
                            {
                                raw: finalCss,
                            },
                        ],
                    });
                    finalCss = purgeCssResult[0].css;
                }

                // minify
                if (params.minify) {
                    emit('log', {
                        value: `<green>[build]</green> Minifying css`,
                    });
                    finalCss = __csso.minify(finalCss, {
                        restructure: true,
                    }).css;
                }

                if (params.output) {
                    __writeFileSync(params.output, finalCss);
                    const file = new __SFile(params.output);
                    emit('log', {
                        value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`,
                    });
                }

                const res: ISPostcssBuilderResult = {
                    outputFile: params.output ? __SFile.new(params.output) : undefined,
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
