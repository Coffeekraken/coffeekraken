import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginPositionClassesInterface extends __SInterface {
}
postcssSugarPluginPositionClassesInterface.definition = {};
export { postcssSugarPluginPositionClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`
        
      /**
       * @name            s-position--absolute
       * @namespace       sugar.css.mixins.position
       * @type            CssClass
       * 
       * This class allows you to apply the value "<yellow>absolute</yellow>" to the position property on any HTMLElement
       * 
       * @example     html
       * <div class="s-position--absolute">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-position--absolute{
          position: absolute !important;
      }

      /**
       * @name            s-position--relative
       * @namespace       sugar.css.mixins.position
       * @type            CssClass
       * 
       * This class allows you to apply the value "<yellow>relative</yellow>" to the position property on any HTMLElement
       * 
       * @example     html
       * <div class="s-position--relative">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-position--relative{
          position: relative !important;
      }

      /**
       * @name            s-position--fixed
       * @namespace       sugar.css.mixins.position
       * @type            CssClass
       * 
       * This class allows you to apply the value "<yellow>fixed</yellow>" to the position property on any HTMLElement
       * 
       * @example     html
       * <div class="s-position--fixed">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-position--fixed{
          position: fixed !important;
      }

      /**
       * @name            s-position--sticky
       * @namespace       sugar.css.mixins.position
       * @type            CssClass
       * 
       * This class allows you to apply the value "<yellow>sticky</yellow>" to the position property on any HTMLElement
       * 
       * @example     html
       * <div class="s-position--sticky">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-position--sticky{
          position: sticky !important;
      }

  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFJckQsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZOztBQUM1RCxxREFBVSxHQUFHLEVBQUUsQ0FBQztBQUt6QixPQUFPLEVBQUUsMENBQTBDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4RVQsQ0FBQyxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==