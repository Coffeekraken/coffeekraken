import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiDatetimePickerClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            defaultColor: {
                type: 'String',
                default: __STheme.get('ui.filtrableInput.defaultColor'),
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default:
                    __STheme.get('ui.filtrableInput.defaultStyle') ?? 'solid',
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

export interface IPostcssUiDatetimePickerInputClassesParams {
    styles: 'solid'[];
    defaultStyle: 'solid';
    defaultColor: string;
    scope: ('bare' | 'lnf')[];
}

export { postcssUiDatetimePickerClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssUiDatetimePickerInputClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiDatetimePickerInputClassesParams = {
        styles: ['solid'],
        defaultStyle: 'solid',
        defaultColor: 'main',
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars = new CssVars();

    if (finalParams.styles.includes('solid')) {
        vars.code(`

    s-datetime-picker[lnf='default'] {
        color: sugar.color(text);

        .s-datetime-picker__actions {
            display: flex;
            gap: sugar.margin(20);

            button {
                flex-grow: 1;
                text-align: center;
            }
        }

        .s-datetime-picker__picker {
            @sugar.depth (ui.datetimePicker.depth);
            background: sugar.color(main, background);
            padding: sugar.padding(30);
            overflow: hidden;
            transition: sugar.transition(fast);
            transition-property: opacity, transform;
            border-radius: sugar.border.radius();

            @sugar.media <=mobile {
                border-radius: 0;
            }
        }
        &[inline] .s-datetime-picker__picker {
            box-shadow: none;
        }

        .s-datetime-picker__calendar {
            margin-block-end: sugar.margin(30);
            color: sugar.color(base, text);
        }

        .s-datetime-picker__calendar-day {
            padding: sugar.padding(10);
            font-weight: bold;
        }

        .s-datetime-picker__calendar-item {
            padding: sugar.padding(10);
            border-radius: sugar.border.radius();
            display: flex;
            align-items: center;
            justify-content: center;
            width: 5ch;
            aspect-ratio: 1;

            &.disabled {
                opacity: 1 !important;
                color: sugar.color(base, text, --alpha 0.15);
                position: relative;

                &:after {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 60%;
                    height: 3px;
                    background: sugar.color(error);
                    border-radius: sugar.border-radius();
                    transform-origin: 50% 50%;
                    transform: translate(-50%, -50%) rotate(-10deg);
                    opacity: 0.1;
                }
            }

            &.today {
                background: sugar.color(current, --alpha 0.2);
            }
            &.active {
                background: sugar.color(current);
                color: sugar.color(current, foreground);
            }

            &:hover {
                background: sugar.color(current);
                color: sugar.color(current, foreground);
            }
        }

        .s-datetime-picker__date-selectors,
        .s-datetime-picker__time-selectors {
            border: 1px solid sugar.color(main, border);
            border-radius: sugar.border.radius();
            margin-block-end: sugar.margin(30);
            background: sugar.color(main, surface);

            &:before {
                content: '';
                display: block;
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                height: 2px;
                transform: translate(0, -50%);
                background: sugar.color(main, border);
            }
            &:after {
                content: '';
                display: block;
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                height: 100%;
                transform: translate(0, -50%);
                background: linear-gradient(
                    0,
                    sugar.color(main, surface, --darken 5),
                    sugar.color(main, surface, --alpha 0),
                    sugar.color(main, surface, --alpha 0),
                    sugar.color(main, surface, --darken 5)
                );
                pointer-events: none;
                /* box-shadow: inset 0 0 20px sugar.color(main, surface, --darken 10); */
                border-radius: sugar.border.radius();
            }
        }

        .s-datetime-picker__time-selectors {
            .s-datetime-picker__selector-item {
                font-size: 2em;

                span {
                    padding: 0.5em sugar.padding(30) !important;
                }
            }
        }

        .s-datetime-picker__selector {
            position: relative;
            overflow-y: auto;
            scroll-snap-type: y mandatory;
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none;
            border-inline-end: 1px solid sugar.color(main, border);
            user-select: none;

            &:last-child {
                border-inline-end: none;
            }

            &::-webkit-scrollbar {
                display: none;
            }

            &.scrolling .s-datetime-picker__selector-item {
                opacity: 1;
            }
        }

        .s-datetime-picker__selector-item {
            scroll-snap-align: center;
            text-align: center;
            color: sugar.color(base, text);
            font-weight: bold;
            opacity: 0.6;
            @sugar.transition (fast);

            &.active {
                opacity: 1;
            }

            &.disabled {
                opacity: 1 !important;
                color: sugar.color(base, text, --alpha 0.15);

                span {
                    position: relative;

                    &:after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 60%;
                        height: 3px;
                        background: sugar.color(error);
                        border-radius: sugar.border-radius();
                        transform-origin: 50% 50%;
                        transform: translate(-50%, -50%) rotate(-10deg);
                        opacity: 0.1;
                    }
                }
            }

            span {
                height: 100%;
                display: inline-block;
                padding: 1em sugar.padding(30);
                background: sugar.color(main, surface);
            }
        }
    }
        `);
    }

    return vars;
}
