import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @namespace      node.mixins.order
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the order helper classes like s-order:1, s-order:2, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.order.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginOrderClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginOrderClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const count = __STheme.config('helpers.order.count');
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Order
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/order
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some order attributes on any HTMLElement.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${Array.from(Array(count)).map((v, i) => `
            * @cssClass             s-order-${i}        Apply the order ${i}
        `).join('\n')}
        * 
        * @example        html          Simple order
        * <div class="s-flex">
        *   <div class="s-order:1 s-p:20 s-bg:accent s-radius">World</div>
        *   <div class="s-p:20 s-bg:main s-radius">World</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    Array.from(Array(count)).forEach((v, i) => {
        vars.comment(() => `/**
                * @name          s-order:${i}
                * @namespace          sugar.css.order
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows you to apply the order ${i} styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex">
                *   <div class="s-order:${i} s-p:20 s-bg:accent s-radius">World</div>
                *   <div class="s-p:20 s-bg:main s-radius">World</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                */
            `).code(`
            .s-order--${i} {
                order: ${i};
            }`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLHVDQUF3QyxTQUFRLFlBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDckQsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O1VBZ0JKLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFFLENBQUM7OENBQ0YsQ0FBQywyQkFBMkIsQ0FBQztTQUNsRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7S0FXaEIsQ0FDQSxDQUFDO0lBRUYsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUU7UUFFckMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzsyQ0FDeUIsQ0FBQzs7Ozs7OzZEQU1pQixDQUFDOzs7OzBDQUlwQixDQUFDOzs7Ozs7O2FBTzlCLENBQ0osQ0FBQyxJQUFJLENBQUM7d0JBQ1MsQ0FBQzt5QkFDQSxDQUFDO2NBQ1osQ0FBQyxDQUFDO0lBRVosQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=