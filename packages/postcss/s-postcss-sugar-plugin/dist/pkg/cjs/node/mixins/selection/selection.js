"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginLiikAndFeelSelectionInterface extends s_interface_1.default {
    static get _definition() {
        return {
            color: {
                type: 'String',
                title: 'Color',
                description: 'Specify the color of the selection you want like "accent", "complementary", etc...',
                default: 'accent',
            },
        };
    }
}
exports.interface = postcssSugarPluginLiikAndFeelSelectionInterface;
/**
 * @name          selection
 * @as          @s.selection
 * @namespace     node.mixin.selection
 * @type          PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to apply a "selection" style to any HTMLElement.
 * This will apply a background and text color to the selected text.
 *
 * - Selection background and text color
 *
 * @param       {String}        layout      The layout to generate
 * @return      {Css}                   The corresponding grid css
 *
 * @snippet         @s.selection($1)
 *
 * @example       css
 * \@s.selection;
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ color: 'accent' }, params);
    const vars = [];
    const css = `
    ::selection {
        color: s.color(${finalParams.color}, --darken 20);
        background: s.color(${finalParams.color}, --lighten 30);
    }
  `;
    vars.push(css);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLCtDQUFnRCxTQUFRLHFCQUFZO0lBQ3RFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsV0FBVyxFQUNQLG9GQUFvRjtnQkFDeEYsT0FBTyxFQUFFLFFBQVE7YUFDcEI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTTJELG9FQUFTO0FBRXJFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsUUFBUSxJQUNaLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sR0FBRyxHQUFHOzt5QkFFUyxXQUFXLENBQUMsS0FBSzs4QkFDWixXQUFXLENBQUMsS0FBSzs7R0FFNUMsQ0FBQztJQUVBLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBMUJELDRCQTBCQyJ9