import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginFontClassesInterface extends __SInterface {
}
postcssSugarPluginFontClassesInterface.definition = {};
export { postcssSugarPluginFontClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const fontsFamiliesObj = __theme().config('font.family');
    Object.keys(fontsFamiliesObj).forEach((fontName) => {
        vars.push(`/**
  * @name          s-font--${fontName}
  * @namespace          sugar.css.font
  * @type               CssClass
  * 
  * This class allows you to apply the font "<yellow>${fontName}</yellow>" to any HTMLElement
  * 
  * @example        html
  * <h1 class="s-font--${fontName}">Hello world</h1>
  */
.s-font--${fontName} {
    @sugar.font.family(${fontName});
}`);
    });
    const fontsSizesObj = __theme().config('font.size');
    Object.keys(fontsSizesObj).forEach((sizeName) => {
        vars.push(`/**
  * @name          s-font--${sizeName}
  * @namespace          sugar.css.mixins.font
  * @type               CssClass
  * 
  * This class allows you to apply the font size "<yellow>${sizeName}</yellow>" to any HTMLElement
  * 
  * @example        html
  * <h1 class="s-font--${sizeName}">Hello world</h1>
  */
.s-font--${sizeName} {
    @sugar.font.size(${sizeName});
}`);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZOztBQUN4RCxpREFBVSxHQUFHLEVBQUUsQ0FBQztBQUt6QixPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLGdCQUFnQixHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQzs2QkFDZSxRQUFROzs7O3VEQUlrQixRQUFROzs7eUJBR3RDLFFBQVE7O1dBRXRCLFFBQVE7eUJBQ00sUUFBUTtFQUMvQixDQUFDLENBQUM7SUFDRixDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sYUFBYSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwRCxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQzlDLElBQUksQ0FBQyxJQUFJLENBQUM7NkJBQ2UsUUFBUTs7Ozs0REFJdUIsUUFBUTs7O3lCQUczQyxRQUFROztXQUV0QixRQUFRO3VCQUNJLFFBQVE7RUFDN0IsQ0FBQyxDQUFDO0lBQ0YsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9