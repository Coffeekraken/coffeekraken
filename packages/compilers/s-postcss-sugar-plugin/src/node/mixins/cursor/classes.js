import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @namespace      node.mixins.cursor
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the cusros helper classes like `.s-cursor:pointer` etc...
 *
 * @feature         Support these values (for now): none, all, auto and fill
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
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
    const cursors = ['auto', 'default', 'none', 'context-menu', 'help', 'pointer', 'progress', 'wait', 'cell', 'crosshair', 'text', 'vertical-text', 'alias', 'copy', 'move', 'no-drop', 'not-allowed', 'e-resize', 'n-resize', 'ne-resize', 'nw-resize', 's-resize', 'se-resize', 'sw-resize', 'w-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'col-resize', 'row-resize', 'all-scroll', 'zoom-in', 'zoom-out', 'grab', 'grabbing'];
    vars.comment(() => `
      /**
        * @name          Cursor
        * @namespace          sugar.css.cursor
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/cursor
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a specific cursor on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${cursors
        .map((cursor) => {
        return ` * @cssClass     s-cursor:${cursor}            Apply the ${cursor} cursor`;
    })
        .join('\n')}
        * 
        * @example         html
        * <div class="s-grid:5">
        ${cursors
        .map((cursor) => {
        return ` *   <div class="s-cursor:${cursor} s-p:30 s-text:center s-ratio:16-9" style="padding-block-start: 30%">
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
    cursors.forEach(cursor => {
        vars.comment(() => `/**
        * @name          s-cursor:${cursor}
        * @namespace          sugar.css.cursor
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
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUVILE1BQU0sd0NBQXlDLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxPQUFPLEdBQUcsQ0FBQyxNQUFNLEVBQUMsU0FBUyxFQUFDLE1BQU0sRUFBQyxjQUFjLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLGVBQWUsRUFBQyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxTQUFTLEVBQUMsYUFBYSxFQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsV0FBVyxFQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUMsV0FBVyxFQUFDLFdBQVcsRUFBQyxVQUFVLEVBQUMsV0FBVyxFQUFDLFdBQVcsRUFBQyxhQUFhLEVBQUMsYUFBYSxFQUFDLFlBQVksRUFBQyxZQUFZLEVBQUMsWUFBWSxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLFVBQVUsQ0FBQyxDQUFDO0lBRWxaLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7VUFnQkosT0FBTztTQUNKLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ1osT0FBTyw2QkFBNkIsTUFBTSx5QkFBeUIsTUFBTSxTQUFTLENBQUM7SUFDdkYsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztVQUliLE9BQU87U0FDSixHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUNaLE9BQU8sNkJBQTZCLE1BQU07MkNBQ2YsTUFBTTs7ZUFFbEMsQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztLQU1sQixDQUNBLENBQUM7SUFFRixPQUFPLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBRXJCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7b0NBQ2tCLE1BQU07Ozs7OztzREFNWSxNQUFNOzs7aUNBRzNCLE1BQU07Ozs7Ozs7S0FPbEMsQ0FDSSxDQUFDLElBQUksQ0FBQztxQkFDTSxNQUFNO3NCQUNMLE1BQU07VUFDbEIsQ0FBQyxDQUFDO0lBRVIsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=