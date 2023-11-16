// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          color
 * @as            s.color
 * @namespace     node.function.color
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./color
 * @status        stable
 *
 * This function allows you to get a color value depending on your theme config.
 *
 * @param       {String}        color      The color to get
 * @param       {String}        [shade=null]      The color shade to get
 * @param       {String}        [modifier=null]     A color modifier like "--alpha 0.3 --saturate 20", etc...
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.color($1)
 *
 * @example       css
 * .my-element {
 *    color: s.color(accent);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class shadeNameInterface extends __SInterface {
    static get _definition() {
        return {
            saturate: {
                type: 'Number|String',
                default: 0,
            },
            desaturate: {
                type: 'Number',
                default: 0,
            },
            darken: {
                type: 'Number',
                default: 0,
            },
            lighten: {
                type: 'Number',
                default: 0,
            },
            spin: {
                type: 'Number',
                default: 0,
            },
            alpha: {
                type: 'Number',
                default: 1,
            },
        };
    }
}

class SSugarcssPluginColorInterface extends __SInterface {
    static get _definition() {
        return {
            color: {
                type: 'String',
                alias: 'c',
                required: true,
            },
            shade: {
                type: 'String',
                alias: 'v',
            },
            modifier: {
                type: 'String',
                alias: 'm',
            },
        };
    }
}
export { SSugarcssPluginColorInterface as interface };

export interface ISSugarcssPluginColorParams {
    name: string;
    shade: string;
    modifier: string;
}

export default function color({
    params,
}: {
    params: Partial<ISSugarcssPluginColorParams>;
}) {
    const finalParams: ISSugarcssPluginColorParams = {
        color: '',
        shade: undefined,
        modifier: undefined,
        ...params,
    };

    return `${__STheme.current.resolveColor(
        finalParams.color,
        finalParams.shade,
        finalParams.modifier,
        {
            return: 'var',
        },
    )}`;
}
