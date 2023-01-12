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
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sd0JBQXlCLFNBQVEsWUFBWTtJQUMvQyxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUM7Z0JBQ25DLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDO2FBQ3ZDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSx3QkFBd0IsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7S0FFYixDQUFDLENBQUM7S0FDRjtJQUVELFdBQVc7SUFDWCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUM7U0FDVCxDQUFDLENBQUM7S0FDTjtJQUVELHlGQUF5RjtJQUN6RiwyQkFBMkI7SUFDM0IsSUFBSTtJQUVKLE1BQU07SUFDTixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQW1EVCxDQUFDLENBQUM7S0FDTjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==