import __SInterface from '@coffeekraken/s-interface';
import __isInScope from '../../utils/isInScope';

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
export default function (
  params: Partial<postcssSugarPluginScopeBareMixinParams>,
  atRule,
  processNested
) {
  const finalParams = <postcssSugarPluginScopeBareMixinParams>{
    ...(params ?? {})
  };

  if (!__isInScope('bare')) {
    return atRule.replaceWith('');
  }

  const vars: string[] = [];

  if (atRule.parent && atRule.parent.type === 'root') {
    vars.push(`&:not(.s-no-bare &):not(.no-bare) {`);
  } else {
    vars.push(`&:not(.s-no-bare &):not(.no-bare) {`);
  }
  vars.push(
    processNested(
      atRule.nodes
        .map((node) => {
          if (node.type === 'decl') return node.toString() + ';';
          return node.toString();
        })
        .join('\n')
    )
  );
  vars.push(`}`);

  atRule.replaceWith(vars.join('\n'));
}
