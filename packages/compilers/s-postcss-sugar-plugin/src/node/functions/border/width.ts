import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __minifyVar from '../../utils/minifyVar';

class postcssSugarPluginBorderWidthFunctionInterface extends __SInterface {
  static definition = {
    width: {
      type: 'String',
      values: Object.keys(__theme().config('border.width')),
      default: 'default',
      required: true
    }
  };
}
export { postcssSugarPluginBorderWidthFunctionInterface as interface };

export interface IPostcssSugarPluginBorderWidthFunctionParams {
  width: string;
}

export default function ({
  params
}: {
  params: Partial<IPostcssSugarPluginBorderWidthFunctionParams>;
}) {
  const finalParams: IPostcssSugarPluginBorderWidthFunctionParams = {
    width: '',
    ...params
  };

  const width = finalParams.width;

  if (__theme().config('border.width')[width] === undefined) return width;

  const widthes = width.split(' ').map((s) => {
    const width = __theme().config(`border.width.${s}`);
    if (!width) return width;
    return `var(${__minifyVar(`--s-theme-border-width-${s}`)})`;
  });

  return widthes.join(' ');
}
