"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           removeProps
 * @namespace      node.mixin.utils
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./removeProps
 * @status        beta
 *
 * This mixin allows you to remove some properties from the enclosed css.
 * It can be simply a declaration name like "padding-inline", or a group of declarations that starts/ends
 * with something like to "^padding", "radius$".
 *
 * @param           {String}              props           The properties you want to remove separated by a comma
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.utils.removeProps
 * \@sugar.utils.removeProps '$1' {
 *      $2
 * }
 *
 * @example        css
 * \@sugar.utils.removeProps('^padding, left$') {
 *      \@sugar.ui.button.classes;
 *      /* and css you want... * /
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUtilsRemovePropsMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            props: {
                type: 'String',
                required: true,
            },
        };
    }
}
exports.interface = postcssSugarPluginUtilsRemovePropsMixinInterface;
function default_1({ params, atRule, getRoot, settings, postcssApi, }) {
    const finalParams = Object.assign({ props: '' }, (params !== null && params !== void 0 ? params : {}));
    // all the process is made in the postProcessors/10-utilsRemoveProps.ts file
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUVILE1BQU0sZ0RBQWlELFNBQVEscUJBQVk7SUFDdkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDNEQscUVBQVM7QUFLdEUsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFFBQVEsRUFDUixVQUFVLEdBT2I7SUFDRyxNQUFNLFdBQVcsR0FBRyxnQkFDaEIsS0FBSyxFQUFFLEVBQUUsSUFDTixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsNEVBQTRFO0FBQ2hGLENBQUM7QUFuQkQsNEJBbUJDIn0=