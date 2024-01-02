"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class postcssUiGoogleMapClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssUiGoogleMapClassesInterface;
/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.googleMap
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent a google map
 *
 * @snippet      @s.ui.googleMap.classes($1);
 *
 * @example        css
 * \@s.ui.googleMap.classes;
 *
 * @since    2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.code(`@s.scope 'bare' {`);
    vars.code(`
        .s-google-map {
            @@s.scope.only 'bare' {
                @s.ui.googleMap;
            }
        }
    `, {
        type: 'CssClass',
    });
    vars.code('}');
    vars.code(`@s.scope 'lnf' {`);
    vars.comment(`/**
            * @name          .s-google-map[lnf="default"]
            * @namespace          sugar.style.ui.googleMap
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> google map
            * 
            * @example        html
            * <s-google-map></s-google-map>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
            .s-google-map[lnf="default"] {
                @s.scope.only 'lnf' {
                    @s.ui.googleMap;
                }
            }`, {
        type: 'CssClass',
    });
    vars.code('}');
    vars.code(`@s.scope 'vr' {`);
    vars.comment(`/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.googleMap
            * @type           CssClass
            * 
            * This class represent some color pickers in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-google-map></s-google-map>
            *   <br />
            *   <s-google-map></s-google-map>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`@s.rhythm.vertical {
            .s-google-map {
                ${s_theme_1.default.current.jsObjectToCssProperties(s_theme_1.default.current.get('ui.googleMap.rhythmVertical'))}
            } 
        }
        `, {
        type: 'CssClass',
    });
    vars.code('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSxrQ0FBbUMsU0FBUSxxQkFBWTtJQUN6RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUk4Qyx1REFBUztBQUV4RDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUUvQixJQUFJLENBQUMsSUFBSSxDQUNMOzs7Ozs7S0FNSCxFQUNHO1FBQ0ksSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FDSixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUMsT0FBTyxDQUNSOzs7Ozs7Ozs7Ozs7V0FZRyxDQUNOLENBQUMsSUFBSSxDQUNGOzs7OztjQUtNLEVBQ047UUFDSSxJQUFJLEVBQUUsVUFBVTtLQUNuQixDQUNKLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzdCLElBQUksQ0FBQyxPQUFPLENBQ1I7Ozs7Ozs7Ozs7Ozs7Ozs7V0FnQkcsQ0FDTixDQUFDLElBQUksQ0FDRjs7a0JBRVUsaUJBQVEsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQ3RDLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxDQUN0RDs7O1NBR1IsRUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO0tBQ25CLENBQ0osQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBaEdELDRCQWdHQyJ9