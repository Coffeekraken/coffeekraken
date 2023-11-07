import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          background
 * @as          s.wireframe.background
 * @namespace     node.function.wireframe
 * @type          PostcssFunction
 * @platform      postcss
 * @interface    ./background
 * @status        alpha
 *
 * This function allows you to get a background value for your wireframe depending on your theme config
 *
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.wireframe.background
 *
 * @example       css
 * .my-element {
 *    background: s.wireframe.background();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginWireframeBackgroundFunctionInterface extends __SInterface {
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
export { SSugarcssPluginWireframeBackgroundFunctionInterface as interface };

export interface ISSugarcssPluginWireframeBackgroundFunctionParams {
    variant: 'light' | 'dark';
}

export default function ({
    params,
}: {
    params: Partial<ISSugarcssPluginWireframeBackgroundFunctionParams>;
}) {
    const finalParams: ISSugarcssPluginWireframeBackgroundFunctionParams = {
        variant: 'light',
        ...params,
    };
    return __STheme.get(`wireframe.${finalParams.variant}.background`);
}
