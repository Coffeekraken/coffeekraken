import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

/**
 * @name           styleguide
 * @namespace      node.mixins.reset
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate the styleguide documentation for the reset helpers
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.reset.styleguide;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginResetStyleguideInterface extends __SInterface {
    static definition = {};
}

export interface IPostcssSugarPluginResetStyleguideClassesParams {
    ratio: number;
}

export { postcssSugarPluginResetStyleguideInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginResetStyleguideClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginResetStyleguideClassesParams = {
        ratio: 1,
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
      /**
        * @name          Global reset
        * @namespace          sugar.css.resets
        * @type               Styleguide
        * @menu           Styleguide / Resets        /styleguide/resets/global
        * @platform       css
        * @status       beta
        * 
        * These mixins allows you to apply some resets like \`destyle\` and/or the \`sugar\` one.
        * The \`destyle\` one is well known and you can find the documentation on their website.
        * The \`sugar\` one is our own that add some resets like setting max-width to 100% for images, and some more. Check our his own documentation page.
        * 
        * @feature      Apply the \`destyle\` reset
        * @feature      Apply the \`sugar\` reset
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @example        css
        * \\@sugar.reset;
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    vars.push(`
      /**
        * @name          Destyle reset
        * @namespace          sugar.css.resets
        * @type               Styleguide
        * @menu           Styleguide / Resets        /styleguide/resets/destyle
        * @platform       css
        * @status       beta
        * 
        * These mixins allows you to apply the \`destyle\` reset easily.
        * 
        * @feature      Ensures consistency across browsers as much as possible
        * @feature      Prevents the necessity of reseting user agent styles
        * @feature      Prevents style inspector bloat by only targeting what is necessary
        * @feature      Removes margins & paddings
        * @feature      Removes default font styles and ensures proper inheritance
        * @feature      Contributes to the separation of presentation and semantics
        * @feature      Sets sensible default styles
        * @feature      Well suited for utility class libraries and large codebases
        * @feature      Made for modern browsers only, therefor small in size (~0.95kb)
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @example        css
        * \\@sugar.reset.destyle;
        * 
        * @see          https://github.com/nicolas-cusan/destyle.css
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    vars.push(`
      /**
        * @name          Sugar reset
        * @namespace          sugar.css.resets
        * @type               Styleguide
        * @menu           Styleguide / Resets        /styleguide/resets/sugar
        * @platform       css
        * @status       beta
        * 
        * These mixins allows you to apply the \`sugar\` reset easily.
        * 
        * @feature     Handle body height for IOS devices using the \`fill-available\` and \`min-height: -webkit-fill-available;\` technique
        * @feature     Ensure template are not displayed
        * @feature     Ensure hidden things are not displayed
        * @feature     Set the \`box-sizing\` to \`border-box\` for all HTMLElement
        * @feature     Set the webkit highlight color to transparent color
        * @feature     Remote outline on every elements
        * @feature     Set the \`max-width\` to \`100%\` for images     
        * 
        * @support      chromium
        * @support      firefox
        * @support      safari
        * @support      edge
        * 
        * @example        css
        * \\@sugar.reset.sugar;
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);

    replaceWith(vars);
}
