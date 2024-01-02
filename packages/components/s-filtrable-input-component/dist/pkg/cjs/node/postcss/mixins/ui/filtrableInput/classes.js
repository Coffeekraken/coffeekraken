"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class postcssUiFiltrableInputClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssUiFiltrableInputClassesInterface;
/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.filtrableInput
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent a filtrable input
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       vr              Vertical rhythm css
 *
 * @snippet      @s.ui.filtrableInput.classes($1);
 *
 * @example        css
 * \@s.ui.filtrableInput.classes;
 *
 * @since    2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.code(`
        .s-filtrable-input[lnf="default"] {
            @s.ui.filtrableInput;
        }
        `, {
        type: 'CssClass',
    });
    vars.code(`@s.scope 'vr' {`);
    // @TODO            example
    vars.comment(`/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.filtrableInput
            * @type           CssClass
            * 
            * This class represent some filtrable inputs in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   example not available for now...
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`@s.rhythm.vertical {
                .s-filtrable-input {
                    ${s_theme_1.default.current.jsObjectToCssProperties(s_theme_1.default.current.get('ui.filtrableInput.rhythmVertical'))}
                } 
            }
        `, {
        type: 'CssClass',
    });
    vars.code('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSx1Q0FBd0MsU0FBUSxxQkFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUltRCw0REFBUztBQUU3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsSUFBSSxDQUNMOzs7O1NBSUMsRUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO0tBQ25CLENBQ0osQ0FBQztJQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUM3QiwyQkFBMkI7SUFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUjs7Ozs7Ozs7Ozs7Ozs7V0FjRyxDQUNOLENBQUMsSUFBSSxDQUNGOztzQkFFYyxpQkFBUSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FDdEMsaUJBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUNoQixrQ0FBa0MsQ0FDckMsQ0FDSjs7O1NBR1osRUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO0tBQ25CLENBQ0osQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBaEVELDRCQWdFQyJ9