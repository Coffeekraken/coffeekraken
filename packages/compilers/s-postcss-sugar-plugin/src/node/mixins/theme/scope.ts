import __SInterface from '@coffeekraken/s-interface';
import __theme, { themeDefinition } from '../../utils/theme';

class postcssSugarPluginThemeScopeMixinInterface extends __SInterface {
  static definition = {
    theme: themeDefinition
  };
}
export { postcssSugarPluginThemeScopeMixinInterface as interface };

export interface IPostcssSugarPluginThemeScopeMixinParams {
  theme?: string;
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
export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginThemeScopeMixinParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams = <IPostcssSugarPluginThemeScopeMixinParams>{
    ...(params ?? {})
  };

  // @ts-ignore
  if (!global._postcssSugarPluginThemeScopeMixinTheme) {
    // @ts-ignore
    global._postcssSugarPluginThemeScopeMixinTheme = [];
  }

  // @ts-ignore
  global._postcssSugarPluginThemeScopeMixinTheme.push(finalParams.theme);

  replaceWith(atRule.nodes.map((node) => node.toString()).join('\n'));

  // @ts-ignore
  global._postcssSugarPluginThemeScopeMixinTheme =
    // @ts-ignore
    global._postcssSugarPluginThemeScopeMixinTheme.slice(0, -1);
}
