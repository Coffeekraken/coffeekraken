"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name           scrollbar
 * @namespace      node.mixin.scrollbar
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to skin your scrollbar easily by applying a color and
 * a width to it.
 *
 * @return        {Css}           The generated css
 *
 * @example        css
 * body {
 *    @sugar.scrollbar(accent, 5px);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginScrollbarInterface extends s_interface_1.default {
    static get _definition() {
        return {
            color: {
                type: 'String',
                default: s_theme_1.default.get('ui.scrollbar.color'),
            },
            background: {
                type: 'String',
                default: s_theme_1.default.get('ui.scrollbar.color'),
            },
            size: {
                type: 'String',
                default: s_theme_1.default.get('ui.scrollbar.size'),
            },
        };
    }
}
exports.interface = postcssSugarPluginScrollbarInterface;
function default_1({ params, atRule, replaceWith, }) {
    var _a;
    const finalParams = Object.assign({ size: '5px', color: 'accent', background: 'main' }, params);
    const vars = [];
    // lnf
    vars.push(`
      &::-webkit-scrollbar {
          width: ${finalParams.size};
          height: ${finalParams.size};
      }
      &::-webkit-scrollbar-track {
            ${((_a = finalParams.background.match(/^sugar\.color/)) !== null && _a !== void 0 ? _a : finalParams.background.match(/^(var|hsla?|rgba?)\(/))
        ? `
                background-color: ${finalParams.background};
            `
        : `
                background-color: sugar.color(${finalParams.background}, --alpha 0.1);
            `}

      }
      &::-webkit-scrollbar-thumb {
          ${finalParams.color.match(/^sugar\.color/) ||
        finalParams.color.match(/^(var|hsla?|rgba?)\(/)
        ? `
                background-color: ${finalParams.color};
          `
        : `
            background-color: sugar.color(${finalParams.color});
          `}
      }
  `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLG9DQUFxQyxTQUFRLHFCQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQzlDO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUM5QztZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7YUFDN0M7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUWdELHlEQUFTO0FBQzFELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDs7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEtBQUssRUFDWCxLQUFLLEVBQUUsUUFBUSxFQUNmLFVBQVUsRUFBRSxNQUFNLElBQ2YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUM7O21CQUVLLFdBQVcsQ0FBQyxJQUFJO29CQUNmLFdBQVcsQ0FBQyxJQUFJOzs7Y0FJcEIsQ0FBQSxNQUFBLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxtQ0FDN0MsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUM7UUFDaEQsQ0FBQyxDQUFDO29DQUNjLFdBQVcsQ0FBQyxVQUFVO2FBQzdDO1FBQ08sQ0FBQyxDQUFDO2dEQUMwQixXQUFXLENBQUMsVUFBVTthQUUxRDs7OztZQUtFLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztRQUN4QyxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQztRQUMzQyxDQUFDLENBQUM7b0NBQ2dCLFdBQVcsQ0FBQyxLQUFLO1dBQzFDO1FBQ08sQ0FBQyxDQUFDOzRDQUN3QixXQUFXLENBQUMsS0FBSztXQUVuRDs7R0FFUCxDQUFDLENBQUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBcERELDRCQW9EQyJ9