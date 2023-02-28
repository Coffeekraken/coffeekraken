"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const array_1 = require("@coffeekraken/sugar/array");
/**
 * @name           classes
 * @namespace      node.mixin.gap
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the gap helper classes like s-gap, s-gap:row, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.gap.classes
 *
 * @example        css
 * \@sugar.gap.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginGapClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginGapClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const spacesKeys = (0, array_1.__keysFirst)(Object.keys(s_theme_1.default.get('space')), [
        'default',
    ]);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Gap
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/gap
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some gap attributes on any HTMLElement and with
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.gap.classes;
        * 
        * @cssClass                 s-gap              Apply the default gap to any HTMLElement
        * @cssClass                s-gap:row          Apply the default row gap to any HTMLElement
        * @cssClass                s-gap:column          Apply the default column gap to any HTMLElement
        ${spacesKeys.map((space) => `
            * @cssClass                s-gap:${space}          Apply the ${space} gap to any HTMLElement
            * @cssClass                s-gap:row:${space}          Apply the ${space} row gap to any HTMLElement
            * @cssClass                s-gap:column:${space}          Apply the ${space} column gap to any HTMLElement
        `)}
        * 
        * @example        html          Simple flex grid
        * <div class="s-flex s-gap:40">
        *   <div class="s-ratio:16-9 s-flex-item:grow s-radius s-p:30 s-bg:main-surface">1</div>
        *   <div class="s-ratio:16-9 s-flex-item:grow s-radius s-p:30 s-bg:main-surface">2</div>
        *   <div class="s-ratio:16-9 s-flex-item:grow s-radius s-p:30 s-bg:main-surface">3</div>
        * </div>
        * 
        * @example        html          Simple grid
        * <div class="s-grid:3 s-gap:40">
        *   <div class="s-ratio:16-9 s-bg:main-surface s-radius s-p:30">1</div>
        *   <div class="s-ratio:16-9 s-bg:main-surface s-radius s-p:30">2</div>
        *   <div class="s-ratio:16-9 s-bg:main-surface s-radius s-p:30">3</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    spacesKeys.forEach((space) => {
        vars.comment(() => `/**
                * @name          s-gap${space === 'default' ? '' : `:${space}`}
                * @namespace          sugar.style.gep
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
                    gap: sugar.margin(${space});
                }`, { type: 'CssClass' });
        vars.comment(() => `/**
                * @name          s-gap:row${space === 'default' ? '' : `:${space}`}
                * @namespace          sugar.style.gep
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
                    row-gap: sugar.margin(${space});
                }`, { type: 'CssClass' });
        vars.comment(() => `/**
                * @name          s-gap:column${space === 'default' ? '' : `:${space}`}
                * @namespace          sugar.style.gep
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
                    column-gap: sugar.margin(${space});
                }`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MscURBQXdEO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCxNQUFNLHFDQUFzQyxTQUFRLHFCQUFZO0lBQzVELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSWlELDBEQUFTO0FBRTNELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFDRixNQUFNLFVBQVUsR0FBRyxJQUFBLG1CQUFXLEVBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFO1FBQy9ELFNBQVM7S0FDWixDQUFDLENBQUM7SUFFSCxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFzQkosVUFBVSxDQUFDLEdBQUcsQ0FDWixDQUFDLEtBQUssRUFBRSxFQUFFLENBQUM7K0NBQ3dCLEtBQUssdUJBQXVCLEtBQUs7bURBQzdCLEtBQUssdUJBQXVCLEtBQUs7c0RBQzlCLEtBQUssdUJBQXVCLEtBQUs7U0FDOUUsQ0FDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW1CSixDQUNBLENBQUM7SUFFRixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzt3Q0FDc0IsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFBRTs7Ozs7OzREQU1sQixLQUFLOzs7NENBSTdDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQ3hDOzs7Ozs7OzthQVFILENBQ0osQ0FBQyxJQUFJLENBQ0Y7d0JBRVEsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFDekM7d0NBQ3dCLEtBQUs7a0JBQzNCLEVBQ04sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzRDQUVFLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQ3hDOzs7Ozs7Z0VBTWdELEtBQUs7OztnREFJakQsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFDeEM7Ozs7Ozs7O2FBUUgsQ0FDSixDQUFDLElBQUksQ0FDRjttQ0FDdUIsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRTs0Q0FDOUIsS0FBSztrQkFDL0IsRUFDTixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7K0NBRUUsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFDeEM7Ozs7OzttRUFNbUQsS0FBSzs7O21EQUlwRCxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN4Qzs7Ozs7Ozs7YUFRSCxDQUNKLENBQUMsSUFBSSxDQUNGO3NDQUMwQixLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFOytDQUM5QixLQUFLO2tCQUNsQyxFQUNOLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBMUtELDRCQTBLQyJ9