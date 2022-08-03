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
 * @param       {('default'|'square'|'rounded')[]}                 [shape=['default'|'square','pill','rounded']]         The shape(s) you want to generate
 * @param       {'solid''}                                                  [defaultStyle='theme.ui.avatar.defaultStyle']           The default style you want
 * @param       {'default'|'square'|'rounded'}                                     [defaultShape='theme.ui.avatar.defaultShape']           The default shape you want
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
                values: ['default', 'square', 'rounded'],
                default: ['default', 'square', 'rounded'],
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default: __STheme.get('ui.avatar.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'rounded'],
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
export { postcssSugarPluginUiAvatarClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/avatar.js`],
    };
}
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], shapes: [], defaultStyle: 'solid', defaultShape: 'default', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
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
        return ` * @cssClass     s-avatar${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} avatar style`;
    })
        .join('\n')}
        ${finalParams.shapes
        .map((shape) => {
        return ` * @cssClass     s-avatar${shape === finalParams.defaultShape ? '' : `:${shape}`}           Apply the ${shape} avatar shape`;
    })
        .join('\n')}
        * @cssClass             s-avatar:interactive            Specify that this avatar is interactive
        * 
        ${finalParams.styles
        .map((style) => {
        return ` * @example        html         ${style}
                  *   <div class="s-avatar${style === finalParams.defaultStyle ? '' : `:${style}`} s-font:100 s-mie:20">
                  *   <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
                  * </div>
                  *   <div class="s-avatar${style === finalParams.defaultStyle ? '' : `:${style}`} s-font:100 s-mie:20 s-color:accent">
                  *   <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
                  * </div>
                  *   <div class="s-avatar${style === finalParams.defaultStyle ? '' : `:${style}`} s-font:100 s-mie:20 s-color:complementary">
                  *   <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
                  * </div>
                  *   <div class="s-avatar${style === finalParams.defaultStyle ? '' : `:${style}`} s-font:100 s-mie:20 s-color:info">
                  *   <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
                  * </div>
                  *   <div class="s-avatar${style === finalParams.defaultStyle ? '' : `:${style}`} s-font:100 s-mie:20 s-color:success">
                  *   <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
                  * </div>
                  *   <div class="s-avatar${style === finalParams.defaultStyle ? '' : `:${style}`} s-font:100 s-mie:20 s-color:error">
                  *   <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
                  * </div>`;
    })
        .join('\n')}
        *
        ${finalParams.shapes
        .map((shape) => {
        return ` * @example        html         ${shape}
                  *   <div class="s-avatar${shape === finalParams.defaultShape ? '' : `:${shape}`} s-font:100 s-mie:20">
                  *    <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
                  * </div>
                  *   <div class="s-avatar${shape === finalParams.defaultShape ? '' : `:${shape}`} s-font:100 s-mie:20 s-color:accent">
                  *    <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
                  * </div>
                  *   <div class="s-avatar${shape === finalParams.defaultShape ? '' : `:${shape}`} s-font:100 s-mie:20 s-color:complementary">
                  *    <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
                  * </div>
                  *   <div class="s-avatar${shape === finalParams.defaultShape ? '' : `:${shape}`} s-font:100 s-mie:20 s-color:info">
                  *    <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
                  * </div>
                  *   <div class="s-avatar${shape === finalParams.defaultShape ? '' : `:${shape}`} s-font:100 s-mie:20 s-color:success">
                  *    <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
                  * </div>
                  *   <div class="s-avatar${shape === finalParams.defaultShape ? '' : `:${shape}`} s-font:100 s-mie:20 s-color:error">
                  *    <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
                  * </div>`;
    })
        .join('\n')}
        * 
        * @example       html         Notifications
        * <div class="s-avatar s-font:100 s-mie:20" notifications="10">
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        * </div>
        * <div class="s-avatar s-font:100 s-mie:20 s-color:accent" notifications="10">
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        * </div>
        * <div class="s-avatar s-font:100 s-mie:20 s-color:complementary" notifications="10">
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        * </div>
        * <div class="s-avatar s-color:info s-font:100 s-mie:20" notifications>
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        * </div>
        * <div class="s-avatar s-color:success s-font:100 s-mie:20" notifications>
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        * </div>
        * <div class="s-avatar s-color:error s-font:100 s-mie:20" notifications>
        *   <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        * </div>
        * 
        * @example       html         Interactive
        * <div class="s-avatar:interactive s-font:100 s-mie:20">
        *    <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        * </div>
        * <div class="s-avatar:interactive s-font:100 s-mie:20 s-color:accent">
        *    <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        * </div>
        * <div class="s-avatar:interactive s-font:100 s-mie:20 s-color:complementary">
        *    <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        * </div>
        * <div class="s-avatar:interactive s-font:100 s-mie:20 s-color:info">
        *    <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        * </div>
        * <div class="s-avatar:interactive s-font:100 s-mie:20 s-color:success">
        *    <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        * </div>
        * <div class="s-avatar:interactive s-font:100 s-mie:20 s-color:error">
        *    <img src="https://i.pravatar.cc/300?v=${Math.round(Math.random() * 99999)}" />
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        * @contributor 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        * @contributor 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
            @sugar.ui.avatar($scope: 'bare,notifications');
          }
      `, { type: 'CssClass' });
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            vars.comment(() => `/**
            * @name           s-avatar${style === finalParams.defaultStyle ? '' : `:${style}`}
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
            .s-avatar${style === finalParams.defaultStyle ? '' : `--${style}`} {
                @sugar.ui.avatar($style: ${style}, $scope: 'lnf,notifications');
            }
        `, { type: 'CssClass' });
        });
    }
    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            vars.comment(() => `/**
          * @name           s-avatar${shape === finalParams.defaultShape ? '' : `:${shape}`}
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
          .s-avatar${shape === finalParams.defaultShape ? '' : `--${shape}`} {
            @sugar.ui.avatar($shape: ${shape}, $scope: shape);
          }
      `, { type: 'CssClass' });
        });
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
          .s-avatar--interactive {
              @sugar.ui.avatar($scope: 'interactive');
          }
      `, { type: 'CssClass' });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZO0lBQ2pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3JCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztnQkFDeEMsT0FBTyxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7YUFDNUM7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQzthQUNsRDtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQztnQkFDeEMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7YUFDbEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUU7b0JBQ0osTUFBTTtvQkFD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