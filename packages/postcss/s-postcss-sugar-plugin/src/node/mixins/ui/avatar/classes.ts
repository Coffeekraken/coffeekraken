import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

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
 * @param       {('solid')[]}                                                [styles=['solid']]         The style(s) you want to generate
 * @param       {('default'|'square'|'pill'|'circle')[]}                 [shape=['default'|'square','pill','circle']]         The shape(s) you want to generate
 * @param       {'solid''}                                                  [defaultStyle='theme.ui.avatar.defaultStyle']           The default style you want
 * @param       {'default'|'square'|'pill'}                                     [defaultShape='theme.ui.avatar.defaultShape']           The default shape you want
 * @param       {('bare'|'lnf'|'shape'|'interactive'|'notifications')[]}        [scope=['bare','lnf','shape','interactive','notifications']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * \@sugar.ui.avatar.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginUiAvatarClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            shapes: {
                type: 'String[]',
                values: ['default', 'square', 'pill', 'circle'],
                default: ['default', 'square', 'pill', 'circle'],
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.avatar.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.get('ui.avatar.defaultShape'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: [
                    'bare',
                    'lnf',
                    'shape',
                    'interactive',
                    'notifications',
                ],
                default: [
                    'bare',
                    'lnf',
                    'shape',
                    'interactive',
                    'notifications',
                ],
            },
        };
    }
}

export interface IPostcssSugarPluginUiAvatarClassesParams {
    styles: 'solid'[];
    shapes: ('default' | 'square' | 'pill' | 'circle')[];
    defaultStyle: 'solid';
    defaultShape: 'default' | 'square' | 'pill' | 'circle';
    scope: ('bare' | 'lnf' | 'shape' | 'interactive' | 'notifications')[];
}

export { postcssSugarPluginUiAvatarClassesInterface as interface };

import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/avatar.js`],
    };
}

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
        styles: [],
        shapes: [],
        defaultStyle: 'solid',
        defaultShape: 'default',
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
        ${finalParams.styles
            .map((style) => {
                return ` * @cssClass     s-avatar${
                    style === finalParams.defaultStyle ? '' : `:${style}`
                }           Apply the ${style} avatar style`;
            })
            .join('\n')}
        ${finalParams.shapes
            .map((shape) => {
                return ` * @cssClass     s-avatar${
                    shape === finalParams.defaultShape ? '' : `:${shape}`
                }           Apply the ${shape} avatar shape`;
            })
            .join('\n')}
        * @cssClass             s-avatar:interactive            Specify that this avatar is interactive
        * 
        ${finalParams.styles.map((style) => {
            return ` * @example        html         ${style}
                  *   <div class="s-avatar${
                      style === finalParams.defaultStyle ? '' : `:${style}`
                  } s-font:100 s-mie:20">
                  *   <img src="https://i.pravatar.cc/300?v=${Math.round(
                      Math.random() * 99999,
                  )}" />
                  * </div>
                  *   <div class="s-avatar${
                      style === finalParams.defaultStyle ? '' : `:${style}`
                  } s-font:100 s-mie:20 s-color:accent">
                  *   <img src="https://i.pravatar.cc/300?v=${Math.round(
                      Math.random() * 99999,
                  )}" />
                  * </div>
                  *   <div class="s-avatar${
                      style === finalParams.defaultStyle ? '' : `:${style}`
                  } s-font:100 s-mie:20 s-color:complementary">
                  *   <img src="https://i.pravatar.cc/300?v=${Math.round(
                      Math.random() * 99999,
                  )}" />
                  * </div>
                  *   <div class="s-avatar${
                      style === finalParams.defaultStyle ? '' : `:${style}`
                  } s-font:100 s-mie:20 s-color:info">
                  *   <img src="https://i.pravatar.cc/300?v=${Math.round(
                      Math.random() * 99999,
                  )}" />
                  * </div>
                  *   <div class="s-avatar${
                      style === finalParams.defaultStyle ? '' : `:${style}`
                  } s-font:100 s-mie:20 s-color:success">
                  *   <img src="https://i.pravatar.cc/300?v=${Math.round(
                      Math.random() * 99999,
                  )}" />
                  * </div>
                  *   <div class="s-avatar${
                      style === finalParams.defaultStyle ? '' : `:${style}`
                  } s-font:100 s-mie:20 s-color:error">
                  *   <img src="https://i.pravatar.cc/300?v=${Math.round(
                      Math.random() * 99999,
                  )}" />
                  * </div>`;
        })}
        *
        ${finalParams.shapes.map((shape) => {
            return ` * @example        html         ${shape}
                  *   <div class="s-avatar${
                      shape === finalParams.defaultShape ? '' : `:${shape}`
                  } s-font:100 s-mie:20">
                  *    <img src="https://i.pravatar.cc/300?v=${Math.round(
                      Math.random() * 99999,
                  )}" />
                  * </div>
                  *   <div class="s-avatar${
                      shape === finalParams.defaultShape ? '' : `:${shape}`
                  } s-font:100 s-mie:20 s-color:accent">
                  *    <img src="https://i.pravatar.cc/300?v=${Math.round(
                      Math.random() * 99999,
                  )}" />
                  * </div>
                  *   <div class="s-avatar${
                      shape === finalParams.defaultShape ? '' : `:${shape}`
                  } s-font:100 s-mie:20 s-color:complementary">
                  *    <img src="https://i.pravatar.cc/300?v=${Math.round(
                      Math.random() * 99999,
                  )}" />
                  * </div>
                  *   <div class="s-avatar${
                      shape === finalParams.defaultShape ? '' : `:${shape}`
                  } s-font:100 s-mie:20 s-color:info">
                  *    <img src="https://i.pravatar.cc/300?v=${Math.round(
                      Math.random() * 99999,
                  )}" />
                  * </div>
                  *   <div class="s-avatar${
                      shape === finalParams.defaultShape ? '' : `:${shape}`
                  } s-font:100 s-mie:20 s-color:success">
                  *    <img src="https://i.pravatar.cc/300?v=${Math.round(
                      Math.random() * 99999,
                  )}" />
                  * </div>
                  *   <div class="s-avatar${
                      shape === finalParams.defaultShape ? '' : `:${shape}`
                  } s-font:100 s-mie:20 s-color:error">
                  *    <img src="https://i.pravatar.cc/300?v=${Math.round(
                      Math.random() * 99999,
                  )}" />
                  * </div>`;
        })}
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
        * @contributor 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        * @contributor 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
        ).code(`
          .s-avatar {
            @sugar.ui.avatar($scope: 'bare,notifications');
          }
      `);
    }

    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            vars.comment(
                () => `/**
            * @name           s-avatar${
                style === finalParams.defaultStyle ? '' : `:${style}`
            }
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
            */`,
            ).code(`
            .s-avatar${style === finalParams.defaultStyle ? '' : `--${style}`} {
                @sugar.ui.avatar($style: ${style}, $scope: 'lnf,notifications');
            }
        `);
        });
    }

    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            vars.comment(
                () => `/**
          * @name           s-avatar${
              shape === finalParams.defaultShape ? '' : `:${shape}`
          }
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
        */`,
            ).code(`
          .s-avatar${shape === finalParams.defaultShape ? '' : `--${shape}`} {
            @sugar.ui.avatar($shape: ${shape}, $scope: shape);
          }
      `);
        });
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
    ).code(`
          .s-avatar--interactive {
              @sugar.ui.avatar($scope: 'interactive');
          }
      `);

    return vars;
}
