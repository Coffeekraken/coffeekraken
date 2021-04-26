"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../utils/theme"));
const jsObjectToCssProperties_1 = __importDefault(require("../../utils/jsObjectToCssProperties"));
class postcssSugarPluginTypoClassesInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginTypoClassesInterface;
postcssSugarPluginTypoClassesInterface.definition = {};
function default_1(params = {}, atRule, processNested) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const typosObj = theme_1.default().config('typo');
    Object.keys(typosObj).forEach((typoName) => {
        const typoObj = typosObj[typoName];
        const cls = `s-${typoName}`;
        const css = jsObjectToCssProperties_1.default(typoObj, {
            exclude: ['margin-bottom', 'margin-top', 'margin']
        });
        vars.push(`/**
    * @name            .${cls}
    * @namespace        sugar.css.typo
    * @type             CssClass
    * 
    * This class allows you to apply the "<yellow>${typoName}</yellow>" typography style to any HTMLElement
    * 
    * @example      html
    * <span class="${cls}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${cls} {
        ${css}
   }`);
        Object.keys(typoObj).forEach((prop) => {
            switch (prop) {
                case 'margin-bottom':
                case 'margin-top':
                case 'margin':
                    const clsName = `.s-space-children .${cls}, .${cls}.s-space`;
                    vars.push(`/**
          * @name         ${clsName}
          * @namespace    sugar.css.typo
          * @type         CssClass
          * 
          * This class allows you to activate the space(s) on your "<yellow>${cls}</yellow>" HTMLElement
          * 
          * @since    2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        ${clsName} {
          ${prop}: sugar.space(${typoObj[prop]});
        }`);
                    break;
            }
        });
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELDhEQUF3QztBQUN4QyxrR0FBNEU7QUFFNUUsTUFBTSxzQ0FBdUMsU0FBUSxxQkFBWTs7QUFNZCwyREFBUztBQUxuRCxpREFBVSxHQUFHLEVBQUUsQ0FBQztBQU96QixtQkFDRSxTQUF3RCxFQUFFLEVBQzFELE1BQU0sRUFDTixhQUFhO0lBRWIsTUFBTSxXQUFXLHFCQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sUUFBUSxHQUFHLGVBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUxQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3pDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxNQUFNLEdBQUcsR0FBRyxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBRTVCLE1BQU0sR0FBRyxHQUFHLGlDQUF5QixDQUFDLE9BQU8sRUFBRTtZQUM3QyxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQztTQUNuRCxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDOzBCQUNZLEdBQUc7Ozs7b0RBSXVCLFFBQVE7OztxQkFHdkMsR0FBRzs7Ozs7TUFLbEIsR0FBRztVQUNDLEdBQUc7S0FDUixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3BDLFFBQVEsSUFBSSxFQUFFO2dCQUNaLEtBQUssZUFBZSxDQUFDO2dCQUNyQixLQUFLLFlBQVksQ0FBQztnQkFDbEIsS0FBSyxRQUFRO29CQUNYLE1BQU0sT0FBTyxHQUFHLHNCQUFzQixHQUFHLE1BQU0sR0FBRyxVQUFVLENBQUM7b0JBQzdELElBQUksQ0FBQyxJQUFJLENBQUM7NEJBQ1EsT0FBTzs7Ozs4RUFJMkMsR0FBRzs7Ozs7VUFLdkUsT0FBTztZQUNMLElBQUksaUJBQWlCLE9BQU8sQ0FBQyxJQUFJLENBQUM7VUFDcEMsQ0FBQyxDQUFDO29CQUNGLE1BQU07YUFDVDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQWhFRCw0QkFnRUMifQ==