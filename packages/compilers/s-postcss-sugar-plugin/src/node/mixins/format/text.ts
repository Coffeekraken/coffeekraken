import __SInterface from '@coffeekraken/s-interface';


class postcssSugarPluginFormatTextlMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginFormatTextlMixinInterface as interface };

export interface postcssSugarPluginFormatTextMixinParams {
}

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
  postcssApi
}: {
  params: Partial<postcssSugarPluginFormatTextMixinParams>;
  atRule: any;
  postcssApi: any;
}) {
  const finalParams = <postcssSugarPluginFormatTextMixinParams>{
    ...(params ?? {})
  };
  const container = new postcssApi.Rule({
    selectors: [`.s-format--text`]
  });
  atRule.nodes.forEach(n => {
    container.append(n.clone());
  });
  atRule.replaceWith(container);
}
