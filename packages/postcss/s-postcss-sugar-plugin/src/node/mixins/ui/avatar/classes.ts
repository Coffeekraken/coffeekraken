import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          classes
 * @namespace     node.mixin.ui.avatar
 * @type          PostcssMixin
 * @interface     ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the avatar classes
 *
 * @param       {('default')[]}                                                [lnfs=['default']]         The lnf(s) you want to generate
 * @param       {('default'|'square'|'rounded')[]}                 [shape=['default'|'square','pill','rounded']]         The shape(s) you want to generate
 * @param       {'default''}                                                  [defaultLnf='theme.ui.avatar.defaultLnf']           The default lnf you want
 * @param       {('bare'|'lnf'|'shape'|'interactive'|'notifications')[]}        [scope=['bare','lnf','shape','interactive','notifications']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * @sugar.ui.avatar.classes();
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

export interface IPostcssSugarPluginUiAvatarClassesParams {
    scope: ('bare' | 'lnf' | 'interactive' | 'notifications')[];
}

export { postcssSugarPluginUiAvatarClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiAvatarClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiAvatarClassesParams = {
        scope: [],
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
      /**
        * @name          Avatar
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/avatar
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some avatar style around any image.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @install          css
        * \\@sugar.ui.avatar.classes;
        * 
        * .my-avatar {
        *   \@sugar.ui.avatar;
        * }
        * 
        * @cssClass             s-avatar                Apply the avatar style
        * @cssClass             s-avatar:interactive            Specify that this avatar is interactive
        * 
        * @example        html         Default
        *   <div class="s-avatar s-font:100 s-mie:20">
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        *   <div class="s-avatar s-font:100 s-mie:20 s-color:accent">
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        *   <div class="s-avatar s-font:100 s-mie:20 s-color:complementary">
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        *   <div class="s-avatar s-font:100 s-mie:20 s-color:info">
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        *   <div class="s-avatar s-font:100 s-mie:20 s-color:success">
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        *   <div class="s-avatar s-font:100 s-mie:20 s-color:error">
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        * 
        * @example       html         Notifications
        * <div class="s-avatar s-font:100 s-mie:20" notifications="10">
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        * <div class="s-avatar s-font:100 s-mie:20 s-color:accent" notifications="10">
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        * <div class="s-avatar s-font:100 s-mie:20 s-color:complementary" notifications="10">
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        * <div class="s-avatar s-color:info s-font:100 s-mie:20" notifications>
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        * <div class="s-avatar s-color:success s-font:100 s-mie:20" notifications>
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        * <div class="s-avatar s-color:error s-font:100 s-mie:20" notifications>
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        * 
        * @example       html         Interactive
        * <div class="s-avatar:interactive s-font:100 s-mie:20">
        *    <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        * <div class="s-avatar:interactive s-font:100 s-mie:20 s-color:accent">
        *    <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        * <div class="s-avatar:interactive s-font:100 s-mie:20 s-color:complementary">
        *    <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        * <div class="s-avatar:interactive s-font:100 s-mie:20 s-color:info">
        *    <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        * <div class="s-avatar:interactive s-font:100 s-mie:20 s-color:success">
        *    <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        * <div class="s-avatar:interactive s-font:100 s-mie:20 s-color:error">
        *    <img src="https://i.pravatar.cc/300?v=${Math.round(
            Math.random() * 99999,
        )}" />
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    if (finalParams.scope.includes('bare')) {
        vars.comment(
            () => `/**
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
       `,
        ).code(
            `
          .s-avatar {
            @sugar.ui.avatar($scope: 'bare,notifications');
          }
      `,
            { type: 'CssClass' },
        );
    }

    if (finalParams.scope.includes('lnf')) {
        vars.comment(
            () => `/**
        * @name           s-avatar
        * @namespace          sugar.ui.avatar
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
        */`,
        ).code(
            `
        .s-avatar:not(.s-bare) {
            @sugar.ui.avatar($scope: 'lnf,notifications');
        }
    `,
            { type: 'CssClass' },
        );
    }

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
          .s-avatar--interactive {
              @sugar.ui.avatar($scope: 'interactive');
          }
      `,
        { type: 'CssClass' },
    );

    return vars;
}
