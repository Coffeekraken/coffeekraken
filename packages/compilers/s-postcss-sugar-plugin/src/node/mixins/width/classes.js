import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @namespace      node.mixins.width
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the width helper classes like s-width:20, s-width:50, etc...
 * It will generate all the width defined in the config.theme.width configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.width.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginWidthClassesMixinInterface extends __SInterface {
    static get definition() {
        return {};
    }
}
export { postcssSugarPluginWidthClassesMixinInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const widthObj = __STheme.config('width');
    vars.push(`
      /**
        * @name          Widths
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/widths
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some width to any HTMLElement.
        * These widths are defined in the \`theme.width\` theme settings.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${Object.keys(widthObj).map((width) => {
        return ` * @cssClass             s-width:${width}            Apply the \`${width}\` width`;
    })}
        * 
        * @example        html
        ${Object.keys(widthObj)
        .map((width) => {
        return `
                * <!-- ${width} -->
                * <div class="s-mbe:50">
                *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${width} width</h3>
                *   <div class="s-bg:main s-radius:30">
                *      <div style="overflow:hidden" class="s-width:${width} s-text:center s-bg:accent s-p:30 s-radius:30">s-width:${width}</div>
                *   </div>
                * </div>`;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    vars.push(`/**
    * @name            s-width:viewport
    * @namespace        sugar.css.width
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-width--viewport {
        position: relative;
        left: 50%;
        width: 100vw;
        transform: translate(-50%);
   }`);
    Object.keys(widthObj).forEach((name) => {
        vars.push(`/**
        * @name            s-width:${name}
        * @namespace        sugar.css.width
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
      .s-width--${name} {
            width: ${widthObj[name]};
      }`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZO0lBQ25FLE1BQU0sS0FBSyxVQUFVO1FBQ2pCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLDRDQUE0QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXJFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztVQWlCSixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1FBQ2xDLE9BQU8sb0NBQW9DLEtBQUssMkJBQTJCLEtBQUssVUFBVSxDQUFDO0lBQy9GLENBQUMsQ0FBQzs7O1VBR0EsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDbEIsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7UUFDWCxPQUFPO3lCQUNFLEtBQUs7O2lFQUVtQyxLQUFLOztxRUFFRCxLQUFLLDBEQUEwRCxLQUFLOzt5QkFFaEgsQ0FBQztJQUNkLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS2xCLENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F5QlQsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUNuQyxJQUFJLENBQUMsSUFBSSxDQUFDO3FDQUNtQixJQUFJOzs7Ozs7d0RBTWUsSUFBSTs7Ozs7bUNBS3pCLElBQUk7Ozs7Ozs7O2tCQVFyQixJQUFJO3FCQUNELFFBQVEsQ0FBQyxJQUFJLENBQUM7UUFDM0IsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=