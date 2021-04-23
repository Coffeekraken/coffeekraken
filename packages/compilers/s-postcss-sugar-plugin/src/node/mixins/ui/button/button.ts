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
    style: {
      type: 'String',
      values: ['default', 'outlined', 'text'],
      default: 'default'
    }
  };
}

export interface IPostcssSugarPluginUiButtonParams {
  color: string;
  textColor: string;
  style: 'default' | 'outlined' | 'text';
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
    style: 'default',
    ...params
  };

  const vars: string[] = [];

  const defaultSize = themeConfig('size.default');

  if (__isInScope('bare')) {
    vars.push(`
      display: inline-block;
      cursor: pointer;
      padding: ${__themeVar('ui.button.padding')};
    `);
  }

  if (__isInScope('lnf')) {
    vars.push(`border-radius: ${__themeVar('ui.button.borderRadius')};`);
    vars.push(`transition: ${__themeVar('ui.button.transition')};`);
  }

  if (__isInScope('color')) {
    switch (finalParams.style) {
      case 'outlined':
        vars.push('background-color: transparent;');
        vars.push(`border-color: sugar.color(${finalParams.color});`);
        vars.push(`color: sugar.color(${finalParams.color});`);
        vars.push(`border-style: solid;`);
        vars.push(`border-width: ${1 / parseInt(defaultSize)}em;`);
        vars.push(`
        &:hover {
          background-color: sugar.color(${
            finalParams.textColor
              ? finalParams.textColor
              : `${finalParams.color}--10`
          });
        }
      `);
        break;
      case 'text':
        vars.push('background-color: transparent;');
        vars.push(`color: sugar.color(${finalParams.color});`);
        vars.push(`
        &:hover {
          background-color: sugar.color(${
            finalParams.textColor
              ? finalParams.textColor
              : `${finalParams.color}--10`
          });
        }
      `);
        break;
      case 'default':
      default:
        vars.push(`background-color: sugar.color(${finalParams.color});`);
        vars.push(
          `color: sugar.color(${
            finalParams.textColor
              ? finalParams.textColor
              : `${finalParams.color}--i`
          });`
        );

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
        break;
    }
  }

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
