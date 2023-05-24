// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          depth
 * @as            sugar.depth
 * @namespace     node.function.depth
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./depth
 * @status        beta
 *
 * This function allows you to get a depth (box-shadow) value depending on your theme config
 *
 * @param       {String}        depth      The depth to get
 * @return      {Css}                   The corresponding css
 *
 * @snippet         sugar.depth($1)
 *
 * @example       css
 * .my-element {
 *    box-shadow: sugar.depth(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginDepthFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            depth: {
                type: 'Number|String',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginDepthFunctionInterface as interface };

export interface IPostcssSugarPluginDepthFunctionParams {
    depth: string;
}

export default function depth({
    params,
}: {
    params: Partial<IPostcssSugarPluginDepthFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginDepthFunctionParams = {
        ...params,
    };

    // try to get the padding with the pased
    const val = __STheme.getSafe(`depth.${finalParams.depth}`);
    if (val !== undefined) {
        finalParams.depth = val;
    }

    // 0 - 20 - 100 - ...
    if (`${finalParams.depth}`.match(/^[0-9]+$/)) {
        return __STheme.cssVar(`depth.${finalParams.depth}`);
    }

    // dotPath
    if (
        typeof finalParams.depth === 'string' &&
        finalParams.depth.match(/^[a-zA-Z0-9\.]+$/)
    ) {
        return __STheme.cssVar(`depth.${__STheme.get(finalParams.depth)}`);
    }

    // passed string
    return finalParams.depth;
}
