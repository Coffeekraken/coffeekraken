import __SBuilder from '@coffeekraken/s-builder';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __postcss from 'postcss';
import __SFile from '@coffeekraken/s-file';
import __fs from 'fs';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';

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
 * @feature            Threeshaking capabilities to compact your bundles as low as possible
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

}

export interface ISPostcssBuilderCtorSettings {
    postcssBuilder: Partial<ISPostcssBuilderSettings>
}

export interface ISPostcssBuilderBuildParams {
    input: string;
    output: string;
    purge: boolean;
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
        super(__deepMerge({
            postcssBuilder: {
                ...__SSugarConfig.get('postcssBuilder')
            }
        }, settings ?? {}));
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
    _build(params?: Partial<ISPostcssBuilderBuildParams>): Promise<any> {
        return new __SPromise(async ({resolve, reject, emit}) => {

            let finalCss;

            // handle input
            let src = params.input,
                from = undefined;
            try {
                src = __fs.readFileSync(params.input, 'utf8').toString();
                from = params.input;
            } catch(e) {}

            // resolve plugins paths
            const plugins = this.postcssBuilderSettings.postcss.plugins.map((p) => {
                if (typeof p === 'string') {
                    const plugin = require(p);
                    const fn = plugin.default ?? plugin;
                    const options = this.postcssBuilderSettings.postcss.pluginsOptions[p] ?? {};
                    return fn(options);
                }
                return p;
            });

            // build postcss
            const result = __postcss(plugins).process(src, {
                from
            });
            if (!result.css) {
                throw new Error(`<red>[${this.constructor.name}.build]</red> Something went wrong...`);
            }

            finalCss = result.css;

            // purge if needed
            if (params.purge) {
                const purgeCssResult = await new PurgeCSS().purge({
                    ...this.postcssBuilderSettings.purgeCssOptions,
                    css: [{
                        raw: finalCss
                    }]
                });
                finalCss = purgeCssResult[0].css;
            }

            if (params.output) {
                __writeFileSync(params.output, finalCss);
                const file = new __SFile(params.output);
                emit('log', {
                    value: `<green>[save]</green> File "<yellow>${file.relPath}</yellow>" <yellow>${file.stats.kbytes}kb</yellow> saved <green>successfully</green>`
                });
            }

            resolve({
                css: finalCss,
                map: null
            });
        }, {
            metas: {
                id: this.constructor.name
            }
        });
    }

}