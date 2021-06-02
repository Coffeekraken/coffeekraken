import __SInterface from '@coffeekraken/s-interface';

class postcssSugarPluginUtilPilledInterface extends __SInterface {
  static definition = {};
}

export interface IPostcssSugarPluginUtilPilledParams {}

export { postcssSugarPluginUtilPilledInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUtilPilledParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUtilPilledParams = {
    ...params
  };

  const vars: string[] = ['border-radius: 999999px !important;'];

  replaceWith(vars);
}
