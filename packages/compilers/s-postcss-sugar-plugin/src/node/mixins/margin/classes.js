import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
    const marginsObj = __STheme.config('margin');
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
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZOztBQUN4RCxtREFBVSxHQUFHLEVBQUUsQ0FBQztBQUszQixPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTdDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQWtCSixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztTQUNwQixHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLElBQUksU0FBUyxLQUFLLFNBQVM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN2QyxPQUFPO1lBQ0gsdUJBQXVCLFNBQVMsdUJBQXVCLFNBQVMscUJBQXFCO1lBQ3JGLHdCQUF3QixTQUFTLHVCQUF1QixTQUFTLDhCQUE4QjtZQUMvRix5QkFBeUIsU0FBUyx1QkFBdUIsU0FBUyxzQkFBc0I7WUFDeEYseUJBQXlCLFNBQVMsdUJBQXVCLFNBQVMsb0JBQW9CO1lBQ3RGLHdCQUF3QixTQUFTLHVCQUF1QixTQUFTLCtCQUErQjtZQUNoRyx5QkFBeUIsU0FBUyx1QkFBdUIsU0FBUyx1QkFBdUI7WUFDekYs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