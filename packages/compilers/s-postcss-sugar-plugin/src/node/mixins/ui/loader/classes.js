import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiLoaderClassesClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginUiLoaderClassesClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/spinner.js`],
    };
}
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Loaders
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/loaders
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply loader styles like "spinner", and more to come...
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @cssClass         s-loader:spinner            Display a spinner loader
        * 
        * @example        html      Spinner
        *   <div class="s-grid:5">
        *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
        *           <div class="s-loader:spinner"></div>
        *       </div>
        *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
        *           <div class="s-loader:spinner s-color:accent"></div>
        *       </div>
        *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
        *           <div class="s-loader:spinner s-color:complementary"></div>
        *       </div>
        *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
        *           <div class="s-loader:spinner s-color:info"></div>
        *       </div>
        *       <div class="s-p:30 s-text:center s-ratio:1" style="padding-block-start: 30%">
        *           <div class="s-loader:spinner s-color:error"></div>
        *       </div>
        *   </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    vars.comment(() => `/**
        * @name           s-loader:spinner
        * @namespace      sugar.css.ui.range
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">spinner</s-color>" loader
        * 
        * @example        html
        * <div class="s-loader:spinner"></div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
      */
     `).code(`
        .s-loader--spinner {
            @sugar.ui.loader.spinner();
        }
        `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSxpREFBa0QsU0FBUSxZQUFZO0lBQ3hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLGlEQUFpRCxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTFFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE1BQU0sVUFBVSxZQUFZO0lBQ3hCLE9BQU87UUFDSCxLQUFLLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxhQUFhLENBQUM7S0FDdkMsQ0FBQztBQUNOLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXdDVCxDQUNBLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7O01BYVIsQ0FDRCxDQUFDLElBQUksQ0FBQzs7OztTQUlGLENBQUMsQ0FBQztJQUVQLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==