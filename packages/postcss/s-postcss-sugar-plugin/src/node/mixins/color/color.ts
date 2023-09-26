import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginColorMixinInterface extends __SInterface {
    static get _definition() {
        return {
            current: {
                type: 'String',
                required: true,
            },
            accent: {
                type: 'String',
            },
            complementary: {
                type: 'String',
            },
        };
    }
}
export { postcssSugarPluginColorMixinInterface as interface };

/**
 * @name           color
 * @as              @s.color
 * @namespace      node.mixin.color
 * @type           PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to (re)map the "current", "accent" and "complementary" color to any other colors you want like "accent", "success, "etc...""
 * Note that is you don't specify any "accent" and "complementary" color, these once will be set to the passed "current" color.
 *
 * @param       {String}        current             The new color you want for the "current" one
 * @param       {String}        [accent=null]             The new color you want for the "accent" one
 * @param       {String}        [complementary=null]             The new color you want for the "complementary" one
 * @return      {Css}                     The generated remap css
 *
 * @snippet         @s.color($1)
 *
 * @example        css
 * .my-section {
 *      @s.color(accent, complementary, success);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface IPostcssSugarPluginColorParams {
    current: string;
    accent?: string;
    complementary?: string;
}

export default function ({
    params,
    atRule,
    CssVars,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginColorParams>;
    atRule: any;
    CssVars: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginColorParams = {
        current: '',
        accent: undefined,
        complementary: undefined,
        ...params,
    };

    // if (finalParams.current === 'current')
    //     throw new Error(
    //         `You cannot remap the "<yellow>current</yellow>" color to "<cyan>current</cyan>"...`,
    //     );
    // if (finalParams.accent === 'accent')
    //     throw new Error(
    //         `You cannot remap the "<yellow>accent</yellow>" color to "<cyan>accent</cyan>"...`,
    //     );
    // if (finalParams.complementary === 'complementary')
    //     throw new Error(
    //         `You cannot remap the "<yellow>complementary</yellow>" color to "<cyan>complementary</cyan>"...`,
    //     );

    const vars = new CssVars();

    vars.code(`@s.color.remap(current, ${finalParams.current})`);

    if (finalParams.accent) {
        vars.code(`@s.color.remap(accent, ${finalParams.accent});`);
    }
    if (finalParams.complementary) {
        vars.code(
            `@s.color.remap(complementary, ${finalParams.complementary});`,
        );
    }

    return vars;
}
