import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __keysFirst from '@coffeekraken/sugar/shared/array/keysFirst';
/**
 * @name           classes
 * @namespace      node.mixins.gap
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the gap helper classes like s-gap, s-gap:row, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.gap.classes;
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
    const spacesKeys = __keysFirst(Object.keys(__STheme.config('space')), ['default']);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Gap
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/gap
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some gap attributes on any HTMLElement and with
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass                 s-gap              Apply the default gap to any HTMLElement
        * @cssClass                s-gap:row          Apply the default row gap to any HTMLElement
        * @cssClass                s-gap:column          Apply the default column gap to any HTMLElement
        ${spacesKeys.map(space => `
            * @cssClass                s-gap:${space}          Apply the ${space} gap to any HTMLElement
            * @cssClass                s-gap:row:${space}          Apply the ${space} row gap to any HTMLElement
            * @cssClass                s-gap:column:${space}          Apply the ${space} column gap to any HTMLElement
        `)}
        * 
        * @example        html          Simple grid
        * <div class="s-flex s-gap:40">
        *   <div class="s-badge s-color:accent">Hello</div>
        *   <div class="s-badge s-color:accent">Worl</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    spacesKeys.forEach(space => {
        vars.comment(() => `/**
                * @name          s-gap${space === 'default' ? '' : `:${space}`}
                * @namespace          sugar.css.gep
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows you to apply the gap "${space}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex s-gap${space === 'default' ? '' : `:${space}`}">
                *   <div class="s-badge s-color:accent">Hello</div>
                *   <div class="s-badge s-color:accent">Worl</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
                .s-gap${space === 'default' ? '' : `--${space}`}:not(.s-gap--column):not(.s-gap--row) {
                    gap: sugar.space(${space});
                }`);
        vars.comment(() => `/**
                * @name          s-gap:row${space === 'default' ? '' : `:${space}`}
                * @namespace          sugar.css.gep
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows you to apply the row gap "${space}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex s-gap:row${space === 'default' ? '' : `:${space}`}">
                *   <div class="s-badge s-color:accent">Hello</div>
                *   <div class="s-badge s-color:accent">Worl</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
                .s-gap--row.s-gap${space === 'default' ? '' : `--${space}`} {
                    row-gap: sugar.space(${space});
                }`);
        vars.comment(() => `/**
                * @name          s-gap:column${space === 'default' ? '' : `:${space}`}
                * @namespace          sugar.css.gep
                * @type               CssClass
                * @platform           css
                * @status               beta
                * 
                * This class allows you to apply the column gap "${space}" styling to any HTMLElement
                * 
                * @example        html
                * <div class="s-flex s-gap:column${space === 'default' ? '' : `:${space}`}">
                *   <div class="s-badge s-color:accent">Hello</div>
                *   <div class="s-badge s-color:accent">Worl</div>
                * </div>
                * 
                * @since      2.0.0
                * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */
            `).code(`
                .s-gap--column.s-gap${space === 'default' ? '' : `--${space}`} {
                    column-gap: sugar.space(${space});
                }`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sNENBQTRDLENBQUM7QUFFckU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLHFDQUFzQyxTQUFRLFlBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUscUNBQXFDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFOUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFDRixNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRW5GLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQW1CSixVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUM7K0NBQ2EsS0FBSyx1QkFBdUIsS0FBSzttREFDN0IsS0FBSyx1QkFBdUIsS0FBSztzREFDOUIsS0FBSyx1QkFBdUIsS0FBSztTQUM5RSxDQUFDOzs7Ozs7Ozs7OztLQVdMLENBQ0EsQ0FBQztJQUVGLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFFdkIsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzt3Q0FDc0IsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRTs7Ozs7OzREQU1sQixLQUFLOzs7NENBR3JCLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUU7Ozs7Ozs7O2FBUXJFLENBQ0osQ0FBQyxJQUFJLENBQUM7d0JBQ1MsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRTt1Q0FDeEIsS0FBSztrQkFDMUIsQ0FBQyxDQUFDO1FBRVosSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs0Q0FDMEIsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRTs7Ozs7O2dFQU1sQixLQUFLOzs7Z0RBR3JCLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUU7Ozs7Ozs7O2FBUXpFLENBQ0osQ0FBQyxJQUFJLENBQUM7bUNBQ29CLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7MkNBQy9CLEtBQUs7a0JBQzlCLENBQUMsQ0FBQztRQUVaLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7K0NBQzZCLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUU7Ozs7OzttRUFNbEIsS0FBSzs7O21EQUdyQixLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFOzs7Ozs7OzthQVE1RSxDQUNKLENBQUMsSUFBSSxDQUFDO3NDQUN1QixLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFOzhDQUMvQixLQUFLO2tCQUNqQyxDQUFDLENBQUM7SUFFaEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=