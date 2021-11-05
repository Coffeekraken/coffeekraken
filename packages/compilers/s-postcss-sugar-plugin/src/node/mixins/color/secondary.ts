import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginColorSecondaryMixinInterface extends __SInterface {
    static definition = {
        color: {
            type: 'String',
            required: true,
        },
    };
}
export { postcssSugarPluginColorSecondaryMixinInterface as interface };

/**
 * @name           current
 * @namespace      node.mixins.colors
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to (re)map the "secondary" color to another one you want like "accent", "success", etc...
 *
 * @param       {String}        color           The color you want to map on another one
 * @return      {Css}                     The generated remap css
 *
 * @example         postcss
 * .my-section {
 *      @sugar.color.secondary(accent);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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

    const cssArray: string[] = [
        `
        @sugar.color.remap(secondary, ${finalParams.color});
    `,
    ];

    replaceWith(cssArray);
}
