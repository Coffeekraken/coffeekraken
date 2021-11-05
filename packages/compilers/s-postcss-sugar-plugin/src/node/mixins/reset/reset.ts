import __SInterface from '@coffeekraken/s-interface';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';

/**
 * @name           reset
 * @namespace      node.mixins.reset
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the reset css needed to standardize display
 * on all browsers.
 *
 * @ƒeature       Reset from https://github.com/nicolas-cusan/destyle.css
 * @feature      Body height on desktop and IOS using "fill-available" technique
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * \@sugar.ratio.classes;
 *
 * @see       https://github.com/nicolas-cusan/destyle.css
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginResetInterface extends __SInterface {
    static definition = {};
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
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginResetParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginResetParams = {
        ...params,
    };

    const vars: string[] = [];

    vars.push(`
      @sugar.reset.destyle;
      @sugar.reset.sugar;
  `);

    return vars;
}
