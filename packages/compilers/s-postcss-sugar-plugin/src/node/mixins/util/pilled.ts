import __SInterface from '@coffeekraken/s-interface';
import __sugarConfig, { themeConfig } from '@coffeekraken/s-sugar-config';
import __themeVar from '../../utils/themeVar';
import __isInScope from '../../utils/isInScope';

class postcssSugarPluginUtilPilledInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginUtilPilledParams {}

export { postcssSugarPluginUtilPilledInterface as interface };

export default function (
  params: Partial<IPostcssSugarPluginUtilPilledParams> = {},
  atRule,
  processNested
) {
  const finalParams: IPostcssSugarPluginUtilPilledParams = {
    ...params
  };

  const vars: string[] = ['border-radius: 999999px !important;'];

  const AST = processNested(vars.join('\n'));
  atRule.replaceWith(AST);
}
