"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class postcssUiRatingClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssUiRatingClassesInterface;
/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.rating
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent rating
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       vr              Vertical rhythm css
 *
 * @snippet      @s.ui.rating.classes($1);
 *
 * @example        css
 * \@s.ui.rating.classes;
 *
 * @since    2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.code(`@s.scope 'bare' {`);
    vars.code(`
        .s-rating {
            @s.scope.only 'bare' {
                @s.ui.rating;
            }
        }
    `, {
        type: 'CssClass',
    });
    vars.code('}');
    vars.code(`@s.scope 'lnf' {`);
    vars.comment(`/**
            * @name          .s-rating[lnf="default"]
            * @namespace          sugar.style.ui.rating
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> rating
            * 
            * @example        html
            * <s-rating></s-rating>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
            .s-rating[lnf="default"] {
                @s.scope.only 'lnf' {
                    @s.ui.rating;
                }
            }`, {
        type: 'CssClass',
    });
    vars.code('}');
    vars.code(`@s.scope 'vr' {`);
    vars.comment(`/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.rating
            * @type           CssClass
            * 
            * This class represent some color pickers in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-rating></s-rating>
            *   <br />
            *   <s-rating></s-rating>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`@s.rhythm.vertical {
                .s-rating {
                    ${s_theme_1.default.current.jsObjectToCssProperties(s_theme_1.default.current.get('ui.rating.rhythmVertical'))}
                } 
            }
        `, {
        type: 'CssClass',
    });
    vars.code('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSwrQkFBZ0MsU0FBUSxxQkFBWTtJQUN0RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUkyQyxvREFBUztBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDL0IsSUFBSSxDQUFDLElBQUksQ0FDTDs7Ozs7O0tBTUgsRUFDRztRQUNJLElBQUksRUFBRSxVQUFVO0tBQ25CLENBQ0osQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FDUjs7Ozs7Ozs7Ozs7O1dBWUcsQ0FDTixDQUFDLElBQUksQ0FDRjs7Ozs7Y0FLTSxFQUNOO1FBQ0ksSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FDSixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQUM3QixJQUFJLENBQUMsT0FBTyxDQUNSOzs7Ozs7Ozs7Ozs7Ozs7O1dBZ0JHLENBQ04sQ0FBQyxJQUFJLENBQ0Y7O3NCQUVjLGlCQUFRLENBQUMsT0FBTyxDQUFDLHVCQUF1QixDQUN0QyxpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FDbkQ7OztTQUdaLEVBQ0Q7UUFDSSxJQUFJLEVBQUUsVUFBVTtLQUNuQixDQUNKLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQS9GRCw0QkErRkMifQ==