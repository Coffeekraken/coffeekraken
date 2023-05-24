import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @__name            configToCss
 * @__namespace       node.mixin.utils
 * @__type            PostcssMixin
 * @__interface       ./configToCss
 * @__platform        css
 * @__status          wip
 *
 * This mixin allows you to pass a theme config dot path that point to an object
 * and to print out the result as css properties.
 *
 * @__feature         Support rhythmVertical property object
 * @__feature         Support camel case properties like borderRadius
 * @__feature         Support padding theme value as well as padding unit values
 * @__feature         Support margin theme value as well as margin unit values
 * @__feature         Support transition theme value as well as normal transition values
 * @__feature         Support depth theme value
 * @__feature         Support border radius theme value as well as normal border radius values
 * @__feature
 *
 * @__param           {String}            dotPath             The theme relative dot path to an object to output as css
 * @__return          {Css}                                   The generated css
 *
 * @__example         css
 * .my-cool-element {
 *      @sugar.utils.configToCss(ui.code);
 * }
 *
 * @__since           2.0.0
 * @__author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUtilsConfigToCssInterface extends __SInterface {
    static get _definition() {
        return {
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
        };
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
    const configObj = __STheme.get(params.dotPath);

    const vars: string[] = [
        __STheme.jsObjectToCssProperties(configObj, {
            exclude: finalParams.exclude,
            only: finalParams.only,
        }),
    ];

    return vars;
}
