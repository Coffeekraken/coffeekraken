import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          padding
 * @as          s.padding
 * @namespace     node.function.padding
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./padding
 * @status        stable
 *
 * This function allows you to get a padding value depending on your theme config
 *
 * @param       {String}        padding      The padding to get
 * @param       {Boolean}       [scalable='theme.scalable.padding']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.padding($1)
 *
 * @example       css
 * .my-element {
 *      padding-top: s.padding(30);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginPaddingFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            padding: {
                type: 'String',
                values: Object.keys(__STheme.current.get('padding')),
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.current.get('scalable.padding'),
            },
        };
    }
}
export { SSugarcssPluginPaddingFunctionInterface as interface };

export interface ISSugarcssPluginPaddingFunctionParams {
    padding: string;
    scalable: boolean;
}

export default function ({
    params,
    themeValueProxy,
}: {
    params: Partial<ISSugarcssPluginPaddingFunctionParams>;
    themeValueProxy: Function;
}) {
    const finalParams: ISSugarcssPluginPaddingFunctionParams = {
        padding: '',
        scalable: true,
        ...params,
    };

    const padding = finalParams.padding;
    let paddings = `${padding}`.split(' ').map((s) => {
        let val;

        // theme value
        let size = themeValueProxy(s);

        // try to get the padding with the passed
        val = __STheme.current.getSafe(`padding.${size}`);
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

    return paddings.join(' ');
}
