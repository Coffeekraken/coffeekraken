import __SInterface from '@coffeekraken/s-interface';
/**
 * @name          classes
 * @as              @s.ui.media.classes
 * @namespace     node.mixin.ui.media
 * @type          PostcssMixin
 * @interface     ./classes
 * @platform      postcss
 * @status        beta
 *
 * Generate the media classes
 *
 * @param       {('bare'|'lnf')[]}        [scope=['bare','lnf']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @snippet         @s.ui.media.classes
 *
 * @example       css
 * @s.ui.media.classes();
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiMediaClassesInterface extends __SInterface {
    static get _definition() {
        return {
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}
export { postcssSugarPluginUiMediaClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Media
        * @namespace          sugar.style.ui.media
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/media
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some media style around any image.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @install          css
        * @s.ui.media.classes;
        * 
        * .my-media {
        *   @s.ui.media;
        * }
        * 
        * @cssClass             s-media                Apply the media style
        * @cssClass             s-media-container       Apply on the HTMLElement that contains a media
        * 
        * @example        html         Default
        * <figure class="s-media-container">
        *   <img class="s-media" src="https://picsum.photos/1600/900?v=${Math.round(Math.random() * 99999)}" />
        * </figure>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
          * @name           s-media
          * @namespace          sugar.style.ui.media
          * @type           CssClass
          * 
          * This class represent a(n) "<s-color="accent">bare</s-color>" media
          * 
          * @example        html
          * <figure class="s-media-container">
          *   <img class="s-media" src="https://picsum.photos/1600/900?v=${Math.round(Math.random() * 99999)}" />
          * </figure>
          * 
          * @since    2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
          .s-media {
            @s.ui.media($scope: 'bare');
          }
      `, { type: 'CssClass' });
        vars.comment(() => `/**
          * @name           s-media-container
          * @namespace          sugar.style.ui.media
          * @type           CssClass
          * 
          * This class represent a(n) "<s-color="accent">bare</s-color>" media container
          * 
          * @example        html
          * <figure class="s-media-container">
          *   <img class="s-media" src="https://picsum.photos/1600/900?v=${Math.round(Math.random() * 99999)}" />
          * </figure>
          * 
          * @since    2.0.0
          * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
          .s-media-container {
          }
      `, { type: 'CssClass' });
    }
    if (finalParams.scope.includes('lnf')) {
        vars.comment(() => `/**
        * @name           s-media
        * @namespace          sugar.style.ui.media
        * @type           CssClass
        * 
        * This class represent a(n) "<s-color="accent">default</s-color>" media
        * 
        * @example        html
        * <figure class="s-media-container">
        *   <img class="s-media" src="https://picsum.photos/1600/900?v=${Math.round(Math.random() * 99999)}" />
        * </figure>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`).code(`
        .s-media:not(.s-bare) {
            @s.ui.media($scope: 'lnf');
        }
    `, { type: 'CssClass' });
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLHlDQUEwQyxTQUFRLFlBQVk7SUFDaEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7YUFDM0I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTUQsT0FBTyxFQUFFLHlDQUF5QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWxFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7eUVBNEIyRCxJQUFJLENBQUMsS0FBSyxDQUN2RSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUN4Qjs7Ozs7O0tBTUosQ0FDQSxDQUFDO0lBRUYsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7MkVBU3lELElBQUksQ0FBQyxLQUFLLENBQ3ZFLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQ3hCOzs7Ozs7UUFNSCxDQUNDLENBQUMsSUFBSSxDQUNGOzs7O09BSUwsRUFDSyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7OzsyRUFTeUQsSUFBSSxDQUFDLEtBQUssQ0FDdkUsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FDeEI7Ozs7OztRQU1ILENBQ0MsQ0FBQyxJQUFJLENBQ0Y7OztPQUdMLEVBQ0ssRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7S0FDTDtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7O3lFQVN1RCxJQUFJLENBQUMsS0FBSyxDQUN2RSxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsS0FBSyxDQUN4Qjs7Ozs7V0FLRSxDQUNGLENBQUMsSUFBSSxDQUNGOzs7O0tBSVAsRUFDTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztLQUNMO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9