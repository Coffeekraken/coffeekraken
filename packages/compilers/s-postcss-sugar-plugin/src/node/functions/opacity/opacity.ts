import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __minifyVar from '../../utils/minifyVar';

class postcssSugarPluginOpacityFunctionInterface extends __SInterface {
  static definition = {
    opacity: {
      type: 'String',
      values: Object.keys(__theme().config('opacity')),
      default: '100',
      required: true
    }
  };
}
export { postcssSugarPluginOpacityFunctionInterface as interface };

export interface IPostcssSugarPluginOpacityFunctionParams {
  opacity: string;
}

export default function ({
  params
}: {
  params: Partial<IPostcssSugarPluginOpacityFunctionParams>;
}) {
  const finalParams: IPostcssSugarPluginOpacityFunctionParams = {
    opacity: '100',
    ...params
  };

  const opacity = finalParams.opacity;

  if (__theme().config('opacity')[opacity] === undefined) return opacity;

  const opacityRes = opacity.split(' ').map((s) => {
    const size = __theme().config(`opacity.${s}`);
    if (!size) return size;
    return `var(${__minifyVar(`--s-theme-opacity-${s}`)}, ${size})`;
  });

  return opacityRes.join(' ');
}
