import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __themeVar from '../../utils/themeVar';

class postcssSugarPluginBorderRadiusMixinInterface extends __SInterface {
  static definition = {
    radius: {
      type: 'Number|String',
      required: true,
      alias: 'r'
    }
  };
}

export interface IPostcssSugarPluginBorderRadiusMixinParams {
  radius: string | number;
}

export { postcssSugarPluginBorderRadiusMixinInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginBorderRadiusMixinParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginBorderRadiusMixinParams = {
    radius: 0,
    ...params
  };
  
  const vars: string[] = [`border-radius: sugar.border.radius(${finalParams.radius});`];
  replaceWith(vars);
}
