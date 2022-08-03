import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          checkbox
 * @namespace     node.mixin.ui.checkbox
 * @type               PostcssMixin
 * @interface     ./checkbox          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the checkbox style to any element
 *
 * @param       {'solid'}                           [style='theme.ui.checkbox.defaultStyle']         The style(s) you want to generate
 * @param       {'default'|'square'|'circle'}             [shape='theme.ui.checkbox.defaultShape']         The shape you want to generate
 * @param       {'bare'|'lnf'|'shape'}        [scope=['bare', 'lnf', 'shape']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-checkbox {
 *    @sugar.ui.checkbox;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiCheckboxInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.checkbox.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'circle'],
                default: __STheme.get('ui.checkbox.defaultShape'),
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
export { postcssSugarPluginUiCheckboxInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: 'solid', shape: 'default', scope: ['bare', 'lnf', 'shape'] }, params);
    const vars = [``];
    switch (finalParams.style) {
        case 'solid':
            // bare
            if (finalParams.scope.indexOf('bare') !== -1) {
                vars.push(`
                
                appearance: none !important;
                -moz-appearance: none !important;
                -webkit-appearance: none !important;
                position: relative;
                width: 1.4em;
                height: 1.4em;
                font-size: sugar.scalable(1rem);
                margin-block: 0.7em 0.9em;

                &:disabled {
                    @sugar.disabled;
                }
            `);
            }
            // lnf
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                
                    transition: sugar.theme(ui.checkbox.transition);
                    border: sugar.theme(ui.checkbox.borderWidth) solid sugar.color(current);
                    background-color: transparent;
                    transition: sugar.theme(ui.checkbox.transition);
                    box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.2);

                    &:after {
                        content: '';
                        position: absolute;
                        top: 50%; left: 50%;
                        width: 0.4em; height: 0.4em;
                        transform: translate(-50%, -50%);
                        background: sugar.color(current);
                        opacity: 0;
                        transition: sugar.theme(ui.checkbox.transition);
                    }
                    label:hover > &:not(:disabled):after,
                    &:hover:not(:disabled):after {
                        opacity: 0.2;
                    }
                    &:checked:not(:disabled):after {
                        opacity: 1 !important;
                    }

                    &:focus:not(:hover):not(:active):not(:disabled) {
                        box-shadow: 0 0 0 sugar.theme(ui.outline.borderWidth) sugar.color(current, --alpha 0.3);
                    }
 
        `);
            }
    }
    if (finalParams.scope.includes('shape')) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    border-radius: 0;
                `);
                break;
            case 'circle':
                vars.push(`
                    border-radius: 9999px;
                `);
                break;
            default:
                vars.push(`
                    border-radius: sugar.border.radius(ui.checkbox.borderRadius);
                `);
                break;
        }
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSxxQ0FBc0MsU0FBUSxZQUFZO0lBQzVELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQzthQUNwRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQztnQkFDdkMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUM7YUFDcEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQztnQkFDaEMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7YUFDcEM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUUQsT0FBTyxFQUFFLHFDQUFxQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQzlELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLE9BQU8sRUFDZCxLQUFLLEVBQUUsU0FBUyxFQUNoQixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUM1QixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFNUIsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3ZCLEtBQUssT0FBTztZQUNSLE9BQU87WUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7OzthQWNiLENBQUMsQ0FBQzthQUNGO1lBRUQsTUFBTTtZQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQThCakIsQ0FBQyxDQUFDO2FBQ0U7S0FDUjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDckMsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLEtBQUssUUFBUTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOztpQkFFVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssUUFBUTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOztpQkFFVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7O2lCQUVULENBQUMsQ0FBQztnQkFDSCxNQUFNO1NBQ2I7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==