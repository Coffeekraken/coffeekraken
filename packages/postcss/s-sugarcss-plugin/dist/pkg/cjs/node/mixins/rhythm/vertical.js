"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class SSugarcssPluginRhythmVerticalMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            themePath: {
                description: 'Specify a dot theme path where to get an object to apply for the vertical rhythm',
                type: 'String',
            },
        };
    }
}
exports.interface = SSugarcssPluginRhythmVerticalMixinInterface;
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
function default_1({ params, atRule, postcssApi, }) {
    var _a, _b, _c;
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    let generatedCss = [], themeGeneratedCss;
    if (params.themePath) {
        themeGeneratedCss = [
            s_theme_1.default.jsObjectToCssProperties((_a = s_theme_1.default.get(params.themePath)) !== null && _a !== void 0 ? _a : {}),
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSwyQ0FBNEMsU0FBUSxxQkFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsU0FBUyxFQUFFO2dCQUNQLFdBQVcsRUFDUCxrRkFBa0Y7Z0JBQ3RGLElBQUksRUFBRSxRQUFRO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUN1RCxnRUFBUztBQU1qRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFDRztBQUNILG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsR0FLYjs7SUFDRyxNQUFNLFdBQVcsR0FBRyxrQkFDYixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsSUFBSSxZQUFZLEdBQWEsRUFBRSxFQUMzQixpQkFBaUIsQ0FBQztJQUV0QixJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7UUFDbEIsaUJBQWlCLEdBQUc7WUFDaEIsaUJBQVEsQ0FBQyx1QkFBdUIsQ0FDNUIsTUFBQSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLG1DQUFJLEVBQUUsQ0FDdkM7U0FDSixDQUFDO0tBQ0w7SUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksaUJBQWlCLEVBQUU7UUFDOUQsTUFBTSxNQUFNLEdBQUc7bUNBQ1ksTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRO2tCQUN2QyxpQkFBaUI7O1NBRTFCLENBQUM7UUFDRixZQUFZLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzdCO0lBRUQsTUFBTSxZQUFZLEdBQWEsRUFBRSxDQUFDO0lBRWxDLG1CQUFtQjtJQUNuQixJQUFJLE1BQUEsTUFBTSxDQUFDLEtBQUssMENBQUUsTUFBTSxFQUFFO1FBQ3RCLE1BQUEsTUFBTSxDQUFDLEtBQUssMENBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7O1lBQzNCLFlBQVk7WUFDWixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUTtxQkFDeEIsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtvQkFDVCxPQUFPLHdCQUF3QixHQUFHLEVBQUUsQ0FBQztnQkFDekMsQ0FBQyxDQUFDO3FCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNsQjtpQkFBTTtnQkFDSCxlQUFlO2dCQUNmLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBQSxNQUFBLElBQUksQ0FBQyxRQUFRLG9EQUFJLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDakI7UUFDTCxDQUFDLENBQUMsQ0FBQztLQUNOO0lBRUQsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFO1FBQ3JCLFlBQVksQ0FBQyxJQUFJLENBQUMsd0JBQXdCLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUTtrQkFDdEQsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7Y0FDM0IsQ0FBQyxDQUFDO0tBQ1g7SUFFRCxnQkFBZ0I7SUFDaEIsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFO1FBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUMvQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN4QztLQUNKO0lBRUQsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFO1FBQ3JDLE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3BDO1NBQU07UUFDSCxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDbkI7QUFDTCxDQUFDO0FBeEVELDRCQXdFQyJ9