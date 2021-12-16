import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixins.truncate
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the truncate classes like s-truncate, s-truncate:2, etc...
 * The number of truncate classes generated is defined in the theme.helpers.truncate.count settings
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.truncate.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginRatioClassesInterface extends __SInterface {
    static get _definition() {
        return {
            count: {
                type: 'Number',
                default: __STheme.config('helpers.truncate.count'),
            },
        };
    }
}
export { postcssSugarPluginRatioClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ count: 10 }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Truncate
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/truncate
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to **truncate texts to a number of lines** on any HTMLElement
        * 
        * @support      chromium        14+
        * @support      firefox         68+    
        * @support      safari          5+
        * @support      edge            17+
        * 
        ${[...Array(finalParams.count).keys()].map((i) => {
        return ` * @cssClass        s-truncate:${i + 1}         Truncate the container to ${i + 1} line(s)`;
    })}
        *
        * @example        html
        ${[...Array(finalParams.count).keys()]
        .map((i) => {
        return ` * <!-- truncate ${i + 1} -->
            * <div class="s-mbe:50">
            *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Truncate to ${i + 1} line(s)</h3>
            *   <p class="s-typo:p s-truncate:${i + 1}">${__faker.lorem
            .lines(finalParams.count + 5)
            .split('\n')
            .join('<br />')}</p>
            * </div>
            * `;
    })
        .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    [...Array(finalParams.count).keys()].forEach((i) => {
        vars.comment(() => `/**
  * @name          s-truncate:${i}
  * @namespace          sugar.css.truncate
  * @type               CssClass
  * @platform             css
  * @status             beta
  * 
  * This class allows you to apply a "<yellow>${i + 1}</yellow>" line(s) truncate style to any HTMLElement
  * 
  * @example        html
  * <p class="s-typo:p s-truncate:${i}">${__faker.lorem
            .lines(finalParams.count + 5)
            .split('\n')
            .join('<br />')}</p>
  */
 `).code(`
.s-truncate--${i + 1} {
    @sugar.truncate(${i + 1});
}`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILE1BQU0sdUNBQXdDLFNBQVEsWUFBWTtJQUM5RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDO2FBQ3JEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSx1Q0FBdUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVoRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O1VBZ0JKLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDN0MsT0FBTyxrQ0FDSCxDQUFDLEdBQUcsQ0FDUixzQ0FBc0MsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0lBQzFELENBQUMsQ0FBQzs7O1VBR0EsQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDakMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDUCxPQUFPLG9CQUFvQixDQUFDLEdBQUcsQ0FBQzs7eUVBR2hDLENBQUMsR0FBRyxDQUNSO2dEQUNvQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLE9BQU8sQ0FBQyxLQUFLO2FBQ2xELEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQzthQUM1QixLQUFLLENBQUMsSUFBSSxDQUFDO2FBQ1gsSUFBSSxDQUFDLFFBQVEsQ0FBQzs7ZUFFcEIsQ0FBQztJQUNKLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS2xCLENBQ0EsQ0FBQztJQUVGLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDL0MsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQztnQ0FDYyxDQUFDOzs7Ozs7Z0RBTzNCLENBQUMsR0FBRyxDQUNSOzs7b0NBR2tDLENBQUMsS0FBSyxPQUFPLENBQUMsS0FBSzthQUN0QyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7YUFDNUIsS0FBSyxDQUFDLElBQUksQ0FBQzthQUNYLElBQUksQ0FBQyxRQUFRLENBQUM7O0VBRTdCLENBQ08sQ0FBQyxJQUFJLENBQUM7ZUFDQSxDQUFDLEdBQUcsQ0FBQztzQkFDRSxDQUFDLEdBQUcsQ0FBQztFQUN6QixDQUFDLENBQUM7SUFDQSxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==