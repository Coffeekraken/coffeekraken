import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

class postcssSugarPluginFontInitInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginFontInitParams {}

export { postcssSugarPluginFontInitInterface as interface };

export default function ({
  params,
  atRule,
  processNested
}: {
  params: Partial<IPostcssSugarPluginFontInitParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams: IPostcssSugarPluginFontInitParams = {
    ...params
  };

  const vars: string[] = [];

  const fontsFamiliesObj = __theme().config('font.family');

  if (!fontsFamiliesObj.default) {
    throw new Error(
      `<red>[postcss.sugar.font.init]</red> Sorry but your theme does not provide any "<yellow>font.family.default</yellow>" font`
    );
  }

  vars.push(
    [
      'html {',
      `   @sugar.font.family(default);`,
      '   @sugar.font.size(default);',
      '}'
    ].join('\n')
  );

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
