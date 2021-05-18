import __SInterface from '@coffeekraken/s-interface';
import __theme, { themeDefinition } from '../../utils/theme';

class postcssSugarPluginStyleClassesMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginStyleClassesMixinInterface as interface };

export interface postcssSugarPluginStyleClassesMixinParams {}

/**
 * @name           classes
 * @namespace      mixins.style
 * @type           Mixin
 * @status        beta
 *
 * This mixin print the styles css
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.style();
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
  processNested
}: {
  params: Partial<postcssSugarPluginStyleClassesMixinParams>;
  atRule: any;
  processNested: Function;
}) {
  // const finalParams = <postcssSugarPluginStyleClassesMixinParams>{
  //   ...(params ?? {})
  // };

  const vars: string[] = [];

  // @ts-ignore
  Object.keys(global._definedStyles).forEach((styleName) => {
    // @ts-ignore
    vars.push(global._definedStyles[styleName].toString());
  });

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
