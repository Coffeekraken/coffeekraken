import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiLoaderClassesClassesInterface extends __SInterface {
}
postcssSugarPluginUiLoaderClassesClassesInterface.definition = {};
export { postcssSugarPluginUiLoaderClassesClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`/**
        * @name           s-loader:spinner
        * @namespace      sugar.css.ui.range
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">spinner</s-color>" loader
        * 
        * @example        html
        * <div class="s-loader\:spinner"></div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
        .s-loader--spinner {
            @sugar.ui.loader.spinner();
        }
        `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSxpREFBa0QsU0FBUSxZQUFZOztBQUNqRSw0REFBVSxHQUFHLEVBQUUsQ0FBQztBQUszQixPQUFPLEVBQUUsaURBQWlELElBQUksU0FBUyxFQUFFLENBQUM7QUFFMUUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O1NBZ0JMLENBQUMsQ0FBQztJQUVQLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=