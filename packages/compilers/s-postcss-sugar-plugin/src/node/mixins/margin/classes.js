import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixins.margin
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the margin helper classes like s-mie10, s-mis:40, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.margin.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginMarginClassesInterface extends __SInterface {
}
postcssSugarPluginMarginClassesInterface.definition = {};
export { postcssSugarPluginMarginClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const marginsObj = __theme().config('margin');
    vars.push(`
      /**
        * @name          Margin
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/margin
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply margins to any HTMLElement
        * 
        * @feature          Support for RTL by using margin-{inline|block}-...
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
            `* @cssClass     s-m:${spaceName}        Apply the \`${spaceName}\` space all around`,
            `* @cssClass     s-mb:${spaceName}        Apply the \`${spaceName}\` block start and end space`,
            `* @cssClass     s-mbs:${spaceName}        Apply the \`${spaceName}\` block start space`,
            `* @cssClass     s-mbe:${spaceName}        Apply the \`${spaceName}\` block end space`,
            `* @cssClass     s-mi:${spaceName}        Apply the \`${spaceName}\` inline start and end space`,
            `* @cssClass     s-mis:${spaceName}        Apply the \`${spaceName}\` inline start space`,
            `* @cssClass     s-mie:${spaceName}        Apply the \`${spaceName}\` inline end space`,
            `* @cssClass     s-mb:-${spaceName}        Apply the \`${spaceName}\` negative block start and end space`,
            `* @cssClass     s-mbs:-${spaceName}        Apply the \`${spaceName}\` negative block start space`,
            `* @cssClass     s-mbe:-${spaceName}        Apply the \`${spaceName}\` negative block end space`,
            `* @cssClass     s-mi:-${spaceName}        Apply the \`${spaceName}\` negative inline start and end space`,
            `* @cssClass     s-mis:-${spaceName}        Apply the \`${spaceName}\` negative inline start space`,
            `* @cssClass     s-mie:-${spaceName}        Apply the \`${spaceName}\` negative inline end space`,
        ].join('\n');
    })
        .join('\n')}
        * @cssClass                s-m:auto            Apply the \`auto\` space all around
        * @cssClass                s-mb:auto          Apply the \`auto\` block start and end space
        * @cssClass                s-mbs:auto          Apply the \`auto\` block start space
        * @cssClass                s-mbe:auto          Apply the \`auto\` block end space
        * @cssClass                s-mi:auto          Apply the \`auto\` inline start and end space
        * @cssClass                s-mis:auto          Apply the \`auto\` inline start space
        * @cssClass                s-mie:auto          Apply the \`auto\` inline end space
        *
        * 
        * @example        html
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Margin inline</h3>
        *   <p class="s-bg:accent s-p:20 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bg:complementary s-mi:50 s-mbe:20 s-p:20">${__faker.name.findName()}</p>
        *   <p class="s-bg:ui s-mie:100 s-mbe:20 s-p:20">${__faker.name.findName()}</p>
        *   <p class="s-bg:error s-mie:30 s-p:20">${__faker.name.findName()}</p>
        * </div>
        * 
        * <div class="s-font:30 s-mbe:50" dir="rtl">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">RTL Support</h3>
        *   <p class="s-bg:accent s-p:20 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bg:complementary s-mi:50 s-mbe:20 s-p:20">${__faker.name.findName()}</p>
        *   <p class="s-bg:ui s-mie:100 s-mbe:20 s-p:20">${__faker.name.findName()}</p>
        *   <p class="s-bg:error s-mie:30 s-p:20">${__faker.name.findName()}</p>
        * </div>
        * 
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Margin Block</h3>
        *   <div class="s-bg:accent s-mbe:40 s-p:20 s-text:center">${__faker.name.findName()}</div>
        *   <div class="s-bg:complementary s-mbe:20 s-p:20 s-text:center">${__faker.name.findName()}</div>
        *   <div class="s-bg:ui s-mbe:50 s-p:20 s-text:center">${__faker.name.findName()}</div>
        *   <div class="s-bg:error s-p:20 s-text:center">${__faker.name.findName()}</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    Object.keys(marginsObj).forEach((spaceName) => {
        // margins
        const clsMargin = `s-m:${spaceName}`;
        vars.push(`/**
    * @name            ${clsMargin}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="${clsMargin.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMargin.replace(':', '--')} {
        margin: sugar.margin(${spaceName});
   }`);
        const clsMarginTop = `s-mbs:${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginTop}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block start margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginTop.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginTop.replace(':', '--')} {
        margin-block-start: sugar.margin(${spaceName}) !important;
   }`);
        const clsMarginBottom = `s-mbe:${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginBottom}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block end margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginBottom.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginBottom.replace(':', '--')} {
        margin-block-end: sugar.margin(${spaceName}) !important;
   }`);
        const clsMarginLeft = `s-mis:${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginLeft}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline start margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginLeft.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginLeft.replace(':', '--')} {
        margin-inline-start: sugar.margin(${spaceName}) !important;
   }`);
        const clsMarginRight = `s-mie:${spaceName}`;
        vars.push(`/**
    * @name            .${clsMarginRight}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline end margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginRight.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginRight.replace(':', '--')} {
        margin-inline-end: sugar.margin(${spaceName}) !important;
   }`);
        const clsMarginX = `s-mi:${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginX}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline start and end margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginX.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
     .${clsMarginX.replace(':', '--')} {
        margin-inline-start: sugar.margin(${spaceName}) !important;
        margin-inline-end: sugar.margin(${spaceName}) !important;
   }`);
        const clsMarginY = `s-mb:${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginY}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block start and end margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginY.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginY.replace(':', '--')} {
        margin-block-start: sugar.margin(${spaceName}) !important;
        margin-block-end: sugar.margin(${spaceName}) !important;
   }`);
    });
    // negatives
    Object.keys(marginsObj).forEach((spaceName) => {
        // margins
        const clsMargin = `s-m:-${spaceName}`;
        vars.push(`/**
    * @name            ${clsMargin}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>-${spaceName}</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="${clsMargin.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMargin.replace(':', '--')} {
        margin: calc(sugar.margin(${spaceName}) * -1);
   }`);
        const clsMarginTop = `s-mbs:-${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginTop}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>-${spaceName}</yellow>" block start margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginTop.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginTop.replace(':', '--')} {
        margin-block-start: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
        const clsMarginBottom = `s-mbe:-${spaceName}`;
        vars.push(`/**
    * @name            .${clsMarginBottom}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>-${spaceName}</yellow>" block end margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginBottom.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginBottom.replace(':', '--')} {
        margin-block-end: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
        const clsMarginLeft = `s-mis:-${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginLeft}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>-${spaceName}</yellow>" inline start margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginLeft.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginLeft.replace(':', '--')} {
        margin-inline-start: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
        const clsMarginRight = `s-mie:-${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginRight}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>-${spaceName}</yellow>" inline end margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginRight.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginRight.replace(':', '--')} {
        margin-inline-end: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
        const clsMarginX = `s-mi:-${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginX}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>-${spaceName}</yellow>" inline start and end margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginX.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
     .${clsMarginX.replace(':', '--')} {
        margin-inline-start: calc(sugar.margin(${spaceName}) * -1) !important;
        margin-inline-end: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
        const clsMarginY = `s-mb:-${spaceName}`;
        vars.push(`/**
    * @name            ${clsMarginY}
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>-${spaceName}</yellow>" block start and end margin style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginY.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .${clsMarginY.replace(':', '--')} {
        margin-block-start: calc(sugar.margin(${spaceName}) * -1) !important;
        margin-block-end: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
    });
    vars.push(`/**
    * @name            s-m:auto
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-m:auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-m--auto {
        margin: auto;
   }`);
    vars.push(`/**
    * @name            s-mbs:auto
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" block start margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mbs:auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-mbs--auto {
        margin-block-start: auto;
   }`);
    vars.push(`/**
    * @name            s-mie:auto
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" inline end margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mie:auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-mie--auto {
        margin-inline-end: auto;
   }`);
    vars.push(`/**
    * @name            s-mbe:auto
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" block end margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mbe:auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-mbe--auto {
        margin-block-end: auto;
   }`);
    vars.push(`/**
    * @name            s-mis:auto
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" inline start margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mis:auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-mis--auto {
        margin-inline-start: auto;
   }`);
    vars.push(`/**
    * @name            s-mi:auto
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" inline start and end margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mi:auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-mi--auto {
        margin-inline-start: auto;
        margin-inline-end: auto;
   }`);
    vars.push(`/**
    * @name            s-mb:auto
    * @namespace        sugar.css.margin
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>auto</yellow>" block start and end margin style around any HTMLElement
    * 
    * @example      html
    * <span class="s-mb:auto">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-mb--auto {
        margin-block-start: auto;
        margin-block-end: auto;
   }`);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZOztBQUN4RCxtREFBVSxHQUFHLEVBQUUsQ0FBQztBQUszQixPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLFVBQVUsR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFOUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBa0JKLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3BCLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ2YsSUFBSSxTQUFTLEtBQUssU0FBUztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE9BQU87WUFDSCx1QkFBdUIsU0FBUyx1QkFBdUIsU0FBUyxxQkFBcUI7WUFDckYsd0JBQXdCLFNBQVMsdUJBQXVCLFNBQVMsOEJBQThCO1lBQy9GLHlCQUF5QixTQUFTLHVCQUF1QixTQUFTLHNCQUFzQjtZQUN4Rix5QkFBeUIsU0FBUyx1QkFBdUIsU0FBUyxvQkFBb0I7WUFDdEYsd0JBQXdCLFNBQVMsdUJBQXVCLFNBQVMsK0JBQStCO1lBQ2hHLHlCQUF5QixTQUFTLHVCQUF1QixTQUFTLHVCQUF1QjtZ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