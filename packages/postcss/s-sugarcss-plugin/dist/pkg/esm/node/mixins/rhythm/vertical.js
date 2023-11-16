import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class SSugarcssPluginRhythmVerticalMixinInterface extends __SInterface {
    static get _definition() {
        return {
            themePath: {
                description: 'Specify a dot theme path where to get an object to apply for the vertical rhythm',
                type: 'String',
            },
        };
    }
}
export { SSugarcssPluginRhythmVerticalMixinInterface as interface };
/**
 * @name           vertical
 * @as              @s.rhythm.vertical
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
 * @snippet         @s.rhythm.vertical
 * @s.rhythm.vertical {
 *      $1
 * }
 *
 * @example        css          Custom styling
 * .my-cool-element {
 *    @s.rhythm.vertical {
 *      margin-bottom: 50px;
 *    }
 * }
 *
 * @example         css         Theme dot path
 * .my-cool-element {
 *    @s.rhythm.vertical(ui.codeExample.rhythmVertical);
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
            __STheme.current.jsObjectToCssProperties((_a = __STheme.current.get(params.themePath)) !== null && _a !== void 0 ? _a : {}),
        ];
    }
    if (atRule.parent && atRule.parent.selector && themeGeneratedCss) {
        const newCss = `
            .s-rhythm-vertical > ${atRule.parent.selector} {
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
                    return `.s-rhythm-vertical > ${sel}`;
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
        generatedCss.push(`.s-rhythm-vertical > ${atRule.parent.selector} {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sMkNBQTRDLFNBQVEsWUFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCxrRkFBa0Y7Z0JBQ3RGLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSwyQ0FBMkMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU1wRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFDRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEdBS2I7O0lBQ0csTUFBTSxXQUFXLEdBQUcsa0JBQ2IsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLElBQUksWUFBWSxHQUFhLEVBQUUsRUFDM0IsaUJBQWlCLENBQUM7SUFFdEIsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO1FBQ2xCLGlCQUFpQixHQUFHO1lBQ2hCLFFBQVEsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLENBQ3BDLE1BQUEsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxtQ0FBSSxFQUFFLENBQy9DO1NBQ0osQ0FBQztLQUNMO0lBRUQsSUFBSSxNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxJQUFJLGlCQUFpQixFQUFFO1FBQzlELE1BQU0sTUFBTSxHQUFHO21DQUNZLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUTtrQkFDdkMsaUJBQWlCOztTQUUxQixDQUFDO1FBQ0YsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM3QjtJQUVELE1BQU0sWUFBWSxHQUFhLEVBQUUsQ0FBQztJQUVsQyxtQkFBbUI7SUFDbkIsSUFBSSxNQUFBLE1BQU0sQ0FBQyxLQUFLLDBDQUFFLE1BQU0sRUFBRTtRQUN0QixNQUFBLE1BQU0sQ0FBQyxLQUFLLDBDQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOztZQUMzQixZQUFZO1lBQ1osSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVE7cUJBQ3hCLEtBQUssQ0FBQyxHQUFHLENBQUM7cUJBQ1YsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7b0JBQ1QsT0FBTyx3QkFBd0IsR0FBRyxFQUFFLENBQUM7Z0JBQ3pDLENBQUMsQ0FBQztxQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDbEI7aUJBQU07Z0JBQ0gsZUFBZTtnQkFDZixZQUFZLENBQUMsSUFBSSxDQUFDLE1BQUEsTUFBQSxJQUFJLENBQUMsUUFBUSxvREFBSSxtQ0FBSSxFQUFFLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2pCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUVELElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtRQUNyQixZQUFZLENBQUMsSUFBSSxDQUFDLHdCQUF3QixNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVE7a0JBQ3RELFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO2NBQzNCLENBQUMsQ0FBQztLQUNYO0lBRUQsZ0JBQWdCO0lBQ2hCLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtRQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDeEM7S0FDSjtJQUVELElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtRQUNyQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUNwQztTQUFNO1FBQ0gsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ25CO0FBQ0wsQ0FBQyJ9