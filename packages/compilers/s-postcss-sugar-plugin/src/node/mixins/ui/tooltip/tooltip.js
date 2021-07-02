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
            max-width: sugar.theme(ui.tooltip.maxWidth);
            text-align: center;
        }
      `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
        @sugar.scope.lnf {
            background-color: sugar.color(ui, surface);
            border-radius: sugar.theme(ui.tooltip.borderRadius);
            transition: sugar.theme(ui.tooltip.transition);
            padding: sugar.theme(ui.tooltip.padding);
            @sugar.depth( sugar.theme(ui.tooltip.depth) );

            &:after {
                content: " ";
                position: absolute;
                border-style: solid;
                border-color: sugar.color(ui, surface) transparent transparent transparent;
            }
            &:before {
              content: '';
              position: absolute;
              background: rgba(0,0,0,0);
            }
        }
      `);
    }
    if (finalParams.scope.indexOf('position') !== -1) {
        switch (finalParams.position) {
            case 'top':
                vars.push(`  
                bottom: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                left: 50%;
                transform: translateX(-50%);

                &:after {
                    top: 100%;
                    left: 50%;
                    margin-left: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                }
                &:before {
                  width: 100%;
                  height: sugar.theme(ui.tooltip.arrowSize);
                  top: 100%;
                  left: 0;
                }
            `);
                break;
            case 'top-left':
                vars.push(`  
                bottom: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                left: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                transform: translateX(-50%);

                &:after {
                    top: 100%;
                    left: 50%;
                    margin-left: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                }
                &:before {
                  width: 100%;
                  height: sugar.theme(ui.tooltip.arrowSize);
                  top: 100%;
                  left: 0;
                }
            `);
                break;
            case 'top-right':
                vars.push(`  
                bottom: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                right: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                left: auto;
                transform: translateX(50%);

                &:after {
                    top: 100%;
                    left: 50%;
                    margin-left: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                }
                &:before {
                  width: 100%;
                  height: sugar.theme(ui.tooltip.arrowSize);
                  top: 100%;
                  left: 0;
                }
            `);
                break;
            // case 'top-left-right':
            //   vars.push(`  
            //       top: auto;
            //       right: auto;
            //       bottom: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //       left: 50%;
            //       transform: none;
            //       margin-left: calc(sugar.theme(ui.tooltip.arrowSize) * -1);
            //       &:after {
            //           top: 100%;
            //           left: 0;
            //           right: auto;
            //           bottom: auto;
            //           margin-left: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //           border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //       }
            //   `);
            // break;
            // case 'top-right-left':
            //   vars.push(`  
            //       top: auto;
            //       left: auto;
            //       bottom: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //       right: 50%;
            //       margin-right: calc(sugar.theme(ui.tooltip.arrowSize) * -1);
            //       margin-left: auto;
            //       transform: none;
            //       &:after {
            //           top: 100%;
            //           right: 0;
            //           left: auto;
            //           bottom: auto;
            //           margin-right: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //           border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //       }
            //   `);
            // break;
            // case 'right':
            //   vars.push(`  
            //       bottom: auto;
            //       right: auto;
            //       left: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //       top: 50%;
            //       transform: translateY(-50%);
            //       &:after {
            //           top: 50%;
            //           right: 100%;
            //           left: auto;
            //           bottom: auto;
            //           margin-top: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
            //           border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //           transform: rotate(90deg);
            //           margin-left: 0;
            //       }
            //   `);
            // break;
            // case 'right-top':
            //   vars.push(`  
            //       bottom: auto;
            //       right: auto;
            //       left: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //       top: 0;
            //       transform: none;
            //       &:after {
            //           top: sugar.theme(ui.tooltip.arrowSize);
            //           right: 100%;
            //           bottom: auto;
            //           left: auto;
            //           margin-top: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
            //           border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //           transform: rotate(90deg);
            //           margin-left: 0;
            //       }
            //   `);
            // break;
            // case 'right-bottom':
            //   vars.push(`  
            //       top: auto;
            //       right: auto;
            //       left: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //       bottom: 0;
            //       transform: none;
            //       &:after {
            //           bottom: sugar.theme(ui.tooltip.arrowSize);
            //           right: 100%;
            //           top: auto;
            //           left: auto;
            //           margin-bottom: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
            //           border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
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
                top: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                transform: translateX(-50%);

                &:after {
                    bottom: 100%;
                    top: auto;
                    left: 50%;
                    right: auto;
                    margin-left: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(180deg);
                }
                &:before {
                  width: 100%;
                  height: sugar.theme(ui.tooltip.arrowSize);
                  bottom: 100%;
                  top: auto;
                  left: 0;
                }
            `);
                break;
            case 'bottom-left':
                vars.push(` 
                bottom: auto;
                right: auto;
                left: 0;
                top: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                transform: translate(0,0);

                &:after {
                    bottom: 100%;
                    top: auto;
                    left: 50%;
                    right: auto;
                    margin-left: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(180deg);
                }
                &:before {
                  width: 100%;
                  height: sugar.theme(ui.tooltip.arrowSize);
                  bottom: 100%;
                  top: auto;
                  left: 0;
                }
            `);
                break;
            case 'bottom-right':
                vars.push(`  
                bottom: auto;
                left: auto;
                right: 0;
                top: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                transform: translate(0,0);

                &:after {
                    bottom: 100%;
                    top: auto;
                    left: 50%;
                    right: auto;
                    margin-left: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(180deg);
                }
                &:before {
                  width: 100%;
                  height: sugar.theme(ui.tooltip.arrowSize);
                  bottom: 100%;
                  top: auto;
                  left: 0;
                }
            `);
                break;
            // case 'left':
            //   vars.push(` 
            //       bottom: auto;
            //       left: auto;
            //       right: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //       top: 50%;
            //       &:after {
            //           top: 50%;
            //           left: 100%;
            //           margin-top: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
            //           border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //           transform: rotate(-90deg);
            //           margin-left: 0;
            //       }
            //   `);
            // break;
            // case 'left-top':
            //   vars.push(`  
            //       bottom: auto;
            //       left: auto;
            //       right: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //       top: 0;
            //       transform: none;
            //       &:after {
            //           top: sugar.theme(ui.tooltip.arrowSize);
            //           left: 100%;
            //           bottom: auto;
            //           right: auto;
            //           margin-top: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
            //           border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //           transform: rotate(-90deg);
            //           margin-left: 0;
            //       }
            //   `);
            // break;
            // case 'left-bottom':
            //   vars.push(`  
            //       top: auto;
            //       left: auto;
            //       right: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //       bottom: 0;
            //       transform: none;
            //       &:after {
            //           bottom: sugar.theme(ui.tooltip.arrowSize);
            //           left: 100%;
            //           top: auto;
            //           right: auto;
            //           margin-bottom: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
            //           border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //           transform: rotate(-90deg);
            //           margin-left: 0;
            //       }
            //   `);
            // break;
            default:
                vars.push(`  
                top: auto;
                right: auto;
                bottom: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                left: 50%;
                transform: translateX(-50%);
            `);
                break;
        }
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFLckQsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZOztBQUN0RCwrQ0FBVSxHQUFHO0lBQ2xCLFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxXQUFXLEVBQUMsT0FBTyxFQUFDLFdBQVcsRUFBQyxjQUFjLEVBQUMsUUFBUSxFQUFDLGFBQWEsRUFBQyxjQUFjLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxhQUFhLENBQUM7UUFDL0ksT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxDQUFDO1FBQ2pDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxDQUFDO0tBQ25DO0NBQ0YsQ0FBQztBQVFKLE9BQU8sRUFBRSxvQ0FBb0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUM3RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLFFBQVEsRUFBRSxLQUFLLEVBQ2YsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLENBQUMsSUFDN0IsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7OztPQVFULENBQUMsQ0FBQTtLQUNMO0lBRUQs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