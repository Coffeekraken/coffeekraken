import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __minifyVar from '../../utils/minifyVar';

class postcssSugarPluginMarginFunctionInterface extends __SInterface {
  static definition = {
    margin: {
      type: 'String',
      values: Object.keys(__theme().config('margin')),
      default: 'default',
      required: true
    }
  };
}
export { postcssSugarPluginMarginFunctionInterface as interface };

export interface IPostcssSugarPluginMarginFunctionParams {
  margin: string;
}

export default function ({
  params
}: {
  params: Partial<IPostcssSugarPluginMarginFunctionParams>;
}) {
  const finalParams: IPostcssSugarPluginMarginFunctionParams = {
    margin: '',
    ...params
  };

  const margin = finalParams.margin;

  if (__theme().config('margin')[margin] === undefined) return margin;

  const margins = margin.split(' ').map((s) => {
    const size = __theme().config(`margin.${s}`);
    if (!size) return size;
    return `var(${__minifyVar(`--s-theme-margin-${s}`)}, ${size})`;
  });

  return margins.join(' ');
}
