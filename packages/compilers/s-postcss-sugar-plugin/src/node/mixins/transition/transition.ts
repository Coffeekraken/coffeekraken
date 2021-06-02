import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

class postcssSugarPluginTransitionMixinInterface extends __SInterface {
  static definition = {
      name: {
          type: 'String',
          required: true,
          default: 'default'
      }
  };
}
export { postcssSugarPluginTransitionMixinInterface as interface };

export interface postcssSugarPluginTransitionMixinParams {
    name: string;
}

/**
 * @name           transition
 * @namespace      mixins.transition
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows apply a transition specified in the theme config like "fast", "slow" and "slow" or others you've been defined
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.transition(fast);
 * }
 * 
 * @example       html
 * <h1 class="my-cool-element">Hello world</h1>
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<postcssSugarPluginTransitionMixinParams>;
  atRule: any;
  replaceWith: Function
}) {
  const finalParams = <postcssSugarPluginTransitionMixinParams>{
    ...(params ?? {})
  };
  const vars: string[] = [
      `transition: sugar.transition(${finalParams.name});`
  ];

  replaceWith(vars);
}
