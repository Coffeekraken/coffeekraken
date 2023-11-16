import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          offsize
 * @as          s.offsize
 * @namespace     node.function.offsize
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./offsize
 * @status        beta
 *
 * This function allows you to get an offsize value depending on your theme config
 *
 * @param       {String}        offsize      The offsize to get
 * @param       {Boolean}       [scalable='theme.scalable.offsize']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.offsize($1)
 *
 * @example       css
 * .my-element {
 *      margin-top: s.offsize(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginOffsizeFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            offsize: {
                type: 'String',
                values: Object.keys(__STheme.current.get('offsize')),
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.current.get('scalable.offsize'),
            },
        };
    }
}
export { SSugarcssPluginOffsizeFunctionInterface as interface };

export interface ISSugarcssPluginOffsizeFunctionParams {
    offsize: string;
    scalable: boolean;
}

export default function ({
    params,
}: {
    params: Partial<ISSugarcssPluginOffsizeFunctionParams>;
}) {
    const finalParams: ISSugarcssPluginOffsizeFunctionParams = {
        offsize: '',
        scalable: false,
        ...params,
    };

    const offsize = finalParams.offsize;
    let offsizes = offsize.split(' ').map((s) => {
        let registeredValue,
            size = s;

        // try to get the padding with the pased
        let val = __STheme.current.getSafe(`offsize.${size}`);
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

    return offsizes.join(' ');
}
