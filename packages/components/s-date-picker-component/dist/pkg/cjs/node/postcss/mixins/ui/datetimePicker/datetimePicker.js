"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class postcssUiDatetimePickerInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: s_theme_1.default.current.get('ui.datetimePicker.defaultLnf'),
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
 * Apply the datetime picker lnf to any s-datetime-picker element
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.datetimePicker($1);
 *
 * @example     css
 * .s-datetime-picker {
 *    @s.ui.datetimePicker();
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ lnf: s_theme_1.default.current.get('ui.datetimePicker.defaultLnf') }, params);
    const vars = [];
    // bare
    vars.push(`@s.scope 'bare' {`);
    vars.push(`

            @s.media <=mobile {
                position: unset;
            }

            &:focus-within {
                .s-datetime-picker_picker {

                    @s.media <=mobile {
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
    vars.push('}');
    // lnf
    vars.push(`@s.scope 'lnf' {`);
    switch (finalParams.lnf) {
        case 'solid':
        default:
            vars.push(`

                    color: s.color(text);

                    .s-datetime-picker_actions {
                        gap: s.margin(20);
                    }

                    .s-datetime-picker_picker {
                        @s.depth (ui.datetimePicker.depth);
                        background: s.color(main, background);
                        padding: s.padding(30);
                        overflow: hidden;
                        transition: s.transition(ui.datetimePicker.transition);
                        transition-property: opacity, transform;
                        border-radius: s.border.radius(ui.datetimePicker.borderRadius);

                        @s.media <=mobile {
                            border-radius: 0;
                        }
                    }
                    &[inline] .s-datetime-picker_picker {
                        box-shadow: none;
                    }

                    .s-datetime-picker_calendar {
                        margin-block-end: s.margin(30);
                        color: s.color(main, text);
                    }

                    .s-datetime-picker_calendar-day {
                        padding: s.padding(10);
                        font-weight: bold;
                    }

                    .s-datetime-picker_calendar-item {
                        padding: s.padding(10);
                        border-radius: s.border.radius(ui.datetimePicker.borderRadius);
                        
                        &.disabled {
                            color: s.color(main, text, --alpha 0.6);
                            
                            &:after {
                                content: '';
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                width: 60%;
                                height: 3px;
                                background: s.color(error);
                                border-radius: s.border.radius(ui.datetimePicker.borderRadius);
                                transform-origin: 50% 50%;
                                transform: translate(-50%, -50%) rotate(-10deg);
                                opacity: 1;
                            }
                        }

                        &.today {
                            background: s.color(current, --alpha 0.2);
                        }
                        &.active {
                            background: s.color(current);
                            color: s.color(current, foreground);
                        }

                        &:hover {
                            background: s.color(current);
                            color: s.color(current, foreground);
                        }
                    }

                    .s-datetime-picker_date-selectors,
                    .s-datetime-picker_time-selectors {
                        border: 1px solid s.color(main, border);
                        border-radius: s.border.radius(ui.datetimePicker.borderRadius);
                        margin-block-end: s.margin(30);
                        background: s.color(main, surface);

                        &:before {
                            content: '';
                            display: block;
                            position: absolute;
                            top: 50%;
                            left: 0;
                            width: 100%;
                            height: 2px;
                            transform: translate(0, -50%);
                            background: s.color(main, border);
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
                                s.color(main, surface, --darken 5),
                                s.color(main, surface, --alpha 0),
                                s.color(main, surface, --alpha 0),
                                s.color(main, surface, --darken 5)
                            );
                            pointer-events: none;
                            border-radius: s.border.radius(ui.datetimePicker.borderRadius);
                        }
                    }

                    .s-datetime-picker_time-selectors {
                        .s-datetime-picker_selector-item {
                            font-size: 2em;

                            span {
                                padding: 0.5em s.padding(30) !important;
                            }
                        }
                    }

                    .s-datetime-picker_selector {
                        border-inline-end: 1px solid s.color(main, border);

                        &:last-child {
                            border-inline-end: none;
                        }

                        &.scrolling .s-datetime-picker_selector-item {
                            opacity: 1;
                        }
                    }

                    .s-datetime-picker_selector-item {
                        color: s.color(main, text);
                        font-weight: bold;

                        &.disabled {
                            color: s.color(main, text, --alpha 0.15);

                            span {
                                position: relative;

                                &:after {
                                    content: '';
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    width: 60%;
                                    height: 3px;
                                    background: s.color(error);
                                    border-radius: s.border-radius(ui.datetimePicker.borderRadius);
                                    transform-origin: 50% 50%;
                                    transform: translate(-50%, -50%) rotate(-10deg);
                                    opacity: 0.1;
                                }
                            }
                        }

                        span {
                            padding: 1em s.padding(30);
                            background: s.color(main, surface);
                        }
                    }

        `);
            break;
    }
    vars.push('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSxnQ0FBaUMsU0FBUSxxQkFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQzthQUNoRTtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNNEMscURBQVM7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUVILG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsR0FBRyxFQUFFLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsQ0FBQyxJQUN0RCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBQy9CLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBaUVULENBQUMsQ0FBQztJQUNILElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixNQUFNO0lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBRTlCLFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUNyQixLQUFLLE9BQU8sQ0FBQztRQUNiO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FvS2IsQ0FBQyxDQUFDO1lBQ0MsTUFBTTtLQUNiO0lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUF6UUQsNEJBeVFDIn0=