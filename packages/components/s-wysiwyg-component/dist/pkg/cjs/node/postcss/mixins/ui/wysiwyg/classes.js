"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssUiWysiwygClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssUiWysiwygClassesInterface;
/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.wysiwyg
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 * @private
 *
 * This mixin represent a wysiwyg editor
 *
 * @snippet      @s.ui.wysiwyg.classes($1);
 *
 * @example        css
 * \@s.ui.wysiwyg.classes;
 *
 * @since    2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: ['solid'], defaultLnf: 'solid' }, params);
    const vars = new CssVars();
    vars.code(`@s.scope 'bare' {`);
    vars.code(`
        .s-wysiwyg {
            @s.scope.only 'bare' {
                @s.ui.wysiwyg;
            }
        }
    `, {
        type: 'CssClass',
    });
    vars.code('}');
    if (finalParams.lnfs.includes(finalParams.defaultLnf)) {
        vars.code(`@s.scope 'lnf' {`);
        vars.comment(`/**
            * @name          .s-wysiwyg[lnf="default"]
            * @namespace          sugar.style.ui.wysiwyg
            * @type           CssClass
            * 
            * This class represent the s-wysiwyg lnf component
            * 
            * @example        html
            * <s-wysiwyg></s-wysiwyg>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
            .s-wysiwyg[lnf="default"] {
                @s.scope.only 'lnf' {
                    @s.ui.wysiwyg($lnf: ${finalParams.defaultLnf});
                }
            }
            `, {
            type: 'CssClass',
        });
        vars.code('}');
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLGdDQUFpQyxTQUFRLHFCQUFZO0lBQ3ZELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBTTRDLHFEQUFTO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQ2YsVUFBVSxFQUFFLE9BQU8sSUFDaEIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMvQixJQUFJLENBQUMsSUFBSSxDQUNMOzs7Ozs7S0FNSCxFQUNHO1FBQ0ksSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FDSixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxDQUNSOzs7Ozs7Ozs7Ozs7V0FZRCxDQUNGLENBQUMsSUFBSSxDQUNGOzs7MENBRzhCLFdBQVcsQ0FBQyxVQUFVOzs7YUFHbkQsRUFDRDtZQUNJLElBQUksRUFBRSxVQUFVO1NBQ25CLENBQ0osQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbEI7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBbEVELDRCQWtFQyJ9