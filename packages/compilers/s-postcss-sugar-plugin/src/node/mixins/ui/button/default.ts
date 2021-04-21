import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __postCss from 'postcss';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __color from '../../../functions/color/default';
import __SColor from '@coffeekraken/s-color';
import __padding from '../../../functions/size/padding';
import __SPostcssCompiler from '@coffeekraken/s-postcss-compiler';

class postcssSugarPluginUiButtonInterface extends __SInterface {
  static definition = {
    color: {
      type: 'String',
      required: true,
      default: 'default',
      alias: 'c'
    },
    textColor: {
      type: 'String',
      alias: 't'
    },
    size: {
      type: 'String',
      default: 'default',
      alias: 's'
    },
    scope: {
      type: 'String',
      values: ['*', 'generic', 'color', 'size', 'lnf', 'hover'],
      default: '*'
    }
  };
}

export interface IPostcssSugarPluginUiButtonParams {
  color: string;
  textColor: string;
  size: string;
  scope: '*' | 'generic' | 'color' | 'size' | 'lnf' | 'hover';
}

export { postcssSugarPluginUiButtonInterface as interface };

export default function (
  params: Partial<IPostcssSugarPluginUiButtonParams> = {},
  atRule?
) {
  const finalParams: IPostcssSugarPluginUiButtonParams = {
    color: 'default',
    textColor: '',
    size: 'default',
    scope: '*',
    ...params
  };

  const color = __color({
    name: finalParams.color
  });
  let textColor;
  if (finalParams.textColor) {
    textColor = __color({
      name: finalParams.textColor
    });
  } else {
    textColor = __color({
      name: `${finalParams.color}${
        finalParams.color.match(/\-\-i$/) ? '' : '--i'
      }`
    });
  }

  const vars: string[] = [];

  if (finalParams.scope === '*' || finalParams.scope === 'generic') {
    vars.push(`
      display: inline-block;
    `);
  }

  if (finalParams.scope === '*' || finalParams.scope === 'color') {
    vars.push(`background-color: ${color.toString()};`);
    vars.push(`color: ${textColor.toString()};`);
    vars.push(`&:hover {
      background-color: ${textColor};
      color: ${color};
    }`);
  }
  if (finalParams.scope === '*' || finalParams.scope === 'size') {
    vars.push(
      `padding: ${__padding({
        name: finalParams.size
      })};`
    );
  }

  if (atRule) {
    const AST = __SPostcssCompiler.postcss().process(vars.join('\n'));
    atRule.replaceWith(AST);
  } else {
    return vars.join('\n');
  }
}
