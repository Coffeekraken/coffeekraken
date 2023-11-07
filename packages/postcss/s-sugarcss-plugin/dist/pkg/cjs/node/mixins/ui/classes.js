"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class SSugarcssPluginUiClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginUiClassesInterface;
/**
 * @name           classes
 * @as              @s.ui.classes
 * @namespace      node.mixin.ui
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to print all the ui classes like button, form, etc...
 *
 * @snippet         @s.ui.classes
 *
 * @example        css
 * @s.ui.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bospsel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1({ params, atRule, replaceWith, }) {
    const cssArray = [
        '@s.ui.avatar.classes;',
        '@s.ui.backdrop.classes;',
        '@s.ui.badge.classes;',
        '@s.ui.blockquote.classes;',
        '@s.ui.button.classes;',
        '@s.ui.checkbox.classes;',
        '@s.ui.dropdown.classes;',
        '@s.ui.fsTree.classes;',
        '@s.ui.input.classes;',
        '@s.ui.inputContainer.classes;',
        '@s.ui.label.classes;',
        '@s.ui.list.classes;',
        '@s.ui.loader.classes;',
        '@s.ui.media.classes;',
        '@s.ui.radio.classes;',
        '@s.ui.range.classes;',
        '@s.ui.select.classes;',
        '@s.ui.switch.classes;',
        '@s.ui.table.classes;',
        '@s.ui.tabs.classes;',
        '@s.ui.toggle.classes;',
        '@s.ui.tooltip.classes;',
    ];
    return cssArray;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLGlDQUFrQyxTQUFRLHFCQUFZO0lBQ3hELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBQzZDLHNEQUFTO0FBRXZEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxRQUFRLEdBQUc7UUFDYix1QkFBdUI7UUFDdkIseUJBQXlCO1FBQ3pCLHNCQUFzQjtRQUN0QiwyQkFBMkI7UUFDM0IsdUJBQXVCO1FBQ3ZCLHlCQUF5QjtRQUN6Qix5QkFBeUI7UUFDekIsdUJBQXVCO1FBQ3ZCLHNCQUFzQjtRQUN0QiwrQkFBK0I7UUFDL0Isc0JBQXNCO1FBQ3RCLHFCQUFxQjtRQUNyQix1QkFBdUI7UUFDdkIsc0JBQXNCO1FBQ3RCLHNCQUFzQjtRQUN0QixzQkFBc0I7UUFDdEIsdUJBQXVCO1FBQ3ZCLHVCQUF1QjtRQUN2QixzQkFBc0I7UUFDdEIscUJBQXFCO1FBQ3JCLHVCQUF1QjtRQUN2Qix3QkFBd0I7S0FDM0IsQ0FBQztJQUVGLE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFuQ0QsNEJBbUNDIn0=