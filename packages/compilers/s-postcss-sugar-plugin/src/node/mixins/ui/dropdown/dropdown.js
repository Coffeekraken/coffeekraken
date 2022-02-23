import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          dropdown
 * @namespace     ui.dropdown
 * @type          CssMixin
 * @interface     ./dropdown          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the dropdown style to any element
 *
 * @param       {'solid'}           [style='theme.ui.dropdown.defaultStyle']        The style you want for your dropdown
 * @param       {'default'|'square'|'pill'}     [shape=theme.ui.dropdown.defaultShape]      The shape you want for your dropdown
 * @param       {('bare'|'lnf'|'shape'|'position')[]}      [scope=['bare','lnf','shape','position']]                      The scope(s) you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-dropdown {
 *    @sugar.ui.dropdown;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginUiDropdownInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.config('ui.dropdown.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.config('ui.dropdown.defaultShape'),
            },
            position: {
                type: 'String',
                values: [
                    'top',
                    'top-start',
                    'top-end',
                    'bottom',
                    'bottom-start',
                    'bottom-end',
                ],
                default: 'bottom',
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'position'],
                default: ['bare', 'lnf', 'shape', 'position'],
            },
        };
    }
}
export { postcssSugarPluginUiDropdownInterface as interface };
export default function ({ params, atRule, applyNoScopes, replaceWith, }) {
    const finalParams = Object.assign({ style: 'solid', shape: 'default', position: 'bottom', scope: [] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
    const vars = [];
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: sugar.scalable(1rem);
          position: absolute;
          -webkit-appearance: none;
          appearance: none;
          line-height: 1;
          outline: 0;
          white-space: nowrap;
          cursor: auto;
          z-index: 10;

            @sugar.state.disabled {
                @sugar.disabled;
                opacity: 0 !important;
            }
      `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
        `);
        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`
                    background-color: sugar.color(base);
                    padding-inline: sugar.theme(ui.dropdown.paddingInline);
                    padding-block: sugar.theme(ui.dropdown.paddingBlock);
                    border: sugar.theme(ui.dropdown.borderWidth) solid sugar.color(current, border);
                    @sugar.depth(sugar.theme.value(ui.dropdown.depth));
                    @sugar.transition(fast);
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
                    border-radius: sugar.theme(ui.dropdown.borderRadius);
                `);
                break;
        }
    }
    if (finalParams.scope.indexOf('position') !== -1) {
        switch (finalParams.position) {
            case 'top':
                vars.push(`
                    bottom: 100%;
                    top: auto;
                    left: 50%;
                    transform: translateX(-50%);
                `);
                break;
            case 'top-end':
                vars.push(`
                    bottom: 100%;
                    top: auto;
                    left: auto;
                    right: 0;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: auto;
                        left: 0;
                    }

                `);
                break;
            case 'top-start':
                vars.push(`
                    bottom: 100%;
                    top: auto;
                    left: 0;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: 0;
                        left: auto;
                    }
                `);
                break;
            case 'bottom-start':
                vars.push(`
                    top: 100%;
                    left: 0;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: 0;
                        left: auto;
                    }
                `);
                break;
            case 'bottom-end':
                vars.push(`
                    top: 100%;
                    right: 0;
                    left: auto;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: auto;
                        left: 0;
                    }
                `);
                break;
            case 'bottom':
            default:
                vars.push(`
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                `);
                break;
        }
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcGRvd24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkcm9wZG93bi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0scUNBQXNDLFNBQVEsWUFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsMEJBQTBCLENBQUM7YUFDdkQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQ3JDLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDO2FBQ3ZEO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRTtvQkFDSixLQUFLO29CQUNMLFdBQVc7b0JBQ1gsU0FBUztvQkFDVCxRQUFRO29CQUNSLGNBQWM7b0JBQ2QsWUFBWTtpQkFDZjtnQkFDRCxPQUFPLEVBQUUsUUFBUTthQUNwQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQztnQkFDNUMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxDQUFDO2FBQ2hEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQWVELE9BQU8sRUFBRSxxQ0FBcUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU5RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUNiLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsT0FBTyxFQUNkLEtBQUssRUFBRSxTQUFTLEVBQ2hCLFFBQVEsRUFBRSxRQUFRLEVBQ2xCLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixXQUFXLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFckQsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O09BZVgsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDVCxDQUFDLENBQUM7UUFFSCxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsS0FBSyxPQUFPLENBQUM7WUFDYjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O2lCQU9ULENBQUMsQ0FBQztnQkFFSCxNQUFNO1NBQ2I7S0FDSjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDckMsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLEtBQUssUUFBUTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOztpQkFFVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssTUFBTTtnQkFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOztpQkFFVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7O2lCQUVULENBQUMsQ0FBQztnQkFDSCxNQUFNO1NBQ2I7S0FDSjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDOUMsUUFBUSxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQzFCLEtBQUssS0FBSztnQkFDTixJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztpQkFLVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssU0FBUztnQkFDVixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7O2lCQWFULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1YsS0FBSyxXQUFXO2dCQUNaLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7O2lCQVdULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1YsS0FBSyxjQUFjO2dCQUNmLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7aUJBVVQsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVixLQUFLLFlBQVk7Z0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7aUJBV1QsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVixLQUFLLFFBQVEsQ0FBQztZQUNkO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7aUJBSVQsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9