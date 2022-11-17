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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0MscURBQXdEO0FBRXhEOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBRUgsTUFBTSx5Q0FBMEMsU0FBUSxxQkFBWTtJQUNoRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlxRCw4REFBUztBQUUvRCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUUzQixNQUFNLFVBQVUsR0FBRyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzQyxNQUFNLFdBQVcsR0FBRyxJQUFBLG1CQUFXLEVBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFFdEUsSUFBSSxDQUFDLE9BQU8sQ0FDUixHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUF1QkosV0FBVztTQUNSLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ2YsSUFBSSxTQUFTLEtBQUssU0FBUztZQUFFLE9BQU8sRUFBRSxDQUFDO1FBQ3ZDLE9BQU87WUFDSCx3QkFBd0IsU0FBUyx1QkFBdUIsU0FBUyx1QkFBdUI7WUFDeEYseUJBQXlCLFNBQVMsdUJBQXVCLFNBQVMsZ0NBQWdDO1lBQ2xHLDBCQUEwQixTQUFTLHVCQUF1QixTQUFTLHdCQUF3QjtZQUMzRiwwQkFBMEIsU0FBUyx1QkFBdUIsU0FBUyxzQkFBc0I7WUFDekYseUJBQXlCLFNBQVMsdUJBQXVCLFNBQVMsaUNBQWlD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