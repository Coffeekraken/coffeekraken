import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __minifyVar from '../../utils/minifyVar';

class postcssSugarPluginPaddingFunctionInterface extends __SInterface {
  static definition = {
    padding: {
      type: 'String',
      values: Object.keys(__theme().config('padding')),
      default: 'default',
      required: true
    }
  };
}
export { postcssSugarPluginPaddingFunctionInterface as interface };

export interface IPostcssSugarPluginPaddingFunctionParams {
  padding: string;
}

export default function ({
  params
}: {
  params: Partial<IPostcssSugarPluginPaddingFunctionParams>;
}) {
  const finalParams: IPostcssSugarPluginPaddingFunctionParams = {
    padding: '',
    ...params
  };

  const padding = finalParams.padding;

  if (__theme().config('padding')[padding] === undefined) return padding;

  const paddings = padding.split(' ').map((s) => {
    const size = __theme().config(`padding.${s}`);
    if (!size) return size;
    return `var(${__minifyVar(`--s-theme-padding-${s}`)}, ${size})`;
  });

  return paddings.join(' ');
}
