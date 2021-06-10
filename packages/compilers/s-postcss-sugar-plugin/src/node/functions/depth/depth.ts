// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SColor from '@coffeekraken/s-color';
import __theme from '../../utils/theme';
import __isColor from '@coffeekraken/sugar/shared/is/color';
import __themeVar from '../../utils/themeVar';
import __SSugarConfig from '@coffeekraken/s-sugar-config';

class postcssSugarPluginDepthFunctionInterface extends __SInterface {
  static definition = {
    depth: {
        type: 'Number|String',
        required: true
    }
  };
}
export { postcssSugarPluginDepthFunctionInterface as interface };

export interface IPostcssSugarPluginDepthFunctionParams {
  depth: string;
}

export default function depth({
  params
}: {
  params: Partial<IPostcssSugarPluginDepthFunctionParams>;
}) {
  const finalParams: IPostcssSugarPluginDepthFunctionParams = {
    ...params
  };

  let intDepth = parseInt(finalParams.depth);
  if (typeof finalParams.depth !== 'number') {
    return finalParams.depth;
  } else {
    return __themeVar(`depth.${intDepth}`, false);
  }
}
