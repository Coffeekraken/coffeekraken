"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssUiDatetimePickerInterface extends s_interface_1.default {
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
exports.interface = postcssUiDatetimePickerInterface;
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
function default_1({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ scope: ['bare', 'lnf', 'theme'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`

            .s-code-example__content {
                --paddingBlock: sugar.padding(ui.codeExample.paddingBlock);

                @sugar.media (mobile) {
                    --paddingBlock: calc(var(--paddingBlock) * 0.5);
                }
            }

            .s-code-example__more-bar {
                padding-inline: sugar.padding(ui.default.paddingInline);
                padding-block: sugar.padding(ui.default.paddingBlock);
            }


            .s-code-example__toolbar {
                position: absolute;
                right: sugar.margin(20);
                top: sugar.margin(20);
            }

            [toolbar-position='nav'] .s-code-example__toolbar {
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


                .s-code-example__content {
                    transition: sugar.transition(ui.codeExample.transition);
                    border-radius: sugar.border.radius(ui.codeExample.borderRadius);
                    @sugar.depth (ui.codeExample.depth);
                }

                .s-code-example__code {
                    &:not(:has(.hljs)) {
                        padding: sugar.padding(ui.codeExample.paddingBlock) sugar.padding(ui.codeExample.paddingInline);
                    }
                    .hljs {
                        padding: sugar.padding(ui.codeExample.paddingBlock) sugar.padding(ui.codeExample.paddingInline) !important;
                    }
                }

                .s-code-example__more-bar {
                    &:before {
                        transition: sugar.transition(ui.codeExample.transition);

                        @sugar.gradient ($type: linear, $start: sugar.color(current, surface), $end: sugar.color(current, --alpha 0), $angle: 0);
                    }
                }

                .s-code-example__toolbar {
                    & > * {
                        color: sugar.color(current);
                        font-size: 20px;
                        opacity: 0.4;

                        &:hover {
                            opacity: 0.8;
                        }
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLGdDQUFpQyxTQUFRLHFCQUFZO0lBQ3ZELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQztnQkFDaEMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7YUFDcEM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTTRDLHFEQUFTO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUM1QixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0EyQmIsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQ1QsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FzQ1QsQ0FBQyxDQUFDO0tBQ047SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUM7O1NBRVQsQ0FBQyxDQUFDO0tBQ047SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBdkdELDRCQXVHQyJ9