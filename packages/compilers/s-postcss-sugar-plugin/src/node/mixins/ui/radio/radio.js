import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          radio
 * @namespace     ui.radio
 * @type          CssMixin
 * @interface     ./radio          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the radio style to any element
 *
 * @param       {'solid'}           [style='theme.ui.radio.defaultStyle']        The style you want for your radio
 * @param       {'default'|'square'|'pill'}     [shape=theme.ui.radio.defaultShape]      The shape you want for your radio
 * @param       {('bare'|'lnf'|'shape')[]}      [scope=['bare','lnf','shape']]                      The scope(s) you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-radio {
 *    @sugar.ui.radio;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginUiRadioInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.config('ui.radio.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'pill', 'circle'],
                default: __STheme.config('ui.radio.defaultShape'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'vr'],
                default: ['bare', 'lnf', 'shape', 'vr'],
            },
        };
    }
}
export { postcssSugarPluginUiRadioInterface as interface };
export default function ({ params, atRule, applyNoScopes, replaceWith, }) {
    const finalParams = Object.assign({ style: 'solid', shape: 'default', scope: ['bare', 'lnf', 'shape', 'vr'] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
    const vars = [
        `
        
`,
    ];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
                
                appearance: none;
                -moz-appearance: none;
                -webkit-appearance: none;
                position: relative;
                width: 1em;
                height: 1em;
                font-size: sugar.scalable(1rem);

                &:disabled {
                    @sugar.disabled;
                }
            `);
    }
    switch (finalParams.style) {
        case 'solid':
            // lnf
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                
                    transition: sugar.theme(ui.radio.transition);
                    border: sugar.theme(ui.radio.borderWidth) solid sugar.color(current);
                    background-color: transparent;
                    transition: sugar.theme(ui.radio.transition);
                    box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.2);

                    &:after {
                        content: '';
                        position: absolute;
                        top: 50%; left: 50%;
                        width: 0.4em; height: 0.4em;
                        transform: translate(-50%, -50%);
                        background: sugar.color(current);
                        opacity: 0;
                        transition: sugar.theme(ui.radio.transition);
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
                    &:after {
                        border-radius: 0;
                    }
                `);
                break;
            case 'pill':
            case 'circle':
                vars.push(`
                    border-radius: 9999px;
                    &:after {
                        border-radius: 9999px;
                    }
                `);
                break;
            default:
                vars.push(`
                    border-radius: sugar.theme(ui.radio.borderRadius);
                    &:after {
                        border-radius: sugar.theme(ui.radio.borderRadius);
                    }
                `);
                break;
        }
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYWRpby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0sa0NBQW1DLFNBQVEsWUFBWTtJQUN6RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUM7YUFDcEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO2dCQUMvQyxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQzthQUNwRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQztnQkFDdEMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDO2FBQzFDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVFELE9BQU8sRUFBRSxrQ0FBa0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUMzRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUNiLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsT0FBTyxFQUNkLEtBQUssRUFBRSxTQUFTLEVBQ2hCLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxJQUNsQyxNQUFNLENBQ1osQ0FBQztJQUNGLFdBQVcsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVyRCxNQUFNLElBQUksR0FBYTtRQUNuQjs7Q0FFUDtLQUNJLENBQUM7SUFFRixPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7O2FBYUwsQ0FBQyxDQUFDO0tBQ1Y7SUFFRCxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDdkIsS0FBSyxPQUFPO1lBQ1IsTUFBTTtZQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQThCakIsQ0FBQyxDQUFDO2FBQ0U7S0FDUjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDckMsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLEtBQUssUUFBUTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztpQkFLVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssTUFBTSxDQUFDO1lBQ1osS0FBSyxRQUFRO2dCQUNULElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O2lCQUtULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1Y7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7aUJBS1QsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9