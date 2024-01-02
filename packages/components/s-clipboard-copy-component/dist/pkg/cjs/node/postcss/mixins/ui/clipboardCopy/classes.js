"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssUiClipboardCopyClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssUiClipboardCopyClassesInterface;
/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.clipboardCopy
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent a clipboard copy
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet      @s.ui.clipboardCopy.classes($1);
 *
 * @example        css
 * \@s.ui.clipboardCopy.classes;
 *
 * @since    2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.code(`@s.scope 'lnf' {`);
    vars.comment(`/**
            * @name           .s-clipboard-copy[lnf="default"]
            * @namespace          sugar.style.ui.clipboardCopy
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> clipboard copy
            * 
            * @example        html
            * <s-clipboard-copy onclick="this.copy('hello world')"></s-clipboard-copy>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`.s-clipboard-copy[lnf="default"] {
                @s.ui.clipboardCopy;
            }`, {
        type: 'CssClass',
    });
    vars.code('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLHNDQUF1QyxTQUFRLHFCQUFZO0lBQzdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSWtELDJEQUFTO0FBRTVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxPQUFPLENBQ1I7Ozs7Ozs7Ozs7OztXQVlHLENBQ04sQ0FBQyxJQUFJLENBQ0Y7O2NBRU0sRUFDTjtRQUNJLElBQUksRUFBRSxVQUFVO0tBQ25CLENBQ0osQ0FBQztJQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBNUNELDRCQTRDQyJ9