import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString.js';
class SSugarcssPluginStateHoverMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginStateHoverMixinInterface as interface };
/**
 * @name           hover
 * @as              @s.state.hover
 * @namespace      node.mixin.state
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to target some hover item to apply some styling on it.
 * Here's the generated selector:
 * - &:hover
 *
 * @snippet         @s.state.hover
 * @s.state.hover {
 *      $1
 * }
 *
 * @example        css
 * .myCoolItem {
 *  @s.state.hover {
 *      // ...
 *  }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ className: '' }, (params !== null && params !== void 0 ? params : {}));
    const vars = [];
    vars.push(`&:hover {`);
    vars.push(__astNodesToString(atRule.nodes));
    vars.push(`}`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sa0JBQWtCLE1BQU0saUNBQWlDLENBQUM7QUFFakUsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBQ0QsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBSWhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsR0FBRyxnQkFDaEIsU0FBUyxFQUFFLEVBQUUsSUFDVixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9