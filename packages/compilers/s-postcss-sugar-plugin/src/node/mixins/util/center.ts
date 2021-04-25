import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig, { themeConfig } from '@coffeekraken/s-sugar-config';
import __themeVar from '../../utils/themeVar';
import __isInScope from '../../utils/isInScope';

class postcssSugarPluginUtilCenterInterface extends __SInterface {
  static definition = {
    method: {
      type: 'String',
      values: ['abs'],
      required: true,
      default: 'abs'
    },
    direction: {
      type: 'String',
      values: ['x', 'y', 'both'],
      required: true,
      default: 'both'
    }
  };
}

export interface IPostcssSugarPluginUtilCenterParams {
  method: 'abs';
  direction: 'x' | 'y' | 'both';
}

export { postcssSugarPluginUtilCenterInterface as interface };

export default function (
  params: Partial<IPostcssSugarPluginUtilCenterParams> = {},
  atRule,
  processNested
) {
  const finalParams: IPostcssSugarPluginUtilCenterParams = {
    ...params
  };

  const vars: string[] = [];

  switch (finalParams.method) {
    case 'abs':
    default:
      vars.push(`
            position: absolute;
            ${
              finalParams.direction === 'both' || finalParams.direction === 'x'
                ? 'left: 50%;'
                : ''
            }
            ${
              finalParams.direction === 'both' || finalParams.direction === 'y'
                ? 'top: 50%;'
                : ''
            }
            ${
              finalParams.direction === 'both'
                ? 'transform: translate(-50%, -50%);'
                : finalParams.direction === 'y'
                ? 'transform: translateY(-50%);'
                : 'transform: translateX(-50%);'
            }
        `);
      break;
  }

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
