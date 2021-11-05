import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginLiikAndFeelSelectionInterface extends __SInterface {
    static definition = {};
}

export interface IPostcssSugarPluginLookAndFeelSelectionParams {}

export { postcssSugarPluginLiikAndFeelSelectionInterface as interface };

/**
 * @name          selection
 * @namespace     node.mixin.lnf
 * @type          PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin apply some base look and feel depending on the current theme like:
 *
 * - Selection background and text color
 *
 * @param       {String}        layout      The layout to generate
 * @return      {Css}                   The corresponding grid css
 *
 * @example       css
 * \@sugar.lnf.selection;
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: IPostcssSugarPluginLookAndFeelSelectionParams;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginLookAndFeelSelectionParams = {
        ...params,
    };

    const vars: string[] = [];

    const css = `
        color: sugar.color(accent, 100);
        background-color: sugar.color(accent);
  `;

    vars.push(css);

    return vars;
}
