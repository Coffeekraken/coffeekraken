import __SInterface from '@coffeekraken/s-interface';
import __theme, { themeDefinition } from '../../utils/theme';
import __astNodesToString from '../../utils/astNodesToString';

class postcssSugarPluginStateActiveMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginStateActiveMixinInterface as interface };

export interface postcssSugarPluginStateActiveMixinParams {}

/**
 * @name           focus
 * @namespace      mixins.state
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to target some focus items to apply correct color schema
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * .myCoolItem {
 *  \@sugar.state.focus {
 *      // ...
 *  }
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
  params: Partial<postcssSugarPluginStateActiveMixinParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams = <postcssSugarPluginStateActiveMixinParams>{
    className: '',
    ...(params ?? {})
  };

  const vars: string[] = [];

  vars.push(`&:active:not(:hover), &.active {`);

  vars.push(processNested(__astNodesToString(atRule.nodes)));
  vars.push(`}`);

  atRule.replaceWith(vars.join('\n'));
}
