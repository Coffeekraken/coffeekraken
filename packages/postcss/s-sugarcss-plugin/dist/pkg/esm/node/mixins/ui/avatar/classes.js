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
 * @return      {Css}                   The corresponding css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       interactive         Interactive css
 * @scope       notification        Notification css
 *
 * @snippet         @s.ui.avatar.classes
 *
 * @example       css
 * @s.ui.avatar.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiAvatarClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginUiAvatarClassesInterface as interface };
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
    vars.code(`@s.scope 'bare' {`);
    vars.code(`
            .s-avatar {
                @s.scope.only 'bare' {
                    @s.ui.avatar();
                }
            }
    `, {
        type: 'CssClass',
    });
    vars.code(`}`);
    vars.code(`@s.scope 'interactive' {`);
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
            @s.scope.only 'interactive' {
              @s.ui.avatar();
            }
          }
      `, { type: 'CssClass' });
    vars.code('}');
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWhFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3dEQTZCMEMsSUFBSSxDQUFDLEtBQUssQ0FDdEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7Ozt3REFHK0MsSUFBSSxDQUFDLEtBQUssQ0FDdEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7Ozt3REFHK0MsSUFBSSxDQUFDLEtBQUssQ0FDdEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7Ozt3REFHK0MsSUFBSSxDQUFDLEtBQUssQ0FDdEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7Ozt3REFHK0MsSUFBSSxDQUFDLEtBQUssQ0FDdEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7Ozt1REFHOEMsSUFBSSxDQUFDLEtBQUssQ0FDckQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7Ozs7Ozs7dURBTzhDLElBQUksQ0FBQyxLQUFLLENBQ3JELElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs7d0RBRytDLElBQUksQ0FBQyxLQUFLLENBQ3RELElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs7d0RBRytDLElBQUksQ0FBQyxLQUFLLENBQ3RELElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs7d0RBRytDLElBQUksQ0FBQyxLQUFLLENBQ3RELElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs7d0RBRytDLElBQUksQ0FBQyxLQUFLLENBQ3RELElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs7d0RBRytDLElBQUksQ0FBQyxLQUFLLENBQ3RELElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs7Ozs7O3lEQU9nRCxJQUFJLENBQUMsS0FBSyxDQUN2RCxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUN4Qjs7O3dEQUcrQyxJQUFJLENBQUMsS0FBSyxDQUN0RCxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUN4Qjs7O3dEQUcrQyxJQUFJLENBQUMsS0FBSyxDQUN0RCxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUN4Qjs7O3dEQUcrQyxJQUFJLENBQUMsS0FBSyxDQUN0RCxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUN4Qjs7O3dEQUcrQyxJQUFJLENBQUMsS0FBSyxDQUN0RCxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUN4Qjs7O3dEQUcrQyxJQUFJLENBQUMsS0FBSyxDQUN0RCxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUN4Qjs7Ozs7OztLQU9KLENBQ0EsQ0FBQztJQUVGLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMvQixJQUFJLENBQUMsSUFBSSxDQUNMOzs7Ozs7S0FNSCxFQUNHO1FBQ0ksSUFBSSxFQUFFLFVBQVU7S0FDbkIsQ0FDSixDQUFDO0lBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLElBQUksQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUN0QyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7OztXQWNILENBQ04sQ0FBQyxJQUFJLENBQ0Y7Ozs7OztPQU1ELEVBQ0MsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9