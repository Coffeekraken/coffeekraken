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
 * @snippet         @sugar.ui.codeExample($1);
 *
 * @example     css
 * .s-code-example {
 *    @sugar.ui.codeExample;
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

    // wireframe
    vars.push(`
        .s-code-example_content {
            @sugar.wireframe {
                @sugar.wireframe.background;
                @sugar.wireframe.border;    
            }
        }
    `);

    if (finalParams.scope.includes('theme')) {
        vars.push(`
            @sugar.highlightjs.theme;
        `);
    }

    return vars;
}
