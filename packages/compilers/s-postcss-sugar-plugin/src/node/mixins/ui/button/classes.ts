import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __postCss from 'postcss';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SColor from '@coffeekraken/s-color';
import __button from './default';
import __SPostcssCompiler from '@coffeekraken/s-postcss-compiler';

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
  atRule
) {
  const themeConfig = __sugarConfig('theme');

  const finalParams: IPostcssSugarPluginUiButtonClassesParams = {
    colors: Object.keys(themeConfig.default.colors),
    sizes: Object.keys(themeConfig.default.paddings),
    ...params
  };

  const vars: string[] = [];

  finalParams.colors.forEach((colorName) => {
    const colors = __button({
      color: colorName,
      scope: 'color'
    });
    const cssStr = `
      ${colorName === 'default' ? '.s-btn' : `.s-btn--${colorName}`} {
            ${colors}
        }
      `;
    vars.push(cssStr);
  });

  finalParams.sizes.forEach((sizeName) => {
    const paddings = __button({
      size: sizeName,
      scope: 'size'
    });
    const cssStr = `
        ${sizeName === 'default' ? '.s-btn' : `.s-btn--${sizeName}`} {
            ${paddings}
        }
    `;
    vars.push(cssStr);
  });

  //   console.log(vars.join('\n'));

  if (atRule) {
    const AST = __postCss.parse(vars.join('\n'));
    atRule.replaceWith(AST);
  } else {
    return vars.join('\n');
  }
}
