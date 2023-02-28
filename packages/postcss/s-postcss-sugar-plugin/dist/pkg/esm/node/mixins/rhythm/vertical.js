import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginRhythmVerticalMixinInterface extends __SInterface {
    static get _definition() {
        return {
            themePath: {
                description: 'Specify a dot theme path where to get an object to apply for the vertical rhythm',
                type: 'String',
            },
        };
    }
}
export { postcssSugarPluginRhythmVerticalMixinInterface as interface };
/**
 * @name           vertical
 * @namespace      node.mixin.rhythm
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to scope some css that you want to apply only in vertical rhythm context.
 * Your css will be scoped inside the "s-rhythm:vertical" class.
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @sugar.rhythm.vertical
 * \@sugar.rhythm.vertical {
 *      $1
 * }
 *
 * @example        css          Custom styling
 * .my-cool-element {
 *    \@sugar.rhythm.vertical {
 *      margin-bottom: 50px;
 *    }
 * }
 *
 * @example         css         Theme dot path
 * .my-cool-element {
 *    @sugar.rhythm.vertical(ui.codeExample.rhythmVertical);
 * }
 *
 * @example       html
 * <div class="s-rhythm\:vertical">
 *     <h1 class="my-cool-element">Hello world</h1>
 * </div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, postcssApi, }) {
    var _a, _b, _c;
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    let generatedCss = [], themeGeneratedCss;
    if (params.themePath) {
        themeGeneratedCss = [
            __STheme.jsObjectToCssProperties((_a = __STheme.get(params.themePath)) !== null && _a !== void 0 ? _a : {}),
        ];
    }
    if (atRule.parent && atRule.parent.selector && themeGeneratedCss) {
        const newCss = `
            .s-rhythm--vertical > ${atRule.parent.selector} {
                ${themeGeneratedCss}
            }
        `;
        generatedCss.push(newCss);
    }
    const declarations = [];
    // nested selectors
    if ((_b = atRule.nodes) === null || _b === void 0 ? void 0 : _b.length) {
        (_c = atRule.nodes) === null || _c === void 0 ? void 0 : _c.forEach((node) => {
            var _a, _b;
            // selectors
            if (node.selector) {
                node.selector = node.selector
                    .split(',')
                    .map((sel) => {
                    return `.s-rhythm--vertical > ${sel}`;
                })
                    .join(',');
            }
            else {
                // declarations
                declarations.push((_b = (_a = node.toString) === null || _a === void 0 ? void 0 : _a.call(node)) !== null && _b !== void 0 ? _b : '');
                node.remove();
            }
        });
    }
    if (declarations.length) {
        generatedCss.push(`.s-rhythm--vertical > ${atRule.parent.selector} {
                ${declarations.join('\n')}
            }`);
    }
    // generated css
    if (generatedCss.length) {
        for (let i = generatedCss.length - 1; i >= 0; i--) {
            atRule.parent.after(generatedCss[i]);
        }
    }
    if (atRule.nodes && atRule.nodes.length) {
        atRule.replaceWith(atRule.nodes);
    }
    else {
        atRule.remove();
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sOENBQStDLFNBQVEsWUFBWTtJQUNyRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCxrRkFBa0Y7Z0JBQ3RGLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSw4Q0FBOEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU12RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsR0FLYjs7SUFDRyxNQUFNLFdBQVcsR0FBRyxrQkFDYixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsSUFBSSxZQUFZLEdBQWEsRUFBRSxFQUMzQixpQkFBaUIsQ0FBQztJQUV0QixJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7UUFDbEIsaUJBQWlCLEdBQUc7WUFDaEIsUUFBUSxDQUFDLHVCQUF1QixDQUM1QixNQUFBLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxtQ0FBSSxFQUFFLENBQ3ZDO1NBQ0osQ0FBQztLQUNMO0lBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLGlCQUFpQixFQUFFO1FBQzlELE1BQU0sTUFBTSxHQUFHO29DQUNhLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUTtrQkFDeEMsaUJBQWlCOztTQUUxQixDQUFDO1FBQ0YsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM3QjtJQUVELE1BQU0sWUFBWSxHQUFhLEVBQUUsQ0FBQztJQUVsQyxtQkFBbUI7SUFDbkIsSUFBSSxNQUFBLE1BQU0sQ0FBQyxLQUFLLDBDQUFFLE1BQU0sRUFBRTtRQUN0QixNQUFBLE1BQU0sQ0FBQyxLQUFLLDBDQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOztZQUMzQixZQUFZO1lBQ1osSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVE7cUJBQ3hCLEtBQUssQ0FBQyxHQUFHLENBQUM7cUJBQ1YsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ1QsT0FBTyx5QkFBeUIsR0FBRyxFQUFFLENBQUM7Z0JBQzFDLENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEI7aUJBQU07Z0JBQ0gsZUFBZTtnQkFDZixZQUFZLENBQUMsSUFBSSxDQUFDLE1BQUEsTUFBQSxJQUFJLENBQUMsUUFBUSxvREFBSSxtQ0FBSSxFQUFFLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2pCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUVELElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtRQUNyQixZQUFZLENBQUMsSUFBSSxDQUFDLHlCQUF5QixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVE7a0JBQ3ZELFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2NBQzNCLENBQUMsQ0FBQztLQUNYO0lBRUQsZ0JBQWdCO0lBQ2hCLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEM7S0FDSjtJQUVELElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtRQUNyQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNwQztTQUFNO1FBQ0gsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ25CO0FBQ0wsQ0FBQyJ9