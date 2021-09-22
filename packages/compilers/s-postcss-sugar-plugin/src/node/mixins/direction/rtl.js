import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginDirectionRtlMixinInterface extends __SInterface {
}
postcssSugarPluginDirectionRtlMixinInterface.definition = {};
export { postcssSugarPluginDirectionRtlMixinInterface as interface };
/**
 * @name           rtl
 * @namespace      mixins.direction
 * @type           Mixin
 * @platform      css
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnRsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicnRsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBR3JELE1BQU0sNENBQTZDLFNBQVEsWUFBWTs7QUFDNUQsdURBQVUsR0FBRyxFQUFFLENBQUM7QUFFM0IsT0FBTyxFQUFFLDRDQUE0QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBSXJFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLFNBQVMsRUFBRSxFQUFFLElBQ1YsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQztRQUM3QixRQUFRLEVBQUUsNkJBQTZCO0tBQzFDLENBQUMsQ0FBQztJQUVILGFBQWE7SUFDYixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzFCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzdCLENBQUMifQ==