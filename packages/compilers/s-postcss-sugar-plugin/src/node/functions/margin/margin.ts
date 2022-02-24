import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          margin
 * @namespace     node.function.margin
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get a margin value depending on your theme config
 *
 * @param       {String}        margin      The margin to get
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      margin-top: sugar.margin(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginMarginFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            margin: {
                type: 'String',
                values: Object.keys(__STheme.config('margin')),
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: __STheme.config('scalable.margin'),
            },
        };
    }
}
export { postcssSugarPluginMarginFunctionInterface as interface };

export interface IPostcssSugarPluginMarginFunctionParams {
    margin: string;
    scalable: boolean;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginMarginFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginMarginFunctionParams = {
        margin: '',
        scalable: false,
        ...params,
    };

    const margin = finalParams.margin;
    let margins = margin.split(' ').map((s) => {
        if (s === `${parseInt(s)}`)
            return `sugar.theme(margin.${s}, ${finalParams.scalable})`;
        return s;
    });

    return margins.join(' ');
}
