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
function default_1(params = {}, atRule, processNested) {
    const colorsObj = theme_1.default().config('color');
    const cssArray = [];
    const colors = Object.keys(colorsObj);
    colors.forEach((colorName) => {
        const colorObj = colorsObj[colorName];
        Object.keys(colorObj).forEach((modifier) => {
            let modifierStr = modifier;
            let modifierInvertStr = modifier;
            // if (modifier.match(/^default/)) {
            //   if (modifier.match(/\-i$/)) {
            //     modifierStr = '--i';
            //     modifierInvertStr = '';
            //   } else {
            //     modifierStr = ``;
            //     modifierInvertStr = '--i';
            //   }
            // } else {
            //   if (modifier.match(/\-i$/)) {
            //     modifierStr = `--${modifier}`;
            //     modifierInvertStr = `--${modifier.replace(/\-i$/, '')}`;
            //   } else {
            //     modifierStr = `--${modifier}`;
            //     modifierInvertStr = `--${modifier}-i`;
            //   }
            // }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOERBQXdDO0FBQ3hDLDRFQUFxRDtBQUVyRCxNQUFNLHVDQUF3QyxTQUFRLHFCQUFZOztBQUdkLDREQUFTO0FBRnBELGtEQUFVLEdBQUcsRUFBRSxDQUFDO0FBSXpCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsbUJBQXlCLE1BQU0sR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLGFBQWE7SUFDekQsTUFBTSxTQUFTLEdBQUcsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzQixNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdEMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN6QyxJQUFJLFdBQVcsR0FBRyxRQUFRLENBQUM7WUFDM0IsSUFBSSxpQkFBaUIsR0FBRyxRQUFRLENBQUM7WUFDakMsb0NBQW9DO1lBQ3BDLGtDQUFrQztZQUNsQywyQkFBMkI7WUFDM0IsOEJBQThCO1lBQzlCLGFBQWE7WUFDYix3QkFBd0I7WUFDeEIsaUNBQWlDO1lBQ2pDLE1BQU07WUFDTixXQUFXO1lBQ1gsa0NBQWtDO1lBQ2xDLHFDQUFxQztZQUNyQywrREFBK0Q7WUFDL0QsYUFBYTtZQUNiLHFDQUFxQztZQUNyQyw2Q0FBNkM7WUFDN0MsTUFBTTtZQUNOLElBQUk7WUFFSixRQUFRLENBQUMsSUFBSSxDQUNYO2dCQUNFLEtBQUs7Z0JBQ0wsMEJBQTBCLFNBQVMsR0FBRyxXQUFXLEVBQUU7Z0JBQ25ELDRDQUE0QztnQkFDNUMsNkJBQTZCO2dCQUM3QixJQUFJO2dCQUNKLDBDQUEwQyxTQUFTLEdBQUcsV0FBVywyQkFBMkI7Z0JBQzVGLElBQUk7Z0JBQ0oseUJBQXlCO2dCQUN6QixxQkFBcUIsU0FBUyxHQUFHLFdBQVcsSUFBSTtnQkFDaEQsdUJBQXVCO2dCQUN2QixVQUFVO2dCQUNWLEtBQUs7Z0JBQ0wsUUFBUSxTQUFTLEdBQUcsV0FBVyxJQUFJO2dCQUNuQyx5QkFBeUIsU0FBUyxHQUFHLFdBQVcsSUFBSTtnQkFDcEQsR0FBRzthQUNKLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNiLENBQUM7WUFFRixRQUFRLENBQUMsSUFBSSxDQUNYO2dCQUNFLEtBQUs7Z0JBQ0wsMkJBQTJCLFNBQVMsR0FBRyxXQUFXLEVBQUU7Z0JBQ3BELDRDQUE0QztnQkFDNUMsNkJBQTZCO2dCQUM3QixJQUFJO2dCQUNKLDBDQUEwQyxTQUFTLEdBQUcsV0FBVyw2Q0FBNkM7Z0JBQzlHLElBQUk7Z0JBQ0oseUJBQXlCO2dCQUN6QixzQkFBc0IsU0FBUyxHQUFHLFdBQVcsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLElBQUk7Z0JBQ3BGLHVCQUF1QjtnQkFDdkIsVUFBVTtnQkFDVixLQUFLO2dCQUNMLFNBQVMsU0FBUyxHQUFHLFdBQVcsSUFBSTtnQkFDcEMsb0NBQW9DLFNBQVMsR0FBRyxXQUFXLEdBQUc7Z0JBQzlELEdBQUc7YUFDSixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDYixDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDL0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBekVELDRCQXlFQyJ9