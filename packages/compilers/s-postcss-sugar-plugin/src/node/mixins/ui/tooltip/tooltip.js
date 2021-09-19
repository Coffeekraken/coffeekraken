import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiTooltipInterface extends __SInterface {
}
postcssSugarPluginUiTooltipInterface.definition = {
    position: {
        type: 'String',
        values: ['block-start', 'inline-end', 'block-end', 'inline-start'],
        default: 'block-start',
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
export { postcssSugarPluginUiTooltipInterface as interface };
export default function ({ params, atRule, applyNoScopes, replaceWith, }) {
    const finalParams = Object.assign({ position: 'block-start', interactive: false, scope: ['bare', 'lnf', 'position', 'interactive'] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
    const vars = [];
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
          position: absolute;
          z-index: 500;
          display: block;
          text-align: center;
          white-space: nowrap;
          max-width: 9999999px !important;
          pointer-events: none;
      `);
    }
    vars.push(`
        .s-tooltip-container--active > & {
            opacity: 1;
        }
    `);
    if (finalParams.scope.indexOf('interactive') !== -1) {
        if (finalParams.interactive) {
            vars.push(`
                .s-tooltip-container--active > &,
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
          background-color: sugar.color(ui);
          color: sugar.color(ui, foreground);
          border-radius: sugar.theme(ui.tooltip.borderRadius);
          transition: sugar.theme(ui.tooltip.transition);
          padding-inline: sugar.scalable(sugar.theme(ui.tooltip.paddingInline));
          padding-block: sugar.scalable(sugar.theme(ui.tooltip.paddingBlock));
          @sugar.depth( sugar.theme(ui.tooltip.depth) );

        & > * {
            @sugar.color.remap(ui, main);
        }

          &:after {
              content: " ";
              position: absolute;
              border-style: solid;
              border-color: sugar.color(ui) transparent transparent transparent;
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
            case 'block-start':
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
            // case 'block-start-start':
            //     vars.push(`
            //     bottom: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //     left: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //     transform: translateX(-50%);
            //     &:after {
            //         top: 100%;
            //         left: 50%;
            //         margin-left: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
            //         border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //     }
            //     &:before {
            //       width: 100%;
            //       height: sugar.theme(ui.tooltip.arrowSize);
            //       top: 100%;
            //       left: 0;
            //     }
            // `);
            //     break;
            // case 'block-start-end':
            //     vars.push(`
            //     bottom: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //     right: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //     left: auto;
            //     transform: translateX(50%);
            //     &:after {
            //         top: 100%;
            //         left: 50%;
            //         margin-left: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
            //         border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //     }
            //     &:before {
            //       width: 100%;
            //       height: sugar.theme(ui.tooltip.arrowSize);
            //       top: 100%;
            //       left: 0;
            //     }
            // `);
            //     break;
            // RIGHT
            case 'inline-end':
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
            // case 'inline-end-start':
            //     vars.push(`
            //     top: 0;
            //     left: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //     right: auto;
            //     bottom: auto;
            //     transform: translateY(-50%);
            //     &:after {
            //         top: 50%;
            //         left: auto;
            //         right: 100%;
            //         bottom: auto;
            //         margin-top: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
            //         border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         transform: rotate(90deg);
            //     }
            //     &:before {
            //       height: 100%;
            //       width: sugar.theme(ui.tooltip.arrowSize);
            //       right: 100%;
            //       left: auto;
            //       bottom: auto;
            //       top: 0;
            //     }
            // `);
            //     break;
            // case 'right-top-top':
            //     vars.push(`
            //     top: 0;
            //     left: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //     right: auto;
            //     bottom: auto;
            //     transform: none;
            //     &:after {
            //         top: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         left: auto;
            //         right: calc(100% - 0.5px);
            //         bottom: auto;
            //         margin-top: 0;
            //         border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         transform: rotate(90deg);
            //     }
            //     &:before {
            //       height: 100%;
            //       width: sugar.theme(ui.tooltip.arrowSize);
            //       right: 100%;
            //       left: auto;
            //       bottom: auto;
            //       top: 0;
            //     }
            // `);
            //     break;
            // case 'right-center-top':
            //     vars.push(`
            //     top: 50%;
            //     left: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //     right: auto;
            //     bottom: auto;
            //     transform: translateY(calc(sugar.theme(ui.tooltip.arrowSize) * -1));
            //     &:after {
            //         top: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         left: auto;
            //         right: calc(100% - 0.5px);
            //         bottom: auto;
            //         margin-top: 0;
            //         border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         transform: rotate(90deg);
            //     }
            //     &:before {
            //       height: 100%;
            //       width: sugar.theme(ui.tooltip.arrowSize);
            //       right: 100%;
            //       left: auto;
            //       bottom: auto;
            //       top: 0;
            //     }
            // `);
            //     break;
            // case 'right-bottom-top':
            //     vars.push(`
            //     top: calc(100% - sugar.theme(ui.tooltip.arrowSize) / 2);
            //     left: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //     right: auto;
            //     bottom: auto;
            //     transform: translateY(calc(sugar.theme(ui.tooltip.arrowSize) * -1));
            //     &:after {
            //         top: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         left: auto;
            //         right: calc(100% - 0.5px);
            //         bottom: auto;
            //         margin-top: 0;
            //         border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         transform: rotate(90deg);
            //     }
            //     &:before {
            //       height: 100%;
            //       width: sugar.theme(ui.tooltip.arrowSize);
            //       right: 100%;
            //       left: auto;
            //       bottom: auto;
            //       top: 0;
            //     }
            // `);
            //     break;
            // case 'inline-end-end':
            //     vars.push(`
            //     top: auto;
            //     left: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //     right: auto;
            //     bottom: 0;
            //     transform: translateY(50%);
            //     &:after {
            //         top: 50%;
            //         left: auto;
            //         right: 100%;
            //         bottom: auto;
            //         margin-top: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
            //         border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         transform: rotate(90deg);
            //     }
            //     &:before {
            //       height: 100%;
            //       width: sugar.theme(ui.tooltip.arrowSize);
            //       right: 100%;
            //       left: auto;
            //       bottom: auto;
            //       top: 0;
            //     }
            // `);
            //     break;
            // case 'right-bottom-bottom':
            //     vars.push(`
            //     bottom: 0;
            //     left: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //     right: auto;
            //     top: auto;
            //     transform: none;
            //     &:after {
            //         top: calc(100% - sugar.theme(ui.tooltip.arrowSize) * 1.5);
            //         left: auto;
            //         right: calc(100% - 1px);
            //         bottom: auto;
            //         margin-top: 0;
            //         border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         transform: rotate(90deg);
            //     }
            //     &:before {
            //       height: 100%;
            //       width: sugar.theme(ui.tooltip.arrowSize);
            //       left: 100%;
            //       right: auto;
            //       bottom: auto;
            //       top: 0;
            //     }
            // `);
            //     break;
            // LEFT
            case 'inline-start':
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
            // case 'inline-start-start':
            //     vars.push(`
            //     top: 0;
            //     right: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //     left: auto;
            //     bottom: auto;
            //     transform: translateY(-50%);
            //     &:after {
            //         top: 50%;
            //         right: auto;
            //         left: calc(100% + sugar.theme(ui.tooltip.arrowSize) / 2 - 1px);
            //         bottom: auto;
            //         margin-top: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
            //         border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         transform: rotate(-90deg);
            //     }
            //     &:before {
            //       height: 100%;
            //       width: sugar.theme(ui.tooltip.arrowSize);
            //       left: 100%;
            //       right: auto;
            //       bottom: auto;
            //       top: 0;
            //     }
            // `);
            //     break;
            // case 'left-top-top':
            //     vars.push(`
            //     top: 0;
            //     right: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //     left: auto;
            //     bottom: auto;
            //     transform: none;
            //     &:after {
            //         top: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         right: auto;
            //         left: calc(100% + sugar.theme(ui.tooltip.arrowSize) / 2 - 1px);
            //         bottom: auto;
            //         margin-top: 0;
            //         border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         transform: rotate(-90deg);
            //     }
            //     &:before {
            //       height: 100%;
            //       width: sugar.theme(ui.tooltip.arrowSize);
            //       left: 100%;
            //       right: auto;
            //       bottom: auto;
            //       top: 0;
            //     }
            // `);
            //     break;
            // case 'left-center-top':
            //     vars.push(`
            //     top: 50%;
            //     right: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //     left: auto;
            //     bottom: auto;
            //     transform: translateY(calc(sugar.theme(ui.tooltip.arrowSize) * -1));
            //     &:after {
            //         top: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         right: auto;
            //         left: calc(100% + sugar.theme(ui.tooltip.arrowSize) / 2 - 1px);
            //         bottom: auto;
            //         margin-top: 0;
            //         border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         transform: rotate(-90deg);
            //     }
            //     &:before {
            //       height: 100%;
            //       width: sugar.theme(ui.tooltip.arrowSize);
            //       left: 100%;
            //       right: auto;
            //       bottom: auto;
            //       top: 0;
            //     }
            // `);
            //     break;
            // case 'left-bottom-top':
            //     vars.push(`
            //     top: calc(100% - sugar.theme(ui.tooltip.arrowSize) / 2);
            //     right: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //     left: auto;
            //     bottom: auto;
            //     transform: translateY(calc(sugar.theme(ui.tooltip.arrowSize) * -1));
            //     &:after {
            //         top: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         right: auto;
            //         left: calc(100% + sugar.theme(ui.tooltip.arrowSize) / 2 - 1px);
            //         bottom: auto;
            //         margin-top: 0;
            //         border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         transform: rotate(-90deg);
            //     }
            //     &:before {
            //       height: 100%;
            //       width: sugar.theme(ui.tooltip.arrowSize);
            //       left: 100%;
            //       right: auto;
            //       bottom: auto;
            //       top: 0;
            //     }
            // `);
            //     break;
            // case 'inline-start-end':
            //     vars.push(`
            //     top: auto;
            //     right: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //     left: auto;
            //     bottom: 0;
            //     transform: translateY(50%);
            //     &:after {
            //         top: 50%;
            //         right: auto;
            //         left: calc(100% + sugar.theme(ui.tooltip.arrowSize) / 2 - 1px);
            //         bottom: auto;
            //         margin-top: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
            //         border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         transform: rotate(-90deg);
            //     }
            //     &:before {
            //       height: 100%;
            //       width: sugar.theme(ui.tooltip.arrowSize);
            //       left: 100%;
            //       right: auto;
            //       bottom: auto;
            //       top: 0;
            //     }
            // `);
            //     break;
            // case 'left-bottom-bottom':
            //     vars.push(`
            //     bottom: 0;
            //     right: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //     left: auto;
            //     top: auto;
            //     transform: none;
            //     &:after {
            //         top: calc(100% - sugar.theme(ui.tooltip.arrowSize) * 1.5);
            //         right: auto;
            //         left: calc(100% + sugar.theme(ui.tooltip.arrowSize) / 2 - 1px);
            //         bottom: auto;
            //         margin-top: 0;
            //         border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         transform: rotate(-90deg);
            //     }
            //     &:before {
            //       height: 100%;
            //       width: sugar.theme(ui.tooltip.arrowSize);
            //       left: 100%;
            //       right: auto;
            //       bottom: auto;
            //       top: 0;
            //     }
            // `);
            //     break;
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
            case 'block-end':
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
            // case 'bottom-left':
            //     vars.push(`
            //     bottom: auto;
            //     right: auto;
            //     left: 0;
            //     top: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //     transform: translate(0,0);
            //     &:after {
            //         bottom: 100%;
            //         top: auto;
            //         left: 50%;
            //         right: auto;
            //         margin-left: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
            //         border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         transform: rotate(180deg);
            //     }
            //     &:before {
            //       width: 100%;
            //       height: sugar.theme(ui.tooltip.arrowSize);
            //       bottom: 100%;
            //       top: auto;
            //       left: 0;
            //     }
            // `);
            //     break;
            // case 'bottom-right':
            //     vars.push(`
            //     bottom: auto;
            //     left: auto;
            //     right: 0;
            //     top: calc(100% + sugar.theme(ui.tooltip.arrowSize));
            //     transform: translate(0,0);
            //     &:after {
            //         bottom: 100%;
            //         top: auto;
            //         left: 50%;
            //         right: auto;
            //         margin-left: calc(sugar.theme(ui.tooltip.arrowSize) * -1 / 2);
            //         border-width: calc(sugar.theme(ui.tooltip.arrowSize) / 2);
            //         transform: rotate(180deg);
            //     }
            //     &:before {
            //       width: 100%;
            //       height: sugar.theme(ui.tooltip.arrowSize);
            //       bottom: 100%;
            //       top: auto;
            //       left: 0;
            //     }
            // `);
            //     break;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFLckQsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZOztBQUNwRCwrQ0FBVSxHQUFHO0lBQ2hCLFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsYUFBYSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsY0FBYyxDQUFDO1FBQ2xFLE9BQU8sRUFBRSxhQUFhO0tBQ3pCO0lBQ0QsV0FBVyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7U0FDekI7UUFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUM7UUFDbEQsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDO0tBQ3REO0NBQ0osQ0FBQztBQTZCTixPQUFPLEVBQUUsb0NBQW9DLElBQUksU0FBUyxFQUFFLENBQUM7QUFDN0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFDYixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsUUFBUSxFQUFFLGFBQWEsRUFDdkIsV0FBVyxFQUFFLEtBQUssRUFDbEIsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDLElBQzlDLE1BQU0sQ0FDWixDQUFDO0lBQ0YsV0FBVyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FB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