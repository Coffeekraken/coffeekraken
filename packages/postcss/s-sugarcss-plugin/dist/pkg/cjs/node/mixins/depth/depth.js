"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           depth
 * @as              @s.depth
 * @namespace      node.mixin.depth
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a certain depth that are defined
 * in the config.theme.depth stack like 10, 20, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.depth($1)
 *
 * @example        css
 * .my-element {
 *    @s.depth(20);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginDepthInterface extends s_interface_1.default {
    static get _definition() {
        return {
            depth: {
                type: 'Number|String',
                required: true,
                alias: 'd',
            },
            type: {
                type: 'String',
                values: ['box', 'text'],
                default: 'box',
            },
        };
    }
}
exports.interface = SSugarcssPluginDepthInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ depth: 0, type: 'box' }, params);
    const vars = [
        `${finalParams.type}-shadow: s.depth(${finalParams.depth});`,
    ];
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0sNkJBQThCLFNBQVEscUJBQVk7SUFDcEQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDO2dCQUN2QixPQUFPLEVBQUUsS0FBSzthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPeUMsa0RBQVM7QUFFbkQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxDQUFDLEVBQ1IsSUFBSSxFQUFFLEtBQUssSUFDUixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhO1FBQ25CLEdBQUcsV0FBVyxDQUFDLElBQUksb0JBQW9CLFdBQVcsQ0FBQyxLQUFLLElBQUk7S0FDL0QsQ0FBQztJQUNGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFuQkQsNEJBbUJDIn0=