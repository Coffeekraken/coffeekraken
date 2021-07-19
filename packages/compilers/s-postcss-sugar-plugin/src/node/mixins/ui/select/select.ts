import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';
import sugar from '@coffeekraken/s-sugar-config';

class postcssSugarPluginUiFormSelectInterface extends __SInterface {
  static definition = {
    style: {
      type: 'String',
      values: ['default'],
      default: __theme().config('ui.input.defaultStyle')
    },
    scope: {
      type: 'String',
      values: ['bare','lnf','style'],
      default: ['bare','lnf','style']
    }
  };
}

export interface IPostcssSugarPluginUiFormSelectParams {
  style: 'default';
  scope: string[];
}

export { postcssSugarPluginUiFormSelectInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiFormSelectParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUiFormSelectParams = {
    style: 'default',
    scope: [],
    ...params
  };

  const vars: string[] = [];

  vars.push(`

    display: inline-block;
    cursor: pointer;

    select {
      @sugar.ui.base(input);
      color: sugar.color(ui, text);
      padding-right: 2.5em;
    }

    &:after {
      content: '▾';
      position: absolute;
      right: 1em; top: 50%;
      font-size: 1em;
      transform: translateY(-50%);
      pointer-events: none;
    }

  `);


  replaceWith(vars);

}
