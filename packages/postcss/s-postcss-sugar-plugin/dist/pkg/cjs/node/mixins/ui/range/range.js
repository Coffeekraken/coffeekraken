"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          range
 * @namespace     node.mixin.ui.range
 * @type               PostcssMixin
 * @interface     ./range          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the range style to any HTMLInputElement
 *
 * @param       {'default'}                           [style='theme.ui.form.defaultLnf']         The style you want to generate
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.range
 *
 * @example     css
 * .my-range {
 *    @sugar.ui.range;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiRangeInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: s_theme_1.default.get('ui.form.defaultLnf'),
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
exports.interface = postcssSugarPluginUiRangeInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'solid', scope: ['bare', 'lnf'] }, params);
    const vars = [
        `
        --track-color: sugar.color(main, ui);
        --thumb-color: sugar.color(current);

        --focus-spread: sugar.theme(ui.outline.borderWidth);

        --thumb-radius: var(--s-shape, sugar.border.radius(ui.form.borderRadius));
        --thumb-height: sugar.scalable(1em);
        --thumb-width: sugar.scalable(1em);
        --thumb-border-width: sugar.theme(ui.form.borderWidth);
        --thumb-border-color: sugar.color(current, border);

        --track-width: 100%;
        --track-height: sugar.scalable(0.5em);
        --track-border-width: sugar.theme(ui.form.borderWidth);
        --track-border-color: sugar.color(current, --alpha 0.2);

        --track-radius: var(--s-shape, sugar.border.radius(ui.form.borderRadius));
        --contrast: 5%;
`,
    ];
    const trackCss = `
        transition: sugar.theme(ui.form.transition);
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
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            &:hover,
            &:focus {

                &::-webkit-slider-runnable-track {
                    background: var(--track-color);
                    border: var(--thumb-border-width) solid sugar.color(current, --alpha 0.3);
                }
                &::-moz-range-track {
                    background: var(--track-color);
                    border: var(--thumb-border-width) solid sugar.color(current, --alpha 0.3);
                }
                &::-ms-track {
                    background: var(--track-color);
                    border: var(--thumb-border-width) solid sugar.color(current, --alpha 0.3);
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
    }
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            -webkit-appearance: none;
            background: transparent;

            margin-block: sugar.padding(sugar.theme(ui.form.paddingBlock));

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
                    @sugar.disabled;
                }
            }

    `);
    }
    // style
    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.lnf) {
            default:
                vars.push(`
                `);
                break;
        }
    }
    // wireframe
    vars.push(`
        @sugar.lod.wireframe {
            &::-webkit-slider-runnable-track {
                @sugar.wireframe.background;
                @sugar.wireframe.border;
            }
            &::-moz-range-track {
                @sugar.wireframe.background;
                @sugar.wireframe.border;
            }
            &::-ms-track {
                @sugar.wireframe.background;
                @sugar.wireframe.border;
            }

            &::-ms-fill-lower {
                @sugar.wireframe.background;
                @sugar.wireframe.border;
            }

            &::-ms-fill-upper {
                @sugar.wireframe.background;
                @sugar.wireframe.border;
            }

            &::-webkit-slider-thumb {
                @sugar.wireframe.background;
                @sugar.wireframe.border;
            }
            &::-moz-range-thumb {
                @sugar.wireframe.background;
                @sugar.wireframe.border;
            }
            &::-ms-thumb {
                @sugar.wireframe.background;
                @sugar.wireframe.border;
            }
        }
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBTSxrQ0FBbUMsU0FBUSxxQkFBWTtJQUN6RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQzlDO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPOEMsdURBQVM7QUFDeEQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEdBQUcsRUFBRSxPQUFPLEVBQ1osS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhO1FBQ25COzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBbUJQO0tBQ0ksQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFHOztLQUVoQixDQUFDO0lBQ0YsTUFBTSxZQUFZLEdBQUc7Ozs7S0FJcEIsQ0FBQztJQUNGLE1BQU0sUUFBUSxHQUFHOzs7OztLQUtoQixDQUFDO0lBQ0YsTUFBTSxZQUFZLEdBQUc7Ozs7O0tBS3BCLENBQUM7SUFFRixNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkFzQ0EsUUFBUTs7O2tCQUdSLFFBQVE7OztrQkFHUixRQUFROzs7O2tCQUlSLFFBQVE7Ozs7OztrQkFNUixRQUFROzs7Ozs7a0JBTVIsUUFBUTs7Ozs7Ozs7Ozs7Ozs7OztLQWdCckIsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7a0JBZUEsWUFBWTs7OztrQkFJWixZQUFZOzs7Ozs7a0JBTVosWUFBWTs7Ozs7a0JBS1osWUFBWTs7OztrQkFJWixZQUFZOzs7Ozs7Ozs7a0JBU1osWUFBWTs7Ozs7Ozs7Ozs7Ozs7O0tBZXpCLENBQUMsQ0FBQztLQUNGO0lBRUQsUUFBUTtJQUNSLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsUUFBUSxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ3JCO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ1QsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsWUFBWTtJQUNaLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBc0NULENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUEvUEQsNEJBK1BDIn0=