"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
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
 * @snippet         @sugar.init
 *
 * @example        css
 * \@sugar.init;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ theme: s_theme_1.default.theme, variant: s_theme_1.default.variant }, (params !== null && params !== void 0 ? params : {}));
    const cssArray = [
        '@sugar.reset;',
        `@sugar.theme.apply(${finalParams.variant}, ${finalParams.theme});`,
        '@sugar.font.faces;',
        '@sugar.lnf.selection;',
        // '@sugar.autoload;', // Check if it's a good idea or not...
        // '@sugar.lnf.base;', called in the "@sugar.theme" mixin
    ];
    replaceWith(cssArray);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFDMUQsb0VBQTZDO0FBRTdDLE1BQU0scUNBQXNDLFNBQVEscUJBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO2FBQzdDO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7YUFDL0M7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ2lELDBEQUFTO0FBRTNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBQ0gsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxpQkFBUSxDQUFDLEtBQUssRUFDckIsT0FBTyxFQUFFLGlCQUFRLENBQUMsT0FBTyxJQUN0QixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQUc7UUFDYixlQUFlO1FBQ2Ysc0JBQXNCLFdBQVcsQ0FBQyxPQUFPLEtBQUssV0FBVyxDQUFDLEtBQUssSUFBSTtRQUNuRSxvQkFBb0I7UUFDcEIsdUJBQXVCO1FBQ3ZCLDZEQUE2RDtRQUM3RCx5REFBeUQ7S0FDNUQsQ0FBQztJQUVGLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBekJELDRCQXlCQyJ9