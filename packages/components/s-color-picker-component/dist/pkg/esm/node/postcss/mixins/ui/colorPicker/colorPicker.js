import __SInterface from '@coffeekraken/s-interface';
class postcssUiColorPickerInterface extends __SInterface {
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
 * @snippet         @sugar.ui.colorPicker($1);
 *
 * @example     css
 * .s-color-picker {
 *    @sugar.ui.colorPicker();
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, sharedData, replaceWith, }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sNkJBQThCLFNBQVEsWUFBWTtJQUNwRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsNkJBQTZCLElBQUksU0FBUyxFQUFFLENBQUM7QUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBb0ZiLENBQUMsQ0FBQztLQUNGO0lBRUQsTUFBTTtJQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7U0FFVCxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBbU5ULENBQUMsQ0FBQztLQUNOO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9