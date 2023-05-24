import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          background
 * @as          sugar.wireframe.background
 * @namespace     node.function.wireframe
 * @type          PostcssFunction
 * @platform      postcss
 * @interface    ./background
 * @status        beta
 *
 * This function allows you to get a background value for your wireframe depending on your theme config
 *
 * @return      {Css}                   The corresponding css
 *
 * @snippet         sugar.wireframe.background
 *
 * @example       css
 * .my-element {
 *    background: sugar.wireframe.background();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginWireframeBackgroundFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            variant: {
                type: 'String',
                values: ['light', 'dark'],
                default: 'light',
            },
        };
    }
}
export { postcssSugarPluginWireframeBackgroundFunctionInterface as interface };

export interface IPostcssSugarPluginWireframeBackgroundFunctionParams {
    variant: 'light' | 'dark';
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginWireframeBackgroundFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginWireframeBackgroundFunctionParams = {
        variant: 'light',
        ...params,
    };
    return __STheme.get(`wireframe.${finalParams.variant}.background`);
}
