import { interface as PostcssSugarPluginGradientInterface } from './gradient.js';

/**
 * @name           text
 * @as              @sugar.gradient.text
 * @namespace      node.mixin.gradient
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the css needed to apply a gradient on your text
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.gradient.text($1, $2, $3)
 *
 * @example        css
 * .my-cool-element {
 *    \@sugar.gradient.text(accent, secondary, radial);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export { PostcssSugarPluginGradientInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginGradientParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const vars: string[] = [
        `
        background-size: 100%;
        background-clip: text;
        color: transparent;
        @sugar.gradient ${atRule.params};
    `,
    ];

    return vars;
}
