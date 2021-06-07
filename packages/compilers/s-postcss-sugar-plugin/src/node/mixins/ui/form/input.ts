import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';
import sugar from '@coffeekraken/s-sugar-config';

class postcssSugarPluginUiFormInputInterface extends __SInterface {
  static definition = {
    color: {
      type: 'String',
      default: 'accent'
    },
    style: {
      type: 'String',
      values: ['default'],
      default: 'default'
    }
  };
}

export interface IPostcssSugarPluginUiFormInputParams {
  style: 'default';
  color: string;
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
    color: 'accent',
    style: 'default',
    ...params
  };

  const vars: string[] = [];

  vars.push(`
    @sugar.ui.base(form, ${finalParams.color});
    
    @sugar.state.hover {
      border: 1px solid sugar.color(accent)
    }
  `);
  

  // switch (finalParams.style) {
  //   default:
  //     break;
  // }

  replaceWith(vars);

}
