import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';

class postcssSugarPluginUiListInteractiveInterface extends __SInterface {
    static definition = {};
}

export interface IPostcssSugarPluginUiListInteractiveParams {}

export { postcssSugarPluginUiListInteractiveInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
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

      & li,
      & dt {
        @sugar.ui.base(list);
        background: none;
        border:none;
        display: block !important;
        
        @sugar.state.hover {
          background-color: sugar.color(ui, --alpha 0.5);
          color: sugar.color(ui, foreground);
        }
        @sugar.state.active {
          background-color: sugar.color(ui);
          color: sugar.color(ui, foreground);
        }
        @sugar.state.focus {
          background-color: sugar.color(ui, --alpha 0.5);
          color: sugar.color(ui, foreground);
        }
      }

      @sugar.rhythm.vertical {
        ${__jsObjectToCssProperties(__theme().config('ui.list.:rhythmVertical'))}
      } 

  `);

    replaceWith(vars);
}
