import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiTooltipClassesInterface extends __SInterface {
}
postcssSugarPluginUiTooltipClassesInterface.definition = {};
export { postcssSugarPluginUiTooltipClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsTUFBTSwyQ0FBNEMsU0FBUSxZQUFZOztBQUM3RCxzREFBVSxHQUFHLEVBQ25CLENBQUM7QUFLSixPQUFPLEVBQUUsMkNBQTJDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFcEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O1dBZ0JELENBQUMsQ0FBQztJQUNULElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS1QsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7OztXQWFILENBQUMsQ0FBQztJQUNULElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7O1dBYUgsQ0FBQyxDQUFDO0lBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztLQUlULENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7V0FhSCxDQUFDLENBQUM7SUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O0tBSVQsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7OztXQWFILENBQUMsQ0FBQztJQUNULElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7O1dBYUgsQ0FBQyxDQUFDO0lBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztLQUlULENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7V0FhSCxDQUFDLENBQUM7SUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtULENBQUMsQ0FBQztJQUVMLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=