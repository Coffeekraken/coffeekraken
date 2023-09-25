import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @as          @sugar.order.classes
 * @namespace      node.mixin.order
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the order helper classes like s-order:1, s-order:2, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.order.classes
 *
 * @example        css
 * \@sugar.order.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginOrderClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginOrderClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const count = __STheme.get('helpers.order.count');
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Order
        * @namespace          sugar.style.helpers.order
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/order
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some order attributes on any HTMLElement.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.order.classes;
        * 
        ${Array.from(Array(count))
        .map((v, i) => `
            * @cssClass             s-order-${i}        Apply the order ${i}
        `)
        .join('\n')}
        * 
        * @example        html          Simple order
        * <div class="s-flex s-gap:40">
        *   <div class="s-order:3 s-p:30 s-ratio:16-9 s-grow s-bg:main-surface s-radius">1</div>
        *   <div class="s-order:1 s-p:30 s-ratio:16-9 s-grow s-bg:main-surface s-radius">2</div>
        *   <div class="s-order:2 s-p:30 s-ratio:16-9 s-grow s-bg:main-surface s-radius">3</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    Array.from(Array(count)).forEach((v, i) => {
        vars.comment(() => `/**
                * @name          s-order:${i}
                * @namespace          sugar.style.helpers.order
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
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
            .s-order-${i} {
                order: ${i};
            }`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWhFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ2xELE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQW1CSixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNyQixHQUFHLENBQ0EsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQzs4Q0FDb0IsQ0FBQywyQkFBMkIsQ0FBQztTQUNsRSxDQUNJO1NBQ0EsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O0tBWWxCLENBQ0EsQ0FBQztJQUVGLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7MkNBQ3lCLENBQUM7Ozs7Ozs2REFNaUIsQ0FBQzs7OzswQ0FJcEIsQ0FBQzs7Ozs7OzthQU85QixDQUNKLENBQUMsSUFBSSxDQUNGO3VCQUNXLENBQUM7eUJBQ0MsQ0FBQztjQUNaLEVBQ0YsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==