import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginLiikAndFeelBaseInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}

export interface IPostcssSugarPluginLookAndFeelBaseParams {}

export { postcssSugarPluginLiikAndFeelBaseInterface as interface };

/**
 * @name          base
 * @as          @s.lnf.base
 * @namespace     node.mixin.lnf
 * @type          PostcssMixin
 * @platform      postcss
 * @status        beta
 * @private
 *
 * This mixin apply some base look and feel depending on the current theme like:
 *
 * - Page background using the <s-color="accent">background</s-color> theme color
 * - Text color using the <s-color="accent">default</s-color> theme color
 *
 * @param       {String}        layout      The layout to generate
 * @return      {Css}                   The corresponding grid css
 *
 * @snippet         @s.lnf.base
 *
 * @example       css
 * \@s.lnf.base;
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: IPostcssSugarPluginLookAndFeelBaseParams;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginLookAndFeelBaseParams = {
        ...params,
    };

    const vars: string[] = [];

    const css = `
        color: s.color(main, text);
        background-color: s.color(main, background);
        @s.font.family(default);
        @s.font.size(default);
        @s.shape(default);
        --s-scale: s.theme(scale.default);

        @s.wireframe {
            color: rgba(0, 0, 0, 0.5);
            @s.wireframe.background;

            @s.theme dark {
                color: rgba(255, 255, 255, 0.7);
            }
        }       

  `;

    vars.push(css);

    return vars;
}
