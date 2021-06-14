import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString';
class postcssSugarPluginStateHoverMixinInterface extends __SInterface {
}
postcssSugarPluginStateHoverMixinInterface.definition = {};
export { postcssSugarPluginStateHoverMixinInterface as interface };
/**
 * @name           hover
 * @namespace      mixins.state
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to target some hoverable items to apply correct color schema
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * .myCoolItem {
 *  \@sugar.state.hover {
 *      // ...
 *  }
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ className: '' }, (params !== null && params !== void 0 ? params : {}));
    const vars = [];
    // vars.push(
    //   // `&:hover, [hoverable]:hover:not([hoverable]:not(:hover) &) {`,
    //   `&:hover {`
    // );
    // vars.push(__astNodesToString(atRule.nodes));
    // vars.push(`}`);
    vars.push(`&:hover {`);
    vars.push(__astNodesToString(atRule.nodes));
    vars.push(`}`);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJob3Zlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxPQUFPLGtCQUFrQixNQUFNLDhCQUE4QixDQUFDO0FBRTlELE1BQU0sMENBQTJDLFNBQVEsWUFBWTs7QUFDNUQscURBQVUsR0FBRyxFQUFFLENBQUM7QUFFekIsT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBSW5FOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxHQUFHLGdCQUNsQixTQUFTLEVBQUUsRUFBRSxJQUNWLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ2xCLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsYUFBYTtJQUNiLHNFQUFzRTtJQUN0RSxnQkFBZ0I7SUFDaEIsS0FBSztJQUNMLCtDQUErQztJQUMvQyxrQkFBa0I7SUFFbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9