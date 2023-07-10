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
 * @as              @sugar.gap.classes
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
        * @namespace          sugar.style.helpers.gap
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
                * @namespace          sugar.style.helpers.gap
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
                * @namespace          sugar.style.helpers.gap
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
                * @namespace          sugar.style.helpers.gap
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MscURBQXdEO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSxxQ0FBc0MsU0FBUSxxQkFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlpRCwwREFBUztBQUUzRCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBQ0YsTUFBTSxVQUFVLEdBQUcsSUFBQSxtQkFBVyxFQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRTtRQUMvRCxTQUFTO0tBQ1osQ0FBQyxDQUFDO0lBRUgsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBc0JKLFVBQVUsQ0FBQyxHQUFHLENBQ1osQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDOytDQUN3QixLQUFLLHVCQUF1QixLQUFLO21EQUM3QixLQUFLLHVCQUF1QixLQUFLO3NEQUM5QixLQUFLLHVCQUF1QixLQUFLO1NBQzlFLENBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FtQkosQ0FDQSxDQUFDO0lBRUYsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ3pCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7d0NBQ3NCLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUU7Ozs7Ozs0REFNbEIsS0FBSzs7OzRDQUk3QyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN4Qzs7Ozs7Ozs7YUFRSCxDQUNKLENBQUMsSUFBSSxDQUNGO3dCQUVRLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQ3pDO3dDQUN3QixLQUFLO2tCQUMzQixFQUNOLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs0Q0FFRSxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN4Qzs7Ozs7O2dFQU1nRCxLQUFLOzs7Z0RBSWpELEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQ3hDOzs7Ozs7OzthQVFILENBQ0osQ0FBQyxJQUFJLENBQ0Y7bUNBQ3VCLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEVBQUU7NENBQzlCLEtBQUs7a0JBQy9CLEVBQ04sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7UUFFRixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOytDQUVFLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQ3hDOzs7Ozs7bUVBTW1ELEtBQUs7OzttREFJcEQsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFDeEM7Ozs7Ozs7O2FBUUgsQ0FDSixDQUFDLElBQUksQ0FDRjtzQ0FDMEIsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRTsrQ0FDOUIsS0FBSztrQkFDbEMsRUFDTixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTFLRCw0QkEwS0MifQ==