"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const string_1 = require("@coffeekraken/sugar/string");
/**
 * @name           classes
 * @as              @s.transition.classes
 * @namespace      node.mixin.transition
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the transition helper classes like s-transition:slow, etc.
 * The generated transitions are specified in the config.theme.transition configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.transition.classes
 *
 * @example        css
 * @s.transition.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginTransitionClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginTransitionClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const transitionObj = s_theme_1.default.get('transition');
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Transitions
        * @namespace          sugar.style.helpers.transition
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/transition
        * @platform       css
        * @status       stable
        * 
        * These classes allows to apply some transitions on any HTMLElement.
        * These transitions are defined in the \`theme.transition\` theme settings.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.transition.classes;
        * 
        ${Object.keys(transitionObj).map((transition) => {
        return ` * @cssClass             s-transition${transition === 'default' ? '' : `:${transition}`}            Apply the \`${transition}\` transition`;
    })}
        * 
        ${Object.keys(transitionObj)
        .map((transition) => {
        const id = `s-transition-${(0, string_1.__uniqid)()}`;
        return `
                * @example          html        ${transition}
                *   <div class="s-bc:main-surface s-radius:30" id="${id}">
                *      <div class="s-transition${transition === 'default' ? '' : `:${transition}`} s-ratio:1 s-bc:accent s-radius:30"></div>
                *       <style>
                *           #${id} > div { position: relative; left: 0; width: 100px; }
                *           #${id}:hover > div { left: calc(100% - 100px); )  }
                *       </style>
                *   </div>`;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    Object.keys(transitionObj).forEach((transitionName) => {
        vars.comment(() => `/**
  * @name          s-ratio:${transitionName.replace('/', '-')}
  * @namespace          sugar.style.helpers.transition
  * @type               CssClass
  * @platform             css
  * @status             stable
  * 
  * This class allows you to apply a "<yellow>${transitionName}</yellow>" transition style to any HTMLElement
  * 
  * @example        html
  * <div class="s-transition\:${transitionName.replace('/', '-')} s-bc:accent">
  *     <div class="s-center-abs">I'm a cool container</div>
  * </div>
  */
 `).code(`
.s-transition${transitionName === 'default' ? '' : `-${transitionName}`} {
    @s.transition(${transitionName});
}`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MsdURBQXNEO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sNENBQTZDLFNBQVEscUJBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJd0QsaUVBQVM7QUFFbEUsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sYUFBYSxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBRWpELE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFvQkosTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUM1QyxPQUFPLHdDQUNILFVBQVUsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxVQUFVLEVBQ2xELDJCQUEyQixVQUFVLGVBQWUsQ0FBQztJQUN6RCxDQUFDLENBQUM7O1VBRUEsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUM7U0FDdkIsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDaEIsTUFBTSxFQUFFLEdBQUcsZ0JBQWdCLElBQUEsaUJBQVEsR0FBRSxFQUFFLENBQUM7UUFDeEMsT0FBTztrREFDMkIsVUFBVTtxRUFDUyxFQUFFO2lEQUVuRCxVQUFVLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksVUFBVSxFQUNsRDs7K0JBRWUsRUFBRTsrQkFDRixFQUFFOzsyQkFFTixDQUFDO0lBQ2hCLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS2xCLENBQ0EsQ0FBQztJQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsY0FBYyxFQUFFLEVBQUU7UUFDbEQsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs2QkFDVyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7OztnREFNYixjQUFjOzs7Z0NBRzlCLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzs7OztFQUk5RCxDQUNPLENBQUMsSUFBSSxDQUNGO2VBQ0csY0FBYyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLGNBQWMsRUFBRTtvQkFDbkQsY0FBYztFQUNoQyxFQUNVLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBaEdELDRCQWdHQyJ9