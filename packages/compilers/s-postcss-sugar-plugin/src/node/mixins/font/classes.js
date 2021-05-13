import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginFontClassesInterface extends __SInterface {
}
postcssSugarPluginFontClassesInterface.definition = {};
export { postcssSugarPluginFontClassesInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const fontsFamiliesObj = __theme().config('font.family');
    Object.keys(fontsFamiliesObj).forEach((fontName) => {
        vars.push(`/**
  * @name          s-font-${fontName}
  * @namespace          sugar.css.font
  * @type               CssClass
  * 
  * This class allows you to apply the font "<yellow>${fontName}</yellow>" to any HTMLElement
  * 
  * @example        html
  * <h1 class="s-font-${fontName}">Hello world</h1>
  */
.s-font-${fontName} {
    @sugar.font.family(${fontName});
}`);
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZOztBQUN4RCxpREFBVSxHQUFHLEVBQUUsQ0FBQztBQUt6QixPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLGdCQUFnQixHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQzs0QkFDYyxRQUFROzs7O3VEQUltQixRQUFROzs7d0JBR3ZDLFFBQVE7O1VBRXRCLFFBQVE7eUJBQ08sUUFBUTtFQUMvQixDQUFDLENBQUM7SUFDRixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=