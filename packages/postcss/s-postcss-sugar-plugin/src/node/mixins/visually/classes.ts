import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @namespace      node.mixin.visually
 * @type           PostcssMixin
 * @interface       ./classes
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the overflow helper classes like ```.s-visually:hidden```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example        css
 * \@sugar.visually.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginOverflowClassesInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginOverflowClassesParams {}

export { postcssSugarPluginOverflowClassesInterface as interface };

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginOverflowClassesParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginOverflowClassesParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(`
      /**
        * @name          Visually
        * @namespace          sugar.style.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/visually
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a visually style on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass         s-visually:hidden             Make the element hidden in the ui
        * @cssClass         s-visually:visible            Make the element visible in the ui
        * 
        * @example        html             Visually
        * <div class="s-bg:main-surface s-radius s-p:30">
        *   <div style="height: 100px" class="s-bg:accent s-radius s-p:30">I'm visible</div>
        *   <div style="height: 100px" class="s-visually:hidden s-bg:complementary s-radius s-p:30">I'm hidden</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);

    vars.comment(
        `/**
    * @name          s-visually:hidden
    * @namespace          sugar.style.visually
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>hidden</yellow>" visually style to any HTMLElement
    * 
    * @example        html
    * <div class="s-visually:hidden">Hello world</div>
    */
    `,
    ).code(
        `
    .s-visually--hidden {
       @sugar.visually.hidden;
    }`,
        { type: 'CssClass' },
    );

    return vars;
}
