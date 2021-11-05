import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';
class postcssSugarPluginUiTooltipClassesInterface extends __SInterface {
}
postcssSugarPluginUiTooltipClassesInterface.definition = {};
export { postcssSugarPluginUiTooltipClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/tooltip.js`],
    };
}
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
        * @cssClass             s-tooltip-container:active     Allow to display a tooltip without having the need of the user interaction
        * @cssClass             s-tooltip                       Apply on the element you want as a tooltip
        * @cssClass             s-tooltip:block-start                 Align your tooltip at "top". This is the default         
        * @cssClass             s-tooltip:inline-end               Align your tooltip at "right"
        * @cssClass             s-tooltip:inline-start               Align your tooltip at "left"
        * @cssClass             s-tooltip:block-end               Align your tooltip at "bottom"
        * @cssClass             s-tooltip:interactive          Allow the user to interact with the tooltip
        * 
        * @example        html
        * <div class="s-font:30 s-mbe:50">
        *   <span class="s-tooltip-container:active">
        *       <a class="s-btn s-mie:20 s-mbe:20">Hello</a>
        *       <div class="s-tooltip:inline-end s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        * </div>
        * 
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Positions</h3>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">Block start (default)</a>
        *       <div class="s-tooltip s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">Inline end</a>
        *       <div class="s-tooltip:inline-end s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">Block end</a>
        *       <div class="s-tooltip:block-end s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">Inline start</a>
        *       <div class="s-tooltip:inline-start s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        * </div>
        * 
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Colors (sample)</h3>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">Accent</a>
        *       <div class="s-tooltip s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">Complementary</a>
        *       <div class="s-tooltip s-color:complementary">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">Error</a>
        *       <div class="s-tooltip s-color:error">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">Info</a>
        *       <div class="s-tooltip s-color:info">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        * </div>
        * 
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Interactions</h3>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">I'm not interactive</a>
        *       <div class="s-tooltip">
        *           <a class="s-btn s-color:accent">Click me if you can!</a>
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">I'm interactive</a>
        *       <div class="s-tooltip:interactive">
        *           <a class="s-btn s-color:accent">Click me because you can!</a>
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
        * <div class="s-tooltip-container:active">
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
        *   <div class="s-tooltip:interactive">Something cool</div>
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
        *   <div class="s-tooltip:inline-end">Something cool</div>
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
    //     * <div class="s-tooltip:right-center-top">Something cool</div>
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
    //     * <div class="s-tooltip:right-top-top">Something cool</div>
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
    //     * <div class="s-tooltip:right-bottom-top">Something cool</div>
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
    //     * <div class="s-tooltip:right-bottom-bottom">Something cool</div>
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
        *   <div class="s-tooltip:inline-start">Something cool</div>
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
    //     * <div class="s-tooltip:left-center-top">Something cool</div>
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
    //     * <div class="s-tooltip:left-top-top">Something cool</div>
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
    //     * <div class="s-tooltip:left-bottom-top">Something cool</div>
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
    //     * <div class="s-tooltip:left-bottom-bottom">Something cool</div>
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
        *   <div class="s-tooltip:block-end">Something cool</div>
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
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBRTVCLE1BQU0sMkNBQTRDLFNBQVEsWUFBWTs7QUFDM0Qsc0RBQVUsR0FBRyxFQUFFLENBQUM7QUFLM0IsT0FBTyxFQUFFLDJDQUEyQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXBFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE1BQU0sVUFBVSxZQUFZO0lBQ3hCLE9BQU87UUFDSCxLQUFLLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxhQUFhLENBQUM7S0FDdkMsQ0FBQztBQUNOLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLHFCQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JBeUJRLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7c0JBVS9DLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Ozs7OztzQkFNL0MsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTs7Ozs7O3NCQU0vQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFOzs7Ozs7c0JBTS9DLE9BQU8sQ0FBQyxJQUFJ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