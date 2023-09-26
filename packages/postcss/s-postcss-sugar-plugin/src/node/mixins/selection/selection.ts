import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginLiikAndFeelSelectionInterface extends __SInterface {
    static get _definition() {
        return {
            color: {
                type: 'String',
                title: 'Color',
                description:
                    'Specify the color of the selection you want like "accent", "complementary", etc...',
                default: 'accent',
            },
        };
    }
}

export interface IPostcssSugarPluginLookAndFeelSelectionParams {
    color: string;
}

export { postcssSugarPluginLiikAndFeelSelectionInterface as interface };

/**
 * @name          selection
 * @as          @s.selection
 * @namespace     node.mixin.selection
 * @type          PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to apply a "selection" style to any HTMLElement.
 * This will apply a background and text color to the selected text.
 *
 * - Selection background and text color
 *
 * @param       {String}        layout      The layout to generate
 * @return      {Css}                   The corresponding grid css
 *
 * @snippet         @s.selection($1)
 *
 * @example       css
 * \@s.selection;
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
        color: 'accent',
        ...params,
    };

    const vars: string[] = [];

    const css = `
    ::selection {
        color: s.color(${finalParams.color}, --darken 20);
        background: s.color(${finalParams.color}, --lighten 30);
    }
  `;

    vars.push(css);

    return vars;
}
