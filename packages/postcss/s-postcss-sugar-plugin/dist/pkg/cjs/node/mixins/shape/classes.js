"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           classes
 * @namespace      node.mixin.spacing
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the spacing helper classes like s-p:10, s-pie:40, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.spacing.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginShapeClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginShapeClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Shape
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/shape
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a shape to any elements that support it using the
        * \`border-radius: sugar.border.radius(shape);\` statement.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.shape.classes;
        * 
        * @cssClass                 s-shape:default             Apply the default shape (default border radius)
        * @cssClass                 s-shape:square              Apply the square shape
        * @cssClass                 s-shape:pill                Apply the pill shape
        * 
        * @example        html              Shape on buttons
        * <a class="s-btn s-color:accent s-shape:default">Default shape</a>
        * <a class="s-btn s-color:accent s-shape:square">Square shape</a>
        * <a class="s-btn s-color:accent s-shape:pill">Pill shape</a>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `/**
* @name            s-shape:default
* @namespace          sugar.style.shape
* @type             CssClass
* @platform             css
* @status               beta
* 
* These classes allows you to apply a shape to any elements that support it using the
* \`border-radius: sugar.border.radius(shape);\` statement.
* 
* @example        html              Shape on buttons
* <a class="s-btn s-color:accent s-shape:default">Default shape</a>
* 
* @since        2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
`).code(`
.s-shape--default {
    @sugar.shape(default);
}`, { type: 'CssClass' });
    vars.comment(() => `/**
* @name            s-shape:square
* @namespace          sugar.style.shape
* @type             CssClass
* @platform             css
* @status               beta
* 
* These classes allows you to apply a shape to any elements that support it using the
* \`border-radius: sugar.border.radius(shape);\` statement.
* 
* @example        html              Shape on buttons
* <a class="s-btn s-color:accent s-shape:square">Default shape</a>
* 
* @since        2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
`).code(`
.s-shape--square {
    @sugar.shape(square);
}`, { type: 'CssClass' });
    vars.comment(() => `/**
* @name            s-shape:pill
* @namespace          sugar.style.shape
* @type             CssClass
* @platform             css
* @status               beta
* 
* These classes allows you to apply a shape to any elements that support it using the
* \`border-radius: sugar.border.radius(shape);\` statement.
* 
* @example        html              Shape on buttons
* <a class="s-btn s-color:accent s-shape:pill">Default shape</a>
* 
* @since        2.0.0
* @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
`).code(`
.s-shape--pill {
    @sugar.shape(pill);
}`, { type: 'CssClass' });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0sdUNBQXdDLFNBQVEscUJBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJbUQsNERBQVM7QUFFN0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQ1QsQ0FDQSxDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztDQWdCYixDQUNJLENBQUMsSUFBSSxDQUNGOzs7RUFHTixFQUNNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztDQWdCYixDQUNJLENBQUMsSUFBSSxDQUNGOzs7RUFHTixFQUNNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztDQWdCYixDQUNJLENBQUMsSUFBSSxDQUNGOzs7RUFHTixFQUNNLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXBJRCw0QkFvSUMifQ==