"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const theme_1 = __importDefault(require("../../utils/theme"));
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
function default_1({ params, atRule, processNested }) {
    const colorsObj = theme_1.default().config('color');
    const cssArray = [];
    const colors = Object.keys(colorsObj);
    colors.forEach((colorName) => {
        const colorObj = colorsObj[colorName];
        Object.keys(colorObj).forEach((modifier) => {
            let modifierStr = '';
            if (modifier.match(/^default/)) {
                modifierStr = `--${modifier}`;
                modifier = '';
            }
            else {
                modifierStr = modifier;
            }
            cssArray.push([
                `/**`,
                ` * @name           s-c-${colorName}${modifierStr}`,
                ` * @namespace      sugar.css.color.classes.${colorName}.${modifier}`,
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
                `   color: sugar.color(${colorName},${modifier});`,
                `}`
            ].join('\n'));
            cssArray.push([
                `/**`,
                ` * @name           s-bg-${colorName}${modifierStr}`,
                ` * @namespace      sugar.css.color.classes.bg.${colorName}.${modifier}`,
                ` * @type           CssClass`,
                ` *`,
                ` * This class allows you to apply the "${colorName}${modifierStr}" color to the background of an HTMLElement`,
                ` *`,
                ` * @example        html`,
                ` * <h1 class="s-bg-${colorName}${modifierStr}">`,
                ` *     Something cool`,
                ` * </h1>`,
                ` */`,
                `.s-bg-${colorName}${modifierStr} {`,
                `   background-color: sugar.color(${colorName},${modifier})`,
                `}`
            ].join('\n'));
        });
    });
    const AST = processNested(cssArray.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOERBQXdDO0FBQ3hDLDRFQUFxRDtBQUVyRCxNQUFNLHVDQUF3QyxTQUFRLHFCQUFZOztBQUdkLDREQUFTO0FBRnBELGtEQUFVLEdBQUcsRUFBRSxDQUFDO0FBSXpCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsbUJBQXlCLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxhQUFhLEVBQUU7SUFDeEQsTUFBTSxTQUFTLEdBQUcsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN6QyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDckIsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUM5QixXQUFXLEdBQUcsS0FBSyxRQUFRLEVBQUUsQ0FBQztnQkFDOUIsUUFBUSxHQUFHLEVBQUUsQ0FBQzthQUNmO2lCQUFNO2dCQUNMLFdBQVcsR0FBRyxRQUFRLENBQUM7YUFDeEI7WUFFRCxRQUFRLENBQUMsSUFBSSxDQUNYO2dCQUNFLEtBQUs7Z0JBQ0wsMEJBQTBCLFNBQVMsR0FBRyxXQUFXLEVBQUU7Z0JBQ25ELDhDQUE4QyxTQUFTLElBQUksUUFBUSxFQUFFO2dCQUNyRSw2QkFBNkI7Z0JBQzdCLElBQUk7Z0JBQ0osMENBQTBDLFNBQVMsR0FBRyxXQUFXLDJCQUEyQjtnQkFDNUYsSUFBSTtnQkFDSix5QkFBeUI7Z0JBQ3pCLHFCQUFxQixTQUFTLEdBQUcsV0FBVyxJQUFJO2dCQUNoRCx1QkFBdUI7Z0JBQ3ZCLFVBQVU7Z0JBQ1YsS0FBSztnQkFDTCxRQUFRLFNBQVMsR0FBRyxXQUFXLElBQUk7Z0JBQ25DLHlCQUF5QixTQUFTLElBQUksUUFBUSxJQUFJO2dCQUNsRCxHQUFHO2FBQ0osQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2IsQ0FBQztZQUVGLFFBQVEsQ0FBQyxJQUFJLENBQ1g7Z0JBQ0UsS0FBSztnQkFDTCwyQkFBMkIsU0FBUyxHQUFHLFdBQVcsRUFBRTtnQkFDcEQsaURBQWlELFNBQVMsSUFBSSxRQUFRLEVBQUU7Z0JBQ3hFLDZCQUE2QjtnQkFDN0IsSUFBSTtnQkFDSiwwQ0FBMEMsU0FBUyxHQUFHLFdBQVcsNkNBQTZDO2dCQUM5RyxJQUFJO2dCQUNKLHlCQUF5QjtnQkFDekIsc0JBQXNCLFNBQVMsR0FBRyxXQUFXLElBQUk7Z0JBQ2pELHVCQUF1QjtnQkFDdkIsVUFBVTtnQkFDVixLQUFLO2dCQUNMLFNBQVMsU0FBUyxHQUFHLFdBQVcsSUFBSTtnQkFDcEMsb0NBQW9DLFNBQVMsSUFBSSxRQUFRLEdBQUc7Z0JBQzVELEdBQUc7YUFDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDYixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBN0RELDRCQTZEQyJ9