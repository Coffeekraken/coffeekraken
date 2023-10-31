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

export interface IPostcssUiSliderParams {
    scope: ('bare' | 'lnf' | 'behavior')[];
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

export default function ({
    params,
    atRule,
    sharedData,
    replaceWith,
}: {
    params: Partial<IPostcssUiSliderParams>;
    atRule: any;
    sharedData: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssUiSliderParams = {
        scope: ['bare', 'lnf'],
        ...params,
    };

    const vars: string[] = [];

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
    //     @s.transition();
    // }

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
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
    }

    return vars;
}
