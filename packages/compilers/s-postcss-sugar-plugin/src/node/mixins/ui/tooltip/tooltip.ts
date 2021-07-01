import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __isInScope from '../../../utils/isInScope';
import __theme from '../../../utils/theme';

class postcssSugarPluginUiTooltipInterface extends __SInterface {
  static definition = {
    position: {
      type: 'String',
      values: ['top','top-left','top-right','right','right-top','right-bottom','bottom','bottom-left','bottom-right','left','left-top','left-bottom'],
      default: 'top'
    },
    scope: {
      type: 'Array<String>',
      values: ['bare','lnf','position'],
      default: ['bare','lnf','position']
    }
  };
}

export interface IPostcssSugarPluginUiTooltipParams {
  position: 'top' | 'top-left' | 'top-right' | 'right' | 'right-top' | 'right-bottom' | 'bottom' | 'bottom-left' | 'bottom-right' | 'left' | 'left-top' | 'left-bottom';
  scope: string[];
}

export { postcssSugarPluginUiTooltipInterface as interface };
export default function ({
  params,
  atRule,
  replaceWith
}: {
  params: Partial<IPostcssSugarPluginUiTooltipParams>;
  atRule: any;
  replaceWith: Function;
}) {
  const finalParams: IPostcssSugarPluginUiTooltipParams = {
    position: 'top',
    scope: ['bare','lnf','position'],
    ...params
  };

  const vars: string[] = [];

  if (finalParams.scope.indexOf('bare') !== -1) {
      vars.push(`
        @sugar.scope.bare {
            position: absolute;
            z-index: 10;
            display: block;
            max-width: sugar.theme(ui.tooltip.maxWidth);
            text-align: center;
        }
      `)
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
        }
      `)
  }

  if (finalParams.scope.indexOf('position') !== -1) {
      switch(finalParams.position) {
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
