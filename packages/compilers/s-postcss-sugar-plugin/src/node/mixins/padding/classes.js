import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __faker from 'faker';
import __keysFirst from '@coffeekraken/sugar/shared/array/keysFirst';
/**
 * @name           classes
 * @namespace      node.mixins.padding
 * @type           PostcssMixin
 * @platform      postcss
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginPaddingClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginPaddingClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const paddingsObj = __STheme.config('padding');
    const paddingsKeys = __keysFirst(Object.keys(paddingsObj), ['default']);
    vars.comment(() => `
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
        ${paddingsKeys
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
        * @example        html          Inline
        *   <p class="s-bg:accent s-radius s-pi:30 s-pb:30 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bg:complementary s-radius s-pis:50 s-pb:30 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bg:main s-radius s-pis:80 s-pb:30 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bg:error s-radius s-pis:100 s-pb:30 s-mbe:20">${__faker.name.findName()}</p>
        * 
        * @example            html                Block
        *   <div class="s-bg:accent s-radius s-pbs:30 s-pbe:40 s-text:center s-mbe:20">${__faker.name.findName()}</div>
        *   <div class="s-bg:complementary s-radius s-pb:30 s-text:center s-mbe:20">${__faker.name.findName()}</div>
        *   <div class="s-bg:main s-radius s-pbs:50 s-pbe:30 s-text:center s-mbe:20">${__faker.name.findName()}</div>
        *   <div class="s-bg:error s-radius s-pbs:100 s-pbe:60 s-text:center s-mbe:20">${__faker.name.findName()}</div>
        * 
        * @example       html          RTL
        * <div dir="rtl">
        *   <p class="s-bg:accent s-radius s-pi:30 s-pb:30 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bg:complementary s-radius s-pis:50 s-pb:30 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bg:main s-radius s-pis:80 s-pb:30 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bg:error s-radius s-pis:100 s-pb:30 s-mbe:20">${__faker.name.findName()}</p>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    paddingsKeys.forEach((spaceName) => {
        // margins
        const clsMargin = `s-p:${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMargin.replace(':', '--')} {
        padding: sugar.padding(${spaceName});
   }`);
        const clsMarginTop = `s-pbs:${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginTop.replace(':', '--')} {
        padding-block-start: sugar.padding(${spaceName}) !important;
   }`);
        const clsMarginBottom = `s-pbe:${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginBottom.replace(':', '--')} {
        padding-block-end: sugar.padding(${spaceName}) !important;
   }`);
        const clsMarginLeft = `s-pis:${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginLeft.replace(':', '--')} {
        padding-inline-start: sugar.padding(${spaceName}) !important;
   }`);
        const clsMarginRight = `s-pie:${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginRight.replace(':', '--')} {
        padding-inline-end: sugar.padding(${spaceName}) !important;
   }`);
        const clsMarginX = `s-pi:${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
     .${clsMarginX.replace(':', '--')} {
        padding-inline-start: sugar.padding(${spaceName}) !important;
        padding-inline-end: sugar.padding(${spaceName}) !important;
   }`);
        const clsMarginY = `s-pb:${spaceName}`;
        vars.comment(() => `/**
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginY.replace(':', '--')} {
        padding-block-start: sugar.padding(${spaceName}) !important;
        padding-block-end: sugar.padding(${spaceName}) !important;
   }`);
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBQzVCLE9BQU8sV0FBVyxNQUFNLDRDQUE0QyxDQUFDO0FBRXJFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSUQsT0FBTyxFQUFFLHlDQUF5QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWxFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9DLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUV4RSxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFrQkosWUFBWTtTQUNULEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ2YsSUFBSSxTQUFTLEtBQUssU0FBUztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE9BQU87WUFDSCx1QkFBdUIsU0FBUyx1QkFBdUIsU0FBUyx1QkFBdUI7WUFDdkYsd0JBQXdCLFNBQVMsdUJBQXVCLFNBQVMs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