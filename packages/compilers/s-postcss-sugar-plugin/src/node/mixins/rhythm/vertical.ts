import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __astNodesToString from '../../utils/astNodesToString';
import * as __postcss from 'postcss';

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
 * @status        beta
 *
 * This mixin allows you to scope some css that you want to apply only in vertical rhythm context
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.rhythm.vertical {
 *      margin-bottom: 50px;
 *    }
 * }
 * 
 * @example       html
 * <h1 class="my-cool-element s-rhythm-vertical">Hello world</h1>
 * <div class="s-rhythm-vertical">
 *     <h1 class="my-cool-element">Hello world</h1>
 * </div>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({
  params,
  atRule
}: {
  params: Partial<postcssSugarPluginRhythmVerticalMixinParams>;
  atRule: any;
}) {
  const finalParams = <postcssSugarPluginRhythmVerticalMixinParams>{
    ...(params ?? {})
  };
  const container = __postcss.rule({
    selectors: [`.s-rhythm-vertical`]
  });
  atRule.nodes.forEach(n => {
    container.append(n.clone());
  });
  atRule.replaceWith(container);
}
