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

export interface IPostcssUiDatetimePickerParams {
    scope: ('bare' | 'lnf' | 'theme')[];
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

export default function ({
    params,
    atRule,
    sharedData,
    replaceWith,
}: {
    params: Partial<IPostcssUiDatetimePickerParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiDatetimePickerParams = {
        scope: ['bare', 'lnf', 'theme'],
        ...params,
    };

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
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
    }

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
        `);

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
    }

    if (finalParams.scope.includes('theme')) {
        vars.push(`
            @s.highlightjs.theme;
        `);
    }

    return vars;
}
