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
function default_1({ params, sharedData, atRule, settings, postcssApi, }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    const newRule = postcssApi.rule({
        selector: '.s-wireframe &',
        nodes: atRule.nodes,
    });
    atRule.replaceWith(newRule);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUdyRCxNQUFNLDhDQUErQyxTQUFRLHFCQUFZO0lBQ3JFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBQzBELG1FQUFTO0FBSXBFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixVQUFVLEVBQ1YsTUFBTSxFQUNOLFFBQVEsRUFDUixVQUFVLEdBT2I7SUFDRyxNQUFNLFdBQVcsR0FBRyxrQkFDYixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQztRQUM1QixRQUFRLEVBQUUsZ0JBQWdCO1FBQzFCLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztLQUN0QixDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUF2QkQsNEJBdUJDIn0=