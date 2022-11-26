import __SInterface from '@coffeekraken/s-interface';
class postcssUiSliderInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'behavior'],
                default: ['bare', 'lnf', 'behavior'],
            },
        };
    }
}
export { postcssUiSliderInterface as interface };
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
export default function ({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ scope: ['bare', 'lnf'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`

    `);
    }
    // behavior
    if (finalParams.scope.indexOf('behavior') !== -1) {
        vars.push(`
            &[behavior='default'] > .s-slider__root > .s-slider__slides-wrapper {                
                &::-webkit-scrollbar {
                    display: none;
                }
            }
        `);
    }
    // &[behavior='default'] > .s-slider__root > .s-slider__slides-wrapper > .s-slider__slides {
    //     @sugar.transition();
    // }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`

        `);
        vars.push(`

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

            &[lnf*='contained'] .s-slider__root > .s-slider__ui > .s-slider__nav {
                top: auto;
                bottom: calc(sugar.margin(30) - 0.5em);
                transform: translate(-50%, -100%);
            }
            &[direction='vertical'] .s-slider__root > .s-slider__ui > .s-slider__nav {
                top: 50%;
                left: calc(100% + sugar.margin(30));
                transform: translate(0, -50%);
                flex-direction: column;
                gap: sugar.margin(10);
            }
            &[lnf*='contained'][direction='vertical']
                .s-slider__root > .s-slider__ui > .s-slider__nav {
                bottom: auto;
                left: auto;
                right: calc(sugar.margin(30));
                transform: translate(0, -50%);
            }

            > .s-slider__root > .s-slider__ui > .s-slider__progress {
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

            > .s-slider__root > .s-slider__ui > .s-slider__controls {
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

            &[lnf*='contained'] > .s-slider__root > .s-slider__ui > .s-slider__controls .s-slider__controls-previous {
                left: calc(sugar.margin(30));
                transform: translate(0, -50%);
            }
            &[lnf*='contained'] > .s-slider__root > .s-slider__ui > .s-slider__controls .s-slider__controls-next {
                left: auto;
                right: calc(sugar.margin(30));
                transform: translate(0, -50%);
            }

            &[direction='vertical']
                > .s-slider__root
                > .s-slider__ui
                > .s-slider__controls
                .s-slider__controls-next {
                left: 50%;
                top: calc(100% + sugar.margin(30));
                transform: translate(-50%, 0) rotate(90deg);
            }
            &[direction='vertical']
                > .s-slider__root
                > .s-slider__ui
                > .s-slider__controls
                .s-slider__controls-previous {
                left: 50%;
                bottom: calc(100% + sugar.margin(30));
                top: auto;
                transform: translate(-50%, 0) rotate(90deg);
            }
            &[direction='vertical'][lnf*='contained']
                > .s-slider__root
                > .s-slider__ui
                > .s-slider__controls
                .s-slider__controls-previous {
                top: calc(sugar.margin(30));
            }
            &[direction='vertical'][lnf*='contained']
                > .s-slider__root
                > .s-slider__ui
                > .s-slider__controls
                .s-slider__controls-next {
                top: auto;
                bottom: calc(sugar.margin(30));
            }

            > .s-slider__root > .s-slider__ui > .s-slider__controls .s-slider__controls-next-arrow,
            > .s-slider__root > .s-slider__ui > .s-slider__controls .s-slider__controls-previous-arrow {
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
            > .s-slider__root > .s-slider__ui > .s-slider__controls .s-slider__controls-next-arrow {
                transform: rotate(180deg);
            }

            > .s-slider__root > .s-slider__ui > .s-slider__controls .s-slider__controls-next-arrow,
            > .s-slider__root > .s-slider__ui > .s-slider__controls .s-slider__controls-previous-arrow {
                &:before,
                &:after {
                    background: sugar.color(current);
                }
            }

        `);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sd0JBQXlCLFNBQVEsWUFBWTtJQUMvQyxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDO2FBQ3ZDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSx3QkFBd0IsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7S0FFYixDQUFDLENBQUM7S0FDRjtJQUVELFdBQVc7SUFDWCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztTQU1ULENBQUMsQ0FBQztLQUNOO0lBRUQsNEZBQTRGO0lBQzVGLDJCQUEyQjtJQUMzQixJQUFJO0lBRUosTUFBTTtJQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7U0FFVCxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FvTFQsQ0FBQyxDQUFDO0tBQ047SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=