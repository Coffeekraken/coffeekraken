import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

class postcssSugarPluginSpaceAutoMixinInterface extends __SInterface {
  static definition = {
    space: {
      type: 'String|Number',
      values: Object.keys(__theme().config('space')),
      default: 'default'
    }
  };
}
export { postcssSugarPluginSpaceAutoMixinInterface as interface };

export interface postcssSugarPluginThemeScopeMixinParams {
  space: number | string;
}

/**
 * @name           classes
 * @namespace      mixins.size
 * @type           Mixin
 * @status        beta
 *
 * This mixin output all the sizes classes like ```.s-size-50```, etc...
 *
 * @param       {String}        query       The query string like ">tablet", "<=desktop", etc...
 *
 * @example         postcss
 * \@sugar.size.classes;
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default function (
  params: Partial<postcssSugarPluginThemeScopeMixinParams>,
  atRule,
  processNested
) {
  const finalParams = <postcssSugarPluginThemeScopeMixinParams>{
    space: 'default',
    ...(params ?? {})
  };

  const cssArray: string[] = [
    `
    & > * {
        margin-bottom: sugar.space(${finalParams.space});
    }
  `
  ];

  const AST = processNested(cssArray.join('\n'));
  atRule.replaceWith(AST);
}
