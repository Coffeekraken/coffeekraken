// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SColor from '@coffeekraken/s-color';
import __theme from '../../utils/theme';
import __isColor from '@coffeekraken/sugar/shared/is/color';
import __themeVar from '../../utils/themeVar';

class postcssSugarPluginThemeInterface extends __SInterface {
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
export { postcssSugarPluginThemeInterface as interface };

export interface IPostcssSugarPluginThemeParams {
  dotPath: string;
  return: 'var' | 'value';
  fallback: boolean;
}

export default function theme({
  params
}: {
  params: Partial<IPostcssSugarPluginThemeParams>;
}) {
  const finalParams: IPostcssSugarPluginThemeParams = {
    ...params
  };
  if (finalParams.return === 'var') {
    return __themeVar(finalParams.dotPath, finalParams.fallback);
  } else {
    return __theme().config(finalParams.dotPath);
  }
}
