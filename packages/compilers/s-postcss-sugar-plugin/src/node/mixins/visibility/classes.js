import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixins.visibility
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the overflow helper classes like ```.s-visibility:hidden```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.visibility.classes;
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
        * @name          Visibility
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/visibility
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a visibility style on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass         s-visibility:hidden             Make the element hidden in the ui
        * @cssClass         s-visibility:visible            Make the element visible in the ui
        * @cssClass         s-visibility:collapse            Make the element visibly collapased in the ui
        * 
        * @example        html
        * <div class="s-bg:main">
        *   <div style="height: 100px" class="s-bg:accent">I'm visible</div>
        *   <div style="height: 100px" class="s-visibility:hidden s-bg:complementary">I'm hidden</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    vars.push(`/**
    * @name          s-visibility:hidden
    * @namespace          sugar.css.visibility
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>hidden</yellow>" visibility style to any HTMLElement
    * 
    * @example        html
    * <div class="s-visibility:hidden">Hello world</div>
    */
    .s-visibility--hidden {
        visibility: hidden;
    }`);
    vars.push(`/**
    * @name          s-visibility:visible
    * @namespace          sugar.css.visibility
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>visible</yellow>" visibility style to any HTMLElement
    * 
    * @example        html
    * <div class="s-visibility:visible">Hello world</div>
    */
    .s-visibility--visible {
        visibility: visible;
    }`);
    vars.push(`/**
    * @name          s-visibility:collapse
    * @namespace          sugar.css.visibility
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>collapse</yellow>" visibility style to any HTMLElement
    * 
    * @example        html
    * <div class="s-visibility:collapse">Hello world</div>
    */
    .s-visibility--collapse {
        visibility: collapse;
    }`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLDBDQUEyQyxTQUFRLFlBQVk7O0FBQzFELHFEQUFVLEdBQUcsRUFBRSxDQUFDO0FBSzNCLE9BQU8sRUFBRSwwQ0FBMEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVuRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNkJULENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7O01BY1IsQ0FBQyxDQUFDO0lBRUosSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7TUFjUixDQUFDLENBQUM7SUFFSixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7OztNQWNSLENBQUMsQ0FBQztJQUVKLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==