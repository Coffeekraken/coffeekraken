import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiTooltipInterface extends __SInterface {
    static get _definition() {
        return {
            position: {
                type: 'String',
                values: [
                    'block-start',
                    'inline-end',
                    'block-end',
                    'inline-start',
                ],
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
    }
}
export { postcssSugarPluginUiTooltipInterface as interface };
export default function ({ params, atRule, applyNoScopes, replaceWith, }) {
    const finalParams = Object.assign({ position: 'block-start', interactive: false, scope: ['bare', 'lnf', 'position', 'interactive'] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
    const vars = [];
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        font-size: sugar.scalable(1rem);
          position: absolute;
          z-index: 500;
          display: block;
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
          background-color: sugar.color(current);
          color: sugar.color(current, foreground);
          border-radius: sugar.theme(ui.tooltip.borderRadius);
          transition: sugar.theme(ui.tooltip.transition);
          padding-inline: sugar.theme(ui.tooltip.paddingInline);
          padding-block: sugar.theme(ui.tooltip.paddingBlock);
          @sugar.depth( sugar.theme(ui.tooltip.depth) );

        & > * {
            @sugar.color(main);
        }

          &:after {
              content: " ";
              position: absolute;
              border-style: solid;
              border-color: sugar.color(current) transparent transparent transparent;
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
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRvb2x0aXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFO29CQUNKLGFBQWE7b0JBQ2IsWUFBWTtvQkFDWixXQUFXO29CQUNYLGNBQWM7aUJBQ2pCO2dCQUNELE9BQU8sRUFBRSxhQUFhO2FBQ3pCO1lBQ0QsV0FBVyxFQUFFO2dCQUNULElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsYUFBYSxDQUFDO2dCQUNsRCxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUM7YUFDdEQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBNEJELE9BQU8sRUFBRSxvQ0FBb0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUM3RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUNiLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixRQUFRLEVBQUUsYUFBYSxFQUN2QixXQUFXLEVBQUUsS0FBSyxFQUNsQixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxhQUFhLENBQUMsSUFDOUMsTUFBTSxDQUNaLENBQUM7SUFDRixXQUFX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