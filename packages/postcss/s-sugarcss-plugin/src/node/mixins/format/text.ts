import __SInterface from '@coffeekraken/s-interface';

class SSugarcssPluginFormatTextlMixinInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { SSugarcssPluginFormatTextlMixinInterface as interface };

export interface SSugarcssPluginFormatTextMixinParams {}

/**
 * @name           text
 * @as              @s.format.text
 * @namespace      node.mixin.format
 * @type           PostcssMixin
 * @platform      postcss
 * @status        alpha
 *
 * This mixin allows you to scope some css that you want to apply only in text format context.
 * Your css will be scoped inside the "s-format:text" class.
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @s.format.text
 * @s.format.text {
 *      $1
 * }
 *
 * @example        css
 * .my-cool-element {
 *    @s.format.text {
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({
    params,
    atRule,
    unwrap,
    postcssApi,
}: {
    params: Partial<SSugarcssPluginFormatTextMixinParams>;
    atRule: any;
    unwrap: Function;
    postcssApi: any;
}) {
    const finalParams = <SSugarcssPluginFormatTextMixinParams>{
        ...(params ?? {}),
    };

    atRule.nodes?.forEach((node) => {
        if (node.selector && !node.selector.match(/^\.s-format-text/)) {
            node.selector = node.selector
                .split(',')
                .map((sel) => {
                    return `.s-format-text ${sel}:not(.s-format-none ${sel}), .preview .s-format-text ${sel}`;
                })
                .join(',');
        }
    });

    atRule.replaceWith(atRule.nodes);
}
