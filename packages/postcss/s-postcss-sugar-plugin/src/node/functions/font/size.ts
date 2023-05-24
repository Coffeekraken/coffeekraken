import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          size
 * @as              sugar.font.size
 * @namespace     node.function.font
 * @type          PostcssFunction
 * @platform      postcss
 * @interface     ./size
 * @status        beta
 *
 * This function allows you to get a border size value depending on your theme config
 *
 * @param       {Number}        size      The radius to get
 * @param       {Boolean}       [scalable='theme.scalable.font']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @snippet         sugar.font.size($1)
 *
 * @example       css
 * .my-element {
 *    font-size: sugar.font.size(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginFontSizeInterface extends __SInterface {
    static get _definition() {
        return {
            size: {
                type: 'String',
                required: true,
                alias: 's',
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.get('scalable.font'),
            },
        };
    }
}
export { postcssSugarPluginFontSizeInterface as interface };

export interface IPostcssSugarPluginFontSizeParams {
    size: string;
    scalable: boolean;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginFontSizeParams>;
}) {
    const finalParams: IPostcssSugarPluginFontSizeParams = {
        size: '',
        scalable: false,
        ...params,
    };

    let sizes = finalParams.size.split(' ').map((s) => {
        let registeredValue,
            factor = '';

        // try to get the padding with the pased
        try {
            registeredValue = __STheme.get(`font.size.${s}`);
        } catch (e) {}

        // default return simply his value
        if (s === 'default') {
            // @ts-ignore
            factor = '1';
        } else if (registeredValue !== undefined) {
            // direct value
            factor = `sugar.theme(font.size.${s}, ${finalParams.scalable})`;
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
                `<yellow>[s-postcss-sugar-plugin]</yellow> Font size "<cyan>${s}</cyan>" is not a valid value`,
            );
        }
        // generate css value
        return `calc(sugar.theme(font.size.default) * ${factor})`;
    });

    return sizes.join(' ');
}
