import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          opacity
 * @namespace     node.function.opacity
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get an opacity value depending on your theme config
 *
 * @param       {String}        opacity      The opacity to get
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      opacity: sugar.opacity(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginOpacityFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            opacity: {
                type: 'String',
                values: Object.keys(__STheme.config('opacity')),
                default: '100',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginOpacityFunctionInterface as interface };

export interface IPostcssSugarPluginOpacityFunctionParams {
    opacity: string;
}

export default function ({
    params,
}: {
    params: Partial<IPostcssSugarPluginOpacityFunctionParams>;
}) {
    const finalParams: IPostcssSugarPluginOpacityFunctionParams = {
        opacity: '100',
        ...params,
    };

    const opacity = finalParams.opacity;

    if (__STheme.config('opacity')[opacity] === undefined) return opacity;

    const opacityRes = opacity.split(' ').map((s) => {
        const size = __STheme.config(`opacity.${s}`);
        if (!size) return size;
        return `var(${`--s-theme-opacity-${s}`}, ${size})`;
    });

    return opacityRes.join(' ');
}
