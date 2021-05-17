import __SInterface from '@coffeekraken/s-interface';
import __theme, { themeDefinition } from '../../utils/theme';

class postcssSugarPluginStyleMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginStyleMixinInterface as interface };

export interface postcssSugarPluginStyleMixinParams {}

/**
 * @name           define
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
  params: Partial<postcssSugarPluginStyleMixinParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams = <postcssSugarPluginStyleMixinParams>{
    ...(params ?? {})
  };

  const vars: string[] = [];

  // @ts-ignore
  Object.keys(global._definedStyles).forEach((styleName) => {
    // @ts-ignore
    vars.push(global._definedStyles[styleName].toString());
  });

  console.log('v', vars.join('\n'));

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
