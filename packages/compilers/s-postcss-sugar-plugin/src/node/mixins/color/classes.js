"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_sugar_config_1 = require("@coffeekraken/s-sugar-config");
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
    const colorsObj = s_sugar_config_1.themeConfig('color');
    const cssArray = [];
    const colors = Object.keys(colorsObj);
    colors.forEach((colorName) => {
        const colorObj = colorsObj[colorName];
        Object.keys(colorObj).forEach((modifier) => {
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
                ` * @name           s-c-${colorName}${modifierStr}`,
                ` * @namespace      sugar.css.color.classes`,
                ` * @type           CssClass`,
                ` *`,
                ` * This class allows you to apply the "${colorName}${modifierStr}" color to an HTMLElement`,
                ` *`,
                ` * @example        html`,
                ` * <h1 class="s-c-${colorName}${modifierStr}">`,
                ` *     Something cool`,
                ` * </h1>`,
                ` */`,
                `.s-c-${colorName}${modifierStr} {`,
                `   color: sugar.color(${colorName}${modifierStr});`,
                `}`
            ].join('\n'));
            cssArray.push([
                `/**`,
                ` * @name           s-bg-${colorName}${modifierStr}`,
                ` * @namespace      sugar.css.color.classes`,
                ` * @type           CssClass`,
                ` *`,
                ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
                ` *`,
                ` * @example        html`,
                ` * <h1 class="s-bg-${colorName}${modifierStr} c-${colorName}${modifierInvertStr}">`,
                ` *     Something cool`,
                ` * </h1>`,
                ` */`,
                `.s-bg-${colorName}${modifierStr} {`,
                `   background-color: sugar.color(${colorName}${modifierStr})`,
                `}`
            ].join('\n'));
        });
    });
    const AST = processNested(cssArray.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsaUVBQTJEO0FBQzNELDRFQUFxRDtBQUVyRCxNQUFNLHVDQUF3QyxTQUFRLHFCQUFZOztBQUdkLDREQUFTO0FBRnBELGtEQUFVLEdBQUcsRUFBRSxDQUFDO0FBSXpCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsbUJBQXlCLE1BQU0sR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLGFBQWE7SUFDekQsTUFBTSxTQUFTLEdBQUcsNEJBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV2QyxNQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7SUFFOUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0QyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDM0IsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDekMsSUFBSSxXQUFXLEdBQUcsUUFBUSxDQUFDO1lBQzNCLElBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDO1lBQ2pDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDOUIsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUMxQixXQUFXLEdBQUcsS0FBSyxDQUFDO29CQUNwQixpQkFBaUIsR0FBRyxFQUFFLENBQUM7aUJBQ3hCO3FCQUFNO29CQUNMLFdBQVcsR0FBRyxFQUFFLENBQUM7b0JBQ2pCLGlCQUFpQixHQUFHLEtBQUssQ0FBQztpQkFDM0I7YUFDRjtpQkFBTTtnQkFDTCxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQzFCLFdBQVcsR0FBRyxLQUFLLFFBQVEsRUFBRSxDQUFDO29CQUM5QixpQkFBaUIsR0FBRyxLQUFLLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ3pEO3FCQUFNO29CQUNMLFdBQVcsR0FBRyxLQUFLLFFBQVEsRUFBRSxDQUFDO29CQUM5QixpQkFBaUIsR0FBRyxLQUFLLFFBQVEsSUFBSSxDQUFDO2lCQUN2QzthQUNGO1lBRUQsUUFBUSxDQUFDLElBQUksQ0FDWDtnQkFDRSxLQUFLO2dCQUNMLDBCQUEwQixTQUFTLEdBQUcsV0FBVyxFQUFFO2dCQUNuRCw0Q0FBNEM7Z0JBQzVDLDZCQUE2QjtnQkFDN0IsSUFBSTtnQkFDSiwwQ0FBMEMsU0FBUyxHQUFHLFdBQVcsMkJBQTJCO2dCQUM1RixJQUFJO2dCQUNKLHlCQUF5QjtnQkFDekIscUJBQXFCLFNBQVMsR0FBRyxXQUFXLElBQUk7Z0JBQ2hELHVCQUF1QjtnQkFDdkIsVUFBVTtnQkFDVixLQUFLO2dCQUNMLFFBQVEsU0FBUyxHQUFHLFdBQVcsSUFBSTtnQkFDbkMseUJBQXlCLFNBQVMsR0FBRyxXQUFXLElBQUk7Z0JBQ3BELEdBQUc7YUFDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDYixDQUFDO1lBRUYsUUFBUSxDQUFDLElBQUksQ0FDWDtnQkFDRSxLQUFLO2dCQUNMLDJCQUEyQixTQUFTLEdBQUcsV0FBVyxFQUFFO2dCQUNwRCw0Q0FBNEM7Z0JBQzVDLDZCQUE2QjtnQkFDN0IsSUFBSTtnQkFDSiwwQ0FBMEMsU0FBUyxHQUFHLFdBQVcsNkNBQTZDO2dCQUM5RyxJQUFJO2dCQUNKLHlCQUF5QjtnQkFDekIsc0JBQXNCLFNBQVMsR0FBRyxXQUFXLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixJQUFJO2dCQUNwRix1QkFBdUI7Z0JBQ3ZCLFVBQVU7Z0JBQ1YsS0FBSztnQkFDTCxTQUFTLFNBQVMsR0FBRyxXQUFXLElBQUk7Z0JBQ3BDLG9DQUFvQyxTQUFTLEdBQUcsV0FBVyxHQUFHO2dCQUM5RCxHQUFHO2FBQ0osQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2IsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQXpFRCw0QkF5RUMifQ==