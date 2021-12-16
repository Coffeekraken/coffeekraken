import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixins.scale
 * @type           PostcssMixin
 * @platform      postcss
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
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginScaleClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const scaleObj = __STheme.config('ui.scrollbar');
    const vars = new CssVars();
    vars.comment(() => `
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
    vars.comment(() => `/**
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
        `).code(`
            .s-scrollbar {
                @sugar.scrollbar();
            }`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sdUNBQXdDLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSx1Q0FBdUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVoRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFakQsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBd0JJLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDOzs7Ozs7OztrQkFRM0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDOzs7Ozs7O0tBT3hDLENBQ0EsQ0FBQztJQUVGLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7OzttQkFZSyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Ozs7OztTQU1yQyxDQUNKLENBQUMsSUFBSSxDQUFDOzs7Y0FHRyxDQUFDLENBQUM7SUFFWixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=