"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class postcssUiSliderInterface extends s_interface_1.default {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: s_theme_1.default.get('ui.slider.defaultStyle'),
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
exports.interface = postcssUiSliderInterface;
/**
 * @name          slider
 * @namespace     ui.slider
 * @type               PostcssMixin
 * @platform      css
 * @status        beta
 *
 * Apply the slider style to any s-slider element
 *
 * @example     css
 * .s-slider {
 *    @sugar.ui.slider;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ style: s_theme_1.default.get('ui.slider.defaultStyle'), scope: ['bare', 'lnf'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`

    `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`

            &[behavior='default'] {
                > .s-slider__root {
                    > .s-slider__slides-wrapper {
                        > .s-slider__slides {
                            @sugar.transition();
                        }
                    }
                }
            }

            &[lnf*='tight'][direction='horizontal'][controls] {
                padding-left: calc(sugar.margin(30) + 1em);
                padding-right: calc(sugar.margin(30) + 1em);
            }
            &[lnf*='tight'][direction='horizontal'][nav] {
                padding-bottom: calc(sugar.margin(30) + 1em);
            }

            &[lnf*='tight'][direction='vertical'][controls] {
                padding-top: calc(sugar.margin(30) + 1em);
                padding-bottom: calc(sugar.margin(30) + 1em);
            }
            &[lnf*='tight'][direction='vertical'][nav] {
                padding-right: calc(sugar.margin(30) + 1em);
            }

            > .s-slider__root {
                > .s-slider__slides-wrapper {
                    border-radius: sugar.border.radius(ui.slider.borderRadius);
                }

                > .s-slider__nav {
                    top: calc(100% + sugar.margin(30));
                    left: 50%;
                    gap: sugar.margin(10);

                    > * {
                        background: sugar.color(current);
                        opacity: 0.3;
                        transition: sugar.theme(ui.slider.transition);

                        &:hover {
                            opacity: 0.6;
                        }
                        &.active {
                            opacity: 1;
                        }
                    }
                }
            }

            &[lnf*='contained'] .s-slider__root > .s-slider__nav {
                top: auto;
                bottom: calc(sugar.margin(30) - 0.5em);
                transform: translate(-50%, -100%);
            }
            &[direction='vertical'] .s-slider__root > .s-slider__nav {
                top: 50%;
                left: calc(100% + sugar.margin(30));
                transform: translate(0, -50%);
                flex-direction: column;
                gap: sugar.margin(10);
            }
            &[lnf*='contained'][direction='vertical']
                .s-slider__root > .s-slider__nav {
                bottom: auto;
                left: auto;
                right: calc(sugar.margin(30));
                transform: translate(0, -50%);
            }

            > .s-slider__root > .s-slider__progress {
                position: absolute;
                bottom: sugar.margin(30);
                left: sugar.margin(30);
                right: sugar.margin(30);
                height: 0.5em;
                
                &:before {
                    border-radius: sugar.border.radius(ui.slider.borderRadius);
                    background: sugar.color(current, --alpha 0.3);
                }

                > .s-slider__progress-bar {
                    border-radius: sugar.border.radius(ui.slider.borderRadius);
                    background: sugar.color(current);
                    transition: sugar.theme(ui.slider.transition);
                }
            }

            > .s-slider__root > .s-slider__controls {
                .s-slider__controls-next,
                .s-slider__controls-previous {
                    transition: sugar.theme(ui.slider.transition);
                }
                .s-slider__controls-previous {
                    right: calc(100% + sugar.margin(30));
                }
                .s-slider__controls-next {
                    left: calc(100% + sugar.margin(30));
                }
            }

            &[lnf*='contained'] > .s-slider__root > .s-slider__controls .s-slider__controls-previous {
                left: calc(sugar.margin(30));
                transform: translate(0, -50%);
            }
            &[lnf*='contained'] > .s-slider__root > .s-slider__controls .s-slider__controls-next {
                left: auto;
                right: calc(sugar.margin(30));
                transform: translate(0, -50%);
            }

            &[direction='vertical']
                > .s-slider__root
                > .s-slider__controls
                .s-slider__controls-next {
                left: 50%;
                top: calc(100% + sugar.margin(30));
                transform: translate(-50%, 0) rotate(90deg);
            }
            &[direction='vertical']
                > .s-slider__root
                > .s-slider__controls
                .s-slider__controls-previous {
                left: 50%;
                bottom: calc(100% + sugar.margin(30));
                top: auto;
                transform: translate(-50%, 0) rotate(90deg);
            }
            &[direction='vertical'][lnf*='contained']
                > .s-slider__root
                > .s-slider__controls
                .s-slider__controls-previous {
                top: calc(sugar.margin(30));
            }
            &[direction='vertical'][lnf*='contained']
                > .s-slider__root
                > .s-slider__controls
                .s-slider__controls-next {
                top: auto;
                bottom: calc(sugar.margin(30));
            }

            > .s-slider__root > .s-slider__controls .s-slider__controls-next-arrow,
            > .s-slider__root > .s-slider__controls .s-slider__controls-previous-arrow {
                width: 1em;
                height: 1em;
                position: absolute;
                top: 0;
                left: 0;

                &:before,
                &:after {
                    display: block;
                    content: '';
                    position: absolute;
                    top: calc(50% - 0.1em);
                    left: 0;
                    background: sugar.color(current);
                    width: 100%;
                    height: 0.2em;
                }
                &:before {
                    transform-origin: 0 0;
                    transform: rotate(45deg);
                }
                &:after {
                    transform-origin: 0 100%;
                    transform: rotate(-45deg);
                }
            }
            > .s-slider__root > .s-slider__controls .s-slider__controls-next-arrow {
                transform: rotate(180deg);
            }

            > .s-slider__root > .s-slider__controls .s-slider__controls-next-arrow,
            > .s-slider__root > .s-slider__controls .s-slider__controls-previous-arrow {
                &:before,
                &:after {
                    background: sugar.color(current);
                }
            }

        `);
        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`
        `);
                break;
        }
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSx3QkFBeUIsU0FBUSxxQkFBWTtJQUMvQyxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO2FBQ2xEO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPb0MsNkNBQVM7QUFFOUM7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxFQUM3QyxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLElBQ25CLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7O0tBRWIsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0EwTFQsQ0FBQyxDQUFDO1FBRUgsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLEtBQUssT0FBTyxDQUFDO1lBQ2I7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQztTQUNqQixDQUFDLENBQUM7Z0JBQ0ssTUFBTTtTQUNiO0tBQ0o7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBbE9ELDRCQWtPQyJ9