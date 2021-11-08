import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString';

class postcssSugarPluginStateActiveMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginStateActiveMixinInterface as interface };

export interface postcssSugarPluginStateActiveMixinParams {}

/**
 * @name           focus
 * @namespace      mixins.state
 * @type           Mixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to target some active items to apply some styling on it.
 * Here's the selector generated by this mixin:
 * - &:active:not(:hover), &.active, &[active]
 *
 *
 * @return      {Css}         The generated css
 *
 * @example         postcss
 * .myCoolItem {
 *  \@sugar.state.active {
 *      // ...
 *  }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
