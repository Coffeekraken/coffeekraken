import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixins.visually
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the overflow helper classes like ```.s-visually:hidden```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.visually.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginOverflowClassesInterface extends __SInterface {
}
postcssSugarPluginOverflowClassesInterface.definition = {};
export { postcssSugarPluginOverflowClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`
      /**
        * @name          Visually
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/visually
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a visually style on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass         s-visually:hidden             Make the element hidden in the ui
        * @cssClass         s-visually:visible            Make the element visible in the ui
        * 
        * @example        html
        * <div class="s-bg:main">
        *   <div style="height: 100px" class="s-bg:accent">I'm visible</div>
        *   <div style="height: 100px" class="s-visually:hidden s-bg:complementary">I'm hidden</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    vars.push(`/**
    * @name          s-visually:hidden
    * @namespace          sugar.css.visually
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>hidden</yellow>" visually style to any HTMLElement
    * 
    * @example        html
    * <div class="s-visually:hidden">Hello world</div>
    */
    .s-visually--hidden {
       @sugar.visually.hidden;
    }`);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLDBDQUEyQyxTQUFRLFlBQVk7O0FBQzFELHFEQUFVLEdBQUcsRUFBRSxDQUFDO0FBSzNCLE9BQU8sRUFBRSwwQ0FBMEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVuRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0E0QlQsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7TUFjUixDQUFDLENBQUM7SUFFSixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9