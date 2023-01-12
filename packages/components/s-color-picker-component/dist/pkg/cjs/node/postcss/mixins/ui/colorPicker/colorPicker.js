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
 * @example     css
 * .s-color-picker {
 *    @sugar.ui.colorPicker;
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

        @sugar.media <=mobile {
            position: unset;
        }

        .s-color-picker_picker {
            @sugar.media <=mobile {
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
                @sugar.media <=mobile {
                    transform: translate(0, 0);
                }
            }
        }
        

        .s-color-picker_picker {

            .s-color-picker_shade-wrapper {
                @sugar.media <=mobile {
                    position: relative;
                    aspect-ratio: unset;
                }
            }

            .s-color-picker_selectors {
                gap: sugar.margin(20);
            }

            .s-color-picker_btn,
            .s-color-picker_color-input {
                padding: sugar.padding(20) sugar.padding(30);
            }

            @sugar.media <=mobile {
                .s-color-picker_metas {
                    flex-wrap: wrap;
                }

                .s-color-picker_color {
                    margin-block-start: sugar.margin(20);
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
                padding-block-start: sugar.padding(20);

                @sugar.media <=mobile {
                    padding-block-start: sugar.padding(30);
                }
            }

            .s-color-picker_eye-dropper {
                color: sugar.color(main, text);
            }

            .s-color-picker_actions {
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
        vars.push(`

                .s-color-picker_picker {
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
                &[inline] .s-color-picker_picker {
                    background: none;
                    box-shadow: none;
                    padding: 0;
                }

                .s-color-picker_shade-wrapper,
                .s-color-picker_hue-wrapper,
                .s-color-picker_alpha-wrapper {
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

                    @sugar.media <=mobile {
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

                            @sugar.media <=mobile {
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

                            @sugar.media <=mobile {
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

                            @sugar.media <=mobile {
                                height: 120px;
                                width: 60px;
                                transform: translate(-50%, calc(-100% + 30px));
                            }
                        }
                    }
                }

                .s-color-picker_formats {
                    .s-color-picker_btn {
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
                    .s-color-picker_color-input {
                        border-top: none;
                        border-top-left-radius: sugar.border.radius();
                        border-bottom-left-radius: sugar.border.radius();
                    }
                    .s-color-picker_preview {
                    }
                }

                .s-color-picker_actions {
                    .s-color-picker_btn {
                        background: sugar.color(current);
                        color: sugar.color(current, foreground);
                        border-radius: sugar.border.radius();
                    }
                }

                .s-color-picker_color-input {
                    color: sugar.color(main, text);
                    border: solid 1px sugar.color(main, border);
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
                    border-top-right-radius: sugar.border.radius();
                    border-bottom-right-radius: sugar.border.radius();

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLDZCQUE4QixTQUFRLHFCQUFZO0lBQ3BELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU15QyxrREFBUztBQUVuRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FvRmIsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOztTQUVULENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FtTlQsQ0FBQyxDQUFDO0tBQ047SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBeFVELDRCQXdVQyJ9