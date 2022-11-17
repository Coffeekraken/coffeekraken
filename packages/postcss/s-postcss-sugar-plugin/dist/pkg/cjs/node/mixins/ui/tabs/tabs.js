"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
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
class postcssSugarPluginUiTabInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                description: 'Specify the look and feel you want for your tabs',
                values: ['default'],
                default: s_theme_1.default.get('ui.tabs.defaultLnf'),
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
                default: s_theme_1.default.get('ui.tabs.outline'),
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
exports.interface = postcssSugarPluginUiTabInterface;
function default_1({ params, atRule, replaceWith, }) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILE1BQU0sZ0NBQWlDLFNBQVEscUJBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsa0RBQWtEO2dCQUMvRCxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7Z0JBQ25CLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUM5QztZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQ1Asc0VBQXNFO2dCQUMxRSxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQ1AsMkVBQTJFO2dCQUMvRSxPQUFPLEVBQUUsS0FBSzthQUNqQjtZQUNELFNBQVMsRUFBRTtnQkFDUCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxXQUFXLEVBQUUsb0NBQW9DO2dCQUNqRCxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO2dCQUNsQyxPQUFPLEVBQUUsWUFBWTthQUN4QjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQ1AsMkRBQTJEO2dCQUMvRCxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7YUFDM0M7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxXQUFXLEVB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