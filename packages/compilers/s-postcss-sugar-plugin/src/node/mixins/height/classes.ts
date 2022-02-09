import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

/**
 * @name           classes
 * @namespace      node.mixins.height
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the height helper classes like s-height:20, s-height:50, etc...
 * It will generate all the height defined in the config.theme.height configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.height.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginWidthClassesMixinParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginWidthClassesMixinParams = {
        ...params,
    };

    const vars: string[] = [];

    const heightObj = __STheme.config('height');

    vars.push(`
      /**
        * @name          Heights
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/heights
        * @platform       css
        * @status       beta
        * 
        * These classes allows to apply some height to any HTMLElement.
        * These widths are defined in the \`theme.height\` theme settings.
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        ${Object.keys(heightObj).map((height) => {
            return ` * @cssClass             s-height:${height}            Apply the \`${height}\` height`;
        })}
        * 
        ${Object.keys(heightObj)
            .map((height) => {
                return ` * @example         html        ${height}%
                *   <div class="s-bg:main s-radius:30" style="height:500px">
                *      <div style="overflow:hidden" class="s-height:${height} s-text:center s-bg:accent s-p:30 s-radius:30">s-height:${height}</div>
                *   </div>`;
            })
            .join('\n')}
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    vars.push(`/**
    * @name            s-height:viewport
    * @namespace        sugar.css.width
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
    * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    */
   .s-height--viewport {
        position: relative;
        left: 50%;
        height: 100vh;
        transform: translate(0, -50%);
   }`);

    Object.keys(heightObj).forEach((name) => {
        vars.push(`/**
        * @name            s-height:${name}
        * @namespace        sugar.css.width
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
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
      .s-height--${name} {
            height: ${heightObj[name]};
      }`);
    });

    return vars;
}
