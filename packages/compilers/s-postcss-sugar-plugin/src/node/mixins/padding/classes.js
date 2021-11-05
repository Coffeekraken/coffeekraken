import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
    const marginsObj = __STheme.config('padding');
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
            `* @cssClass     s-p:${spaceName}        Apply the \`${spaceName}\` padding all around`,
            `* @cssClass     s-pb:${spaceName}        Apply the \`${spaceName}\` block start and end padding`,
            `* @cssClass     s-pbs:${spaceName}        Apply the \`${spaceName}\` block start padding`,
            `* @cssClass     s-pbe:${spaceName}        Apply the \`${spaceName}\` block end padding`,
            `* @cssClass     s-pi:${spaceName}        Apply the \`${spaceName}\` inline start and end padding`,
            `* @cssClass     s-pis:${spaceName}        Apply the \`${spaceName}\` inline start padding`,
            `* @cssClass     s-pie:${spaceName}        Apply the \`${spaceName}\` inline end padding`,
            `* @cssClass     s-pb:-${spaceName}        Apply the \`${spaceName}\` negative block start and end padding`,
            `* @cssClass     s-pbs:-${spaceName}        Apply the \`${spaceName}\` negative block start padding`,
            `* @cssClass     s-pbe:-${spaceName}        Apply the \`${spaceName}\` negative block end padding`,
            `* @cssClass     s-pi:-${spaceName}        Apply the \`${spaceName}\` negative inline start and end padding`,
            `* @cssClass     s-pis:-${spaceName}        Apply the \`${spaceName}\` negative inline start padding`,
            `* @cssClass     s-pie:-${spaceName}        Apply the \`${spaceName}\` negative inline end padding`,
        ].join('\n');
    })
        .join('\n')}
        *
        * 
        * @example        html
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Padding inline</h3>
        *   <p class="s-bg:accent s-pi:30">${__faker.name.findName()}</p>
        *   <p class="s-bg:complementary s-pis:20 s-pie:50">${__faker.name.findName()}</p>
        *   <p class="s-bg:ui s-pie:30">${__faker.name.findName()}</p>
        *   <p class="s-bg:error s-pis:20 s-pie:40">${__faker.name.findName()}</p>
        * </div>
        * 
        * <div class="s-font:30 s-mbe:50" dir="rtl">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">RTL Support</h3>
        *   <p class="s-bg:accent s-pi:30">${__faker.name.findName()}</p>
        *   <p class="s-bg:complementary s-pis:20 s-pie:50">${__faker.name.findName()}</p>
        *   <p class="s-bg:ui s-pie:30">${__faker.name.findName()}</p>
        *   <p class="s-bg:error s-pis:20 s-pie:40">${__faker.name.findName()}</p>
        * </div>
        * 
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Padding Block</h3>
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
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZOztBQUN6RCxvREFBVSxHQUFHLEVBQUUsQ0FBQztBQUszQixPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRTlDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQWtCSixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUNwQixHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLElBQUksU0FBUyxLQUFLLFNBQVM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN2QyxPQUFPO1lBQ0gsdUJBQXVCLFNBQVMsdUJBQXVCLFNBQVMsdUJBQXVCO1lBQ3ZGLHdCQUF3QixTQUFTLHVCQUF1QixTQUFTLGdDQUFnQztZQUNqRyx5QkFBeUIsU0FBUyx1QkFBdUIsU0FBUyx3QkFBd0I7WUFDMUYseUJBQXlCLFNBQVMsdUJBQXVCLFNBQVMsc0JBQXNCO1lBQ3hGLHdCQUF3QixTQUFTLHVCQUF1QixTQUFTLGlDQUFpQztZQUNsRyx5QkFBeUIsU0FBUyx1QkFBdUIsU0FBUyx5QkFBeUI7WUFDM0Ys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