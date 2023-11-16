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
 * @as              @s.truncate.classes
 * @namespace      node.mixin.truncate
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the truncate classes like s-truncate, s-truncate:2, etc...
 * The number of truncate classes generated is defined in the theme.helpers.truncate.count settings
 *
 * @param           {Number}            [count=__STheme.current.get('helpers.truncate.count')]          Specify how many s-truncate:{lines} classes you want to generate
 * @return        {Css}         The generated css
 *
 * @snippet         @s.truncate.classes
 *
 * @example        css
 * @s.truncate.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginRatioClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            count: {
                type: 'Number',
                default: s_theme_1.default.current.get('helpers.truncate.count'),
            },
        };
    }
}
exports.interface = SSugarcssPluginRatioClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ count: 10 }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Truncate
        * @namespace          sugar.style.helpers.truncate
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/truncate
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to **truncate texts to a number of lines** on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.truncate.classes;
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
  * @namespace          sugar.style.helpers.truncate
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
.s-truncate-${i + 1} {
    @s.truncate(${i + 1});
}`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLG9DQUFxQyxTQUFRLHFCQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQzthQUMxRDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNZ0QseURBQVM7QUFFMUQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBbUJKLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDN0MsT0FBTyxrQ0FDSCxDQUFDLEdBQUcsQ0FDUixzQ0FBc0MsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQzFELENBQUMsQ0FBQzs7VUFFQSxDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNqQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNQLE9BQU8sb0NBQW9DLENBQUMsR0FBRyxDQUFDLElBQzVDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FDdEI7Z0RBQ2dDLENBQUMsR0FBRyxDQUFDLEtBQUssZUFBTyxDQUFDLEtBQUs7YUFDbEQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2FBQzVCLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDO2VBQ3BCLENBQUM7SUFDSixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtsQixDQUNBLENBQUM7SUFFRixDQUFDLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQy9DLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Z0NBQ2MsQ0FBQzs7Ozs7O2dEQU8zQixDQUFDLEdBQUcsQ0FDUjs7O29DQUdrQyxDQUFDLEtBQUssZUFBTyxDQUFDLEtBQUs7YUFDdEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2FBQzVCLEtBQUssQ0FBQyxJQUFJLENBQUM7YUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDOztFQUU3QixDQUNPLENBQUMsSUFBSSxDQUNGO2NBQ0UsQ0FBQyxHQUFHLENBQUM7a0JBQ0QsQ0FBQyxHQUFHLENBQUM7RUFDckIsRUFDVSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTdGRCw0QkE2RkMifQ==