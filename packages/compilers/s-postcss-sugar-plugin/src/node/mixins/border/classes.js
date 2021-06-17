import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginBorderRadiusClassesMixinInterface extends __SInterface {
}
postcssSugarPluginBorderRadiusClassesMixinInterface.definition = {};
export { postcssSugarPluginBorderRadiusClassesMixinInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const radiusesObj = __theme().config('border.radius');
    const vars = [];
    Object.keys(radiusesObj).forEach((radiusName) => {
        const cls = `s-border--radius-${radiusName}`.replace('-default', '');
        const radiusCss = `/**
  * @name          ${cls}
  * @namespace          sugar.css.border
  * @type               CssClass
  * 
  * This class allows you to apply a "<yellow>${radiusName}</yellow>" border radius style to any HTMLElement
  * 
  * @example        html
  * <div class="s-border--radius-30 s-color--complementary">
  *     Hello world
  * </div>
  */
.${cls} {
    @sugar.border.radius(${radiusName});
}`;
        vars.push(radiusCss);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFFeEMsTUFBTSxtREFBb0QsU0FBUSxZQUFZOztBQUNyRSw4REFBVSxHQUFHLEVBQUUsQ0FBQztBQUt6QixPQUFPLEVBQUUsbURBQW1ELElBQUksU0FBUyxFQUFFLENBQUM7QUFFNUUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sV0FBVyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUV0RCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUU5QyxNQUFNLEdBQUcsR0FBRyxvQkFBb0IsVUFBVSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyRSxNQUFNLFNBQVMsR0FBRztxQkFDRCxHQUFHOzs7O2dEQUl3QixVQUFVOzs7Ozs7O0dBT3ZELEdBQUc7MkJBQ3FCLFVBQVU7RUFDbkMsQ0FBQztRQUNDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9