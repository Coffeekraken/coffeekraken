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
        margin: 0 auto;
  `);
    const containerConfig = s_theme_1.default.get(`layout.container.${finalParams.name}`);
    if (!containerConfig) {
        throw new Error(`<red>[mixins.container]</red> Sorry but the requested "<yellow>${finalParams.name}</yellow>" does not exists in the "<cyan>config.theme.layout.container</cyan>" configuration`);
    }
    vars.code(`
        width: 100%;
        max-width: sugar.theme(layout.container.${finalParams.name}, true);
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLG9DQUFxQyxTQUFRLHFCQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLFNBQVM7YUFDckI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTWdELHlEQUFTO0FBRTFELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLFNBQVMsSUFDWixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLElBQUksQ0FDTDs7R0FFTCxDQUNFLENBQUM7SUFFRixNQUFNLGVBQWUsR0FBRyxpQkFBUSxDQUFDLEdBQUcsQ0FDaEMsb0JBQW9CLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FDekMsQ0FBQztJQUVGLElBQUksQ0FBQyxlQUFlLEVBQUU7UUFDbEIsTUFBTSxJQUFJLEtBQUssQ0FDWCxrRUFBa0UsV0FBVyxDQUFDLElBQUksOEZBQThGLENBQ25MLENBQUM7S0FDTDtJQUVELElBQUksQ0FBQyxJQUFJLENBQUM7O2tEQUVvQyxXQUFXLENBQUMsSUFBSTtLQUM3RCxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBeENELDRCQXdDQyJ9