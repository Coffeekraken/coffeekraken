import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

class postcssSugarPluginFontSizeInterface extends __SInterface {
  static definition = {
    size: {
      type: 'String|Number',
      values: Object.keys(__theme().config('font.size')),
      required: true
    }
  };
}

export interface IPostcssSugarPluginFontFamilyParams {
  size: string | number;
}

export { postcssSugarPluginFontSizeInterface as interface };

export default function (
  params: Partial<IPostcssSugarPluginFontFamilyParams> = {},
  atRule,
  processNested
) {
  const finalParams: IPostcssSugarPluginFontFamilyParams = {
    size: 50,
    ...params
  };

  const vars: string[] = [];
  vars.push(`font-size: sugar.font.size(${finalParams.size})`);

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
