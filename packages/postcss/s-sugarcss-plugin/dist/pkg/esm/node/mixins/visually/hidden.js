import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           hidden
 * @as              @s.visually.hidden
 * @namespace      node.mixin.visually
 * @type           PostcssMixin
 * @interface      ./hidden
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to apply a css that make the element visually hidden but not really
 * hidden like when make use of `display: none;`.
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.visually.hidden
 *
 * @example        css
 * .my-element {
 *  @s.visually.hidden;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginVisuallyHiddenMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginVisuallyHiddenMixinInterface as interface };
/**
 * @name           transition
 * @namespace      mixins.transition
 * @type           Mixin
 * @status        stable
 *
 * This mixin allows apply a transition specified in the theme config like "fast", "slow" and "slow" or others you've been defined
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example        css
 * .my-cool-element {
 *    @s.transition(fast);
 * }
 *
 * @example       html
 * <h1 class="my-cool-element">Hello world</h1>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, (params !== null && params !== void 0 ? params : {}));
    const vars = [
        `
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    `,
    ];
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sMkNBQTRDLFNBQVEsWUFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSwyQ0FBMkMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUlwRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLEdBQUcsa0JBQ2IsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUNGLE1BQU0sSUFBSSxHQUFhO1FBQ25COzs7Ozs7OztLQVFIO0tBQ0EsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==