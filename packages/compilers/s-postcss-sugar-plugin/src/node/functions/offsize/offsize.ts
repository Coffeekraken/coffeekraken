import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          offsize
 * @namespace     node.function.offsize
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get an offsize value depending on your theme config
 *
 * @param       {String}        margin      The margin to get
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      margin-top: sugar.offsize(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginOffsizeFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            offsize: {
                type: 'String',
                values: Object.keys(__STheme.config('offsize')),
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.config('scalable.offsize'),
            },
        };
    }
}
export { postcssSugarPluginOffsizeFunctionInterface as interface };

export interface IPostcssSugarPluginOffsizeFunctionParams {
    offsize: string;
    scalable: boolean;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginOffsizeFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginOffsizeFunctionParams = {
        offsize: '',
        scalable: false,
        ...params,
    };

    const offsize = finalParams.offsize;
    let offsizes = offsize.split(' ').map((s) => {
        if (s === `${parseInt(s)}`)
            return `sugar.theme(offsize.${s}, ${finalParams.scalable})`;
        return s;
    });

    return offsizes.join(' ');
}
