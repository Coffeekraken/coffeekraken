import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssUiFiltrableInputInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid', 'gradient', 'outline', 'text'],
                default: __STheme.get('ui.button.defaultStyle'),
            },
            outline: {
                type: 'Boolean',
                default: __STheme.get('ui.button.outline'),
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
export { postcssUiFiltrableInputInterface as interface };
/**
 * @name          filtrableInput
 * @namespace     ui.filtrableInput
 * @type               PostcssMixin
 * @interface     ./button          interface
 * @platform      css
 * @status        beta
 *
 * Apply the filtrable input style to any s-filtrable-input element
 *
 * @example     css
 * .s-filtrable-input {
 *    @sugar.ui.filtrableInput;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ style: __STheme.get('ui.button.defaultStyle'), outline: true, scope: ['bare', 'lnf'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
    `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`

            .s-filtrable-input__dropdown {
                @sugar.depth(ui.filtrableInput.depth);
                transition: sugar.theme(ui.filtrableInput.transition);
            }

            .s-filtrable-input__keywords {
                padding: sugar.padding(ui.filtrableInput.paddingBlock) sugar.padding(ui.filtrableInput.paddingInline);
            }

            .s-filtrable-input__list {
                width: 100%;
                transition: sugar.theme(ui.filtrableInput.transition);
                @sugar.scrollbar;
            }
            .s-filtrable-input__list-item {
                transition: sugar.theme(ui.filtrableInput.transition);
            }
        `);
        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`

                .s-filtrable-input__dropdown {
                    background-color: sugar.color(base, background);
                    border-radius: sugar.border.radius(ui.filtrableInput.borderRadius);
                }

                .s-filtrable-input__keywords {
                    background: sugar.color(main, background);
                }

                .s-filtrable-input__list-item {
                    padding-inline: sugar.padding(ui.filtrableInput.paddingInline);
                    padding-block: sugar.padding(ui.filtrableInput.paddingBlock);
                    border-top: 1px solid sugar.color(base, background, --lighten 5);

                    &:hover,
                    &:focus,
                    &:focus:not(.active),
                    &:focus:not(:active) {
                        &:not(.s-filtrable-input__list-no-item):not(.s-filtrable-input__list-loading) {
                            border-top: 1px solid sugar.color(base, --alpha 0);
                            background-color: sugar.color(base, --alpha 0.6);
                            color: sugar.color(base, foreground);
                        }
                    }

                    &.active,
                    &:active {
                        &:not(.s-filtrable-input__list-no-item):not(.s-filtrable-input__list-loading) {
                            border-top: 1px solid sugar.color(accent) !important;
                            background-color: sugar.color(accent) !important;
                            color: sugar.color(accent, foreground) !important;
                        }
                    }
                }
        `);
                break;
        }
        if (finalParams.outline) {
            vars.push(`
            

          `);
        }
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQztnQkFDaEQsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7YUFDbEQ7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7YUFDN0M7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVFELE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFFSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxFQUM3QyxPQUFPLEVBQUUsSUFBSSxFQUNiLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQztLQUNiLENBQUMsQ0FBQztLQUNGO0lBRUQsTUFBTTtJQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQW1CVCxDQUFDLENBQUM7UUFFSCxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsS0FBSyxPQUFPLENBQUM7WUFDYjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FvQ2pCLENBQUMsQ0FBQztnQkFDSyxNQUFNO1NBQ2I7UUFFRCxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQzs7O1dBR1gsQ0FBQyxDQUFDO1NBQ0o7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==