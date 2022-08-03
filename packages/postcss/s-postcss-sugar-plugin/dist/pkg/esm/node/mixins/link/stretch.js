import __SInterface from '@coffeekraken/s-interface';
/**
 * @name            stretch
 * @namespace       node.mixin.link
 * @type            PostcssMixin
 * @platform        css
 * @status          beta
 *
 * This mixin allows you to stretch a link clickable area without having to change the actual link css.
 * It uses the `after` pseudo class to create a new clickable area that will spend until it reach an element that as a position specified.
 *
 *
 * @return          {Css}                                   The generated css
 *
 * @example         css
 * .my-cool-element {
 *      @sugar.link.stretch;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sc0NBQXVDLFNBQVEsWUFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQVFELE9BQU8sRUFBRSxzQ0FBc0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLGFBQWE7SUFDYixNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7S0FDVCxDQUNBLENBQUMsSUFBSSxDQUNGLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7S0FZVCxDQUNBLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=