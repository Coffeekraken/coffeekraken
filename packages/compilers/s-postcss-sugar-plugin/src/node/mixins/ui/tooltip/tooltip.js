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
            z-index: 10;
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
                bottom: calc(100% + sugar.config(ui.tooltip.arrowSize));
                left: calc(sugar.config(ui.tooltip.arrowSize) / 2);
                transform: translateX(-50%);

                &:after {
                    top: 100%;
                    left: 50%;
                    margin-left: calc(sugar.config(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.config(ui.tooltip.arrowSize) / 2);
                }
            `);
                break;
            case 'top-right':
                vars.push(`  
                bottom: calc(100% + sugar.config(ui.tooltip.arrowSize));
                right: calc(sugar.config(ui.tooltip.arrowSize) / 2);
                left: auto;
                transform: translateX(50%);

                &:after {
                    top: 100%;
                    left: 50%;
                    margin-left: calc(sugar.config(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.config(ui.tooltip.arrowSize) / 2);
                }
            `);
                break;
            // case 'top-left-right':
            //   vars.push(`  
            //       top: auto;
            //       right: auto;
            //       bottom: calc(100% + sugar.config(ui.tooltip.arrowSize));
            //       left: 50%;
            //       transform: none;
            //       margin-left: calc(sugar.config(ui.tooltip.arrowSize) * -1);
            //       &:after {
            //           top: 100%;
            //           left: 0;
            //           right: auto;
            //           bottom: auto;
            //           margin-left: calc(sugar.config(ui.tooltip.arrowSize) / 2);
            //           border-width: calc(sugar.config(ui.tooltip.arrowSize) / 2);
            //       }
            //   `);
            // break;
            // case 'top-right-left':
            //   vars.push(`  
            //       top: auto;
            //       left: auto;
            //       bottom: calc(100% + sugar.config(ui.tooltip.arrowSize));
            //       right: 50%;
            //       margin-right: calc(sugar.config(ui.tooltip.arrowSize) * -1);
            //       margin-left: auto;
            //       transform: none;
            //       &:after {
            //           top: 100%;
            //           right: 0;
            //           left: auto;
            //           bottom: auto;
            //           margin-right: calc(sugar.config(ui.tooltip.arrowSize) / 2);
            //           border-width: calc(sugar.config(ui.tooltip.arrowSize) / 2);
            //       }
            //   `);
            // break;
            // case 'right':
            //   vars.push(`  
            //       bottom: auto;
            //       right: auto;
            //       left: calc(100% + sugar.config(ui.tooltip.arrowSize));
            //       top: 50%;
            //       transform: translateY(-50%);
            //       &:after {
            //           top: 50%;
            //           right: 100%;
            //           left: auto;
            //           bottom: auto;
            //           margin-top: calc(sugar.config(ui.tooltip.arrowSize) * -1 / 2);
            //           border-width: calc(sugar.config(ui.tooltip.arrowSize) / 2);
            //           transform: rotate(90deg);
            //           margin-left: 0;
            //       }
            //   `);
            // break;
            // case 'right-top':
            //   vars.push(`  
            //       bottom: auto;
            //       right: auto;
            //       left: calc(100% + sugar.config(ui.tooltip.arrowSize));
            //       top: 0;
            //       transform: none;
            //       &:after {
            //           top: sugar.config(ui.tooltip.arrowSize);
            //           right: 100%;
            //           bottom: auto;
            //           left: auto;
            //           margin-top: calc(sugar.config(ui.tooltip.arrowSize) * -1 / 2);
            //           border-width: calc(sugar.config(ui.tooltip.arrowSize) / 2);
            //           transform: rotate(90deg);
            //           margin-left: 0;
            //       }
            //   `);
            // break;
            // case 'right-bottom':
            //   vars.push(`  
            //       top: auto;
            //       right: auto;
            //       left: calc(100% + sugar.config(ui.tooltip.arrowSize));
            //       bottom: 0;
            //       transform: none;
            //       &:after {
            //           bottom: sugar.config(ui.tooltip.arrowSize);
            //           right: 100%;
            //           top: auto;
            //           left: auto;
            //           margin-bottom: calc(sugar.config(ui.tooltip.arrowSize) * -1 / 2);
            //           border-width: calc(sugar.config(ui.tooltip.arrowSize) / 2);
            //           transform: rotate(90deg);
            //           margin-left: 0;
            //       }
            //   `);
            // break;
            case 'bottom':
                vars.push(`  
                bottom: auto;
                right: auto;
                left: 50%;
                top: calc(100% + sugar.config(ui.tooltip.arrowSize));
                transform: translateY(-50%);

                &:after {
                    bottom: 100%;
                    top: auto;
                    left: 50%;
                    right: auto;
                    margin-left: calc(sugar.config(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.config(ui.tooltip.arrowSize) / 2);
                    transform: rotate(180deg);
                }
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
            // case 'left':
            //   vars.push(` 
            //       bottom: auto;
            //       left: auto;
            //       right: calc(100% + sugar.config(ui.tooltip.arrowSize));
            //       top: 50%;
            //       &:after {
            //           top: 50%;
            //           left: 100%;
            //           margin-top: calc(sugar.config(ui.tooltip.arrowSize) * -1 / 2);
            //           border-width: calc(sugar.config(ui.tooltip.arrowSize) / 2);
            //           transform: rotate(-90deg);
            //           margin-left: 0;
            //       }
            //   `);
            // break;
            // case 'left-top':
            //   vars.push(`  
            //       bottom: auto;
            //       left: auto;
            //       right: calc(100% + sugar.config(ui.tooltip.arrowSize));
            //       top: 0;
            //       transform: none;
            //       &:after {
            //           top: sugar.config(ui.tooltip.arrowSize);
            //           left: 100%;
            //           bottom: auto;
            //           right: auto;
            //           margin-top: calc(sugar.config(ui.tooltip.arrowSize) * -1 / 2);
            //           border-width: calc(sugar.config(ui.tooltip.arrowSize) / 2);
            //           transform: rotate(-90deg);
            //           margin-left: 0;
            //       }
            //   `);
            // break;
            // case 'left-bottom':
            //   vars.push(`  
            //       top: auto;
            //       left: auto;
            //       right: calc(100% + sugar.config(ui.tooltip.arrowSize));
            //       bottom: 0;
            //       transform: none;
            //       &:after {
            //           bottom: sugar.config(ui.tooltip.arrowSize);
            //           left: 100%;
            //           top: auto;
            //           right: auto;
            //           margin-bottom: calc(sugar.config(ui.tooltip.arrowSize) * -1 / 2);
            //           border-width: calc(sugar.config(ui.tooltip.arrowSize) / 2);
            //           transform: rotate(-90deg);
            //           margin-left: 0;
            //       }
            //   `);
            // break;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFLckQsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZOztBQUN0RCwrQ0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxXQUFXLEVBQUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxjQUFjLEVBQUMsUUFBUSxFQUFDLGFBQWEsRUFBQyxjQUFjLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxhQUFhLENBQUM7UUFDL0ksT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxDQUFDO1FBQ2pDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxDQUFDO0tBQ25DO0NBQ0YsQ0FBQztBQVFKLE9BQU8sRUFBRSxvQ0FBb0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUM3RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLFFBQVEsRUFBRSxLQUFLLEVBQ2YsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLENBQUMsSUFDN0IsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7OztPQVFULENBQUMsQ0FBQTtLQUNMO0lBRUQs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