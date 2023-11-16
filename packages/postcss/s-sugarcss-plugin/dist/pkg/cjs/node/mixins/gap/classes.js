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
 * @as              @s.gap.classes
 * @namespace      node.mixin.gap
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the gap helper classes like s-gap, s-gap:row, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.gap.classes
 *
 * @example        css
 * @s.gap.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginGapClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginGapClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const spacesKeys = (0, array_1.__keysFirst)(Object.keys(s_theme_1.default.current.get('space')), [
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
        * @status       stable
        * 
        * These classes allows you to apply some gap attributes on any HTMLElement and with
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.gap.classes;
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
        *   <div class="s-ratio:16-9 s-grow s-radius s-p:30 s-bc:main">1</div>
        *   <div class="s-ratio:16-9 s-grow s-radius s-p:30 s-bc:main">2</div>
        *   <div class="s-ratio:16-9 s-grow s-radius s-p:30 s-bc:main">3</div>
        * </div>
        * 
        * @example        html          Simple grid
        * <div class="s-grid:3 s-gap:40">
        *   <div class="s-ratio:16-9 s-bc:main s-radius s-p:30">1</div>
        *   <div class="s-ratio:16-9 s-bc:main s-radius s-p:30">2</div>
        *   <div class="s-ratio:16-9 s-bc:main s-radius s-p:30">3</div>
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
                * @status               stable
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
                .s-gap${space === 'default' ? '' : `-${space}`}:not(.s-gap-column):not(.s-gap-row) {
                    gap: s.margin(${space});
                }`, { type: 'CssClass' });
        vars.comment(() => `/**
                * @name          s-gap:row${space === 'default' ? '' : `:${space}`}
                * @namespace          sugar.style.helpers.gap
                * @type               CssClass
                * @platform           css
                * @status               stable
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
                .s-gap-row.s-gap${space === 'default' ? '' : `-${space}`} {
                    row-gap: s.margin(${space});
                }`, { type: 'CssClass' });
        vars.comment(() => `/**
                * @name          s-gap:column${space === 'default' ? '' : `:${space}`}
                * @namespace          sugar.style.helpers.gap
                * @type               CssClass
                * @platform           css
                * @status               stable
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
                .s-gap-column.s-gap${space === 'default' ? '' : `-${space}`} {
                    column-gap: s.margin(${space});
                }`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MscURBQXdEO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSxrQ0FBbUMsU0FBUSxxQkFBWTtJQUN6RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUk4Qyx1REFBUztBQUV4RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBQ0YsTUFBTSxVQUFVLEdBQUcsSUFBQSxtQkFBVyxFQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUU7UUFDdkUsU0FBUztLQUNaLENBQUMsQ0FBQztJQUVILE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXNCSixVQUFVLENBQUMsR0FBRyxDQUNaLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQzsrQ0FDd0IsS0FBSyx1QkFBdUIsS0FBSzttREFDN0IsS0FBSyx1QkFBdUIsS0FBSztzREFDOUIsS0FBSyx1QkFBdUIsS0FBSztTQUM5RSxDQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBbUJKLENBQ0EsQ0FBQztJQUVGLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUN6QixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO3dDQUNzQixLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFOzs7Ozs7NERBTWxCLEtBQUs7Ozs0Q0FJN0MsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFDeEM7Ozs7Ozs7O2FBUUgsQ0FDSixDQUFDLElBQUksQ0FDRjt3QkFFUSxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN4QztvQ0FDb0IsS0FBSztrQkFDdkIsRUFDTixFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7NENBRUUsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFDeEM7Ozs7OztnRUFNZ0QsS0FBSzs7O2dEQUlqRCxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN4Qzs7Ozs7Ozs7YUFRSCxDQUNKLENBQUMsSUFBSSxDQUNGO2tDQUNzQixLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUFFO3dDQUNoQyxLQUFLO2tCQUMzQixFQUNOLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzsrQ0FFRSxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN4Qzs7Ozs7O21FQU1tRCxLQUFLOzs7bURBSXBELEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQ3hDOzs7Ozs7OzthQVFILENBQ0osQ0FBQyxJQUFJLENBQ0Y7cUNBQ3lCLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQUU7MkNBQ2hDLEtBQUs7a0JBQzlCLEVBQ04sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUExS0QsNEJBMEtDIn0=