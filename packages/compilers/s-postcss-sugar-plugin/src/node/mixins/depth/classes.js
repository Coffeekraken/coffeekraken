import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginDepthClassesInterface extends __SInterface {
}
postcssSugarPluginDepthClassesInterface.definition = {};
export { postcssSugarPluginDepthClassesInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, params);
    const depthsObj = __theme().config('depth');
    const vars = [];
    Object.keys(depthsObj).forEach((depthName) => {
        const depthCss = `/**
  * @name          s-depth-${depthName}
  * @namespace          sugar.css.depth
  * @type               CssClass
  * 
  * This class allows you to apply a "<yellow>${depthName}</yellow>" depth style to any HTMLElement
  * 
  * @example        html
  * <a class="s-btn s-btn--primary s-depth-${depthName}">I'm a cool depth button</a>
  */
.s-depth-${depthName} {
    @sugar.depth(${depthName});
}`;
        vars.push(depthCss);
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZOztBQUN6RCxrREFBVSxHQUFHLEVBQUUsQ0FBQztBQUt6QixPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sU0FBUyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU1QyxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMzQyxNQUFNLFFBQVEsR0FBRzs2QkFDUSxTQUFTOzs7O2dEQUlVLFNBQVM7Ozs2Q0FHWixTQUFTOztXQUUzQyxTQUFTO21CQUNELFNBQVM7RUFDMUIsQ0FBQztRQUNDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9