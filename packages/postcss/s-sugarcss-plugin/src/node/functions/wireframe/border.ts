import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          border
 * @as          s.wireframe.border
 * @namespace     node.function.wireframe
 * @type          PostcssFunction
 * @platform      postcss
 * @interface    ./border
 * @status        alpha
 *
 * This function allows you to get a border value for your wireframe depending on your theme config
 *
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.wireframe.border
 *
 * @example       css
 * .my-element {
 *    border: s.wireframe.border();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginWireframeBorderFunctionInterface extends __SInterface {
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
export { SSugarcssPluginWireframeBorderFunctionInterface as interface };

export interface ISSugarcssPluginWireframeBorderFunctionParams {
    variant: 'light' | 'dark';
}

export default function ({
    params,
}: {
    params: Partial<ISSugarcssPluginWireframeBorderFunctionParams>;
}) {
    const finalParams: ISSugarcssPluginWireframeBorderFunctionParams = {
        variant: 'light',
        ...params,
    };
    return __STheme.get(`wireframe.${finalParams.variant}.border`);
}
