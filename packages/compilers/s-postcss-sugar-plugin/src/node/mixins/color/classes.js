"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const postcss_1 = __importDefault(require("postcss"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const default_1 = __importDefault(require("../../functions/color/default"));
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
function default_2(params = {}, atRule = null) {
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
                    ` * @name           ${colorName}${modifier === 'default' ? '' : `--${modifier}`}`,
                    ` * @namespace      sugar.color.classes`,
                    ` * @type           CssClass`,
                    ` *`,
                    ` * This class allows you to apply the "${colorName}${modifier === 'default' ? '' : `--${modifier}`}" color to an HTMLElement`,
                    ` *`,
                    ` * @example        html`,
                    ` * <h1 class="c-${colorName}${modifier === 'default' ? '' : `--${modifier}`}">`,
                    ` *     Something cool`,
                    ` * </h1>`,
                    ` */`,
                    `.c-${colorName}${modifier !== 'default' ? `--${modifier}` : ''} {`,
                    `   color: ${default_1.default({
                        name: colorName,
                        modifier
                    })}`,
                    `}`
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
exports.default = default_2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0ZBQXlEO0FBQ3pELHNEQUFnQztBQUNoQyw0RUFBcUQ7QUFDckQsNEVBQXNEO0FBRXRELE1BQU0sdUNBQXdDLFNBQVEscUJBQVk7O0FBR2QsNERBQVM7QUFGcEQsa0RBQVUsR0FBRyxFQUFFLENBQUM7QUFJekI7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxtQkFBeUIsTUFBTSxHQUFHLEVBQUUsRUFBRSxNQUFNLEdBQUcsSUFBSTtJQUNqRCxNQUFNLE1BQU0sR0FBRyx3QkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXRDLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDM0IsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUN6QyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXRDLFFBQVEsQ0FBQyxJQUFJLENBQ1g7b0JBQ0UsS0FBSztvQkFDTCxzQkFBc0IsU0FBUyxHQUM3QixRQUFRLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxFQUM3QyxFQUFFO29CQUNGLHdDQUF3QztvQkFDeEMsNkJBQTZCO29CQUM3QixJQUFJO29CQUNKLDBDQUEwQyxTQUFTLEdBQ2pELFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQzdDLDJCQUEyQjtvQkFDM0IsSUFBSTtvQkFDSix5QkFBeUI7b0JBQ3pCLG1CQUFtQixTQUFTLEdBQzFCLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQzdDLElBQUk7b0JBQ0osdUJBQXVCO29CQUN2QixVQUFVO29CQUNWLEtBQUs7b0JBQ0wsTUFBTSxTQUFTLEdBQUcsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJO29CQUNuRSxhQUFhLGlCQUFTLENBQUM7d0JBQ3JCLElBQUksRUFBRSxTQUFTO3dCQUNmLFFBQVE7cUJBQ1QsQ0FBQyxFQUFFO29CQUNKLEdBQUc7aUJBQ0osQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2IsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksTUFBTSxFQUFFO1FBQ1YsTUFBTSxHQUFHLEdBQUcsaUJBQVMsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDekI7U0FBTTtRQUNMLE9BQU8sUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUM1QjtBQUNILENBQUM7QUFuREQsNEJBbURDIn0=