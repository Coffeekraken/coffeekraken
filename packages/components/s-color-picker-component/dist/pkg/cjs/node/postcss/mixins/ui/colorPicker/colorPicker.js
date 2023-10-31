"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssUiColorPickerInterface extends s_interface_1.default {
    static get _definition() {
        return {
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
exports.interface = postcssUiColorPickerInterface;
/**
 * @name          colorPicker
 * @namespace     ui.colorPicker
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the color picker style to any s-color-picker element
 *
 * @snippet         @s.ui.colorPicker($1);
 *
 * @example     css
 * .s-color-picker {
 *    @s.ui.colorPicker();
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ scope: ['bare', 'lnf'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`

        @s.media <=mobile {
            position: unset;
        }

        .s-color-picker_picker {
            @s.media <=mobile {
                position: fixed;
                bottom: 0;
                top: auto !important;
                left: 0 !important;
                right: auto;
                width: 100vw;
                transform: translate(0, 100%);
            }
        }

        &:focus-within {
            .s-color-picker_picker {
                @s.media <=mobile {
                    transform: translate(0, 0);
                }
            }
        }
        

        .s-color-picker_picker {

            .s-color-picker_shade-wrapper {
                @s.media <=mobile {
                    position: relative;
                    aspect-ratio: unset;
                }
            }

            .s-color-picker_selectors {
                gap: s.margin(20);
            }

            .s-color-picker_btn,
            .s-color-picker_color-input {
                padding: s.padding(20) s.padding(30);
            }

            @s.media <=mobile {
                .s-color-picker_metas {
                    flex-wrap: wrap;
                }

                .s-color-picker_color {
                    margin-block-start: s.margin(20);
                }

                .s-color-picker_formats,
                .s-color-picker_color {
                    width: 100%;

                    .s-color-picker_btn {
                        text-align: center;
                        flex-grow: 1 !important;
                    }
                }
            }

            .s-color-picker_metas,
            .s-color-picker_actions {
                padding-block-start: s.padding(20);

                @s.media <=mobile {
                    padding-block-start: s.padding(30);
                }
            }

            .s-color-picker_eye-dropper {
                color: s.color(main, text);
            }

            .s-color-picker_actions {
                gap: s.margin(20);
            }
        
        }

    `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            color: s.color(text);
        `);
        vars.push(`

                .s-color-picker_picker {
                    @s.depth (100);
                    background: s.color(main, background);
                    padding: s.padding(30);
                    overflow: hidden;
                    transition: s.transition(fast);
                    transition-property: opacity, transform;
                    border-radius: s.border.radius();

                    @s.media <=mobile {
                        border-radius: 0;
                        overflow: visible;
                    }
                }
                &[inline] .s-color-picker_picker {
                    background: none;
                    box-shadow: none;
                    padding: 0;
                }

                .s-color-picker_shade-wrapper,
                .s-color-picker_hue-wrapper,
                .s-color-picker_alpha-wrapper {
                    border-radius: s.border.radius();

                    canvas {
                        border-radius: s.border.radius();
                    }

                    &:after {
                        width: 20px;
                        height: 20px;
                        border-radius: 999px;
                        border: solid 10px s.color(main, surface);
                        border-color: white;
                        transition: border-width 0.15s ease-in-out;
                        transition-property: border-width, width, height, transform;
                        @s.depth (10);
                    }

                    @s.media <=mobile {
                        &:after {
                            transition: none !important;
                        }
                    }

                }

                .s-color-picker_alpha-wrapper {
                    &:after {
                        background: hsla(
                            0,
                            0%,
                            calc((1 - var(--s-color-picker-a)) * 100%),
                            1
                        );
                    }
                }
                .s-color-picker_root.is-alpha-interacting {
                    .s-color-picker_alpha-wrapper {
                        &:after {
                            border-width: 3px;
                            width: 60px;
                            height: 60px;

                            @s.media <=mobile {
                                height: 120px;
                                width: 60px;
                                transform: translate(-50%, calc(-100% + 30px));
                            }
                        }
                    }
                }

                .s-color-picker_shade-wrapper {
                    &:after {
                        background: hsla(
                            var(--s-color-picker-h),
                            calc(var(--s-color-picker-s) * 1%),
                            calc(var(--s-color-picker-l) * 1%),
                            var(--s-color-picker-a)
                        );
                    }
                }

                .s-color-picker_root.is-shade-interacting {
                    .s-color-picker_shade-wrapper {
                        &:after {
                            border-width: 3px;
                            width: 60px;
                            height: 60px;

                            @s.media <=mobile {
                                height: 120px;
                                width: 60px;
                                transform: translate(-50%, calc(-100% + 30px));
                            }
                        }
                    }
                }

                .s-color-picker_hue-wrapper {
                    &:after {
                        background: hsla(var(--s-color-picker-h), 100%, 50%, 1);
                    }
                }
                .s-color-picker_root.is-hue-interacting {
                    .s-color-picker_hue-wrapper {
                        &:after {
                            border-width: 3px;
                            width: 60px;
                            height: 60px;

                            @s.media <=mobile {
                                height: 120px;
                                width: 60px;
                                transform: translate(-50%, calc(-100% + 30px));
                            }
                        }
                    }
                }

                .s-color-picker_formats {
                    .s-color-picker_btn {
                        border: 1px solid s.color(main, border);
                        color: s.color(main, text);
                        font-size: 0.8em;
                        @s.font.family (code);

                        &:hover {
                            background: s.color(main, ui);
                        }

                        &:first-child {
                            border-top-left-radius: s.border.radius();
                            border-bottom-left-radius: s.border.radius();

                            @s.media <=mobile {
                                border-radius: 0;
                                border-top-left-radius: s.border.radius();
                                border-bottom-left-radius: s.border.radius();
                            }
                        }
                        &:nth-child(3) {
                            @s.media <=mobile {
                                border-top-right-radius: s.border.radius();
                                border-bottom-right-radius: s.border.radius();
                            }
                        }

                        @s.media >mobile {
                            &:nth-child(2),
                            &:nth-child(3) {
                                border-left: none;
                            }
                            &:nth-child(3) {
                                border-right: none;
                            }
                        }

                        &.active {
                            background: s.color(main, ui);
                            color: s.color(main, text);
                        }
                    }
                }

                @s.media <=mobile {
                    .s-color-picker_color-input {
                        border-top: none;
                        border-top-left-radius: s.border.radius();
                        border-bottom-left-radius: s.border.radius();
                    }
                    .s-color-picker_preview {
                    }
                }

                .s-color-picker_actions {
                    .s-color-picker_btn {
                        background: s.color(current);
                        color: s.color(current, foreground);
                        border-radius: s.border.radius();
                    }
                }

                .s-color-picker_color-input {
                    color: s.color(main, text);
                    border: solid 1px s.color(main, border);
                    border-right: none;
                }
                .s-color-picker_preview {
                    position: relative;
                    border: solid 1px
                        hsla(
                            var(--s-color-picker-h),
                            calc(var(--s-color-picker-s) * 1%),
                            calc(var(--s-color-picker-l) * 1%),
                            var(--s-color-picker-a)
                        );
                    border-left: none;
                    border-top-right-radius: s.border.radius();
                    border-bottom-right-radius: s.border.radius();

                    i {
                        color: white;
                        font-size: 0.8em;
                    }
                }

        `);
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLDZCQUE4QixTQUFRLHFCQUFZO0lBQ3BELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU15QyxrREFBUztBQUVuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQ25CLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW9GYixDQUFDLENBQUM7S0FDRjtJQUVELE1BQU07SUFDTixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7O1NBRVQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQW1OVCxDQUFDLENBQUM7S0FDTjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUF4VUQsNEJBd1VDIn0=