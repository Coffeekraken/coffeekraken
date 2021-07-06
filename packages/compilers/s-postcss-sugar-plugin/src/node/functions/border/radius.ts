import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __minifyVar from '../../utils/minifyVar';

class postcssSugarPluginBorderRadiusFunctionInterface extends __SInterface {
  static definition = {
    radius: {
      type: 'String',
      values: Object.keys(__theme().config('border.radius')),
      default: 'default',
      required: true
    }
  };
}
export { postcssSugarPluginBorderRadiusFunctionInterface as interface };

export interface IPostcssSugarPluginBorderRadiusFunctionParams {
  radius: string;
}

export default function ({
  params
}: {
  params: Partial<IPostcssSugarPluginBorderRadiusFunctionParams>;
}) {
  const finalParams: IPostcssSugarPluginBorderRadiusFunctionParams = {
    radius: '',
    ...params
  };

  const radius = finalParams.radius;

  if (__theme().config('border.radius')[radius] === undefined) return radius;

  const radiuses = radius.split(' ').map((s) => {
    // const radius = __theme().config(`border.radius.${s}`);
    // if (!radius) return radius;
    return `var(${__minifyVar(`--s-theme-border-radius-${s}`)})`;
  });

  return radiuses.join(' ');
}
