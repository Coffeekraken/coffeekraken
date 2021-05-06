"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../utils/theme"));
class postcssSugarPluginMarginClassesInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginMarginClassesInterface;
postcssSugarPluginMarginClassesInterface.definition = {};
function default_1({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const spacesObj = theme_1.default().config('space');
    Object.keys(spacesObj).forEach((spaceName) => {
        // margins
        const clsMargin = `s-mar-${spaceName}`;
        vars.push(`/**
    * @name            ${clsMargin}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="${clsMargin}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMargin} {
        margin: sugar.space(${spaceName});
   }`);
        const clsMarginTop = `s-mar-top-${spaceName}`;
        vars.push(`/**
    * @name            .${clsMarginTop}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" top margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginTop}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginTop} {
        margin-top: sugar.space(${spaceName});
   }`);
        const clsMarginBottom = `s-mar-bottom-${spaceName}`;
        vars.push(`/**
    * @name            .${clsMarginBottom}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" bottom margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginBottom}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginBottom} {
        margin-bottom: sugar.space(${spaceName});
   }`);
        const clsMarginLeft = `s-mar-left-${spaceName}`;
        vars.push(`/**
    * @name            .${clsMarginLeft}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" left margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginLeft}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginLeft} {
        margin-left: sugar.space(${spaceName});
   }`);
        const clsMarginRight = `s-mar-right-${spaceName}`;
        vars.push(`/**
    * @name            .${clsMarginRight}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" right margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginRight}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginRight} {
        margin-right: sugar.space(${spaceName});
   }`);
        const clsMarginX = `s-mar-x-${spaceName}`;
        vars.push(`/**
    * @name            .${clsMarginX}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" left and right margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginX}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginX} {
        margin-left: sugar.space(${spaceName});
        margin-right: sugar.space(${spaceName});
   }`);
        const clsMarginY = `s-mar-y-${spaceName}`;
        vars.push(`/**
    * @name            .${clsMarginY}
    * @namespace        sugar.css.space
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" top and bottom margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginY}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginY} {
        margin-top: sugar.space(${spaceName});
        margin-bottom: sugar.space(${spaceName});
   }`);
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyZ2luQ2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmdpbkNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELDhEQUF3QztBQUd4QyxNQUFNLHdDQUF5QyxTQUFRLHFCQUFZOztBQU1kLDZEQUFTO0FBTHJELG1EQUFVLEdBQUcsRUFBRSxDQUFDO0FBT3pCLG1CQUF5QixFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLFNBQVMsR0FBRyxlQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFNUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzQyxVQUFVO1FBQ1YsTUFBTSxTQUFTLEdBQUcsU0FBUyxTQUFTLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNXLFNBQVM7Ozs7b0RBSWtCLFNBQVM7OztxQkFHeEMsU0FBUzs7Ozs7TUFLeEIsU0FBUzs4QkFDZSxTQUFTO0tBQ2xDLENBQUMsQ0FBQztRQUNILE1BQU0sWUFBWSxHQUFHLGFBQWEsU0FBUyxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDWSxZQUFZOzs7O29EQUljLFNBQVM7OztxQkFHeEMsWUFBWTs7Ozs7TUFLM0IsWUFBWTtrQ0FDZ0IsU0FBUztLQUN0QyxDQUFDLENBQUM7UUFDSCxNQUFNLGVBQWUsR0FBRyxnQkFBZ0IsU0FBUyxFQUFFLENBQUM7UUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDWSxlQUFlOzs7O29EQUlXLFNBQVM7OztxQkFHeEMsZUFBZTs7Ozs7TUFLOUIsZUFBZTtxQ0FDZ0IsU0FBUztLQUN6QyxDQUFDLENBQUM7UUFDSCxNQUFNLGFBQWEsR0FBRyxjQUFjLFNBQVMsRUFBRSxDQUFDO1FBQ2hELElBQUksQ0FBQyxJQUFJLENBQUM7MEJBQ1ksYUFBYTs7OztvREFJYSxTQUFTOzs7cUJBR3hDLGFBQWE7Ozs7O01BSzVCLGFBQWE7bUNBQ2dCLFNBQVM7S0FDdkMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxjQUFjLEdBQUcsZUFBZSxTQUFTLEVBQUUsQ0FBQztRQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDOzBCQUNZLGNBQWM7Ozs7b0RBSVksU0FBUzs7O3FCQUd4QyxjQUFjOzs7OztNQUs3QixjQUFjO29DQUNnQixTQUFTO0tBQ3hDLENBQUMsQ0FBQztRQUNILE1BQU0sVUFBVSxHQUFHLFdBQVcsU0FBUyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDWSxVQUFVOzs7O29EQUlnQixTQUFTOzs7cUJBR3hDLFVBQVU7Ozs7O01BS3pCLFVBQVU7bUNBQ21CLFNBQVM7b0NBQ1IsU0FBUztLQUN4QyxDQUFDLENBQUM7UUFDSCxNQUFNLFVBQVUsR0FBRyxXQUFXLFNBQVMsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7MEJBQ1ksVUFBVTs7OztvREFJZ0IsU0FBUzs7O3FCQUd4QyxVQUFVOzs7OztNQUt6QixVQUFVO2tDQUNrQixTQUFTO3FDQUNOLFNBQVM7S0FDekMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQWhKRCw0QkFnSkMifQ==