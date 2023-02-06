"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginScopeWireframeMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginScopeWireframeMixinInterface;
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
function default_1({ params, sharedData, atRule, settings, postcssApi, }) {
    const finalParams = Object.assign({ scopes: [] }, (params !== null && params !== void 0 ? params : {}));
    const newRule = postcssApi.atRule({
        name: `sugar.lod`,
        params: `(<2, $keepWhenLodDisabled: false)`,
        nodes: atRule.nodes,
    });
    atRule.replaceWith(newRule);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUdyRCxNQUFNLDhDQUErQyxTQUFRLHFCQUFZO0lBQ3JFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBQzBELG1FQUFTO0FBSXBFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFDSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLFVBQVUsRUFDVixNQUFNLEVBQ04sUUFBUSxFQUNSLFVBQVUsR0FPYjtJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixNQUFNLEVBQUUsRUFBRSxJQUNQLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO1FBQzlCLElBQUksRUFBRSxXQUFXO1FBQ2pCLE1BQU0sRUFBRSxtQ0FBbUM7UUFDM0MsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO0tBQ3RCLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDaEMsQ0FBQztBQXpCRCw0QkF5QkMifQ==