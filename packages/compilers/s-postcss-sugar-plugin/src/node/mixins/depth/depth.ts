import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig, { themeConfig } from '@coffeekraken/s-sugar-config';

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

export default function (
  params: Partial<IPostcssSugarPluginDepthParams> = {},
  atRule,
  processNested
) {
  const finalParams: IPostcssSugarPluginDepthParams = {
    depth: 1,
    ...params
  };

  const depthCss = themeConfig(`depth.${finalParams.depth}`);

  const vars: string[] = [`box-shadow: ${depthCss};`];

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
