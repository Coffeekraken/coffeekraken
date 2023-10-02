"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
class postcssSugarPluginCursorClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginCursorClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSx3Q0FBeUMsU0FBUSxxQkFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlvRCw2REFBUztBQUU5RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixNQUFNLE9BQU8sR0FBRztRQUNaLE1BQU07UUFDTixTQUFTO1FBQ1QsTUFBTTtRQUNOLGNBQWM7UUFDZCxNQUFNO1FBQ04sU0FBUztRQUNULFVBQVU7UUFDVixNQUFNO1FBQ04sTUFBTTtRQUNOLFdBQVc7UUFDWCxNQUFNO1FBQ04sZUFBZTtRQUNmLE9BQU87UUFDUCxNQUFNO1FBQ04sTUFBTTtRQUNOLFNBQVM7UUFDVCxhQUFhO1FBQ2IsVUFBVTtRQUNWLFVBQVU7UUFDVixXQUFXO1FBQ1gsV0FBVztRQUNYLFVBQVU7UUFDVixXQUFXO1FBQ1gsV0FBVztRQUNYLFVBQVU7UUFDVixXQUFXO1FBQ1gsV0FBVztRQUNYLGFBQWE7UUFDYixhQUFhO1FBQ2IsWUFBWTtRQUNaLFlBQVk7UUFDWixZQUFZO1FBQ1osU0FBUztRQUNULFVBQVU7UUFDVixNQUFNO1FBQ04sVUFBVTtLQUNiLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBbUJKLE9BQU87U0FDSixHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUNaLE9BQU8sNkJBQTZCLE1BQU0seUJBQXlCLE1BQU0sU0FBUyxDQUFDO0lBQ3ZGLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7VUFJYixPQUFPO1NBQ0osR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDWixPQUFPLDZCQUE2QixNQUFNO3NCQUNwQyxNQUFNOztlQUViLENBQUM7SUFDSixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7S0FNbEIsQ0FDQSxDQUFDO0lBRUYsT0FBTyxDQUFDLE9BQU8sQ0FDWCxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ1AsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQztvQ0FDYyxNQUFNOzs7Ozs7c0RBTVksTUFBTTs7O2lDQUczQixNQUFNOzs7Ozs7O0tBT2xDLENBQ1EsQ0FBQyxJQUFJLENBQUM7b0JBQ0MsTUFBTTtzQkFDSixNQUFNO1VBQ2xCLENBQUMsQ0FBQztJQUNKLENBQUMsRUFDRCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFsSUQsNEJBa0lDIn0=