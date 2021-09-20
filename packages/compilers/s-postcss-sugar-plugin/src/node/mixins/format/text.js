import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginFormatTextlMixinInterface extends __SInterface {
}
postcssSugarPluginFormatTextlMixinInterface.definition = {};
export { postcssSugarPluginFormatTextlMixinInterface as interface };
/**
 * @name           text
 * @namespace      mixins.format
 * @type           Mixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to scope some css that you want to apply only in text format context.
 * Your css will be scoped inside the "s-format:text" class.
 *
 * @return      {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.format.text {
 *      font-size: 20px;
 *      margin-bottom: 50px;
 *    }
 * }
 *
 * @example       html
 * <h1 class="my-cool-element s-rhythm\:vertical">Hello world</h1>
 * <div class="s-format\:text">
 *     <h1 class="my-cool-element">Hello world</h1>
 * </div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({ params, atRule, unwrap, postcssApi, }) {
    var _a;
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    (_a = atRule.nodes) === null || _a === void 0 ? void 0 : _a.forEach((node) => {
        if (node.selector && !node.selector.match(/^\.s-format--text/)) {
            node.selector = node.selector
                .split(',')
                .map((sel) => {
                return `.s-format--text ${sel}:not(.s-format--none ${sel}), .preview .s-format--text ${sel}`;
            })
                .join(',');
        }
    });
    atRule.replaceWith(atRule.nodes);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSwyQ0FBNEMsU0FBUSxZQUFZOztBQUMzRCxzREFBVSxHQUFHLEVBQUUsQ0FBQztBQUUzQixPQUFPLEVBQUUsMkNBQTJDLElBQUksU0FBUyxFQUFFLENBQUM7QUFJcEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsR0FNYjs7SUFDRyxNQUFNLFdBQVcsR0FBRyxrQkFDYixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsTUFBQSxNQUFNLENBQUMsS0FBSywwQ0FBRSxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMzQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO1lBQzVELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVE7aUJBQ3hCLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ1QsT0FBTyxtQkFBbUIsR0FBRyx3QkFBd0IsR0FBRywrQkFBK0IsR0FBRyxFQUFFLENBQUM7WUFDakcsQ0FBQyxDQUFDO2lCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNsQjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDckMsQ0FBQyJ9