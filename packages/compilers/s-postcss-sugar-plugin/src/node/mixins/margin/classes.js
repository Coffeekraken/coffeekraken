import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
import __keysFirst from '@coffeekraken/sugar/shared/array/keysFirst';
/**
 * @name           classes
 * @namespace      node.mixins.margin
 * @type           PostcssMixin
 * @platform      postcss
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginMarginClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginMarginClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const marginsObj = __STheme.config('margin');
    const marginsKeys = __keysFirst(Object.keys(marginsObj), ['default']);
    vars.comment(() => `
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
        ${marginsKeys
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
        * @example        html               Inline
        *   <p class="s-bg:accent s-radius s-p:30 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bg:complementary s-radius s-mi:50 s-mbe:20 s-p:30">${__faker.name.findName()}</p>
        *   <p class="s-bg:main s-mie:100 s-radius s-mbe:20 s-p:30">${__faker.name.findName()}</p>
        *   <p class="s-bg:error s-mie:30 s-radius s-p:30">${__faker.name.findName()}</p>
        * 
        * @example            html                Block
        *   <div class="s-bg:accent s-radius s-mbe:40 s-p:30 s-text:center">${__faker.name.findName()}</div>
        *   <div class="s-bg:complementary s-radius s-mbe:20 s-p:30 s-text:center">${__faker.name.findName()}</div>
        *   <div class="s-bg:main s-radius s-mbe:50 s-p:30 s-text:center">${__faker.name.findName()}</div>
        *   <div class="s-bg:error s-radius s-p:30 s-text:center">${__faker.name.findName()}</div>
        * 
        * @example            html                RTL
        * <div dir="rtl">
        *   <p class="s-bg:accent s-radius s-p:30 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bg:complementary s-radius s-mi:50 s-mbe:20 s-p:30">${__faker.name.findName()}</p>
        *   <p class="s-bg:main s-radius s-mie:100 s-mbe:20 s-p:30">${__faker.name.findName()}</p>
        *   <p class="s-bg:error s-radius s-mie:30 s-p:30">${__faker.name.findName()}</p>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    marginsKeys.forEach((spaceName) => {
        // margins
        const clsMargin = `s-m:${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMargin.replace(':', '--')} {
        margin: sugar.margin(${spaceName});
   }`);
        const clsMarginTop = `s-mbs:${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginTop.replace(':', '--')} {
        margin-block-start: sugar.margin(${spaceName}) !important;
   }`);
        const clsMarginBottom = `s-mbe:${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginBottom.replace(':', '--')} {
        margin-block-end: sugar.margin(${spaceName}) !important;
   }`);
        const clsMarginLeft = `s-mis:${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginLeft.replace(':', '--')} {
        margin-inline-start: sugar.margin(${spaceName}) !important;
   }`);
        const clsMarginRight = `s-mie:${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginRight.replace(':', '--')} {
        margin-inline-end: sugar.margin(${spaceName}) !important;
   }`);
        const clsMarginX = `s-mi:${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
     .${clsMarginX.replace(':', '--')} {
        margin-inline-start: sugar.margin(${spaceName}) !important;
        margin-inline-end: sugar.margin(${spaceName}) !important;
   }`);
        const clsMarginY = `s-mb:${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginY.replace(':', '--')} {
        margin-block-start: sugar.margin(${spaceName}) !important;
        margin-block-end: sugar.margin(${spaceName}) !important;
   }`);
    });
    // negatives
    marginsKeys.forEach((spaceName) => {
        // margins
        const clsMargin = `s-m:-${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMargin.replace(':', '--')} {
        margin: calc(sugar.margin(${spaceName}) * -1);
   }`);
        const clsMarginTop = `s-mbs:-${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginTop.replace(':', '--')} {
        margin-block-start: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
        const clsMarginBottom = `s-mbe:-${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginBottom.replace(':', '--')} {
        margin-block-end: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
        const clsMarginLeft = `s-mis:-${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginLeft.replace(':', '--')} {
        margin-inline-start: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
        const clsMarginRight = `s-mie:-${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginRight.replace(':', '--')} {
        margin-inline-end: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
        const clsMarginX = `s-mi:-${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
     .${clsMarginX.replace(':', '--')} {
        margin-inline-start: calc(sugar.margin(${spaceName}) * -1) !important;
        margin-inline-end: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
        const clsMarginY = `s-mb:-${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginY.replace(':', '--')} {
        margin-block-start: calc(sugar.margin(${spaceName}) * -1) !important;
        margin-block-end: calc(sugar.margin(${spaceName}) * -1) !important;
   }`);
    });
    vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .s-m--auto {
        margin: auto;
   }`);
    vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .s-mbs--auto {
        margin-block-start: auto;
   }`);
    vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .s-mie--auto {
        margin-inline-end: auto;
   }`);
    vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .s-mbe--auto {
        margin-block-end: auto;
   }`);
    vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .s-mis--auto {
        margin-inline-start: auto;
   }`);
    vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .s-mi--auto {
        margin-inline-start: auto;
        margin-inline-end: auto;
   }`);
    vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .s-mb--auto {
        margin-block-start: auto;
        margin-block-end: auto;
   }`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBQzVCLE9BQU8sV0FBVyxNQUFNLDRDQUE0QyxDQUFDO0FBRXJFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZO0lBQy9ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLHdDQUF3QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWpFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUV0RSxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFrQkosV0FBVztTQUNSLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ2YsSUFBSSxTQUFTLEtBQUssU0FBUztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE9BQU87WUFDSCx1QkFBdUIsU0FBUyx1QkFBdUIsU0FBUyxxQkFBcUI7WUFDckYsd0JBQXdCLFNBQVMsdUJBQXVCLFNBQVMs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