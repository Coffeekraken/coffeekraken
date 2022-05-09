import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString';

class postcssSugarPluginDirectionRtlMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginDirectionRtlMixinInterface as interface };

export interface postcssSugarPluginDirectionRtlMixinParams {}

/**
 * @name           rtl
 * @namespace      node.mixin.direction
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to style an element when it is in an rtl scope
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example        css
 * .myCoolItem {
 *  \@sugar.direction.rtl {
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
    postcssApi,
    replaceWith,
}: {
    params: Partial<postcssSugarPluginDirectionRtlMixinParams>;
    atRule: any;
    postcssApi: any;
    replaceWith: Function;
}) {
    const finalParams = <postcssSugarPluginDirectionRtlMixinParams>{
        className: '',
        ...(params ?? {}),
    };

    const rule = new postcssApi.Rule({
        selector: '[dir="rtl"] &, &[dir="rtl"]',
    });

    // @ts-ignore
    atRule.nodes.forEach((node) => {
        rule.append(node);
    });

    atRule.replaceWith(rule);
}
