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
        ${finalParams.styles.map((style) => {
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
    })}
        *
        ${finalParams.shapes.map((shape) => {
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
    })}
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
      `);
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
        `);
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
      `);
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
      `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZO0lBQ2pFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3JCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUM7Z0JBQy9DLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFFBQVEsQ0FBQzthQUNuRDtZQUNELFlBQVksRUFBRTtnQkFDVixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO2FBQ2xEO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUNyQyxPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQzthQUNsRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0s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QUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7OzRDQUdHLEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN2RDsrREFDNkMsSUFBSSxDQUFDLEtBQUssQ0FDbkQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7OzRDQUdHLEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxFQUN2RDsrREFDNkMsSUFBSSxDQUFDLEtBQUssQ0FDbkQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7MkJBQ1EsQ0FBQztJQUNwQixDQUFDLENBQUM7Ozs7b0RBSTBDLElBQUksQ0FBQyxLQUFLLENBQ2xELElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs7b0RBRzJDLElBQUksQ0FBQyxLQUFLLENBQ2xELElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs7b0RBRzJDLElBQUksQ0FBQyxLQUFLLENBQ2xELElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs7b0RBRzJDLElBQUksQ0FBQyxLQUFLLENBQ2xELElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs7b0RBRzJDLElBQUksQ0FBQyxLQUFLLENBQ2xELElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs7b0RBRzJDLElBQUksQ0FBQyxLQUFLLENBQ2xELElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs7OztxREFLNEMsSUFBSSxDQUFDLEtBQUssQ0FDbkQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7OztxREFHNEMsSUFBSSxDQUFDLEtBQUssQ0FDbkQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7OztxREFHNEMsSUFBSSxDQUFDLEtBQUssQ0FDbkQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7OztxREFHNEMsSUFBSSxDQUFDLEtBQUssQ0FDbkQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7OztxREFHNEMsSUFBSSxDQUFDLEtBQUssQ0FDbkQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7OztxREFHNEMsSUFBSSxDQUFDLEtBQUssQ0FDbkQsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7Ozs7Ozs7O0tBUUosQ0FDQSxDQUFDO0lBRUYsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7UUFlVixDQUNDLENBQUMsSUFBSSxDQUFDOzs7O09BSVIsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ25DLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzt3Q0FFTixLQUFLLEtBQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssRUFDdkQ7Ozs7Ozs7Ozs7Ozs7ZUFhRyxDQUNGLENBQUMsSUFBSSxDQUFDO3VCQUNJLEtBQUssS0FBSyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxFQUFFOzJDQUNsQyxLQUFLOztTQUV2QyxDQUFDLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQztLQUNOO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNyQyxXQUFXLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7c0NBRVIsS0FBSyxLQUFLLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEVBQ3ZEOzs7Ozs7Ozs7Ozs7O1dBYUMsQ0FDRSxDQUFDLElBQUksQ0FBQztxQkFDRSxLQUFLLEtBQUssV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFBRTt1Q0FDcEMsS0FBSzs7T0FFckMsQ0FBQyxDQUFDO1FBQ0QsQ0FBQyxDQUFDLENBQUM7S0FDTjtJQUVELElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7O1dBY0gsQ0FDTixDQUFDLElBQUksQ0FBQzs7OztPQUlKLENBQUMsQ0FBQztJQUVMLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==