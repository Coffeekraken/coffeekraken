import __SInterface from '@coffeekraken/s-interface';
/**
 * @name          blockquote
 * @as          @s.ui.blockquote
 * @namespace     node.mixin.ui.blockquote
 * @type          PostcssMixin
 * @interface     ./blockquote
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate the "blockquote" UI component css.
 *
 * @return      {Css}                   The corresponding css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.blockquote
 *
 * @example       css
 * .my-element {
 *      @s.ui.blockquote();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiBlockquoteInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginUiBlockquoteInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`
            @s.scope 'bare' {
                font-size: s.scalable(1rem);
                display: block;
                padding-inline: s.padding(ui.blockquote.paddingInline);
                padding-block: s.padding(ui.blockquote.paddingBlock);
            }
        `);
    vars.push(`
            @s.scope 'lnf' {
                border-inline-start: s.border.width(ui.blockquote.borderWidth) solid s.color(current);
                color: s.color(current, foreground);
                background-color: s.color(main, surface, --alpha 0.5);
                border-radius: s.border.radius();
                @s.font.family(quote);
            }
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLG9DQUFvQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTdELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OztTQU9MLENBQUMsQ0FBQztJQUVQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7O0tBUVQsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9