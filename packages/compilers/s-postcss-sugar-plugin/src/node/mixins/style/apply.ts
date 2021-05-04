import __SInterface from '@coffeekraken/s-interface';
import __theme, { themeDefinition } from '../../utils/theme';

class postcssSugarPluginStyleApplyMixinInterface extends __SInterface {
  static definition = {
    name: {
      type: 'String',
      required: true
    }
  };
}
export { postcssSugarPluginStyleApplyMixinInterface as interface };

export interface postcssSugarPluginStyleApplyMixinParams {
  name: string;
}

/**
 * @name           scope
 * @namespace      mixins.theme
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to start a scope whithin which the passed theme will be used to generate
 * the different styles.
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.theme.scope(dark) {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
if (!global._definedStyles) {
  // @ts-ignore
  global._definedStyles = {};
}
export default function (
  params: Partial<postcssSugarPluginStyleApplyMixinParams>,
  atRule,
  processNested
) {
  const finalParams = <postcssSugarPluginStyleApplyMixinParams>{
    ...(params ?? {})
  };

  if (!finalParams.name) {
    throw new Error(
      `<red>[postcss.sugar.style.apply]</red> Sorry but to apply a style you MUST specify a name for it`
    );
  }
  // @ts-ignore
  //   if (!global._definedStyles[finalParams.name]) {
  //     throw new Error(
  //       `<red>[postcss.sugar.style.apply]</red> Sorry but the requested style "<yellow>${
  //         finalParams.name
  //       }</yellow>" has not been defined. Here's the list of available style: <green>${Object.keys(
  //         // @ts-ignore
  //         global._definedStyles
  //       ).join(',')}</green>`
  //     );
  //   }

  const vars: string[] = [];
  // @ts-ignore
  if (!global._definedStyles[finalParams.name]) {
    vars.push(`content: "s-style-${finalParams.name}"`);
  } else {
    vars.push(`@extend .s-style-${finalParams.name}`);
  }

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
