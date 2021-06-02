import __SInterface from '@coffeekraken/s-interface';
import __theme, { themeDefinition } from '../../utils/theme';

class postcssSugarPluginStyleDefineMixinInterface extends __SInterface {
  static definition = {
    name: {
      type: 'String',
      required: true
    }
  };
}
export { postcssSugarPluginStyleDefineMixinInterface as interface };

export interface postcssSugarPluginStyleDefineMixinParams {
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
export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<postcssSugarPluginStyleDefineMixinParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams = <postcssSugarPluginStyleDefineMixinParams>{
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

  const styleCss = atRule.nodes
    .map((node) => {
      if (node.type === 'decl') return node.toString() + ';';
      return node.toString();
    })
    .join('\n');

  // @ts-ignore
  global._definedStyles[finalParams.name] = 
    [
      `.s-style-${finalParams.name.replace(/-default$/, '')} {`,
      styleCss,
      `}`
    ].join('\n');

    replaceWith([]);
}
