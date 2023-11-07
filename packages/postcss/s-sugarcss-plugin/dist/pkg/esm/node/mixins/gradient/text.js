import { interface as SSugarcssPluginGradientInterface } from './gradient.js';
/**
 * @name           text
 * @as              @s.gradient.text
 * @namespace      node.mixin.gradient
 * @type           PostcssMixin
 * @platform      postcss
 * @status        alpha
 *
 * This mixin generate all the css needed to apply a gradient on your text
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.gradient.text($1, $2, $3)
 *
 * @example        css
 * .my-cool-element {
 *    @s.gradient.text(accent, secondary, radial);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export { SSugarcssPluginGradientInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const vars = [
        `
        background-size: 100%;
        background-clip: text;
        color: transparent;
        @s.gradient ${atRule.params};
    `,
    ];
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLElBQUksZ0NBQWdDLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFOUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUVILE9BQU8sRUFBRSxnQ0FBZ0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV6RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxJQUFJLEdBQWE7UUFDbkI7Ozs7c0JBSWMsTUFBTSxDQUFDLE1BQU07S0FDOUI7S0FDQSxDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9