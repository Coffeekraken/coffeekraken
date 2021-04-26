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
function default_1(params = {}, atRule, processNested) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const spacesObj = theme_1.default().config('space');
    Object.keys(spacesObj).forEach((spaceName) => {
        // margins
        const clsMargin = `s-mar-${spaceName}`;
        vars.push(`/**
    * @name            .${clsMargin}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyZ2luQ2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hcmdpbkNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELDhEQUF3QztBQUd4QyxNQUFNLHdDQUF5QyxTQUFRLHFCQUFZOztBQU1kLDZEQUFTO0FBTHJELG1EQUFVLEdBQUcsRUFBRSxDQUFDO0FBT3pCLG1CQUNFLFNBQTBELEVBQUUsRUFDNUQsTUFBTSxFQUNOLGFBQWE7SUFFYixNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxTQUFTLEdBQUcsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDM0MsVUFBVTtRQUNWLE1BQU0sU0FBUyxHQUFHLFNBQVMsU0FBUyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDWSxTQUFTOzs7O29EQUlpQixTQUFTOzs7cUJBR3hDLFNBQVM7Ozs7O01BS3hCLFNBQVM7OEJBQ2UsU0FBUztLQUNsQyxDQUFDLENBQUM7UUFDSCxNQUFNLFlBQVksR0FBRyxhQUFhLFNBQVMsRUFBRSxDQUFDO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUM7MEJBQ1ksWUFBWTs7OztvREFJYyxTQUFTOzs7cUJBR3hDLFlBQVk7Ozs7O01BSzNCLFlBQVk7a0NBQ2dCLFNBQVM7S0FDdEMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxlQUFlLEdBQUcsZ0JBQWdCLFNBQVMsRUFBRSxDQUFDO1FBQ3BELElBQUksQ0FBQyxJQUFJLENBQUM7MEJBQ1ksZUFBZTs7OztvREFJVyxTQUFTOzs7cUJBR3hDLGVBQWU7Ozs7O01BSzlCLGVBQWU7cUNBQ2dCLFNBQVM7S0FDekMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxhQUFhLEdBQUcsY0FBYyxTQUFTLEVBQUUsQ0FBQztRQUNoRCxJQUFJLENBQUMsSUFBSSxDQUFDOzBCQUNZLGFBQWE7Ozs7b0RBSWEsU0FBUzs7O3FCQUd4QyxhQUFhOzs7OztNQUs1QixhQUFhO21DQUNnQixTQUFTO0tBQ3ZDLENBQUMsQ0FBQztRQUNILE1BQU0sY0FBYyxHQUFHLGVBQWUsU0FBUyxFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDWSxjQUFjOzs7O29EQUlZLFNBQVM7OztxQkFHeEMsY0FBYzs7Ozs7TUFLN0IsY0FBYztvQ0FDZ0IsU0FBUztLQUN4QyxDQUFDLENBQUM7UUFDSCxNQUFNLFVBQVUsR0FBRyxXQUFXLFNBQVMsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7MEJBQ1ksVUFBVTs7OztvREFJZ0IsU0FBUzs7O3FCQUd4QyxVQUFVOzs7OztNQUt6QixVQUFVO21DQUNtQixTQUFTO29DQUNSLFNBQVM7S0FDeEMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxVQUFVLEdBQUcsV0FBVyxTQUFTLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzBCQUNZLFVBQVU7Ozs7b0RBSWdCLFNBQVM7OztxQkFHeEMsVUFBVTs7Ozs7TUFLekIsVUFBVTtrQ0FDa0IsU0FBUztxQ0FDTixTQUFTO0tBQ3pDLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUE1SUQsNEJBNElDIn0=