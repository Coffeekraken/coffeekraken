import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssUiFiltrableInputClassesInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'vr'],
                default: ['bare', 'lnf', 'vr'],
            },
        };
    }
}
export { postcssUiFiltrableInputClassesInterface as interface };
/**
 * @name                 classes
 * @namespace            node.postcss.mixins.ui.filtrableInput
 * @type                 PostcssMixin
 * @platform            css
 * @status              beta
 *
 * This mixin represent a filtrable input
 *
 * @snippet      @s.ui.filtrableInput.classes($1);
 *
 * @example        css
 * \@s.ui.filtrableInput.classes;
 *
 * @since    2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ scope: ['bare', 'lnf', 'vr'] }, params);
    const vars = new CssVars();
    vars.code(`
        .s-filtrable-input[lnf="default"] {
            @s.ui.filtrableInput($scope: bare);
        }
        `, {
        type: 'CssClass',
    });
    // @TODO            example
    vars.comment(`/**
            * @name           .s-filtrable-input[lnf="default"]
            * @namespace          sugar.style.ui.filtrableInput
            * @type           CssClass
            * 
            * This class represent a(n) "<s-color="accent">default</s-color>" filtrable input
            * 
            * @example        html
            * Example not available for now...
            * 
            * @since    2.0.0
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
                .s-filtrable-input[lnf="default"]:not(.s-bare) {
                    @s.ui.filtrableInput($lnf: solid, $scope: lnf);
                }`, {
        type: 'CssClass',
    });
    if (finalParams.scope.indexOf('vr') !== -1) {
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
                    ${__STheme.current.jsObjectToCssProperties(__STheme.current.get('ui.filtrableInput.rhythmVertical'))}
                } 
            }
        `, {
            type: 'CssClass',
        });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sdUNBQXdDLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUM7Z0JBQzdCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO2FBQ2pDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSx1Q0FBdUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVoRTs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQ3pCLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsSUFBSSxDQUNMOzs7O1NBSUMsRUFDRDtRQUNJLElBQUksRUFBRSxVQUFVO0tBQ25CLENBQ0osQ0FBQztJQUVGLDJCQUEyQjtJQUMzQixJQUFJLENBQUMsT0FBTyxDQUNSOzs7Ozs7Ozs7Ozs7V0FZRyxDQUNOLENBQUMsSUFBSSxDQUNGOzs7a0JBR1UsRUFDVjtRQUNJLElBQUksRUFBRSxVQUFVO0tBQ25CLENBQ0osQ0FBQztJQUVGLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDeEMsMkJBQTJCO1FBQzNCLElBQUksQ0FBQyxPQUFPLENBQ1I7Ozs7Ozs7Ozs7Ozs7O1dBY0QsQ0FDRixDQUFDLElBQUksQ0FDRjs7c0JBRVUsUUFBUSxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FDdEMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQ2hCLGtDQUFrQyxDQUNyQyxDQUNKOzs7U0FHWixFQUNHO1lBQ0ksSUFBSSxFQUFFLFVBQVU7U0FDbkIsQ0FDSixDQUFDO0tBQ0w7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=