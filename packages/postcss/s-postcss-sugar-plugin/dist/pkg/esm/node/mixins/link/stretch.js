import __SInterface from '@coffeekraken/s-interface';
/**
 * @name            stretch
 * @as              @s.link.stretch
 * @namespace       node.mixin.link
 * @type            PostcssMixin
 * @platform        css
 * @status          beta
 *
 * This mixin allows you to stretch a link clickable area without having to change the actual link css.
 * It uses the `after` pseudo class to create a new clickable area that will spend until it reach an element that as a position specified.
 *
 * @return          {Css}                                   The generated css
 *
 * @snippet         @s.link.stretch
 *
 * @example         css
 * .my-cool-element {
 *      @s.link.stretch;
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginLinkStretchInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginLinkStretchInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    // @ts-ignore
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
    `).code(() => `
        &:after {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 1;
            pointer-events: auto;
            content: '';
            background-color: rgba(0, 0, 0, 0);
        }
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZO0lBQzdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBUUQsT0FBTyxFQUFFLHNDQUFzQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csYUFBYTtJQUNiLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQztLQUNULENBQ0EsQ0FBQyxJQUFJLENBQ0YsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OztLQVlULENBQ0EsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==