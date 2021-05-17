import __SInterface from '@coffeekraken/s-interface';
import __theme, { themeDefinition } from '../../utils/theme';

class postcssSugarPluginStyleApplyMixinInterface extends __SInterface {
  static definition = {
    name: {
      type: 'String',
      required: true
    }
  };
}
export { postcssSugarPluginStyleApplyMixinInterface as interface };

export interface postcssSugarPluginStyleApplyMixinParams {
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
  processNested,
  settings
}: {
  params: Partial<postcssSugarPluginStyleApplyMixinParams>;
  atRule: any;
  processNested: Function;
  settings: any;
}) {
  const finalParams = <postcssSugarPluginStyleApplyMixinParams>{
    ...(params ?? {})
  };

  const vars: string[] = [];

  // if (
  //   // @ts-ignore
  //   !global._definedStyles[finalParams.name] ||
  //   settings.target !== 'global'
  // ) {
  //   vars.push(`content: "s-style-${finalParams.name}"`);
  // } else {
  vars.push(`@extend .s-style-${finalParams.name}`);
  // }

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
