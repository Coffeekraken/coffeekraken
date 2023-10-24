import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString.js';

class postcssSugarPluginStateHoverMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginStateHoverMixinInterface as interface };

export interface postcssSugarPluginStateHoverMixinParams {}

/**
 * @name           hover
 * @as              @s.state.hover
 * @namespace      node.mixin.state
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to target some hover item to apply some styling on it.
 * Here's the generated selector:
 * - &:hover
 *
 * @snippet         @s.state.hover
 * @s.state.hover {
 *      $1
 * }
 *
 * @example        css
 * .myCoolItem {
 *  @s.state.hover {
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
    params: Partial<postcssSugarPluginStateHoverMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <postcssSugarPluginStateHoverMixinParams>{
        className: '',
        ...(params ?? {}),
    };

    const vars: string[] = [];

    vars.push(`&:hover {`);
    vars.push(__astNodesToString(atRule.nodes));
    vars.push(`}`);

    return vars;
}
