import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __isValidUnitValue from '@coffeekraken/sugar/shared/css/isValidUnitValue';

class postcssSugarPluginFontSizeInterface extends __SInterface {
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
export { postcssSugarPluginFontSizeInterface as interface };

export interface IPostcssSugarPluginFontSizeParams {
  name: string;
  return: 'var' | 'value';
}

export default function (
  params: Partial<IPostcssSugarPluginFontSizeParams> = {}
) {
  const finalParams: IPostcssSugarPluginFontSizeParams = {
    name: '',
    return: 'var',
    ...params
  };

  const name = finalParams.name;

  if (__isValidUnitValue(name)) return name;

  let size = __theme().config(`font.size.${name}`);

  if (finalParams.return === 'var') {
    return `var(--s-theme-font-size-${name}, ${size})`;
  } else {
    return size;
  }
}
