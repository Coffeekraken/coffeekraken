import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @__name           classes
 * @__namespace      node.mixin.height
 * @__type           PostcssMixin
 * @__platform      postcss
 * @__status        wip
 *
 * This mixin generate all the height helper classes like s-height:20, s-height:50, etc...
 * It will generate all the height defined in the config.theme.height configuration stack
 *
 * @__return        {Css}         The generated css
 *
 * @__snippet         @sugar.height.classes
 *
 * @__example        css
 * \@sugar.height.classes;
 *
 * @__since       2.0.0
 * @__author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginWidthClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginWidthClassesMixinInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const heightObj = __STheme.get('height');
    vars.comment(`
      /**
        * @name          Height
        * @namespace          sugar.style.helpers.height
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/heights
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some height to any HTMLElement.
        * These widths are defined in the \`theme.height\` theme settings.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.height.classes; 
        * 
        ${Object.keys(heightObj).map((height) => {
        return ` * @cssClass             s-height:${height}            Apply the \`${height}\` height`;
    })}
        * 
        ${Object.keys(heightObj)
        .map((height) => {
        return ` * @example         html        ${height}%
                *   <div class="s-bg:main-surface s-radius:30" style="height:500px">
                *      <div style="overflow:hidden" class="s-height:${height} s-text:center s-bg:accent s-p:30 s-radius:30">s-height:${height}</div>
                *   </div>`;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(`/**
    * @name            s-height:viewport
    * @namespace          sugar.style.helpers.height
    * @type             CssClass
    * @platform         css
    * @status         beta
    * 
    * This class allows you to apply the "<yellow>viewport</yellow>" height to any HTMLElement
    * 
    * @example      html
    * <div class="s-container">
    *   <h1 class="s-typo:h1">Hello world</h1>
    *   <div class="s-height:viewport">
    *       <p class="s-typo:p">Something cool</p>
    *   </div>
    * </div>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .s-height--viewport {
        position: relative;
        left: 50%;
        height: 100vh;
        transform: translate(0, -50%);
   }`, { type: 'CssClass' });
    Object.keys(heightObj).forEach((name) => {
        vars.comment(`/**
        * @name            s-height:${name}
        * @namespace          sugar.style.helpers.height
        * @type             CssClass
        * @platform         css
        * @status           beta
        * 
        * This class allows you to apply the "<yellow>${name}</yellow>" height to any HTMLElement
        * 
        * @example      html
        * <div class="s-container" style="height:500px">
        *   <h1 class="s-typo:h1">Hello world</h1>
        *   <div class="s-height:${name}">
        *       <p class="s-typo:p">Something cool</p>
        *   </div>
        * </div>
        * 
        * @since        2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
      .s-height--${name} {
            height: ${heightObj[name]};
      }`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZO0lBQ25FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLDRDQUE0QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXJFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRXpDLElBQUksQ0FBQyxPQUFPLENBQ1I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBb0JFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDcEMsT0FBTyxxQ0FBcUMsTUFBTSwyQkFBMkIsTUFBTSxXQUFXLENBQUM7SUFDbkcsQ0FBQyxDQUFDOztVQUVBLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ25CLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ1osT0FBTyxtQ0FBbUMsTUFBTTs7c0VBRU0sTUFBTSwyREFBMkQsTUFBTTsyQkFDbEgsQ0FBQztJQUNoQixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtsQixDQUNBLENBQUM7SUFFRixJQUFJLENBQUMsT0FBTyxDQUNSOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW9CSixDQUNDLENBQUMsSUFBSSxDQUNGOzs7Ozs7S0FNSCxFQUNHLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNwQyxJQUFJLENBQUMsT0FBTyxDQUNSO3NDQUMwQixJQUFJOzs7Ozs7d0RBTWMsSUFBSTs7Ozs7bUNBS3pCLElBQUk7Ozs7Ozs7O1FBUS9CLENBQ0MsQ0FBQyxJQUFJLENBQ0Y7bUJBQ08sSUFBSTtzQkFDRCxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQzdCLEVBQ0ksRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==