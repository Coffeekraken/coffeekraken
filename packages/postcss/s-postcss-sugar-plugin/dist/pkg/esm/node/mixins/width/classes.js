import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @as              @sugar.width.classes
 * @namespace      node.mixin.width
 * @type           PostcssMixin
 * @platform      postcss
 * @interface     ./classes
 * @status        beta
 *
 * This mixin generate all the width helper classes like s-width:20, s-width:50, etc...
 * It will generate all the width defined in the config.theme.width configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.width.classes
 *
 * @example        css
 * \@sugar.width.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
    const widthObj = __STheme.get('width');
    vars.comment(`
      /**
        * @name          Widths
        * @namespace          sugar.style.helpers.width
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/widths
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some width to any HTMLElement.
        * These widths are defined in the \`theme.width\` theme settings.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.width.classes;
        * 
        ${Object.keys(widthObj).map((width) => {
        return ` * @cssClass             s-width:${width}            Apply the \`${width}\` width`;
    })}
        * 
        ${Object.keys(widthObj)
        .map((width) => {
        return ` * @example         html        ${width}%
                *   <div class="s-bg:main-surface s-radius:30">
                *      <div style="overflow:hidden" class="s-width:${width} s-text:center s-bg:accent s-p:30 s-radius:30">s-width:${width}</div>
                *   </div>`;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    vars.comment(`/**
    * @name            s-width:viewport
    * @namespace          sugar.style.helpers.width
    * @type             CssClass
    * @platform         css
    * @status         beta
    * 
    * This class allows you to apply the "<yellow>viewport</yellow>" width to any HTMLElement
    * 
    * @example      html
    * <div class="s-container">
    *   <h1 class="s-typo\:h1">Hello world</h1>
    *   <div class="s-width\:viewport">
    *       <p class="s-typo\:p">Something cool</p>
    *   </div>
    * </div>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .s-width-viewport {
        position: relative;
        left: 50%;
        width: 100vw;
        max-width: none;
        transform: translate(-50%);
   }`, { type: 'CssClass' });
    Object.keys(widthObj).forEach((name) => {
        vars.comment(`/**
        * @name            s-width:${name}
        * @namespace          sugar.style.helpers.width
        * @type             CssClass
        * @platform         css
        * @status           beta
        * 
        * This class allows you to apply the "<yellow>${name}</yellow>" width to any HTMLElement
        * 
        * @example      html
        * <div class="s-container">
        *   <h1 class="s-typo\:h1">Hello world</h1>
        *   <div class="s-width\:${name}">
        *       <p class="s-typo\:p">Something cool</p>
        *   </div>
        * </div>
        * 
        * @since        2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `).code(`
      .s-width-${name} {
            width: ${widthObj[name]};
            max-width: none;
            min-width: none;
      }`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLDRDQUE2QyxTQUFRLFlBQVk7SUFDbkUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsNENBQTRDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFckUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFdkMsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFvQlAsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtRQUNsQyxPQUFPLG9DQUFvQyxLQUFLLDJCQUEyQixLQUFLLFVBQVUsQ0FBQztJQUMvRixDQUFDLENBQUM7O1VBRUEsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDbEIsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPLG1DQUFtQyxLQUFLOztxRUFFTSxLQUFLLDBEQUEwRCxLQUFLOzJCQUM5RyxDQUFDO0lBQ2hCLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS2xCLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxPQUFPLENBQ1I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBb0JKLENBQ0MsQ0FBQyxJQUFJLENBQ0Y7Ozs7Ozs7S0FPSCxFQUNHLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO0lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsT0FBTyxDQUNSO3FDQUN5QixJQUFJOzs7Ozs7d0RBTWUsSUFBSTs7Ozs7bUNBS3pCLElBQUk7Ozs7Ozs7O1FBUS9CLENBQ0MsQ0FBQyxJQUFJLENBQ0Y7aUJBQ0ssSUFBSTtxQkFDQSxRQUFRLENBQUMsSUFBSSxDQUFDOzs7UUFHM0IsRUFDSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9