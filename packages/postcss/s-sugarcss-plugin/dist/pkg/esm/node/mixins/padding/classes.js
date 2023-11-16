import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __keysFirst } from '@coffeekraken/sugar/array';
import __faker from 'faker';
/**
 * @name           classes
 * @as          @s.padding.classes
 * @namespace      node.mixin.padding
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the padding helper classes like s-p:10, s-pie:40, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.padding.classes
 *
 * @example        css
 * @s.padding.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginPaddingClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginPaddingClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const paddingsObj = __STheme.current.get('padding');
    const paddingsKeys = __keysFirst(Object.keys(paddingsObj), ['default']);
    vars.comment(() => `
      /**
        * @name          Padding
        * @namespace          sugar.style.helpers.padding
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/padding
        * @platform       css
        * @status       stable
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
        * @install          css
        * @s.padding.classes;
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
        *   <p class="s-bc:accent s-radius s-pi:30 s-pb:30 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bc:complementary s-radius s-pis:50 s-pb:30 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bc:main s-radius s-pis:80 s-pb:30 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bc:error s-radius s-pis:100 s-pb:30 s-mbe:20">${__faker.name.findName()}</p>
        * 
        * @example            html                Block
        *   <div class="s-bc:accent s-radius s-pbs:30 s-pbe:40 s-text:center s-mbe:20">${__faker.name.findName()}</div>
        *   <div class="s-bc:complementary s-radius s-pb:30 s-text:center s-mbe:20">${__faker.name.findName()}</div>
        *   <div class="s-bc:main s-radius s-pbs:50 s-pbe:30 s-text:center s-mbe:20">${__faker.name.findName()}</div>
        *   <div class="s-bc:error s-radius s-pbs:100 s-pbe:60 s-text:center s-mbe:20">${__faker.name.findName()}</div>
        * 
        * @example       html          RTL
        * <div dir="rtl">
        *   <p class="s-bc:accent s-radius s-pi:30 s-pb:30 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bc:complementary s-radius s-pis:50 s-pb:30 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bc:main s-radius s-pis:80 s-pb:30 s-mbe:20">${__faker.name.findName()}</p>
        *   <p class="s-bc:error s-radius s-pis:100 s-pb:30 s-mbe:20">${__faker.name.findName()}</p>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    paddingsKeys.forEach((spaceName) => {
        // margins
        const clsPadding = `s-p:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsPadding}
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" padding style around any HTMLElement
    * 
    * @example      html
    * <span class="${clsPadding.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsPadding.replace(':', '-')} {
        padding: s.padding(${spaceName});
   }`, { type: 'CssClass' });
        const clsPaddingBlockStart = `s-pbs:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsPaddingBlockStart}
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block start padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingBlockStart.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsPaddingBlockStart.replace(':', '-')} {
        padding-block-start: s.padding(${spaceName}) !important;
   }`, { type: 'CssClass' });
        const clsPaddingBlockEnd = `s-pbe:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsPaddingBlockEnd}
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block end padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingBlockEnd.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsPaddingBlockEnd.replace(':', '-')} {
        padding-block-end: s.padding(${spaceName}) !important;
   }`, { type: 'CssClass' });
        const clsPaddingInlineStart = `s-pis:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsPaddingInlineStart}
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline start padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingInlineStart.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsPaddingInlineStart.replace(':', '-')} {
        padding-inline-start: s.padding(${spaceName}) !important;
   }`, { type: 'CssClass' });
        const clsPaddingInlineEnd = `s-pie:${spaceName}`;
        vars.comment(() => `/**
    * @name            .${clsPaddingInlineEnd}
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline end padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingInlineEnd.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsPaddingInlineEnd.replace(':', '-')} {
        padding-inline-end: s.padding(${spaceName}) !important;
   }`, { type: 'CssClass' });
        const clsPaddingInline = `s-pi:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsPaddingInline}
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline start and end padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingInline.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
     .${clsPaddingInline.replace(':', '-')} {
        padding-inline-start: s.padding(${spaceName}) !important;
        padding-inline-end: s.padding(${spaceName}) !important;
   }`, { type: 'CssClass' });
        const clsPaddingBlock = `s-pb:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsPaddingBlock}
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block start and end padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingBlock.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsPaddingBlock.replace(':', '-')} {
        padding-block-start: s.padding(${spaceName}) !important;
        padding-block-end: s.padding(${spaceName}) !important;
   }`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLHNDQUF1QyxTQUFRLFlBQVk7SUFDN0QsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUV4RSxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFxQkosWUFBWTtTQUNULEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ2YsSUFBSSxTQUFTLEtBQUssU0FBUztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE9BQU87WUFDSCx1QkFBdUIsU0FBUyx1QkFBdUIsU0FBUyx1QkFBdUI7WUFDdkYs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