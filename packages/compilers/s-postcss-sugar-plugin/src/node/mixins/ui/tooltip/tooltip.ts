import __SInterface from '@coffeekraken/s-interface';

/**
 * @name          tooltip
 * @namespace     ui.tooltip
 * @type          CssMixin
 * @interface     ./tooltip          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the tooltip style to any element
 *
 * @param       {'solid'}           [style='theme.ui.tooltip.defaultStyle']        The style you want for your tooltip
 * @param       {'default'|'square'|'pill'}     [shape=theme.ui.tooltip.defaultShape]      The shape you want for your tooltip
 * @param       {('bare'|'lnf'|'shape')[]}      [scope=['bare','lnf','shape']]                      The scope(s) you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-tooltip {
 *    @sugar.ui.tooltip;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

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
                values: ['bare', 'lnf', 'shape', 'position', 'interactive'],
                default: ['bare', 'lnf', 'shape', 'position', 'interactive'],
            },
        };
    }
}

export interface IPostcssSugarPluginUiTooltipParams {
    style: 'solid';
    shape: 'default' | 'square' | 'pill';
    scope: ('bare' | 'lnf' | 'shape' | 'position' | 'interactive' | 'vr')[];
    position:
        | 'block-start'
        // | 'top-left'
        // | 'top-right'
        | 'inline-end'
        // | 'right-top'
        // | 'right-bottom'
        | 'block-end'
        // | 'bottom-left'
        // | 'bottom-right'
        | 'inline-start';
    // | 'left-top'
    // | 'left-bottom'
    // | 'left-bottom-bottom'
    // | 'left-bottom-top'
    // | 'left-center-top'
    // | 'left-top-top'
    // | 'right-bottom-bottom'
    // | 'right-bottom-top'
    // | 'right-center-top'
    // | 'right-top-top';
    interactive: Boolean;
}

export { postcssSugarPluginUiTooltipInterface as interface };
export default function ({
    params,
    atRule,
    applyNoScopes,
    replaceWith,
}: {
    params: Partial<IPostcssSugarPluginUiTooltipParams>;
    atRule: any;
    applyNoScopes: Function;
    replaceWith: Function;
}) {
    const finalParams: IPostcssSugarPluginUiTooltipParams = {
        style: 'solid',
        shape: 'default',
        position: 'block-start',
        interactive: false,
        scope: ['bare', 'lnf', 'shape', 'position', 'interactive'],
        ...params,
    };
    finalParams.scope = applyNoScopes(finalParams.scope);

    const vars: string[] = [];

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

    if (finalParams.scope.includes('shape')) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    border-radius: 0;
                `);
                break;
            case 'pill':
                vars.push(`
                    border-radius: 9999px;
                `);
                break;
            default:
                vars.push(`
                    border-radius: sugar.theme(ui.tooltip.borderRadius);
                `);
                break;
        }
    }

    return vars;
}
