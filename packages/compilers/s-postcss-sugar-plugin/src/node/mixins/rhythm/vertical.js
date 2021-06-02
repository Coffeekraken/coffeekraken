import __SInterface from '@coffeekraken/s-interface';
import * as __postcss from 'postcss';
class postcssSugarPluginRhythmVerticalMixinInterface extends __SInterface {
}
postcssSugarPluginRhythmVerticalMixinInterface.definition = {};
export { postcssSugarPluginRhythmVerticalMixinInterface as interface };
/**
 * @name           vertical
 * @namespace      mixins.rhythm
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to scope some css that you want to apply only in vertical rhythm context
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.rhythm.vertical {
 *      margin-bottom: 50px;
 *    }
 * }
 *
 * @example       html
 * <h1 class="my-cool-element s-rhythm-vertical">Hello world</h1>
 * <div class="s-rhythm-vertical">
 *     <h1 class="my-cool-element">Hello world</h1>
 * </div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    const container = __postcss.rule({
        selectors: [`.s-rhythm-vertical`]
    });
    atRule.nodes.forEach(n => {
        container.append(n.clone());
    });
    atRule.replaceWith(container);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2ZXJ0aWNhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLEtBQUssU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUVyQyxNQUFNLDhDQUErQyxTQUFRLFlBQVk7O0FBQ2hFLHlEQUFVLEdBQUcsRUFBRSxDQUFDO0FBRXpCLE9BQU8sRUFBRSw4Q0FBOEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUt2RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFJUDtJQUNDLE1BQU0sV0FBVyxHQUFHLGtCQUNmLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ2xCLENBQUM7SUFDRixNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQy9CLFNBQVMsRUFBRSxDQUFDLG9CQUFvQixDQUFDO0tBQ2xDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3ZCLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDOUIsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2hDLENBQUMifQ==