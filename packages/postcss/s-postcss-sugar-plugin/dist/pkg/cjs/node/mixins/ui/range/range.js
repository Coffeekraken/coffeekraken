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
 * @param       {'solid'}                           [style='theme.ui.range.defaultStyle']         The style you want to generate
 * @param       {'default'|'square'|'pill'|'circle'}             [shape='ui.range.defaultShape']         The shape you want to generate
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
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
            style: {
                type: 'String',
                values: ['solid'],
                default: s_theme_1.default.get('ui.range.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'pull', 'circle'],
                default: s_theme_1.default.get('ui.range.defaultShape'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape'],
                default: ['bare', 'lnf', 'shape'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiRangeInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: 'solid', shape: 'default', scope: ['bare', 'lnf', 'shape'] }, params);
    const vars = [
        `
        --track-color: sugar.color(main, ui);
        --thumb-color: sugar.color(current);

        --focus-spread: sugar.theme(ui.outline.borderWidth);

        --thumb-radius: 50%;
        --thumb-height: 1em;
        --thumb-width: 1em;
        --thumb-border-width: sugar.theme(ui.range.borderWidth);
        --thumb-border-color: sugar.color(current, border);

        --track-width: 100%;
        --track-height: 0.5em;
        --track-border-width: sugar.theme(ui.range.borderWidth);
        --track-border-color: sugar.color(current, border);

        --track-radius: sugar.border.radius(ui.range.borderRadius);
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
        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`
                `);
                break;
        }
    }
    // shapes
    if (finalParams.scope.includes('shape')) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    --thumb-radius: 0;
                    --track-radius: 0;
                `);
                break;
            case 'pill':
            case 'circle':
                vars.push(`
                    --thumb-radius: 9999px;
                    --track-radius: 9999px;
                `);
                break;
            default:
                vars.push(`
                    --thumb-radius: sugar.border.radius(ui.range.borderRadius);
                    --track-radius: sugar.border.radius(ui.range.borderRadius);
                `);
                break;
        }
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLGtDQUFtQyxTQUFRLHFCQUFZO0lBQ3pELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDakQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO2dCQUMvQyxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDakQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQztnQkFDaEMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7YUFDcEM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUThDLHVEQUFTO0FBQ3hELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsT0FBTyxFQUNkLEtBQUssRUFBRSxTQUFTLEVBQ2hCLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQzVCLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDbkI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQXFCUDtLQUNJLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBRzs7S0FFaEIsQ0FBQztJQUNGLE1BQU0sWUFBWSxHQUFHOzs7O0tBSXBCLENBQUM7SUFDRixNQUFNLFFBQVEsR0FBRzs7Ozs7S0FLaEIsQ0FBQztJQUNGLE1BQU0sWUFBWSxHQUFHOzs7OztLQUtwQixDQUFDO0lBRUYsTUFBTTtJQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBNkJBLFFBQVE7OztrQkFHUixRQUFROzs7a0JBR1IsUUFBUTs7OztrQkFJUixRQUFROzs7Ozs7a0JBTVIsUUFBUTs7Ozs7O2tCQU1SLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQnJCLENBQUMsQ0FBQztLQUNGO0lBRUQsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O2tCQWVBLFlBQVk7Ozs7a0JBSVosWUFBWTs7Ozs7O2tCQU1aLFlBQVk7Ozs7O2tCQUtaLFlBQVk7Ozs7a0JBSVosWUFBWTs7Ozs7Ozs7O2tCQVNaLFlBQVk7Ozs7Ozs7Ozs7Ozs7OztLQWV6QixDQUFDLENBQUM7S0FDRjtJQUVELFFBQVE7SUFDUixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN2QixLQUFLLE9BQU8sQ0FBQztZQUNiO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7aUJBQ1QsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsU0FBUztJQUNULElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7UUFDckMsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLEtBQUssUUFBUTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7aUJBR1QsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVixLQUFLLE1BQU0sQ0FBQztZQUNaLEtBQUssUUFBUTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7aUJBR1QsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7aUJBR1QsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTFPRCw0QkEwT0MifQ==