import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          padding
 * @namespace     node.function.padding
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./padding
 * @status        beta
 *
 * This function allows you to get a padding value depending on your theme config
 *
 * @param       {String}        padding      The padding to get
 * @param       {Boolean}       [scalable='theme.scalable.padding']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      padding-top: sugar.padding(30);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginPaddingFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            padding: {
                type: 'String',
                values: Object.keys(__STheme.get('padding')),
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.get('scalable.padding'),
            },
        };
    }
}
export { postcssSugarPluginPaddingFunctionInterface as interface };

export interface IPostcssSugarPluginPaddingFunctionParams {
    padding: string;
    scalable: boolean;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginPaddingFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginPaddingFunctionParams = {
        padding: '',
        scalable: true,
        ...params,
    };

    const padding = finalParams.padding;
    let paddings = padding.split(' ').map((s) => {
        let registeredValue,
            factor = '';

        // try to get the padding with the pased
        try {
            registeredValue = __STheme.get(`padding.${s}`);
        } catch (e) {}

        // default return simply his value
        if (s === 'default') {
            // @ts-ignore
            factor = '1';
        } else if (registeredValue !== undefined) {
            factor = `sugar.theme(padding.${s}, ${finalParams.scalable})`;
        } else if (
            isNaN(parseFloat(s)) &&
            s.match(/[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)
        ) {
            // support dotPath
            factor = `sugar.theme(${s}, ${finalParams.scalable})`;
        } else if (!isNaN(parseFloat(s))) {
            // support simple number
            factor = `${s}`;
        } else {
            throw new Error(
                `<yellow>[s-postcss-sugar-plugin]</yellow> Padding "<cyan>${s}</cyan>" is not a valid value`,
            );
        }
        // generate css value
        return `calc(sugar.theme(padding.default) * ${factor})`;
    });

    return paddings.join(' ');
}
