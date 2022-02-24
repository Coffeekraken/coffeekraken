import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginRhythmVerticalMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginRhythmVerticalMixinInterface as interface };
/**
 * @name           vertical
 * @namespace      node.mixins.rhythm
 * @type           PostcssMixin
 * @platform      postcss
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVydGljYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2ZXJ0aWNhbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxNQUFNLDhDQUErQyxTQUFRLFlBQVk7SUFDckUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsOENBQThDLElBQUksU0FBUyxFQUFFLENBQUM7QUFJdkU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixVQUFVLEdBS2I7O0lBQ0csTUFBTSxXQUFXLEdBQUcsa0JBQ2IsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUNGLDBDQUEwQztJQUMxQywwQ0FBMEM7SUFDMUMsTUFBTTtJQUVOLE1BQUEsTUFBTSxDQUFDLEtBQUssMENBQUUsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQUUsT0FBTztRQUMzQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRO2FBQ3hCLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNULE9BQU8seUJBQXlCLEdBQUcsRUFBRSxDQUFDO1FBQzFDLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQixDQUFDLENBQUMsQ0FBQztJQUNILE1BQU0sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWpDLGdDQUFnQztJQUNoQyxtQ0FBbUM7SUFDbkMsTUFBTTtJQUNOLGlDQUFpQztBQUNyQyxDQUFDIn0=