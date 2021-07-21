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

            & > .s-tooltip {
                opacity: 0;
                pointer-events: none;
            }

            &:focus > .s-tooltip,
            &:focus-within > .s-tooltip,
            .s-tooltip:focus,
            &:hover > .s-tooltip {
                opacity: 1;
                pointer-events: all;
            }
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

    // TOP
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
        * @name           s-tooltip--top-left
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple top-left tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--top-left {
            @sugar.ui.tooltip($position: top-left, $scope: 'position');
        }
    `);
    vars.push(`/**
        * @name           s-tooltip--top-right
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple top-right tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--top-right {
            @sugar.ui.tooltip($position: top-right, $scope: 'position');
        }
    `);

    // RIGHT
    vars.push(`/**
        * @name           s-tooltip--right
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple right tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip\:right">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--right {
            @sugar.ui.tooltip($position: right, $scope: 'position');
        }
    `);
    vars.push(`/**
        * @name           s-tooltip--right-center-top
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a right tooltip centered and aligned top
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip\:right-center-top">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--right-center-top {
            @sugar.ui.tooltip($position: right-center-top, $scope: 'position');
        }
    `);
    vars.push(`/**
        * @name           s-tooltip--right-top
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple right-top tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--right-top {
            @sugar.ui.tooltip($position: right-top, $scope: 'position');
        }
    `);
    vars.push(`/**
        * @name           s-tooltip--right-top-top
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a right tooltip top and aligned top
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip\:right-top-top">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--right-top-top {
            @sugar.ui.tooltip($position: right-top-top, $scope: 'position');
        }
    `);
    vars.push(`/**
        * @name           s-tooltip--right-bottom-top
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a right tooltip bottom and aligned top
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip\:right-bottom-top">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--right-bottom-top {
            @sugar.ui.tooltip($position: right-bottom-top, $scope: 'position');
        }
    `);
    vars.push(`/**
        * @name           s-tooltip--right-bottom
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple right-bottom tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--right-bottom {
            @sugar.ui.tooltip($position: right-bottom, $scope: 'position');
        }
    `);
    vars.push(`/**
        * @name           s-tooltip--right-bottom-bottom
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a right tooltip bottom and aligned bottom
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip\:right-bottom-bottom">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--right-bottom-bottom {
            @sugar.ui.tooltip($position: right-bottom-bottom, $scope: 'position');
        }
    `);

    // left
    vars.push(`/**
        * @name           s-tooltip--left
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple left tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip\:left">Something cool</div>
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
        * @name           s-tooltip--left-center-top
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a left tooltip centered and aligned top
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip\:left-center-top">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--left-center-top {
            @sugar.ui.tooltip($position: left-center-top, $scope: 'position');
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
        * <div class="s-tooltip">Something cool</div>
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
        * @name           s-tooltip--left-top-top
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a left tooltip top and aligned top
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip\:left-top-top">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--left-top-top {
            @sugar.ui.tooltip($position: left-top-top, $scope: 'position');
        }
    `);
    vars.push(`/**
        * @name           s-tooltip--left-bottom-top
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a left tooltip bottom and aligned top
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip\:left-bottom-top">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--left-bottom-top {
            @sugar.ui.tooltip($position: left-bottom-top, $scope: 'position');
        }
    `);
    vars.push(`/**
        * @name           s-tooltip--left-bottom-bottom
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a left tooltip bottom and aligned bottom
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip\:left-bottom-bottom">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--left-bottom-bottom {
            @sugar.ui.tooltip($position: left-bottom-bottom, $scope: 'position');
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
        * <div class="s-tooltip">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--left-bottom {
            @sugar.ui.tooltip($position: left-bottom, $scope: 'position');
        }
    `);

    // BOTTOM
    vars.push(`/**
        * @name           s-tooltip--bottom
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple bottom tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--bottom {
            @sugar.ui.tooltip($position: bottom, $scope: 'position');
        }
    `);
    vars.push(`/**
        * @name           s-tooltip--bottom-left
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple bottom-left tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--bottom-left {
            @sugar.ui.tooltip($position: bottom-left, $scope: 'position');
        }
    `);
    vars.push(`/**
        * @name           s-tooltip--bottom-right
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple bottom-right tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container">I'm a cool button</a>
        * <div class="s-tooltip">Something cool</div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--bottom-right {
            @sugar.ui.tooltip($position: bottom-right, $scope: 'position');
        }
    `);

    // vars.push(`/**
    //     * @name           s-tooltip--left
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     * 
    //     * This class represent a simple left tooltip
    //     * 
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip:left">Something cool</div>
    //     * 
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--left {
    //         @sugar.ui.tooltip($position: left, $scope: 'position');
    //     }
    // `);
    // vars.push(`/**
    //     * @name           s-tooltip--left-top
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     * 
    //     * This class represent a simple left-top tooltip
    //     * 
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip:left-top">Something cool</div>
    //     * 
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--left-top {
    //         @sugar.ui.tooltip($position: left-top, $scope: 'position');
    //     }
    // `);
    // vars.push(`/**
    //     * @name           s-tooltip--left-bottom
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     * 
    //     * This class represent a simple left-bottom tooltip
    //     * 
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip:left-bottom">Something cool</div>
    //     * 
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--left-bottom {
    //         @sugar.ui.tooltip($position: left-bottom, $scope: 'position');
    //     }
    // `);

    // vars.push(`/**
    //     * @name           s-tooltip--right
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     * 
    //     * This class represent a simple right tooltip
    //     * 
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip:right">Something cool</div>
    //     * 
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--right {
    //         @sugar.ui.tooltip($position: right, $scope: 'position');
    //     }
    // `);
    // vars.push(`/**
    //     * @name           s-tooltip--right-top
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     * 
    //     * This class represent a simple right-top tooltip
    //     * 
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip:right-top">Something cool</div>
    //     * 
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--right-top {
    //         @sugar.ui.tooltip($position: right-top, $scope: 'position');
    //     }
    // `);
    // vars.push(`/**
    //     * @name           s-tooltip--right-bottom
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     * 
    //     * This class represent a simple right-bottom tooltip
    //     * 
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip:right-bottom">Something cool</div>
    //     * 
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--right-bottom {
    //         @sugar.ui.tooltip($position: right-bottom, $scope: 'position');
    //     }
    // `);

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
