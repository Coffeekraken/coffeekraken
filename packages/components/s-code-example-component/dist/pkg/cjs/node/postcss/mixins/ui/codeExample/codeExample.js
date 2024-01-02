"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssUiDatetimePickerInterface extends s_interface_1.default {
    static get _definition() {
        return {};
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
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       theme           The highlightjs theme css
 *
 * @snippet         @s.ui.codeExample($1);
 *
 * @example     css
 * .s-code-example {
 *    @s.ui.codeExample;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    // bare
    vars.push(`@s.scope 'bare' {`);
    vars.push(`

            .s-code-example_content {
                --paddingBlock: s.padding(ui.codeExample.paddingBlock);

                @s.media (mobile) {
                    --paddingBlock: calc(var(--paddingBlock) * 0.5);
                }
            }

            .s-code-example_more-bar {
                padding-inline: s.padding(ui.default.paddingInline);
                padding-block: s.padding(ui.default.paddingBlock);
            }


            .s-code-example_toolbar {
                position: absolute;
                right: s.margin(20);
                top: s.margin(20);
            }

            [toolbar-position='nav'] .s-code-example_toolbar {
                right: s.margin(20);
                top: s.margin(20);
            }

    `);
    vars.push('}');
    // lnf
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`
            @s.color(main);

                .s-code-example_content {
                    transition: s.transition(ui.codeExample.transition);
                    border-radius: s.border.radius(ui.codeExample.borderRadius);
                    @s.depth (ui.codeExample.depth);
                }

                .s-code-example_code {
                    &:not(:has(.hljs)) {
                        padding: s.padding(ui.codeExample.paddingBlock) s.padding(ui.codeExample.paddingInline);
                    }
                    .hljs {
                        padding: s.padding(ui.codeExample.paddingBlock) s.padding(ui.codeExample.paddingInline) !important;
                    }
                }

                .s-code-example_more-bar {
                    &:before {
                        transition: s.transition(ui.codeExample.transition);

                        @s.gradient ($type: linear, $start: s.color(current, surface), $end: s.color(current, --alpha 0), $angle: 0);
                    }
                }

                .s-code-example_toolbar {
                    & > * {
                        color: s.color(current);
                        font-size: 20px;
                    }
                }

        `);
    vars.push('}');
    vars.push(`
            @s.scope 'theme' {
                @s.highlightjs.theme;
            }
        `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLGdDQUFpQyxTQUFRLHFCQUFZO0lBQ3ZELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSTRDLHFEQUFTO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQTJCVCxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUU5QixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FpQ0wsQ0FBQyxDQUFDO0lBRVAsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7U0FJTCxDQUFDLENBQUM7SUFFUCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBaEdELDRCQWdHQyJ9