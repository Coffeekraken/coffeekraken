import __SInterface from '@coffeekraken/s-interface';
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
class postcssSugarPluginUiAvatarClassesInterface extends __SInterface {
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
export { postcssSugarPluginUiAvatarClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLDBDQUEyQyxTQUFRLFlBQVk7SUFDakUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLGVBQWUsQ0FBQztnQkFDdkQsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxBQUFELEVBQUcsYUFBYSxFQUFFLGVBQWUsQ0FBQzthQUM3RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsMENBQTBDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0RBNkIwQyxJQUFJLENBQUMsS0FBSyxDQUN0RCxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUN4Qjs7O3dEQUcrQyxJQUFJLENBQUMsS0FBSyxDQUN0RCxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUN4Qjs7O3dEQUcr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