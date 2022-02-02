import __SInterface from '@coffeekraken/s-interface';

/**
 * @name           classes
 * @namespace      node.mixins.visibility
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the overflow helper classes like ```.s-visibility:hidden```, etc...
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.visibility.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginOverflowClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginOverflowClassesParams = {
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
      /**
        * @name          Visibility
        * @namespace          sugar.css.helpers
        * @type               Styleguide
        * @menu           Styleguide / Helpers        /styleguide/helpers/visibility
        * @platform       css
        * @status       beta
        * 
        * These classes allows you to apply a visibility style on any HTMLElement
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @cssClass         s-visibility:hidden             Make the element hidden in the ui
        * @cssClass         s-visibility:visible            Make the element visible in the ui
        * @cssClass         s-visibility:collapse            Make the element visibly collapased in the ui
        * 
        * @example        html              Visible
        * <div class="s-bg:main s-radius s-p:30">
        *   <div style="height: 100px" class="s-bg:accent s-radius s-p:30">I'm visible</div>
        *   <div style="height: 100px" class="s-visibility:hidden s-bg:complementary s-radius s-p:30">I'm hidden</div>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    vars.push(`/**
    * @name          s-visibility:hidden
    * @namespace          sugar.css.visibility
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>hidden</yellow>" visibility style to any HTMLElement
    * 
    * @example        html
    * <div class="s-visibility:hidden">Hello world</div>
    */
    .s-visibility--hidden {
        visibility: hidden;
    }`);

    vars.push(`/**
    * @name          s-visibility:visible
    * @namespace          sugar.css.visibility
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>visible</yellow>" visibility style to any HTMLElement
    * 
    * @example        html
    * <div class="s-visibility:visible">Hello world</div>
    */
    .s-visibility--visible {
        visibility: visible;
    }`);

    vars.push(`/**
    * @name          s-visibility:collapse
    * @namespace          sugar.css.visibility
    * @type               CssClass
    * @platform             css
    * @status             beta
    * 
    * This class allows you to apply a "<yellow>collapse</yellow>" visibility style to any HTMLElement
    * 
    * @example        html
    * <div class="s-visibility:collapse">Hello world</div>
    */
    .s-visibility--collapse {
        visibility: collapse;
    }`);

    return vars;
}
