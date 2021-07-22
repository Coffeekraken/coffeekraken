import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';

class postcssSugarPluginUiListInteractiveInterface extends __SInterface {
  static definition = {
  };
}

export interface IPostcssSugarPluginUiListInteractiveParams {
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

      &.s-rhythm--vertical,
      .s-rhythm--vertical & {
        ${__jsObjectToCssProperties(__theme().config('ui.list.:rhythmVertical'))}
      } 

  `);

    replaceWith(vars);
}
