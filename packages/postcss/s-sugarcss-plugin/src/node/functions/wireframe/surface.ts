import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          surface
 * @as          s.wireframe.surface
 * @namespace     node.function.wireframe
 * @type          PostcssFunction
 * @platform      postcss
 * @interface    ./surface
 * @status        alpha
 *
 * This function allows you to get a surface value for your wireframe depending on your theme config
 *
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.wireframe.surface
 *
 * @example       css
 * .my-element {
 *    background: s.wireframe.surface();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginWireframeSurfaceFunctionInterface extends __SInterface {
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
export { SSugarcssPluginWireframeSurfaceFunctionInterface as interface };

export interface ISSugarcssPluginWireframeSurfaceFunctionParams {
    variant: 'light' | 'dark';
}

export default function ({
    params,
}: {
    params: Partial<ISSugarcssPluginWireframeSurfaceFunctionParams>;
}) {
    const finalParams: ISSugarcssPluginWireframeSurfaceFunctionParams = {
        variant: 'light',
        ...params,
    };
    return __STheme.get(`wireframe.${finalParams.variant}.surface`);
}
