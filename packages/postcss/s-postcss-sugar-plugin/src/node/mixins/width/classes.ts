import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           classes
 * @as              @sugar.width.classes
 * @namespace      node.mixin.width
 * @type           PostcssMixin
 * @platform      postcss
 * @interface     ./classes
 * @status        beta
 *
 * This mixin generate all the width helper classes like s-width:20, s-width:50, etc...
 * It will generate all the width defined in the config.theme.width configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.width.classes
 *
 * @example        css
 * \@sugar.width.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginWidthClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginWidthClassesMixinParams {}

export { postcssSugarPluginWidthClassesMixinInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginWidthClassesMixinParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginWidthClassesMixinParams = {
        ...params,
    };

    const vars = new CssVars();

    const widthObj = __STheme.get('width');

    vars.comment(`
      /**
        * @name          Widths
        * @namespace          sugar.style.helpers.width
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/widths
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some width to any HTMLElement.
        * These widths are defined in the \`theme.width\` theme settings.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.width.classes;
        * 
        ${Object.keys(widthObj).map((width) => {
            return ` * @cssClass             s-width:${width}            Apply the \`${width}\` width`;
        })}
        * 
        ${Object.keys(widthObj)
            .map((width) => {
                return ` * @example         html        ${width}%
                *   <div class="s-bg:main-surface s-radius:30">
                *      <div style="overflow:hidden" class="s-width:${width} s-text:center s-bg:accent s-p:30 s-radius:30">s-width:${width}</div>
                *   </div>`;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);

    vars.comment(
        `/**
    * @name            s-width:viewport
    * @namespace          sugar.style.helpers.width
    * @type             CssClass
    * @platform         css
    * @status         beta
    * 
    * This class allows you to apply the "<yellow>viewport</yellow>" width to any HTMLElement
    * 
    * @example      html
    * <div class="s-container">
    *   <h1 class="s-typo\:h1">Hello world</h1>
    *   <div class="s-width\:viewport">
    *       <p class="s-typo\:p">Something cool</p>
    *   </div>
    * </div>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `,
    ).code(
        `
   .s-width--viewport {
        position: relative;
        left: 50%;
        width: 100vw;
        max-width: none;
        transform: translate(-50%);
   }`,
        { type: 'CssClass' },
    );

    Object.keys(widthObj).forEach((name) => {
        vars.comment(
            `/**
        * @name            s-width:${name}
        * @namespace          sugar.style.helpers.width
        * @type             CssClass
        * @platform         css
        * @status           beta
        * 
        * This class allows you to apply the "<yellow>${name}</yellow>" width to any HTMLElement
        * 
        * @example      html
        * <div class="s-container">
        *   <h1 class="s-typo\:h1">Hello world</h1>
        *   <div class="s-width\:${name}">
        *       <p class="s-typo\:p">Something cool</p>
        *   </div>
        * </div>
        * 
        * @since        2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
      .s-width--${name} {
            width: ${widthObj[name]};
            max-width: none;
            min-width: none;
      }`,
            { type: 'CssClass' },
        );
    });

    return vars;
}
