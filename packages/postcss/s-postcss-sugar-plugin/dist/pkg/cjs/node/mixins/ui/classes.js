"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginUiClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginUiClassesInterface;
/**
 * @name           classes
 * @namespace      node.mixin.ui
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to print all the ui classes like button, form, etc...
 *
 * @example        css
 * \@sugar.ui.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bospsel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1({ params, atRule, replaceWith, }) {
    const cssArray = [
        '@sugar.ui.avatar.classes;',
        '@sugar.ui.backdrop.classes;',
        '@sugar.ui.badge.classes;',
        '@sugar.ui.blockquote.classes;',
        '@sugar.ui.button.classes;',
        '@sugar.ui.checkbox.classes;',
        '@sugar.ui.dropdown.classes;',
        '@sugar.ui.fsTree.classes;',
        '@sugar.ui.input.classes;',
        '@sugar.ui.inputContainer.classes;',
        '@sugar.ui.label.classes;',
        '@sugar.ui.list.classes;',
        '@sugar.ui.loader.classes;',
        '@sugar.ui.tabs.classes;',
        '@sugar.ui.radio.classes;',
        '@sugar.ui.range.classes;',
        '@sugar.ui.select.classes;',
        '@sugar.ui.switch.classes;',
        '@sugar.ui.table.classes;',
        '@sugar.ui.tooltip.classes;',
    ];
    return cssArray;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLG9DQUFxQyxTQUFRLHFCQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBQ2dELHlEQUFTO0FBRTFEOzs7Ozs7Ozs7Ozs7O0dBYUc7QUFDSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFFBQVEsR0FBRztRQUNiLDJCQUEyQjtRQUMzQiw2QkFBNkI7UUFDN0IsMEJBQTBCO1FBQzFCLCtCQUErQjtRQUMvQiwyQkFBMkI7UUFDM0IsNkJBQTZCO1FBQzdCLDZCQUE2QjtRQUM3QiwyQkFBMkI7UUFDM0IsMEJBQTBCO1FBQzFCLG1DQUFtQztRQUNuQywwQkFBMEI7UUFDMUIseUJBQXlCO1FBQ3pCLDJCQUEyQjtRQUMzQix5QkFBeUI7UUFDekIsMEJBQTBCO1FBQzFCLDBCQUEwQjtRQUMxQiwyQkFBMkI7UUFDM0IsMkJBQTJCO1FBQzNCLDBCQUEwQjtRQUMxQiw0QkFBNEI7S0FDL0IsQ0FBQztJQUVGLE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFqQ0QsNEJBaUNDIn0=