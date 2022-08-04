import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __keysFirst from '@coffeekraken/sugar/shared/array/keysFirst';
import __faker from 'faker';
/**
 * @name           classes
 * @namespace      node.mixin.padding
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the padding helper classes like s-p:10, s-pie:40, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
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
    const paddingsObj = __STheme.get('padding');
    const paddingsKeys = __keysFirst(Object.keys(paddingsObj), ['default']);
    vars.comment(() => `
      /**
        * @name          Padding
        * @namespace          sugar.style.helpers
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
    * @namespace          sugar.style.padding
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
   }`, { type: 'CssClass' });
        const clsMarginTop = `s-pbs:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginTop}
    * @namespace          sugar.style.padding
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
   }`, { type: 'CssClass' });
        const clsMarginBottom = `s-pbe:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginBottom}
    * @namespace          sugar.style.padding
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
   }`, { type: 'CssClass' });
        const clsMarginLeft = `s-pis:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginLeft}
    * @namespace          sugar.style.padding
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
   }`, { type: 'CssClass' });
        const clsMarginRight = `s-pie:${spaceName}`;
        vars.comment(() => `/**
    * @name            .${clsMarginRight}
    * @namespace          sugar.style.padding
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
   }`, { type: 'CssClass' });
        const clsMarginX = `s-pi:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginX}
    * @namespace          sugar.style.padding
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
   }`, { type: 'CssClass' });
        const clsMarginY = `s-pb:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginY}
    * @namespace          sugar.style.padding
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
   }`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDRDQUE0QyxDQUFDO0FBQ3JFLE9BQU8sT0FBTyxNQUFNLE9BQU8sQ0FBQztBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0seUNBQTBDLFNBQVEsWUFBWTtJQUNoRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSx5Q0FBeUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVsRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1QyxNQUFNLFlBQVksR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFFeEUsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBa0JKLFlBQVk7U0FDVCxHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLElBQUksU0FBUyxLQUFLLFNBQVM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN2QyxPQUFPO1lBQ0gsdUJBQXVCLFNBQVMsdUJBQXVCLFNBQVMsdUJBQXVCO1lBQ3ZGLHdCQUF3QixTQUFTLHVCQUF1QixTQUFTLGdD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