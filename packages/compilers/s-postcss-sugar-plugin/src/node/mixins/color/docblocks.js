"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginDocblockColorsMixinInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginDocblockColorsMixinInterface;
postcssSugarPluginDocblockColorsMixinInterface.definition = {};
/**
 * @name           docblocks
 * @namespace      mixins.color
 * @type           Mixin
 * @status        beta
 *
 * This mixin print the documentation docblocks for the colors
 * into your final css.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.color.docblocks;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1(params = {}, atRule, processNested) {
    const themes = s_sugar_config_1.default('theme');
    const cssArray = [];
    Object.keys(themes).forEach((themeName) => {
        const themeObj = themes[themeName];
        if (!themeObj.color)
            return;
        const colors = Object.keys(themeObj.color);
        colors.forEach((colorName) => {
            const colorObj = themeObj.color[colorName];
            Object.keys(colorObj).forEach((modifier) => {
                const colorValue = colorObj[modifier];
                cssArray.push([
                    `/**`,
                    ` * @name 		    ${colorName}`,
                    ` * @modifier        ${modifier}`,
                    ` * @namespace       theme.${themeName}.colors`,
                    ` * @type            color`,
                    ` *`,
                    ` * This is the "${colorName}${modifier !== 'default' ? `-${modifier}` : ''}" registered color`,
                    ` *`,
                    ` * @color 		${colorValue}`,
                    ` */`
                ].join('\n'));
            });
        });
    });
    const AST = processNested(cssArray.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jYmxvY2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jYmxvY2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGtGQUF5RDtBQUN6RCw0RUFBcUQ7QUFFckQsTUFBTSw4Q0FBK0MsU0FBUSxxQkFBWTs7QUFHZCxtRUFBUztBQUYzRCx5REFBVSxHQUFHLEVBQUUsQ0FBQztBQUl6Qjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILG1CQUF5QixNQUFNLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxhQUFhO0lBQ3pELE1BQU0sTUFBTSxHQUFHLHdCQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFdEMsTUFBTSxRQUFRLEdBQWEsRUFBRSxDQUFDO0lBRTlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDeEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSztZQUFFLE9BQU87UUFDNUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzNCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDekMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUN0QyxRQUFRLENBQUMsSUFBSSxDQUNYO29CQUNFLEtBQUs7b0JBQ0wsa0JBQWtCLFNBQVMsRUFBRTtvQkFDN0IsdUJBQXVCLFFBQVEsRUFBRTtvQkFDakMsNkJBQTZCLFNBQVMsU0FBUztvQkFDL0MsMkJBQTJCO29CQUMzQixJQUFJO29CQUNKLG1CQUFtQixTQUFTLEdBQzFCLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQzVDLG9CQUFvQjtvQkFDcEIsSUFBSTtvQkFDSixlQUFlLFVBQVUsRUFBRTtvQkFDM0IsS0FBSztpQkFDTixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDYixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFuQ0QsNEJBbUNDIn0=