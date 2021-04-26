import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

class postcssSugarPluginLayoutContainerInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginLayoutContainerParams {
  ratio: number;
}

export { postcssSugarPluginLayoutContainerInterface as interface };

export default function (
  params: Partial<IPostcssSugarPluginLayoutContainerParams> = {},
  atRule,
  processNested
) {
  const finalParams: IPostcssSugarPluginLayoutContainerParams = {
    ratio: 1,
    ...params
  };

  const vars: string[] = [
    `
    margin: auto;
  `
  ];

  const containerConfig = __theme().config('layout.container');
  Object.keys(containerConfig).forEach((key) => {
    vars.push(`${key}: ${containerConfig[key]};`);
  });

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
