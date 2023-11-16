import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          width
 * @as            s.border.width
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

class SSugarcssPluginBorderWidthFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            width: {
                type: 'String',
                values: Object.keys(__STheme.current.get('borderWidth')),
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
export { SSugarcssPluginBorderWidthFunctionInterface as interface };

export interface ISSugarcssPluginBorderWidthFunctionParams {
    width: string;
    scalable: boolean;
}

export default function ({
    params,
    themeValueProxy,
}: {
    params: Partial<ISSugarcssPluginBorderWidthFunctionParams>;
    themeValueProxy: Function;
}) {
    const finalParams: ISSugarcssPluginBorderWidthFunctionParams = {
        width: '',
        scalable: false,
        ...params,
    };

    const width = finalParams.width;

    const widthes = width.split(' ').map((s) => {
        let size = themeValueProxy(s);

        const val = __STheme.current.getSafe(`borderWidth.${s}`);
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

    return widthes.join(' ');
}
