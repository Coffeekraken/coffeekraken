import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';

/**
 * @name           container
 * @namespace      node.mixins.layout
 * @type           PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin generate all the css needed for a container depending
 * on the config.theme.layout.container configuration stack
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-container {
 *    \@sugar.layout.container;
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

class postcssSugarPluginLayoutContainerInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginLayoutContainerParams {
  ratio: number;
}

export { postcssSugarPluginLayoutContainerInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginLayoutContainerParams>;
  atRule: any;
  replaceWith: Function;
}) {
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

  replaceWith(vars);
}
