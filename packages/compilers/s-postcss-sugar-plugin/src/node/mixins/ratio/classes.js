import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @namespace      node.mixins.ratio
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the ratio helper classes like s-ratio:16-9, s-ratio:1, etc.
 * The generated ratios are specified in the config.theme.ratio configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.ratio.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginRatioClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginRatioClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ ratio: 1 }, params);
    const ratioObj = __STheme.config('ratio');
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Ratio
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/ratio
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some ratio to any HTMLElement.
        * **These classes make use of the \`aspect-ratio\` css property**
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${Object.keys(ratioObj)
        .map((ratioName) => {
        return ` * @cssClass     s-ratio:${ratioName.replace('/', '-')}
                }            Apply the ${ratioName} ratio`;
    })
        .join('\n')}
        * 
        * @example        html
        ${Object.keys(ratioObj)
        .map((ratioName) => {
        return ` * <!-- ${ratioName} ratio -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${ratioName} ratio</h3>
            *   <div class="s-ratio\:${ratioName.replace('/', '-')} s-width:40">
            *       <img class="s-fit\:cover" src="https://picsum.photos/500/500" />
            *   </div>
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    Object.keys(ratioObj).forEach((ratioName) => {
        const ratioValue = ratioObj[ratioName];
        vars.comment(() => `/**
  * @name          s-ratio:${ratioName.replace('/', '-')}
  * @namespace          sugar.css.ratio
  * @type               CssClass
  * @platform             css
  * @status             beta
  * 
  * This class allows you to apply a "<yellow>${ratioName}</yellow>" ratio style to any HTMLElement
  * 
  * @example        html
  * <div class="s-ratio\:${ratioName.replace('/', '-')} s-bg:accent">
  *     <div class="s-center-abs">I'm a cool ratio container</div>
  * </div>
  */
 `).code(`
.s-ratio--${ratioName.replace('/', '-')} {
    @sugar.ratio(${ratioValue});
}`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaUJHO0FBRUgsTUFBTSx1Q0FBd0MsU0FBUSxZQUFZO0lBQzlELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBTUQsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWhFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxDQUFDLElBQ0wsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTFDLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFpQkosTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDbEIsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixPQUFPLDRCQUE0QixTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7eUNBQ3JDLFNBQVMsUUFBUSxDQUFDO0lBQy9DLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7OztVQUdiLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1NBQ2xCLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ2YsT0FBTyxXQUFXLFNBQVM7OzZEQUVrQixTQUFTO3VDQUMvQixTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7ZUFJbkQsQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS2xCLENBQ0EsQ0FBQztJQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDeEMsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7NkJBQ1csU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOzs7Ozs7Z0RBTVIsU0FBUzs7OzJCQUc5QixTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7RUFJcEQsQ0FDTyxDQUFDLElBQUksQ0FBQztZQUNILFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzttQkFDcEIsVUFBVTtFQUMzQixDQUFDLENBQUM7SUFDQSxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==