import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginAlignInterface extends __SInterface {
    static get _definition() {
        return {
            align: {
                type: 'String',
                required: true,
            },
        };
    }
}

export interface IPostcssSugarPluginAlignParams {
    align: string;
}

export { postcssSugarPluginAlignInterface as interface };

/**
 * @name          abs
 * @namespace     node.mixin.align
 * @type          PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to center an item using the absolute method. Here's the accepted alignements:
 *
 * - <s-color="accent">top</s-color>: Align item to the top
 * - <s-color="accent">left</s-color>: Align item to the left
 * - <s-color="accent">right</s-color>: Align item to the right
 * - <s-color="accent">bottom</s-color>: Align item to the bottom
 * - <s-color="accent">center</s-color>: Align item to the center (x and y)
 * - <s-color="accent">center-x</s-color>: Align item to the center-x
 * - <s-color="accent">center-y</s-color>: Align item to the center-y
 *
 * These values can be specified like "top right", "bottom center-x", etc...
 *
 * @param       {String}        layout      The layout to generate
 * @return      {Css}                   The corresponding grid css
 *
 * @example       css
 * .my-element {
 *    \@sugar.align.abs(top right);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: IPostcssSugarPluginAlignParams;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginAlignParams = {
        ...params,
    };

    const vars = new CssVars();

    vars.code(`
        position: absolute;
    `);

    let transform = '';
    const alignSplits = finalParams.align.split(' ').map((l) => l.trim());

    if (alignSplits.indexOf('top') !== -1) {
        vars.code('top: 0;');
    } else if (alignSplits.indexOf('bottom') !== -1) {
        vars.code('bottom: 0;');
    } else if (
        alignSplits.indexOf('center') !== -1 ||
        alignSplits.indexOf('center-y') !== -1
    ) {
        vars.code('top: 50%;');
        transform += 'translateY(-50%) ';
    }

    if (alignSplits.indexOf('left') !== -1) {
        vars.code('left: 0;');
    } else if (alignSplits.indexOf('right') !== -1) {
        vars.code('right: 0;');
    } else if (
        alignSplits.indexOf('center') !== -1 ||
        alignSplits.indexOf('center-x') !== -1
    ) {
        vars.code('left: 50%;');
        transform += 'translateX(-50%)';
    }

    if (transform) {
        vars.code(`transform: ${transform.trim()};`);
    }

    return vars;
}
