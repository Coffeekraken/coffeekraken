import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiFormInputInterface extends __SInterface {
  static definition = {
    style: {
      type: 'String',
      values: ['default'],
      default: 'default'
    }
  };
}

export interface IPostcssSugarPluginUiFormInputParams {
  style: 'default';
}

export { postcssSugarPluginUiFormInputInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiFormInputParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUiFormInputParams = {
    style: 'default',
    ...params
  };

  const vars: string[] = [];

  vars.push('@sugar.ui.base(form);');


  // switch (finalParams.style) {
  //   default:
  //     break;
  // }

  replaceWith(vars);

}
