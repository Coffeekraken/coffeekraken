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
 * @name           accent
 * @as              @s.color.accent
 * @namespace      node.mixin.color
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to (re)map the "accent" virtual color to another like "complementary", "accent", etc...
 *
 * @param       {String}        color           The color you want to map on the accent one
 * @return      {Css}                     The generated remap css
 *
 * @snippet         @s.color.accent($1)
 *
 * @example        css
 * .my-section {
 *      @s.color.accent(success);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
        @s.color.remap(accent, ${finalParams.color});
    `,
    ];

    return vars;
}
