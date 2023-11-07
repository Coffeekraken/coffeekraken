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
                values: Object.keys(__STheme.get('offsize')),
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.get('scalable.offsize'),
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
            factor = '';

        // try to get the padding with the pased
        try {
            registeredValue = __STheme.get(`offsize.${s}`);
        } catch (e) {}

        // default return simply his value
        if (s === 'default') {
            // @ts-ignore
            factor = '1';
        } else if (registeredValue !== undefined) {
            factor = `s.theme(offsize.${s}, ${finalParams.scalable})`;
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
                `<yellow>[s-postcss-sugar-plugin]</yellow> Offsize "<cyan>${s}</cyan>" is not a valid value`,
            );
        }
        // generate css value
        return `calc(s.theme(offsize.default) * ${factor})`;
    });

    return offsizes.join(' ');

    // const offsize = finalParams.offsize;
    // let offsizes = offsize.split(' ').map((s) => {
    //     // support dotPath
    //     if (s.match(/\./)) {
    //         s = `s.theme(${s}, ${finalParams.scalable})`;
    //     } else {
    //         s = `s.theme(offsize.${s}, ${finalParams.scalable})`;
    //     }
    //     // generate css value
    //     return `calc(s.theme(offsize.default) * ${s})`;
    // });

    // return offsizes.join(' ');
}
