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
                default: __STheme.current.get('scalable.font'),
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
        let size = s;

        // try to get the padding with the pased
        let val = __STheme.current.getSafe(`fontSize.${size}`);
        if (val !== undefined) {
            size = val;
        }

        if (
            isNaN(parseFloat(size)) &&
            size.match(/[a-zA-Z0-9]+\.[a-zA-Z0-9]+/) &&
            !size.match(/^s\./)
        ) {
            return `s.theme(${size}, ${finalParams.scalable})`;
        } else if (`${size}`.match(/[a-zA-Z]+$/)) {
            if (finalParams.scalable) {
                return `s.scalable(${size})`;
            }
            return `${size}`;
        } else {
            if (finalParams.scalable) {
                return `calc(s.scalable(${size}) * 1px)`;
            }
            return `${size}px`;
        }
    });

    return sizes.join(' ');
}
