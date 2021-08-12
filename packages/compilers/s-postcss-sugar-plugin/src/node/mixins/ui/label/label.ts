import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiLabelInterface extends __SInterface {
  static definition = {
    style: {
      type: 'String',
      values: ['default'],
      default: __theme().config('ui.label.defaultStyle')
    },
    scope: {
      type: 'Array<String>',
      values: ['bare','lnf','style'],
      default: ['bare','lnf','style']
    }
  };
}

export interface IPostcssSugarPluginUiLabelParams {
  style: 'default';
  scope: string[];
}

export { postcssSugarPluginUiLabelInterface as interface };
export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiLabelParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUiLabelParams = {
    style: __theme().config('ui.label.defaultStyle'),
    scope: ['bare','lnf','style'],
    ...params
  };

  const vars: string[] = [];

  // lnf
  if (finalParams.scope.indexOf('lnf') !== -1) {
    vars.push(`
    `);
  }

  // bare
  if (finalParams.scope.indexOf('bare') !== -1) {
    vars.push(`
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      cursor: pointer;

      & > * {
        margin-inline-start: sugar.margin(20);
      }
    `);
  }

  // style
  if (finalParams.scope.indexOf('style') !== -1) {

    switch (finalParams.style) {
      case 'default':
      default:
          vars.push(`
            color: sugar.color(ui, text);
            `);
        break;
    }
  }

  replaceWith(vars);
}
