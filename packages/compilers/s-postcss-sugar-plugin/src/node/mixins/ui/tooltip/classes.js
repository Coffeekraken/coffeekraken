import __SInterface from '@coffeekraken/s-interface';
import __faker from 'faker';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginUiTooltipClassesInterface extends __SInterface {
    static get _definition() {
        return {
            styles: {
                type: 'String[]',
                values: ['solid'],
                default: ['solid'],
            },
            shapes: {
                type: 'String[]',
                values: ['default', 'square', 'pill'],
                default: ['default', 'square', 'pill'],
            },
            defaultStyle: {
                type: 'String',
                values: ['solid'],
                default: __STheme.config('ui.tooltip.defaultStyle'),
            },
            defaultShape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: __STheme.config('ui.tooltip.defaultShape'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'vr', 'tf'],
                default: ['bare', 'lnf', 'shape', 'vr', 'tf'],
            },
        };
    }
}
export { postcssSugarPluginUiTooltipClassesInterface as interface };
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
export function dependencies() {
    return {
        files: [`${__dirname()}/tooltip.js`],
    };
}
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ styles: [], shapes: [], defaultStyle: 'solid', defaultShape: 'default', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
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
        ${finalParams.styles
        .map((style) => {
        return ` * @cssClass     s-tooltip${style === finalParams.defaultStyle ? '' : `:${style}`}           Apply the ${style} tooltip style`;
    })
        .join('\n')}
        ${finalParams.shapes
        .map((shape) => {
        return ` * @cssClass     s-tooltip${shape === finalParams.defaultShape ? '' : `:${shape}`}           Apply the ${shape} tooltip shape`;
    })
        .join('\n')}
        * @cssClass             s-tooltip:block-start                 Align your tooltip at "top". This is the default         
        * @cssClass             s-tooltip:inline-end               Align your tooltip at "right"
        * @cssClass             s-tooltip:inline-start               Align your tooltip at "left"
        * @cssClass             s-tooltip:block-end               Align your tooltip at "bottom"
        * @cssClass             s-tooltip:interactive          Allow the user to interact with the tooltip
        * 
        * @example        html
        ${finalParams.styles.map((style) => {
        return ` * <!-- ${style} style -->
                * <div class="s-font:30 s-mbe:50">
                *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${style} style</h3>
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-mie:20 s-mbe:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${finalParams.defaultStyle === style ? '' : `:${style}`} s-color:accent">
                *           ${__faker.name.title()} ${__faker.name.findName()}
                *       </div>
                *   </span>
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-mie:20 s-mbe:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${finalParams.defaultStyle === style ? '' : `:${style}`} s-color:complementary">
                *           ${__faker.name.title()} ${__faker.name.findName()}
                *       </div>
                *   </span>
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-mie:20 s-mbe:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${finalParams.defaultStyle === style ? '' : `:${style}`} s-color:info">
                *           ${__faker.name.title()} ${__faker.name.findName()}
                *       </div>
                *   </span>
                * </div>
            `;
    })}
        *
        * <!-- Shapes -->
        ${finalParams.shapes.map((shape) => {
        return ` * <!-- ${shape} shape -->
                * <div class="s-font:30 s-mbe:50">
                *   <h3 class="s-tc:accent s-font:30 s-mbe:30">${shape} shape</h3>
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-mie:20 s-mbe:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${finalParams.defaultShape === shape ? '' : `:${shape}`} s-color:accent">
                *           ${__faker.name.title()} ${__faker.name.findName()}
                *       </div>
                *   </span>
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-mie:20 s-mbe:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${finalParams.defaultShape === shape ? '' : `:${shape}`} s-color:complementary">
                *           ${__faker.name.title()} ${__faker.name.findName()}
                *       </div>
                *   </span>
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-mie:20 s-mbe:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${finalParams.defaultShape === shape ? '' : `:${shape}`} s-color:info">
                *           ${__faker.name.title()} ${__faker.name.findName()}
                *       </div>
                *   </span>
                * </div>
            `;
    })}
        * 
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Positions</h3>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">Block start (default)</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">Inline end</a>
        *       <div class="s-tooltip:inline-end s-white-space:nowrap s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">Block end</a>
        *       <div class="s-tooltip:block-end s-white-space:nowrap s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">Inline start</a>
        *       <div class="s-tooltip:inline-start s-white-space:nowrap s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        * </div>
        * 
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Colors (sample)</h3>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">Accent</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:accent">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">Complementary</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:complementary">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">Error</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:error">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">Info</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:info">
        *           ${__faker.name.title()} ${__faker.name.findName()}
        *       </div>
        *   </span>
        * </div>
        * 
        * <div class="s-font:30 s-mbe:50">
        *   <h3 class="s-tc:accent s-font:30 s-mbe:30">Interactions</h3>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">I'm not interactive</a>
        *       <div class="s-tooltip s-white-space:nowrap">
        *           <a class="s-btn s-color:accent">Click me if you can!</a>
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20 s-mbe:20">I'm interactive</a>
        *       <div class="s-tooltip:interactive s-white-space:nowrap">
        *           <a class="s-btn s-color:accent">Click me because you can!</a>
        *       </div>
        *   </span>
        * </div>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
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
        vars.code(() => `
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
        vars.comment(() => `/**
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
    }
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
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
        vars.code(() => `
            .s-tooltip {
                @sugar.ui.tooltip($scope: bare);
            }
        `);
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.styles.forEach((style) => {
            vars.comment(() => `/**
                * @name           s-tooltip${finalParams.defaultStyle === style ? '' : `:${style}`}
                * @namespace      sugar.css.ui.tooltip
                * @type           CssClass
                * 
                * This class represent a ${style} tooltip
                * 
                * @example        html
                * <a class="s-tooltip-container s-btn">
                *   I'm a cool button
                *   <div class="s-tooltip${finalParams.defaultStyle === style ? '' : `:${style}`}">Something cool</div>
                * </a>
                * 
                * @since    2.0.0
                * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                */`);
            vars.code(() => `
                .s-tooltip${finalParams.defaultStyle === style ? '' : `--${style}`} {
                    @sugar.ui.tooltip($style: ${style}, $scope: lnf);
                }
            `);
        });
    }
    if (finalParams.scope.includes('shape')) {
        finalParams.shapes.forEach((shape) => {
            vars.comment(() => `/**
                * @name           s-tooltip${finalParams.defaultShape === shape ? '' : `:${shape}`}
                * @namespace      sugar.css.ui.tooltip
                * @type           CssClass
                * 
                * This class represent a ${shape} tooltip
                * 
                * @example        html
                * <a class="s-tooltip-container s-btn">
                *   I'm a cool button
                *   <div class="s-tooltip${finalParams.defaultShape === shape ? '' : `:${shape}`}">Something cool</div>
                * </a>
                * 
                * @since    2.0.0
                * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                */`);
            vars.code(() => `
                .s-tooltip${finalParams.defaultShape === shape ? '' : `--${shape}`} {
                    @sugar.ui.tooltip($shape: ${shape}, $scope: shape);
                }
            `);
        });
    }
    // Interactive
    vars.comment(() => `/**
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
    vars.code(() => `
        .s-tooltip--interactive {
            @sugar.ui.tooltip($interactive: true, $scope: 'interactive');
        }
    `);
    // TOP
    vars.comment(() => `/**
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
    vars.code(() => `
        .s-tooltip {
            @sugar.ui.tooltip($position: block-start, $scope: 'position');
        }
    `);
    // vars.comment(() => `/**
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
    // vars.code(() => `
    //     .s-tooltip--top-left {
    //         @sugar.ui.tooltip($position: top-left, $scope: 'position');
    //     }
    // `);
    // vars.comment(() => `/**
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
    // vars.code(() => `
    //     .s-tooltip--top-right {
    //         @sugar.ui.tooltip($position: top-right, $scope: 'position');
    //     }
    // `);
    // RIGHT
    vars.comment(() => `/**
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
    vars.code(() => `
        .s-tooltip--inline-end {
            @sugar.ui.tooltip($position: inline-end, $scope: 'position');
        }
    `);
    // vars.comment(() => `/**
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
    // vars.code(() => `
    //     .s-tooltip--right-center-top {
    //         @sugar.ui.tooltip($position: right-center-top, $scope: 'position');
    //     }
    // `);
    // vars.comment(() => `/**
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
    // vars.code(() => `
    //     .s-tooltip--right-top {
    //         @sugar.ui.tooltip($position: right-top, $scope: 'position');
    //     }
    // `);
    // vars.comment(() => `/**
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
    // vars.code(() => `
    //     .s-tooltip--right-top-top {
    //         @sugar.ui.tooltip($position: right-top-top, $scope: 'position');
    //     }
    // `);
    // vars.comment(() => `/**
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
    // vars.code(() => `
    //     .s-tooltip--right-bottom-top {
    //         @sugar.ui.tooltip($position: right-bottom-top, $scope: 'position');
    //     }
    // `);
    // vars.comment(() => `/**
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
    // vars.code(() => `
    //     .s-tooltip--right-bottom {
    //         @sugar.ui.tooltip($position: right-bottom, $scope: 'position');
    //     }
    // `);
    // vars.comment(() => `/**
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
    // vars.code(() => `
    //     .s-tooltip--right-bottom-bottom {
    //         @sugar.ui.tooltip($position: right-bottom-bottom, $scope: 'position');
    //     }
    // `);
    // left
    vars.comment(() => `/**
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
    vars.code(() => `
        .s-tooltip--inline-start {
            @sugar.ui.tooltip($position: inline-start, $scope: 'position');
        }
    `);
    // vars.comment(() => `/**
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
    // vars.code(() => `
    //     .s-tooltip--left-center-top {
    //         @sugar.ui.tooltip($position: left-center-top, $scope: 'position');
    //     }
    // `);
    // vars.comment(() => `/**
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
    // vars.code(() => `
    //     .s-tooltip--left-top {
    //         @sugar.ui.tooltip($position: left-top, $scope: 'position');
    //     }
    // `);
    // vars.comment(() => `/**
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
    // vars.code(() => `
    //     .s-tooltip--left-top-top {
    //         @sugar.ui.tooltip($position: left-top-top, $scope: 'position');
    //     }
    // `);
    // vars.comment(() => `/**
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
    // vars.code(() => `
    //     .s-tooltip--left-bottom-top {
    //         @sugar.ui.tooltip($position: left-bottom-top, $scope: 'position');
    //     }
    // `);
    // vars.comment(() => `/**
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
    // vars.code(() => `
    //     .s-tooltip--left-bottom-bottom {
    //         @sugar.ui.tooltip($position: left-bottom-bottom, $scope: 'position');
    //     }
    // `);
    // vars.comment(() => `/**
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
    // vars.code(() => `
    //     .s-tooltip--left-bottom {
    //         @sugar.ui.tooltip($position: left-bottom, $scope: 'position');
    //     }
    // `);
    // BOTTOM
    vars.comment(() => `/**
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
    vars.code(() => `
        .s-tooltip--block-end {
            @sugar.ui.tooltip($position: block-end, $scope: 'position');
        }
    `);
    // vars.comment(() => `/**
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
    // vars.code(() => `
    //     .s-tooltip--bottom-left {
    //         @sugar.ui.tooltip($position: bottom-left, $scope: 'position');
    //     }
    // `);
    // vars.comment(() => `/**
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
    // vars.code(() => `
    //     .s-tooltip--bottom-right {
    //         @sugar.ui.tooltip($position: bottom-right, $scope: 'position');
    //     }
    // `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sT0FBTyxDQUFDO0FBQzVCLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0sMkNBQTRDLFNBQVEsWUFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxVQUFVO2dCQUNoQixNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQzthQUNyQjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQ3JDLE9BQU8sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2FBQ3pDO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUM7YUFDdEQ7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQ3JDLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDO2FBQ3REO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFF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