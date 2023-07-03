"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name           container
 * @as              @sugar.container
 * @namespace      node.mixin.container
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the css needed for a container depending
 * on the config.theme.container.container configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.container($1)
 *
 * @example        css
 * .my-cool-container {
 *    \@sugar.container;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginContainerInterface extends s_interface_1.default {
    static get _definition() {
        return {
            name: {
                type: 'String',
                required: true,
                default: 'default',
            },
        };
    }
}
exports.interface = postcssSugarPluginContainerInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ name: 'default' }, params);
    const vars = new CssVars();
    vars.code(`
        @sugar.lod.prevent {
            margin: 0 auto;
        }
  `);
    const containerConfig = s_theme_1.default.get(`layout.container.${finalParams.name}`);
    if (!containerConfig) {
        throw new Error(`<red>[mixins.container]</red> Sorry but the requested "<yellow>${finalParams.name}</yellow>" does not exists in the "<cyan>config.theme.layout.container</cyan>" configuration`);
    }
    vars.code(`
        --s-container-max-width: sugar.theme(layout.container.${finalParams.name}, true);
        @sugar.lod.prevent {
            width: 100%;
            max-width: sugar.theme(layout.container.${finalParams.name}, true);
        }
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLG9DQUFxQyxTQUFRLHFCQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLFNBQVM7YUFDckI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTWdELHlEQUFTO0FBRTFELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLFNBQVMsSUFDWixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLElBQUksQ0FDTDs7OztHQUlMLENBQ0UsQ0FBQztJQUVGLE1BQU0sZUFBZSxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUNoQyxvQkFBb0IsV0FBVyxDQUFDLElBQUksRUFBRSxDQUN6QyxDQUFDO0lBRUYsSUFBSSxDQUFDLGVBQWUsRUFBRTtRQUNsQixNQUFNLElBQUksS0FBSyxDQUNYLGtFQUFrRSxXQUFXLENBQUMsSUFBSSw4RkFBOEYsQ0FDbkwsQ0FBQztLQUNMO0lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQztnRUFDa0QsV0FBVyxDQUFDLElBQUk7OztzREFHMUIsV0FBVyxDQUFDLElBQUk7O0tBRWpFLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUE3Q0QsNEJBNkNDIn0=