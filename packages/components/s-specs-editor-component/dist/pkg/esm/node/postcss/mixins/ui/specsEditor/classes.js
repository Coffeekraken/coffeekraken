import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssUiSpecsEditorClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssUiSpecsEditorClassesInterface as interface };
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
export default function ({ params, atRule, CssVars, replaceWith, }) {
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
                    ${__STheme.current.jsObjectToCssProperties(__STheme.current.get('ui.specsEditor.rhythmVertical'))}
                } 
            }
        `, {
        type: 'CssClass',
    });
    vars.code('}');
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sb0NBQXFDLFNBQVEsWUFBWTtJQUMzRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSxvQ0FBb0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU3RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUNmLFVBQVUsRUFBRSxPQUFPLElBQ2hCLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDL0IsSUFBSSxDQUFDLElBQUksQ0FDTDs7Ozs7O0tBTUgsRUFDRztRQUNJLElBQUksRUFBRSxVQUFVO0tBQ25CLENBQ0osQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FDUjs7Ozs7Ozs7Ozs7O1dBWUQsQ0FDRixDQUFDLElBQUksQ0FDRjs7OzhDQUdrQyxXQUFXLENBQUMsVUFBVTs7O2FBR3ZELEVBQ0Q7WUFDSSxJQUFJLEVBQUUsVUFBVTtTQUNuQixDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO0lBRUQsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEVBQUU7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxJQUFJLENBQ0w7Ozs4Q0FHa0MsV0FBVyxDQUFDLFVBQVU7O2NBRXRELEVBQ0Y7WUFDSSxJQUFJLEVBQUUsVUFBVTtTQUNuQixDQUNKLENBQUM7UUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2xCO0lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBQzdCLElBQUksQ0FBQyxPQUFPLENBQ1I7Ozs7Ozs7Ozs7Ozs7Ozs7V0FnQkcsQ0FDTixDQUFDLElBQUksQ0FDRjs7c0JBRWMsUUFBUSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FDdEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsK0JBQStCLENBQUMsQ0FDeEQ7OztTQUdaLEVBQ0Q7UUFDSSxJQUFJLEVBQUUsVUFBVTtLQUNuQixDQUNKLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9