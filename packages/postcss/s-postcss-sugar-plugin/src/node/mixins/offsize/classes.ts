import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __keysFirst } from '@coffeekraken/sugar/array';

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
 * @sugar.offsize.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginOffSizeClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginOffsizeClassesParams {}

export { postcssSugarPluginOffSizeClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginOffsizeClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginOffsizeClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    const offsizeObj = __STheme.get('offsize');
    const offsizeKeys = __keysFirst(Object.keys(offsizeObj), ['default']);

    vars.comment(
        () => `
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
                if (spaceName === 'default') return '';
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
    `,
    );

    offsizeKeys.forEach((spaceName) => {
        // margins
        const clsMargin = `s-os:${spaceName}`;
        vars.comment(
            () => `/**
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
   `,
        ).code(
            `
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
   }`,
            { type: 'CssClass' },
        );
        const clsMarginTop = `s-osbs:${spaceName}`;
        vars.comment(
            () => `/**
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
   `,
        ).code(
            `
   .${clsMarginTop.replace(':', '--')} {
        position: relative;
        top: calc(sugar.offsize(${spaceName}) * -1);
        height: calc(var(--height, 100%) + sugar.offsize(${spaceName}));
   }`,
            { type: 'CssClass' },
        );
        const clsMarginBottom = `s-osbe:${spaceName}`;
        vars.comment(
            () => `/**
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
   `,
        ).code(
            `
   .${clsMarginBottom.replace(':', '--')} {
       position: relative;
       top: 0;
        height: calc(var(--height, 100%) + sugar.offsize(${spaceName}));
   }`,
            { type: 'CssClass' },
        );
        const clsMarginLeft = `s-osis:${spaceName}`;
        vars.comment(
            () => `/**
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
   `,
        ).code(
            `
   .${clsMarginLeft.replace(':', '--')} {
       position: relative;
        left: calc(sugar.offsize(${spaceName}) * -1);
        width: calc(var(--width, 100%) + sugar.offsize(${spaceName}));

        &[dir="rtl"], [dir="rtl"] & {
            left: auto;
           right: calc(sugar.offsize(${spaceName}) * -1);
        }
   }`,
            { type: 'CssClass' },
        );
        const clsMarginRight = `s-osie:${spaceName}`;
        vars.comment(
            () => `/**
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
   `,
        ).code(
            `
   .${clsMarginRight.replace(':', '--')} {
       position: relative;
       left: 0;
        width: calc(var(--width, 100%) + sugar.offsize(${spaceName}));

        &[dir="rtl"], [dir="rtl"] & {
            left: auto;
           right: 0;
        }
   }`,
            { type: 'CssClass' },
        );
        const clsMarginX = `s-osi:${spaceName}`;
        vars.comment(
            () => `/**
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
   `,
        ).code(
            `
     .${clsMarginX.replace(':', '--')} {
        position: relative;
        left: calc(sugar.offsize(${spaceName}) * -1);
        width: calc(var(--width, 100%) + sugar.offsize(${spaceName}) * 2);
   }`,
            { type: 'CssClass' },
        );
        const clsMarginY = `s-osb:${spaceName}`;
        vars.comment(
            () => `/**
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
   `,
        ).code(
            `
   .${clsMarginY.replace(':', '--')} {
        position: relative;
        top: calc(sugar.offsize(${spaceName}) * -1);
        height: calc(var(--height, 100%) + sugar.offsize(${spaceName}) * 2);
   }`,
            { type: 'CssClass' },
        );
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
