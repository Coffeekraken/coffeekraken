"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          tooltip
 * @as              @s.ui.tooltip
 * @namespace     node.mixin.ui.tooltip
 * @type               PostcssMixin
 * @interface     ./tooltip          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the tooltip style to any element
 *
 * @param       {'solid'}                           [style='theme.ui.tooltip.defaultLnf']         The style you want to generate
 * @param       {'top'|'right'|'bottom'|'left'}            [position='theme.ui.tooltip.defaultPosition']         The position you want to generate
 * @param      {Boolean}                                [interactive=false]                 Specify if the tooltip is interactive or not
 * @return      {String}            The generated css
 *
 * @scope       bare                Structural css
 * @scope       lnf                 Look and feel css
 * @scope       position            Positioning css
 *
 * @snippet         @s.ui.tooltip
 *
 * @example     css
 * .my-tooltip {
 *    @s.ui.tooltip;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiTooltipInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: s_theme_1.default.current.get('ui.tooltip.defaultLnf'),
            },
            position: {
                type: 'String',
                values: ['top', 'right', 'bottom', 'left'],
                default: s_theme_1.default.current.get('ui.tooltip.defaultPosition'),
            },
            interactive: {
                type: 'Boolean',
                default: false,
            },
        };
    }
}
exports.interface = SSugarcssPluginUiTooltipInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'solid', position: 'top', interactive: false }, params);
    const vars = [];
    vars.push(`
        @s.scope 'bare' {
            font-size: s.scalable(1rem);
            position: absolute;
            z-index: 50;
            display: block;
            max-width: 9999999px !important;
            pointer-events: none;
            white-space: nowrap;

            &:before {
                content: '' !important;
                position: absolute;
                background: rgba(0,0,0,0);
            }
        }
      `);
    vars.push(`
        .s-tooltip-container-active > & {
            opacity: 1;
        }
    `);
    if (finalParams.interactive) {
        vars.push(`
                @s.scope 'interactive' {
                    &:not(.s-tooltip-container > .s-tooltip),
                    .s-tooltip-container-active > &,
                    .s-tooltip-container:focus > &,
                    .s-tooltip-container:focus-within > &,
                    .s-tooltip-container &:focus,
                    .s-tooltip-container:hover > & {
                        pointer-events: all;
                    }
                }
            `);
    }
    // if (finalParams.scope.indexOf('lnf') !== -1) {
    vars.push(`
        @s.scope 'lnf' {
            background-color: s.color(current);
            color: s.color(current, foreground);
            transition: s.theme(ui.tooltip.transition);
            transition-property: opacity;
            padding-inline: s.padding(ui.tooltip.paddingInline);
            padding-block: s.padding(ui.tooltip.paddingBlock);
            @s.border.radius(ui.tooltip.borderRadius);
            @s.depth(ui.tooltip.depth);

            &:not([s-floating]) {
                &:after {
                    content: " ";
                    position: absolute;
                    border-style: default;
                    border-color: s.color(current) transparent transparent transparent;
                }
            }

        }
      `);
    // }
    // not s-floating tooltips
    vars.push(`@s.scope 'position' {`);
    vars.push(`&:not([s-floating]) {`);
    switch (finalParams.position) {
        // RIGHT
        case 'right':
            vars.push(`  
                top: 50%;
                left: calc(100% + s.theme(ui.tooltip.arrowSize));
                right: auto;    
                bottom: auto;
                transform: translateY(-50%);

                &:after {
                    top: 50%;
                    left: auto;
                    right: 100%;
                    bottom: auto;
                    margin-top: calc(s.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(s.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(90deg);
                }
            `);
            break;
        // LEFT
        case 'left':
            vars.push(`  
                top: 50%;
                right: calc(100% + s.theme(ui.tooltip.arrowSize));
                left: auto;    
                bottom: auto;
                transform: translateY(-50%);

                &:after {
                    top: 50%;
                    right: auto;
                    left: calc(100% + s.theme(ui.tooltip.arrowSize) / 2 - 1px);
                    bottom: auto;
                    margin-top: calc(s.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(s.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(-90deg);
                }
            `);
            break;
        case 'bottom':
            vars.push(`  
                bottom: auto;
                right: auto;
                left: 50%;
                top: calc(100% + s.theme(ui.tooltip.arrowSize));
                transform: translateX(-50%);

                &:after {
                    bottom: 100%;
                    top: auto;
                    left: 50%;
                    right: auto;
                    margin-left: calc(s.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(s.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(180deg);
                }
            `);
            break;
        case 'top':
        default:
            vars.push(`  
                bottom: calc(100% + s.theme(ui.tooltip.arrowSize));
                left: 50%;
                transform: translateX(-50%);

                &:after {
                    top: 100%;
                    left: 50%;
                    margin-left: calc(s.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(s.theme(ui.tooltip.arrowSize) / 2);
                }
            `);
            break;
    }
    vars.push('}');
    switch (finalParams.position) {
        // RIGHT
        case 'right':
            vars.push(`  
                &:before {
                  height: 100%;
                  width: s.theme(ui.tooltip.arrowSize);
                  right: 100%;
                  left: auto;
                  bottom: auto;
                  top: 0;
                }
            `);
            break;
        // LEFT
        case 'left':
            vars.push(`  
                &:before {
                  height: 100%;
                  width: s.theme(ui.tooltip.arrowSize);
                  left: 100%;
                  right: auto;
                  bottom: auto;
                  top: 0;
                }
            `);
            break;
        case 'bottom':
            vars.push(`  
                &:before {
                  width: 100%;
                  height: s.theme(ui.tooltip.arrowSize);
                  bottom: 100%;
                  top: auto;
                  left: 0;
                }
            `);
            break;
        case 'top':
        default:
            vars.push(`  
                &:before {
                  width: 100%;
                  height: s.theme(ui.tooltip.arrowSize);
                  top: 100%;
                  left: 0;
                }
            `);
            break;
    }
    vars.push('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBRUgsTUFBTSxpQ0FBa0MsU0FBUSxxQkFBWTtJQUN4RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQzthQUN6RDtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQzFDLE9BQU8sRUFBRSxpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUM7YUFDOUQ7WUFDRCxXQUFXLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEtBQUs7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUTZDLHNEQUFTO0FBQ3ZELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixHQUFHLEVBQUUsT0FBTyxFQUNaLFFBQVEsRUFBRSxLQUFLLEVBQ2YsV0FBVyxFQUFFLEtBQUssSUFDZixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JQLENBQUMsQ0FBQztJQUVMLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUU7UUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7YUFXTCxDQUFDLENBQUM7S0FDVjtJQUVELGlEQUFpRDtJQUNqRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQlAsQ0FBQyxDQUFDO0lBQ0wsSUFBSTtJQUVKLDBCQUEwQjtJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFFbkMsSUFBSSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBRW5DLFFBQVEsV0FBVyxDQUFDLFFBQVEsRUFBRTtRQUMxQixRQUFRO1FBQ1IsS0FBSyxPQUFPO1lBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OzthQWdCVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1YsT0FBTztRQUNQLEtBQUssTUFBTTtZQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7YUFnQlQsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUNWLEtBQUssUUFBUTtZQUNULElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7YUFnQlQsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUNWLEtBQUssS0FBSyxDQUFDO1FBQ1g7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7OzthQVdULENBQUMsQ0FBQztZQUNILE1BQU07S0FDYjtJQUVELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixRQUFRLFdBQVcsQ0FBQyxRQUFRLEVBQUU7UUFDMUIsUUFBUTtRQUNSLEtBQUssT0FBTztZQUNSLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7OzthQVNULENBQUMsQ0FBQztZQUNILE1BQU07UUFDVixPQUFPO1FBQ1AsS0FBSyxNQUFNO1lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7O2FBU1QsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUNWLEtBQUssUUFBUTtZQUNULElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7O2FBUVQsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUNWLEtBQUssS0FBSyxDQUFDO1FBQ1g7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O2FBT1QsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtLQUNiO0lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUE3TkQsNEJBNk5DIn0=