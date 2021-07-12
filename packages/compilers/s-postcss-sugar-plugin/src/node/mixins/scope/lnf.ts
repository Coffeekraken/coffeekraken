import __SInterface from '@coffeekraken/s-interface';
import { IPostcssSugarPluginColorParams } from '../../functions/color/color';
import __isInScope from '../../utils/isInScope';
import __astNodesToString from '../../utils/astNodesToString';
import __postcss from 'postcss';

class postcssSugarPluginScopeLnfMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginScopeLnfMixinInterface as interface };

export interface postcssSugarPluginScopeLnfMixinParams {}

/**
 * @name           lnf
 * @namespace      mixins.scope
 * @type           Mixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to wrap some look-and-feel type styling to be able to
 * disable it later using the ```.s-no-lnf``` class
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
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginColorParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams = <postcssSugarPluginScopeLnfMixinParams>{
    ...(params ?? {})
  };

  const vars: string[] = [];
  vars.push(`&:not(.s-no-lnf &):not(.s-no-lnf) {`);
  vars.push(__astNodesToString(atRule.nodes));
  vars.push(`}`);

  replaceWith(vars);
}
