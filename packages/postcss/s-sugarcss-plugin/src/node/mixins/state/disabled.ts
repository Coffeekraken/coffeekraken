import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString.js';

class SSugarcssPluginStateDisabledMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginStateDisabledMixinInterface as interface };

export interface SSugarcssPluginStateDisabledMixinParams {}

/**
 * @name           disabled
 * @as              @s.state.disabled
 * @namespace      node.mixin.state
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to target some disabled items to apply some styling.
 * Here's the generated selector:
 * - &:disabled
 *
 * @snippet         @s.state.disabled
 * @s.state.disabled {
 *      $1
 * }
 *
 * @example        css
 * .myCoolItem {
 *  @s.state.disabled {
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
    params: Partial<SSugarcssPluginStateDisabledMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams = <SSugarcssPluginStateDisabledMixinParams>{
        className: '',
        ...(params ?? {}),
    };

    const vars: string[] = [];

    vars.push(`&:disabled, &[disabled] {`);
    vars.push(__astNodesToString(atRule.nodes));
    vars.push(`}`);

    return vars;
}
