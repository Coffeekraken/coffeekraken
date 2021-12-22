import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixins.until
 * @type           PostcssMixin
 * @platform      postcss
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
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginUntilClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `/**
        * @name          s-until:mounted
        * @namespace          sugar.css.until
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement until it has reached the state "mounted".
        * 
        * @example        html
        * <s-range class="s-until:mounted:hide" />
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `).code(`
        .s-until.s-until--mounted:not(.s-until--sibling)[mounted] {
            display: none;
        }`);
    vars.comment(() => `/**
        * @name          s-until:sibling:mounted
        * @namespace          sugar.css.until
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement until his previous sibling has reached the state "mounted".
        * 
        * @example        html
        * <s-range name="myCoolRange" />
        * <div class="s-until:sibling:mounted">
        *       Display something until the previous webcomponent has been mounted
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
       `).code(`
        *[mounted] + .s-until.s-until--sibling.s-until--mounted {
            display: none;
        }`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLHVDQUF3QyxTQUFRLFlBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7OztLQWVULENBQ0EsQ0FBQyxJQUFJLENBQUM7OztVQUdELENBQUMsQ0FBQztJQUVSLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQWtCTixDQUNILENBQUMsSUFBSSxDQUFDOzs7VUFHRCxDQUFDLENBQUM7SUFFUixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=