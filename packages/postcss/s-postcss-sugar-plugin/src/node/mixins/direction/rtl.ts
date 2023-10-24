import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginDirectionRtlMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginDirectionRtlMixinInterface as interface };

export interface postcssSugarPluginDirectionRtlMixinParams {}

/**
 * @name           rtl
 * @as              @s.direction.rtl
 * @namespace      node.mixin.direction
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to style an element when it is in an rtl scope.
 * The scope is specified like so: [dir="rtl"] &, &[dir="rtl"]
 *
 * @snippet         @s.direction.rtl
 * @s.direction.rtl {
 *      $1
 * }
 *
 * @example        css
 * .myCoolItem {
 *  @s.direction.rtl {
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
