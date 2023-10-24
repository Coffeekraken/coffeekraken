"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name          classes
 * @as              @s.ui.avatar.classes
 * @namespace     node.mixin.ui.avatar
 * @type          PostcssMixin
 * @interface     ./classes
 * @platform      postcss
 * @status        stable
 *
 * Generate the avatar classes
 *
 * @param       {('bare'|'lnf'|'shape'|'interactive'|'notifications')[]}        [scope=['bare','lnf','shape','interactive','notifications']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @s.ui.avatar.classes
 *
 * @example       css
 * @s.ui.avatar.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiAvatarClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'interactive', 'notifications'],
                default: ['bare', 'lnf', , 'interactive', 'notifications'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiAvatarClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Avatar
        * @namespace          sugar.style.ui.avatar
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/avatar
        * @platform       css
        * @status       stable
        * 
        * These classes allows to apply some avatar style around any image.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @install          css
        * @s.ui.avatar.classes;
        * 
        * .my-avatar {
        *   @s.ui.avatar;
        * }
        * 
        * @cssClass             s-avatar                Apply the avatar style
        * @cssClass             s-avatar:interactive            Specify that this avatar is interactive
        * 
        * @example        html         Default
        * <div class="s-flex:align-center:wrap s-gap:20 s-font:70">
        *   <div class="s-avatar">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        *       <div class="s-avatar s-color:accent">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        *   <div class="s-avatar s-color:complementary">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        *   <div class="s-avatar s-color:info">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        *   <div class="s-avatar s-color:success">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        *   <div class="s-avatar s-color:error">
        *      <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        * </div>
        * 
        * @example       html         Notifications
        * <div class="s-flex:wrap:align-center s-gap:20 s-font:70">
        *   <div class="s-avatar notifications="10">
        *      <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        *   <div class="s-avatar s-color:accent" notifications="10">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        *   <div class="s-avatar s-color:complementary" notifications="10">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        *   <div class="s-avatar s-color:info" notifications>
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        *   <div class="s-avatar s-color:success" notifications>
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        *   <div class="s-avatar s-color:error" notifications>
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        * </div>
        * 
        * @example       html         Interactive
        * <div class="s-flex:wrap:align-center s-gap:20 s-font:70">
        *   <div class="s-avatar:interactive">
        *        <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        *   <div class="s-avatar:interactive s-color:accent">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        *   <div class="s-avatar:interactive s-color:complementary">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        *   <div class="s-avatar:interactive s-color:info">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        *   <div class="s-avatar:interactive s-color:success">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        *   <div class="s-avatar:interactive s-color:error">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
          * @name           s-avatar
          * @namespace          sugar.style.ui.avatar
          * @type           CssClass
          * 
          * This class represent a(n) "<s-color="accent">bare</s-color>" avatar
          * 
          * @example        html
          * <span class="s-avatar">
          *   <img src="https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f" />
          * </span>
          * 
          * @since    2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
          .s-avatar {
            @s.ui.avatar($scope: 'bare,notifications');
          }
      `, { type: 'CssClass' });
    }
    if (finalParams.scope.includes('lnf')) {
        vars.comment(() => `/**
        * @name           s-avatar
        * @namespace          sugar.style.ui.avatar
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">default</s-color>" avatar
        * 
        * @example        html
        * <span class="s-avatar">
        *   <img src="https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f" />
        * </span>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
        .s-avatar:not(.s-bare) {
            @s.ui.avatar($scope: 'lnf,notifications');
        }
    `, { type: 'CssClass' });
    }
    vars.comment(() => `/**
          * @name           s-avatar:interactive
          * @namespace          sugar.style.ui.avatar
          * @type           CssClass
          * 
          * This class represent a(n) "<s-color="accent">interactive</s-color>" avatar
          * 
          * @example        html
          * <span class="s-avatar:interactive">
          *   <img src="https://www.gravatar.com/avatar/b5df60055b6287bb7c90c0078ce20a5f" />
          * </span>
          * 
          * @since    2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
          .s-avatar-interactive {
              @s.ui.avatar($scope: 'interactive');
          }
      `, { type: 'CssClass' });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBRUgsTUFBTSwwQ0FBMkMsU0FBUSxxQkFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsZUFBZSxDQUFDO2dCQUN2RCxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEFBQUQsRUFBRyxhQUFhLEVBQUUsZUFBZSxDQUFDO2FBQzdEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1zRCwrREFBUztBQUVoRSxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dEQTZCMEMsSUFBSSxDQUFDLEtBQUssQ0FDdEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7Ozt3REFHK0MsSUFBSSxDQUFDLEtBQUssQ0FDdEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7Ozt3REFHK0MsSUFBSSxDQUFDLEtBQUssQ0FDdEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FD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