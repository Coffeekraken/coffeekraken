import __SInterface from '@coffeekraken/s-interface';
/**
 * @name          inputContainer
 * @as          @sugar.ui.inputContainer
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxNQUFNLHNDQUF1QyxTQUFRLFlBQVk7SUFDN0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2dCQUMxQixRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7YUFDM0I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT0QsT0FBTyxFQUFFLHNDQUFzQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsR0FBRyxFQUFFLE9BQU8sRUFDWixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQzs7U0FFVCxDQUFDLENBQUM7S0FDTjtJQUVELFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUNyQixLQUFLLE9BQU87WUFDUixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQXlCVCxDQUFDLENBQUM7YUFDTjtZQUNELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7YUFDdEM7WUFFRCxNQUFNO1FBQ1YsS0FBSyxPQUFPLENBQUM7UUFDYjtZQUNJLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQWdDVCxDQUFDLENBQUM7YUFDTjtZQUNELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7YUFDdEM7WUFFRCxNQUFNO0tBQ2I7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=