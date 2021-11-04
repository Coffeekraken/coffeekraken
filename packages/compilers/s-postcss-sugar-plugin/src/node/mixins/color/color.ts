import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginColorMixinInterface extends __SInterface {
    static definition = {
        color: {
            type: 'String',
            required: true,
        },
    };
}
export { postcssSugarPluginColorMixinInterface as interface };

/**
 * @name           remap
 * @namespace      node.mixins.colors
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to (re)map a color to another one like saying you want the "warning" color as the "primary" one
 *
 * @param       {String}        color           The color you want to map on another one
 * @param       {String}        toColor         THe color you want to override with the previous one
 * @return      {Css}                     The generated remap css
 *
 * @example         postcss
 * .my-section {
 *      @sugar.color(primary);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IPostcssSugarPluginColorParams {
    color: string;
}

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginColorParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginColorParams = {
        color: '',
        ...params,
    };

    const cssArray: string[] = [
        `
        @sugar.color.remap(current, ${finalParams.color});
    `,
    ];

    replaceWith(cssArray);
}
