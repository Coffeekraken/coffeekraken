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
 * @as              @sugar.ui.classes
 * @namespace      node.mixin.ui
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to print all the ui classes like button, form, etc...
 *
 * @snippet         @sugar.ui.classes
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
        '@sugar.ui.media.classes;',
        '@sugar.ui.radio.classes;',
        '@sugar.ui.range.classes;',
        '@sugar.ui.select.classes;',
        '@sugar.ui.switch.classes;',
        '@sugar.ui.table.classes;',
        '@sugar.ui.tabs.classes;',
        '@sugar.ui.toggle.classes;',
        '@sugar.ui.tooltip.classes;',
    ];
    return cssArray;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLG9DQUFxQyxTQUFRLHFCQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBQ2dELHlEQUFTO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxRQUFRLEdBQUc7UUFDYiwyQkFBMkI7UUFDM0IsNkJBQTZCO1FBQzdCLDBCQUEwQjtRQUMxQiwrQkFBK0I7UUFDL0IsMkJBQTJCO1FBQzNCLDZCQUE2QjtRQUM3Qiw2QkFBNkI7UUFDN0IsMkJBQTJCO1FBQzNCLDBCQUEwQjtRQUMxQixtQ0FBbUM7UUFDbkMsMEJBQTBCO1FBQzFCLHlCQUF5QjtRQUN6QiwyQkFBMkI7UUFDM0IsMEJBQTBCO1FBQzFCLDBCQUEwQjtRQUMxQiwwQkFBMEI7UUFDMUIsMkJBQTJCO1FBQzNCLDJCQUEyQjtRQUMzQiwwQkFBMEI7UUFDMUIseUJBQXlCO1FBQ3pCLDJCQUEyQjtRQUMzQiw0QkFBNEI7S0FDL0IsQ0FBQztJQUVGLE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFuQ0QsNEJBbUNDIn0=