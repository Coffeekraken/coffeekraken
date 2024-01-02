"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssUiHotkeysListClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssUiHotkeysListClassesInterface;
/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.hotkeysList
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent the hotkeys list
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet      @s.ui.hotkeysList.classes($1);
 *
 * @example        css
 * \@s.ui.hotkeysList.classes;
 *
 * @since    2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.code(`@s.scope 'bare' {`);
    vars.code(`
        .s-hotkeys-list {
            @s.scope.only 'bare' {
                @s.ui.hotkeysList;
            }
        }
    `, {
        type: 'CssClass',
    });
    vars.code('}');
    vars.code(`@s.scope 'lnf' {`);
    vars.comment(`/**
            * @name          .s-hotkeys-list[lnf="default"]
            * @namespace          sugar.style.ui.hotkeysList
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> hotkeys list
            * 
            * @example        html
            * <<s-hotkeys-list>></<s-hotkeys-list>>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
            .s-hotkeys-list[lnf="default"] {
                @s.scope.only 'lnf' {
                    @s.ui.hotkeysList;
                }
            }`, {
        type: 'CssClass',
    });
    vars.code('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLG9DQUFxQyxTQUFRLHFCQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSWdELHlEQUFTO0FBRTFEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQyxJQUFJLENBQ0w7Ozs7OztLQU1ILEVBQ0c7UUFDSSxJQUFJLEVBQUUsVUFBVTtLQUNuQixDQUNKLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxPQUFPLENBQ1I7Ozs7Ozs7Ozs7OztXQVlHLENBQ04sQ0FBQyxJQUFJLENBQ0Y7Ozs7O2NBS00sRUFDTjtRQUNJLElBQUksRUFBRSxVQUFVO0tBQ25CLENBQ0osQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBN0RELDRCQTZEQyJ9