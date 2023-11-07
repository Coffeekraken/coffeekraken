import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString.js';

class SSugarcssPluginStateHoverMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginStateHoverMixinInterface as interface };

export interface SSugarcssPluginStateHoverMixinParams {}

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
    params: Partial<SSugarcssPluginStateHoverMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <SSugarcssPluginStateHoverMixinParams>{
        className: '',
        ...(params ?? {}),
    };

    const vars: string[] = [];

    vars.push(`&:hover {`);
    vars.push(__astNodesToString(atRule.nodes));
    vars.push(`}`);

    return vars;
}
