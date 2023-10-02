import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           classes
 * @as              @s.cursor.classes
 * @namespace      node.mixin.cursor
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the cusros helper classes like `.s-cursor:pointer` etc...
 *
 * @feature         Support these values (for now): none, all, auto and fill
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.cursor.classes
 *
 * @example        css
 * \@s.cursor.classes;
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
        * @namespace          sugar.style.helpers.cursor
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/cursor
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply a specific cursor on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@s.cursor.classes; 
        * 
        ${cursors
        .map((cursor) => {
        return ` * @cssClass     s-cursor:${cursor}            Apply the ${cursor} cursor`;
    })
        .join('\n')}
        * 
        * @example         html
        * <div class="s-flex:wrap s-gap:20">
        ${cursors
        .map((cursor) => {
        return ` *   <div class="s-cursor:${cursor} s-flex:center s-width:20 s-radius s-ratio:16-9">
                    ${cursor}
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
        * @namespace          sugar.style.helpers.cursor
        * @type               CssClass
        * @platform             css
        * @status             stable
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
        .s-cursor-${cursor} {
            cursor: ${cursor};
        }`);
    }, { type: 'CssClass' });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLHdDQUF5QyxTQUFRLFlBQVk7SUFDL0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sT0FBTyxHQUFHO1FBQ1osTUFBTTtRQUNOLFNBQVM7UUFDVCxNQUFNO1FBQ04sY0FBYztRQUNkLE1BQU07UUFDTixTQUFTO1FBQ1QsVUFBVTtRQUNWLE1BQU07UUFDTixNQUFNO1FBQ04sV0FBVztRQUNYLE1BQU07UUFDTixlQUFlO1FBQ2YsT0FBTztRQUNQLE1BQU07UUFDTixNQUFNO1FBQ04sU0FBUztRQUNULGFBQWE7UUFDYixVQUFVO1FBQ1YsVUFBVTtRQUNWLFdBQVc7UUFDWCxXQUFXO1FBQ1gsVUFBVTtRQUNWLFdBQVc7UUFDWCxXQUFXO1FBQ1gsVUFBVTtRQUNWLFdBQVc7UUFDWCxXQUFXO1FBQ1gsYUFBYTtRQUNiLGFBQWE7UUFDYixZQUFZO1FBQ1osWUFBWTtRQUNaLFlBQVk7UUFDWixTQUFTO1FBQ1QsVUFBVTtRQUNWLE1BQU07UUFDTixVQUFVO0tBQ2IsQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFtQkosT0FBTztTQUNKLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ1osT0FBTyw2QkFBNkIsTUFBTSx5QkFBeUIsTUFBTSxTQUFTLENBQUM7SUFDdkYsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztVQUliLE9BQU87U0FDSixHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUNaLE9BQU8sNkJBQTZCLE1BQU07c0JBQ3BDLE1BQU07O2VBRWIsQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztLQU1sQixDQUNBLENBQUM7SUFFRixPQUFPLENBQUMsT0FBTyxDQUNYLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDUCxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO29DQUNjLE1BQU07Ozs7OztzREFNWSxNQUFNOzs7aUNBRzNCLE1BQU07Ozs7Ozs7S0FPbEMsQ0FDUSxDQUFDLElBQUksQ0FBQztvQkFDQyxNQUFNO3NCQUNKLE1BQU07VUFDbEIsQ0FBQyxDQUFDO0lBQ0osQ0FBQyxFQUNELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9