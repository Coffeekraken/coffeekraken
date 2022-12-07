// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          var
 * @namespace     node.function.theme
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./var
 * @status        beta
 *
 * This function allows you to get a theme value using dot path like "font.family.fontFamily", etc...
 * Usually the best way to access theme config is to use dedicated functions/mixins like "sugar.margin", "sugar.font.family", etc...
 * This function make the same as using the `sugar.theme` one with the parameter `return`set to "var"
 *
 * @param       {String}        dotPath      The dot path to the theme config value you want back
 * @param       {Boolean}       [scalable=false]        Specify if you want to value back to be scalable. Work only for number config as well
 * @param       {Any}           [fallback=null]         Specify a fallback in case the variable does not resolve to any value
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    font-family: sugar.theme(font.family.fontFamily);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginThemeInterface extends __SInterface {
    static get _definition() {
        return {
            dotPath: {
                type: 'String',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: false,
            },
            fallback: {
                type: 'Boolean',
                default: true,
            },
        };
    }
}
export { postcssSugarPluginThemeInterface as interface };

export interface IPostcssSugarPluginThemeParams {
    dotPath: string;
    scalable: boolean;
    fallback: boolean;
}

export default function theme({
    params,
}: {
    params: Partial<IPostcssSugarPluginThemeParams>;
}) {
    const finalParams: IPostcssSugarPluginThemeParams = {
        ...params,
    };

    if (finalParams.scalable) {
        return `sugar.scalable(${__STheme.cssVar(
            finalParams.dotPath,
            finalParams.fallback,
        )})`;
    } else {
        return __STheme.cssVar(finalParams.dotPath, finalParams.fallback);
    }
}
