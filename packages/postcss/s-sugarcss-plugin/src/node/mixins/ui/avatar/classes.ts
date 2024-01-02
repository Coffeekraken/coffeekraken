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

export interface ISSugarcssPluginUiAvatarClassesParams {}

export { SSugarcssPluginUiAvatarClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginUiAvatarClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginUiAvatarClassesParams = {
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
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
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        *       <div class="s-avatar s-color:accent">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        *   <div class="s-avatar s-color:complementary">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        *   <div class="s-avatar s-color:info">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        *   <div class="s-avatar s-color:success">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        *   <div class="s-avatar s-color:error">
        *      <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        * </div>
        * 
        * @example       html         Notifications
        * <div class="s-flex:wrap:align-center s-gap:20 s-font:70">
        *   <div class="s-avatar notifications="10">
        *      <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        *   <div class="s-avatar s-color:accent" notifications="10">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        *   <div class="s-avatar s-color:complementary" notifications="10">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        *   <div class="s-avatar s-color:info" notifications>
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        *   <div class="s-avatar s-color:success" notifications>
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        *   <div class="s-avatar s-color:error" notifications>
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        * </div>
        * 
        * @example       html         Interactive
        * <div class="s-flex:wrap:align-center s-gap:20 s-font:70">
        *   <div class="s-avatar:interactive">
        *        <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        *   <div class="s-avatar:interactive s-color:accent">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        *   <div class="s-avatar:interactive s-color:complementary">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        *   <div class="s-avatar:interactive s-color:info">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        *   <div class="s-avatar:interactive s-color:success">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        *   <div class="s-avatar:interactive s-color:error">
        *       <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    vars.code(`@s.scope 'bare' {`);
    vars.code(
        `
            .s-avatar {
                @s.scope.only 'bare' {
                    @s.ui.avatar();
                }
            }
    `,
        {
            type: 'CssClass',
        },
    );
    vars.code(`}`);

    vars.code(`@s.scope 'interactive' {`);
    vars.comment(
        () => `/**
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
        */`,
    ).code(
        `
          .s-avatar-interactive {
            @s.scope.only 'interactive' {
              @s.ui.avatar();
            }
          }
      `,
        { type: 'CssClass' },
    );
    vars.code('}');

    return vars;
}
