import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __STheme from '@coffeekraken/s-theme';

class postcssSugarPluginThemeWhenMixinInterface extends __SInterface {
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
export { postcssSugarPluginThemeWhenMixinInterface as interface };

export interface postcssSugarPluginThemeWhenMixinParams {
    variant?: string;
    theme?: string;
}

/**
 * @name           when
 * @namespace      node.mixins.rhythm
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to scope some css for a particular theme.
 * This will mainly scope your css under a class named ```.s-theme:{name}``` but it's
 * nice to use this mixin to make this easier and more modulable
 *
 * @return      {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.theme.when(dark) {
 *      margin-bottom: 50px;
 *    }
 * }
 *
 * @example       html
 * <h1 class="my-cool-element">Hello world</h1>
 * <div class="s-theme\:dark">
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
    params: Partial<postcssSugarPluginThemeWhenMixinParams>;
    atRule: any;
    postcssApi: any;
}) {
    const finalParams = <postcssSugarPluginThemeWhenMixinParams>{
        ...(params ?? {}),
    };

    let theme = finalParams.theme,
        variant = finalParams.variant;
    // if (!theme) theme = __STheme.get('theme.theme');
    // if (!variant) variant = __STheme.get('theme.variant');

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
