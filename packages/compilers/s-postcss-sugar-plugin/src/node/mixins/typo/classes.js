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
function default_1({ params, atRule, processNested }) {
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
    * @name            ${cls}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELDhEQUF3QztBQUN4QyxrR0FBNEU7QUFFNUUsTUFBTSxzQ0FBdUMsU0FBUSxxQkFBWTs7QUFNZCwyREFBUztBQUxuRCxpREFBVSxHQUFHLEVBQUUsQ0FBQztBQU96QixtQkFBeUIsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxRQUFRLEdBQUcsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRTFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDekMsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLE1BQU0sR0FBRyxHQUFHLEtBQUssUUFBUSxFQUFFLENBQUM7UUFFNUIsTUFBTSxHQUFHLEdBQUcsaUNBQXlCLENBQUMsT0FBTyxFQUFFO1lBQzdDLE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsUUFBUSxDQUFDO1NBQ25ELENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxJQUFJLENBQUM7eUJBQ1csR0FBRzs7OztvREFJd0IsUUFBUTs7O3FCQUd2QyxHQUFHOzs7OztNQUtsQixHQUFHO1VBQ0MsR0FBRztLQUNSLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDcEMsUUFBUSxJQUFJLEVBQUU7Z0JBQ1osS0FBSyxlQUFlLENBQUM7Z0JBQ3JCLEtBQUssWUFBWSxDQUFDO2dCQUNsQixLQUFLLFFBQVE7b0JBQ1gsTUFBTSxPQUFPLEdBQUcsc0JBQXNCLEdBQUcsTUFBTSxHQUFHLFVBQVUsQ0FBQztvQkFDN0QsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDUSxPQUFPOzs7OzhFQUkyQyxHQUFHOzs7OztVQUt2RSxPQUFPO1lBQ0wsSUFBSSxpQkFBaUIsT0FBTyxDQUFDLElBQUksQ0FBQztVQUNwQyxDQUFDLENBQUM7b0JBQ0YsTUFBTTthQUNUO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBcEVELDRCQW9FQyJ9