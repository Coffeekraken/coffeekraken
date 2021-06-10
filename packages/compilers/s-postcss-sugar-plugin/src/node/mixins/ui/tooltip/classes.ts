import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiTooltipClassesInterface extends __SInterface {
  static definition = {
  };
}

export interface IPostcssSugarPluginUiTooltipClassesParams {}

export { postcssSugarPluginUiTooltipClassesInterface as interface };

export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiTooltipClassesParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUiTooltipClassesParams = {
    ...params
  };

  const vars: string[] = [];

  vars.push(`/**
        * @name           s-toolip-container
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent the tooltip container in which you have to put your actual .s-tooltip element
        * and anything you want as a tooltip activator. Can be a button, an image, really anything
        * 
        * @example        html
        * <div class="s-tooltip-container">
        *   <img src="..." />
        *   <div class="s-tooltip">Something cool</div>
        * </div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip-container {
            position: relative;
            display: inline-block;
        }
    `);

    vars.push(`/**
        * @name           s-tooltip
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip {
            @sugar.ui.tooltip();
        }
    `);

    vars.push(`/**
        * @name           s-tooltip--top
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple top tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--top {
            @sugar.ui.tooltip($position: top, $scope: 'position');
        }
    `);

    vars.push(`/**
        * @name           s-tooltip--left
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple left tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip:left">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--left {
            @sugar.ui.tooltip($position: left, $scope: 'position');
        }
    `);
    vars.push(`/**
        * @name           s-tooltip--left-top
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple left-top tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip:left-top">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--left-top {
            @sugar.ui.tooltip($position: left-top, $scope: 'position');
        }
    `);
    vars.push(`/**
        * @name           s-tooltip--left-bottom
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple left-bottom tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip:left-bottom">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--left-bottom {
            @sugar.ui.tooltip($position: left-bottom, $scope: 'position');
        }
    `);

    vars.push(`/**
        * @name           s-tooltip--nowrap
        * @namespace      sugar.css.ui.tooltip
        * @type          w CssClass
        * 
        * This class represent a simple tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--nowrap {
            white-space: nowrap;
            max-width: 9999999px !important;
        }
    `);

  replaceWith(vars);
}
