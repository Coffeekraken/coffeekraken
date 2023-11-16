import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          radius
 * @as            s.border.radius
 * @namespace     node.function.border
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./radius
 * @status        beta
 *
 * This function allows you to get a border radius value depending on your theme config
 *
 * @param       {String}        radius      The radius to get
 * @param       {Boolean}       [scalable='theme.scalable.padding']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.border.radius($1)
 *
 * @example       css
 * .my-element {
 *    border-radius: s.border.radius(30);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginBorderRadiusFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            radius: {
                type: 'String',
                values: [
                    ...Object.keys(__STheme.current.get('borderRadius')),
                    'shape',
                ],
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
export { SSugarcssPluginBorderRadiusFunctionInterface as interface };

export interface ISSugarcssPluginBorderRadiusFunctionParams {
    radius: string;
    scalable: boolean;
}

export default function ({
    params,
    themeValueProxy,
}: {
    params: Partial<ISSugarcssPluginBorderRadiusFunctionParams>;
    themeValueProxy: Function;
}) {
    const finalParams: ISSugarcssPluginBorderRadiusFunctionParams = {
        radius: '',
        scalable: true,
        ...params,
    };

    let radiuses = finalParams.radius.split(' ').map((s) => {
        let val;

        // theme value
        let size = themeValueProxy(s);

        // try to get the padding with the pased
        val = __STheme.current.getSafe(`borderRadius.${s}`);
        if (val !== undefined) {
            size = val;
        }

        // default return simply his value
        if (size === 'shape') {
            return `var(--s-shape, s.theme(borderRadius.default, ${finalParams.scalable}))`;
        } else if (`${size}`.match(/[a-zA-Z]+$/)) {
            // @ts-ignore
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

    return radiuses.join(' ');
}
