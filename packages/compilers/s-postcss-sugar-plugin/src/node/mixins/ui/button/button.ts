import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

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

  const defaultSize = __theme().config('size.default');

  // bare
  vars.push(`
      @sugar.scope.bare {
        display: inline-block;
        cursor: pointer;
        padding: ${__themeVar('ui.button.padding')};
      }
    `);

  // lnf
  vars.push(`
      @sugar.scope.lnf {
  `);

  vars.push(`
      border-radius: ${__themeVar('ui.button.borderRadius')};
      transition: ${__themeVar('ui.button.transition')};
  `);

  switch (finalParams.style) {
    case 'outlined':
      vars.push(`
          background-color: transparent;
          border-color: sugar.color(${finalParams.color});
          color: sugar.color(${finalParams.color});
          border-style: solid;
          border-width: ${1 / parseInt(defaultSize)}em;
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
      vars.push(`
          background-color: transparent;
          color: sugar.color(${finalParams.color});
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
      vars.push(`
        background-color: sugar.color(${finalParams.color});
        color: sugar.color(${
          finalParams.textColor
            ? finalParams.textColor
            : `${finalParams.color}--i`
        });
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
  vars.push('}');

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
