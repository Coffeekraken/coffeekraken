import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiTooltipInterface extends __SInterface {
}
postcssSugarPluginUiTooltipInterface.definition = {
    position: {
        type: 'String',
        values: [
            'top',
            'top-left',
            'top-right',
            'right',
            'right-top',
            'right-bottom',
            'bottom',
            'bottom-left',
            'bottom-right',
            'left',
            'left-top',
            'left-bottom',
            'left-bottom-bottom',
            'left-bottom-top',
            'left-center-top',
            'left-top-top',
            'right-bottom-bottom',
            'right-bottom-top',
            'right-center-top',
            'right-top-top',
        ],
        default: 'top',
    },
    scope: {
        type: 'Array<String>',
        values: ['bare', 'lnf', 'position'],
        default: ['bare', 'lnf', 'position'],
    },
};
export { postcssSugarPluginUiTooltipInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ position: 'top', scope: ['bare', 'lnf', 'position'] }, params);
    const vars = [];
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
          position: absolute;
          z-index: 500;
          display: block;
          max-width: sugar.theme(ui.tooltip.maxWidth);
          text-align: center;
      `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
          background-color: sugar.color(ui, surface);
          color: sugar.color(ui, surfaceForeground);
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
            // RIGHT
            case 'right':
                vars.push(`  
                top: 50%;
                left: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                right: auto;    
                bottom: auto;
                transform: translateY(-50%);

                &:after {
                    top: 50%;
                    left: auto;
                    right: 100%;
                    bottom: auto;
                    margin-top: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(90deg);
                }
                &:before {
                  height: 100%;
                  width: sugar.theme(ui.tooltip.arrowSize);
                  right: 100%;
                  left: auto;
                  bottom: auto;
                  top: 0;
                }
            `);
                break;
            case 'right-top':
                vars.push(`  
                top: 0;
                left: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                right: auto;    
                bottom: auto;
                transform: translateY(-50%);

                &:after {
                    top: 50%;
                    left: auto;
                    right: 100%;
                    bottom: auto;
                    margin-top: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(90deg);
                }
                &:before {
                  height: 100%;
                  width: sugar.theme(ui.tooltip.arrowSize);
                  right: 100%;
                  left: auto;
                  bottom: auto;
                  top: 0;
                }
            `);
                break;
            case 'right-top-top':
                vars.push(`  
                top: 0;
                left: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                right: auto;    
                bottom: auto;
                transform: none;

                &:after {
                    top: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    left: auto;
                    right: calc(100% - 0.5px);
                    bottom: auto;
                    margin-top: 0;
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(90deg);
                }
                &:before {
                  height: 100%;
                  width: sugar.theme(ui.tooltip.arrowSize);
                  right: 100%;
                  left: auto;
                  bottom: auto;
                  top: 0;
                }
            `);
                break;
            case 'right-center-top':
                vars.push(`  
                top: 50%;
                left: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                right: auto;    
                bottom: auto;
                transform: translateY(calc(sugar.theme(ui.tooltip.arrowSize) * -1));

                &:after {
                    top: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    left: auto;
                    right: calc(100% - 0.5px);
                    bottom: auto;
                    margin-top: 0;
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(90deg);
                }
                &:before {
                  height: 100%;
                  width: sugar.theme(ui.tooltip.arrowSize);
                  right: 100%;
                  left: auto;
                  bottom: auto;
                  top: 0;
                }
            `);
                break;
            case 'right-bottom-top':
                vars.push(`  
                top: calc(100% - sugar.theme(ui.tooltip.arrowSize) / 2);
                left: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                right: auto;    
                bottom: auto;
                transform: translateY(calc(sugar.theme(ui.tooltip.arrowSize) * -1));

                &:after {
                    top: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    left: auto;
                    right: calc(100% - 0.5px);
                    bottom: auto;
                    margin-top: 0;
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(90deg);
                }
                &:before {
                  height: 100%;
                  width: sugar.theme(ui.tooltip.arrowSize);
                  right: 100%;
                  left: auto;
                  bottom: auto;
                  top: 0;
                }
            `);
                break;
            case 'right-bottom':
                vars.push(`  
                top: auto;
                left: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                right: auto;    
                bottom: 0;
                transform: translateY(50%);

                &:after {
                    top: 50%;
                    left: auto;
                    right: 100%;
                    bottom: auto;
                    margin-top: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(90deg);
                }
                &:before {
                  height: 100%;
                  width: sugar.theme(ui.tooltip.arrowSize);
                  right: 100%;
                  left: auto;
                  bottom: auto;
                  top: 0;
                }
            `);
                break;
            case 'right-bottom-bottom':
                vars.push(`  
                bottom: 0;
                left: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                right: auto;    
                top: auto;
                transform: none;

                &:after {
                    top: calc(100% - sugar.theme(ui.tooltip.arrowSize) * 1.5);
                    left: auto;
                    right: calc(100% - 1px);
                    bottom: auto;
                    margin-top: 0;
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(90deg);
                }
                &:before {
                  height: 100%;
                  width: sugar.theme(ui.tooltip.arrowSize);
                  left: 100%;
                  right: auto;
                  bottom: auto;
                  top: 0;
                }
            `);
                break;
            // LEFT
            case 'left':
                vars.push(`  
                top: 50%;
                right: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                left: auto;    
                bottom: auto;
                transform: translateY(-50%);

                &:after {
                    top: 50%;
                    right: auto;
                    left: calc(100% + sugar.theme(ui.tooltip.arrowSize) / 2 - 1px);
                    bottom: auto;
                    margin-top: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(-90deg);
                }
                &:before {
                  height: 100%;
                  width: sugar.theme(ui.tooltip.arrowSize);
                  left: 100%;
                  right: auto;
                  bottom: auto;
                  top: 0;
                }
            `);
                break;
            case 'left-top':
                vars.push(`  
                top: 0;
                right: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                left: auto;    
                bottom: auto;
                transform: translateY(-50%);

                &:after {
                    top: 50%;
                    right: auto;
                    left: calc(100% + sugar.theme(ui.tooltip.arrowSize) / 2 - 1px);
                    bottom: auto;
                    margin-top: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(-90deg);
                }
                &:before {
                  height: 100%;
                  width: sugar.theme(ui.tooltip.arrowSize);
                  left: 100%;
                  right: auto;
                  bottom: auto;
                  top: 0;
                }
            `);
                break;
            case 'left-top-top':
                vars.push(`  
                top: 0;
                right: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                left: auto;    
                bottom: auto;
                transform: none;

                &:after {
                    top: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    right: auto;
                    left: calc(100% + sugar.theme(ui.tooltip.arrowSize) / 2 - 1px);
                    bottom: auto;
                    margin-top: 0;
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(-90deg);
                }
                &:before {
                  height: 100%;
                  width: sugar.theme(ui.tooltip.arrowSize);
                  left: 100%;
                  right: auto;
                  bottom: auto;
                  top: 0;
                }
            `);
                break;
            case 'left-center-top':
                vars.push(`  
                top: 50%;
                right: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                left: auto;    
                bottom: auto;
                transform: translateY(calc(sugar.theme(ui.tooltip.arrowSize) * -1));

                &:after {
                    top: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    right: auto;
                    left: calc(100% + sugar.theme(ui.tooltip.arrowSize) / 2 - 1px);
                    bottom: auto;
                    margin-top: 0;
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(-90deg);
                }
                &:before {
                  height: 100%;
                  width: sugar.theme(ui.tooltip.arrowSize);
                  left: 100%;
                  right: auto;
                  bottom: auto;
                  top: 0;
                }
            `);
                break;
            case 'left-bottom-top':
                vars.push(`  
                top: calc(100% - sugar.theme(ui.tooltip.arrowSize) / 2);
                right: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                left: auto;    
                bottom: auto;
                transform: translateY(calc(sugar.theme(ui.tooltip.arrowSize) * -1));

                &:after {
                    top: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    right: auto;
                    left: calc(100% + sugar.theme(ui.tooltip.arrowSize) / 2 - 1px);
                    bottom: auto;
                    margin-top: 0;
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(-90deg);
                }
                &:before {
                  height: 100%;
                  width: sugar.theme(ui.tooltip.arrowSize);
                  left: 100%;
                  right: auto;
                  bottom: auto;
                  top: 0;
                }
            `);
                break;
            case 'left-bottom':
                vars.push(`  
                top: auto;
                right: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                left: auto;    
                bottom: 0;
                transform: translateY(50%);

                &:after {
                    top: 50%;
                    right: auto;
                    left: calc(100% + sugar.theme(ui.tooltip.arrowSize) / 2 - 1px);
                    bottom: auto;
                    margin-top: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(-90deg);
                }
                &:before {
                  height: 100%;
                  width: sugar.theme(ui.tooltip.arrowSize);
                  left: 100%;
                  right: auto;
                  bottom: auto;
                  top: 0;
                }
            `);
                break;
            case 'left-bottom-bottom':
                vars.push(`  
                bottom: 0;
                right: calc(100% + sugar.theme(ui.tooltip.arrowSize));
                left: auto;    
                top: auto;
                transform: none;

                &:after {
                    top: calc(100% - sugar.theme(ui.tooltip.arrowSize) * 1.5);
                    right: auto;
                    left: calc(100% + sugar.theme(ui.tooltip.arrowSize) / 2 - 1px);
                    bottom: auto;
                    margin-top: 0;
                    border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
                    transform: rotate(-90deg);
                }
                &:before {
                  height: 100%;
                  width: sugar.theme(ui.tooltip.arrowSize);
                  left: 100%;
                  right: auto;
                  bottom: auto;
                  top: 0;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFLckQsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZOztBQUNwRCwrQ0FBVSxHQUFHO0lBQ2hCLFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFO1lBQ0osS0FBSztZQUNMLFVBQVU7WUFDVixXQUFXO1lBQ1gsT0FBTztZQUNQLFdBQVc7WUFDWCxjQUFjO1lBQ2QsUUFBUTtZQUNSLGFBQWE7WUFDYixjQUFjO1lBQ2QsTUFBTTtZQUNOLFVBQVU7WUFDVixhQUFhO1lBQ2Isb0JBQW9CO1lBQ3BCLGlCQUFpQjtZQUNqQixpQkFBaUI7WUFDakIsY0FBYztZQUNkLHFCQUFxQjtZQUNyQixrQkFBa0I7WUFDbEIsa0JBQWtCO1lBQ2xCLGVBQWU7U0FDbEI7UUFDRCxPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDO1FBQ25DLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDO0tBQ3ZDO0NBQ0osQ0FBQztBQTRCTixPQUFPLEVBQUUsb0NBQW9DLElBQUksU0FBUyxFQUFFLENBQUM7QUFDN0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixRQUFRLEVBQUUsS0FBSyxFQUNmLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxDQUFDLElBQy9CLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksV0FBVyxDQUFDLEtBQUssQ0FB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