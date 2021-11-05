import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixins.until
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the "until" classes that allows you to apply some display
 * styles like "hide", etc... only until a certain state is reached.
 * Supported states are:
 * - mounted: Apply only until the state of a webcomponent for example has been reached
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.until.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginUntilClassesInterface extends __SInterface {
}
postcssSugarPluginUntilClassesInterface.definition = {};
export { postcssSugarPluginUntilClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`/**
        * @name          s-until:mounted:hide
        * @namespace          sugar.css.until
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement until it has reached the state "mounted".
        * 
        * @example        html
        * <s-range class="s-until\:mounted\:hide" />
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
        .s-until.s-until--mounted.s-until--hide:not(.s-until--sibling):not([mounted]) {
            display: none;
        }`);
    vars.push(`/**
        * @name          s-until:sibling:mounted:hide
        * @namespace          sugar.css.until
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement until his previous sibling has reached the state "mounted".
        * 
        * @example        html
        * <s-range name="myCoolRange" />
        * <div class="s-until\:sibling\:mounted\:hide">
        *       Display something until the previous webcomponent has been mounted
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
        *:not([mounted]) + .s-until.s-until--sibling.s-until--mounted.s-until--hide {
            display: none;
        }`);
    vars.push(`/**
        * @name          s-until:mounted
        * @namespace          sugar.css.until
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to show any HTMLElement until it has reached the state "mounted".
        * 
        * @example        html
        * <s-range class="s-until\:mounted" />
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
        .s-until.s-until--mounted.s-until--show:not(.s-until--sibling):not(.s-until--hide)[mounted]) {
            display: none;
        }`);
    vars.push(`/**
        * @name          s-until:sibling:mounted
        * @namespace          sugar.css.until
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to show any HTMLElement until his previous sibling has reached the state "mounted".
        * 
        * @example        html
        * <s-range name="myCoolRange" />
        * <div class="s-until\:sibling\:mounted">
        *       Display something until the previous webcomponent has been mounted
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
        *[mounted] + .s-until.s-until--sibling.s-until--mounted:not(.s-until--hide) {
            display: none;
        }`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLHVDQUF3QyxTQUFRLFlBQVk7O0FBQ3ZELGtEQUFVLEdBQUcsRUFBRSxDQUFDO0FBSzNCLE9BQU8sRUFBRSx1Q0FBdUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVoRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBaUJKLENBQUMsQ0FBQztJQUVSLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBb0JKLENBQUMsQ0FBQztJQUVSLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBaUJKLENBQUMsQ0FBQztJQUVSLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBb0JKLENBQUMsQ0FBQztJQUVSLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==