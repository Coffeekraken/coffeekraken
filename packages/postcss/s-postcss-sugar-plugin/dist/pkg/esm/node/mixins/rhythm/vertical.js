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
 * @as              @sugar.rhythm.vertical
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sOENBQStDLFNBQVEsWUFBWTtJQUNyRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCxrRkFBa0Y7Z0JBQ3RGLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSw4Q0FBOEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU12RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFDRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEdBS2I7O0lBQ0csTUFBTSxXQUFXLEdBQUcsa0JBQ2IsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLElBQUksWUFBWSxHQUFhLEVBQUUsRUFDM0IsaUJBQWlCLENBQUM7SUFFdEIsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFO1FBQ2xCLGlCQUFpQixHQUFHO1lBQ2hCLFFBQVEsQ0FBQyx1QkFBdUIsQ0FDNUIsTUFBQSxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsbUNBQUksRUFBRSxDQUN2QztTQUNKLENBQUM7S0FDTDtJQUVELElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxpQkFBaUIsRUFBRTtRQUM5RCxNQUFNLE1BQU0sR0FBRztvQ0FDYSxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVE7a0JBQ3hDLGlCQUFpQjs7U0FFMUIsQ0FBQztRQUNGLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDN0I7SUFFRCxNQUFNLFlBQVksR0FBYSxFQUFFLENBQUM7SUFFbEMsbUJBQW1CO0lBQ25CLElBQUksTUFBQSxNQUFNLENBQUMsS0FBSywwQ0FBRSxNQUFNLEVBQUU7UUFDdEIsTUFBQSxNQUFNLENBQUMsS0FBSywwQ0FBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTs7WUFDM0IsWUFBWTtZQUNaLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDZixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRO3FCQUN4QixLQUFLLENBQUMsR0FBRyxDQUFDO3FCQUNWLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUNULE9BQU8seUJBQXlCLEdBQUcsRUFBRSxDQUFDO2dCQUMxQyxDQUFDLENBQUM7cUJBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ2xCO2lCQUFNO2dCQUNILGVBQWU7Z0JBQ2YsWUFBWSxDQUFDLElBQUksQ0FBQyxNQUFBLE1BQUEsSUFBSSxDQUFDLFFBQVEsb0RBQUksbUNBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUNqQjtRQUNMLENBQUMsQ0FBQyxDQUFDO0tBQ047SUFFRCxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUU7UUFDckIsWUFBWSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRO2tCQUN2RCxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztjQUMzQixDQUFDLENBQUM7S0FDWDtJQUVELGdCQUFnQjtJQUNoQixJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUU7UUFDckIsS0FBSyxJQUFJLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQy9DLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hDO0tBQ0o7SUFFRCxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDckMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDcEM7U0FBTTtRQUNILE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztLQUNuQjtBQUNMLENBQUMifQ==