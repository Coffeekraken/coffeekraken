"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class postcssUiSpecsEditorClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssUiSpecsEditorClassesInterface;
/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.specsEditor
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 * @private
 *
 * This mixin represent a specs editor
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       behavior        Behavior css
 * @scope       vr              Vertical rhythm css
 *
 * @snippet      @s.ui.specsEditor.classes($1);
 *
 * @example        css
 * \@s.ui.specsEditor.classes;
 *
 * @since    2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: ['solid'], defaultLnf: 'solid' }, params);
    const vars = new CssVars();
    vars.code(`@s.scope 'bare' {`);
    vars.code(`
        .s-specs-editor {
            @s.scope.only 'bare' {
                @s.ui.specsEditor;
            }
        }
    `, {
        type: 'CssClass',
    });
    vars.code('}');
    if (finalParams.lnfs.includes(finalParams.defaultLnf)) {
        vars.code(`@s.scope 'lnf' {`);
        vars.comment(`/**
            * @name          .s-specs-editor[lnf="default"]
            * @namespace          sugar.style.ui.specsEditor
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> slider
            * 
            * @example        html
            * <s-slider></s-slider>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
            .s-specs-editor[lnf="default"] {
                @s.scope.only 'lnf' {
                    @s.ui.specsEditor($lnf: ${finalParams.defaultLnf});
                }
            }
            `, {
            type: 'CssClass',
        });
        vars.code('}');
    }
    if (finalParams.lnfs.includes(finalParams.defaultLnf)) {
        vars.code(`@s.scope 'behavior' {`);
        vars.code(`
            .s-specs-editor[behavior="default"] {
                @s.scope.only 'behavior' {
                    @s.ui.specsEditor($lnf: ${finalParams.defaultLnf});
                }
            }`, {
            type: 'CssClass',
        });
        vars.code('}');
    }
    vars.code(`@s.scope 'vr' {`);
    vars.comment(`/**
            * @name           s-rhythm:vertical
            * @namespace          sugar.style.ui.specsEditor
            * @type           CssClass
            * 
            * This class represent some color pickers in the s-rhythm:vertical scope
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <s-slider></s-slider>
            *   <br />
            *   <s-slider></s-slider>
            * </div>
            * 
            * @since      2.0.0
            * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`@s.rhythm.vertical {
                .s-specs-editor {
                    ${s_theme_1.default.current.jsObjectToCssProperties(s_theme_1.default.current.get('ui.specsEditor.rhythmVertical'))}
                } 
            }
        `, {
        type: 'CssClass',
    });
    vars.code('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSxvQ0FBcUMsU0FBUSxxQkFBWTtJQUMzRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQU1nRCx5REFBUztBQUUxRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLENBQUMsT0FBTyxDQUFDLEVBQ2YsVUFBVSxFQUFFLE9BQU8sSUFDaEIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMvQixJQUFJLENBQUMsSUFBSSxDQUNMOzs7Ozs7S0FNSCxFQUNHO1FBQ0ksSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FDSixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxDQUNSOzs7Ozs7Ozs7Ozs7V0FZRCxDQUNGLENBQUMsSUFBSSxDQUNGOzs7OENBR2tDLFdBQVcsQ0FBQyxVQUFVOzs7YUFHdkQsRUFDRDtZQUNJLElBQUksRUFBRSxVQUFVO1NBQ25CLENBQ0osQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbEI7SUFFRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLElBQUksQ0FDTDs7OzhDQUdrQyxXQUFXLENBQUMsVUFBVTs7Y0FFdEQsRUFDRjtZQUNJLElBQUksRUFBRSxVQUFVO1NBQ25CLENBQ0osQ0FBQztRQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbEI7SUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FDUjs7Ozs7Ozs7Ozs7Ozs7OztXQWdCRyxDQUNOLENBQUMsSUFBSSxDQUNGOztzQkFFYyxpQkFBUSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FDdEMsaUJBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLCtCQUErQixDQUFDLENBQ3hEOzs7U0FHWixFQUNEO1FBQ0ksSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FDSixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFwSEQsNEJBb0hDIn0=