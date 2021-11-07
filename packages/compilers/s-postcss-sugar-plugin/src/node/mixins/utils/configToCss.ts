import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name            configToCss
 * @namespace       node.mixins.utils
 * @type            PostcssMixin
 * @platform        css
 * @status          beta
 *
 * This mixin allows you to pass a theme config dot path that point to an object
 * and to print out the result as css properties.
 *
 * @feature         Support rhythmVertical property object
 * @feature         Support camel case properties like borderRadius
 * @feature         Support padding theme value as well as padding unit values
 * @feature         Support margin theme value as well as margin unit values
 * @feature         Support transition theme value as well as normal transition values
 * @feature         Support depth theme value
 * @feature         Support border radius theme value as well as normal border radius values
 * @feature
 *
 * @param           {String}            dotPath             The theme relative dot path to an object to output as css
 * @return          {Css}                                   The generated css
 *
 * @example         css
 * .my-cool-element {
 *      @sugar.utils.configToCss(ui.code);
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginUtilsConfigToCssInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                dotPath: {
                    type: 'String',
                    required: true,
                },
                exclude: {
                    type: 'Array<String>',
                },
                only: {
                    type: 'Array<String>',
                },
            })
        );
    }
}

export interface IPostcssSugarPluginConfigToCssParams {
    dotPath: string;
    exclude: string[];
    only: string[];
}

export { postcssSugarPluginUtilsConfigToCssInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginConfigToCssParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginConfigToCssParams = {
        dotPath: '',
        exclude: [],
        only: [],
        ...params,
    };

    // @ts-ignore
    const configObj = __STheme.config(params.dotPath);

    const vars: string[] = [
        __STheme.jsObjectToCssProperties(configObj, {
            exclude: finalParams.exclude,
            only: finalParams.only,
        }),
    ];

    return vars;
}
