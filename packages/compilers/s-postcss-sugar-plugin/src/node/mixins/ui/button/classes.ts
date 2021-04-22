import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig from '@coffeekraken/s-sugar-config';

class postcssSugarPluginUiButtonClassesInterface extends __SInterface {
  static definition = {
    colors: {
      type: 'String[]',
      alias: 'c'
    },
    sizes: {
      type: 'String[]',
      alias: 's'
    }
  };
}

export interface IPostcssSugarPluginUiButtonClassesParams {
  colors: string[];
  sizes: string[];
}

export { postcssSugarPluginUiButtonClassesInterface as interface };

export default function (
  params: Partial<IPostcssSugarPluginUiButtonClassesParams> = {},
  atRule,
  processNested
) {
  const themeConfig = __sugarConfig('theme');

  const finalParams: IPostcssSugarPluginUiButtonClassesParams = {
    colors: Object.keys(themeConfig.default.color),
    sizes: Object.keys(themeConfig.default.padding),
    ...params
  };

  const vars: string[] = [];

  vars.push('@sugar.scope(bare color lnf) {');
  finalParams.colors.forEach((colorName) => {
    vars.push(
      [
        `${colorName === 'default' ? '.s-btn' : `.s-btn--${colorName}`} {`,
        ` @sugar.ui.button(${colorName});`,
        `}`
      ].join('\n')
    );
  });
  vars.push('}');

  vars.push('@sugar.scope(size) {');
  finalParams.sizes.forEach((sizeName) => {
    vars.push(
      [
        `${sizeName === 'default' ? '.s-btn' : `.s-btn--${sizeName}`} {`,
        ` @sugar.ui.button($size: ${sizeName});`,
        `}`
      ].join('\n')
    );
  });
  vars.push('}');

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
