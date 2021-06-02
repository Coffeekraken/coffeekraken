import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __jsObjectToCssProperties from '../../utils/jsObjectToCssProperties';

class postcssSugarPluginSpaceClassesInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginSpaceClassesParams {}

export { postcssSugarPluginSpaceClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginSpaceClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginSpaceClassesParams = {
    ...params
  };

  const vars: string[] = [
    '@sugar.space.marginClasses;',
    '@sugar.space.paddingClasses;',
    '@sugar.space.autoClasses;'
  ];

  replaceWith(vars);
}
