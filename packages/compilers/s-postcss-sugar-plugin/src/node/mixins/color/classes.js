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
                    `   color: ${default_1.default({
                        name: colorName,
                        modifier
                    })}`,
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
                    `   background-color: ${default_1.default({
                        name: colorName,
                        modifier
                    })}`,
                    `}`
                ].join('\n'));
            });
        });
    });
    console.log(cssArray.join('\n'));
    if (atRule) {
        const AST = postcss_1.default.parse(cssArray.join('\n'));
        atRule.replaceWith(AST);
    }
    else {
        return cssArray.join('\n');
    }
}
exports.default = default_2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0ZBQXlEO0FBQ3pELHNEQUFnQztBQUNoQyw0RUFBcUQ7QUFDckQsNEVBQXNEO0FBRXRELE1BQU0sdUNBQXdDLFNBQVEscUJBQVk7O0FBR2QsNERBQVM7QUFGcEQsa0RBQVUsR0FBRyxFQUFFLENBQUM7QUFJekI7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFDSCxtQkFBeUIsTUFBTSxHQUFHLEVBQUUsRUFBRSxNQUFNLEdBQUcsSUFBSTtJQUNqRCxNQUFNLE1BQU0sR0FBRyx3QkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRXRDLE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3hDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDM0IsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUN6QyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRXRDLElBQUksV0FBVyxHQUFHLFFBQVEsQ0FBQztnQkFDM0IsSUFBSSxpQkFBaUIsR0FBRyxRQUFRLENBQUM7Z0JBQ2pDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDOUIsSUFB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