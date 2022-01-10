import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixins.when
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the "when" classes that allows you to apply some display
 * styles like "hide", etc... only when a certain state is reached.
 * Supported states are:
 * - mounted: Apply only when the state of a webcomponent for example has been reached
 * - active: When the element has the "active" class or the "active" attribute
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.when.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginActiveClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginActiveClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `/**
        * @name          s-when:mounted
        * @namespace          sugar.css.when
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement when it has reached the state "mounted".
        * 
        * @example        html
        * <s-range class="s-when:mounted" />
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `).code(`
        .s-when.s-when--mounted:not(.s-when--sibling):not(.s-when--ancestor):not(.s-when--parent):not([mounted]):not(.mounted) {
            display: none;
        }
        .s-when.s-when--mounted:not(.s-when--sibling):not(.s-when--ancestor):not(.s-when--parent)[mounted],
        .s-when.s-when--mounted:not(.s-when--sibling):not(.s-when--ancestor):not(.s-when--parent).mounted {
            display: block;
        }`);
    vars.comment(() => `/**
        * @name          s-when:sibling:mounted
        * @namespace          sugar.css.when
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement when his previous sibling has reached the state "mounted".
        * 
        * @example        html
        * <s-range name="myCoolRange" />
        * <div class="s-when:sibling:mounted">
        *       Display something when the previous webcomponent has been mounted
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `).code(`
        *:not([mounted]):not(.mounted) + .s-when.s-when--sibling.s-when--mounted {
            display: none;
        }
        *[mounted] + .s-when.s-when--sibling.s-when--mounted,
        *.mounted + .s-when.s-when--sibling.s-when--mounted {
            display: block;
        }`);
    vars.comment(() => `/**
        * @name          s-when:parent:mounted
        * @namespace          sugar.css.when
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement when his direct parent has reached the state "mounted".
        * 
        * @example        html
        * <s-range name="myCoolRange" />
        * <div class="s-when:parent:mounted">
        *       Display something when the previous webcomponent has been mounted
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `).code(`
        *:not([mounted]):not(.mounted) + .s-when.s-when--parent.s-when--mounted {
            display: none;
        }
        *[mounted] + .s-when.s-when--parent.s-when--mounted,
        *.mounted + .s-when.s-when--parent.s-when--mounted {
            display: block;
        }`);
    vars.comment(() => `/**
        * @name          s-when:ancestor:mounted
        * @namespace          sugar.css.when
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement when any ancestor has reached the state "mounted".
        * 
        * @example        html
        * <s-range name="myCoolRange" />
        * <div class="s-when:ancestor:mounted">
        *       Display something when the previous webcomponent has been mounted
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `).code(`
        *:not([mounted]):not(.mounted) + .s-when.s-when--ancestor.s-when--mounted {
            display: none;
        }
        *[mounted] + .s-when.s-when--ancestor.s-when--mounted,
        *.mounted + .s-when.s-when--ancestor.s-when--mounted {
            display: block;
        }`);
    vars.comment(() => `/**
        * @name          s-when:active
        * @namespace          sugar.css.when
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement when it has reached the state "active".
        * 
        * @example        html
        * <s-range class="s-when:active" />
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `).code(`
        .s-when.s-when--active:not(.s-when--sibling):not(.s-when--ancestor):not(.s-when--parent):not([active]):not(.active) {
            display: none;
        }
        .s-when.s-when--active:not(.s-when--sibling):not(.s-when--ancestor):not(.s-when--parent)[active],
        .s-when.s-when--active:not(.s-when--sibling):not(.s-when--ancestor):not(.s-when--parent).active {
            display: block;
        }`);
    vars.comment(() => `/**
        * @name          s-when:sibling:active
        * @namespace          sugar.css.when
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement when his previous sibling has reached the state "active".
        * 
        * @example        html
        * <s-range name="myCoolRange" />
        * <div class="s-when:sibling:active">
        *       Display something when the previous webcomponent has been active
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `).code(`
        *:not([active]):not(.active) + .s-when.s-when--sibling.s-when--active {
            display: none;
        }
        *[active] + .s-when.s-when--sibling.s-when--active,
        *.active + .s-when.s-when--sibling.s-when--active {
            display: block;
        }`);
    vars.comment(() => `/**
        * @name          s-when:parent:active
        * @namespace          sugar.css.when
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement when his direct parent has reached the state "active".
        * 
        * @example        html
        * <s-range name="myCoolRange" />
        * <div class="s-when:parent:active">
        *       Display something when the previous webcomponent has been active
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `).code(`
        *:not([active]):not(.active) + .s-when.s-when--parent.s-when--active {
            display: none;
        }
        *[active] + .s-when.s-when--parent.s-when--active,
        *.active + .s-when.s-when--parent.s-when--active {
            display: block;
        }`);
    vars.comment(() => `/**
        * @name          s-when:ancestor:active
        * @namespace          sugar.css.when
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to hide any HTMLElement when his direct ancestor has reached the state "active".
        * 
        * @example        html
        * <s-range name="myCoolRange" />
        * <div class="s-when:ancestor:active">
        *       Display something when the previous webcomponent has been active
        * </div>
        * 
        * @since            2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `).code(`
        *:not([active]):not(.active) + .s-when.s-when--ancestor.s-when--active {
            display: none;
        }
        *[active] + .s-when.s-when--ancestor.s-when--active,
        *.active + .s-when.s-when--ancestor.s-when--active {
            display: block;
        }`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZO0lBQy9ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLHdDQUF3QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWpFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7S0FlVCxDQUNBLENBQUMsSUFBSSxDQUFDOzs7Ozs7O1VBT0QsQ0FBQyxDQUFDO0lBRVIsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBa0JULENBQ0EsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7VUFPRCxDQUFDLENBQUM7SUFFUixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FrQlQsQ0FDQSxDQUFDLElBQUksQ0FBQzs7Ozs7OztVQU9ELENBQUMsQ0FBQztJQUVSLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWtCVCxDQUNBLENBQUMsSUFBSSxDQUFDOzs7Ozs7O1VBT0QsQ0FBQyxDQUFDO0lBRVIsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0tBZVQsQ0FDQSxDQUFDLElBQUksQ0FBQzs7Ozs7OztVQU9ELENBQUMsQ0FBQztJQUVSLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWtCVCxDQUNBLENBQUMsSUFBSSxDQUFDOzs7Ozs7O1VBT0QsQ0FBQyxDQUFDO0lBRVIsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBa0JULENBQ0EsQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7VUFPRCxDQUFDLENBQUM7SUFFUixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FrQlQsQ0FDQSxDQUFDLElBQUksQ0FBQzs7Ozs7OztVQU9ELENBQUMsQ0FBQztJQUVSLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==