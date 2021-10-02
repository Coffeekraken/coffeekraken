import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginRhythmVerticalMixinInterface extends __SInterface {
}
postcssSugarPluginRhythmVerticalMixinInterface.definition = {};
export { postcssSugarPluginRhythmVerticalMixinInterface as interface };
/**
 * @name           vertical
 * @namespace      mixins.rhythm
 * @type           Mixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to scope some css that you want to apply only in vertical rhythm context.
 * Your css will be scoped inside the "s-rhythm:vertical" class.
 *
 * @return      {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.rhythm.vertical {
 *      margin-bottom: 50px;
 *    }
 * }
 *
 * @example       html
 * <h1 class="my-cool-element s-rhythm\:vertical">Hello world</h1>
 * <div class="s-rhythm\:vertical">
 *     <h1 class="my-cool-element">Hello world</h1>
 * </div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, postcssApi, }) {
    var _a;
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    // const container = new postcssApi.Rule({
    //     selectors: [`.s-rhythm--vertical`],
    // });
    (_a = atRule.nodes) === null || _a === void 0 ? void 0 : _a.forEach((node) => {
        if (!node.selector)
            return;
        node.selector = node.selector
            .split(',')
            .map((sel) => {
            return `.s-rhythm--vertical > ${sel}`;
        })
            .join(',');
    });
    atRule.replaceWith(atRule.nodes);
    // atRule.nodes.forEach((n) => {
    //     container.append(n.clone());
    // });
    // atRule.replaceWith(container);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2ZXJ0aWNhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxNQUFNLDhDQUErQyxTQUFRLFlBQVk7O0FBQzlELHlEQUFVLEdBQUcsRUFBRSxDQUFDO0FBRTNCLE9BQU8sRUFBRSw4Q0FBOEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUl2RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsR0FLYjs7SUFDRyxNQUFNLFdBQVcsR0FBRyxrQkFDYixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBQ0YsMENBQTBDO0lBQzFDLDBDQUEwQztJQUMxQyxNQUFNO0lBRU4sTUFBQSxNQUFNLENBQUMsS0FBSywwQ0FBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFBRSxPQUFPO1FBQzNCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVE7YUFDeEIsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1QsT0FBTyx5QkFBeUIsR0FBRyxFQUFFLENBQUM7UUFDMUMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFakMsZ0NBQWdDO0lBQ2hDLG1DQUFtQztJQUNuQyxNQUFNO0lBQ04saUNBQWlDO0FBQ3JDLENBQUMifQ==