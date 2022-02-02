import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import __keysFirst from '@coffeekraken/sugar/shared/array/keysFirst';
/**
 * @name           classes
 * @namespace      node.mixins.offsize
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the offwidt helper classes like s-os:30, s-osi:40, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.offsize.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginOffSizeClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginOffSizeClassesInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = new CssVars();
    const offsizeObj = __STheme.config('offsize');
    const offsizeKeys = __keysFirst(Object.keys(offsizeObj), ['default']);
    vars.comment(() => `
      /**
        * @name          Offsize
        * @namespace          sugar.css.helpers
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
            `* @cssClass     s-osie:${spaceName}        Apply the \`${spaceName}\` inline end offsize`
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    offsizeKeys.forEach((spaceName) => {
        // margins
        const clsMargin = `s-os:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMargin}
    * @namespace        sugar.css.offsize
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   }`);
        const clsMarginTop = `s-osbs:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginTop}
    * @namespace        sugar.css.offsize
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   `).code(`
   .${clsMarginTop.replace(':', '--')} {
        position: relative;
        top: calc(sugar.offsize(${spaceName}) * -1);
        height: calc(var(--height, 100%) + sugar.offsize(${spaceName}));
   }`);
        const clsMarginBottom = `s-osbe:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginBottom}
    * @namespace        sugar.css.offsize
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   `).code(`
   .${clsMarginBottom.replace(':', '--')} {
       position: relative;
       top: 0;
        height: calc(var(--height, 100%) + sugar.offsize(${spaceName}));
   }`);
        const clsMarginLeft = `s-osis:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginLeft}
    * @namespace        sugar.css.offsize
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   }`);
        const clsMarginRight = `s-osie:${spaceName}`;
        vars.comment(() => `/**
    * @name            .${clsMarginRight}
    * @namespace        sugar.css.offsize
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   }`);
        const clsMarginX = `s-osi:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginX}
    * @namespace        sugar.css.offsize
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   `).code(`
     .${clsMarginX.replace(':', '--')} {
        position: relative;
        left: calc(sugar.offsize(${spaceName}) * -1);
        width: calc(var(--width, 100%) + sugar.offsize(${spaceName}) * 2);
   }`);
        const clsMarginY = `s-osb:${spaceName}`;
        vars.comment(() => `/**
    * @name            ${clsMarginY}
    * @namespace        sugar.css.offsize
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   `).code(`
   .${clsMarginY.replace(':', '--')} {
        position: relative;
        top: calc(sugar.offsize(${spaceName}) * -1);
        height: calc(var(--height, 100%) + sugar.offsize(${spaceName}) * 2);
   }`);
    });
    //     vars.comment(
    //         () => `/**
    //     * @name            s-m:auto
    //     * @namespace        sugar.css.offsize
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
    //     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */
    //    `,
    //     ).code(`
    //    .s-m--auto {
    //         margin: auto;
    //    }`);
    //     vars.comment(
    //         () => `/**
    //     * @name            s-mbs:auto
    //     * @namespace        sugar.css.offsize
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
    //     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */
    //    `,
    //     ).code(`
    //    .s-mbs--auto {
    //         margin-block-start: auto;
    //    }`);
    //     vars.comment(
    //         () => `/**
    //     * @name            s-mie:auto
    //     * @namespace        sugar.css.offsize
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
    //     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */
    //    `,
    //     ).code(`
    //    .s-mie--auto {
    //         margin-inline-end: auto;
    //    }`);
    //     vars.comment(
    //         () => `/**
    //     * @name            s-mbe:auto
    //     * @namespace        sugar.css.offsize
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
    //     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */
    //    `,
    //     ).code(`
    //    .s-mbe--auto {
    //         margin-block-end: auto;
    //    }`);
    //     vars.comment(
    //         () => `/**
    //     * @name            s-mis:auto
    //     * @namespace        sugar.css.offsize
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
    //     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */
    //    `,
    //     ).code(`
    //    .s-mis--auto {
    //         margin-inline-start: auto;
    //    }`);
    //     vars.comment(
    //         () => `/**
    //     * @name            s-mi:auto
    //     * @namespace        sugar.css.offsize
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
    //     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
    //     * @namespace        sugar.css.offsize
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
    //     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */
    //    `,
    //     ).code(`
    //    .s-mb--auto {
    //         margin-block-start: auto;
    //         margin-block-end: auto;
    //    }`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxXQUFXLE1BQU0sNENBQTRDLENBQUM7QUFFckU7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFFSCxNQUFNLHlDQUEwQyxTQUFRLFlBQVk7SUFDaEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTyxFQUFFLENBQUM7SUFDZCxDQUFDO0NBQ0o7QUFJRCxPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFbEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLE9BQU8sRUFDUCxXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFDO0lBRTNCLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO0lBRXRFLElBQUksQ0FBQyxPQUFPLENBQ1IsR0FBRyxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBb0JKLFdBQVc7U0FDUixHQUFHLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtRQUNmLElBQUksU0FBUyxLQUFLLFNBQVM7WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN2QyxPQUFPO1lBQ0gsd0JBQXdCLFNBQVMsdUJBQXVCLFNBQVMsdUJBQXVCO1lBQ3hGLHlCQUF5QixTQUFTLHVCQUF1QixTQUFTLGdDQUFnQztZQUNsRywwQkFBMEIsU0FBUyx1QkFB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