import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          borderColor
 * @namespace     node.function.wireframe
 * @type          PostcssFunction
 * @platform      postcss
 * @interface    ./borderColor
 * @status        beta
 *
 * This function allows you to get a borderColor value for your wireframe depending on your theme config
 *
 * @return      {Css}                   The corresponding css
 *
 * @snippet         sugar.wireframe.borderColor
 *
 * @example       css
 * .my-element {
 *    border: sugar.wireframe.borderColor();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginWireframeBorderFunctionInterface extends __SInterface {
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
export { postcssSugarPluginWireframeBorderFunctionInterface as interface };

export interface IPostcssSugarPluginWireframeBorderFunctionParams {
    variant: 'light' | 'dark';
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginWireframeBorderFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginWireframeBorderFunctionParams = {
        variant: 'light',
        ...params,
    };
    return __STheme.get(`wireframe.${finalParams.variant}.borderColor`);
}
