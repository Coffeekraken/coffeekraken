import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           classes
 * @as              @sugar.ratio.classes
 * @namespace      node.mixin.ratio
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the ratio helper classes like s-ratio:16-9, s-ratio:1, etc.
 * The generated ratios are specified in the config.theme.ratio configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.ratio.classes
 *
 * @example        css
 * \@sugar.ratio.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginRatioClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginRatioClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ ratio: 1 }, params);
    const ratioObj = __STheme.get('ratio');
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Ratio
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/ratio
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply some ratio to any HTMLElement.
        * **These classes make use of the \`aspect-ratio\` css property**
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.ratio.classes;
        * 
        * .my-element {
        *   \\@sugar.ratio(16/9);
        * } 
        * 
        ${Object.keys(ratioObj)
        .map((ratioName) => {
        return ` * @cssClass     s-ratio:${ratioName.replace('/', '-')}             Apply the ${ratioName} ratio`;
    })
        .join('\n')}
        * 
        ${Object.keys(ratioObj)
        .map((ratioName) => {
        return ` * @example             html        ${ratioName}
            *   <div class="s-ratio\:${ratioName.replace('/', '-')} s-width:40">
            *       <img class="s-fit\:cover s-radius" src="https://picsum.photos/500/500" />
            *   </div>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    Object.keys(ratioObj).forEach((ratioName) => {
        const ratioValue = ratioObj[ratioName];
        vars.comment(() => `/**
  * @name          s-ratio:${ratioName.replace('/', '-')}
  * @namespace          sugar.style.ratio
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
}`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sdUNBQXdDLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSx1Q0FBdUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVoRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsQ0FBQyxJQUNMLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV2QyxNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXdCSixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNsQixHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLE9BQU8sNEJBQTRCLFNBQVMsQ0FBQyxPQUFPLENBQ2hELEdBQUcsRUFDSCxHQUFHLENBQ04sMEJBQTBCLFNBQVMsUUFBUSxDQUFDO0lBQ2pELENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7O1VBRWIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDbEIsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixPQUFPLHVDQUF1QyxTQUFTO3VDQUNoQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7OztlQUduRCxDQUFDO0lBQ0osQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7S0FLbEIsQ0FDQSxDQUFDO0lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUN4QyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs2QkFDVyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7OztnREFNUixTQUFTOzs7MkJBRzlCLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzs7OztFQUlwRCxDQUNPLENBQUMsSUFBSSxDQUNGO1lBQ0EsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO21CQUNwQixVQUFVO0VBQzNCLEVBQ1UsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==