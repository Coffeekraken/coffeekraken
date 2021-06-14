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

            & > [class*="s-tooltip"] {
                opacity: 0;
                pointer-events: none;
            }

            &:hover > [class*="s-tooltip"] {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsTUFBTSwyQ0FBNEMsU0FBUSxZQUFZOztBQUM3RCxzREFBVSxHQUFHLEVBQ25CLENBQUM7QUFLSixPQUFPLEVBQUUsMkNBQTJDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFcEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O1dBZ0JELENBQUMsQ0FBQztJQUNULElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7OztLQWVULENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7V0FhSCxDQUFDLENBQUM7SUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O0tBSVQsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7OztXQWFILENBQUMsQ0FBQztJQUNULElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7O1dBYUgsQ0FBQyxDQUFDO0lBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztLQUlULENBQUMsQ0FBQztJQUNILElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7V0FhSCxDQUFDLENBQUM7SUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O0tBSVQsQ0FBQyxDQUFDO0lBRUgsaUJBQWlCO0lBQ2pCLHdDQUF3QztJQUN4Qyw2Q0FBNkM7SUFDN0MsaUNBQWlDO0lBQ2pDLFNBQVM7SUFDVCxtREFBbUQ7SUFDbkQsU0FBUztJQUNULDZCQUE2QjtJQUM3Qiw2REFBNkQ7SUFDN0QseURBQXlEO0lBQ3pELFNBQVM7SUFDVCx3QkFBd0I7SUFDeEIseUZBQXlGO0lBQ3pGLFlBQVk7SUFDWixjQUFjO0lBQ2QseUJBQXlCO0lBQ3pCLGtFQUFrRTtJQUNsRSxRQUFRO0lBQ1IsTUFBTTtJQUNOLGlCQUFpQjtJQUNqQiw0Q0FBNEM7SUFDNUMsNkNBQTZDO0lBQzdDLGlDQUFpQztJQUNqQyxTQUFTO0lBQ1QsdURBQXVEO0lBQ3ZELFNBQVM7SUFDVCw2QkFBNkI7SUFDN0IsNkRBQTZEO0lBQzdELDZEQUE2RDtJQUM3RCxTQUFTO0lBQ1Qsd0JBQXdCO0lBQ3hCLHlGQUF5RjtJQUN6RixZQUFZO0lBQ1osY0FBYztJQUNkLDZCQUE2QjtJQUM3QixzRUFBc0U7SUFDdEUsUUFBUTtJQUNSLE1BQU07SUFDTixpQkFBaUI7SUFDakIsK0NBQStDO0lBQy9DLDZDQUE2QztJQUM3QyxpQ0FBaUM7SUFDakMsU0FBUztJQUNULDBEQUEwRDtJQUMxRCxTQUFTO0lBQ1QsNkJBQTZCO0lBQzdCLDZEQUE2RDtJQUM3RCxnRUFBZ0U7SUFDaEUsU0FBUztJQUNULHdCQUF3QjtJQUN4Qix5RkFBeUY7SUFDekYsWUFBWTtJQUNaLGNBQWM7SUFDZCxnQ0FBZ0M7SUFDaEMseUVBQXlFO0lBQ3pFLFFBQVE7SUFDUixNQUFNO0lBRU4saUJBQWlCO0lBQ2pCLHlDQUF5QztJQUN6Qyw2Q0FBNkM7SUFDN0MsaUNBQWlDO0lBQ2pDLFNBQVM7SUFDVCxvREFBb0Q7SUFDcEQsU0FBUztJQUNULDZCQUE2QjtJQUM3Qiw2REFBNkQ7SUFDN0QsMERBQTBEO0lBQzFELFNBQVM7SUFDVCx3QkFBd0I7SUFDeEIseUZBQXlGO0lBQ3pGLFlBQVk7SUFDWixjQUFjO0lBQ2QsMEJBQTBCO0lBQzFCLG1FQUFtRTtJQUNuRSxRQUFRO0lBQ1IsTUFBTTtJQUNOLGlCQUFpQjtJQUNqQiw2Q0FBNkM7SUFDN0MsNkNBQTZDO0lBQzdDLGlDQUFpQztJQUNqQyxTQUFTO0lBQ1Qsd0RBQXdEO0lBQ3hELFNBQVM7SUFDVCw2QkFBNkI7SUFDN0IsNkRBQTZEO0lBQzdELDhEQUE4RDtJQUM5RCxTQUFTO0lBQ1Qsd0JBQXdCO0lBQ3hCLHlGQUF5RjtJQUN6RixZQUFZO0lBQ1osY0FBYztJQUNkLDhCQUE4QjtJQUM5Qix1RUFBdUU7SUFDdkUsUUFBUTtJQUNSLE1BQU07SUFDTixpQkFBaUI7SUFDakIsZ0RBQWdEO0lBQ2hELDZDQUE2QztJQUM3QyxpQ0FBaUM7SUFDakMsU0FBUztJQUNULDJEQUEyRDtJQUMzRCxTQUFTO0lBQ1QsNkJBQTZCO0lBQzdCLDZEQUE2RDtJQUM3RCxpRUFBaUU7SUFDakUsU0FBUztJQUNULHdCQUF3QjtJQUN4Qix5RkFBeUY7SUFDekYsWUFBWTtJQUNaLGNBQWM7SUFDZCxpQ0FBaUM7SUFDakMsMEVBQTBFO0lBQzFFLFFBQVE7SUFDUixNQUFNO0lBRU4sSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7OztXQWFILENBQUMsQ0FBQztJQUNULElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS1QsQ0FBQyxDQUFDO0lBRUwsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==