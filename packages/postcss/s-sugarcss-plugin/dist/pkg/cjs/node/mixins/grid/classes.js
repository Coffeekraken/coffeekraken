"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name           classes
 * @as              @s.grid.classes
 * @namespace      node.mixin.grid
 * @type           PostcssMixin
 * @platform      postcss
 * @status        alpha
 *
 * This mixin generate all the grid helper classes like s-grid:12, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.grid.classes
 *
 * @example        css
 * @s.grid.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginGridClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginGridClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const layoutConfig = s_theme_1.default.get('layout');
    const grids = layoutConfig.grid;
    Object.keys(grids).forEach((id) => {
        const grid = grids[id];
        vars.comment(() => `
        /**
         * @name       s-grid:${id}
         * @namespace          sugar.style.helpers.grid
         * @type          CssClass
         * @platform      css
         * @status      alpha
         * 
         * This class represent a grid of "<yellow>${id}</yellow> columns"
         * 
         * @example     html
         * <div class="s-container s-grid:${id}">
         *    ${Array(12)
            .map((idx) => {
            return `<div>I'm the grid item ${idx}</div>`;
        })
            .join('\n')}
        * </div>
        * 
        * @since     2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
      `).code(`
        .s-grid-${id} {
          display: grid;
          grid-template-columns: repeat(${grid}, minmax(0, 1fr));
        }
      `, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLG1DQUFvQyxTQUFRLHFCQUFZO0lBQzFELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSStDLHdEQUFTO0FBRXpELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sWUFBWSxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTVDLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7SUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtRQUM5QixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Z0NBRWMsRUFBRTs7Ozs7O3FEQU1tQixFQUFFOzs7NENBR1gsRUFBRTtnQkFDOUIsS0FBSyxDQUFDLEVBQUUsQ0FBQzthQUNYLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1QsT0FBTywwQkFBMEIsR0FBRyxRQUFRLENBQUM7UUFDakQsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O09BTWpCLENBQ0UsQ0FBQyxJQUFJLENBQ0Y7a0JBQ00sRUFBRTs7MENBRXNCLElBQUk7O09BRXZDLEVBQ0ssRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUExREQsNEJBMERDIn0=