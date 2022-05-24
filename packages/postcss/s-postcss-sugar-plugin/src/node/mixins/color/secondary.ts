import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginColorSecondaryMixinInterface extends __SInterface {
    static get _definition() {
        return {
            color: {
                type: 'String',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginColorSecondaryMixinInterface as interface };

/**
 * @name           current
 * @namespace      node.mixin.color
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to (re)map the "secondary" color to another one you want like "accent", "success", etc...
 *
 * @param       {String}        color           The color you want to map on another one
 * @return      {Css}                     The generated remap css
 *
 * @example        css
 * .my-section {
 *      @sugar.color.secondary(accent);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IPostcssSugarPluginColorSecondaryParams {
    color: string;
}

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginColorSecondaryParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginColorSecondaryParams = {
        color: '',
        ...params,
    };

    const vars: string[] = [
        `
        @sugar.color.remap(secondary, ${finalParams.color});
    `,
    ];

    return vars;
}
