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
function default_1(params = {}, atRule, processNested) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmYWNlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsOERBQXdDO0FBRXhDLE1BQU0sb0NBQXFDLFNBQVEscUJBQVk7O0FBTWQseURBQVM7QUFMakQsK0NBQVUsR0FBRyxFQUFFLENBQUM7QUFPekIsbUJBQ0UsU0FBc0QsRUFBRSxFQUN4RCxNQUFNLEVBQ04sYUFBYTtJQUViLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLGdCQUFnQixHQUFHLGVBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDakQsTUFBTSxPQUFPLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDWSxRQUFROzs7O21EQUlpQixRQUFROzs7OztHQU14RCxPQUFPLENBQUMsTUFBTTtZQUNaLENBQUMsQ0FBQyxnQkFBZ0IsT0FBTyxDQUFDLE1BQU0sS0FBSztZQUNyQyxDQUFDLENBQUM7O01BRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7aUJBQ25CLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNaLE9BQU8sR0FBRyxJQUFJLEtBQUssT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7WUFDdEMsQ0FBQyxDQUFDO2lCQUNELElBQUksQ0FBQyxJQUFJLENBQUM7O0VBR2hCO0NBQ0EsQ0FBQyxDQUFDO0lBQ0QsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQTFDRCw0QkEwQ0MifQ==