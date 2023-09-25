"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name          blockquote
 * @as          @sugar.ui.blockquote
 * @namespace     node.mixin.ui.blockquote
 * @type          PostcssMixin
 * @interface     ./blockquote
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate the "blockquote" UI component css.
 *
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @sugar.ui.blockquote
 *
 * @example       css
 * .my-element {
 *      \@sugar.ui.blockquote();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiBlockquoteInterface extends s_interface_1.default {
    static get _definition() {
        return {
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
exports.interface = postcssSugarPluginUiBlockquoteInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ scope: ['bare', 'lnf'] }, params);
    const vars = [];
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: sugar.scalable(1rem);
        `);
    }
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            display: block;
            padding-inline: sugar.padding(ui.blockquote.paddingInline);
            padding-block: sugar.padding(ui.blockquote.paddingBlock);
    `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            border-inline-start: sugar.theme(ui.blockquote.borderWidth) solid sugar.color(current);
            color: sugar.color(current, foreground);
            background-color: sugar.color(current, surface);
            font-size: sugar.scalable(1rem);
            @sugar.shape();
            @sugar.font.family(quote);
    `);
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSCxNQUFNLHVDQUF3QyxTQUFRLHFCQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1tRCw0REFBUztBQUU3RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7O1NBRVQsQ0FBQyxDQUFDO0tBQ047SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJYixDQUFDLENBQUM7S0FDRjtJQUNELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OztLQU9iLENBQUMsQ0FBQztLQUNGO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXpDRCw0QkF5Q0MifQ==