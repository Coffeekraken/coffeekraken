import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          margin
 * @as          s.margin
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

class SSugarcssPluginMarginFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            margin: {
                type: 'String',
                values: Object.keys(__STheme.current.get('margin')),
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.current.get('scalable.margin'),
            },
        };
    }
}
export { SSugarcssPluginMarginFunctionInterface as interface };

export interface ISSugarcssPluginMarginFunctionParams {
    margin: string;
    scalable: boolean;
}

export default function ({
    params,
    themeValueProxy,
}: {
    params: Partial<ISSugarcssPluginMarginFunctionParams>;
    themeValueProxy: Function;
}) {
    const finalParams: ISSugarcssPluginPaddingFunctionParams = {
        margin: '',
        scalable: true,
        ...params,
    };

    const margin = finalParams.margin;
    let margins = `${margin}`.split(' ').map((s) => {
        let val;

        // theme value
        let size = themeValueProxy(s);

        // try to get the margin with the pased
        val = __STheme.current.getSafe(`margin.${size}`);
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

    return margins.join(' ');
}
