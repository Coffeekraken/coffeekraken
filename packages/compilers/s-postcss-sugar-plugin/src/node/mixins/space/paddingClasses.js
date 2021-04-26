"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../utils/theme"));
class postcssSugarPluginPaddingClassesInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginPaddingClassesInterface;
postcssSugarPluginPaddingClassesInterface.definition = {};
function default_1(params = {}, atRule, processNested) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const spacesObj = theme_1.default().config('space');
    Object.keys(spacesObj).forEach((spaceName) => {
        // paddings
        const clsPadding = `s-pad-${spaceName}`;
        vars.push(`/**
    * @name            .${clsPadding}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" padding style around any HTMLElement
    * 
    * @example      html
    * <span class="${clsPadding}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsPadding} {
        padding: sugar.space(${spaceName});
   }`);
        const clsPaddingTop = `s-pad-top-${spaceName}`;
        vars.push(`/**
    * @name            .${clsPaddingTop}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" top padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingTop}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsPaddingTop} {
        padding-top: sugar.space(${spaceName});
   }`);
        const clsPaddingBottom = `s-pad-bottom-${spaceName}`;
        vars.push(`/**
    * @name            .${clsPaddingBottom}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" bottom padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingBottom}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsPaddingBottom} {
        padding-bottom: sugar.space(${spaceName});
   }`);
        const clsPaddingLeft = `s-pad-left-${spaceName}`;
        vars.push(`/**
    * @name            .${clsPaddingLeft}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" left padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingLeft}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsPaddingLeft} {
        padding-left: sugar.space(${spaceName});
   }`);
        const clsPaddingRight = `s-pad-right-${spaceName}`;
        vars.push(`/**
    * @name            .${clsPaddingRight}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" right padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingRight}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsPaddingRight} {
        padding-right: sugar.space(${spaceName});
   }`);
        const clsPaddingX = `s-pad-x-${spaceName}`;
        vars.push(`/**
    * @name            .${clsPaddingX}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" left and right padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingX}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsPaddingX} {
        padding-left: sugar.space(${spaceName});
        padding-right: sugar.space(${spaceName});
   }`);
        const clsPaddingY = `s-pad-y-${spaceName}`;
        vars.push(`/**
    * @name            .${clsPaddingY}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" top and bottom padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingY}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsPaddingY} {
        padding-top: sugar.space(${spaceName});
        padding-bottom: sugar.space(${spaceName});
   }`);
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZ0NsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWRkaW5nQ2xhc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsOERBQXdDO0FBRXhDLE1BQU0seUNBQTBDLFNBQVEscUJBQVk7O0FBTWQsOERBQVM7QUFMdEQsb0RBQVUsR0FBRyxFQUFFLENBQUM7QUFPekIsbUJBQ0UsU0FBMkQsRUFBRSxFQUM3RCxNQUFNLEVBQ04sYUFBYTtJQUViLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLFNBQVMsR0FBRyxlQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzQyxXQUFXO1FBQ1gsTUFBTSxVQUFVLEdBQUcsU0FBUyxTQUFTLEVBQUUsQ0FBQztRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDOzBCQUNZLFVBQVU7Ozs7b0RBSWdCLFNBQVM7OztxQkFHeEMsVUFBVTs7Ozs7TUFLekIsVUFBVTsrQkFDZSxTQUFTO0tBQ25DLENBQUMsQ0FBQztRQUNILE1BQU0sYUFBYSxHQUFHLGFBQWEsU0FBUyxFQUFFLENBQUM7UUFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDWSxhQUFhOzs7O29EQUlhLFNBQVM7OztxQkFHeEMsYUFBYTs7Ozs7TUFLNUIsYUFBYTttQ0FDZ0IsU0FBUztLQUN2QyxDQUFDLENBQUM7UUFDSCxNQUFNLGdCQUFnQixHQUFHLGdCQUFnQixTQUFTLEVBQUUsQ0FBQztRQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDOzBCQUNZLGdCQUFnQjs7OztvREFJVSxTQUFTOzs7cUJBR3hDLGdCQUFnQjs7Ozs7TUFLL0IsZ0JBQWdCO3NDQUNnQixTQUFTO0tBQzFDLENBQUMsQ0FBQztRQUNILE1BQU0sY0FBYyxHQUFHLGNBQWMsU0FBUyxFQUFFLENBQUM7UUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDWSxjQUFjOzs7O29EQUlZLFNBQVM7OztxQkFHeEMsY0FBYzs7Ozs7TUFLN0IsY0FBYztvQ0FDZ0IsU0FBUztLQUN4QyxDQUFDLENBQUM7UUFDSCxNQUFNLGVBQWUsR0FBRyxlQUFlLFNBQVMsRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUM7MEJBQ1ksZUFBZTs7OztvREFJVyxTQUFTOzs7cUJBR3hDLGVBQWU7Ozs7O01BSzlCLGVBQWU7cUNBQ2dCLFNBQVM7S0FDekMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsV0FBVyxTQUFTLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDOzBCQUNZLFdBQVc7Ozs7b0RBSWUsU0FBUzs7O3FCQUd4QyxXQUFXOzs7OztNQUsxQixXQUFXO29DQUNtQixTQUFTO3FDQUNSLFNBQVM7S0FDekMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxXQUFXLEdBQUcsV0FBVyxTQUFTLEVBQUUsQ0FBQztRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDOzBCQUNZLFdBQVc7Ozs7b0RBSWUsU0FBUzs7O3FCQUd4QyxXQUFXOzs7OztNQUsxQixXQUFXO21DQUNrQixTQUFTO3NDQUNOLFNBQVM7S0FDMUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQTVJRCw0QkE0SUMifQ==