import __SInterface from '@coffeekraken/s-interface';
/**
 * @name          inputContainer
 * @namespace     node.mixin.ui.inputContainer
 * @type               PostcssMixin
 * @interface       ./input
 * @platform      postcss
 * @status        beta
 *
 * Apply an input container style like "button", "addon", etc...
 *
 * @param       {'addon'|'group'}                           lnf         The style you want to apply
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.inputContainer
 *
 * @example     css
 * .my-input-container {
 *    @sugar.ui.inputContainer(group);
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiFormInputInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['addon', 'group'],
                required: true,
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}
export { postcssSugarPluginUiFormInputInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'group', scope: [] }, params);
    const vars = [];
    if (finalParams.scope.includes('bare')) {
        vars.push(`
            width: 100%;
        `);
    }
    switch (finalParams.lnf) {
        case 'addon':
            if (finalParams.scope.includes('bare')) {
                vars.push(`
                    display: block;
                    position: relative;

                    & > *:first-child {
                        width: 100%;
                        padding-inline-end: 3em;
                    }
                    & > *:first-child + * {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: absolute;
                        height: 100%;
                        aspect-ratio: 1;
                        top: 0; right: 0;
                    }

                    [dir="rtl"] &, &[dir="rtl"] {
                        & > *:first-child + * {
                            right: auto;
                            left: 0;
                        }
                    }

                `);
            }
            if (finalParams.scope.includes('lnf')) {
            }
            break;
        case 'group':
        default:
            if (finalParams.scope.includes('bare')) {
                vars.push(`
                    display: flex;

                    &:not([dir="rtl"] &):not([dir="rtl"]) {
                        & > *:first-child,
                        & > .s-input-container > *:first-child {
                            border-top-right-radius: 0;
                            border-bottom-right-radius: 0;
                        }
                        & > *:last-child,
                        & > .s-input-container > *:last-child {
                            border-top-left-radius: 0;
                            border-bottom-left-radius: 0;
                        }
                    }
                    [dir="rtl"] &, &[dir="rtl"] {
                        & > *:first-child,
                        & > .s-input-container > *:first-child {
                            border-top-left-radius: 0;
                            border-bottom-left-radius: 0;
                        }
                        & > *:last-child,
                        & > .s-input-container > *:last-child {
                            border-top-right-radius: 0;
                            border-bottom-right-radius: 0;
                        }
                    }

                    & > *:not(:first-child, :last-child),
                    & > .s-input-container > *:not(:first-child, :last-child) {
                        border-radius: 0;
                    }
                `);
            }
            if (finalParams.scope.includes('lnf')) {
            }
            break;
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sc0NBQXVDLFNBQVEsWUFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7Z0JBQzFCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPRCxPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixHQUFHLEVBQUUsT0FBTyxFQUNaLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDOztTQUVULENBQUMsQ0FBQztLQUNOO0lBRUQsUUFBUSxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQ3JCLEtBQUssT0FBTztZQUNSLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBeUJULENBQUMsQ0FBQzthQUNOO1lBQ0QsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTthQUN0QztZQUVELE1BQU07UUFDVixLQUFLLE9BQU8sQ0FBQztRQUNiO1lBQ0ksSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBZ0NULENBQUMsQ0FBQzthQUNOO1lBQ0QsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTthQUN0QztZQUVELE1BQU07S0FDYjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==