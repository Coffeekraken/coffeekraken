import __SInterface from '@coffeekraken/s-interface';
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __theme from '../../utils/theme';

class postcssSugarPluginFontInterface extends __SInterface {
  static definition = {
    family: {
      type: 'String',
      values: Object.keys(__theme().config('font.family')),
      required: true,
      alias: 'f'
    },
    size: {
        type: 'Number|String',
        alias: 's'
    }
  };
}

export interface IPostcssSugarPluginFontParams {
  family: string | number;
  size: number;
}

export { postcssSugarPluginFontInterface as interface };

export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginFontParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams: IPostcssSugarPluginFontParams = {
    family: 'default',
    size: undefined,
    ...params
  };

  const vars: string[] = [];

  if (finalParams.family) {
      vars.push(`@sugar.font.family(${finalParams.family});`);
  }
  if (finalParams.size) {
      vars.push(`@sugar.font.size(${finalParams.size});`);
  }

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
