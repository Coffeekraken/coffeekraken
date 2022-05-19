import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginLiikAndFeelSelectionInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginLookAndFeelSelectionParams {}

export { postcssSugarPluginLiikAndFeelSelectionInterface as interface };

/**
 * @name          selection
 * @namespace     node.mixin.lnf
 * @type          PostcssMixin
 * @platform      postcss
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
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
    ::selection {
        color: sugar.color(accent, 100);
        background-color: sugar.color(accent);
    }
  `;

    vars.push(css);

    return vars;
}
