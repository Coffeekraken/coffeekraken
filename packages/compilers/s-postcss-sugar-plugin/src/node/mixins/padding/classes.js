import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixins.padding
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the padding helper classes like s-p:10, s-pie:40, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.padding.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginPaddingClassesInterface extends __SInterface {
}
postcssSugarPluginPaddingClassesInterface.definition = {};
export { postcssSugarPluginPaddingClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const marginsObj = __theme().config('padding');
    vars.push(`
      /**
        * @name          Padding
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/padding
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply padding to any HTMLElement
        * 
        * @feature          Support for RTL by using padding-{inline|block}-...
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        ${Object.keys(marginsObj)
        .map((spaceName) => {
        if (spaceName === 'default')
            return '';
        return [
            `* @cssClass     s-p:${spaceName}        Apply the ${spaceName} padding all around`,
            `* @cssClass     s-pb:${spaceName}        Apply the ${spaceName} block start and end padding`,
            `* @cssClass     s-pbs:${spaceName}        Apply the ${spaceName} block start padding`,
            `* @cssClass     s-pbe:${spaceName}        Apply the ${spaceName} block end padding`,
            `* @cssClass     s-pi:${spaceName}        Apply the ${spaceName} inline start and end padding`,
            `* @cssClass     s-pis:${spaceName}        Apply the ${spaceName} inline start padding`,
            `* @cssClass     s-pie:${spaceName}        Apply the ${spaceName} inline end padding`,
            `* @cssClass     s-pb:-${spaceName}        Apply the ${spaceName} negative block start and end padding`,
            `* @cssClass     s-pbs:-${spaceName}        Apply the ${spaceName} negative block start padding`,
            `* @cssClass     s-pbe:-${spaceName}        Apply the ${spaceName} negative block end padding`,
            `* @cssClass     s-pi:-${spaceName}        Apply the ${spaceName} negative inline start and end padding`,
            `* @cssClass     s-pis:-${spaceName}        Apply the ${spaceName} negative inline start padding`,
            `* @cssClass     s-pie:-${spaceName}        Apply the ${spaceName} negative inline end padding`,
        ].join('\n');
    })
        .join('\n')}
        *
        * 
        * @example        html
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-color:accent s-font:30 s-mbe:30">Padding inline</h3>
        *   <p class="s-bg:accent s-pi:30">${__faker.name.findName()}</p>
        *   <p class="s-bg:complementary s-pis:20 s-pie:50">${__faker.name.findName()}</p>
        *   <p class="s-bg:ui s-pie:30">${__faker.name.findName()}</p>
        *   <p class="s-bg:error s-pis:20 s-pie:40">${__faker.name.findName()}</p>
        * </div>
        * 
        * <div class="s-font:30 s-mbe:50" dir="rtl">
        *   <h3 class="s-color:accent s-font:30 s-mbe:30">RTL Support</h3>
        *   <p class="s-bg:accent s-pi:30">${__faker.name.findName()}</p>
        *   <p class="s-bg:complementary s-pis:20 s-pie:50">${__faker.name.findName()}</p>
        *   <p class="s-bg:ui s-pie:30">${__faker.name.findName()}</p>
        *   <p class="s-bg:error s-pis:20 s-pie:40">${__faker.name.findName()}</p>
        * </div>
        * 
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-color:accent s-font:30 s-mbe:30">Padding Block</h3>
        *   <div class="s-bg:accent s-pbe:40 s-text:center">${__faker.name.findName()}</div>
        *   <div class="s-bg:complementary s-pb:30 s-text:center">${__faker.name.findName()}</div>
        *   <div class="s-bg:ui s-pbs:20 s-pbe:10 s-text:center">${__faker.name.findName()}</div>
        *   <div class="s-bg:error s-pbs:20 s-pbe:60 s-text:center">${__faker.name.findName()}</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    Object.keys(marginsObj).forEach((spaceName) => {
        // margins
        const clsMargin = `s-p:${spaceName}`;
        vars.push(`/**
    * @name            ${clsMargin}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" padding style around any HTMLElement
    * 
    * @example      html
    * <span class="${clsMargin.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMargin.replace(':', '--')} {
        padding: sugar.padding(${spaceName});
   }`);
        const clsMarginTop = `s-pbs:${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginTop}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block start padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginTop.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginTop.replace(':', '--')} {
        padding-block-start: sugar.padding(${spaceName}) !important;
   }`);
        const clsMarginBottom = `s-pbe:${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginBottom}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block end padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginBottom.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginBottom.replace(':', '--')} {
        padding-block-end: sugar.padding(${spaceName}) !important;
   }`);
        const clsMarginLeft = `s-pis:${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginLeft}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline start padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginLeft.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginLeft.replace(':', '--')} {
        padding-inline-start: sugar.padding(${spaceName}) !important;
   }`);
        const clsMarginRight = `s-pie:${spaceName}`;
        vars.push(`/**
    * @name            .${clsMarginRight}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline end padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginRight.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginRight.replace(':', '--')} {
        padding-inline-end: sugar.padding(${spaceName}) !important;
   }`);
        const clsMarginX = `s-pi:${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginX}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline start and end padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginX.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
     .${clsMarginX.replace(':', '--')} {
        padding-inline-start: sugar.padding(${spaceName}) !important;
        padding-inline-end: sugar.padding(${spaceName}) !important;
   }`);
        const clsMarginY = `s-pb:${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginY}
    * @namespace        sugar.css.padding
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block start and end padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginY.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginY.replace(':', '--')} {
        padding-block-start: sugar.padding(${spaceName}) !important;
        padding-block-end: sugar.padding(${spaceName}) !important;
   }`);
    });
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZOztBQUN6RCxvREFBVSxHQUFHLEVBQUUsQ0FBQztBQUszQixPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLFVBQVUsR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFL0MsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBa0JKLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3BCLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ2YsSUFBSSxTQUFTLEtBQUssU0FBUztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE9BQU87WUFDSCx1QkFBdUIsU0FBUyxxQkFBcUIsU0FBUyxxQkFBcUI7WUFDbkYsd0JBQXdCLFNBQVMscUJBQXFCLFNBQVMsOEJBQThCO1lBQzdGLHlCQUF5QixTQUFTLHFCQUFxQixTQUFTLHNCQUFzQjtZQUN0Rix5QkFBeUIsU0FBUyxxQkFBcUIsU0FBUyxvQkFBb0I7WUFDcEYsd0JBQXdCLFNBQVMscUJBQXFCLFNBQVMsK0JBQStCO1lBQzlGLHlCQUF5QixTQUFTLHFCQUFxQixTQUFTLHVCQUF1QjtZQUN2Rix5QkFBeUIsU0FBUyxxQkFBcUIsU0FBUyxxQkFBcUI7WUFDckYseUJBQXlCLFNBQVMscUJBQXFCLFNBQVMsdUNBQXVDO1lBQ3ZHLDBCQUEwQixTQUFTLHFCQUFxQixTQUFTLCtCQUErQjtZQUNoRywwQkFBMEIsU0FBUyxxQkFBcUIsU0FBUyw2QkFBNkI7WUFDOUYseUJBQXlCLFNBQVMscUJBQXFCLFNBQVMsd0NBQXdDO1lBQ3hHLDBCQUEwQixTQUFTLHFCQUFxQixTQUFTLGdDQUFnQztZQUNqRywwQkFBMEIsU0FBUyxxQkFBcUIsU0FBUyw4QkFBOEI7U0FDbEcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakIsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OzZDQU1zQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs4REFDTixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTswQ0FDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7c0RBQ1gsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7OzZDQUtoQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs4REFDTixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTswQ0FDM0MsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7c0RBQ1gsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7OzhEQUtmLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO29FQUNqQixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTttRUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7c0VBQ3BCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7S0FNeEYsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUMxQyxVQUFVO1FBQ1YsTUFBTSxTQUFTLEdBQUcsT0FBTyxTQUFTLEVBQUUsQ0FBQztRQUNyQyxJQUFJLENBQUMsSUFBSSxDQUFDO3lCQUNPLFNBQVM7Ozs7OztvREFNa0IsU0FBUzs7O3FCQUd4QyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7O01BSzFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQztpQ0FDRCxTQUFTO0tBQ3JDLENBQUMsQ0FBQztRQUNDLE1BQU0sWUFBWSxHQUFHLFNBQVMsU0FBUyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDTyxZQUFZOzs7Ozs7b0RBTWUsU0FBUzs7O3FCQUd4QyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7O01BSzdDLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQzs2Q0FDUSxTQUFTO0tBQ2pELENBQUMsQ0FBQztRQUNDLE1BQU0sZUFBZSxHQUFHLFNBQVMsU0FBUyxFQUFFLENBQUM7UUFDN0MsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDTyxlQUFlOzs7Ozs7b0RBTVksU0FBUzs7O3FCQUd4QyxlQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7O01BS2hELGVBQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQzsyQ0FDRyxTQUFTO0tBQy9DLENBQUMsQ0FBQztRQUNDLE1BQU0sYUFBYSxHQUFHLFNBQVMsU0FBUyxFQUFFLENBQUM7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDTyxhQUFhOzs7Ozs7b0RBTWMsU0FBUzs7O3FCQUd4QyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7O01BSzlDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQzs4Q0FDUSxTQUFTO0tBQ2xELENBQUMsQ0FBQztRQUNDLE1BQU0sY0FBYyxHQUFHLFNBQVMsU0FBUyxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQzswQkFDUSxjQUFjOzs7Ozs7b0RBTVksU0FBUzs7O3FCQUd4QyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7O01BSy9DLGNBQWMsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQzs0Q0FDSyxTQUFTO0tBQ2hELENBQUMsQ0FBQztRQUNDLE1BQU0sVUFBVSxHQUFHLFFBQVEsU0FBUyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDTyxVQUFVOzs7Ozs7b0RBTWlCLFNBQVM7OztxQkFHeEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOzs7OztRQUt6QyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7OENBQ1MsU0FBUzs0Q0FDWCxTQUFTO0tBQ2hELENBQUMsQ0FBQztRQUNDLE1BQU0sVUFBVSxHQUFHLFFBQVEsU0FBUyxFQUFFLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQzt5QkFDTyxVQUFVOzs7Ozs7b0RBTWlCLFNBQVM7OztxQkFHeEMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOzs7OztNQUszQyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUM7NkNBQ1UsU0FBUzsyQ0FDWCxTQUFTO0tBQy9DLENBQUMsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==