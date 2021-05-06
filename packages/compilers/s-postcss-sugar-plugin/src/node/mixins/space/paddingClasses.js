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
function default_1({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const spacesObj = theme_1.default().config('space');
    Object.keys(spacesObj).forEach((spaceName) => {
        // paddings
        const clsPadding = `s-pad-${spaceName}`;
        vars.push(`/**
    * @name            ${clsPadding}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZ0NsYXNzZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYWRkaW5nQ2xhc3Nlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsOERBQXdDO0FBRXhDLE1BQU0seUNBQTBDLFNBQVEscUJBQVk7O0FBTWQsOERBQVM7QUFMdEQsb0RBQVUsR0FBRyxFQUFFLENBQUM7QUFPekIsbUJBQXlCLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUtkO0lBQ0MsTUFBTSxXQUFXLHFCQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sU0FBUyxHQUFHLGVBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU1QyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzNDLFdBQVc7UUFDWCxNQUFNLFVBQVUsR0FBRyxTQUFTLFNBQVMsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJLENBQUM7eUJBQ1csVUFBVTs7OztvREFJaUIsU0FBUzs7O3FCQUd4QyxVQUFVOzs7OztNQUt6QixVQUFVOytCQUNlLFNBQVM7S0FDbkMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxhQUFhLEdBQUcsYUFBYSxTQUFTLEVBQUUsQ0FBQztRQUMvQyxJQUFJLENBQUMsSUFBSSxDQUFDOzBCQUNZLGFBQWE7Ozs7b0RBSWEsU0FBUzs7O3FCQUd4QyxhQUFhOzs7OztNQUs1QixhQUFhO21DQUNnQixTQUFTO0tBQ3ZDLENBQUMsQ0FBQztRQUNILE1BQU0sZ0JBQWdCLEdBQUcsZ0JBQWdCLFNBQVMsRUFBRSxDQUFDO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUM7MEJBQ1ksZ0JBQWdCOzs7O29EQUlVLFNBQVM7OztxQkFHeEMsZ0JBQWdCOzs7OztNQUsvQixnQkFBZ0I7c0NBQ2dCLFNBQVM7S0FDMUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxjQUFjLEdBQUcsY0FBYyxTQUFTLEVBQUUsQ0FBQztRQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDOzBCQUNZLGNBQWM7Ozs7b0RBSVksU0FBUzs7O3FCQUd4QyxjQUFjOzs7OztNQUs3QixjQUFjO29DQUNnQixTQUFTO0tBQ3hDLENBQUMsQ0FBQztRQUNILE1BQU0sZUFBZSxHQUFHLGVBQWUsU0FBUyxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDWSxlQUFlOzs7O29EQUlXLFNBQVM7OztxQkFHeEMsZUFBZTs7Ozs7TUFLOUIsZUFBZTtxQ0FDZ0IsU0FBUztLQUN6QyxDQUFDLENBQUM7UUFDSCxNQUFNLFdBQVcsR0FBRyxXQUFXLFNBQVMsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUM7MEJBQ1ksV0FBVzs7OztvREFJZSxTQUFTOzs7cUJBR3hDLFdBQVc7Ozs7O01BSzFCLFdBQVc7b0NBQ21CLFNBQVM7cUNBQ1IsU0FBUztLQUN6QyxDQUFDLENBQUM7UUFDSCxNQUFNLFdBQVcsR0FBRyxXQUFXLFNBQVMsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUM7MEJBQ1ksV0FBVzs7OztvREFJZSxTQUFTOzs7cUJBR3hDLFdBQVc7Ozs7O01BSzFCLFdBQVc7bUNBQ2tCLFNBQVM7c0NBQ04sU0FBUztLQUMxQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBaEpELDRCQWdKQyJ9