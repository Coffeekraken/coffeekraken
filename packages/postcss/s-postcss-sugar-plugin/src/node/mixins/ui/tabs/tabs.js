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
 * @param       {'solid'}           [style='theme.ui.tabs.defaultStyle']        The style you want for your tabs
 * @param       {'default'|'square'|'pill'}     [shape=theme.ui.tabs.defaultShape]      The shape you want for your tabs
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
            style: {
                type: 'String',
                description: 'Specify the style you want for your tabs',
                values: ['solid'],
                default: __STheme.get('ui.tabs.defaultStyle'),
            },
            shape: {
                type: 'String',
                description: 'Specify the shape you want for your tabs',
                values: ['default', 'square', 'pill'],
                default: __STheme.get('ui.tabs.defaultShape'),
            },
            grow: {
                type: 'Boolean',
                description: 'Specify if you want your tabs to take all the available place of not',
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
                values: ['bare', 'lnf', 'shape', 'grow', 'direction'],
                default: ['bare', 'lnf', 'shape', 'grow', 'direction'],
            },
        };
    }
}
export { postcssSugarPluginUiTabInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: 'solid', shape: 'default', grow: false, direction: 'horizontal', outline: true, scope: ['bare', 'lnf', 'grow', 'direction'] }, params);
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
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
    `);
    }
    if (finalParams.grow && finalParams.scope.indexOf('grow') !== -1) {
        vars.push(`
      ${finalParams.grow && finalParams.scope.indexOf('grow') !== -1
            ? `
        & > * {
          flex-grow: 1;
        }
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
        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`
          & > * {
            @sugar.state.active {
              background-color: sugar.color(current);
              color: sugar.color(current, foreground);
            }
            @sugar.state.hover {
              background-color: sugar.color(current, --lighten 5);
              color: sugar.color(current, foreground);
            }       
          }
        `);
                break;
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
    if (finalParams.scope.includes('shape')) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                border-radius: 0 !important;
                & > * {
                  border-radius: 0 !important;
                }
              `);
                break;
            case 'pill':
                vars.push(`

                border-radius: 9999px;

                & > *:first-child {
                  border-top-left-radius: 9999px;
                  border-bottom-left-radius: 9999px;
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }
                & > *:last-child {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: 9999px;
                  border-bottom-right-radius: 9999px;
                }

                [dir="rtl"] & > *:first-child,
                &[dir="rtl"] > *:first-child {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: 9999px;
                  border-bottom-right-radius: 9999px;
                }
                [dir="rtl"] & > *:last-child,
                &[dir="rtl"] > *:last-child {
                  border-top-left-radius: 9999px;
                  border-bottom-left-radius: 9999px;
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }

                & > *:first-child:last-child {
                  border-top-left-radius: 9999px !important;
                  border-bottom-left-radius: 9999px !important;
                  border-top-right-radius: 9999px !important;
                  border-bottom-right-radius: 9999px !important;
                }

              `);
                if (finalParams.direction === 'vertical') {
                    vars.push(`
                    & > *:first-child {
                      border-top-left-radius: 9999px !important;
                      border-bottom-left-radius: 0 !important;
                      border-top-right-radius: 9999px !important;
                      border-bottom-right-radius: 0 !important;
                    }
                    & > *:last-child {
                      border-top-left-radius: 0 !important;
                      border-bottom-left-radius: 9999px !important;
                      border-top-right-radius: 0 !important;
                      border-bottom-right-radius: 9999px !important;
                    }
                  `);
                }
                break;
            default:
                vars.push(`

                border-radius: sugar.border.radius(ui.tabs.borderRadius);

                & > *:first-child {
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
                &[dir="rtl"] > *:first-child {
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

                & > *:first-child:last-child {
                  border-top-left-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
                  border-bottom-left-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
                  border-top-right-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
                  border-bottom-right-radius: sugar.border.radius(ui.tabs.borderRadius) !important;
                }
              `);
                if (finalParams.direction === 'vertical') {
                    vars.push(`
                    & > *:first-child {
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
                break;
        }
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsTUFBTSxnQ0FBaUMsU0FBUSxZQUFZO0lBQ3ZELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLDBDQUEwQztnQkFDdkQsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQzthQUNoRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsMENBQTBDO2dCQUN2RCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztnQkFDckMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUM7YUFDaEQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLHNFQUFzRTtnQkFDMUUsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLG9DQUFvQztnQkFDakQsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQztnQkFDbEMsT0FBTyxFQUFFLFlBQVk7YUFDeEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLDJEQUEyRDtnQkFDL0QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7YUFDM0M7WUFD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