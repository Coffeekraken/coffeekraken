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
 * @return          {Css}                                   The generated css
 *
 * @snippet         @sugar.link.stretch
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLHNDQUF1QyxTQUFRLFlBQVk7SUFDN0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFRRCxPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxhQUFhO0lBQ2IsTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO0tBQ1QsQ0FDQSxDQUFDLElBQUksQ0FDRixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7O0tBWVQsQ0FDQSxDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9