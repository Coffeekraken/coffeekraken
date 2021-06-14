import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiListClassesInterface extends __SInterface {
  static definition = {
  };
}

export interface IPostcssSugarPluginUiListClassesParams {
}

export { postcssSugarPluginUiListClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiListClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUiListClassesParams = {
    ...params
  };

  const vars: string[] = [];

  vars.push(`/**
        * @name           s-tabs
        * @namespace      sugar.css.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>default</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
    .s-tabs {
      @sugar.ui.tabs;
    }
  `);

  vars.push(`/**
        * @name           s-tabs--grow
        * @namespace      sugar.css.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>grow</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs--grow">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
    .s-tabs--grow {
      @sugar.ui.tabs($grow: true, $scope: grow);
    }
  `);

  vars.push(`/**
        * @name           s-tabs--gradient
        * @namespace      sugar.css.ui.tabs
        * @type           CssClass
        * 
        * This class represent a "<yellow>gradient</yellow>" tabs
        * 
        * @example        html
        * <div class="s-tabs--gradient">
        *    <div class="active">An active tab</div>
        *    <div>A tab</div>
        * </div>
      */
    .s-tabs--gradient {
      @sugar.ui.tabs($style: gradient, $scope: style);
    }
  `);

  replaceWith(vars);
}
