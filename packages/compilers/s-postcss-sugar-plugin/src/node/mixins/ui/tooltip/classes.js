import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';
class postcssSugarPluginUiTooltipClassesInterface extends __SInterface {
}
postcssSugarPluginUiTooltipClassesInterface.definition = {};
export { postcssSugarPluginUiTooltipClassesInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`
      /**
        * @name          Tooltips
        * @namespace          sugar.css.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/tooltips
        * @platform       css
        * @status       beta
        * 
        * These classes allows you display nice tooltips on any HTMLElement
        * 
        * @cssClass             s-tooltip-container             Allows to hide and show your tooltip on hover (focus)
        * @cssClass             s-tooltip-container\:active     Allow to display a tooltip without having the need of the user interaction
        * @cssClass             s-tooltip                       Apply on the element you want as a tooltip
        * @cssClass             s-tooltip\:block-start                 Align your tooltip at "top". This is the default         
        * @cssClass             s-tooltip\:inline-end               Align your tooltip at "right"
        * @cssClass             s-tooltip\:inline-start               Align your tooltip at "left"
        * @cssClass             s-tooltip\:block-end               Align your tooltip at "bottom"
        * @cssClass             s-tooltip\:interactive          Allow the user to interact with the tooltip
        * 
        * @example        html
        * <div class="s-font:30 s-mbe:50">
        *   <span class="s-tooltip-container\:active">
        *       <a class="s-btn s-mr\:20 s-mb\:20">Hello</a>
        *       <div class="s-tooltip\:inline-end s-ui\:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        * </div>
        * 
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-color:accent s-font:30 s-mbe:30">Positions</h3>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mr\:20 s-mb\:20">Block start (default)</a>
        *       <div class="s-tooltip">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mr\:20 s-mb\:20">Inline end</a>
        *       <div class="s-tooltip\:inline-end s-ui\:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mr\:20 s-mb\:20">Block end</a>
        *       <div class="s-tooltip\:block-end s-ui\:complementary">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mr\:20 s-mb\:20">Inline start</a>
        *       <div class="s-tooltip\:inline-start s-ui\:error">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        * </div>
        * 
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-color:accent s-font:30 s-mbe:30">Colors (sample)</h3>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mr\:20 s-mb\:20">Accent</a>
        *       <div class="s-tooltip s-ui\:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mr\:20 s-mb\:20">Complementary</a>
        *       <div class="s-tooltip s-ui\:complementary">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mr\:20 s-mb\:20">Error</a>
        *       <div class="s-tooltip s-ui\:error">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mr\:20 s-mb\:20">Info</a>
        *       <div class="s-tooltip s-ui\:info">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        * </div>
        * 
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-color:accent s-font:30 s-mbe:30">Interactions</h3>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mr\:20 s-mb\:20">I'm not interactive</a>
        *       <div class="s-tooltip">
        *           <a class="s-btn s-ui\:accent">Click me if you can!</a>
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mr\:20 s-mb\:20">I'm interactive</a>
        *       <div class="s-tooltip\:interactive">
        *           <a class="s-btn s-ui\:accent">Click me because you can!</a>
        *       </div>
        *   </span>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
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
            }

            &:focus > .s-tooltip,
            &:focus-within > .s-tooltip,
            .s-tooltip:focus,
            &:hover > .s-tooltip {
                opacity: 1;
            }
        }
    `);
    vars.push(`/**
        * @name           s-toolip-container:active
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class allows you to display a tooltip inside a tooltip container without needing hover by the user
        * 
        * @example        html
        * <div class="s-tooltip-container\:active">
        *   <img src="..." />
        *   <div class="s-tooltip">Something cool</div>
        * </div>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    // no need to write a class here cause this is handled in the tooltip.ts file directly...
    vars.push(`/**
        * @name           s-tooltip
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip {
            @sugar.ui.tooltip();
        }
    `);
    // Interactive
    vars.push(`/**
        * @name           s-tooltip--interactive
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class make a tooltip interactive. This mean that the user can hover the tooltip,
        * select texts in it, click on buttons, etc...
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip\:interactive">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--interactive {
            @sugar.ui.tooltip($interactive: true, $scope: 'interactive');
        }
    `);
    // TOP
    vars.push(`/**
        * @name           s-tooltip
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple block start (top) tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip {
            @sugar.ui.tooltip($position: block-start, $scope: 'position');
        }
    `);
    // vars.push(`/**
    //     * @name           s-tooltip--top-left
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     *
    //     * This class represent a simple top-left tooltip
    //     *
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip">Something cool</div>
    //     *
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--top-left {
    //         @sugar.ui.tooltip($position: top-left, $scope: 'position');
    //     }
    // `);
    // vars.push(`/**
    //     * @name           s-tooltip--top-right
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     *
    //     * This class represent a simple top-right tooltip
    //     *
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip">Something cool</div>
    //     *
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--top-right {
    //         @sugar.ui.tooltip($position: top-right, $scope: 'position');
    //     }
    // `);
    // RIGHT
    vars.push(`/**
        * @name           s-tooltip:inline-end
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple inline end (right) tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip\:inline-end">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--inline-end {
            @sugar.ui.tooltip($position: inline-end, $scope: 'position');
        }
    `);
    // vars.push(`/**
    //     * @name           s-tooltip--right-center-top
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     *
    //     * This class represent a right tooltip centered and aligned top
    //     *
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip\:right-center-top">Something cool</div>
    //     *
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--right-center-top {
    //         @sugar.ui.tooltip($position: right-center-top, $scope: 'position');
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
    //     * <div class="s-tooltip">Something cool</div>
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
    //     * @name           s-tooltip--right-top-top
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     *
    //     * This class represent a right tooltip top and aligned top
    //     *
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip\:right-top-top">Something cool</div>
    //     *
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--right-top-top {
    //         @sugar.ui.tooltip($position: right-top-top, $scope: 'position');
    //     }
    // `);
    // vars.push(`/**
    //     * @name           s-tooltip--right-bottom-top
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     *
    //     * This class represent a right tooltip bottom and aligned top
    //     *
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip\:right-bottom-top">Something cool</div>
    //     *
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--right-bottom-top {
    //         @sugar.ui.tooltip($position: right-bottom-top, $scope: 'position');
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
    //     * <div class="s-tooltip">Something cool</div>
    //     *
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--right-bottom {
    //         @sugar.ui.tooltip($position: right-bottom, $scope: 'position');
    //     }
    // `);
    // vars.push(`/**
    //     * @name           s-tooltip--right-bottom-bottom
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     *
    //     * This class represent a right tooltip bottom and aligned bottom
    //     *
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip\:right-bottom-bottom">Something cool</div>
    //     *
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--right-bottom-bottom {
    //         @sugar.ui.tooltip($position: right-bottom-bottom, $scope: 'position');
    //     }
    // `);
    // left
    vars.push(`/**
        * @name           s-tooltip:inline-start
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple left tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip\:inline-start">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--inline-start {
            @sugar.ui.tooltip($position: inline-start, $scope: 'position');
        }
    `);
    // vars.push(`/**
    //     * @name           s-tooltip--left-center-top
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     *
    //     * This class represent a left tooltip centered and aligned top
    //     *
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip\:left-center-top">Something cool</div>
    //     *
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--left-center-top {
    //         @sugar.ui.tooltip($position: left-center-top, $scope: 'position');
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
    //     * <div class="s-tooltip">Something cool</div>
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
    //     * @name           s-tooltip--left-top-top
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     *
    //     * This class represent a left tooltip top and aligned top
    //     *
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip\:left-top-top">Something cool</div>
    //     *
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--left-top-top {
    //         @sugar.ui.tooltip($position: left-top-top, $scope: 'position');
    //     }
    // `);
    // vars.push(`/**
    //     * @name           s-tooltip--left-bottom-top
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     *
    //     * This class represent a left tooltip bottom and aligned top
    //     *
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip\:left-bottom-top">Something cool</div>
    //     *
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--left-bottom-top {
    //         @sugar.ui.tooltip($position: left-bottom-top, $scope: 'position');
    //     }
    // `);
    // vars.push(`/**
    //     * @name           s-tooltip--left-bottom-bottom
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     *
    //     * This class represent a left tooltip bottom and aligned bottom
    //     *
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip\:left-bottom-bottom">Something cool</div>
    //     *
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--left-bottom-bottom {
    //         @sugar.ui.tooltip($position: left-bottom-bottom, $scope: 'position');
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
    //     * <div class="s-tooltip">Something cool</div>
    //     *
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--left-bottom {
    //         @sugar.ui.tooltip($position: left-bottom, $scope: 'position');
    //     }
    // `);
    // BOTTOM
    vars.push(`/**
        * @name           s-tooltip:block-end
        * @namespace      sugar.css.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple block end (bottom) tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip\:block-end">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */`);
    vars.push(`
        .s-tooltip--block-end {
            @sugar.ui.tooltip($position: block-end, $scope: 'position');
        }
    `);
    // vars.push(`/**
    //     * @name           s-tooltip--bottom-left
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     *
    //     * This class represent a simple bottom-left tooltip
    //     *
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip">Something cool</div>
    //     *
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--bottom-left {
    //         @sugar.ui.tooltip($position: bottom-left, $scope: 'position');
    //     }
    // `);
    // vars.push(`/**
    //     * @name           s-tooltip--bottom-right
    //     * @namespace      sugar.css.ui.tooltip
    //     * @type           CssClass
    //     *
    //     * This class represent a simple bottom-right tooltip
    //     *
    //     * @example        html
    //     * <a class="s-tooltip-container">I'm a cool button</a>
    //     * <div class="s-tooltip">Something cool</div>
    //     *
    //     * @since    2.0.0
    //     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
    //     */`);
    // vars.push(`
    //     .s-tooltip--bottom-right {
    //         @sugar.ui.tooltip($position: bottom-right, $scope: 'position');
    //     }
    // `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sMkNBQTRDLFNBQVEsWUFBWTs7QUFDM0Qsc0RBQVUsR0FBRyxFQUFFLENBQUM7QUFLM0IsT0FBTyxFQUFFLDJDQUEyQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXBFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkF5QlEsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7OztzQkFVL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7O3NCQU0vQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7c0JBTS9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7OztzQkFNL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7Ozs7OztzQkFVL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFB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