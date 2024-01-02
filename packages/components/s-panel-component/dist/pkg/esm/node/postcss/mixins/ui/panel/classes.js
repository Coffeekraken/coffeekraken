import __SInterface from '@coffeekraken/s-interface';
class postcssUiPanelClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssUiPanelClassesInterface as interface };
/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.panel
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent a panel
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet      @s.ui.panel.classes($1);
 *
 * @example        css
 * \@s.ui.panel.classes;
 *
 * @since    2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.code(`@s.scope 'bare' {`);
    vars.code(`
        .s-panel {
            @s.scope.only 'bare' {
                @s.ui.panel;
            }
        }
    `, {
        type: 'CssClass',
    });
    vars.code('}');
    vars.code(`@s.scope 'lnf' {`);
    vars.comment(`/**
            * @name          .s-panel[lnf="default"]
            * @namespace          sugar.style.ui.panel
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color> panel
            * 
            * @example        html
            * <s-panel>
            *   <template>
            *       <h1>Hello world</h1>
            *   </template>
            * </s-panel>
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
            .s-panel[lnf="default"] {
                @s.scope.only 'lnf' {
                    @s.ui.panel;
                }
            }
        `, {
        type: 'CssClass',
    });
    vars.push('}');
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sOEJBQStCLFNBQVEsWUFBWTtJQUNyRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSw4QkFBOEIsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFL0IsSUFBSSxDQUFDLElBQUksQ0FDTDs7Ozs7O0tBTUgsRUFDRztRQUNJLElBQUksRUFBRSxVQUFVO0tBQ25CLENBQ0osQ0FBQztJQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FDUjs7Ozs7Ozs7Ozs7Ozs7OztXQWdCRyxDQUNOLENBQUMsSUFBSSxDQUNGOzs7Ozs7U0FNQyxFQUNEO1FBQ0ksSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FDSixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==