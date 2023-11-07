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
                    ...Object.keys(__STheme.get('border.radius')),
                    'shape',
                ],
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
        s = themeValueProxy(s);

        // try to get the padding with the pased
        val = __STheme.getSafe(`border.radius.${s}`);

        if (val !== undefined) {
            s = val;
        }

        // default return simply his value
        if (s === 'shape') {
            return `var(--s-shape, s.theme(border.radius.default, ${finalParams.scalable}))`;
        } else if (`${s}`.match(/[a-zA-Z]+$/)) {
            // @ts-ignore
            if (finalParams.scalable) {
                return `s.scalable(${s})`;
            }
            return `${s}`;
        } else {
            return `calc(s.theme(border.radius.default, ${finalParams.scalable}) * ${s})`;
        }
    });

    return radiuses.join(' ');
}
