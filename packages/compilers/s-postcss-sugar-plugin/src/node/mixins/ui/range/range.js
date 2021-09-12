import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiRangeInterface extends __SInterface {
}
postcssSugarPluginUiRangeInterface.definition = {
    style: {
        type: 'String',
        values: ['solid'],
        default: __theme().config('ui.range.defaultStyle'),
    },
    scope: {
        type: 'Array<String>',
        values: ['bare', 'lnf'],
        default: ['bare', 'lnf'],
    },
};
export { postcssSugarPluginUiRangeInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: 'solid', scope: ['bare', 'lnf'] }, params);
    const vars = [
        `
        --track-color: sugar.color(main, ui);
        --thumb-color: sugar.color(ui);

        --focus-spread: sugar.theme(ui.focusOutline.borderWidth);

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
    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`
                `);
                break;
        }
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxNQUFNLGtDQUFtQyxTQUFRLFlBQVk7O0FBQ2xELDZDQUFVLEdBQUc7SUFDaEIsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDakIsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQztLQUNyRDtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztLQUMzQjtDQUNKLENBQUM7QUFRTixPQUFPLEVBQUUsa0NBQWtDLElBQUksU0FBUyxFQUFFLENBQUM7QUFDM0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsT0FBTyxFQUNkLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYTtRQUNuQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBcUJQO0tBQ0ksQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFHOztLQUVoQixDQUFDO0lBQ0YsTUFBTSxZQUFZLEdBQUc7Ozs7S0FJcEIsQ0FBQztJQUNGLE1BQU0sUUFBUSxHQUFHOzs7OztLQUtoQixDQUFDO0lBQ0YsTUFBTSxZQUFZLEdBQUc7Ozs7O0tBS3BCLENBQUM7SUFFRixNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkE2QkEsUUFBUTs7O2tCQUdSLFFBQVE7OztrQkFHUixRQUFROzs7O2tCQUlSLFFBQVE7Ozs7OztrQkFNUixRQUFROzs7Ozs7a0JBTVIsUUFBUTs7Ozs7Ozs7Ozs7Ozs7OztLQWdCckIsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7OztrQkFjQSxZQUFZOzs7O2tCQUlaLFlBQVk7Ozs7OztrQkFNWixZQUFZOzs7OztrQkFLWixZQUFZOzs7O2tCQUlaLFlBQVk7Ozs7Ozs7OztrQkFTWixZQUFZOzs7Ozs7Ozs7Ozs7Ozs7S0FlekIsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxRQUFRO0lBQ1IsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsS0FBSyxPQUFPLENBQUM7WUFDYjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDO2lCQUNULENBQUMsQ0FBQztnQkFDSCxNQUFNO1NBQ2I7S0FDSjtJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=