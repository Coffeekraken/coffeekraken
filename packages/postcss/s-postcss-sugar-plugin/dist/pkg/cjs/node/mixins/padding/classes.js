"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const keysFirst_1 = __importDefault(require("@coffeekraken/sugar/shared/array/keysFirst"));
const faker_1 = __importDefault(require("faker"));
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
    const paddingsKeys = (0, keysFirst_1.default)(Object.keys(paddingsObj), ['default']);
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
        *   <p class="s-bg:accent s-radius s-pi:30 s-pb:30 s-mbe:20">${faker_1.default.name.findName()}</p>
        *   <p class="s-bg:complementary s-radius s-pis:50 s-pb:30 s-mbe:20">${faker_1.default.name.findName()}</p>
        *   <p class="s-bg:main s-radius s-pis:80 s-pb:30 s-mbe:20">${faker_1.default.name.findName()}</p>
        *   <p class="s-bg:error s-radius s-pis:100 s-pb:30 s-mbe:20">${faker_1.default.name.findName()}</p>
        * 
        * @example            html                Block
        *   <div class="s-bg:accent s-radius s-pbs:30 s-pbe:40 s-text:center s-mbe:20">${faker_1.default.name.findName()}</div>
        *   <div class="s-bg:complementary s-radius s-pb:30 s-text:center s-mbe:20">${faker_1.default.name.findName()}</div>
        *   <div class="s-bg:main s-radius s-pbs:50 s-pbe:30 s-text:center s-mbe:20">${faker_1.default.name.findName()}</div>
        *   <div class="s-bg:error s-radius s-pbs:100 s-pbe:60 s-text:center s-mbe:20">${faker_1.default.name.findName()}</div>
        * 
        * @example       html          RTL
        * <div dir="rtl">
        *   <p class="s-bg:accent s-radius s-pi:30 s-pb:30 s-mbe:20">${faker_1.default.name.findName()}</p>
        *   <p class="s-bg:complementary s-radius s-pis:50 s-pb:30 s-mbe:20">${faker_1.default.name.findName()}</p>
        *   <p class="s-bg:main s-radius s-pis:80 s-pb:30 s-mbe:20">${faker_1.default.name.findName()}</p>
        *   <p class="s-bg:error s-radius s-pis:100 s-pb:30 s-mbe:20">${faker_1.default.name.findName()}</p>
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MsMkZBQXFFO0FBQ3JFLGtEQUE0QjtBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQUVILE1BQU0seUNBQTBDLFNBQVEscUJBQVk7SUFDaEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJcUQsOERBQVM7QUFFL0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxXQUFXLEdBQUcsaUJBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDNUMsTUFBTSxZQUFZLEdBQUcsSUFBQSxtQkFBVyxFQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRXhFLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQWtCSixZQUFZO1NBQ1QsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixJQUFJLFNBQVMsS0FBSyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdkMsT0FBTztZQUNILHVCQUF1QixTQUFTLHVCQUF1QixTQUFTLHVCQUF1QjtZQUN2Rix3QkFBd0IsU0FBUyx1QkFBdUIsU0FBUyxnQ0FBZ0M7WUFDakcseUJBQXlCLFNBQVMsdUJBQXVCLFNBQVMsd0JBQXdCO1lBQzFGLHlCQUF5QixTQUFTLHVCQUF1QixTQUFTLHNCQUFzQjtZQUN4Rix3QkFBd0IsU0FBUyx1QkFBdUIsU0FB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