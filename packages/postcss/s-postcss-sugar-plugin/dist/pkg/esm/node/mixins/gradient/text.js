import { interface as PostcssSugarPluginGradientInterface } from './gradient.js';
/**
 * @name           text
 * @as              @sugar.gradient.text
 * @namespace      node.mixin.gradient
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the css needed to apply a gradient on your text
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.gradient.text($1, $2, $3)
 *
 * @example        css
 * .my-cool-element {
 *    \@sugar.gradient.text(accent, secondary, radial);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export { PostcssSugarPluginGradientInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const vars = [
        `
        background-size: 100%;
        background-clip: text;
        color: transparent;
        @sugar.gradient ${atRule.params};
    `,
    ];
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLElBQUksbUNBQW1DLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFakY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUVILE9BQU8sRUFBRSxtQ0FBbUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU1RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxJQUFJLEdBQWE7UUFDbkI7Ozs7MEJBSWtCLE1BQU0sQ0FBQyxNQUFNO0tBQ2xDO0tBQ0EsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==