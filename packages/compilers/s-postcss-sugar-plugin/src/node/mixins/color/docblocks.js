"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const theme_1 = __importDefault(require("../../utils/theme"));
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
function default_1({ params, atRule, processNested }) {
    const cssArray = [];
    const colorsObj = theme_1.default().config('color');
    const colors = Object.keys(colorsObj);
    colors.forEach((colorName) => {
        const colorObj = colorsObj[colorName];
        Object.keys(colorObj).forEach((modifier) => {
            const colorValue = colorObj[modifier];
            cssArray.push([
                `/**`,
                ` * @name 		    ${colorName}`,
                ` * @modifier        ${modifier}`,
                ` * @namespace       sugar.css.theme.${theme_1.default().name}.colors`,
                ` * @type            color`,
                ` *`,
                ` * This is the "${colorName}${modifier !== 'default' ? `-${modifier}` : ''}" registered color`,
                ` *`,
                ` * @color 		${colorValue}`,
                ` */`
            ].join('\n'));
        });
    });
    const AST = processNested(cssArray.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jYmxvY2tzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZG9jYmxvY2tzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhEQUF3QztBQUN4Qyw0RUFBcUQ7QUFFckQsTUFBTSw4Q0FBK0MsU0FBUSxxQkFBWTs7QUFHZCxtRUFBUztBQUYzRCx5REFBVSxHQUFHLEVBQUUsQ0FBQztBQUl6Qjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUNILG1CQUF5QixFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFFO0lBQ3hELE1BQU0sUUFBUSxHQUFhLEVBQUUsQ0FBQztJQUU5QixNQUFNLFNBQVMsR0FBRyxlQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0QyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDM0IsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDekMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3RDLFFBQVEsQ0FBQyxJQUFJLENBQ1g7Z0JBQ0UsS0FBSztnQkFDTCxrQkFBa0IsU0FBUyxFQUFFO2dCQUM3Qix1QkFBdUIsUUFBUSxFQUFFO2dCQUNqQyx1Q0FBdUMsZUFBTyxFQUFFLENBQUMsSUFBSSxTQUFTO2dCQUM5RCwyQkFBMkI7Z0JBQzNCLElBQUk7Z0JBQ0osbUJBQW1CLFNBQVMsR0FDMUIsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFDNUMsb0JBQW9CO2dCQUNwQixJQUFJO2dCQUNKLGVBQWUsVUFBVSxFQUFFO2dCQUMzQixLQUFLO2FBQ04sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2IsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQS9CRCw0QkErQkMifQ==