import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssUiDatetimePickerInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.datetimePicker.defaultLnf'),
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
export { postcssUiDatetimePickerInterface as interface };
/**
 * @name          datetimePicker
 * @namespace     ui.datetimePicker
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the datetime picker lnf to any s-datetime-picker element
 *
 * @snippet         @sugar.ui.datetimePicker($1);
 *
 * @example     css
 * .s-datetime-picker {
 *    @sugar.ui.datetimePicker();
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ lnf: __STheme.get('ui.datetimePicker.defaultLnf'), scope: ['bare', 'lnf'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`

            @sugar.media <=mobile {
                position: unset;
            }

            &:focus-within {
                .s-datetime-picker_picker {

                    @sugar.media <=mobile {
                        transform: translate(0, 0);
                    }
                }
            }

            .s-datetime-picker_calendar-item {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 5ch;
                aspect-ratio: 1;

                &.disabled {
                    opacity: 1 !important;
                    position: relative;
                }
            }

            .s-datetime-picker_selector {
                position: relative;
                overflow-y: auto;
                scroll-snap-type: y mandatory;
                -ms-overflow-style: none; /* IE and Edge */
                scrollbar-width: none;
                user-select: none;

                &::-webkit-scrollbar {
                    display: none;
                }

                &.scrolling .s-datetime-picker_selector-item {
                    opacity: 1;
                }
            }

            .s-datetime-picker_selector-item {
                scroll-snap-align: center;
                text-align: center;
                opacity: 0.6;
                
                &.active {
                    opacity: 1;
                }

                &.disabled {
                    opacity: 1 !important;
                }

                span {
                    height: 100%;
                    display: inline-block;
                }
            }


    `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
        `);
        switch (finalParams.lnf) {
            case 'solid':
            default:
                vars.push(`

                    color: sugar.color(text);

                    .s-datetime-picker_actions {
                        gap: sugar.margin(20);
                    }

                    .s-datetime-picker_picker {
                        @sugar.depth (ui.datetimePicker.depth);
                        background: sugar.color(main, background);
                        padding: sugar.padding(30);
                        overflow: hidden;
                        transition: sugar.transition(ui.datetimePicker.transition);
                        transition-property: opacity, transform;
                        border-radius: sugar.border.radius(ui.datetimePicker.borderRadius);

                        @sugar.media <=mobile {
                            border-radius: 0;
                        }
                    }
                    &[inline] .s-datetime-picker_picker {
                        box-shadow: none;
                    }

                    .s-datetime-picker_calendar {
                        margin-block-end: sugar.margin(30);
                        color: sugar.color(base, text);
                    }

                    .s-datetime-picker_calendar-day {
                        padding: sugar.padding(10);
                        font-weight: bold;
                    }

                    .s-datetime-picker_calendar-item {
                        padding: sugar.padding(10);
                        border-radius: sugar.border.radius(ui.datetimePicker.borderRadius);
                        
                        &.disabled {
                            color: sugar.color(base, text, --alpha 0.6);
                            
                            &:after {
                                content: '';
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                width: 60%;
                                height: 3px;
                                background: sugar.color(error);
                                border-radius: sugar.border.radius(ui.datetimePicker.borderRadius);
                                transform-origin: 50% 50%;
                                transform: translate(-50%, -50%) rotate(-10deg);
                                opacity: 1;
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

                    .s-datetime-picker_date-selectors,
                    .s-datetime-picker_time-selectors {
                        border: 1px solid sugar.color(main, border);
                        border-radius: sugar.border.radius(ui.datetimePicker.borderRadius);
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
                            border-radius: sugar.border.radius(ui.datetimePicker.borderRadius);
                        }
                    }

                    .s-datetime-picker_time-selectors {
                        .s-datetime-picker_selector-item {
                            font-size: 2em;

                            span {
                                padding: 0.5em sugar.padding(30) !important;
                            }
                        }
                    }

                    .s-datetime-picker_selector {
                        border-inline-end: 1px solid sugar.color(main, border);

                        &:last-child {
                            border-inline-end: none;
                        }

                        &.scrolling .s-datetime-picker_selector-item {
                            opacity: 1;
                        }
                    }

                    .s-datetime-picker_selector-item {
                        color: sugar.color(base, text);
                        font-weight: bold;

                        &.disabled {
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
                                    border-radius: sugar.border-radius(ui.datetimePicker.borderRadius);
                                    transform-origin: 50% 50%;
                                    transform: translate(-50%, -50%) rotate(-10deg);
                                    opacity: 0.1;
                                }
                            }
                        }

                        span {
                            padding: 1em sugar.padding(30);
                            background: sugar.color(main, surface);
                        }
                    }

        `);
                break;
        }
    }
    // wireframe
    vars.push(`
        .s-datetime-picker_picker {
            @sugar.wireframe {
                @sugar.wireframe.background;
                @sugar.wireframe.border;
            }
        }
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sZ0NBQWlDLFNBQVEsWUFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUM7YUFDeEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU9ELE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsR0FBRyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsRUFDakQsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWlFYixDQUFDLENBQUM7S0FDRjtJQUVELE1BQU07SUFDTixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDVCxDQUFDLENBQUM7UUFFSCxRQUFRLFdBQVcsQ0FBQyxHQUFHLEVBQUU7WUFDckIsS0FBSyxPQUFPLENBQUM7WUFDYjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQW9LakIsQ0FBQyxDQUFDO2dCQUNLLE1BQU07U0FDYjtLQUNKO0lBRUQsWUFBWTtJQUNaLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7S0FPVCxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=