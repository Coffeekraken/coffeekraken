import __SInterface from '@coffeekraken/s-interface';
import __astNodesToString from '../../utils/astNodesToString';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

class postcssSugarPluginThemeWhenMixinInterface extends __SInterface {
    static definition = {
        variant: {
            type: 'String',
            default: __SSugarConfig.get('theme.variant'),
        },
        theme: {
            type: 'String',
            default: __SSugarConfig.get('theme.theme'),
        },
    };
}
export { postcssSugarPluginThemeWhenMixinInterface as interface };

export interface postcssSugarPluginThemeWhenMixinParams {
    variant: string;
    theme: string;
}

/**
 * @name           when
 * @namespace      mixins.rhythm
 * @type           Mixin
 * @platform      css
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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

    console.log(finalParams);

    const container = new postcssApi.Rule({
        selectors: [
            `.s-theme--${finalParams.theme}-${finalParams.variant} &`,
            `&.s-theme--${finalParams.theme}-${finalParams.variant}`,
        ],
    });
    atRule.nodes.forEach((n) => {
        container.append(n.clone());
    });
    atRule.replaceWith(container);
}
