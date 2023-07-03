import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginDirectionRtlMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginDirectionRtlMixinInterface as interface };
/**
 * @name           rtl
 * @as              @sugar.direction.rtl
 * @namespace      node.mixin.direction
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to style an element when it is in an rtl scope.
 * The scope is specified like so: [dir="rtl"] &, &[dir="rtl"]
 *
 * @snippet         @sugar.direction.rtl
 * \@sugar.direction.rtl {
 *      $1
 * }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sNENBQTZDLFNBQVEsWUFBWTtJQUNuRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUlyRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLFNBQVMsRUFBRSxFQUFFLElBQ1YsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztRQUM3QixRQUFRLEVBQUUsNkJBQTZCO0tBQzFDLENBQUMsQ0FBQztJQUVILGFBQWE7SUFDYixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdCLENBQUMifQ==