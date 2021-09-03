import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginStateFocusOutlineMixinInterface extends __SInterface {
}
postcssSugarPluginStateFocusOutlineMixinInterface.definition = {};
export { postcssSugarPluginStateFocusOutlineMixinInterface as interface };
/**
 * @name           focus
 * @namespace      mixins.state
 * @type           Mixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to set any CSS elements display a custom outline
 * when it's in focus state
 *
 *
 * @return      {Css}         The generated css
 *
 * @example         postcss
 * .myCoolItem {
 *      @sugar.state.focusOutline();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ className: '' }, (params !== null && params !== void 0 ? params : {}));
    const vars = [];
    if (!__theme().config('ui.focusOutline.active'))
        return;
    vars.push(`

        position: relative;

        &:after {
            content: '';
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            box-shadow: 0 0 0 0 sugar.color(ui, --alpha 0.2);
            border-radius: sugar.theme(ui.focusOutline.borderRadius);
            transition: sugar.theme(ui.focusOutline.transition);
        }

        &:focus-visible {
            &:not(:hover):not(:active):after {
                box-shadow: 0 0 0 sugar.theme(ui.focusOutline.borderWidth) sugar.color(ui, --alpha 0.3);
            }
        }
    `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9jdXNPdXRsaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZm9jdXNPdXRsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE9BQU8sT0FBTyxNQUFNLG1CQUFtQixDQUFDO0FBRXhDLE1BQU0saURBQWtELFNBQVEsWUFBWTs7QUFDakUsNERBQVUsR0FBRyxFQUFFLENBQUM7QUFFM0IsT0FBTyxFQUFFLGlEQUFpRCxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBSTFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsR0FBRyxnQkFDaEIsU0FBUyxFQUFFLEVBQUUsSUFDVixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUM7UUFBRSxPQUFPO0lBRXhELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FtQlQsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==