import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          opacity
 * @as          sugar.opacity
 * @namespace     node.function.opacity
 * @type          PostcssFunction
 * @platform      postcss
 * @interface     ./opacity
 * @status        stable
 *
 * This function allows you to get an opacity value depending on your theme config
 *
 * @param       {String}        opacity      The opacity to get
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.opacity($1)
 *
 * @example       css
 * .my-element {
 *      opacity: s.opacity(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginOpacityFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            opacity: {
                type: 'String',
                values: Object.keys(__STheme.get('opacity')),
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

    if (__STheme.get('opacity')[opacity] === undefined) return opacity;

    const opacityRes = opacity.split(' ').map((s) => {
        const size = __STheme.get(`opacity.${s}`);
        if (!size) return size;
        return `var(${`--s-opacity-${s}`}, ${size})`;
    });

    return opacityRes.join(' ');
}
