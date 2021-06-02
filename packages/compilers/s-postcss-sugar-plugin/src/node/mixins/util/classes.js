import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUtilClassesInterface extends __SInterface {
}
postcssSugarPluginUtilClassesInterface.definition = {};
export { postcssSugarPluginUtilClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const pilled = `/**
  * @name          .s-pilled
  * @namespace          sugar.css.util
  * @type               CssClass
  * 
  * This class allows you to apply a "<yellow>pill</yellow>" style to any HTMLElement
  * 
  * @example        html
  * <a class="s-btn s-btn--primary s-pilled">I'm a cool pilled button</a>
  */
.s-pilled {
    @sugar.util.pilled;
}`;
    const centerAbs = `/**
  * @name       .s-center-abs
  * @namespace      sugar.css.util
  * @type         CssClass
  * 
  * This class allows you to center any HTMLElement both vertically and horizontally using the
  * well known absolute positionning method.
  * Note that you must have the parent to have a position setted...
  * 
  * @example    html
  * <div class="s-ratio-16-9 s-bg-primary">
  *   <div class="s-center-abs">I'm centered</div>
  * </div>
  * 
  * @since      2.0.0
  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  */
  .s-center-abs {
    @sugar.util.center(abs, both);
  }
  `;
    const centerAbsX = `/**
  * @name       .s-center-abs-x
  * @namespace      sugar.css.util
  * @type         CssClass
  * 
  * This class allows you to center any HTMLElement horizontally using the
  * well known absolute positionning method.
  * Note that you must have the parent to have a position setted...
  * 
  * @example    html
  * <div class="s-ratio-16-9 s-bg-primary">
  *   <div class="s-center-abs-x">I'm horizontally centered</div>
  * </div>
  * 
  * @since      2.0.0
  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  */
  .s-center-abs-x {
    @sugar.util.center(abs, x);
  }
  `;
    const centerAbsY = `/**
  * @name       .s-center-abs-y
  * @namespace      sugar.css.util
  * @type         CssClass
  * 
  * This class allows you to center any HTMLElement vertically using the
  * well known absolute positionning method.
  * Note that you must have the parent to have a position setted...
  * 
  * @example    html
  * <div class="s-ratio-16-9 s-bg-primary">
  *   <div class="s-center-abs-y">I'm vertically centered</div>
  * </div>
  * 
  * @since      2.0.0
  * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
  */
  .s-center-abs-y {
    @sugar.util.center(abs, y);
  }
  `;
    const vars = [pilled, centerAbs, centerAbsX, centerAbsY];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZOztBQUN4RCxpREFBVSxHQUFHLEVBQUUsQ0FBQztBQUt6QixPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFHOzs7Ozs7Ozs7Ozs7RUFZZixDQUFDO0lBRUQsTUFBTSxTQUFTLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JqQixDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JsQixDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JsQixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUVuRSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9