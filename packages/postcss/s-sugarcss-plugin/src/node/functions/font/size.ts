import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          size
 * @as              s.font.size
 * @namespace     node.function.font
 * @type          PostcssFunction
 * @platform      postcss
 * @interface     ./size
 * @status        stable
 *
 * This function allows you to get a border size value depending on your theme config
 *
 * @param       {Number}        size      The radius to get
 * @param       {Boolean}       [scalable='theme.scalable.font']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.font.size($1)
 *
 * @example       css
 * .my-element {
 *    font-size: s.font.size(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginFontSizeInterface extends __SInterface {
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
export { SSugarcssPluginFontSizeInterface as interface };

export interface ISSugarcssPluginFontSizeParams {
    size: string;
    scalable: boolean;
}

export default function ({
    params,
}: {
    params: Partial<ISSugarcssPluginFontSizeParams>;
}) {
    const finalParams: ISSugarcssPluginFontSizeParams = {
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
            factor = `s.theme(font.size.${s}, ${finalParams.scalable})`;
        } else if (
            isNaN(parseFloat(s)) &&
            s.match(/[a-zA-Z0-9]+\.[a-zA-Z0-9]+/)
        ) {
            // support dotPath
            factor = `s.theme(${s}, ${finalParams.scalable})`;
        } else if (!isNaN(parseFloat(s))) {
            // support simple number
            factor = `${s}`;
        } else {
            throw new Error(
                `<yellow>[s-postcss-sugar-plugin]</yellow> Font size "<cyan>${s}</cyan>" is not a valid value`,
            );
        }
        // generate css value
        return `calc(s.theme(font.size.default) * ${factor} * 1px)`;
    });

    return sizes.join(' ');
}
