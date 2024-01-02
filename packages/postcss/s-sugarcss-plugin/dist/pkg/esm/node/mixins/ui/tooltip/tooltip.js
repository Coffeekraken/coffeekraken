import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
class SSugarcssPluginUiTooltipInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: __STheme.current.get('ui.tooltip.defaultLnf'),
            },
            position: {
                type: 'String',
                values: ['top', 'right', 'bottom', 'left'],
                default: __STheme.current.get('ui.tooltip.defaultPosition'),
            },
            interactive: {
                type: 'Boolean',
                default: false,
            },
        };
    }
}
export { SSugarcssPluginUiTooltipInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUVILE1BQU0saUNBQWtDLFNBQVEsWUFBWTtJQUN4RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ3pEO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztnQkFDMUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixDQUFDO2FBQzlEO1lBQ0QsV0FBVyxFQUFFO2dCQUNULElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVFELE9BQU8sRUFBRSxpQ0FBaUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUMxRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEdBQUcsRUFBRSxPQUFPLEVBQ1osUUFBUSxFQUFFLEtBQUssRUFDZixXQUFXLEVBQUUsS0FBSyxJQUNmLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQlAsQ0FBQyxDQUFDO0lBRUwsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztLQUlULENBQUMsQ0FBQztJQUVILElBQUksV0FBVyxDQUFDLFdBQVcsRUFBRTtRQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7OzthQVdMLENBQUMsQ0FBQztLQUNWO0lBRUQsaURBQWlEO0lBQ2pELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCUCxDQUFDLENBQUM7SUFDTCxJQUFJO0lBRUosMEJBQTBCO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUVuQyxJQUFJLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFFbkMsUUFBUSxXQUFXLENBQUMsUUFBUSxFQUFFO1FBQzFCLFFBQVE7UUFDUixLQUFLLE9BQU87WUFDUixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O2FBZ0JULENBQUMsQ0FBQztZQUNILE1BQU07UUFDVixPQUFPO1FBQ1AsS0FBSyxNQUFNO1lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OzthQWdCVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1YsS0FBSyxRQUFRO1lBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7OzthQWdCVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1YsS0FBSyxLQUFLLENBQUM7UUFDWDtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7O2FBV1QsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtLQUNiO0lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLFFBQVEsV0FBVyxDQUFDLFFBQVEsRUFBRTtRQUMxQixRQUFRO1FBQ1IsS0FBSyxPQUFPO1lBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7O2FBU1QsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUNWLE9BQU87UUFDUCxLQUFLLE1BQU07WUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7YUFTVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1YsS0FBSyxRQUFRO1lBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7YUFRVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1YsS0FBSyxLQUFLLENBQUM7UUFDWDtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7YUFPVCxDQUFDLENBQUM7WUFDSCxNQUFNO0tBQ2I7SUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9