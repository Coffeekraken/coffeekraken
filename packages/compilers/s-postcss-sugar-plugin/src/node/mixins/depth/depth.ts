import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

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
  processNested
}: {
  params: Partial<IPostcssSugarPluginDepthParams>;
  atRule: any;
  processNested: Function;
}) {
  const finalParams: IPostcssSugarPluginDepthParams = {
    depth: 1,
    ...params
  };
  // console.log(atRule.toString());

  const depthCss = __theme().config(`depth.${finalParams.depth}`);

  const vars: string[] = [`box-shadow: ${depthCss};`];

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
