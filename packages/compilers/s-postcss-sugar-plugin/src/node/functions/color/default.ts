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
    }
  };
}
export { postcssSugarPluginColorInterface as interface };

export interface IPostcssSugarPluginColorParams {
  name: string;
  modifier: string;
}

export default function (params: Partial<IPostcssSugarPluginColorParams> = {}) {
  const finalParams: IPostcssSugarPluginColorParams = {
    name: '',
    modifier: '',
    ...params
  };

  let isPlainColor = false;

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

    console.log(finalParams);

    const color = new __SColor(finalParams.name);
    if (finalParams.modifier) {
      console.log(finalParams);
      color.apply(finalParams.modifier);
    }
    return color.toString();
  } else {
    const theme = __sugarConfig('theme');
    if (!theme.default.colors[finalParams.name])
      throw new Error(
        `Sorry but the requested color "<yellow>${finalParams.name}</yellow>" does not exists...`
      );

    let colorVar = `--s-colors-${finalParams.name}`;
    if (finalParams.modifier) colorVar += `-${finalParams.modifier}`;
    else colorVar += '-default';

    let colorValue = theme.default.colors[finalParams.name].default;

    if (finalParams.modifier) {
      colorValue = theme.default.colors[finalParams.name][finalParams.modifier];
    }

    return `var(${colorVar}, ${colorValue})`;
  }
}
