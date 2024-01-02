import __SInterface from '@coffeekraken/s-interface';
class postcssUiDatetimePickerInterface extends __SInterface {
    static get _definition() {
        return {};
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
export default function ({ params, atRule, sharedData, replaceWith, }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBMkJULENBQUMsQ0FBQztJQUNILElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixNQUFNO0lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRTlCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQWlDTCxDQUFDLENBQUM7SUFFUCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztTQUlMLENBQUMsQ0FBQztJQUVQLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==