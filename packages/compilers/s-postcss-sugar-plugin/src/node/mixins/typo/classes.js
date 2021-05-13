import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __jsObjectToCssProperties from '../../utils/jsObjectToCssProperties';
class postcssSugarPluginTypoClassesInterface extends __SInterface {
}
postcssSugarPluginTypoClassesInterface.definition = {};
export { postcssSugarPluginTypoClassesInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const typosObj = __theme().config('typo');
    Object.keys(typosObj).forEach((typoName) => {
        const typoObj = typosObj[typoName];
        const cls = `s-${typoName}`;
        const css = __jsObjectToCssProperties(typoObj, {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyx5QkFBeUIsTUFBTSxxQ0FBcUMsQ0FBQztBQUU1RSxNQUFNLHNDQUF1QyxTQUFRLFlBQVk7O0FBQ3hELGlEQUFVLEdBQUcsRUFBRSxDQUFDO0FBS3pCLE9BQU8sRUFBRSxzQ0FBc0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUtkO0lBQ0MsTUFBTSxXQUFXLHFCQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sUUFBUSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUUxQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3pDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNuQyxNQUFNLEdBQUcsR0FBRyxLQUFLLFFBQVEsRUFBRSxDQUFDO1FBRTVCLE1BQU0sR0FBRyxHQUFHLHlCQUF5QixDQUFDLE9BQU8sRUFBRTtZQUM3QyxPQUFPLEVBQUUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLFFBQVEsQ0FBQztTQUNuRCxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNXLEdBQUc7Ozs7b0RBSXdCLFFBQVE7OztxQkFHdkMsR0FBRzs7Ozs7TUFLbEIsR0FBRztVQUNDLEdBQUc7S0FDUixDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3BDLFFBQVEsSUFBSSxFQUFFO2dCQUNaLEtBQUssZUFBZSxDQUFDO2dCQUNyQixLQUFLLFlBQVksQ0FBQztnQkFDbEIsS0FBSyxRQUFRO29CQUNYLE1BQU0sT0FBTyxHQUFHLHNCQUFzQixHQUFHLE1BQU0sR0FBRyxVQUFVLENBQUM7b0JBQzdELElBQUksQ0FBQyxJQUFJLENBQUM7NEJBQ1EsT0FBTzs7Ozs4RUFJMkMsR0FBRzs7Ozs7VUFLdkUsT0FBTztZQUNMLElBQUksaUJBQWlCLE9BQU8sQ0FBQyxJQUFJLENBQUM7VUFDcEMsQ0FBQyxDQUFDO29CQUNGLE1BQU07YUFDVDtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9