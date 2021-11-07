import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginColorMixinInterface extends __SInterface {
    static get definition() {
        return (
            this.cached() ??
            this.cache({
                current: {
                    type: 'String',
                    required: true,
                },
                primary: {
                    type: 'String',
                },
                secondary: {
                    type: 'String',
                },
            })
        );
    }
}
export { postcssSugarPluginColorMixinInterface as interface };

/**
 * @name           color
 * @namespace      node.mixins.colors
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to (re)map the "current", "primary" and "secondary" color to any other colors you want like "accent", "success, "etc...""
 * Note that is you don't specify any "primary" and "secondary" color, these once will be set to the passed "current" color.
 *
 * @param       {String}        current             The new color you want for the "current" one
 * @param       {String}        [primary=null]             The new color you want for the "primary" one
 * @param       {String}        [secondary=null]             The new color you want for the "secondary" one
 * @return      {Css}                     The generated remap css
 *
 * @example         postcss
 * .my-section {
 *      @sugar.color(accent, complementary, success);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface IPostcssSugarPluginColorParams {
    current: string;
    primary?: string;
    secondary?: string;
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
        current: '',
        primary: undefined,
        secondary: undefined,
        ...params,
    };

    // if (finalParams.current === 'current')
    //     throw new Error(
    //         `You cannot remap the "<yellow>current</yellow>" color to "<cyan>current</cyan>"...`,
    //     );
    // if (finalParams.primary === 'primary')
    //     throw new Error(
    //         `You cannot remap the "<yellow>primary</yellow>" color to "<cyan>primary</cyan>"...`,
    //     );
    // if (finalParams.secondary === 'secondary')
    //     throw new Error(
    //         `You cannot remap the "<yellow>secondary</yellow>" color to "<cyan>secondary</cyan>"...`,
    //     );

    const cssArray: string[] = [
        `@sugar.color.remap(current, ${finalParams.current});`,
    ];

    if (finalParams.primary) {
        cssArray.push(`@sugar.color.remap(primary, ${finalParams.primary});`);
    } else {
        cssArray.push(`@sugar.color.remap(primary, ${finalParams.current});`);
    }
    if (finalParams.secondary) {
        cssArray.push(
            `@sugar.color.remap(secondary, ${finalParams.secondary});`,
        );
    } else {
        cssArray.push(`@sugar.color.remap(secondary, ${finalParams.current});`);
    }

    replaceWith(cssArray);
}
