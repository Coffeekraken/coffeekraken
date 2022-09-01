import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssUiSliderInterface extends __SInterface {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.slider.defaultStyle'),
            },
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
    style: 'solid';
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
 * @example     css
 * .s-slider {
 *    @sugar.ui.slider;
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
        style: __STheme.get('ui.slider.defaultStyle'),
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

        switch (finalParams.style) {
            case 'solid':
            default:
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
                break;
        }
    }

    return vars;
}
