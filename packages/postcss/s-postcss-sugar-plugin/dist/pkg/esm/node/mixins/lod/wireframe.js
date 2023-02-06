import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginScopeWireframeMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginScopeWireframeMixinInterface as interface };
/**
 * @name           wireframe
 * @namespace      node.mixin.scope
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to specify some css used only for wireframe. Basically it's the same as
 * calling the mixin @sugar.lod (<2, false); that mean "less than 2 and don't keep when lod is disabled".
 * It also prevent the lod to be applied inside the atRule.
 *
 * @example        css
 * @sugar.lod.wireframe() {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, sharedData, atRule, settings, postcssApi, }) {
    const finalParams = Object.assign({ scopes: [] }, (params !== null && params !== void 0 ? params : {}));
    const newRule = postcssApi.atRule({
        name: `sugar.lod`,
        params: `(<2, $keepWhenLodDisabled: false)`,
        nodes: atRule.nodes,
    });
    atRule.replaceWith(newRule);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBR3JELE1BQU0sOENBQStDLFNBQVEsWUFBWTtJQUNyRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSw4Q0FBOEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUl2RTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sVUFBVSxFQUNWLE1BQU0sRUFDTixRQUFRLEVBQ1IsVUFBVSxHQU9iO0lBQ0csTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLE1BQU0sRUFBRSxFQUFFLElBQ1AsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7UUFDOUIsSUFBSSxFQUFFLFdBQVc7UUFDakIsTUFBTSxFQUFFLG1DQUFtQztRQUMzQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7S0FDdEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoQyxDQUFDIn0=