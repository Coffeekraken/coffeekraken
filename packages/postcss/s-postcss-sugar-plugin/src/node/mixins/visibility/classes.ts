import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @as              @s.visibility.classes
 * @namespace      node.mixin.visibility
 * @type           PostcssMixin
 * @platform      postcss
 * @interface       ./classes
 * @status        stable
 *
 * This mixin generate all the overflow helper classes like ```.s-visibility:hidden```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.visibility.classes
 *
 * @example        css
 * @s.visibility.classes;
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
        * @name          Visibility
        * @namespace          sugar.style.helpers.visibility
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/visibility
        * @platform       css
        * @status       stable
        * 
        * These classes allows you to apply a visibility style on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * @s.visibility.classes;
        * 
        * .my-element {
        *   @s.visibility.hidden;
        * } 
        * 
        * @cssClass         s-visibility:hidden             Make the element hidden in the ui
        * @cssClass         s-visibility:visible            Make the element visible in the ui
        * @cssClass         s-visibility:collapse            Make the element visibly collapased in the ui
        * 
        * @example        html              Visible
        * <div class="s-bc:main s-radius s-p:30">
        *   <div style="height: 100px" class="s-bc:accent s-radius s-p:30">I'm visible</div>
        *   <div style="height: 100px" class="s-visibility:hidden s-bc:complementary s-radius s-p:30">I'm hidden</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);

    vars.comment(
        `/**
    * @name          s-visibility:hidden
    * @namespace          sugar.style.helpers.visibility
    * @type               CssClass
    * @platform             css
    * @status             stable
    * 
    * This class allows you to apply a "<yellow>hidden</yellow>" visibility style to any HTMLElement
    * 
    * @example        html
    * <div class="s-visibility:hidden">Hello world</div>
    */
   `,
    ).code(
        `
    .s-visibility-hidden {
        visibility: hidden;
    }`,
        { type: 'CssClass' },
    );

    vars.comment(
        `/**
    * @name          s-visibility:visible
    * @namespace          sugar.style.helpers.visibility
    * @type               CssClass
    * @platform             css
    * @status             stable
    * 
    * This class allows you to apply a "<yellow>visible</yellow>" visibility style to any HTMLElement
    * 
    * @example        html
    * <div class="s-visibility:visible">Hello world</div>
    */
   `,
    ).code(
        `
    .s-visibility-visible {
        visibility: visible;
    }`,
        { type: 'CssClass' },
    );

    vars.comment(
        `/**
    * @name          s-visibility:collapse
    * @namespace          sugar.style.helpers.visibility
    * @type               CssClass
    * @platform             css
    * @status             stable
    * 
    * This class allows you to apply a "<yellow>collapse</yellow>" visibility style to any HTMLElement
    * 
    * @example        html
    * <div class="s-visibility:collapse">Hello world</div>
    */
   `,
    ).code(
        `
    .s-visibility-collapse {
        visibility: collapse;
    }`,
        { type: 'CssClass' },
    );

    return vars;
}
