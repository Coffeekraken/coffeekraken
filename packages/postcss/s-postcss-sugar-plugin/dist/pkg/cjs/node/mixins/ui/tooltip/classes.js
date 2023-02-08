"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const faker_1 = __importDefault(require("faker"));
/**
 * @name          classes
 * @namespace     node.mixin.ui.tooltip
 * @type               PostcssMixin
 * @interface     ./classes          interface
 * @platform      postcss
 * @status        beta
 *
 * Generate the tooltip classes
 *
 * @param       {('default')[]}                           [lnfs=['default']]         The style(s) you want to generate
 * @param       {'default'}                [defaultLnf='theme.ui.tooltip.defaultLnf']           The default style you want
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * @sugar.ui.tooltip.classes;
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiTooltipClassesInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnfs: {
                type: 'String[]',
                values: ['default'],
                default: ['default'],
            },
            defaultLnf: {
                type: 'String',
                values: ['default'],
                default: s_theme_1.default.get('ui.tooltip.defaultLnf'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf'],
                default: ['bare', 'lnf'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiTooltipClassesInterface;
function default_1({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ lnfs: [], defaultLnf: 'default', scope: [] }, params);
    const vars = new CssVars();
    vars.comment(() => `
      /**
        * @name          Tooltips
        * @namespace          sugar.style.ui
        * @type               Styleguide
        * @menu           Styleguide / UI        /styleguide/ui/tooltip
        * @platform       css
        * @status       beta
        * 
        * These classes allows you display nice tooltips on any HTMLElement
        * 
        * @support          chromium
        * @support          firefox
        * @support          safari
        * @support          edge
        * 
        * @install          css
        * \\@sugar.ui.tooltip.classes;
        * 
        * .my-tooltip {
        *   \@sugar.ui.tooltip;
        * }
        * 
        * @cssClass             s-tooltip-container             Allows to hide and show your tooltip on hover (focus)
        * @cssClass             s-tooltip-container:active     Allow to display a tooltip without having the need of the user interaction
        * @cssClass             s-tooltip                       Apply on the element you want as a tooltip
        ${finalParams.lnfs
        .map((lnf) => {
        return ` * @cssClass     s-tooltip${lnf === finalParams.defaultLnf ? '' : `:${lnf}`}           Apply the ${lnf} tooltip lnf`;
    })
        .join('\n')}
        * @cssClass             s-tooltip:top                 Align your tooltip at "top". This is the default. Only then not using the "s-floating" feature       
        * @cssClass             s-tooltip:right               Align your tooltip at "right". Only then not using the "s-floating" feature
        * @cssClass             s-tooltip:left               Align your tooltip at "left". Only then not using the "s-floating" feature
        * @cssClass             s-tooltip:bottom               Align your tooltip at "bottom". Only then not using the "s-floating" feature
        * @cssClass             s-tooltip:interactive          Allow the user to interact with the tooltip. Only then not using the "s-floating" feature
        * 
        ${finalParams.lnfs.map((lnf) => {
        return ` * @example        html       ${lnf}
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-mie:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${finalParams.defaultLnf === lnf ? '' : `:${lnf}`} s-color:accent" s-floating>
                *           ${faker_1.default.name.title()} ${faker_1.default.name.findName()}
                *       </div>
                *   </span>
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-mie:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${finalParams.defaultLnf === lnf ? '' : `:${lnf}`} s-color:complementary" s-floating>
                *           ${faker_1.default.name.title()} ${faker_1.default.name.findName()}
                *       </div>
                *   </span>
                *   <span class="s-tooltip-container">
                *       <a class="s-btn s-mie:20">Hover me!</a>
                *       <div class="s-white-space:nowrap s-tooltip${finalParams.defaultLnf === lnf ? '' : `:${lnf}`} s-color:info" s-floating>
                *           ${faker_1.default.name.title()} ${faker_1.default.name.findName()}
                *       </div>
                *   </span>
            `;
    })}
        * 
        * @example      html        Positions (no s-floating feature)
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">Block start (default)</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:accent">
        *           ${faker_1.default.name.title()} ${faker_1.default.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">Inline end</a>
        *       <div class="s-tooltip:right s-white-space:nowrap s-color:accent">
        *           ${faker_1.default.name.title()} ${faker_1.default.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">Block end</a>
        *       <div class="s-tooltip:bottom s-white-space:nowrap s-color:accent">
        *           ${faker_1.default.name.title()} ${faker_1.default.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">Inline start</a>
        *       <div class="s-tooltip:left s-white-space:nowrap s-color:accent">
        *           ${faker_1.default.name.title()} ${faker_1.default.name.findName()}
        *       </div>
        *   </span>
        * 
        * @example      html        Colors (none-exhaustive)
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">Accent</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:accent" s-floating>
        *           ${faker_1.default.name.title()} ${faker_1.default.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">Complementary</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:complementary" s-floating>
        *           ${faker_1.default.name.title()} ${faker_1.default.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">Error</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:error" s-floating>
        *           ${faker_1.default.name.title()} ${faker_1.default.name.findName()}
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">Info</a>
        *       <div class="s-tooltip s-white-space:nowrap s-color:info" s-floating>
        *           ${faker_1.default.name.title()} ${faker_1.default.name.findName()}
        *       </div>
        *   </span>
        * 
        * @example      html        Interactive
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">I'm not interactive</a>
        *       <div class="s-tooltip s-white-space:nowrap">
        *           <a class="s-btn s-color:accent">Click me if you can!</a>
        *       </div>
        *   </span>
        *   <span class="s-tooltip-container">
        *       <a class="s-btn s-mie:20">I'm interactive</a>
        *       <div class="s-tooltip:interactive s-white-space:nowrap">
        *           <a class="s-btn s-color:accent">Click me because you can!</a>
        *       </div>
        *   </span>
        * 
        * @since      2.0.0
        * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */
    `);
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
            * @name           s-toolip-container
            * @namespace          sugar.style.ui.tooltip
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
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */`);
        vars.code(() => `
            .s-tooltip-container {
                position: relative;
                display: inline-block;

                & > .s-tooltip {
                    opacity: 0;
                }

                &:focus,
                &:focus-within,
                &:hover {
                    & > .s-tooltip--interactive {
                        pointer-events: all;
                        opacity: 1;
                    }
                }

                &:not(:focus):not(:focus-within):not(:hover) {
                    & > .s-tooltip {
                        
                    }
                }

                &:focus > .s-tooltip,
                &:focus-within > .s-tooltip,
                .s-tooltip:focus,
                &:hover > .s-tooltip {
                    opacity: 1;
                }
            }
        `, { type: 'CssClass' });
        vars.comment(() => `/**
            * @name           s-toolip-container:active
            * @namespace          sugar.style.ui.tooltip
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
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */`);
        // no need to write a class here cause this is handled in the tooltip.ts file directly...
    }
    if (finalParams.scope.includes('bare')) {
        vars.comment(() => `/**
            * @name           s-tooltip
            * @namespace          sugar.style.ui.tooltip
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
            * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            */`);
        vars.code(() => `
            .s-tooltip {
                @sugar.ui.tooltip($scope: bare);
            }
        `, { type: 'CssClass' });
    }
    if (finalParams.scope.includes('lnf')) {
        finalParams.lnfs.forEach((lnf) => {
            vars.comment(() => `/**
                * @name           s-tooltip${finalParams.defaultLnf === lnf ? '' : `:${lnf}`}
                * @namespace          sugar.style.ui.tooltip
                * @type           CssClass
                * 
                * This class represent a ${lnf} tooltip
                * 
                * @example        html
                * <a class="s-tooltip-container s-btn">
                *   I'm a cool button
                *   <div class="s-tooltip${finalParams.defaultLnf === lnf ? '' : `:${lnf}`}">Something cool</div>
                * </a>
                * 
                * @since    2.0.0
                * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                */`);
            vars.code(() => `
                .s-tooltip${finalParams.defaultLnf === lnf ? '' : `--${lnf}`}:not(.s-bare) {
                    @sugar.ui.tooltip($lnf: ${lnf}, $scope: lnf);
                }
            `, { type: 'CssClass' });
        });
    }
    // Interactive
    vars.comment(() => `/**
        * @name           s-tooltip--interactive
        * @namespace          sugar.style.ui.tooltip
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
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
    vars.code(() => `
        .s-tooltip--interactive {
            @sugar.ui.tooltip($interactive: true, $scope: 'interactive');
        }
    `, { type: 'CssClass' });
    // TOP
    vars.comment(() => `/**
        * @name           s-tooltip
        * @namespace          sugar.style.ui.tooltip
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
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
    vars.code(() => `
        .s-tooltip[placement="top"],
        .s-tooltip {
            @sugar.ui.tooltip($position: top, $scope: position);
        }
    `, { type: 'CssClass' });
    // RIGHT
    vars.comment(() => `/**
        * @name           s-tooltip:right
        * @namespace          sugar.style.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple inline end (right) tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip:right">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
    vars.code(() => `
        .s-tooltip[placement="right"],
        .s-tooltip--right {
            @sugar.ui.tooltip($position: right, $scope: position);
        }
    `, { type: 'CssClass' });
    // left
    vars.comment(() => `/**
        * @name           s-tooltip:left
        * @namespace          sugar.style.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple left tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip:left">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
    vars.code(() => `
        .s-tooltip[placement="left"],
        .s-tooltip--left {
            @sugar.ui.tooltip($position: left, $scope: position);
        }
    `, { type: 'CssClass' });
    // BOTTOM
    vars.comment(() => `/**
        * @name           s-tooltip:bottom
        * @namespace          sugar.style.ui.tooltip
        * @type           CssClass
        * 
        * This class represent a simple block end (bottom) tooltip
        * 
        * @example        html
        * <a class="s-tooltip-container s-btn">
        *   I'm a cool button
        *   <div class="s-tooltip:bottom">Something cool</div>
        * </a>
        * 
        * @since    2.0.0
        * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
        */`);
    vars.code(() => `
        .s-tooltip[placement="bottom"],
        .s-tooltip--bottom {
            @sugar.ui.tooltip($position: bottom, $scope: position);
        }
    `, { type: 'CssClass' });
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msa0RBQTRCO0FBRTVCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sMkNBQTRDLFNBQVEscUJBQVk7SUFDbEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNuQixPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7YUFDdkI7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO2dCQUNuQixPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDakQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVF1RCxnRUFBUztBQUVqRSxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxFQUFFLEVBQ1IsVUFBVSxFQUFFLFNBQVMsRUFDckIsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLElBQUksT0FBTyxFQUFFLENBQUM7SUFFM0IsSUFBSSxDQUFDLE9B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