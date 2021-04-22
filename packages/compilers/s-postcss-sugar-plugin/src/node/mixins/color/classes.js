"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginClassesMixinInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginClassesMixinInterface;
postcssSugarPluginClassesMixinInterface.definition = {};
/**
 * @name           classes
 * @namespace      mixins.colors
 * @type           Mixin
 * @status        beta
 *
 * This mixin print the documentation docblocks for the colors
 * into your final css.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.Classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
function default_1(params = {}, atRule, processNested) {
    const themes = s_sugar_config_1.default('theme');
    const cssArray = [];
    Object.keys(themes).forEach((themeName) => {
        const themeObj = themes[themeName];
        const colors = Object.keys(themeObj.color);
        colors.forEach((colorName) => {
            const colorObj = themeObj.color[colorName];
            Object.keys(colorObj).forEach((modifier) => {
                const colorValue = colorObj[modifier];
                let modifierStr = modifier;
                let modifierInvertStr = modifier;
                if (modifier.match(/^default/)) {
                    if (modifier.match(/\-i$/)) {
                        modifierStr = '--i';
                        modifierInvertStr = '';
                    }
                    else {
                        modifierStr = ``;
                        modifierInvertStr = '--i';
                    }
                }
                else {
                    if (modifier.match(/\-i$/)) {
                        modifierStr = `--${modifier}`;
                        modifierInvertStr = `--${modifier.replace(/\-i$/, '')}`;
                    }
                    else {
                        modifierStr = `--${modifier}`;
                        modifierInvertStr = `--${modifier}-i`;
                    }
                }
                cssArray.push([
                    `/**`,
                    ` * @name           c-${colorName}${modifierStr}`,
                    ` * @namespace      sugar.color.classes`,
                    ` * @type           CssClass`,
                    ` *`,
                    ` * This class allows you to apply the "${colorName}${modifierStr}" color to an HTMLElement`,
                    ` *`,
                    ` * @example        html`,
                    ` * <h1 class="c-${colorName}${modifierStr}">`,
                    ` *     Something cool`,
                    ` * </h1>`,
                    ` */`,
                    `.c-${colorName}${modifierStr} {`,
                    `   color: sugar.color(${colorName}${modifierStr});`,
                    `}`
                ].join('\n'));
                cssArray.push([
                    `/**`,
                    ` * @name           bg-${colorName}${modifierStr}`,
                    ` * @namespace      sugar.color.classes`,
                    ` * @type           CssClass`,
                    ` *`,
                    ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
                    ` *`,
                    ` * @example        html`,
                    ` * <h1 class="bg-${colorName}${modifierStr} c-${colorName}${modifierInvertStr}">`,
                    ` *     Something cool`,
                    ` * </h1>`,
                    ` */`,
                    `.bg-${colorName}${modifierStr} {`,
                    `   background-color: sugar.color(${colorName}${modifierStr})`,
                    `}`
                ].join('\n'));
            });
        });
    });
    if (atRule) {
        const AST = processNested(cssArray.join('\n'));
        atRule.replaceWith(AST);
    }
    else {
        return cssArray.join('\n');
    }
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0ZBQXlEO0FBQ3pELDRFQUFxRDtBQUVyRCxNQUFNLHVDQUF3QyxTQUFRLHFCQUFZOztBQUdkLDREQUFTO0FBRnBELGtEQUFVLEdBQUcsRUFBRSxDQUFDO0FBSXpCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsbUJBQXlCLE1BQU0sR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLGFBQWE7SUFDekQsTUFBTSxNQUFNLEdBQUcsd0JBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV0QyxNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7SUFFOUIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUN4QyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0MsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzNCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtnQkFDekMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUV0QyxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUM7Z0JBQzNCLElBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDO2dCQUNqQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQzlCLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDMUIsV0FBVyxHQUFHLEtBQUssQ0FBQzt3QkFDcEIsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO3FCQUN4Qjt5QkFBTTt3QkFDTCxXQUFXLEdBQUcsRUFBRSxDQUFDO3dCQUNqQixpQkFBaUIsR0FBRyxLQUFLLENBQUM7cUJBQzNCO2lCQUNGO3FCQUFNO29CQUNMLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTt3QkFDMUIsV0FBVyxHQUFHLEtBQUssUUFBUSxFQUFFLENBQUM7d0JBQzlCLGlCQUFpQixHQUFHLEtBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQztxQkFDekQ7eUJBQU07d0JBQ0wsV0FBVyxHQUFHLEtBQUssUUFBUSxFQUFFLENBQUM7d0JBQzlCLGlCQUFpQixHQUFHLEtBQUssUUFBUSxJQUFJLENBQUM7cUJBQ3ZDO2lCQUNGO2dCQUVELFFBQVEsQ0FBQyxJQUFJLENBQ1g7b0JBQ0UsS0FBSztvQkFDTCx3QkFBd0IsU0FBUyxHQUFHLFdBQVcsRUFBRTtvQkFDakQsd0NBQXdDO29CQUN4Qyw2QkFBNkI7b0JBQzdCLElBQUk7b0JBQ0osMENBQTBDLFNBQVMsR0FBRyxXQUFXLDJCQUEyQjtvQkFDNUYsSUFBSTtvQkFDSix5QkFBeUI7b0JBQ3pCLG1CQUFtQixTQUFTLEdBQUcsV0FBVyxJQUFJO29CQUM5Qyx1QkFBdUI7b0JBQ3ZCLFVBQVU7b0JBQ1YsS0FBSztvQkFDTCxNQUFNLFNBQVMsR0FBRyxXQUFXLElBQUk7b0JBQ2pDLHlCQUF5QixTQUFTLEdBQUcsV0FBVyxJQUFJO29CQUNwRCxHQUFHO2lCQUNKLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNiLENBQUM7Z0JBRUYsUUFBUSxDQUFDLElBQUksQ0FDWDtvQkFDRSxLQUFLO29CQUNMLHlCQUF5QixTQUFTLEdBQUcsV0FBVyxFQUFFO29CQUNsRCx3Q0FBd0M7b0JBQ3hDLDZCQUE2QjtvQkFDN0IsSUFBSTtvQkFDSiwwQ0FBMEMsU0FBUyxHQUFHLFdBQVcsNkNBQTZDO29CQUM5RyxJQUFJO29CQUNKLHlCQUF5QjtvQkFDekIsb0JBQW9CLFNBQVMsR0FBRyxXQUFXLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixJQUFJO29CQUNsRix1QkFBdUI7b0JBQ3ZCLFVBQVU7b0JBQ1YsS0FBSztvQkFDTCxPQUFPLFNBQVMsR0FBRyxXQUFXLElBQUk7b0JBQ2xDLG9DQUFvQyxTQUFTLEdBQUcsV0FBVyxHQUFHO29CQUM5RCxHQUFHO2lCQUNKLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNiLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLE1BQU0sRUFBRTtRQUNWLE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDL0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN6QjtTQUFNO1FBQ0wsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzVCO0FBQ0gsQ0FBQztBQWxGRCw0QkFrRkMifQ==