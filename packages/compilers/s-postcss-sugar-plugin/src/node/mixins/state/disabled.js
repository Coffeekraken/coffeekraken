import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString';
class postcssSugarPluginStateDisabledMixinInterface extends __SInterface {
}
postcssSugarPluginStateDisabledMixinInterface.definition = {};
export { postcssSugarPluginStateDisabledMixinInterface as interface };
/**
 * @name           disabled
 * @namespace      mixins.state
 * @type           Mixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to target some disabled items to apply some styling.
 * Here's the generated selector:
 * - &:disabled
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * .myCoolItem {
 *  \@sugar.state.disabled {
 *      // ...
 *  }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ className: '' }, (params !== null && params !== void 0 ? params : {}));
    const vars = [];
    vars.push(`&:disabled {`);
    vars.push(__astNodesToString(atRule.nodes));
    vars.push(`}`);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzYWJsZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaXNhYmxlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGtCQUFrQixNQUFNLDhCQUE4QixDQUFDO0FBRTlELE1BQU0sNkNBQThDLFNBQVEsWUFBWTs7QUFDN0Qsd0RBQVUsR0FBRyxFQUFFLENBQUM7QUFFM0IsT0FBTyxFQUFFLDZDQUE2QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBSXRFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixTQUFTLEVBQUUsRUFBRSxJQUNWLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9