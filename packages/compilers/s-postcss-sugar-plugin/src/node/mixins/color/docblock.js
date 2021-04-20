"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const postcss_1 = __importDefault(require("postcss"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginDocblockColorsMixinInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginDocblockColorsMixinInterface;
postcssSugarPluginDocblockColorsMixinInterface.definition = {};
/**
 * @name           docblockColors
 * @namespace      mixins
 * @type           Mixin
 * @status        beta
 *
 * This mixin print the documentation docblocks for the colors
 * into your final css.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.docblockColors;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1(params = {}, atRule = null) {
    const themes = s_sugar_config_1.default('theme');
    const cssArray = [];
    Object.keys(themes).forEach((themeName) => {
        const themeObj = themes[themeName];
        const colors = Object.keys(themeObj.colors);
        colors.forEach((colorName) => {
            const colorObj = themeObj.colors[colorName];
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
    if (atRule) {
        const AST = postcss_1.default.parse(cssArray.join('\n'));
        atRule.replaceWith(AST);
    }
    else {
        return cssArray.join('\n');
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jYmxvY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkb2NibG9jay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxrRkFBeUQ7QUFDekQsc0RBQWdDO0FBQ2hDLDRFQUFxRDtBQUVyRCxNQUFNLDhDQUErQyxTQUFRLHFCQUFZOztBQUdkLG1FQUFTO0FBRjNELHlEQUFVLEdBQUcsRUFBRSxDQUFDO0FBSXpCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsbUJBQXlCLE1BQU0sR0FBRyxFQUFFLEVBQUUsTUFBTSxHQUFHLElBQUk7SUFDakQsTUFBTSxNQUFNLEdBQUcsd0JBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV0QyxNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7SUFFOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUN4QyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzNCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDekMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUV0QyxRQUFRLENBQUMsSUFBSSxDQUNYO29CQUNFLEtBQUs7b0JBQ0wsa0JBQWtCLFNBQVMsRUFBRTtvQkFDN0IsdUJBQXVCLFFBQVEsRUFBRTtvQkFDakMsNkJBQTZCLFNBQVMsU0FBUztvQkFDL0MsMkJBQTJCO29CQUMzQixJQUFJO29CQUNKLG1CQUFtQixTQUFTLEdBQzFCLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQzVDLG9CQUFvQjtvQkFDcEIsSUFBSTtvQkFDSixlQUFlLFVBQVUsRUFBRTtvQkFDM0IsS0FBSztpQkFDTixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDYixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxNQUFNLEVBQUU7UUFDVixNQUFNLEdBQUcsR0FBRyxpQkFBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN6QjtTQUFNO1FBQ0wsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVCO0FBQ0gsQ0FBQztBQXZDRCw0QkF1Q0MifQ==