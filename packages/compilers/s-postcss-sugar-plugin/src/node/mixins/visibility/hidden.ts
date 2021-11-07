import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           hidden
 * @namespace      node.mixins.visually
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to apply a css that make the element visually hidden but not really
 * hidden like when make use of `display: none;`.
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * .my-element {
 *  \@sugar.visually.hidden;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginVisuallyHiddenMixinInterface extends __SInterface {
    static get definition() {
        return {};
    }
}
export { postcssSugarPluginVisuallyHiddenMixinInterface as interface };

export interface postcssSugarPluginVisuallyHiddenMixinParams {}

/**
 * @name           transition
 * @namespace      mixins.transition
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows apply a transition specified in the theme config like "fast", "slow" and "slow" or others you've been defined
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.transition(fast);
 * }
 *
 * @example       html
 * <h1 class="my-cool-element">Hello world</h1>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<postcssSugarPluginVisuallyHiddenMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <postcssSugarPluginVisuallyHiddenMixinParams>{
        ...(params ?? {}),
    };
    const vars: string[] = [
        `
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    `,
    ];

    return vars;
}
