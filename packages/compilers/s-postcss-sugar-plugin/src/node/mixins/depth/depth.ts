import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __themeVar from '../../utils/themeVar';

class postcssSugarPluginDepthInterface extends __SInterface {
  static definition = {
    depth: {
      type: 'Number|String',
      required: true,
      alias: 'd'
    }
  };
}

export interface IPostcssSugarPluginDepthParams {
  depth: string | number;
}

export { postcssSugarPluginDepthInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginDepthParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginDepthParams = {
    depth: 0  ,
    ...params
  };
  
  const vars: string[] = [`box-shadow: sugar.depth(${finalParams.depth});`];
  replaceWith(vars);
}
