"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const faker_1 = __importDefault(require("faker"));
/**
 * @name           classes
 * @namespace      node.mixin.truncate
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the truncate classes like s-truncate, s-truncate:2, etc...
 * The number of truncate classes generated is defined in the theme.helpers.truncate.count settings
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * @sugar.truncate.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginRatioClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            count: {
                type: 'Number',
                default: s_theme_1.default.get('helpers.truncate.count'),
            },
        };
    }
}
exports.interface = postcssSugarPluginRatioClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ count: 10 }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Truncate
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/truncate
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to **truncate texts to a number of lines** on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.truncate.classes;
        * 
        ${[...Array(finalParams.count).keys()].map((i) => {
        return ` * @cssClass        s-truncate:${i + 1}         Truncate the container to ${i + 1} line(s)`;
    })}
        *
        ${[...Array(finalParams.count).keys()]
        .map((i) => {
        return ` * @example          html        ${i + 1} ${i <= 1 ? 'line' : 'lines'}
            *   <p class="s-typo:p s-truncate:${i + 1}">${faker_1.default.lorem
            .lines(finalParams.count + 5)
            .split('\n')
            .join('<br />')}</p>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    [...Array(finalParams.count).keys()].forEach((i) => {
        vars.comment(() => `/**
  * @name          s-truncate:${i}
  * @namespace          sugar.style.truncate
  * @type               CssClass
  * @platform             css
  * @status             beta
  * 
  * This class allows you to apply a "<yellow>${i + 1}</yellow>" line(s) truncate style to any HTMLElement
  * 
  * @example        html
  * <p class="s-typo:p s-truncate:${i}">${faker_1.default.lorem
            .lines(finalParams.count + 5)
            .split('\n')
            .join('<br />')}</p>
  */
 `).code(`
.s-truncate--${i + 1} {
    @sugar.truncate(${i + 1});
}`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sdUNBQXdDLFNBQVEscUJBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7YUFDbEQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTW1ELDREQUFTO0FBRTdELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQW1CSixDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzdDLE9BQU8sa0NBQ0gsQ0FBQyxHQUFHLENBQ1Isc0NBQXNDLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztJQUMxRCxDQUFDLENBQUM7O1VBRUEsQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDakMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDUCxPQUFPLG9DQUFvQyxDQUFDLEdBQUcsQ0FBQyxJQUM1QyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE9BQ3RCO2dEQUNnQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLGVBQU8sQ0FBQyxLQUFLO2FBQ2xELEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUM1QixLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQztlQUNwQixDQUFDO0lBQ0osQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7S0FLbEIsQ0FDQSxDQUFDO0lBRUYsQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUMvQyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO2dDQUNjLENBQUM7Ozs7OztnREFPM0IsQ0FBQyxHQUFHLENBQ1I7OztvQ0FHa0MsQ0FBQyxLQUFLLGVBQU8sQ0FBQyxLQUFLO2FBQ3RDLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUM1QixLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7RUFFN0IsQ0FDTyxDQUFDLElBQUksQ0FDRjtlQUNHLENBQUMsR0FBRyxDQUFDO3NCQUNFLENBQUMsR0FBRyxDQUFDO0VBQ3pCLEVBQ1UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUE3RkQsNEJBNkZDIn0=