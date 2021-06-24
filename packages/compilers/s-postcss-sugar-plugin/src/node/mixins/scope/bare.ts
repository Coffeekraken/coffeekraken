import __SInterface from '@coffeekraken/s-interface';
import { IPostcssSugarPluginColorParams } from '../../functions/color/color';
import __isInScope from '../../utils/isInScope';
import __astNodesToString from '../../utils/astNodesToString';

class postcssSugarPluginScopeBareMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginScopeBareMixinInterface as interface };

export interface postcssSugarPluginScopeBareMixinParams {}

/**
 * @name           bare
 * @namespace      mixins.scope
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to wrap some bare type styling to be able to
 * disable it later using classes like ```.s-nude``` or ```.s-no-bare```
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.scope.bare {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function ({
  params,
  atRule,
  replaceWith,
  postcssApi
}: {
  params: Partial<IPostcssSugarPluginColorParams>;
  atRule: any;
  replaceWith: Function;
  postcssApi: any;
}) {
  const finalParams = <postcssSugarPluginScopeBareMixinParams>{
    ...(params ?? {})
  };

  if (!__isInScope('bare')) {
    return atRule.replaceWith('');
  }

  // const vars: string[] = [];

  // if (atRule.parent && atRule.parent.type === 'root') {
  //   vars.push(`&:not(.s-no-bare &):not(.no-bare) {`);
  // } else {
  //   vars.push(`&:not(.s-no-bare &):not(.no-bare) {`);
  // }
  // vars.push(__astNodesToString(atRule.nodes));
  // vars.push(`}`);

  const rule = new postcssApi.Rule({
    selector: '&:not(.s-no-bare &):not(.no-bare)'
  });

  atRule.nodes.forEach(node => {
    rule.append(node);
  });

  atRule.replaceWith(rule);

  // replaceWith(vars);
}
