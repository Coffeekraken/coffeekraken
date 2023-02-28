"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const array_1 = require("@coffeekraken/sugar/array");
/**
 * @name           classes
 * @namespace      node.mixin.offsize
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the offwidt helper classes like s-os:30, s-osi:40, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.offsize.classes
 *
 * @example        css
 * \@sugar.offsize.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginOffSizeClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {};
    }
}
exports.interface = postcssSugarPluginOffSizeClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const offsizeObj = s_theme_1.default.get('offsize');
    const offsizeKeys = (0, array_1.__keysFirst)(Object.keys(offsizeObj), ['default']);
    vars.comment(() => `
      /**
        * @name          Offsize
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/offsize
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply an offsize to any HTMLElement.
        * An offsize is a "space" that you want to ADD to the width/height of an element.
        * You can specify where you want to add this offsize like for margin and padding by using the "inline" and "block" notation.
        * 
        * @feature          Support for RTL by using {inline|block} notation...
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.offsize.classes;
        * 
        ${offsizeKeys
        .map((spaceName) => {
        if (spaceName === 'default')
            return '';
        return [
            `* @cssClass     s-os:${spaceName}        Apply the \`${spaceName}\` offsize all around`,
            `* @cssClass     s-osb:${spaceName}        Apply the \`${spaceName}\` block start and end offsize`,
            `* @cssClass     s-osbs:${spaceName}        Apply the \`${spaceName}\` block start offsize`,
            `* @cssClass     s-osbe:${spaceName}        Apply the \`${spaceName}\` block end offsize`,
            `* @cssClass     s-osi:${spaceName}        Apply the \`${spaceName}\` inline start and end offsize`,
            `* @cssClass     s-osis:${spaceName}        Apply the \`${spaceName}\` inline start offsize`,
            `* @cssClass     s-osie:${spaceName}        Apply the \`${spaceName}\` inline end offsize`,
        ].join('\n');
    })
        .join('\n')}
        *
        * 
        * @example        html               All around
        * <div class="s-bg:main-surface s-position:relative" style="height: 250px">
        *   <div class="s-os:50 s-bg:accent s-opacity:10"></div>
        * </div>
        * 
        * @example        html               Inline
        * <div class="s-bg:main-surface">
        *   <div class="s-osi:50 s-bg:accent s-opacity:10" style="height: 250px"></div>
        * </div>
        * 
        * @example        html               Block
        * <div class="s-bg:main-surface s-position:relative" style="height: 250px">
        *   <div class="s-osb:50 s-bg:accent s-opacity:10"></div>
        * </div>
        * 
        * @example        html               Inline end
        * <div class="s-bg:main-surface">
        *   <div class="s-osie:50 s-bg:accent s-opacity:10" style="height: 250px"></div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    offsizeKeys.forEach((spaceName) => {
        // margins
        const clsMargin = `s-os:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMargin}
    * @namespace          sugar.style.offsize
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" offsize style around any HTMLElement
    * 
    * @example      html
    * <span class="${clsMargin.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMargin.replace(':', '--')} {
        position: relative;
        
        top: calc(sugar.offsize(${spaceName}) * -1);
        left: calc(sugar.offsize(${spaceName}) * -1);

        &[dir="rtl"], [dir="rtl"] & {
            left: auto;
           right: calc(sugar.offsize(${spaceName}) * -1);
        }

        width: calc(var(--width, 100%) + sugar.offsize(${spaceName}) * 2);
        height: calc(var(--height, 100%) + sugar.offsize(${spaceName}) * 2);
   }`, { type: 'CssClass' });
        const clsMarginTop = `s-osbs:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginTop}
    * @namespace          sugar.style.offsize
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block start offsize style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginTop.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginTop.replace(':', '--')} {
        position: relative;
        top: calc(sugar.offsize(${spaceName}) * -1);
        height: calc(var(--height, 100%) + sugar.offsize(${spaceName}));
   }`, { type: 'CssClass' });
        const clsMarginBottom = `s-osbe:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginBottom}
    * @namespace          sugar.style.offsize
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block end offsize style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginBottom.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginBottom.replace(':', '--')} {
       position: relative;
       top: 0;
        height: calc(var(--height, 100%) + sugar.offsize(${spaceName}));
   }`, { type: 'CssClass' });
        const clsMarginLeft = `s-osis:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginLeft}
    * @namespace          sugar.style.offsize
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline start offsize style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginLeft.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginLeft.replace(':', '--')} {
       position: relative;
        left: calc(sugar.offsize(${spaceName}) * -1);
        width: calc(var(--width, 100%) + sugar.offsize(${spaceName}));

        &[dir="rtl"], [dir="rtl"] & {
            left: auto;
           right: calc(sugar.offsize(${spaceName}) * -1);
        }
   }`, { type: 'CssClass' });
        const clsMarginRight = `s-osie:${spaceName}`;
        vars.comment(() => `/**
    * @name            .${clsMarginRight}
    * @namespace          sugar.style.offsize
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline end offsize style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginRight.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginRight.replace(':', '--')} {
       position: relative;
       left: 0;
        width: calc(var(--width, 100%) + sugar.offsize(${spaceName}));

        &[dir="rtl"], [dir="rtl"] & {
            left: auto;
           right: 0;
        }
   }`, { type: 'CssClass' });
        const clsMarginX = `s-osi:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginX}
    * @namespace          sugar.style.offsize
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline start and end offsize style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginX.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
     .${clsMarginX.replace(':', '--')} {
        position: relative;
        left: calc(sugar.offsize(${spaceName}) * -1);
        width: calc(var(--width, 100%) + sugar.offsize(${spaceName}) * 2);
   }`, { type: 'CssClass' });
        const clsMarginY = `s-osb:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginY}
    * @namespace          sugar.style.offsize
    * @type             CssClass
    * @platform             css
    * @status               beta
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block start and end offsize style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsMarginY.replace(':', ':')}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `).code(`
   .${clsMarginY.replace(':', '--')} {
        position: relative;
        top: calc(sugar.offsize(${spaceName}) * -1);
        height: calc(var(--height, 100%) + sugar.offsize(${spaceName}) * 2);
   }`, { type: 'CssClass' });
    });
    //     vars.comment(
    //         () => `/**
    //     * @name            s-m:auto
    //     * @namespace          sugar.style.offsize
    //     * @type             CssClass
    //     * @platform             css
    //     * @status               beta
    //     *
    //     * This class allows you to apply the "<yellow>auto</yellow>" offsize style around any HTMLElement
    //     *
    //     * @example      html
    //     * <span class="s-m:auto">Something cool</span>
    //     *
    //     * @since        2.0.0
    //     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    //     */
    //    `,
    //     ).code(`
    //    .s-m--auto {
    //         margin: auto;
    //    }`);
    //     vars.comment(
    //         () => `/**
    //     * @name            s-mbs:auto
    //     * @namespace          sugar.style.offsize
    //     * @type             CssClass
    //     * @platform             css
    //     * @status               beta
    //     *
    //     * This class allows you to apply the "<yellow>auto</yellow>" block start offsize style around any HTMLElement
    //     *
    //     * @example      html
    //     * <span class="s-mbs:auto">Something cool</span>
    //     *
    //     * @since        2.0.0
    //     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    //     */
    //    `,
    //     ).code(`
    //    .s-mbs--auto {
    //         margin-block-start: auto;
    //    }`);
    //     vars.comment(
    //         () => `/**
    //     * @name            s-mie:auto
    //     * @namespace          sugar.style.offsize
    //     * @type             CssClass
    //     * @platform             css
    //     * @status               beta
    //     *
    //     * This class allows you to apply the "<yellow>auto</yellow>" inline end offsize style around any HTMLElement
    //     *
    //     * @example      html
    //     * <span class="s-mie:auto">Something cool</span>
    //     *
    //     * @since        2.0.0
    //     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    //     */
    //    `,
    //     ).code(`
    //    .s-mie--auto {
    //         margin-inline-end: auto;
    //    }`);
    //     vars.comment(
    //         () => `/**
    //     * @name            s-mbe:auto
    //     * @namespace          sugar.style.offsize
    //     * @type             CssClass
    //     * @platform             css
    //     * @status               beta
    //     *
    //     * This class allows you to apply the "<yellow>auto</yellow>" block end offsize style around any HTMLElement
    //     *
    //     * @example      html
    //     * <span class="s-mbe:auto">Something cool</span>
    //     *
    //     * @since        2.0.0
    //     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    //     */
    //    `,
    //     ).code(`
    //    .s-mbe--auto {
    //         margin-block-end: auto;
    //    }`);
    //     vars.comment(
    //         () => `/**
    //     * @name            s-mis:auto
    //     * @namespace          sugar.style.offsize
    //     * @type             CssClass
    //     * @platform             css
    //     * @status               beta
    //     *
    //     * This class allows you to apply the "<yellow>auto</yellow>" inline start offsize style around any HTMLElement
    //     *
    //     * @example      html
    //     * <span class="s-mis:auto">Something cool</span>
    //     *
    //     * @since        2.0.0
    //     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    //     */
    //    `,
    //     ).code(`
    //    .s-mis--auto {
    //         margin-inline-start: auto;
    //    }`);
    //     vars.comment(
    //         () => `/**
    //     * @name            s-mi:auto
    //     * @namespace          sugar.style.offsize
    //     * @type             CssClass
    //     * @platform             css
    //     * @status               beta
    //     *
    //     * This class allows you to apply the "<yellow>auto</yellow>" inline start and end offsize style around any HTMLElement
    //     *
    //     * @example      html
    //     * <span class="s-mi:auto">Something cool</span>
    //     *
    //     * @since        2.0.0
    //     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    //     */
    //    `,
    //     ).code(`
    //    .s-mi--auto {
    //         margin-inline-start: auto;
    //         margin-inline-end: auto;
    //    }`);
    //     vars.comment(
    //         () => `/**
    //     * @name            s-mb:auto
    //     * @namespace          sugar.style.offsize
    //     * @type             CssClass
    //     * @platform             css
    //     * @status               beta
    //     *
    //     * This class allows you to apply the "<yellow>auto</yellow>" block start and end offsize style around any HTMLElement
    //     *
    //     * @example      html
    //     * <span class="s-mb:auto">Something cool</span>
    //     *
    //     * @since        2.0.0
    //     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    //     */
    //    `,
    //     ).code(`
    //    .s-mb--auto {
    //         margin-block-start: auto;
    //         margin-block-end: auto;
    //    }`);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MscURBQXdEO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrQkc7QUFFSCxNQUFNLHlDQUEwQyxTQUFRLHFCQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU8sRUFBRSxDQUFDO0lBQ2QsQ0FBQztDQUNKO0FBSXFELDhEQUFTO0FBRS9ELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sVUFBVSxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sV0FBVyxHQUFHLElBQUEsbUJBQVcsRUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUV0RSxJQUFJLENBQUMsT0FBTyxDQUNSLEdBQUcsRUFBRSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXVCSixXQUFXO1NBQ1IsR0FBRyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDZixJQUFJLFNBQVMsS0FBSyxTQUFTO1lBQUUsT0FBTyxFQUFFLENBQUM7UUFDdkMsT0FBTztZQUNILHdCQUF3QixTQUFTLHVCQUF1QixTQUFTLHVCQUF1QjtZQUN4Rix5QkFBeUIsU0FBUyx1QkFBdUIsU0FBUyxnQ0FBZ0M7WUFDbEcsMEJBQTBCLFNBQVMsdUJBQXVCLFNBQVMsd0JBQXdCO1lBQzNGLDBCQUEwQixTQUFTLHVCQUF1QixTQUFTLHNCQUFzQjtZQUN6Rix5QkFBeUIsU0FBUyx1QkFBdUIsU0FBUyxpQ0FB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