import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          margin
 * @as          sugar.margin
 * @namespace     node.function.margin
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./margin
 * @status        stable
 *
 * This function allows you to get a margin value depending on your theme config
 *
 * @param       {String}        margin      The margin to get
 * @param       {Boolean}       [scalable='theme.scalable.margin']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.margin($1)
 *
 * @example       css
 * .my-element {
 *      margin-top: s.margin(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginMarginFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            margin: {
                type: 'String',
                values: Object.keys(__STheme.get('margin')),
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.get('scalable.margin'),
            },
        };
    }
}
export { postcssSugarPluginMarginFunctionInterface as interface };

export interface IPostcssSugarPluginMarginFunctionParams {
    margin: string;
    scalable: boolean;
}

export default function ({
    params,
    themeValueProxy,
}: {
    params: Partial<IPostcssSugarPluginMarginFunctionParams>;
    themeValueProxy: Function;
}) {
    const finalParams: IPostcssSugarPluginPaddingFunctionParams = {
        margin: '',
        scalable: true,
        ...params,
    };

    const margin = finalParams.margin;
    let margins = `${margin}`.split(' ').map((s) => {
        let val;

        // theme value
        s = themeValueProxy(s);

        // try to get the margin with the pased
        val = __STheme.getSafe(`margin.${s}`);
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
            return `calc(s.theme(margin.default, ${finalParams.scalable}) * ${s})`;
        }
    });

    return margins.join(' ');
}
