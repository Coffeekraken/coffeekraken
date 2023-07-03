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
 * @snippet         @sugar.ui.slider($1);
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
        `);
    }
    // &[behavior='default'] > .s-slider_root > .s-slider_slides-wrapper > .s-slider_slides {
    //     @sugar.transition();
    // }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`

            --s-slider-space: calc(sugar.margin(30) + 1em);

            > .s-slider_root {
                > .s-slider_slides-wrapper {
                    @sugar.border.radius(ui.slider.borderRadius);
                }

                > .s-slider_ui {

                    > .s-slider_nav {

                        > * {
                            background: sugar.color(current, uiForeground);
                            transition: sugar.theme(ui.slider.transition);
                        }
                    }
                }
            }

            > .s-slider_root > .s-slider_ui > .s-slider_progress {
                @sugar.border.radius(ui.slider.borderRadius);
            
                &:before {
                    @sugar.border.radius(ui.slider.borderRadius);
                    background: sugar.color(current, uiForeground, --alpha 0.3);
                }

                > .s-slider_progress-bar {
                    @sugar.border.radius(ui.slider.borderRadius);
                    background: sugar.color(current, uiForeground);
                    transition: sugar.theme(ui.slider.transition);
                }
            }

            > .s-slider_root > .s-slider_ui > .s-slider_controls {
                .s-slider_controls-next,
                .s-slider_controls-previous {
                    transition: sugar.theme(ui.slider.transition);
                }
            }

            > .s-slider_root > .s-slider_ui > .s-slider_controls .s-slider_controls-next-arrow,
            > .s-slider_root > .s-slider_ui > .s-slider_controls .s-slider_controls-previous-arrow {
                &:before,
                &:after {
                    background: sugar.color(current, uiForeground);
                }
            }

        `);
    }
    // wireframe
    vars.push(`
        @sugar.wireframe {
            @sugar.wireframe.background;

            > .s-slider_root > .s-slider_slides-wrapper:after {
                content: '';
                display: block;
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
                pointer-events: none;
                @sugar.wireframe.border;
            }

            > .s-slider_root {
                > .s-slider_ui {
                    > .s-slider_nav {
                        > * {
                            background: rgba(0,0,0,.3);
                        }
                    }
                }
            }

            > .s-slider_root > .s-slider_ui > .s-slider_progress {
                &:before {
                    background: rgba(0,0,0,.05);
                }
                > .s-slider_progress-bar {
                    background: rgba(0,0,0,.1);
                }
            }

            > .s-slider_root > .s-slider_ui > .s-slider_controls .s-slider_controls-next-arrow,
            > .s-slider_root > .s-slider_ui > .s-slider_controls .s-slider_controls-previous-arrow {
                &:before,
                &:after {
                    background: rgba(0,0,0,.3);
                }
            }

            .s-media-container:after {
                display: none;
            }

        }
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sd0JBQXlCLFNBQVEsWUFBWTtJQUMvQyxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDO2FBQ3ZDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSx3QkFBd0IsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOztLQUViLENBQUMsQ0FBQztLQUNGO0lBRUQsV0FBVztJQUNYLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNULENBQUMsQ0FBQztLQUNOO0lBRUQseUZBQXlGO0lBQ3pGLDJCQUEyQjtJQUMzQixJQUFJO0lBRUosTUFBTTtJQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBbURULENBQUMsQ0FBQztLQUNOO0lBRUQsWUFBWTtJQUNaLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0E4Q1QsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9