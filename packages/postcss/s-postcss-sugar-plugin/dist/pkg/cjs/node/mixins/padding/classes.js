"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const array_1 = require("@coffeekraken/sugar/array");
const faker_1 = __importDefault(require("faker"));
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
class postcssSugarPluginPaddingClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginPaddingClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const paddingsObj = s_theme_1.default.get('padding');
    const paddingsKeys = (0, array_1.__keysFirst)(Object.keys(paddingsObj), ['default']);
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
        *   <p class="s-bc:accent s-radius s-pi:30 s-pb:30 s-mbe:20">${faker_1.default.name.findName()}</p>
        *   <p class="s-bc:complementary s-radius s-pis:50 s-pb:30 s-mbe:20">${faker_1.default.name.findName()}</p>
        *   <p class="s-bc:main s-radius s-pis:80 s-pb:30 s-mbe:20">${faker_1.default.name.findName()}</p>
        *   <p class="s-bc:error s-radius s-pis:100 s-pb:30 s-mbe:20">${faker_1.default.name.findName()}</p>
        * 
        * @example            html                Block
        *   <div class="s-bc:accent s-radius s-pbs:30 s-pbe:40 s-text:center s-mbe:20">${faker_1.default.name.findName()}</div>
        *   <div class="s-bc:complementary s-radius s-pb:30 s-text:center s-mbe:20">${faker_1.default.name.findName()}</div>
        *   <div class="s-bc:main s-radius s-pbs:50 s-pbe:30 s-text:center s-mbe:20">${faker_1.default.name.findName()}</div>
        *   <div class="s-bc:error s-radius s-pbs:100 s-pbe:60 s-text:center s-mbe:20">${faker_1.default.name.findName()}</div>
        * 
        * @example       html          RTL
        * <div dir="rtl">
        *   <p class="s-bc:accent s-radius s-pi:30 s-pb:30 s-mbe:20">${faker_1.default.name.findName()}</p>
        *   <p class="s-bc:complementary s-radius s-pis:50 s-pb:30 s-mbe:20">${faker_1.default.name.findName()}</p>
        *   <p class="s-bc:main s-radius s-pis:80 s-pb:30 s-mbe:20">${faker_1.default.name.findName()}</p>
        *   <p class="s-bc:error s-radius s-pis:100 s-pb:30 s-mbe:20">${faker_1.default.name.findName()}</p>
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MscURBQXdEO0FBQ3hELGtEQUE0QjtBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0seUNBQTBDLFNBQVEscUJBQVk7SUFDaEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJcUQsOERBQVM7QUFFL0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxXQUFXLEdBQUcsaUJBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUMsTUFBTSxZQUFZLEdBQUcsSUFBQSxtQkFBVyxFQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRXhFLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXFCSixZQUFZO1NBQ1QsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixJQUFJLFNBQVMsS0FBSyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdkMsT0FBTztZQUNILHVCQUF1QixTQUFTLHVCQUF1QixTQUFTLHVCQUF1QjtZQUN2Rix3QkFBd0IsU0FBUyx1QkFBdUIsU0FBUyxnQ0FBZ0M7WUFDakcseUJBQXlCLFNBQVMsdUJBQXVCLFNBQVMsd0JBQXdCO1lBQzFGLHlCQUF5QixTQUFTLHVCQUF1QixTQUFTLHNCQUFzQjtZQUN4Rix3QkFBd0IsU0FBUyx1QkFB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