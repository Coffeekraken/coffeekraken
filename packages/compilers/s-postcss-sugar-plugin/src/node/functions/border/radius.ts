import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          radius
 * @namespace     node.function.border
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get a border radius value depending on your theme config
 *
 * @param       {String}        radius      The radius to get
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    border-radius: sugar.border.radius(30);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginBorderRadiusFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            radius: {
                type: 'String',
                values: Object.keys(__STheme.config('border.radius')),
                default: 'default',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginBorderRadiusFunctionInterface as interface };

export interface IPostcssSugarPluginBorderRadiusFunctionParams {
    radius: string;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginBorderRadiusFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginBorderRadiusFunctionParams = {
        radius: '',
        ...params,
    };

    const radius = finalParams.radius;

    if (__STheme.config('border.radius')[radius] === undefined) return radius;

    const radiuses = radius.split(' ').map((s) => {
        return `var(${`--s-theme-border-radius-${s}`}) ${
            finalParams.radius !== 'default' ? '!important' : ''
        }`;
    });

    return radiuses.join(' ');
}
