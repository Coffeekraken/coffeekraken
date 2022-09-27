import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiDatetimePickerInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.datetimePicker.defaultStyle'),
            },
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
    style: 'solid';
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
 * @example     css
 * .s-datetime-picker {
 *    @sugar.ui.datetimePicker;
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
        style: __STheme.get('ui.datetimePicker.defaultStyle'),
        scope: ['bare', 'lnf', 'theme'],
        ...params,
    };

    const vars: string[] = [];

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

        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`


                .s-code-example__content {
                    transition: sugar.transition(ui.codeExample.transition);
                    border-radius: sugar.border.radius(ui.codeExample.borderRadius);
                    @sugar.depth (ui.codeExample.depth);
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
                break;
        }
    }

    if (finalParams.scope.includes('theme')) {
        vars.push(`
            @sugar.highlightjs.theme;
        `);
    }

    return vars;
}
