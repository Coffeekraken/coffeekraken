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
 * @namespace      node.mixin.height
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the height helper classes like s-height:20, s-height:50, etc...
 * It will generate all the height defined in the config.theme.height configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.height.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginWidthClassesMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginWidthClassesMixinInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const heightObj = s_theme_1.default.get('height');
    vars.comment(`
      /**
        * @name          Heights
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/heights
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some height to any HTMLElement.
        * These widths are defined in the \`theme.height\` theme settings.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${Object.keys(heightObj).map((height) => {
        return ` * @cssClass             s-height:${height}            Apply the \`${height}\` height`;
    })}
        * 
        ${Object.keys(heightObj)
        .map((height) => {
        return ` * @example         html        ${height}%
                *   <div class="s-bg:main-surface s-radius:30" style="height:500px">
                *      <div style="overflow:hidden" class="s-height:${height} s-text:center s-bg:accent s-p:30 s-radius:30">s-height:${height}</div>
                *   </div>`;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(`/**
    * @name            s-height:viewport
    * @namespace          sugar.style.width
    * @type             CssClass
    * @platform         css
    * @status         beta
    * 
    * This class allows you to apply the "<yellow>viewport</yellow>" height to any HTMLElement
    * 
    * @example      html
    * <div class="s-container">
    *   <h1 class="s-typo:h1">Hello world</h1>
    *   <div class="s-height:viewport">
    *       <p class="s-typo:p">Something cool</p>
    *   </div>
    * </div>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .s-height--viewport {
        position: relative;
        left: 50%;
        height: 100vh;
        transform: translate(0, -50%);
   }`, { type: 'CssClass' });
    Object.keys(heightObj).forEach((name) => {
        vars.comment(`/**
        * @name            s-height:${name}
        * @namespace          sugar.style.width
        * @type             CssClass
        * @platform         css
        * @status           beta
        * 
        * This class allows you to apply the "<yellow>${name}</yellow>" height to any HTMLElement
        * 
        * @example      html
        * <div class="s-container" style="height:500px">
        *   <h1 class="s-typo:h1">Hello world</h1>
        *   <div class="s-height:${name}">
        *       <p class="s-typo:p">Something cool</p>
        *   </div>
        * </div>
        * 
        * @since        2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
      .s-height--${name} {
            height: ${heightObj[name]};
      }`, { type: 'CssClass' });
    });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBTSw0Q0FBNkMsU0FBUSxxQkFBWTtJQUNuRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUl3RCxpRUFBUztBQUVsRSxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixNQUFNLFNBQVMsR0FBRyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUV6QyxJQUFJLENBQUMsT0FBTyxDQUNSOzs7Ozs7Ozs7Ozs7Ozs7OztVQWlCRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3BDLE9BQU8scUNBQXFDLE1BQU0sMkJBQTJCLE1BQU0sV0FBVyxDQUFDO0lBQ25HLENBQUMsQ0FBQzs7VUFFQSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQztTQUNuQixHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUNaLE9BQU8sbUNBQW1DLE1BQU07O3NFQUVNLE1BQU0sMkRBQTJELE1BQU07MkJBQ2xILENBQUM7SUFDaEIsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7S0FLbEIsQ0FDQSxDQUFDO0lBRUYsSUFBSSxDQUFDLE9BQU8sQ0FDUjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFvQkosQ0FDQyxDQUFDLElBQUksQ0FDRjs7Ozs7O0tBTUgsRUFDRyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FDUjtzQ0FDMEIsSUFBSTs7Ozs7O3dEQU1jLElBQUk7Ozs7O21DQUt6QixJQUFJOzs7Ozs7OztRQVEvQixDQUNDLENBQUMsSUFBSSxDQUNGO21CQUNPLElBQUk7c0JBQ0QsU0FBUyxDQUFDLElBQUksQ0FBQztRQUM3QixFQUNJLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBMUhELDRCQTBIQyJ9