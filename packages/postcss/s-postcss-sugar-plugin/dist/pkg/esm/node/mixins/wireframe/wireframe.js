import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginScopeWireframeMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginScopeWireframeMixinInterface as interface };
/**
 * @name           wireframe
 * @namespace      node.mixin.wireframe
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to specify some css used only for wireframe.
 * It also prevent the lod to be applied inside the atRule.
 *
 * @snippet         @sugar.lod.wireframe
 * \@sugar.wireframe {
 *      $1
 * }
 *
 * @example        css
 * \@sugar.wireframe() {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, sharedData, atRule, settings, postcssApi, }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    const newRule = postcssApi.rule({
        selector: '.s-wireframe &',
        nodes: atRule.nodes,
    });
    atRule.replaceWith(newRule);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBR3JELE1BQU0sOENBQStDLFNBQVEsWUFBWTtJQUNyRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSw4Q0FBOEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUl2RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLFVBQVUsRUFDVixNQUFNLEVBQ04sUUFBUSxFQUNSLFVBQVUsR0FPYjtJQUNHLE1BQU0sV0FBVyxHQUFHLGtCQUNiLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDO1FBQzVCLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO0tBQ3RCLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDaEMsQ0FBQyJ9