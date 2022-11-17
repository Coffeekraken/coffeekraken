import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          tabs
 * @namespace     node.mixin.ui.tabs
 * @type               PostcssMixin
 * @interface     ./tabs          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the tabs style to any element
 *
 * @param       {'default'}           [style='theme.ui.tabs.defaultLnf']        The style you want for your tabs
 * @param       {Boolean}           [grow=false]                  Specify if you want your tabs to grow and take all the available place or not
 * @param       {'vertical'|'horizontal'}       [direction='horizontal']                Specify if you want your tabs to be vertical or horizontal
 * @param       {Boolean}           [outline=true]                      Specify if you want your tabs to have an outline on focus or not
 * @param       {('bare'|'lnf'|'shape')[]}      [scope=['bare','lnf','shape']]                      The scope(s) you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-tabs {
 *    @sugar.ui.tabs;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiTabInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                description: 'Specify the look and feel you want for your tabs',
                values: ['default'],
                default: __STheme.get('ui.tabs.defaultLnf'),
            },
            grow: {
                type: 'Boolean',
                description: 'Specify if you want your tabs to take all the available place of not',
                default: false,
            },
            fill: {
                type: 'Boolean',
                description: 'Specify if you want your tabs to be filled with a background color or not',
                default: false,
            },
            direction: {
                type: 'String',
                description: 'Specigy the direction of your tabs',
                values: ['vertical', 'horizontal'],
                default: 'horizontal',
            },
            outline: {
                type: 'Boolean',
                description: 'Specify if you want your tabs to have an outline on focus',
                default: __STheme.get('ui.tabs.outline'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                description: 'Specify the scope(s) you want to generate',
                values: ['bare', 'lnf', 'grow', 'fill', 'direction'],
                default: ['bare', 'lnf', 'grow', 'fill', 'direction'],
            },
        };
    }
}
export { postcssSugarPluginUiTabInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'default', grow: false, fill: false, direction: 'horizontal', outline: true, scope: ['bare', 'lnf', 'grow', 'fill', 'direction'] }, params);
    const vars = [];
    if (finalParams.outline) {
        vars.push(`
        & > *:focus:not(:hover) {
          @sugar.outline;
        }
      `);
    }
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        font-size: sugar.scalable(1rem);
        display: inline-flex;
        align-items: center;
        flex-wrap: nowrap;

        & > template {
          display: none;
        }
    `);
    }
    if (finalParams.grow && finalParams.scope.indexOf('grow') !== -1) {
        vars.push(`
      ${finalParams.grow && finalParams.scope.indexOf('grow') !== -1
            ? `
              display: flex;
              
              & > * {
                flex-grow: 1;
              }
      `
            : ''}
    `);
    }
    if (finalParams.fill && finalParams.scope.indexOf('fill') !== -1) {
        vars.push(`
      ${finalParams.fill && finalParams.scope.indexOf('fill') !== -1
            ? `
              background: sugar.color(current, surface);
      `
            : ''}
    `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
          user-select: none;

          & > * > * {
            @sugar.color(main);
          }

          & > * {
            text-align: center;
            padding-inline: sugar.padding(ui.tabs.paddingInline);
            padding-block: sugar.padding(ui.tabs.paddingBlock);
            transition: sugar.theme(ui.tabs.transition);
            cursor: pointer;
            display: block;      
          }
      `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.lnf) {
            case 'default':
            default:
                vars.push(`
          & > * {
            color: sugar.color(current, foreground);

            @sugar.state.active {
              background-color: sugar.color(current);
            }
            @sugar.state.hover {
              background-color: sugar.color(current, --lighten 5);
            }       
          }
        `);
                break;
        }
        vars.push(`

                border-radius: sugar.border.radius(ui.tabs.borderRadius);

                & > *:first-child,
                & > template + * {
                  border-top-left-radius: sugar.border.radius(ui.tabs.borderRadius);
                  border-bottom-left-radius: sugar.border.radius(ui.tabs.borderRadius);
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }
                & > *:last-child {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: sugar.border.radius(ui.tabs.borderRadius);
                  border-bottom-right-radius: sugar.border.radius(ui.tabs.borderRadius);
                }

                [dir="rtl"] & > *:first-child,
                &[dir="rtl"] > *:first-child,
                [dir="rtl"] & > template + *,
                &[dir="rtl"] > template + * {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: sugar.border.radius(ui.tabs.borderRadius);
                  border-bottom-right-radius: sugar.border.radius(ui.tabs.borderRadius);
                }
                [dir="rtl"] & > *:last-child,
                &[dir="rtl"] > *:last-child {
                  border-top-left-radius: sugar.border.radius(ui.tabs.borderRadius);
                  border-bottom-left-radius: sugar.border.radius(ui.tabs.borderRadius);
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }

                & > *:first-child:last-child,
                & > template + *:last-child {
                  border-top-left-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
                  border-bottom-left-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
                  border-top-right-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
                  border-bottom-right-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
                }
              `);
        if (finalParams.direction === 'vertical') {
            vars.push(`
                    & > *:first-child,
                    & > template + * {
                      border-top-left-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
                      border-bottom-left-radius: 0 !important;
                      border-top-right-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
                      border-bottom-right-radius: 0 !important;
                    }
                    & > *:last-child {
                      border-top-left-radius: 0 !important;
                      border-bottom-left-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
                      border-top-right-radius: 0 !important;
                      border-bottom-right-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
                    }
                  `);
        }
    }
    // if (finalParams.style === 'gradient' && finalParams.scope.indexOf('style') !== -1) {
    //     vars.push(`
    //   & > dt,
    //   & > li,
    //   & > div,
    //   & > * {
    //     @sugar.state.hover {
    //       @sugar.gradient($start: sugar.color(complementary, gradientStart), $end: sugar.color(complementary, gradientEnd), $angle: 90deg, $type: linear);
    //     }
    //     @sugar.state.active {
    //       @sugar.gradient($start: sugar.color(current, gradientStart), $end: sugar.color(current, gradientEnd), $angle: 90deg, $type: linear);
    //     }
    //   }
    // `);
    // }
    if (finalParams.direction === 'vertical' &&
        finalParams.scope.indexOf('direction') !== -1) {
        vars.push(`
          display: block;

          & > * {
            display: block;
            text-align: inherit;
          }
        `);
    }
    // if (finalParams.scope.includes('shape')) {
    //     switch (finalParams.shape) {
    //         case 'square':
    //             vars.push(`
    //             border-radius: 0 !important;
    //             & > * {
    //               border-radius: 0 !important;
    //             }
    //           `);
    //             break;
    //         case 'pill':
    //             vars.push(`
    //             border-radius: 9999px;
    //             & > *:first-child,
    //             & > template + * {
    //               border-top-left-radius: 9999px;
    //               border-bottom-left-radius: 9999px;
    //               border-top-right-radius: 0;
    //               border-bottom-right-radius: 0;
    //             }
    //             & > *:last-child {
    //               border-top-left-radius: 0;
    //               border-bottom-left-radius: 0;
    //               border-top-right-radius: 9999px;
    //               border-bottom-right-radius: 9999px;
    //             }
    //             [dir="rtl"] & > *:first-child,
    //             &[dir="rtl"] > *:first-child,
    //             [dir="rtl"] & > template + *,
    //             &[dir="rtl"] > template + * {
    //               border-top-left-radius: 0;
    //               border-bottom-left-radius: 0;
    //               border-top-right-radius: 9999px;
    //               border-bottom-right-radius: 9999px;
    //             }
    //             [dir="rtl"] & > *:last-child,
    //             &[dir="rtl"] > *:last-child {
    //               border-top-left-radius: 9999px;
    //               border-bottom-left-radius: 9999px;
    //               border-top-right-radius: 0;
    //               border-bottom-right-radius: 0;
    //             }
    //             & > *:first-child:last-child,
    //             & > template + *:last-child {
    //               border-top-left-radius: 9999px !important;
    //               border-bottom-left-radius: 9999px !important;
    //               border-top-right-radius: 9999px !important;
    //               border-bottom-right-radius: 9999px !important;
    //             }
    //           `);
    //             if (finalParams.direction === 'vertical') {
    //                 vars.push(`
    //                 & > *:first-child,
    //                 & > template + * {
    //                   border-top-left-radius: 9999px !important;
    //                   border-bottom-left-radius: 0 !important;
    //                   border-top-right-radius: 9999px !important;
    //                   border-bottom-right-radius: 0 !important;
    //                 }
    //                 & > *:last-child {
    //                   border-top-left-radius: 0 !important;
    //                   border-bottom-left-radius: 9999px !important;
    //                   border-top-right-radius: 0 !important;
    //                   border-bottom-right-radius: 9999px !important;
    //                 }
    //               `);
    //             }
    //             break;
    //         default:
    //             vars.push(`
    //             border-radius: sugar.border.radius(ui.tabs.borderRadius);
    //             & > *:first-child,
    //             & > template + * {
    //               border-top-left-radius: sugar.border.radius(ui.tabs.borderRadius);
    //               border-bottom-left-radius: sugar.border.radius(ui.tabs.borderRadius);
    //               border-top-right-radius: 0;
    //               border-bottom-right-radius: 0;
    //             }
    //             & > *:last-child {
    //               border-top-left-radius: 0;
    //               border-bottom-left-radius: 0;
    //               border-top-right-radius: sugar.border.radius(ui.tabs.borderRadius);
    //               border-bottom-right-radius: sugar.border.radius(ui.tabs.borderRadius);
    //             }
    //             [dir="rtl"] & > *:first-child,
    //             &[dir="rtl"] > *:first-child,
    //             [dir="rtl"] & > template + *,
    //             &[dir="rtl"] > template + * {
    //               border-top-left-radius: 0;
    //               border-bottom-left-radius: 0;
    //               border-top-right-radius: sugar.border.radius(ui.tabs.borderRadius);
    //               border-bottom-right-radius: sugar.border.radius(ui.tabs.borderRadius);
    //             }
    //             [dir="rtl"] & > *:last-child,
    //             &[dir="rtl"] > *:last-child {
    //               border-top-left-radius: sugar.border.radius(ui.tabs.borderRadius);
    //               border-bottom-left-radius: sugar.border.radius(ui.tabs.borderRadius);
    //               border-top-right-radius: 0;
    //               border-bottom-right-radius: 0;
    //             }
    //             & > *:first-child:last-child,
    //             & > template + *:last-child {
    //               border-top-left-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
    //               border-bottom-left-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
    //               border-top-right-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
    //               border-bottom-right-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
    //             }
    //           `);
    //             if (finalParams.direction === 'vertical') {
    //                 vars.push(`
    //                 & > *:first-child,
    //                 & > template + * {
    //                   border-top-left-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
    //                   border-bottom-left-radius: 0 !important;
    //                   border-top-right-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
    //                   border-bottom-right-radius: 0 !important;
    //                 }
    //                 & > *:last-child {
    //                   border-top-left-radius: 0 !important;
    //                   border-bottom-left-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
    //                   border-top-right-radius: 0 !important;
    //                   border-bottom-right-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
    //                 }
    //               `);
    //             }
    //             break;
    //     }
    // }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxNQUFNLGdDQUFpQyxTQUFRLFlBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsa0RBQWtEO2dCQUMvRCxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ25CLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQzlDO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCxzRUFBc0U7Z0JBQzFFLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCwyRUFBMkU7Z0JBQy9FLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxvQ0FBb0M7Z0JBQ2pELE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUM7Z0JBQ2xDLE9BQU8sRUFBRSxZQUFZO2FBQ3hCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCwyREFBMkQ7Z0JBQy9ELE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO2FBQzNDO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFF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