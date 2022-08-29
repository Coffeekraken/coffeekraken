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
 * @param       {String}                            [defaultColor=theme.ui.avatar.defaultColor]
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
            defaultColor: {
                type: 'String',
                values: Object.keys(__STheme.get('color')),
                default: __STheme.get('ui.avatar.defaultColor'),
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
    const finalParams = Object.assign({ styles: [], shapes: [], defaultStyle: 'solid', defaultShape: 'default', defaultColor: 'main', scope: [] }, params);
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
    // default color
    if (finalParams.scope.includes('lnf')) {
        vars.code(() => `
            .s-avatar:not(.s-color) {
                @sugar.color(${finalParams.defaultColor});
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
          .s-avatar--interactive {
              @sugar.ui.avatar($scope: 'interactive');
          }
      `, { type: 'CssClass' });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sMENBQTJDLFNBQVEsWUFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUNyQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7Z0JBQ3hDLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDO2FBQzVDO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUM7YUFDbEQ7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7Z0JBQ3hDLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO2FBQ2xEO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFDLE9BQU8sRUFBRSxRQUFRLENB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RUFDdkQ7K0RBQzZDLElBQUksQ0FBQyxLQUFLLENBQ25ELElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs0Q0FHRyxLQUFLLEtBQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFDdkQ7K0RBQzZDLElBQUksQ0FBQyxLQUFLLENBQ25ELElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs0Q0FHRyxLQUFLLEtBQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFDdkQ7K0RBQzZDLElBQUksQ0FBQyxLQUFLLENBQ25ELElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs0Q0FHRyxLQUFLLEtBQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFDdkQ7K0RBQzZDLElBQUksQ0FBQyxLQUFLLENBQ25ELElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzJCQUNRLENBQUM7SUFDaEIsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztvREFJNkIsSUFBSSxDQUFDLEtBQUssQ0FDbEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7OztvREFHMkMsSUFBSSxDQUFDLEtBQUssQ0FDbEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7OztvREFHMkMsSUFBSSxDQUFDLEtBQUssQ0FDbEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7OztvREFHMkMsSUFBSSxDQUFDLEtBQUssQ0FDbEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7OztvREFHMkMsSUFBSSxDQUFDLEtBQUssQ0FDbEQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7OztvREFH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