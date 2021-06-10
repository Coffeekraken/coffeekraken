import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiTooltipInterface extends __SInterface {
}
postcssSugarPluginUiTooltipInterface.definition = {
    position: {
        type: 'String',
        values: ['top', 'top-left', 'top-right', 'right', 'right-top', 'right-bottom', 'bottom', 'bottom-left', 'bottom-right', 'left', 'left-top', 'left-bottom'],
        default: 'top'
    },
    scope: {
        type: 'Array<String>',
        values: ['bare', 'lnf', 'position'],
        default: ['bare', 'lnf', 'position']
    }
};
export { postcssSugarPluginUiTooltipInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ position: 'top', scope: ['bare', 'lnf', 'position'] }, params);
    const vars = [];
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        @sugar.scope.bare {
            position: absolute;
            display: block;
            max-width: sugar.config(ui.tooltip.maxWidth);
            text-align: center;
        }
      `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
        @sugar.scope.lnf {
            background-color: sugar.color(ui, surface);
            color: sugar.color(ui, foreground);
            border-radius: sugar.config(ui.tooltip.borderRadius);
            transition: sugar.config(ui.tooltip.transition);
            padding: sugar.config(ui.tooltip.padding);
            @sugar.depth( sugar.config(ui.tooltip.depth) );

            &:after {
                content: " ";
                position: absolute;
                border-style: solid;
                border-color: sugar.color(ui, surface) transparent transparent transparent;
            }
        }
      `);
    }
    if (finalParams.scope.indexOf('position') !== -1) {
        switch (finalParams.position) {
            case 'top':
                vars.push(`  
                bottom: calc(100% + sugar.config(ui.tooltip.arrowSize));
                left: 50%;
                transform: translateX(-50%);

                &:after {
                    top: 100%;
                    left: 50%;
                    margin-left: calc(sugar.config(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.config(ui.tooltip.arrowSize) / 2);
                }
            `);
                break;
            case 'top-left':
                vars.push(`  
                top: auto;
                right: auto;
                bottom: calc(100% + sugar.config(ui.tooltip.arrowSize));
                left: 0;
            `);
                break;
            case 'top-right':
                vars.push(`  
                top: auto;
                left: auto;
                bottom: calc(100% + sugar.config(ui.tooltip.arrowSize));
                right: 0;
            `);
                break;
            case 'right':
                vars.push(`  
                bottom: auto;
                right: auto;
                left: calc(100% + sugar.config(ui.tooltip.arrowSize));
                top: 50%;
                transform: translateY(-50%);
            `);
                break;
            case 'right-top':
                vars.push(`  
                bottom: auto;
                right: auto;
                left: calc(100% + sugar.config(ui.tooltip.arrowSize));
                top: 0;
            `);
                break;
            case 'right-bottom':
                vars.push(`  
                top: auto;
                right: auto;
                left: calc(100% + sugar.config(ui.tooltip.arrowSize));
                bottom: 0;
            `);
                break;
            case 'bottom':
                vars.push(`  
                bottom: auto;
                right: auto;
                left: 50%;
                top: calc(100% + sugar.config(ui.tooltip.arrowSize));
                transform: translateY(-50%);
            `);
                break;
            case 'bottom-left':
                vars.push(` 
                bottom: auto;
                right: auto;
                left: 0;
                top: calc(100% + sugar.config(ui.tooltip.arrowSize));
            `);
                break;
            case 'bottom-right':
                vars.push(`  
                bottom: auto;
                left: auto;
                right: 0;
                top: calc(100% + sugar.config(ui.tooltip.arrowSize));
            `);
                break;
            case 'left':
                vars.push(` 
                bottom: auto;
                left: auto;
                right: calc(100% + sugar.config(ui.tooltip.arrowSize));
                top: 50%;

                &:after {
                    top: 50%;
                    left: 100%;
                    margin-top: calc(sugar.config(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.config(ui.tooltip.arrowSize) / 2);
                    transform: rotate(-90deg);
                    margin-left: 0;
                }
            `);
                break;
            case 'left-top':
                vars.push(`  
                bottom: auto;
                left: auto;
                right: calc(100% + sugar.config(ui.tooltip.arrowSize));
                top: 0;
                transform: none;

                &:after {
                    top: sugar.config(ui.tooltip.arrowSize);
                    left: 100%;
                    bottom: auto;
                    right: auto;
                    margin-top: calc(sugar.config(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.config(ui.tooltip.arrowSize) / 2);
                    transform: rotate(-90deg);
                    margin-left: 0;
                }
            `);
                break;
            case 'left-bottom':
                vars.push(`  
                top: auto;
                left: auto;
                right: calc(100% + sugar.config(ui.tooltip.arrowSize));
                bottom: 0;
                transform: none;

                &:after {
                    bottom: sugar.config(ui.tooltip.arrowSize);
                    left: 100%;
                    top: auto;
                    right: auto;
                    margin-bottom: calc(sugar.config(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.config(ui.tooltip.arrowSize) / 2);
                    transform: rotate(-90deg);
                    margin-left: 0;
                }
            `);
                break;
            default:
                vars.push(`  
                top: auto;
                right: auto;
                bottom: calc(100% + sugar.config(ui.tooltip.arrowSize));
                left: 50%;
                transform: translateX(-50%);
            `);
                break;
        }
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFLckQsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZOztBQUN0RCwrQ0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxXQUFXLEVBQUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxjQUFjLEVBQUMsUUFBUSxFQUFDLGFBQWEsRUFBQyxjQUFjLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxhQUFhLENBQUM7UUFDL0ksT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxDQUFDO1FBQ2pDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxDQUFDO0tBQ25DO0NBQ0YsQ0FBQztBQVFKLE9BQU8sRUFBRSxvQ0FBb0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUM3RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLFFBQVEsRUFBRSxLQUFLLEVBQ2YsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLENBQUMsSUFDN0IsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O09BT1QsQ0FBQyxDQUFBO0tBQ0w7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQlQsQ0FBQyxDQUFBO0tBQ0w7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzlDLFFBQU8sV0FBVyxDQUFDLFFBQVEsRUFBRTtZQUN6QixLQUFLLEtBQUs7Z0JBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7YUFXVCxDQUFDLENBQUM7Z0JBQ0wsTUFBTTtZQUNOLEtBQUssVUFBVTtnQkFDYixJQUFJLENBQUMsSUFBSSxDQUFDOzs7OzthQUtULENBQUMsQ0FBQztnQkFDTCxNQUFNO1lBQ04sS0FBSyxXQUFXO2dCQUNkLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O2FBS1QsQ0FBQyxDQUFDO2dCQUNMLE1BQU07WUFDTixLQUFLLE9BQU87Z0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O2FBTVQsQ0FBQyxDQUFDO2dCQUNMLE1BQU07WUFDTixLQUFLLFdBQVc7Z0JBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7YUFLVCxDQUFDLENBQUM7Z0JBQ0wsTUFBTTtZQUNOLEtBQUssY0FBYztnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7YUFLVCxDQUFDLENBQUM7Z0JBQ0wsTUFBTTtZQUNOLEtBQUssUUFBUTtnQkFDWCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7YUFNVCxDQUFDLENBQUM7Z0JBQ0wsTUFBTTtZQUNOLEtBQUssYUFBYTtnQkFDaEIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7YUFLVCxDQUFDLENBQUM7Z0JBQ0wsTUFBTTtZQUNOLEtBQUssY0FBYztnQkFDakIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7YUFLVCxDQUFDLENBQUM7Z0JBQ0wsTUFBTTtZQUNOLEtBQUssTUFBTTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7OzthQWNULENBQUMsQ0FBQztnQkFDTCxNQUFNO1lBQ04sS0FBSyxVQUFVO2dCQUNiLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBaUJULENBQUMsQ0FBQztnQkFDTCxNQUFNO1lBQ04sS0FBSyxhQUFhO2dCQUNoQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OzthQWlCVCxDQUFDLENBQUM7Z0JBQ0wsTUFBTTtZQUNOO2dCQUNFLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OzthQU1ULENBQUMsQ0FBQztnQkFDTCxNQUFNO1NBQ1Q7S0FDSjtJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=