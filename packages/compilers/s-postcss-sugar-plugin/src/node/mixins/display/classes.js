import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginDisplayClassesInterface extends __SInterface {
}
postcssSugarPluginDisplayClassesInterface.definition = {};
export { postcssSugarPluginDisplayClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`
        
      /**
       * @name            s-display--block
       * @namespace       sugar.css.mixins.display
       * @type            CssClass
       * 
       * This class allows you to apply the value "<yellow>block</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display--block">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-display--block{
          display: block !important;
      }

      /**
       * @name            s-display--inline-block
       * @namespace       sugar.css.mixins.display
       * @type            CssClass
       * 
       * This class allows you to apply the value "<yellow>inline-block</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display--inline-block">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-display--inline-block{
          display: inline-block !important;
      }

      /**
       * @name            s-display--contents
       * @namespace       sugar.css.mixins.display
       * @type            CssClass
       * 
       * This class allows you to apply the value "<yellow>contents</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display--contents">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-display--contents{
          display: contents !important;
      }

      /**
       * @name            s-display--flex
       * @namespace       sugar.css.mixins.display
       * @type            CssClass
       * 
       * This class allows you to apply the value "<yellow>flex</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display--flex">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-display--flex{
          display: flex !important;
      }

      /**
       * @name            s-display--grid
       * @namespace       sugar.css.mixins.display
       * @type            CssClass
       * 
       * This class allows you to apply the value "<yellow>grid</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display--grid">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-display--grid{
          display: grid !important;
      }

      /**
       * @name            s-display--inline-flex
       * @namespace       sugar.css.mixins.display
       * @type            CssClass
       * 
       * This class allows you to apply the value "<yellow>inline-flex</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display--inline-flex">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-display--inline-flex{
          display: inline-flex !important;
      }

      /**
       * @name            s-display--inline-grid
       * @namespace       sugar.css.mixins.display
       * @type            CssClass
       * 
       * This class allows you to apply the value "<yellow>inline-grid</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display--inline-grid">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-display--inline-grid{
          display: inline-grid !important;
      }

      /**
       * @name            s-display--none
       * @namespace       sugar.css.mixins.display
       * @type            CssClass
       * 
       * This class allows you to apply the value "<yellow>none</yellow>" to the display property on any HTMLElement
       * 
       * @example     html
       * <div class="s-display--none">
       *  Hello world
       * </div>
       * 
       * @since       2.0.0
       * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-display--none{
          display: none !important;
      }

  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFJckQsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZOztBQUMzRCxvREFBVSxHQUFHLEVBQUUsQ0FBQztBQUt6QixPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEpULENBQUMsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=