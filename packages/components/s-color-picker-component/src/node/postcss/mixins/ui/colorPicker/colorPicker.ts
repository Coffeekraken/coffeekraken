import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiColorPickerInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.colorPicker.defaultStyle'),
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

export interface IPostcssUiColorPickerParams {
    style: 'solid';
    scope: ('bare' | 'lnf')[];
}

export { postcssUiColorPickerInterface as interface };

/**
 * @name          colorPicker
 * @namespace     ui.colorPicker
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the color picker style to any s-color-picker element
 *
 * @example     css
 * .s-color-picker {
 *    @sugar.ui.colorPicker;
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
    params: Partial<IPostcssUiColorPickerParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiColorPickerParams = {
        style: __STheme.get('ui.colorPicker.defaultStyle'),
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`

        @sugar.media <=mobile {
            position: unset;
        }

        .s-color-picker__picker {
            @sugar.media <=mobile {
                position: fixed;
                bottom: 0;
                top: auto !important;
                left: 0 !important;
                right: auto;
                width: 100vw;
                transform: translate(0, 100%);

                transform: translate(0, 0);
                opacity: 1 !important;
            }
        }

        &:focus-within {
            .s-color-picker__picker {
                @sugar.media <=mobile {
                    transform: translate(0, 0);
                }
            }
        }
        

        .s-color-picker__picker {

            .s-color-picker__shade-wrapper {
                @sugar.media <=mobile {
                    position: relative;
                    aspect-ratio: unset;
                }
            }

            .s-color-picker__selectors {
                gap: sugar.margin(20);
            }

            .s-color-picker__btn,
            .s-color-picker__color-input {
                padding: sugar.padding(20) sugar.padding(30);
            }

            @sugar.media <=mobile {
                .s-color-picker__metas {
                    flex-wrap: wrap;
                }

                .s-color-picker__color {
                    margin-block-start: sugar.margin(20);
                }

                .s-color-picker__formats,
                .s-color-picker__color {
                    width: 100%;

                    .s-color-picker__btn {
                        text-align: center;
                        flex-grow: 1 !important;
                    }
                }
            }

            .s-color-picker__metas,
            .s-color-picker__actions {
                padding-block-start: sugar.padding(20);

                @sugar.media <=mobile {
                    padding-block-start: sugar.padding(30);
                }
            }

            .s-color-picker__eye-dropper {
                color: sugar.color(main, text);
            }

            .s-color-picker__actions {
                gap: sugar.margin(20);
            }
        
        }

    `);
    }

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            color: sugar.color(text);
        `);

        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`

                .s-color-picker__picker {
                    @sugar.depth (100);
                    background: sugar.color(main, background);
                    padding: sugar.padding(30);
                    overflow: hidden;
                    transition: sugar.transition(fast);
                    transition-property: opacity, transform;
                    border-radius: sugar.border.radius();

                    @sugar.media <=mobile {
                        border-radius: 0;
                        overflow: visible;
                    }
                }
                &[inline] .s-color-picker__picker {
                    background: none;
                    box-shadow: none;
                    padding: 0;
                }

                .s-color-picker__shade-wrapper,
                .s-color-picker__hue-wrapper,
                .s-color-picker__alpha-wrapper {
                    border-radius: sugar.border.radius();

                    canvas {
                        border-radius: sugar.border.radius();
                    }

                    &:after {
                        width: 20px;
                        height: 20px;
                        border-radius: 999px;
                        border: solid 10px sugar.color(main, surface);
                        border-color: white;
                        transition: border-width 0.15s ease-in-out;
                        transition-property: border-width, width, height, transform;
                        @sugar.depth (10);
                    }
                }

                .s-color-picker__alpha-wrapper {
                    &:after {
                        background: hsla(
                            0,
                            0%,
                            calc((1 - var(--s-color-picker-a)) * 100%),
                            1
                        );
                    }
                }
                .s-color-picker.is-alpha-interacting {
                    .s-color-picker__alpha-wrapper {
                        &:after {
                            border-width: 3px;
                            width: 60px;
                            height: 60px;

                            @sugar.media <=mobile {
                                height: 120px;
                                width: 60px;
                                transform: translate(-50%, calc(-100% + 30px));
                            }
                        }
                    }
                }

                .s-color-picker__shade-wrapper {
                    &:after {
                        background: hsla(
                            var(--s-color-picker-h),
                            calc(var(--s-color-picker-s) * 1%),
                            calc(var(--s-color-picker-l) * 1%),
                            var(--s-color-picker-a)
                        );
                    }
                }

                .s-color-picker.is-shade-interacting {
                    .s-color-picker__shade-wrapper {
                        &:after {
                            border-width: 3px;
                            width: 60px;
                            height: 60px;

                            @sugar.media <=mobile {
                                height: 120px;
                                width: 60px;
                                transform: translate(-50%, calc(-100% + 30px));
                            }
                        }
                    }
                }

                .s-color-picker__hue-wrapper {
                    &:after {
                        background: hsla(var(--s-color-picker-h), 100%, 50%, 1);
                    }
                }
                .s-color-picker.is-hue-interacting {
                    .s-color-picker__hue-wrapper {
                        &:after {
                            border-width: 3px;
                            width: 60px;
                            height: 60px;

                            @sugar.media <=mobile {
                                height: 120px;
                                width: 60px;
                                transform: translate(-50%, calc(-100% + 30px));
                            }
                        }
                    }
                }

                .s-color-picker__formats {
                    .s-color-picker__btn {
                        border: 1px solid sugar.color(main, border);
                        color: sugar.color(main, text);
                        font-size: 0.8em;
                        @sugar.font.family (code);

                        &:hover {
                            background: sugar.color(main, ui);
                        }

                        &:first-child {
                            border-top-left-radius: sugar.border.radius();
                            border-bottom-left-radius: sugar.border.radius();

                            @sugar.media <=mobile {
                                border-radius: 0;
                                border-top-left-radius: sugar.border.radius();
                                border-bottom-left-radius: sugar.border.radius();
                            }
                        }
                        &:nth-child(3) {
                            @sugar.media <=mobile {
                                border-top-right-radius: sugar.border.radius();
                                border-bottom-right-radius: sugar.border.radius();
                            }
                        }

                        @sugar.media >mobile {
                            &:nth-child(2),
                            &:nth-child(3) {
                                border-left: none;
                            }
                            &:nth-child(3) {
                                border-right: none;
                            }
                        }

                        &.active {
                            background: sugar.color(main, ui);
                            color: sugar.color(main, text);
                        }
                    }
                }

                @sugar.media <=mobile {
                    .s-color-picker__color-input {
                        border-top: none;
                        border-top-left-radius: sugar.border.radius();
                        border-bottom-left-radius: sugar.border.radius();
                    }
                    .s-color-picker__preview {
                    }
                }

                .s-color-picker__actions {
                    .s-color-picker__btn {
                        background: sugar.color(current);
                        color: sugar.color(current, foreground);
                        border-radius: sugar.border.radius();
                    }
                }

                .s-color-picker__color-input {
                    color: sugar.color(main, text);
                    border: solid 1px sugar.color(main, border);
                    border-right: none;
                }
                .s-color-picker__preview {
                    position: relative;
                    border: solid 1px
                        hsla(
                            var(--s-color-picker-h),
                            calc(var(--s-color-picker-s) * 1%),
                            calc(var(--s-color-picker-l) * 1%),
                            var(--s-color-picker-a)
                        );
                    border-left: none;
                    border-top-right-radius: sugar.border.radius();
                    border-bottom-right-radius: sugar.border.radius();

                    i {
                        color: white;
                        font-size: 0.8em;
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
