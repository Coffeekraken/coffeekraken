import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          padding
 * @namespace     node.function.padding
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get a padding value depending on your theme config
 *
 * @param       {String}        padding      The padding to get
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      padding-top: sugar.padding(30);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginPaddingFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            padding: {
                type: 'String',
                values: Object.keys(__STheme.config('padding')),
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.config('scalable.padding'),
            },
        };
    }
}
export { postcssSugarPluginPaddingFunctionInterface as interface };

export interface IPostcssSugarPluginPaddingFunctionParams {
    padding: string;
    scalable: boolean;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginPaddingFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginPaddingFunctionParams = {
        padding: '',
        scalable: true,
        ...params,
    };

    const padding = finalParams.padding;
    let paddings = padding.split(' ').map((s) => {
        if (s === `${parseInt(s)}`)
            return `sugar.theme(padding.${s}, ${finalParams.scalable})`;
        return s;
    });

    return paddings.join(' ');
}
