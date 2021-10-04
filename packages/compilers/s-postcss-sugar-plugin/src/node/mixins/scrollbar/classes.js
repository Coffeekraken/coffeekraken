import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixins.scale
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the scale helper classes like s-scale:01, s-scale:12, etc.
 * The generated scales are specified in the config.theme.scale configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.scale.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginScaleClassesInterface extends __SInterface {
}
postcssSugarPluginScaleClassesInterface.definition = {};
export { postcssSugarPluginScaleClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const scaleObj = __theme().config('ui.scrollbar');
    const vars = [];
    vars.push(`
      /**
        * @name          Scrollbar
        * @namespace          sugar.css.tools
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/scrollbar
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply a custom scrollbar that follows your theme settings.
        * It is based on the \`theme.ui.scrollbar\` settings.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass     s-scrollbar         Apply the custom scrollbar
        * 
        * @example        html
        * <!-- scrollbar vertical -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30"><Vertical</h3>
        *   <div class="s-scrollbar" style="height:50px; overflow: auto;">
        *       ${[...Array(20)].map((l) => `${__faker.name.findName()}<br>`)}
        *   </div>
        * </div>
        * 
        * <!-- scrollbar orizontal -->
        * <div class="s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30"><Horizontal</h3>
        *   <div class="s-scrollbar" style="white-space:nowrap; height: 30px; overflow: auto;">
        *       ${__faker.lorem.paragraphs(3)}
        *   </div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    vars.push(`/**
            * @name          s-scrollbar
            * @namespace          sugar.css.scrollbar
            * @type               CssClass
            * @platform             css
            * @status             beta
            * 
            * This class allows to apply the custom scrollbar on any HTMLElement.
            * This scrollbar is defined in the \`theme.ui.scrollbar\` settings.
            * 
            * @example        html
            * <div class="s-scrollbar" style="height:50px">
            *    ${__faker.lorem.paragraphs(3)}
            * </div>
            * 
            * since           2.0.0
            * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
            */
            .s-scrollbar {
                @sugar.scrollbar();
            }`);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sdUNBQXdDLFNBQVEsWUFBWTs7QUFDdkQsa0RBQVUsR0FBRyxFQUFFLENBQUM7QUFLM0IsT0FBTyxFQUFFLHVDQUF1QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWhFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLFFBQVEsR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFbEQsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkF3QkksQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7Ozs7Ozs7O2tCQVEzRCxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Ozs7Ozs7S0FPeEMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O21CQVlLLE9BQU8sQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7Y0FRaEMsQ0FBQyxDQUFDO0lBRVosV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==