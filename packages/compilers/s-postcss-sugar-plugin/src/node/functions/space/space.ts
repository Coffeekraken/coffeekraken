import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

class postcssSugarPluginSpaceFunctionInterface extends __SInterface {
  static definition = {
    space: {
      type: 'String',
      values: Object.keys(__theme().config('space')),
      default: 'default',
      required: true
    },
    return: {
      type: 'String',
      values: ['var', 'value'],
      default: 'var'
    }
  };
}
export { postcssSugarPluginSpaceFunctionInterface as interface };

export interface IPostcssSugarPluginSpaceFunctionParams {
  space: string;
  return: 'var' | 'value';
}

export default function ({
  params
}: {
  params: Partial<IPostcssSugarPluginSpaceFunctionParams>;
}) {
  const finalParams: IPostcssSugarPluginSpaceFunctionParams = {
    space: '',
    return: 'var',
    ...params
  };

  const space = finalParams.space;

  if (__theme().config('space')[space] === undefined) return space;

  let size = __theme().config(`space.${space}`);

  if (finalParams.return === 'var') {
    return `var(--s-theme-space-${space}, ${size})`;
  } else {
    return size;
  }
}
