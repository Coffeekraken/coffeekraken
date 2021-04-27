import __SInterface from '@coffeekraken/s-interface';
import __isInScope from '../../utils/isInScope';

class postcssSugarPluginScopeLnfMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginScopeLnfMixinInterface as interface };

export interface postcssSugarPluginScopeLnfMixinParams {}

/**
 * @name           lnf
 * @namespace      mixins.scope
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to wrap some look-and-feel type styling to be able to
 * disable it later using classes like ```.s-nude``` or ```.s-no-lnf```
 *
 * @example         postcss
 * \@sugar.scope.lnf {
 *      // ...
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function (
  params: Partial<postcssSugarPluginScopeLnfMixinParams>,
  atRule,
  processNested
) {
  const finalParams = <postcssSugarPluginScopeLnfMixinParams>{
    ...(params ?? {})
  };

  if (!__isInScope('lnf')) {
    return atRule.replaceWith('');
  }

  const vars: string[] = [];

  vars.push(
    `&:not(.s-nude-children &):not(.s-no-lnf-children &):not(.s-nude):not(.s-no-lnf) {`
  );
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
