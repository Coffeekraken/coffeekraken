import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString.js';

class postcssSugarPluginStateFocusMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginStateFocusMixinInterface as interface };

export interface postcssSugarPluginStateFocusMixinParams {}

/**
 * @name           focus
 * @as              @s.state.focus
 * @namespace      node.mixin.state
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to target some focus items to apply some styling.
 * Here's the generated selector:
 * - &:focus
 *
 * @snippet         @s.state.focus
 * @s.state.focus {
 *      $1
 * }
 *
 * @example        css
 * .myCoolItem {
 *  @s.state.focus {
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
    params: Partial<postcssSugarPluginStateFocusMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <postcssSugarPluginStateFocusMixinParams>{
        className: '',
        ...(params ?? {}),
    };

    const vars: string[] = [];

    vars.push(`&:focus {`);
    vars.push(__astNodesToString(atRule.nodes));
    vars.push(`}`);

    return vars;
}
