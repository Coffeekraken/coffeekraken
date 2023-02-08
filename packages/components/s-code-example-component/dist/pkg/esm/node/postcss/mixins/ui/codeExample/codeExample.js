import __SInterface from '@coffeekraken/s-interface';
class postcssUiDatetimePickerInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'theme'],
                default: ['bare', 'lnf', 'theme'],
            },
        };
    }
}
export { postcssUiDatetimePickerInterface as interface };
/**
 * @name          datetimePicker
 * @namespace     ui.datetimePicker
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the datetime picker style to any s-datetime-picker element
 *
 * @example     css
 * .s-datetime-picker {
 *    @sugar.ui.datetimePicker;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ scope: ['bare', 'lnf', 'theme'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`

            .s-code-example_content {
                --paddingBlock: sugar.padding(ui.codeExample.paddingBlock);

                @sugar.media (mobile) {
                    --paddingBlock: calc(var(--paddingBlock) * 0.5);
                }
            }

            .s-code-example_more-bar {
                padding-inline: sugar.padding(ui.default.paddingInline);
                padding-block: sugar.padding(ui.default.paddingBlock);
            }


            .s-code-example_toolbar {
                position: absolute;
                right: sugar.margin(20);
                top: sugar.margin(20);
            }

            [toolbar-position='nav'] .s-code-example_toolbar {
                right: sugar.margin(20);
                top: sugar.margin(20);
            }

    `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
        `);
        vars.push(`
            @sugar.color(main);

                .s-code-example_content {
                    transition: sugar.transition(ui.codeExample.transition);
                    border-radius: sugar.border.radius(ui.codeExample.borderRadius);
                    @sugar.depth (ui.codeExample.depth);
                }

                .s-code-example_code {
                    &:not(:has(.hljs)) {
                        padding: sugar.padding(ui.codeExample.paddingBlock) sugar.padding(ui.codeExample.paddingInline);
                    }
                    .hljs {
                        padding: sugar.padding(ui.codeExample.paddingBlock) sugar.padding(ui.codeExample.paddingInline) !important;
                    }
                }

                .s-code-example_more-bar {
                    &:before {
                        transition: sugar.transition(ui.codeExample.transition);

                        @sugar.gradient ($type: linear, $start: sugar.color(current, surface), $end: sugar.color(current, --alpha 0), $angle: 0);
                    }
                }

                .s-code-example_toolbar {
                    & > * {
                        color: sugar.color(current);
                        font-size: 20px;
                    }
                }

        `);
    }
    if (finalParams.scope.includes('theme')) {
        vars.push(`
            @sugar.highlightjs.theme;
        `);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7Z0JBQ2hDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO2FBQ3BDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQzVCLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTJCYixDQUFDLENBQUM7S0FDRjtJQUVELE1BQU07SUFDTixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDVCxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FpQ1QsQ0FBQyxDQUFDO0tBQ047SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUM7O1NBRVQsQ0FBQyxDQUFDO0tBQ047SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=