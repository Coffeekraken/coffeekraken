import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginTextClassesInterface extends __SInterface {
}
postcssSugarPluginTextClassesInterface.definition = {};
export { postcssSugarPluginTextClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    // align
    vars.push(`
        /**
         * @name            s-text--left
         * @namespace       sugar.css.mixins.align
         * @type            CssClass
         * 
         * This class allows you to align text to the left side
         * 
         * @example     html
         * <div class="s-text--left">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-text--left {
            text-align: left;
        }

       /**
         * @name            s-text--right
         * @namespace       sugar.css.mixins.align
         * @type            CssClass
         * 
         * This class allows you to align text to the right side
         * 
         * @example     html
         * <div class="s-text--right">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-text--right {
            text-align: right;
        }

        /**
         * @name            s-text--center
         * @namespace       sugar.css.mixins.align
         * @type            CssClass
         * 
         * This class allows you to align text to the center
         * 
         * @example     html
         * <div class="s-text--center">Hello world</div>
         * 
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        .s-text--center {
            text-align: center;
        }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFJckQsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZOztBQUN4RCxpREFBVSxHQUFHLEVBQUUsQ0FBQztBQUt6QixPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixRQUFRO0lBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbURULENBQUMsQ0FBQztJQUdILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=