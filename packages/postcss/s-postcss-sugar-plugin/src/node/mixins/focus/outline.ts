import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginFocusOutlineMixinInterface extends __SInterface {
    static get _definition() {
        return {
            color: {
                type: 'String',
                default: 'current',
            },
        };
    }
}
export { postcssSugarPluginFocusOutlineMixinInterface as interface };

export interface postcssSugarPluginFocusOutlineMixinParams {
    color: string;
}

/**
 * @name           outline
 * @as              @s.focus.outline
 * @namespace      node.mixin.focus
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to display an outline when the element is in focus-visible state and NOT hover
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @s.focus.outline($1)
 *
 * @example        css
 * .myCoolItem {
 *      @s.focus.outline;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<postcssSugarPluginFocusOutlineMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <postcssSugarPluginFocusOutlineMixinParams>{
        color: 'current',
        ...(params ?? {}),
    };

    const vars: string[] = [
        `@s.outline.when(focus, $color: ${finalParams.color});`,
    ];
    return vars;
}
