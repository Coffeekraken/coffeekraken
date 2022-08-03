import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginFormatTextlMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginFormatTextlMixinInterface as interface };
/**
 * @name           text
 * @namespace      node.mixin.format
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to scope some css that you want to apply only in text format context.
 * Your css will be scoped inside the "s-format:text" class.
 *
 * @return      {Css}         The generated css
 *
 * @example        css
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sMkNBQTRDLFNBQVEsWUFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSwyQ0FBMkMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUlwRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixNQUFNLEVBQ04sVUFBVSxHQU1iOztJQUNHLE1BQU0sV0FBVyxHQUFHLGtCQUNiLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixNQUFBLE1BQU0sQ0FBQyxLQUFLLDBDQUFFLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQzNCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQUU7WUFDNUQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUTtpQkFDeEIsS0FBSyxDQUFDLEdBQUcsQ0FBQztpQkFDVixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDVCxPQUFPLG1CQUFtQixHQUFHLHdCQUF3QixHQUFHLCtCQUErQixHQUFHLEVBQUUsQ0FBQztZQUNqRyxDQUFDLENBQUM7aUJBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQyxDQUFDIn0=