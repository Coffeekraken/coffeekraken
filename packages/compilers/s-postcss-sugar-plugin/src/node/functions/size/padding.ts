import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __postCss from 'postcss';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SColor from '@coffeekraken/s-color';

class postcssSugarPluginSizePaddingInterface extends __SInterface {
  static definition = {
    name: {
      type: 'String',
      required: true,
      alias: 'n'
    },
    return: {
      type: 'String',
      values: ['var', 'value'],
      default: 'var'
    }
  };
}
export { postcssSugarPluginSizePaddingInterface as interface };

export interface IPostcssSugarPluginSizePaddingParams {
  name: string;
  return: 'var' | 'value';
}

export default function (
  params: Partial<IPostcssSugarPluginSizePaddingParams> = {}
) {
  const finalParams: IPostcssSugarPluginSizePaddingParams = {
    name: '',
    return: 'var',
    ...params
  };

  let theme = 'default',
    name = finalParams.name;

  if (name.split('.').length === 2) {
    theme = name.split('.')[0];
    name = name.split('.')[1];
  }

  const themeConfig = __sugarConfig('theme');

  let size = themeConfig[theme || 'default'].paddings[name];

  //   console.log('SIT', size);

  if (finalParams.return === 'var') {
    return `var(--s-theme-${theme}-paddings-${name}, ${size})`;
  } else {
    return size;
  }
}
