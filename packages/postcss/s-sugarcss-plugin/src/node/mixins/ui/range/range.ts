import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name          range
 * @as              @s.ui.range
 * @namespace     node.mixin.ui.range
 * @type               PostcssMixin
 * @interface     ./range          interface
 * @platform      postcss
 * @status        stable
 *
 * Apply the range style to any HTMLInputElement
 *
 * @param       {'solid'}                           [style='theme.ui.form.defaultLnf']         The lnf you want to generate
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.range
 *
 * @example     css
 * .my-range {
 *    @s.ui.range;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginUiRangeInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: __STheme.current.get('ui.form.defaultLnf'),
            },
        };
    }
}

export interface ISSugarcssPluginUiButtonParams {
    lnf: 'solid';
}

export { SSugarcssPluginUiRangeInterface as interface };
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiButtonParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiButtonParams = {
        lnf: 'solid',
        ...params,
    };

    const vars: string[] = [
        `
        font-size: clamp(s.scalable(20px), s.scalable(1rem), 999rem);

        --track-color: s.color(main, ui, --alpha 0.5);
        --thumb-color: s.color(current);

        --focus-spread: s.border.width(ui.outline.borderWidth);

        --thumb-radius: var(--s-shape, s.border.radius(ui.form.borderRadius));
        --thumb-height: 1em;
        --thumb-width: 1em;
        --thumb-border-width: s.border.width(ui.form.borderWidth);
        --thumb-border-color: s.color(current, border);

        --track-width: 100%;
        --track-height: 0.2em;
        --track-border-width: s.border.width(ui.form.borderWidth);
        --track-border-color: s.color(current, --alpha 0.2);

        --track-radius: var(--s-shape, s.border.radius(ui.form.borderRadius));
`,
    ];

    const trackCss = `
        transition: s.theme(ui.form.transition);
    `;
    const trackCssBare = `
        height: var(--track-height);
        width: 100%;
        cursor: pointer;
    `;
    const thumbCss = `
        background: var(--thumb-color);
        border: var(--thumb-border-width) solid var(--thumb-border-color);
        border-radius: var(--thumb-radius);
        box-shadow: 0 0 0 0 var(--thumb-border-color);
    `;
    const thumbCssBare = `
        box-sizing: border-box;
        height: var(--thumb-height);
        width: var(--thumb-width);
        cursor: pointer;
    `;

    // lnf
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`
            &:hover,
            &:focus {

                &::-webkit-slider-runnable-track {
                    background: var(--track-color);
                    border: var(--track-border-width) solid s.color(current, --alpha 0.3);
                }
                &::-moz-range-track {
                    background: var(--track-color);
                    border: var(--track-border-width) solid s.color(current, --alpha 0.3);
                }
                &::-ms-track {
                    background: var(--track-color);
                    border: var(--track-border-width) solid s.color(current, --alpha 0.3);
                }

                &::-ms-fill-lower {
                    background: var(--track-color);
                }

                &::-ms-fill-upper {
                    background: var(--track-color);
                }

                &::-webkit-slider-thumb {
                     box-shadow: 0 0 0 var(--focus-spread) var(--thumb-border-color);
                }
                &::-moz-range-thumb {
                     box-shadow: 0 0 0 var(--focus-spread) var(--thumb-border-color);
                }
                &::-ms-thumb {
                     box-shadow: 0 0 0 var(--focus-spread) var(--thumb-border-color);
                }

            }

            &::-webkit-slider-thumb {
                ${thumbCss}
            }
             &::-moz-range-thumb {
                ${thumbCss}
            }
            &::-ms-thumb {
                ${thumbCss}
            }

            &::-webkit-slider-runnable-track {
                ${trackCss}
                background: var(--track-color);
                border: var(--track-border-width) solid var(--track-border-color);
                border-radius: var(--track-radius);
            }
            &::-moz-range-track {
                ${trackCss}
                background: var(--track-color);
                border: var(--track-border-width) solid var(--track-border-color);
                border-radius: var(--track-radius);
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
    `);
    vars.push('}');

    // bare
    vars.push(`@s.scope 'bare' {`);
    vars.push(`
            -webkit-appearance: none;
            background: transparent;

            margin-block: s.padding(ui.form.paddingBlock);

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
                    @s.disabled;
                }
            }

    `);
    vars.push('}');

    return vars;
}
