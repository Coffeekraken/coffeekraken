import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __isValidUnitValue from '@coffeekraken/sugar/shared/css/isValidUnitValue';

class postcssSugarPluginFontSizeInterface extends __SInterface {
  static definition = {
    name: {
      type: 'String',
      required: true,
      alias: 'n'
    }
  };
}
export { postcssSugarPluginFontSizeInterface as interface };

export interface IPostcssSugarPluginFontSizeParams {
  name: string;
}

export default function ({
  params
}: {
  params: Partial<IPostcssSugarPluginFontSizeParams>;
}) {
  const finalParams: IPostcssSugarPluginFontSizeParams = {
    name: '',
    ...params
  };

  const name = finalParams.name;

  if (__isValidUnitValue(name)) return name;

  const size = __theme().config(`font.size.${name}`);

  return `var(--s-theme-font-size-${name}, ${size})`;
}
