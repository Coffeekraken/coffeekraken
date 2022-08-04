"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
class postcssSugarPluginMediaMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            theme: {
                type: 'String',
                default: s_sugar_config_1.default.get('theme.theme'),
            },
            variant: {
                type: 'String',
                default: s_sugar_config_1.default.get('theme.variant'),
            },
        };
    }
}
exports.interface = postcssSugarPluginMediaMixinInterface;
/**
 * @name           init
 * @namespace      node.mixin.init
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin is the one you usually call first in your css.
 * His job is to:
 * - Apply a reset.css to standardize the display across browser
 * - Generate the base theme variables like colors, etc...
 * - Generate all the font-faces needed
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example        css
 * \@sugar.init;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, replaceWith, }) {
    const cssArray = [
        '@sugar.reset;',
        `@sugar.theme(${params.variant}, ${params.theme});`,
        '@sugar.font.faces;',
        '@sugar.lnf.selection;',
        // '@sugar.lnf.base;', called in the "@sugar.theme" mixin
    ];
    replaceWith(cssArray);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFFMUQsTUFBTSxxQ0FBc0MsU0FBUSxxQkFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUM7YUFDN0M7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLHdCQUFjLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQzthQUMvQztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDaUQsMERBQVM7QUFFM0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBQ0gsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxRQUFRLEdBQUc7UUFDYixlQUFlO1FBQ2YsZ0JBQWdCLE1BQU0sQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLEtBQUssSUFBSTtRQUNuRCxvQkFBb0I7UUFDcEIsdUJBQXVCO1FBQ3ZCLHlEQUF5RDtLQUM1RCxDQUFDO0lBRUYsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFsQkQsNEJBa0JDIn0=