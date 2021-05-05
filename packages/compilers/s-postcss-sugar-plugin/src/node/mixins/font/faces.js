"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../utils/theme"));
class postcssSugarPluginFontFacesInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginFontFacesInterface;
postcssSugarPluginFontFacesInterface.definition = {};
function default_1({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const fontsFamiliesObj = theme_1.default().config('font.family');
    Object.keys(fontsFamiliesObj).forEach((fontName) => {
        const fontObj = fontsFamiliesObj[fontName];
        vars.push(`/**
  * @name               ${fontName}
  * @namespace          sugar.css.font
  * @type               CssFontFace
  * 
  * This declare the @font-face for the "<yellow>${fontName}</yellow> font family"
  * 
  * @since          2.0.0
  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  */
 ${fontObj.import
            ? `@import url("${fontObj.import}");`
            : `
 @font-face {
    ${Object.keys(fontObj)
                .map((prop) => {
                return `${prop}: ${fontObj[prop]};`;
            })
                .join('\n')}
 }
 `}
`);
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmYWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsOERBQXdDO0FBRXhDLE1BQU0sb0NBQXFDLFNBQVEscUJBQVk7O0FBTWQseURBQVM7QUFMakQsK0NBQVUsR0FBRyxFQUFFLENBQUM7QUFPekIsbUJBQXlCLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUtkO0lBQ0MsTUFBTSxXQUFXLHFCQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sZ0JBQWdCLEdBQUcsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUNqRCxNQUFNLE9BQU8sR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDOzBCQUNZLFFBQVE7Ozs7bURBSWlCLFFBQVE7Ozs7O0dBTXhELE9BQU8sQ0FBQyxNQUFNO1lBQ1osQ0FBQyxDQUFDLGdCQUFnQixPQUFPLENBQUMsTUFBTSxLQUFLO1lBQ3JDLENBQUMsQ0FBQzs7TUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQztpQkFDbkIsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ1osT0FBTyxHQUFHLElBQUksS0FBSyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUN0QyxDQUFDLENBQUM7aUJBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7RUFHaEI7Q0FDQSxDQUFDLENBQUM7SUFDRCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBOUNELDRCQThDQyJ9