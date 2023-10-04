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

export interface IPostcssSugarPluginPaddingClassesParams {}

export { postcssSugarPluginPaddingClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginPaddingClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginPaddingClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    const paddingsObj = __STheme.get('padding');
    const paddingsKeys = __keysFirst(Object.keys(paddingsObj), ['default']);

    vars.comment(
        () => `
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
                if (spaceName === 'default') return '';
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
    `,
    );

    paddingsKeys.forEach((spaceName) => {
        // margins
        const clsPadding = `s-p:${spaceName}`;
        vars.comment(
            () => `/**
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
   `,
        ).code(
            `
   .${clsPadding.replace(':', '-')} {
        padding: s.padding(${spaceName});
   }`,
            { type: 'CssClass' },
        );
        const clsPaddingBlockStart = `s-pbs:${spaceName}`;
        vars.comment(
            () => `/**
    * @name            ${clsPaddingBlockStart}
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block start padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingBlockStart.replace(
        ':',
        ':',
    )}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `,
        ).code(
            `
   .${clsPaddingBlockStart.replace(':', '-')} {
        padding-block-start: s.padding(${spaceName}) !important;
   }`,
            { type: 'CssClass' },
        );
        const clsPaddingBlockEnd = `s-pbe:${spaceName}`;
        vars.comment(
            () => `/**
    * @name            ${clsPaddingBlockEnd}
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" block end padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingBlockEnd.replace(
        ':',
        ':',
    )}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `,
        ).code(
            `
   .${clsPaddingBlockEnd.replace(':', '-')} {
        padding-block-end: s.padding(${spaceName}) !important;
   }`,
            { type: 'CssClass' },
        );
        const clsPaddingInlineStart = `s-pis:${spaceName}`;
        vars.comment(
            () => `/**
    * @name            ${clsPaddingInlineStart}
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline start padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingInlineStart.replace(
        ':',
        ':',
    )}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `,
        ).code(
            `
   .${clsPaddingInlineStart.replace(':', '-')} {
        padding-inline-start: s.padding(${spaceName}) !important;
   }`,
            { type: 'CssClass' },
        );
        const clsPaddingInlineEnd = `s-pie:${spaceName}`;
        vars.comment(
            () => `/**
    * @name            .${clsPaddingInlineEnd}
    * @namespace          sugar.style.helpers.padding
    * @type             CssClass
    * @platform             css
    * @status               stable
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" inline end padding style to any HTMLElement
    * 
    * @example      html
    * <span class="${clsPaddingInlineEnd.replace(
        ':',
        ':',
    )}">Something cool</span>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `,
        ).code(
            `
   .${clsPaddingInlineEnd.replace(':', '-')} {
        padding-inline-end: s.padding(${spaceName}) !important;
   }`,
            { type: 'CssClass' },
        );
        const clsPaddingInline = `s-pi:${spaceName}`;
        vars.comment(
            () => `/**
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
   `,
        ).code(
            `
     .${clsPaddingInline.replace(':', '-')} {
        padding-inline-start: s.padding(${spaceName}) !important;
        padding-inline-end: s.padding(${spaceName}) !important;
   }`,
            { type: 'CssClass' },
        );
        const clsPaddingBlock = `s-pb:${spaceName}`;
        vars.comment(
            () => `/**
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
   `,
        ).code(
            `
   .${clsPaddingBlock.replace(':', '-')} {
        padding-block-start: s.padding(${spaceName}) !important;
        padding-block-end: s.padding(${spaceName}) !important;
   }`,
            { type: 'CssClass' },
        );
    });

    return vars;
}
