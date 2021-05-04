import __SInterface from '@coffeekraken/s-interface';
import __SColor from '@coffeekraken/s-color';
import __theme from '../../utils/theme';

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
    let name = finalParams.name;
    let modifier = finalParams.modifier;

    let modifierStr = modifier || 'default';

    const colorValue = __theme().config(`color.${name}.${modifierStr}`);

    let colorVar = `--s-theme-color-${name}-${modifierStr}`;

    if (finalParams.return === 'var') {
      return `var(${colorVar}, ${colorValue})`;
    } else {
      return colorValue;
    }
  }
}
