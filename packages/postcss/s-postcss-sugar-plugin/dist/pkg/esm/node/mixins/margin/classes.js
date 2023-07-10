import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __keysFirst } from '@coffeekraken/sugar/array';
import __faker from 'faker';
/**
 * @name           classes
 * @as              @sugar.margin.classes
 * @namespace      node.mixin.margin
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the margin helper classes like s-mie10, s-mis:40, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.margin.classes
 *
 * @example        css
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
    const marginsObj = __STheme.get('margin');
    const marginsKeys = __keysFirst(Object.keys(marginsObj), ['default']);
    vars.comment(() => `
      /**
        * @name          Margin
        * @namespace          sugar.style.helpers.margin
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
        * @install          css
        * \\@sugar.margin.classes;
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
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
        const clsMarginTop = `s-mbs:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginTop}
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
        const clsMarginBottom = `s-mbe:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginBottom}
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
        const clsMarginLeft = `s-mis:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginLeft}
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
        const clsMarginRight = `s-mie:${spaceName}`;
        vars.comment(() => `/**
    * @name            .${clsMarginRight}
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
        const clsMarginX = `s-mi:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginX}
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
        const clsMarginY = `s-mb:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginY}
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
    });
    // negatives
    marginsKeys.forEach((spaceName) => {
        // margins
        const clsMargin = `s-m:-${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMargin}
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
        const clsMarginTop = `s-mbs:-${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginTop}
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
        const clsMarginBottom = `s-mbe:-${spaceName}`;
        vars.comment(() => `/**
    * @name            .${clsMarginBottom}
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
        const clsMarginLeft = `s-mis:-${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginLeft}
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
        const clsMarginRight = `s-mie:-${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginRight}
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
        const clsMarginX = `s-mi:-${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginX}
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
        const clsMarginY = `s-mb:-${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginY}
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
    });
    vars.comment(() => `/**
    * @name            s-m:auto
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name            s-mbs:auto
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name            s-mie:auto
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name            s-mbe:auto
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name            s-mis:auto
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name            s-mi:auto
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name            s-mb:auto
    * @namespace          sugar.style.helpers.margin
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
   }`, { type: 'CssClass' });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLHdDQUF5QyxTQUFRLFlBQVk7SUFDL0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUMsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRXRFLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXFCSixXQUFXO1NBQ1IsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixJQUFJLFNBQVMsS0FBSyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdkMsT0FBTztZQUNILHVCQUF1QixTQUFTLHVCQUF1QixTQUFTLHFCQUFxQjtZQUNyRix3QkFBd0IsU0FB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