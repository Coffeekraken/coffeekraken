import __SInterface from '@coffeekraken/s-interface';
import { IPostcssSugarPluginColorParams } from '../../functions/color/color';
import __isInScope from '../../utils/isInScope';
import __astNodesToString from '../../utils/astNodesToString';

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
export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginColorParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams = <postcssSugarPluginScopeLnfMixinParams>{
    ...(params ?? {})
  };

  if (!__isInScope('lnf')) {
    return atRule.replaceWith('');
  }

  const vars: string[] = [];

  vars.push(`&:not(.s-no-lnf &):not(.s-no-lnf) {`);
  vars.push(processNested(__astNodesToString(atRule.nodes)));
  vars.push(`}`);

  atRule.replaceWith(vars.join('\n'));
}
