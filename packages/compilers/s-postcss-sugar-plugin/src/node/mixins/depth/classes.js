import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @namespace      node.mixins.depth
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to generate all the depth helper classes like s-depth:20, etc...
 *
 * @return        {Css}        The generated css
 *
 * @example         postcss
 * \@sugar.depth.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginDepthClassesInterface extends __SInterface {
}
postcssSugarPluginDepthClassesInterface.definition = {};
export { postcssSugarPluginDepthClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const depthsObj = __STheme.config('depth');
    const vars = [];
    vars.push(`
      /**
        * @name          Depth
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/depth
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some depth shadows to any HTMLElement.
        * These depths are defined in the theme configuration under \`theme.depth\` namespace.
        * 
        * @support      chromium        
        * @support      firefox         
        * @support      safari          
        * @support      edge           
        * 
        ${Object.keys(depthsObj)
        .map((depthName) => {
        return ` * @cssClass          s-depth:${depthName}      Apply the depth ${depthName} to any HTMLElement`;
    })
        .join('\n')}
        *
        * @example        html
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Depths</h3>
        ${Object.keys(depthsObj)
        .map((depthName) => {
        return ` * <div class="s-depth:${depthName} s-bg:main-surface s-mbe:100 s-text:center s-radius:30 s-p:30">s-depth:${depthName}</div>`;
    })
        .join('\n')}
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    Object.keys(depthsObj).forEach((depthName) => {
        const depthCss = `/**
  * @name          s-depth:${depthName}
  * @namespace          sugar.css.depth
  * @type               CssClass
  * @platform         css
  * @status           beta
  * 
  * This class allows you to apply a "<yellow>${depthName}</yellow>" depth style to any HTMLElement
  * 
  * @example        html
  * <a class="s-btn s-btn--primary s-depth\:${depthName}">I'm a cool depth button</a>
  */
.s-depth--${depthName} {
    @sugar.depth(${depthName});
}`;
        vars.push(depthCss);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLHVDQUF3QyxTQUFRLFlBQVk7O0FBQ3ZELGtEQUFVLEdBQUcsRUFBRSxDQUFDO0FBSzNCLE9BQU8sRUFBRSx1Q0FBdUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVoRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUzQyxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFpQkosTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDbkIsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixPQUFPLGlDQUFpQyxTQUFTLHlCQUF5QixTQUFTLHFCQUFxQixDQUFDO0lBQzdHLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O1VBS2IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDbkIsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixPQUFPLDBCQUEwQixTQUFTLDBFQUEwRSxTQUFTLFFBQVEsQ0FBQztJQUMxSSxDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7S0FNbEIsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUN6QyxNQUFNLFFBQVEsR0FBRzs2QkFDSSxTQUFTOzs7Ozs7Z0RBTVUsU0FBUzs7OzhDQUdYLFNBQVM7O1lBRTNDLFNBQVM7bUJBQ0YsU0FBUztFQUMxQixDQUFDO1FBQ0ssSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN4QixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==