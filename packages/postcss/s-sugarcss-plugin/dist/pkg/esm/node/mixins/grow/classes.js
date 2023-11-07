import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @as              @s.grow.classes
 * @namespace      node.mixin.grow
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all grow helpers like s-grow, s-grow:1...10, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.grow.classes
 *
 * @example        css
 * @s.grow.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginGapClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginGapClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Grow
        * @namespace          sugar.style.helpers.grow
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/grow
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply some grow attributes on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.grow.classes;
        * 
        * @cssClass                 s-grow             Apply the default grow to any HTMLElement
        * ${Array.from(Array(10)).map((i) => `
            * @cssClass                s-grow:${i}          Apply the ${i} grow to any HTMLElement
        `)}
        * 
        * @example        html          Simple flex grid
        * <div class="s-flex">
        *   <div>I'm not growing</div>
        *   <div class="s-grow">I'm growing</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `/**
            * @name          s-grow
            * @namespace          sugar.style.helpers.grow
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows you to apply the grow styling to any HTMLElement
            * 
            * @example        html
            * <div class="s-flex">
            *   <div>I'm not growing</div>
            *   <div class="s-grow">I'm growing</div>
            * </div>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            .s-grow {
                flex-grow: 1;
            }`, { type: 'CssClass' });
    Array.from(Array(10)).forEach((i) => {
        vars.comment(() => `/**
                * @name          s-grow${i}
                * @namespace          sugar.style.helpers.grow
                * @type               CssClass
                * @platform           css
                * @status               stable
                * 
                * This class allows you to apply the grow "${i}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex">
                *   <div>I'm not growing</div>
                *   <div class="s-grow:${i}">I'm growing</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
                .s-grow-${i} {
                    flex-grow: ${i};
                }`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSxrQ0FBbUMsU0FBUSxZQUFZO0lBQ3pELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLGtDQUFrQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTNELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQW9CRixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FDekIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO2dEQUM2QixDQUFDLHVCQUF1QixDQUFDO1NBQ2hFLENBQ0E7Ozs7Ozs7Ozs7O0tBV0osQ0FDQSxDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBa0JMLENBQ0osQ0FBQyxJQUFJLENBQ0Y7OztjQUdNLEVBQ04sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7eUNBQ3VCLENBQUM7Ozs7Ozs2REFNbUIsQ0FBQzs7Ozs7eUNBS3JCLENBQUM7Ozs7OzthQU03QixDQUNKLENBQUMsSUFBSSxDQUNGOzBCQUNjLENBQUM7aUNBQ00sQ0FBQztrQkFDaEIsRUFDTixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9