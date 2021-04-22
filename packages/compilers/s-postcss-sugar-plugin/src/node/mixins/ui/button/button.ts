import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig, { themeConfig } from '@coffeekraken/s-sugar-config';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';

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
    }
  };
}

export interface IPostcssSugarPluginUiButtonParams {
  color: string;
  textColor: string;
  size: string;
}

export { postcssSugarPluginUiButtonInterface as interface };

export default function (
  params: Partial<IPostcssSugarPluginUiButtonParams> = {},
  atRule,
  processNested
) {
  const finalParams: IPostcssSugarPluginUiButtonParams = {
    color: 'default',
    textColor: '',
    size: 'default',
    ...params
  };

  const vars: string[] = [];

  if (__isInScope('bare')) {
    vars.push(`
      display: inline-block;
    `);
  }

  if (__isInScope('lnf')) {
    vars.push(`background-color: sugar.color(${finalParams.color});`);
    vars.push(
      `color: sugar.color(${
        finalParams.textColor
          ? finalParams.textColor
          : `${finalParams.color}--i`
      });`
    );
    vars.push(`border-radius: ${__themeVar('ui.button.borderRadius')};`);

    vars.push(`
      &:hover {
        background-color: sugar.color(${
          finalParams.textColor
            ? finalParams.textColor
            : `${finalParams.color}--i`
        });
        color: sugar.color(${finalParams.color});
      }
    `);
  }

  if (__isInScope('size')) {
    vars.push(`padding: ${__themeVar('ui.button.padding')};`);
    vars.push(`font-size: sugar.font.size(${finalParams.size});`);
  }

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
