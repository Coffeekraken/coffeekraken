import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginDirectionRtlMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginDirectionRtlMixinInterface as interface };
/**
 * @name           rtl
 * @namespace      node.mixins.direction
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to style an element when it is in an rtl scope
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * .myCoolItem {
 *  \@sugar.direction.rtl {
 *      // ...
 *  }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, postcssApi, replaceWith, }) {
    const finalParams = Object.assign({ className: '' }, (params !== null && params !== void 0 ? params : {}));
    const rule = new postcssApi.Rule({
        selector: '[dir="rtl"] &, &[dir="rtl"]',
    });
    // @ts-ignore
    atRule.nodes.forEach((node) => {
        rule.append(node);
    });
    atRule.replaceWith(rule);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnRsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicnRsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBR3JELE1BQU0sNENBQTZDLFNBQVEsWUFBWTtJQUNuRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUlyRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixTQUFTLEVBQUUsRUFBRSxJQUNWLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUM7UUFDN0IsUUFBUSxFQUFFLDZCQUE2QjtLQUMxQyxDQUFDLENBQUM7SUFFSCxhQUFhO0lBQ2IsTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM3QixDQUFDIn0=