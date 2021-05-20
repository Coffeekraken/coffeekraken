import __SInterface from '@coffeekraken/s-interface';
import __theme, { themeDefinition } from '../../utils/theme';

class postcssSugarPluginStateHoverMixinInterface extends __SInterface {
  static definition = {};
}
export { postcssSugarPluginStateHoverMixinInterface as interface };

export interface postcssSugarPluginStateHoverMixinParams {}

/**
 * @name           hover
 * @namespace      mixins.state
 * @type           Mixin
 * @status        beta
 *
 * This mixin allows you to target some hoverable items to apply correct color schema
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * .myCoolItem {
 *  \@sugar.state.hover {
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
  params: Partial<postcssSugarPluginStateHoverMixinParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams = <postcssSugarPluginStateHoverMixinParams>{
    className: '',
    ...(params ?? {})
  };

  const vars: string[] = [];

  vars.push(
    `&[hoverable]:hover, [hoverable]:hover:not([hoverable]:not(:hover) &) {`
  );

  vars.push(
    processNested(atRule.nodes.map((node) => node.toString()).join('\n'))
  );
  vars.push(`}`);

  atRule.replaceWith(vars.join('\n'));
}
