"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class SSugarcssPluginDocblockColorsMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginDocblockColorsMixinInterface;
/**
 * @name           docblocks
 * @namespace      node.mixin.color
 * @type           PostcssMixin
 * @platform      postcss
 * @status        wip
 *
 * This mixin print the documentation docblocks for the colors
 * into your final css.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @snippet         @s.color.docblocks
 *
 * @example        css
 * @s.color.docblocks;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, CssVars, replaceWith }) {
    const vars = new CssVars();
    const colorsObj = s_theme_1.default.get('color');
    const colors = Object.keys(colorsObj);
    colors.forEach((colorName) => {
        const colorObj = colorsObj[colorName];
        Object.keys(colorObj).forEach((modifier) => {
            const colorValue = colorObj[modifier];
            vars.comment(() => [
                `/**`,
                ` * @name 		    ${colorName}`,
                ` * @modifier        ${modifier}`,
                ` * @namespace          sugar.style.theme.${s_theme_1.default.name}.colors`,
                ` * @type            color`,
                ` * @platform       css`,
                ` * @status         wip`,
                ` *`,
                ` * This is the "${colorName}${modifier !== 'default' ? `-${modifier}` : ''}" registered color`,
                ` *`,
                ` * @color 		${colorValue}`,
                ` */`,
            ].join('\n'));
        });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSwyQ0FBNEMsU0FBUSxxQkFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUN1RCxnRUFBUztBQUVqRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUNILG1CQUF5QixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRTtJQUM3RCxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sU0FBUyxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXhDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3pCLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN0QyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3ZDLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN0QyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUNkO2dCQUNJLEtBQUs7Z0JBQ0wsa0JBQWtCLFNBQVMsRUFBRTtnQkFDN0IsdUJBQXVCLFFBQVEsRUFBRTtnQkFDakMsNENBQTRDLGlCQUFRLENBQUMsSUFBSSxTQUFTO2dCQUNsRSwyQkFBMkI7Z0JBQzNCLHdCQUF3QjtnQkFDeEIsd0JBQXdCO2dCQUN4QixJQUFJO2dCQUNKLG1CQUFtQixTQUFTLEdBQ3hCLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQzlDLG9CQUFvQjtnQkFDcEIsSUFBSTtnQkFDSixlQUFlLFVBQVUsRUFBRTtnQkFDM0IsS0FBSzthQUNSLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNmLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQWhDRCw0QkFnQ0MifQ==