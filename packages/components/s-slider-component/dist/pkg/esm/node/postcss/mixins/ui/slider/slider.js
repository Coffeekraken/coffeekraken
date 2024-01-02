import __SInterface from '@coffeekraken/s-interface';
class postcssUiSliderInterface extends __SInterface {
    static get _definition() {
        return {};
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
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       behavior        Behavior css
 *
 * @snippet         @s.ui.slider($1);
 *
 * @example     css
 * .s-slider {
 *    @s.ui.slider;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    // bare
    // behavior
    // lnf
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`

            --s-slider-space: calc(s.margin(30) + 1em);

            > .s-slider_root {
                > .s-slider_slides-wrapper {
                    @s.border.radius(ui.slider.borderRadius);
                }

                > .s-slider_ui {

                    > .s-slider_nav {

                        > * {
                            background: s.color(current, uiForeground);
                            transition: s.theme(ui.slider.transition);
                        }
                    }
                }
            }

            > .s-slider_root > .s-slider_ui > .s-slider_progress {
                @s.border.radius(ui.slider.borderRadius);
            
                &:before {
                    @s.border.radius(ui.slider.borderRadius);
                    background: s.color(current, uiForeground, --alpha 0.3);
                }

                > .s-slider_progress-bar {
                    @s.border.radius(ui.slider.borderRadius);
                    background: s.color(current, uiForeground);
                    transition: s.theme(ui.slider.transition);
                }
            }

            > .s-slider_root > .s-slider_ui > .s-slider_controls {
                .s-slider_controls-next,
                .s-slider_controls-previous {
                    transition: s.theme(ui.slider.transition);
                }
            }

            > .s-slider_root > .s-slider_ui > .s-slider_controls .s-slider_controls-next-arrow,
            > .s-slider_root > .s-slider_ui > .s-slider_controls .s-slider_controls-previous-arrow {
                &:before,
                &:after {
                    background: s.color(current, uiForeground);
                }
            }

        `);
    vars.push('}');
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sd0JBQXlCLFNBQVEsWUFBWTtJQUMvQyxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSx3QkFBd0IsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEVBQ1YsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFFUCxXQUFXO0lBRVgsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FtREwsQ0FBQyxDQUFDO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==