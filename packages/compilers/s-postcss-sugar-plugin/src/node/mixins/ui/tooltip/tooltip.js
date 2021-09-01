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
          padding-inline: sugar.scalable(sugar.theme(ui.tooltip.paddingInline));
            padding-block: sugar.scalable(sugar.theme(ui.tooltip.paddingBlock));
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