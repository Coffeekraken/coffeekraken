import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          width
 * @namespace     node.function.border
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get a border width value depending on your theme config
 *
 * @param       {String}        width      The width to get
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    border-width: sugar.border.width(50);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginBorderWidthFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            width: {
                type: 'String',
                values: Object.keys(__STheme.get('border.width')),
                default: 'default',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginBorderWidthFunctionInterface as interface };

export interface IPostcssSugarPluginBorderWidthFunctionParams {
    width: string;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginBorderWidthFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginBorderWidthFunctionParams = {
        width: '',
        ...params,
    };

    const width = finalParams.width;

    if (__STheme.get('border.width')[width] === undefined) return width;

    const widthes = width.split(' ').map((s) => {
        const width = __STheme.get(`border.width.${s}`);
        if (!width) return width;
        return `var(${`--s-theme-border-width-${s}`}) ${
            finalParams.width !== 'default' ? '!important' : ''
        }`;
    });

    return widthes.join(' ');
}
