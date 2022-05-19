import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          select
 * @namespace     node.mixin.ui.select
 * @type               PostcssMixin
 * @interface     ./select          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the select style to any HTMLSelectElement
 *
 * @param       {'solid'}                           [style='theme.ui.select.defaultStyle']         The style you want to generate
 * @param       {'default'|'square'|'pill'}             [shape='theme.ui.select.defaultShape']         The shape you want to generate
 * @param       {('bare'|'lnf'|'shape')[]}        [scope=['bare', 'lnf', 'shape']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-select {
 *    @sugar.ui.select;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiFormSelectInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.select.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.get('ui.select.defaultShape'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape'],
                default: ['bare', 'lnf', 'shape'],
            },
        };
    }
}
export { postcssSugarPluginUiFormSelectInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: 'solid', shape: 'default', scope: ['bare', 'lnf', 'shape'] }, params);
    const vars = [];
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            @sugar.ui.base(select, $scope: bare);
          position: relative;
          -webkit-appearance: none;
          appearance: none;
          line-height: 1;
          outline: 0;
      `);
    }
    switch (finalParams.style) {
        case 'solid':
        default:
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                @sugar.ui.base(select, $scope: lnf);
                overflow: hidden;

                &[multiple] option:checked,
                &[multiple] option[selected] {
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    appearance: none;
                    background: sugar.color(current, --alpha 0.5);
                    color: sugar.color(current, uiForeground);
                }
                &[multiple]:focus option:checked,
                &[multiple]:focus option[selected] {
                    -moz-appearance: none;
                    -webkit-appearance: none;
                    appearance: none;
                    background: sugar.color(current, ui);
                    color: sugar.color(current, uiForeground);
                }

                &:not([multiple]) {
                    padding-inline-end: calc(sugar.padding(ui.select.paddingInline) + 1.5em);

                    --padding-inline: sugar.padding(ui.select.paddingInline);

                    background-repeat: no-repeat;
                    background-image: linear-gradient(45deg, transparent 50%, sugar.color(current) 50%), linear-gradient(135deg, sugar.color(current) 50%, transparent 50%);
                    background-position: right calc(var(--padding-inline) + 5px) top 50%, right var(--padding-inline) top 50%;
                    background-size: sugar.scalable(5px) sugar.scalable(5px), sugar.scalable(5px) sugar.scalable(5px);
                
                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        background-position: left var(--padding-inline) top 50%, left calc(var(--padding-inline) + sugar.scalable(5px)) top 50%;
                    }
                }

                `);
                break;
            }
    }
    if (finalParams.scope.includes('shape')) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    border-radius: 0;
                `);
                break;
            case 'pill':
                vars.push(`
                    border-radius: 9999px;
                `);
                break;
            default:
                vars.push(`
                    border-radius: sugar.border.radius(ui.select.borderRadius);
                `);
                break;
        }
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQzthQUNsRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztnQkFDckMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7YUFDbEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQztnQkFDaEMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7YUFDcEM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUUQsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWhFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLE9BQU8sRUFDZCxLQUFLLEVBQUUsU0FBUyxFQUNoQixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUM1QixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7T0FPWCxDQUFDLENBQUM7S0FDSjtJQUVELFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtRQUN2QixLQUFLLE9BQU8sQ0FBQztRQUNiO1lBQ0ksSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkFxQ1QsQ0FBQyxDQUFDO2dCQUVILE1BQU07YUFDVDtLQUNSO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNyQyxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsS0FBSyxRQUFRO2dCQUNULElBQUksQ0FBQyxJQUFJLENBQUM7O2lCQUVULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1YsS0FBSyxNQUFNO2dCQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7O2lCQUVULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1Y7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7aUJBRVQsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9