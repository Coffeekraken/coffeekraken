// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          theme
 * @as          sugar.theme
 * @namespace     node.function.theme
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./theme
 * @status        beta
 *
 * This function allows you to get a theme value using dot path like "font.family.fontFamily", etc...
 * Usually the best way to access theme config is to use dedicated functions/mixins like "sugar.margin", "sugar.font.family", etc...
 *
 * @param       {String}        dotPath      The dot path to the theme config value you want back
 * @param       {Boolean}       [scalable=false]        Specify if you want to value back to be scalable. Work only for number config as well
 * @param       {'var'|'value'}     [return='var']      Specify if you want to get back a variable or the value directly. Note that you need to make sure a variable is outputed in your css to use the 'var'.
 * @param       {Any}           [fallback=null]         Specify a fallback in case the variable does not resolve to any value
 * @return      {Css}                   The corresponding css
 *
 * @snippet         sugar.theme($1)
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
            return: {
                type: 'String',
                values: ['var', 'value'],
                default: 'var',
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
    return: 'var' | 'value';
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

    if (finalParams.return === 'var') {
        if (finalParams.scalable) {
            return `sugar.scalable(${__STheme.cssVar(
                finalParams.dotPath,
                finalParams.fallback,
            )})`;
        } else {
            return __STheme.cssVar(finalParams.dotPath, finalParams.fallback);
        }
    } else {
        if (finalParams.scalable) {
            return `sugar.scalable(${__STheme.get(finalParams.dotPath)})`;
        } else {
            return __STheme.get(finalParams.dotPath);
        }
    }
}
