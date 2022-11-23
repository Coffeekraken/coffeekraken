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
    const finalParams = Object.assign({ grow: false, fill: false, direction: 'horizontal', outline: true, scope: ['bare', 'lnf', 'grow', 'fill', 'direction'] }, params);
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
          @sugar.color(main);

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
        vars.push(`

                border-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));

                & > *:first-child,
                & > template + * {
                  border-top-left-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));
                  border-bottom-left-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }
                & > *:last-child {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));
                  border-bottom-right-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));
                }

                [dir="rtl"] & > *:first-child,
                &[dir="rtl"] > *:first-child,
                [dir="rtl"] & > template + *,
                &[dir="rtl"] > template + * {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));
                  border-bottom-right-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));
                }
                [dir="rtl"] & > *:last-child,
                &[dir="rtl"] > *:last-child {
                  border-top-left-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));
                  border-bottom-left-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius));
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }

                & > *:first-child:last-child,
                & > template + *:last-child {
                  border-top-left-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius)) !important;
                  border-bottom-left-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius)) !important;
                  border-top-right-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius)) !important;
                  border-bottom-right-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius)) !important;
                }
              `);
    }
    if (finalParams.direction === 'vertical' &&
        finalParams.scope.indexOf('direction') !== -1) {
        vars.push(`
          display: block;

          & > * {
            display: block;
            text-align: inherit;
          }
        `);
        if (finalParams.direction === 'vertical') {
            vars.push(`
                  & > *:first-child,
                  & > template + * {
                    border-top-left-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius)) !important;
                    border-bottom-left-radius: 0 !important;
                    border-top-right-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius)) !important;
                    border-bottom-right-radius: 0 !important;
                  }
                  & > *:last-child {
                    border-top-left-radius: 0 !important;
                    border-bottom-left-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius)) !important;
                    border-top-right-radius: 0 !important;
                    border-bottom-right-radius: var(--s-shape, sugar.border.radius(ui.tabs.borderRadius)) !important;
                  }
                `);
        }
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBTSxnQ0FBaUMsU0FBUSxxQkFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCxzRUFBc0U7Z0JBQzFFLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCwyRUFBMkU7Z0JBQy9FLE9BQU8sRUFBRSxLQUFLO2FBQ2pCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFBRSxvQ0FBb0M7Z0JBQ2pELE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUM7Z0JBQ2xDLE9BQU8sRUFBRSxZQUFZO2FBQ3hCO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFDUCwyREFBMkQ7Z0JBQy9ELE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQzthQUMzQztZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELFdBQVcsRUFBRSwyQ0FBMkM7Z0JBQ3hELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUM7Z0JBQ3BELE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUM7YUFDeEQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBVTRDLHFEQUFTO0FBRXRELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsS0FBSyxFQUNYLElBQUksRUFBRSxLQUFLLEVBQ1gsU0FBUyxFQUFFLFlBQVksRUFDdkIsT0FBTyxFQUFFLElBQUksRUFDYixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLElBQ2hELE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7O09BSVgsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7OztLQVNiLENBQUMsQ0FBQztLQUNGO0lBRUQsSUFBSSxXQUFXLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUM7UUFFUixXQUFXLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RCxDQUFDLENBQUM7Ozs7OztPQU1UO1lBQ08sQ0FBQyxDQUFDLEVBQ1Y7S0FDRCxDQUFDLENBQUM7S0FDRjtJQUVELElBQUksV0FBVyxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRVIsV0FBVyxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFDOztPQUVUO1lBQ08sQ0FBQyxDQUFDLEVBQ1Y7S0FDRCxDQUFDLENBQUM7S0FDRjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O09BWVgsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7O1NBV1QsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBMENILENBQUMsQ0FBQztLQUNaO0lBRUQsSUFDSSxXQUFXLENBQUMsU0FBUyxLQUFLLFVBQVU7UUFDcEMsV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQy9DO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OztTQU9ULENBQUMsQ0FBQztRQUVILElBQUksV0FBVyxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUU7WUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7aUJBY0wsQ0FBQyxDQUFDO1NBQ1Y7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFqTEQsNEJBaUxDIn0=