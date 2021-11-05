import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixins.disabled
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to generate all the disabled helper classes like s-disabled
 *
 * @return        {Css}        The generated css
 *
 * @example         postcss
 * \@sugar.disabled.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginFixClassesInterface extends __SInterface {
}
postcssSugarPluginFixClassesInterface.definition = {};
export { postcssSugarPluginFixClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`
      /**
        * @name          Disabled
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/disabled
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply the disabled style on any HTMLElement.
        * This make sure **no pointer events** stays active as well as displaying the **not-allowed cursor**.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass                 s-disabled              Apply the disabled styling on any HTMLElement
        * 
        * @example        html
        * <input type="text" class="s-input s-disabled" placeholder="I'm disabled" />
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    vars.push(`/**
            * @name          s-disabled
            * @namespace          sugar.css.disabled
            * @type               CssClass
            * @platform         css
            * @status           beta
            * 
            * This class allows you to apply the disabled styling to any HTMLElement.
            * 
            * @example        html
            * <div class="s-rhythm:vertical">
            *   <input type="text" class="s-input s-disabled" placeholder="I'm disabled" />
            *   <input type="text" class="s-input" disabled placeholder="I'm disabled" />
            * </div>
            * 
            * @since        2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
            .s-disabled {
                @sugar.disabled;
            }`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7O0FBQ3JELGdEQUFVLEdBQUcsRUFBRSxDQUFDO0FBSzNCLE9BQU8sRUFBRSxxQ0FBcUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU5RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F5QlQsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Y0FvQkEsQ0FBQyxDQUFDO0lBRVosT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9