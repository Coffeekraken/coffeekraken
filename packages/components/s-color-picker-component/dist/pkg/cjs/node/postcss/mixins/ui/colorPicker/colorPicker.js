"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class postcssUiColorPickerInterface extends s_interface_1.default {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: s_theme_1.default.get('ui.colorPicker.defaultStyle'),
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
    const finalParams = Object.assign({ style: s_theme_1.default.get('ui.colorPicker.defaultStyle'), scope: ['bare', 'lnf'] }, params);
    const vars = [];
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSw2QkFBOEIsU0FBUSxxQkFBWTtJQUNwRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLDZCQUE2QixDQUFDO2FBQ3ZEO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPeUMsa0RBQVM7QUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQyxFQUNsRCxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQ25CLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXVGYixDQUFDLENBQUM7S0FDRjtJQUVELE1BQU07SUFDTixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7O1NBRVQsQ0FBQyxDQUFDO1FBRUgsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLEtBQUssT0FBTyxDQUFDO1lBQ2I7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBNE1qQixDQUFDLENBQUM7Z0JBQ0ssTUFBTTtTQUNiO1FBRUQsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUM7OztXQUdYLENBQUMsQ0FBQztTQUNKO0tBQ0o7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBalZELDRCQWlWQyJ9