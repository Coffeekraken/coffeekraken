import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           disabled
 * @as              @sugar.disabled
 * @namespace      node.mixin.disabled
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a the disabled styling to any HTMLElement.
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.disabled
 *
 * @example        css
 * .my-element {
 *    \@sugar.disabled();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginDisabledInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginDisabledInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`
        pointer-events: none;
        opacity: ${__STheme.cssVar('helpers.disabled.opacity')} !important;
        
        &:hover, &:focus, &:active {
            opacity: ${__STheme.cssVar('helpers.disabled.opacity')} !important;
        }

        &, * {
            cursor: not-allowed !important;
            user-select: none !important;
        }

    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLG1DQUFvQyxTQUFRLFlBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzttQkFFSyxRQUFRLENBQUMsTUFBTSxDQUFDLDBCQUEwQixDQUFDOzs7dUJBR3ZDLFFBQVEsQ0FBQyxNQUFNLENBQUMsMEJBQTBCLENBQUM7Ozs7Ozs7O0tBUTdELENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==