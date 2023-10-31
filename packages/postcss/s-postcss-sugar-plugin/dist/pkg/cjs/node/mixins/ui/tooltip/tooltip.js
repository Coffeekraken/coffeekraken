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
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
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
class postcssSugarPluginUiTooltipInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: s_theme_1.default.get('ui.tooltip.defaultLnf'),
            },
            position: {
                type: 'String',
                values: ['top', 'right', 'bottom', 'left'],
                default: s_theme_1.default.get('ui.tooltip.defaultPosition'),
            },
            interactive: {
                type: 'Boolean',
                default: false,
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'position', 'interactive'],
                default: ['bare', 'lnf', 'position', 'interactive'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiTooltipInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'solid', position: 'top', interactive: false, scope: ['bare', 'lnf', 'position', 'interactive'] }, params);
    const vars = [];
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
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
      `);
    }
    vars.push(`
        .s-tooltip-container-active > & {
            opacity: 1;
        }
    `);
    if (finalParams.scope.indexOf('interactive') !== -1) {
        if (finalParams.interactive) {
            vars.push(`
                &:not(.s-tooltip-container > .s-tooltip),
                .s-tooltip-container-active > &,
                .s-tooltip-container:focus > &,
                .s-tooltip-container:focus-within > &,
                .s-tooltip-container &:focus,
                .s-tooltip-container:hover > & {
                    pointer-events: all;
                }
            `);
        }
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
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
      `);
    }
    // not s-floating tooltips
    vars.push(`&:not([s-floating]) {`);
    if (finalParams.scope.indexOf('position') !== -1) {
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
    }
    // not s-floating tooltips
    vars.push(`}`);
    if (finalParams.scope.indexOf('position') !== -1) {
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
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBRUgsTUFBTSxvQ0FBcUMsU0FBUSxxQkFBWTtJQUMzRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ2pEO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztnQkFDMUMsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDO2FBQ3REO1lBQ0QsV0FBVyxFQUFFO2dCQUNULElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDO2dCQUNsRCxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUM7YUFDdEQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBU2dELHlEQUFTO0FBQzFELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixH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