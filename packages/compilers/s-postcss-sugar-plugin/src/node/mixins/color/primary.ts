import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginColorPrimaryMixinInterface extends __SInterface {
    static get _definition() {
        return {
            color: {
                type: 'String',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginColorPrimaryMixinInterface as interface };

/**
 * @name           primary
 * @namespace      node.mixins.colors
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to (re)map the "primary" virtual color to another like "complementary", "accent", etc...
 *
 * @param       {String}        color           The color you want to map on the primary one
 * @return      {Css}                     The generated remap css
 *
 * @example         postcss
 * .my-section {
 *      @sugar.color.primary(success);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IPostcssSugarPluginColorPrimaryParams {
    color: string;
}

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginColorPrimaryParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginColorPrimaryParams = {
        color: '',
        ...params,
    };

    const vars: string[] = [
        `
        @sugar.color.remap(primary, ${finalParams.color});
    `,
    ];

    return vars;
}
