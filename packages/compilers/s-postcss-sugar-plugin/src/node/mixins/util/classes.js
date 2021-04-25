"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssSugarPluginUtilClassesInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginUtilClassesInterface;
postcssSugarPluginUtilClassesInterface.definition = {};
function default_1(params = {}, atRule, processNested) {
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
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBR3JELE1BQU0sc0NBQXVDLFNBQVEscUJBQVk7O0FBTWQsMkRBQVM7QUFMbkQsaURBQVUsR0FBRyxFQUFFLENBQUM7QUFPekIsbUJBQ0UsU0FBd0QsRUFBRSxFQUMxRCxNQUFNLEVBQ04sYUFBYTtJQUViLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFHOzs7Ozs7Ozs7Ozs7RUFZZixDQUFDO0lBRUQsTUFBTSxTQUFTLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JqQixDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JsQixDQUFDO0lBRUYsTUFBTSxVQUFVLEdBQUc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JsQixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUVuRSxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQTdGRCw0QkE2RkMifQ==