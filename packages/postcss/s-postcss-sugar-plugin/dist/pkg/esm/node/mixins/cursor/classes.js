import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixin.cursor
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the cusros helper classes like `.s-cursor:pointer` etc...
 *
 * @feature         Support these values (for now): none, all, auto and fill
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.cursor.classes
 *
 * @example        css
 * \@sugar.cursor.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginCursorClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginCursorClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const cursors = [
        'auto',
        'default',
        'none',
        'context-menu',
        'help',
        'pointer',
        'progress',
        'wait',
        'cell',
        'crosshair',
        'text',
        'vertical-text',
        'alias',
        'copy',
        'move',
        'no-drop',
        'not-allowed',
        'e-resize',
        'n-resize',
        'ne-resize',
        'nw-resize',
        's-resize',
        'se-resize',
        'sw-resize',
        'w-resize',
        'ew-resize',
        'ns-resize',
        'nesw-resize',
        'nwse-resize',
        'col-resize',
        'row-resize',
        'all-scroll',
        'zoom-in',
        'zoom-out',
        'grab',
        'grabbing',
    ];
    vars.comment(() => `
      /**
        * @name          Cursor
        * @namespace          sugar.style.cursor
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/cursor
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a specific cursor on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.cursor.classes; 
        * 
        ${cursors
        .map((cursor) => {
        return ` * @cssClass     s-cursor:${cursor}            Apply the ${cursor} cursor`;
    })
        .join('\n')}
        * 
        * @example         html
        * <div class="s-grid:5 s-gap:30 @tablet s-grid:3 @mobile s-grid:1">
        ${cursors
        .map((cursor) => {
        return ` *   <div class="s-cursor:${cursor} s-bg:main-surface s-p:30 s-text:center s-ratio:16-9" style="padding-block-start: 30%">
                <p class="s-typo:p:bold">${cursor}</p>
        *   </div>
            * `;
    })
        .join('\n')}
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    cursors.forEach((cursor) => {
        vars.comment(() => `/**
        * @name          s-cursor:${cursor}
        * @namespace          sugar.style.cursor
        * @type               CssClass
        * @platform             css
        * @status             beta
        * 
        * This class allows you to apply a "<yellow>${cursor}</yellow>" cursor style to any HTMLElement
        * 
        * @example        html
        * <div class="s-cursor:${cursor}">
        *   Hover me!
        * </div>
        * 
        * @since         2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `).code(`
        .s-cursor--${cursor} {
            cursor: ${cursor};
        }`);
    }, { type: 'CssClass' });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sd0NBQXlDLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxPQUFPLEdBQUc7UUFDWixNQUFNO1FBQ04sU0FBUztRQUNULE1BQU07UUFDTixjQUFjO1FBQ2QsTUFBTTtRQUNOLFNBQVM7UUFDVCxVQUFVO1FBQ1YsTUFBTTtRQUNOLE1BQU07UUFDTixXQUFXO1FBQ1gsTUFBTTtRQUNOLGVBQWU7UUFDZixPQUFPO1FBQ1AsTUFBTTtRQUNOLE1BQU07UUFDTixTQUFTO1FBQ1QsYUFBYTtRQUNiLFVBQVU7UUFDVixVQUFVO1FBQ1YsV0FBVztRQUNYLFdBQVc7UUFDWCxVQUFVO1FBQ1YsV0FBVztRQUNYLFdBQVc7UUFDWCxVQUFVO1FBQ1YsV0FBVztRQUNYLFdBQVc7UUFDWCxhQUFhO1FBQ2IsYUFBYTtRQUNiLFlBQVk7UUFDWixZQUFZO1FBQ1osWUFBWTtRQUNaLFNBQVM7UUFDVCxVQUFVO1FBQ1YsTUFBTTtRQUNOLFVBQVU7S0FDYixDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQW1CSixPQUFPO1NBQ0osR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDWixPQUFPLDZCQUE2QixNQUFNLHlCQUF5QixNQUFNLFNBQVMsQ0FBQztJQUN2RixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O1VBSWIsT0FBTztTQUNKLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ1osT0FBTyw2QkFBNkIsTUFBTTsyQ0FDZixNQUFNOztlQUVsQyxDQUFDO0lBQ0osQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O0tBTWxCLENBQ0EsQ0FBQztJQUVGLE9BQU8sQ0FBQyxPQUFPLENBQ1gsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUNQLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7b0NBQ2MsTUFBTTs7Ozs7O3NEQU1ZLE1BQU07OztpQ0FHM0IsTUFBTTs7Ozs7OztLQU9sQyxDQUNRLENBQUMsSUFBSSxDQUFDO3FCQUNFLE1BQU07c0JBQ0wsTUFBTTtVQUNsQixDQUFDLENBQUM7SUFDSixDQUFDLEVBQ0QsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFFRixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=