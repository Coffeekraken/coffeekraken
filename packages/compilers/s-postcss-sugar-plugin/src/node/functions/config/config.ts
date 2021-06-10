// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SColor from '@coffeekraken/s-color';
import __theme from '../../utils/theme';
import __isColor from '@coffeekraken/sugar/shared/is/color';
import __themeVar from '../../utils/themeVar';

class postcssSugarPluginConfigInterface extends __SInterface {
  static definition = {
    dotPath: {
        type: 'String',
        required: true
    },
    return: {
      type: 'String',
      values: ['var','value'],
      default: 'var'
    },
    fallback: {
      type: 'Boolean',
      default: true
    }
  };
}
export { postcssSugarPluginConfigInterface as interface };

export interface IPostcssSugarPluginColorParams {
  dotPath: string;
  return: 'var' | 'value';
  fallback: boolean;
}

export default function color({
  params
}: {
  params: Partial<IPostcssSugarPluginColorParams>;
}) {
  const finalParams: IPostcssSugarPluginColorParams = {
    ...params
  };
  if (finalParams.return === 'var') {
    return __themeVar(finalParams.dotPath, finalParams.fallback);
  } else {
    return __theme().config(finalParams.dotPath);
  }
}
