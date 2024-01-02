import __SInterface from '@coffeekraken/s-interface';
/**
 * @name          avatar
 * @as              @s.ui.avatar
 * @namespace     node.mixin.ui.avatar
 * @type          PostcssMixin
 * @interface       ./avatar
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to generate the "avatar" UI component css.
 *
 * @return      {Css}                   The corresponding css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       interactive         Interactive css
 * @scope       notification        Notification css
 *
 * @snippet         @s.ui.avatar
 *
 * @example       css
 * .my-element {
 *      @s.ui.avatar();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiAvatarInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginUiAvatarInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    // bare
    vars.push(`
        @s.scope 'bare' {
            position: relative;
            display: inline-block;
            width: s.scalable(1em);
            height: s.scalable(1em);

            img {
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
                object-fit: cover;
                border-radius: 50%;
                overflow: hidden;
            }
        }
    `);
    // lnf
    vars.push(`
        @s.scope 'lnf' {
            img {
                background-color: s.color(current);
                border-color: s.color(current);
                border-style: solid;
                border-width: s.border.width(ui.avatar.borderWidth);
                border-radius: 9999px;
            }
        }
    `);
    // interactive
    vars.push(`
        @s.scope 'interactive' {
            cursor: pointer;

            &:hover img {
                @s.outline($where: element);
                position: absolute;
            }
        }
    `);
    vars.push(`
        @s.scope 'notification' {
            &[notifications] {
                &:after {
                    content: attr(notifications);
                    position: absolute;
                    top: 0.2em; right: 0.2em;
                    font-size: s.scalable(0.15em);
                    min-width: 1.5em;
                    min-height: 1.5em;
                }
            }
        }
    `);
    vars.push(`
        @s.scope 'lnf' {
            &[notifications] {
                &:after {
                    background: s.color(current);
                    color: s.color(current, foreground);
                    border-radius: 9999px;
                    padding: 0.33em;
                    font-weight: bold;
                }
            }
        }
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFFSCxNQUFNLGdDQUFpQyxTQUFRLFlBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFDekQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OztLQWdCVCxDQUFDLENBQUM7SUFFSCxNQUFNO0lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7OztLQVVULENBQUMsQ0FBQztJQUVILGNBQWM7SUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7S0FTVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7O0tBYVQsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O0tBWVQsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9