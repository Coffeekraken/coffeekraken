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
 * @as              @s.margin.classes
 * @namespace      node.mixin.margin
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the margin helper classes like s-mie10, s-mis:40, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.margin.classes
 *
 * @example        css
 * @s.margin.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginMarginClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = SSugarcssPluginMarginClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const marginsObj = s_theme_1.default.get('margin');
    const marginsKeys = (0, array_1.__keysFirst)(Object.keys(marginsObj), ['default']);
    vars.comment(() => `
      /**
        * @name          Margin
        * @namespace          sugar.style.helpers.margin
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/margin
        * @platform       css
        * @status       stable
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
        * @s.margin.classes;
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
        *   <p class="s-bc:accent s-radius s-p:30 s-mbe:20">${faker_1.default.name.findName()}</p>
        *   <p class="s-bc:complementary s-radius s-mi:50 s-mbe:20 s-p:30">${faker_1.default.name.findName()}</p>
        *   <p class="s-bc:main s-mie:100 s-radius s-mbe:20 s-p:30">${faker_1.default.name.findName()}</p>
        *   <p class="s-bc:error s-mie:30 s-radius s-p:30">${faker_1.default.name.findName()}</p>
        * 
        * @example            html                Block
        *   <div class="s-bc:accent s-radius s-mbe:40 s-p:30 s-text:center">${faker_1.default.name.findName()}</div>
        *   <div class="s-bc:complementary s-radius s-mbe:20 s-p:30 s-text:center">${faker_1.default.name.findName()}</div>
        *   <div class="s-bc:main s-radius s-mbe:50 s-p:30 s-text:center">${faker_1.default.name.findName()}</div>
        *   <div class="s-bc:error s-radius s-p:30 s-text:center">${faker_1.default.name.findName()}</div>
        * 
        * @example            html                RTL
        * <div dir="rtl">
        *   <p class="s-bc:accent s-radius s-p:30 s-mbe:20">${faker_1.default.name.findName()}</p>
        *   <p class="s-bc:complementary s-radius s-mi:50 s-mbe:20 s-p:30">${faker_1.default.name.findName()}</p>
        *   <p class="s-bc:main s-radius s-mie:100 s-mbe:20 s-p:30">${faker_1.default.name.findName()}</p>
        *   <p class="s-bc:error s-radius s-mie:30 s-p:30">${faker_1.default.name.findName()}</p>
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
    * @status               stable
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
   .${clsMargin.replace(':', '-')} {
        margin: s.margin(${spaceName});
   }`, { type: 'CssClass' });
        const clsMarginTop = `s-mbs:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginTop}
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .${clsMarginTop.replace(':', '-')} {
        margin-block-start: s.margin(${spaceName}) !important;
   }`, { type: 'CssClass' });
        const clsMarginBottom = `s-mbe:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginBottom}
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .${clsMarginBottom.replace(':', '-')} {
        margin-block-end: s.margin(${spaceName}) !important;
   }`, { type: 'CssClass' });
        const clsMarginLeft = `s-mis:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginLeft}
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .${clsMarginLeft.replace(':', '-')} {
        margin-inline-start: s.margin(${spaceName}) !important;
   }`, { type: 'CssClass' });
        const clsMarginRight = `s-mie:${spaceName}`;
        vars.comment(() => `/**
    * @name            .${clsMarginRight}
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .${clsMarginRight.replace(':', '-')} {
        margin-inline-end: s.margin(${spaceName}) !important;
   }`, { type: 'CssClass' });
        const clsMarginX = `s-mi:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginX}
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
     .${clsMarginX.replace(':', '-')} {
        margin-inline-start: s.margin(${spaceName}) !important;
        margin-inline-end: s.margin(${spaceName}) !important;
   }`, { type: 'CssClass' });
        const clsMarginY = `s-mb:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginY}
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .${clsMarginY.replace(':', '-')} {
        margin-block-start: s.margin(${spaceName}) !important;
        margin-block-end: s.margin(${spaceName}) !important;
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
    * @status               stable
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
   .${clsMargin.replace(':', '-')} {
        margin: calc(s.margin(${spaceName}) * -1);
   }`, { type: 'CssClass' });
        const clsMarginTop = `s-mbs:-${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginTop}
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .${clsMarginTop.replace(':', '-')} {
        margin-block-start: calc(s.margin(${spaceName}) * -1) !important;
   }`, { type: 'CssClass' });
        const clsMarginBottom = `s-mbe:-${spaceName}`;
        vars.comment(() => `/**
    * @name            .${clsMarginBottom}
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .${clsMarginBottom.replace(':', '-')} {
        margin-block-end: calc(s.margin(${spaceName}) * -1) !important;
   }`, { type: 'CssClass' });
        const clsMarginLeft = `s-mis:-${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginLeft}
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .${clsMarginLeft.replace(':', '-')} {
        margin-inline-start: calc(s.margin(${spaceName}) * -1) !important;
   }`, { type: 'CssClass' });
        const clsMarginRight = `s-mie:-${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginRight}
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .${clsMarginRight.replace(':', '-')} {
        margin-inline-end: calc(s.margin(${spaceName}) * -1) !important;
   }`, { type: 'CssClass' });
        const clsMarginX = `s-mi:-${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginX}
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
     .${clsMarginX.replace(':', '-')} {
        margin-inline-start: calc(s.margin(${spaceName}) * -1) !important;
        margin-inline-end: calc(s.margin(${spaceName}) * -1) !important;
   }`, { type: 'CssClass' });
        const clsMarginY = `s-mb:-${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginY}
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .${clsMarginY.replace(':', '-')} {
        margin-block-start: calc(s.margin(${spaceName}) * -1) !important;
        margin-block-end: calc(s.margin(${spaceName}) * -1) !important;
   }`, { type: 'CssClass' });
    });
    vars.comment(() => `/**
    * @name            s-m:auto
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .s-m-auto {
        margin: auto;
   }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name            s-mbs:auto
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .s-mbs-auto {
        margin-block-start: auto;
   }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name            s-mie:auto
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .s-mie-auto {
        margin-inline-end: auto;
   }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name            s-mbe:auto
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .s-mbe-auto {
        margin-block-end: auto;
   }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name            s-mis:auto
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .s-mis-auto {
        margin-inline-start: auto;
   }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name            s-mi:auto
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .s-mi-auto {
        margin-inline-start: auto;
        margin-inline-end: auto;
   }`, { type: 'CssClass' });
    vars.comment(() => `/**
    * @name            s-mb:auto
    * @namespace          sugar.style.helpers.margin
    * @type             CssClass
    * @platform             css
    * @status               stable
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
   .s-mb-auto {
        margin-block-start: auto;
        margin-block-end: auto;
   }`, { type: 'CssClass' });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MscURBQXdEO0FBQ3hELGtEQUE0QjtBQUU1Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0scUNBQXNDLFNBQVEscUJBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJaUQsMERBQVM7QUFFM0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsTUFBTSxVQUFVLEdBQUcsaUJBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUMsTUFBTSxXQUFXLEdBQUcsSUFBQSxtQkFBVyxFQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRXRFLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXFCSixXQUFXO1NBQ1IsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixJQUFJLFNBQVMsS0FBSyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdkMsT0FBTztZQUNILHVCQUF1QixTQUFTLHVCQUF1QixTQUFTLHFCQUFxQjtZQUNyRix3QkFBd0IsU0FBUyx1QkFBdUIsU0FBUyw4QkFBOEI7WUFDL0YseUJBQXlCLFNBQVMsdUJBQXVCLFNBQVMsc0JBQXNCO1lBQ3hGLHlCQUF5QixTQUFTLHVCQUF1QixTQUFTLG9CQUFvQjtZQUN0Rix3QkFBd0IsU0FBUyx1QkFB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