import __SInterface from '@coffeekraken/s-interface';
import __theme, { themeDefinition } from '../../utils/theme';

class postcssSugarPluginStyleMixinInterface extends __SInterface {
  static definition = {
    name: {
      type: 'String',
      required: true
    }
  };
}
export { postcssSugarPluginStyleMixinInterface as interface };

export interface postcssSugarPluginStyleMixinParams {
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
  params: Partial<postcssSugarPluginStyleMixinParams>,
  atRule,
  processNested
) {
  const finalParams = <postcssSugarPluginStyleMixinParams>{
    ...(params ?? {})
  };

  if (!finalParams.name) {
    throw new Error(
      `<red>[postcss.sugar.style]</red> Sorry but to define a style you MUST specify a name for it`
    );
  }
  if (atRule.parent && atRule.parent.type !== 'root') {
    throw new Error(
      `<red>[postcss.sugar.style]</red> Sorry but this mixin MUST be called at stylesheet root`
    );
  }

  // @ts-ignore
  global._definedStyles[finalParams.name] = atRule;

  const vars: string[] = [
    `.s-style-${finalParams.name} {`,
    processNested(atRule.nodes),
    `}`
  ];

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
