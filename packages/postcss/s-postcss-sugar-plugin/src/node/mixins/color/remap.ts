import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginColorRemapMixinInterface extends __SInterface {
    static get _definition() {
        return {
            color: {
                type: 'String',
                required: true,
            },
            toColor: {
                type: 'String',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginColorRemapMixinInterface as interface };

/**
 * @name           remap
 * @namespace      node.mixin.color
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to (re)map a color to another one like saying you want the "warning" color as the "primary" one
 *
 * @param       {String}        color           The color you want to map on another one
 * @param       {String}        toColor         THe color you want to override with the previous one
 * @return      {Css}                     The generated remap css
 *
 * @example        css
 * .my-section {
 *      @sugar.color.remap(warning, primary);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IPostcssSugarPluginColorRemapParams {
    color: string;
    toColor: string;
}

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginColorRemapParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginColorRemapParams = {
        color: '',
        toColor: '',
        ...params,
    };

    const vars: string[] = [
        ...__STheme.remapCssColor(finalParams.color, finalParams.toColor).vars,
    ];

    if (atRule.parent.type === 'root') {
        vars.unshift(':root {');
        vars.push('}');
    }

    return vars;
}
