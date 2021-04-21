import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __postCss from 'postcss';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SColor from '@coffeekraken/s-color';

class postcssSugarPluginColorInterface extends __SInterface {
  static definition = {
    name: {
      type: 'String',
      required: true,
      alias: 'n'
    },
    modifier: {
      type: 'String',
      alias: 'm'
    },
    return: {
      type: 'String',
      values: ['var', 'value'],
      default: 'var'
    }
  };
}
export { postcssSugarPluginColorInterface as interface };

export interface IPostcssSugarPluginColorParams {
  name: string;
  modifier: string;
  return: 'var' | 'value';
}

export default function (params: Partial<IPostcssSugarPluginColorParams> = {}) {
  const finalParams: IPostcssSugarPluginColorParams = {
    name: '',
    modifier: '',
    return: 'var',
    ...params
  };

  let isPlainColor = false;

  console.log(finalParams);

  if (
    finalParams.name.match(/^#[a-zA-Z0-9]{3,6}$/) ||
    finalParams.name.match(
      /^rgba\([0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}\)$/
    ) ||
    finalParams.name.match(
      /^rgb\([0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}(\s+)?,(\s+)?[0-9]{1,3}\)$/
    ) ||
    finalParams.name.match(
      /^hsl\([0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?\)$/
    ) ||
    finalParams.name.match(
      /^hsv\([0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?,(\s+)?[0-9]{1,3}%?(\s+)?\)$/
    )
  ) {
    isPlainColor = true;

    const color = new __SColor(finalParams.name);
    if (finalParams.modifier) {
      color.apply(finalParams.modifier);
    }
    return color.toString();
  } else {
    let theme = 'default';
    let name = finalParams.name;
    let modifier = '';
    let invert = false;

    if (name.split('--').length >= 2) {
      if (name.split('--').pop() === 'i') {
        name = name.replace(/\-\-i$/, '');
        invert = true;
      }
      modifier = name.split('--')[1];
      name = name.split('--')[0];
    }

    if (name.split('.').length === 2) {
      theme = name.split('.')[0];
      name = name.split('.')[1];
    }

    console.log(name, modifier, invert);

    const themeConfig = __sugarConfig(`theme`);

    let modifierStr = modifier || 'default';
    if (invert) modifierStr += '-i';

    let colorValue = themeConfig[theme].colors[name][modifierStr];
    if (!colorValue && theme !== 'default')
      colorValue = themeConfig.default.colors[name][modifierStr];
    if (!colorValue) {
      throw new Error(
        `Sorry but the requested color "<yellow>${name}-${modifierStr}</yellow>" does not exists...`
      );
    }

    let colorVar = `--s-theme-${theme}-colors-${name}-${modifierStr}`;

    if (finalParams.return === 'var') {
      return `var(${colorVar}, ${colorValue})`;
    } else {
      return colorValue;
    }
  }
}
