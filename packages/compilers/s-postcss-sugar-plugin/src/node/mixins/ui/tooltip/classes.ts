import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __faker from 'faker';

class postcssSugarPluginUiTooltipClassesInterface extends __SInterface {
    static definition = {};
}

export interface IPostcssSugarPluginUiTooltipClassesParams {}

export { postcssSugarPluginUiTooltipClassesInterface as interface };

export default function ({
    params,
    atRule,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiTooltipClassesParams>;
    atRule: any;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiTooltipClassesParams = {
        ...params,
    };

    const vars: string[] = [];

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

    replaceWith(vars);
}
