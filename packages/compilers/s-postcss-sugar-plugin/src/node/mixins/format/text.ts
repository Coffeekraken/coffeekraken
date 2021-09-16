import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginFormatTextlMixinInterface extends __SInterface {
    static definition = {};
}
export { postcssSugarPluginFormatTextlMixinInterface as interface };

export interface postcssSugarPluginFormatTextMixinParams {}

/**
 * @name           text
 * @namespace      mixins.format
 * @type           Mixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to scope some css that you want to apply only in text format context.
 * Your css will be scoped inside the "s-format:text" class.
 *
 * @return      {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.format.text {
 *      font-size: 20px;
 *      margin-bottom: 50px;
 *    }
 * }
 *
 * @example       html
 * <h1 class="my-cool-element s-rhythm\:vertical">Hello world</h1>
 * <div class="s-format\:text">
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
    params: Partial<postcssSugarPluginFormatTextMixinParams>;
    atRule: any;
    postcssApi: any;
}) {
    const finalParams = <postcssSugarPluginFormatTextMixinParams>{
        ...(params ?? {}),
    };

    atRule.nodes?.forEach((node) => {
        if (!node.selector) return;
        node.selector = node.selector
            .split(',')
            .map((sel) => {
                return `.s-format--text ${sel}:not(.s-format--none ${sel})`;
            })
            .join(',');
    });
}
