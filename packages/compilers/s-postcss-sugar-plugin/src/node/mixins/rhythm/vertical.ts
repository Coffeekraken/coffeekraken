import __SInterface from '@coffeekraken/s-interface';


class postcssSugarPluginRhythmVerticalMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginRhythmVerticalMixinInterface as interface };

export interface postcssSugarPluginRhythmVerticalMixinParams {
}

/**
 * @name           vertical
 * @namespace      mixins.rhythm
 * @type           Mixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to scope some css that you want to apply only in vertical rhythm context.
 * Your css will be scoped inside the "s-rhythm:vertical" class.
 *
 * @return      {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.rhythm.vertical {
 *      margin-bottom: 50px;
 *    }
 * }
 * 
 * @example       html
 * <h1 class="my-cool-element s-rhythm\:vertical">Hello world</h1>
 * <div class="s-rhythm\:vertical">
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
  params: Partial<postcssSugarPluginRhythmVerticalMixinParams>;
  atRule: any;
  postcssApi: any;
}) {
  const finalParams = <postcssSugarPluginRhythmVerticalMixinParams>{
    ...(params ?? {})
  };
  const container = new postcssApi.Rule({
    selectors: [`.s-rhythm--vertical`]
  });
  atRule.nodes.forEach(n => {
    container.append(n.clone());
  });
  atRule.replaceWith(container);
}
