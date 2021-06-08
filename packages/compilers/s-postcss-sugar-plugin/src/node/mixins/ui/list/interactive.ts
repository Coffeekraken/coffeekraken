import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiListInteractiveInterface extends __SInterface {
  static definition = {
    color: {
      type: 'String',
      required: true,
      default: 'default',
      alias: 'c'
    },
    textColor: {
      type: 'String',
      alias: 't'
    },
    style: {
      type: 'String',
      values: ['default'],
      default: 'default'
    }
  };
}

export interface IPostcssSugarPluginUiListInteractiveParams {
  color: string;
  textColor: string;
  style: 'default';
}

export { postcssSugarPluginUiListInteractiveInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiListInteractiveParams>;
  atRule: any;
  replaceWith: Function;
}) {
  //   const finalParams: IPostcssSugarPluginUiListInteractiveParams = {
  //     color: 'primary',
  //     ...params
  //   };

  const vars: string[] = [];

  vars.push(`
    @sugar.scope.lnf {
        background-color: sugar.color(surface);

        & > li,
        & > dt {
          @sugar.ui.base(list);
          display: block !important;
          
          .s-highlight {
            background-color: sugar.color(accent:highlight, background) !important;
            color: sugar.color(accent:highlight, foreground) !important;
          }
        }

    }
  `);

    replaceWith(vars);
}
