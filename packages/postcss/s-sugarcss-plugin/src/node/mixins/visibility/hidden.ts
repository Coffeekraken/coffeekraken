import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           hidden
 * @as              @s.visibility.hidden
 * @namespace      node.mixin.visually
 * @type           PostcssMixin
 * @interface       ./hidden
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to apply a css that make the element visually hidden but not really
 * hidden like when make use of `display: none;`.
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.visibility.hidden
 *
 * @example        css
 * .my-element {
 *  @s.visually.hidden;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginVisuallyHiddenMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginVisuallyHiddenMixinInterface as interface };

export interface SSugarcssPluginVisuallyHiddenMixinParams {}

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<SSugarcssPluginVisuallyHiddenMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <SSugarcssPluginVisuallyHiddenMixinParams>{
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
