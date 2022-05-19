import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          margin
 * @namespace     node.function.margin
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./margin
 * @status        beta
 *
 * This function allows you to get a margin value depending on your theme config
 *
 * @param       {String}        margin      The margin to get
 * @param       {Boolean}       [scalable='theme.scalable.margin']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      margin-top: sugar.margin(20);
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
}: {
    params: Partial<IPostcssSugarPluginMarginFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginMarginFunctionParams = {
        margin: '',
        scalable: false,
        ...params,
    };

    const margin = finalParams.margin;
    let margins = margin.split(' ').map((s) => {
        let registeredValue,
            factor = '';

        // try to get the padding with the pased
        try {
            registeredValue = __STheme.get(`margin.${s}`);
        } catch (e) {}

        // default return simply his value
        if (s === 'default') {
            // @ts-ignore
            factor = '1';
        } else if (registeredValue !== undefined) {
            factor = `sugar.theme(margin.${s}, ${finalParams.scalable})`;
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
                `<yellow>[s-postcss-sugar-plugin]</yellow> Margin "<cyan>${s}</cyan>" is not a valid value`,
            );
        }
        // generate css value
        return `calc(sugar.theme(margin.default) * ${factor})`;
    });

    return margins.join(' ');
}
