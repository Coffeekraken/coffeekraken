import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          width
 * @as            sugar.border.width
 * @namespace     node.function.border
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./width
 * @status        beta
 *
 * This function allows you to get a border width value depending on your theme config
 *
 * @param       {String}        width      The width to get
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.border.width($1)
 *
 * @example       css
 * .my-element {
 *    border-width: s.border.width(50);
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
            scalable: {
                type: 'Boolean',
                default: false,
            },
        };
    }
}
export { postcssSugarPluginBorderWidthFunctionInterface as interface };

export interface IPostcssSugarPluginBorderWidthFunctionParams {
    width: string;
    scalable: boolean;
}

export default function ({
    params,
    themeValueProxy,
}: {
    params: Partial<IPostcssSugarPluginBorderWidthFunctionParams>;
    themeValueProxy: Function;
}) {
    const finalParams: IPostcssSugarPluginBorderWidthFunctionParams = {
        width: '',
        scalable: false,
        ...params,
    };

    const width = finalParams.width;

    const widthes = width.split(' ').map((s) => {
        s = themeValueProxy(s);

        const val = __STheme.getSafe(`border.width.${s}`);
        if (val !== undefined) {
            s = val;
        }

        // default return simply his value
        if (`${s}`.match(/[a-zA-Z]+$/)) {
            // @ts-ignore
            if (finalParams.scalable) {
                return `s.scalable(${s})`;
            }
            return `${s}`;
        } else {
            return `calc(s.theme(border.width.default, ${finalParams.scalable}) * ${s})`;
        }
    });

    return widthes.join(' ');
}
