import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @as              @s.shrink.classes
 * @namespace      node.mixin.shrink
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all shrink helpers like s-shrink, s-shrink:1...10, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.shrink.classes
 *
 * @example        css
 * @s.shrink.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginGapClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginGapClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Grow
        * @namespace          sugar.style.helpers.shrink
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/shrink
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply some shrink attributes on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.shrink.classes;
        * 
        * @cssClass                 s-shrink             Apply the default shrink to any HTMLElement
        * ${Array.from(Array(10)).map((i) => `
            * @cssClass                s-shrink:${i}          Apply the ${i} shrink to any HTMLElement
        `)}
        * 
        * @example        html          Simple flex grid
        * <div class="s-flex">
        *   <div>I'm not shrinking</div>
        *   <div class="s-shrink">I'm shrinking</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(() => `/**
            * @name          s-shrink
            * @namespace          sugar.style.helpers.shrink
            * @type               CssClass
            * @platform           css
            * @status               stable
            * 
            * This class allows you to apply the shrink styling to any HTMLElement
            * 
            * @example        html
            * <div class="s-flex">
            *   <div>I'm not shrinking</div>
            *   <div class="s-shrink">I'm shrinking</div>
            * </div>
            * 
            * @since      2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */
        `).code(`
            .s-shrink {
                flex-shrink: 1;
            }`, { type: 'CssClass' });
    Array.from(Array(10)).forEach((i) => {
        vars.comment(() => `/**
                * @name          s-shrink${i}
                * @namespace          sugar.style.helpers.shrink
                * @type               CssClass
                * @platform           css
                * @status               stable
                * 
                * This class allows you to apply the shrink "${i}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex">
                *   <div>I'm not shrinking</div>
                *   <div class="s-shrink:${i}">I'm shrinking</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
                .s-shrink-${i} {
                    flex-shrink: ${i};
                }`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSxxQ0FBc0MsU0FBUSxZQUFZO0lBQzVELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLHFDQUFxQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTlELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQW9CRixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FDekIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDO2tEQUMrQixDQUFDLHVCQUF1QixDQUFDO1NBQ2xFLENBQ0E7Ozs7Ozs7Ozs7O0tBV0osQ0FDQSxDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBa0JMLENBQ0osQ0FBQyxJQUFJLENBQ0Y7OztjQUdNLEVBQ04sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ2hDLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7MkNBQ3lCLENBQUM7Ozs7OzsrREFNbUIsQ0FBQzs7Ozs7MkNBS3JCLENBQUM7Ozs7OzthQU0vQixDQUNKLENBQUMsSUFBSSxDQUNGOzRCQUNnQixDQUFDO21DQUNNLENBQUM7a0JBQ2xCLEVBQ04sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==