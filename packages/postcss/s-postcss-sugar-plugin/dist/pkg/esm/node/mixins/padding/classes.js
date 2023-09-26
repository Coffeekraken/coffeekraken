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
 * \@s.padding.classes;
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
        * \\@s.padding.classes;
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
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .${clsMargin.replace(':', '-')} {
        padding: s.padding(${spaceName});
   }`, { type: 'CssClass' });
        const clsMarginTop = `s-pbs:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginTop}
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .${clsMarginTop.replace(':', '-')} {
        padding-block-start: s.padding(${spaceName}) !important;
   }`, { type: 'CssClass' });
        const clsMarginBottom = `s-pbe:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginBottom}
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .${clsMarginBottom.replace(':', '-')} {
        padding-block-end: s.padding(${spaceName}) !important;
   }`, { type: 'CssClass' });
        const clsMarginLeft = `s-pis:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginLeft}
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .${clsMarginLeft.replace(':', '-')} {
        padding-inline-start: s.padding(${spaceName}) !important;
   }`, { type: 'CssClass' });
        const clsMarginRight = `s-pie:${spaceName}`;
        vars.comment(() => `/**
    * @name            .${clsMarginRight}
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .${clsMarginRight.replace(':', '-')} {
        padding-inline-end: s.padding(${spaceName}) !important;
   }`, { type: 'CssClass' });
        const clsMarginX = `s-pi:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginX}
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
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
     .${clsMarginX.replace(':', '-')} {
        padding-inline-start: s.padding(${spaceName}) !important;
        padding-inline-end: s.padding(${spaceName}) !important;
   }`, { type: 'CssClass' });
        const clsMarginY = `s-pb:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginY}
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .${clsMarginY.replace(':', '-')} {
        padding-block-start: s.padding(${spaceName}) !important;
        padding-block-end: s.padding(${spaceName}) !important;
   }`, { type: 'CssClass' });
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RCxPQUFPLE9BQU8sTUFBTSxPQUFPLENBQUM7QUFFNUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFFSCxNQUFNLHlDQUEwQyxTQUFRLFlBQVk7SUFDaEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUMsTUFBTSxZQUFZLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRXhFLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXFCSixZQUFZO1NBQ1QsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixJQUFJLFNBQVMsS0FBSyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdkMsT0FBTztZQUNILHVCQUF1QixTQUFTLHVCQUF1QixTQUFTLHVCQUF1QjtZQUN2Rix3QkFBd0IsU0FBUyx1QkFBdUIsU0FBUyxnQ0FBZ0M7WUFDakcseUJBQXlCLFNBQVMsdUJBQXVCLFNBQVMsd0JBQXdCO1lBQzFGLHlCQUF5QixTQUFTLHVCQUF1QixTQUFTLHNCQUFzQjtZQUN4Rix3QkFBd0IsU0FBUyx1QkFBdUIsU0FBUyxpQ0FBaUM7WUFDbEcseUJBQXlCLFNBQVMsdUJBQXVCLFNBQVMseUJBQXlCO1lBQzNGLHlCQUF5QixTQUFTLHVCQUF1QixTQUFTLHVCQUF1QjtZQUN6Rix5QkFBeUIsU0FBUyx1QkFBdUIsU0FBUyx5Q0FBeUM7WUFDM0csMEJBQTBCLFNBQVMsdUJBQXVCLFNBQVMsaUNBQWlDO1lBQ3BHLDBCQUEwQixTQUFTLHVCQUF1QixTQUFTLCtCQUErQjtZQUNsRyx5QkFBeUIsU0FBUyx1QkFBdUIsU0FBUywwQ0FBMEM7WUFDNUcsMEJBQTBCLFNBQVMsdUJBQXVCLFNBQVMsa0NBQWtDO1lBQ3JHLDBCQUEwQixTQUFTLHVCQUF1QixTQUFTLGdDQUFnQztTQUN0RyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNqQixDQUFDLENBQUM7U0FDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O3VFQUlnRCxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTsrRUFDZixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtzRUFDaEMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7d0VBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7eUZBR04sT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7c0ZBQzFCLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3VGQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt5RkFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7dUVBSXpDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOytFQUNmLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO3NFQUNoQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTt3RUFDckIsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7OztLQU0xRixDQUNBLENBQUM7SUFFRixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDL0IsVUFBVTtRQUNWLE1BQU0sU0FBUyxHQUFHLE9BQU8sU0FBUyxFQUFFLENBQUM7UUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzt5QkFDTyxTQUFTOzs7Ozs7b0RBTWtCLFNBQVM7OztxQkFHeEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOzs7OztJQUs1QyxDQUNLLENBQUMsSUFBSSxDQUNGO01BQ04sU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOzZCQUNKLFNBQVM7S0FDakMsRUFDTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztRQUNGLE1BQU0sWUFBWSxHQUFHLFNBQVMsU0FBUyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzt5QkFDTyxZQUFZOzs7Ozs7b0RBTWUsU0FBUzs7O3FCQUd4QyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7O0lBSy9DLENBQ0ssQ0FBQyxJQUFJLENBQ0Y7TUFDTixZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7eUNBQ0ssU0FBUztLQUM3QyxFQUNPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO1FBQ0YsTUFBTSxlQUFlLEdBQUcsU0FBUyxTQUFTLEVBQUUsQ0FBQztRQUM3QyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO3lCQUNPLGVBQWU7Ozs7OztvREFNWSxTQUFTOzs7cUJBR3hDLGVBQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzs7Ozs7SUFLbEQsQ0FDSyxDQUFDLElBQUksQ0FDRjtNQUNOLGVBQWUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzt1Q0FDQSxTQUFTO0tBQzNDLEVBQ08sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7UUFDRixNQUFNLGFBQWEsR0FBRyxTQUFTLFNBQVMsRUFBRSxDQUFDO1FBQzNDLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7eUJBQ08sYUFBYTs7Ozs7O29EQU1jLFNBQVM7OztxQkFHeEMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOzs7OztJQUtoRCxDQUNLLENBQUMsSUFBSSxDQUNGO01BQ04sYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDOzBDQUNLLFNBQVM7S0FDOUMsRUFDTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztRQUNGLE1BQU0sY0FBYyxHQUFHLFNBQVMsU0FBUyxFQUFFLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzswQkFDUSxjQUFjOzs7Ozs7b0RBTVksU0FBUzs7O3FCQUd4QyxjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7O0lBS2pELENBQ0ssQ0FBQyxJQUFJLENBQ0Y7TUFDTixjQUFjLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7d0NBQ0UsU0FBUztLQUM1QyxFQUNPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUN2QixDQUFDO1FBQ0YsTUFBTSxVQUFVLEdBQUcsUUFBUSxTQUFTLEVBQUUsQ0FBQztRQUN2QyxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDO3lCQUNPLFVBQVU7Ozs7OztvREFNaUIsU0FBUzs7O3FCQUd4QyxVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7Ozs7O0lBSzdDLENBQ0ssQ0FBQyxJQUFJLENBQ0Y7UUFDSixVQUFVLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7MENBQ00sU0FBUzt3Q0FDWCxTQUFTO0tBQzVDLEVBQ08sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQ3ZCLENBQUM7UUFDRixNQUFNLFVBQVUsR0FBRyxRQUFRLFNBQVMsRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7eUJBQ08sVUFBVTs7Ozs7O29EQU1pQixTQUFTOzs7cUJBR3hDLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzs7Ozs7SUFLN0MsQ0FDSyxDQUFDLElBQUksQ0FDRjtNQUNOLFVBQVUsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQzt5Q0FDTyxTQUFTO3VDQUNYLFNBQVM7S0FDM0MsRUFDTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FDdkIsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9