import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __keysFirst from '@coffeekraken/sugar/shared/array/keysFirst';
/**
 * @name           classes
 * @namespace      node.mixins.depth
 * @type           PostcssMixin
 * @platform      postcss
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
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginDepthClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const depthsObj = __STheme.config('depth');
    const depthsArray = __keysFirst(Object.keys(depthsObj), ['default']);
    const vars = new CssVars();
    vars.comment(() => `
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
        ${depthsArray
        .map((depthName) => {
        return [
            ` * @cssClass          s-depth:${depthName}      Apply the depth ${depthName} to any HTMLElement`,
            ` * @cssClass          s-depth:text:${depthName}      Apply the text depth ${depthName} to any HTMLElement`,
            ` * @cssClass          s-depth:box:${depthName}      Apply the depth ${depthName} to any HTMLElement`
        ].join('\n');
    })
        .join('\n')}
        *
        * @example        html
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Depths</h3>
        ${depthsArray
        .map((depthName) => {
        return ` * <div class="s-depth:${depthName} s-bg:main-surface s-mbe:100 s-text:center s-radius:30 s-p:30">
                    <span class="s-depth:text:${depthName}">s-depth:${depthName}    
                </div>`;
    })
        .join('\n')}
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    depthsArray.forEach((depthName) => {
        vars.comment(() => `/**
                * @name          s-depth:${depthName === 'default' ? '' : depthName}
                * @namespace          sugar.css.depth
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${depthName}</yellow>" depth style to any HTMLElement
                * 
                * @example        html
                * <a class="s-btn s-btn--primary s-depth:${depthName === 'default' ? '' : depthName}">I'm a cool depth button</a>
                */
                `).code(`
.s-depth${depthName === 'default' ? '' : `--${depthName}`}:not(.s-depth--text),
.s-depth--box.s-depth--${depthName === 'default' ? '' : `--${depthName}`} {
    @sugar.depth('${depthName}');
}`);
    });
    depthsArray.forEach((depthName) => {
        vars.comment(() => `/**
                * @name          s-depth:text:${depthName === 'default' ? '' : depthName}
                * @namespace          sugar.css.depth
                * @type               CssClass
                * @platform         css
                * @status           beta
                * 
                * This class allows you to apply a "<yellow>${depthName}</yellow>" depth style to any text
                * 
                * @example        html
                * <a class="s-btn s-btn--primary s-depth:text:${depthName === 'default' ? '' : depthName}">I'm a cool depth button</a>
                */
                `).code(`
.s-depth--text.s-depth${depthName === 'default' ? '' : `--${depthName}`} {
    @sugar.depth(${depthName}, $type: text);
}`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sNENBQTRDLENBQUM7QUFFckU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLHVDQUF3QyxTQUFRLFlBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsdUNBQXVDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFaEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUVyRSxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBaUJKLFdBQVc7U0FDUixHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLE9BQU87WUFDSCxpQ0FBaUMsU0FBUyx5QkFBeUIsU0FBUyxxQkFBcUI7WUFDakcsc0NBQXNDLFNBQVMsOEJBQThCLFNBQVMscUJBQXFCO1lBQzNHLHFDQUFxQyxTQUFTLHlCQUF5QixTQUFTLHFCQUFxQjtTQUN4RyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztVQUtiLFdBQVc7U0FDUixHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLE9BQU8sMEJBQTBCLFNBQVM7Z0RBQ1YsU0FBUyxhQUFhLFNBQVM7dUJBQ3hELENBQUM7SUFDWixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7S0FNbEIsQ0FDQSxDQUFDO0lBRUYsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQzlCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7MkNBQ3lCLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUzs7Ozs7OzhEQU1yQixTQUFTOzs7MkRBR1osU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTOztpQkFFbEYsQ0FDUixDQUFDLElBQUksQ0FBQztVQUNMLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7eUJBQ2hDLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7b0JBQ3BELFNBQVM7RUFDM0IsQ0FBQyxDQUFDO0lBQ0EsQ0FBQyxDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQztnREFDOEIsU0FBUyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTOzs7Ozs7OERBTTFCLFNBQVM7OztnRUFHUCxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7O2lCQUV2RixDQUNSLENBQUMsSUFBSSxDQUFDO3dCQUNTLFNBQVMsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7bUJBQ3BELFNBQVM7RUFDMUIsQ0FBQyxDQUFDO0lBQ0EsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=