// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          depth
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

    // let intDepth = parseInt(finalParams.depth);
    // if (typeof finalParams.depth !== 'number' && finalParams.depth !== 'default') {
    //     return finalParams.depth;
    // } else {
    return __STheme.cssVar(`depth.${finalParams.depth}`, false);
    // }
}
