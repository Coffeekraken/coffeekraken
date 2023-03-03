import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginThemeMixinInterface extends __SInterface {
    static get _definition() {
        return {
            variant: {
                type: 'String',
            },
            theme: {
                type: 'String',
            },
        };
    }
}
export { postcssSugarPluginThemeMixinInterface as interface };

export interface postcssSugarPluginThemeMixinParams {
    variant?: string;
    theme?: string;
}

/**
 * @name           theme
 * @namespace      node.mixin.theme
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to scope some css for a particular theme.
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @sugar.theme($1)
 * \@sugar.theme $1 {
 *      $2
 * }
 *
 * @example        css
 * .my-cool-element {
 *    \@sugar.theme(dark) {
 *      margin-bottom: 50px;
 *    }
 * }
 *
 * @example       html
 * <h1 class="my-cool-element">Hello world</h1>
 * <div theme="default-dark">
 *     <h1 class="my-cool-element">Hello world</h1>
 * </div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({
    params,
    atRule,
    postcssApi,
}: {
    params: Partial<postcssSugarPluginThemeMixinParams>;
    atRule: any;
    postcssApi: any;
}) {
    const finalParams = <postcssSugarPluginThemeMixinParams>{
        ...(params ?? {}),
    };

    if (!atRule.nodes) {
        throw new Error(
            `<red>[@sugar.theme]</red> The <yellow>@sugar.theme(...)</yellow> mixin MUST contain some children...`,
        );
    }

    let theme = finalParams.theme,
        variant = finalParams.variant;

    let container;

    if (theme && variant) {
        container = new postcssApi.Rule({
            selectors: [
                `[theme^="${theme}"][theme$="${variant}"] &`,
                `&[theme^="${theme}"][theme$="${variant}"]`,
            ],
        });
    } else if (theme) {
        container = new postcssApi.Rule({
            selectors: [`[theme^="${theme}"] &`, `&[theme^="${theme}"]`],
        });
    } else if (variant) {
        container = new postcssApi.Rule({
            selectors: [`[theme$="${variant}"] &`, `&[theme$="${variant}"]`],
        });
    }

    atRule.nodes.forEach((n) => {
        container.append(n.clone());
    });
    atRule.replaceWith(container);
}
