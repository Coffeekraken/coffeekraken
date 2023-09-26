import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString.js';

class postcssSugarPluginStateActiveMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginStateActiveMixinInterface as interface };

export interface postcssSugarPluginStateActiveMixinParams {}

/**
 * @name           focus
 * @as              @s.state.active
 * @namespace      node.mixin.state
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to target some active items to apply some styling on it.
 * Here's the selector generated by this mixin:
 * - &:active:not(:hover), &.active, &[active]
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @s.state.active
 * \@s.state.active {
 *      $1
 * }
 *
 * @example        css
 * .myCoolItem {
 *  \@s.state.active {
 *      // ...
 *  }
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
    params: Partial<postcssSugarPluginStateActiveMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <postcssSugarPluginStateActiveMixinParams>{
        className: '',
        ...(params ?? {}),
    };

    const vars: string[] = [];

    vars.push(`&:active:not(:hover), &.active, &[active] {`);
    vars.push(__astNodesToString(atRule.nodes));
    vars.push(`}`);

    return vars;
}
