import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
import { __keysFirst } from '@coffeekraken/sugar/array';
import __faker from 'faker';

/**
 * @name           classes
 * @as              @s.spacing.classes
 * @namespace      node.mixin.spacing
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin generate all the spacing helper classes like s-p:10, s-pie:40, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.spacing.classes
 *
 * @example        css
 * @s.spacing.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginSpacingClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface ISSugarcssPluginSpacingClassesParams {}

export { SSugarcssPluginSpacingClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginSpacingClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginSpacingClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    const spacingsObj = __STheme.get('space');
    const spacingsKeys = __keysFirst(Object.keys(spacingsObj), ['default']);

    vars.comment(
        () => `
      /**
        * @name          Spacing
        * @namespace          sugar.style.helpers.spacing
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/spacing
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply spacing to any HTMLElement container
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.spacing.classes;
        * 
        ${spacingsKeys
            .map((spaceName) => {
                if (spaceName === 'default') return '';
                return [
                    `* @cssClass     s-spacing:${spaceName}        Apply the \`${spaceName}\` spacing`,
                ].join('\n');
            })
            .join('\n')}
        *
        * 
        * @example        html          Vertical spacing
        * <div class="s-spacing:40">
        *   <h1 class="s-typo:h1">Hello world</h1>
        *   <p class="s-typo:lead">${__faker.name.findName()}</p>
        *   <p class="s-typo:p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas non tortor sed aliquet. Fusce finibus erat at leo scelerisque, a lobortis purus pretium. Aliquam ornare leo id mi imperdiet.</p>
        *   <a class="s-btn s-color:accent">Simple Cta</a>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    // base css
    vars.code(`
        .s-spacing {
            display: flex;
            flex-direction: column;
            align-items: inherit;
        }
    `);

    spacingsKeys.forEach((spaceName) => {
        // margins
        const clsMargin = `s-spacing:${spaceName}`;
        vars.comment(
            () => `/**
    * @name            ${clsMargin}
    * @namespace          sugar.style.helpers.spacing
    * @type             CssClass
    * @platform             css
    * @status               stable
    * 
    * This class allows you to apply the "<yellow>${spaceName}</yellow>" spacing style any HTMLElement container
    * 
    * @example      html
    * <div class="s-spacing:${spaceName}">
    *   <h1 class="s-typo:h1">Hello world</h1>
    *   <p class="s-typo:lead">${__faker.name.findName()}</p>
    *   <p class="s-typo:p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas non tortor sed aliquet. Fusce finibus erat at leo scelerisque, a lobortis purus pretium. Aliquam ornare leo id mi imperdiet.</p>
    *   <a class="s-btn s-color:accent">Simple Cta</a>
    * </div>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `,
        ).code(
            `
   .${clsMargin.replace(':', '-')} {
        gap: s.margin(${spaceName});
   }`,
            { type: 'CssClass' },
        );
    });

    // direction
    vars.comment(
        () => `/**
        * @name            s-spacing:row
        * @namespace          sugar.style.helpers.spacing
        * @type             CssClass
        * @platform             css
        * @status               stable
        * 
        * This class allows you to apply the "<yellow>row</yellow>" spacing direction any HTMLElement container
        * 
        * @example      html
        * <div class="s-spacing:30:row">
        *   <h1 class="s-typo:h1">Hello world</h1>
        *   <p class="s-typo:lead">${__faker.name.findName()}</p>
        *   <p class="s-typo:p">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis egestas non tortor sed aliquet. Fusce finibus erat at leo scelerisque, a lobortis purus pretium. Aliquam ornare leo id mi imperdiet.</p>
        *   <a class="s-btn s-color:accent">Simple Cta</a>
        * </div>
        * 
        * @since        2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
        `,
    ).code(
        `
        .s-spacing-row {
            flex-direction: unset;
        }`,
        { type: 'CssClass' },
    );

    return vars;
}
