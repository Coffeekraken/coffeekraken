import __SInterface from '@coffeekraken/s-interface';
import { __dirname } from '@coffeekraken/sugar/fs';

/**
 * @name           reset
 * @namespace      node.mixin.reset
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the reset css needed to standardize display
 * on all browsers.
 *
 * @ƒeature       Reset from https://github.com/nicolas-cusan/destyle.css
 * @feature      Body height on desktop and IOS using "fill-available" technique
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.reset
 * 
 * @example        css
 * \@sugar.reset;
 *
 * @see       https://github.com/nicolas-cusan/destyle.css
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

class postcssSugarPluginResetInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginResetParams {}

export { postcssSugarPluginResetInterface as interface };

export function dependencies() {
    return {
        files: [`${__dirname()}/destyle.js`, `${__dirname()}/sugar.js`],
    };
}

export default function ({
    params,
    CssVars,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginResetParams>;
    CssVars: any;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginResetParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.comment(
        () => `
        /**
        * @name          Global reset
        * @namespace          sugar.style.resets
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
        * \@sugar.reset;
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
        `,
    ).code(`
      @sugar.reset.destyle;
      @sugar.reset.sugar;
  `);

    return vars;
}
