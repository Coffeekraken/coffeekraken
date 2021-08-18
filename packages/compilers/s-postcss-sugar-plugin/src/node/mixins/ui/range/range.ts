import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiRangeInterface extends __SInterface {
    static definition = {
        style: {
            type: 'String',
            values: ['default'],
            default: __theme().config('ui.button.defaultStyle'),
        },
        scope: {
            type: 'Array<String>',
            values: ['bare', 'lnf', 'style'],
            default: ['bare', 'lnf', 'style'],
        },
    };
}

export interface IPostcssSugarPluginUiButtonParams {
    style: 'default';
    scope: string[];
}

export { postcssSugarPluginUiRangeInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiButtonParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiButtonParams = {
        style: __theme().config('ui.range.defaultStyle'),
        scope: ['bare', 'lnf', 'style'],
        ...params,
    };

    const vars: string[] = [
        `
        --track-color: sugar.color(main, ui);
        --thumb-color: sugar.color(ui);

        --thumb-radius: 50%;
        --thumb-height: 1em;
        --thumb-width: 1em;
        --thumb-border-width: sugar.theme(ui.range.borderWidth);
        --thumb-border-color: sugar.color(ui, border);

        --track-width: 100%;
        --track-height: 0.5em;
        --track-border-width: sugar.theme(ui.range.borderWidth);
        --track-border-color: sugar.color(ui, border);

        --track-radius: sugar.theme(ui.range.borderRadius);
        --contrast: 5%;

        --ie-bottom-track-color: darken($track-color, $contrast);
`,
    ];

    const trackCss = `
        transition: sugar.theme(ui.range.transition);
    `;
    const trackCssBare = `
        height: var(--track-height);
        width: 100%;
        cursor: default;
    `;
    const thumbCss = `
        background: var(--thumb-color);
        border: var(--thumb-border-width) solid var(--thumb-border-color);
        border-radius: var(--thumb-radius);
    `;
    const thumbCssBare = `
        box-sizing: border-box;
        cursor: default;
        height: var(--thumb-height);
        width: var(--thumb-width);
    `;

    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            &:focus {

                &::-webkit-slider-runnable-track {
                    background: var(--track-color);
                }

                &::-ms-fill-lower {
                    background: var(--track-color);
                }

                &::-ms-fill-upper {
                    background: var(--track-color);
                }
            }

            &::-webkit-slider-runnable-track {
                ${trackCss}
                background: var(--track-color);
                border: var(--track-border-width) solid var(--track-border-color);
                border-radius: var(--track-radius);
            }

            &::-webkit-slider-thumb {
                ${thumbCss}
            }

            &::-moz-range-track {
                ${trackCss}
                background: var(--track-color);
                border: var(--track-border-width) solid var(--track-border-color);
                border-radius: var(--track-radius);
            }

            &::-moz-range-thumb {
                ${thumbCss}
            }

            &::-ms-track {
                ${trackCss}
                background: transparent;
                border-color: transparent;
                border-width: calc(var(--thumb-height) / 2) 0;
                color: transparent;
            }

            &::-ms-fill-lower {
                background: var(--ie-bottom-track-color);
                border: var(--track-border-width) solid var(--track-border-color);
                border-radius: calc(var(--track-radius) * 2);
            }

            &::-ms-fill-upper {
                background: var(--track-color);
                border: var(--track-border-width) solid var(--track-border-color);
                border-radius: calc(var(--track-radius) * 2);
            }
            &::-ms-thumb {
                ${thumbCss}
            }
    `);
    }

    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            margin: calc(var(--thumb-height) / 2) 0;
            -webkit-appearance: none;
            background: transparent;

            &::-moz-focus-outer {
                border: 0;
            }

            &:focus {
                outline: 0;
            }

            &::-webkit-slider-runnable-track {
                ${trackCssBare}
            }

            &::-webkit-slider-thumb {
                ${thumbCssBare}
                -webkit-appearance: none;
                margin-top: calc( ((var(--track-border-width) * -1 * 2 + var(--track-height)) / 2 - var(--thumb-height) / 2));
            }

            &::-moz-range-track {
                ${trackCssBare}
                height: calc(var(--track-height) / 2);
            }

            &::-moz-range-thumb {
                ${thumbCssBare}
            }

            &::-ms-track {
                ${trackCssBare}
            }

            &::-ms-fill-lower {
            }

            &::-ms-fill-upper {
            }
            &::-ms-thumb {
                ${thumbCssBare}
                margin-top: calc(var(--.track-height) / 4);
            }

            &:disabled {
                &::-webkit-slider-thumb,
                &::-moz-range-thumb,
                &::-ms-thumb,
                &::-webkit-slider-runnable-track,
                &::-ms-fill-lower,
                &::-ms-fill-upper {
                cursor: not-allowed;
                }
            }

    `);
    }

    // style
    if (finalParams.scope.indexOf('style') !== -1) {
        switch (finalParams.style) {
            case 'default':
            default:
                vars.push(`
                `);
                break;
        }
    }

    replaceWith(vars);
}
