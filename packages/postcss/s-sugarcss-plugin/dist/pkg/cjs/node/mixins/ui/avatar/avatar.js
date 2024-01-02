"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
class SSugarcssPluginUiAvatarInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginUiAvatarInterface;
function default_1({ params, atRule, replaceWith, }) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBRUgsTUFBTSxnQ0FBaUMsU0FBUSxxQkFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUk0QyxxREFBUztBQUN0RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7S0FnQlQsQ0FBQyxDQUFDO0lBRUgsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7S0FVVCxDQUFDLENBQUM7SUFFSCxjQUFjO0lBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7O0tBU1QsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7OztLQWFULENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7OztLQVlULENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUF6RkQsNEJBeUZDIn0=