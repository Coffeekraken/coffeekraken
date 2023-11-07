import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           classes
 * @namespace      node.mixin.height
 * @type           PostcssMixin
 * @platform      postcss
 * @status        alpha
 *
 * This mixin generate all the height helper classes like s-height:20, s-height:50, etc...
 * It will generate all the height defined in the config.theme.height configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.height.classes
 *
 * @example        css
 * @s.height.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class SSugarcssPluginWidthClassesMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface ISSugarcssPluginWidthClassesMixinParams {}

export { SSugarcssPluginWidthClassesMixinInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<ISSugarcssPluginWidthClassesMixinParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: ISSugarcssPluginWidthClassesMixinParams = {
        ...params,
    };

    const vars = new CssVars();

    const heightObj = __STheme.get('height');

    vars.comment(
        `
      /**
        * @name          Height
        * @namespace          sugar.style.helpers.height
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/heights
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some height to any HTMLElement.
        * These widths are defined in the \`theme.height\` theme settings.
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.height.classes; 
        * 
        ${Object.keys(heightObj).map((height) => {
            return ` * @cssClass             s-height:${height}            Apply the \`${height}\` height`;
        })}
        * 
        ${Object.keys(heightObj)
            .map((height) => {
                return ` * @example         html        ${height}%
                *   <div class="s-bc:main-surface s-radius:30" style="height:500px">
                *      <div style="overflow:hidden" class="s-height:${height} s-text:center s-bc:accent s-p:30 s-radius:30">s-height:${height}</div>
                *   </div>`;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `,
    );

    vars.comment(
        `/**
    * @name            s-height:viewport
    * @namespace          sugar.style.helpers.height
    * @type             CssClass
    * @platform         css
    * @status         beta
    * 
    * This class allows you to apply the "<yellow>viewport</yellow>" height to any HTMLElement
    * 
    * @example      html
    * <div class="s-container">
    *   <h1 class="s-typo:h1">Hello world</h1>
    *   <div class="s-height:viewport">
    *       <p class="s-typo:p">Something cool</p>
    *   </div>
    * </div>
    * 
    * @since        2.0.0
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
    */
   `,
    ).code(
        `
   .s-height-viewport {
        position: relative;
        left: 50%;
        height: 100vh;
        transform: translate(0, -50%);
   }`,
        { type: 'CssClass' },
    );

    Object.keys(heightObj).forEach((name) => {
        vars.comment(
            `/**
        * @name            s-height:${name}
        * @namespace          sugar.style.helpers.height
        * @type             CssClass
        * @platform         css
        * @status           beta
        * 
        * This class allows you to apply the "<yellow>${name}</yellow>" height to any HTMLElement
        * 
        * @example      html
        * <div class="s-container" style="height:500px">
        *   <h1 class="s-typo:h1">Hello world</h1>
        *   <div class="s-height:${name}">
        *       <p class="s-typo:p">Something cool</p>
        *   </div>
        * </div>
        * 
        * @since        2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
       `,
        ).code(
            `
      .s-height-${name} {
            height: ${heightObj[name]};
      }`,
            { type: 'CssClass' },
        );
    });

    return vars;
}
