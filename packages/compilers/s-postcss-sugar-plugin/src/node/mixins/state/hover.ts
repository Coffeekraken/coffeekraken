import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString';

class postcssSugarPluginStateHoverMixinInterface extends __SInterface {
    static definition = {};
}
export { postcssSugarPluginStateHoverMixinInterface as interface };

export interface postcssSugarPluginStateHoverMixinParams {}

/**
 * @name           hover
 * @namespace      mixins.state
 * @type           Mixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to target some hover item to apply some styling on it.
 * Here's the generated selector:
 * - &:hover
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * .myCoolItem {
 *  \@sugar.state.hover {
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
