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
 * @as              @s.init
 * @namespace      node.mixin.init
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin is the one you usually call first in your css.
 * His job is to:
 * - Apply a reset.css to standardize the display across browser
 * - Generate the base theme variables like colors, etc...
 * - Generate all the font-faces needed
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @snippet         @s.init
 *
 * @example        css
 * \@s.init;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ theme: s_theme_1.default.theme, variant: s_theme_1.default.variant }, (params !== null && params !== void 0 ? params : {}));
    const cssArray = [
        '@s.reset;',
        `@s.theme.apply(${finalParams.variant}, ${finalParams.theme});`,
        '@s.font.faces;',
        '@s.selection;',
        `body { @s.color(main); }`,
        // '@s.autoload;', // Check if it's a good idea or not...
        // '@s.lnf.base;', called in the "@s.theme" mixin
    ];
    replaceWith(cssArray);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxrRkFBMEQ7QUFDMUQsb0VBQTZDO0FBRTdDLE1BQU0scUNBQXNDLFNBQVEscUJBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsd0JBQWMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDO2FBQzdDO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSx3QkFBYyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUM7YUFDL0M7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ2lELDBEQUFTO0FBRTNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUNILG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsaUJBQVEsQ0FBQyxLQUFLLEVBQ3JCLE9BQU8sRUFBRSxpQkFBUSxDQUFDLE9BQU8sSUFDdEIsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFHO1FBQ2IsV0FBVztRQUNYLGtCQUFrQixXQUFXLENBQUMsT0FBTyxLQUFLLFdBQVcsQ0FBQyxLQUFLLElBQUk7UUFDL0QsZ0JBQWdCO1FBQ2hCLGVBQWU7UUFDZiwwQkFBMEI7UUFDMUIseURBQXlEO1FBQ3pELGlEQUFpRDtLQUNwRCxDQUFDO0lBRUYsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUExQkQsNEJBMEJDIn0=