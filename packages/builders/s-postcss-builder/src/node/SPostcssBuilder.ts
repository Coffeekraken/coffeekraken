import __SBuilder from '@coffeekraken/s-builder';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

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
            postcssBuilder: {}
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
     * @param       {ISPost}
     */

}