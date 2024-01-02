import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          tabs
 * @as            @s.ui.tabs
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
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet     @s.ui.tabs
 *
 * @example     css
 * .my-tabs {
 *    @s.ui.tabs;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiTabInterface extends __SInterface {
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
                default: __STheme.current.get('ui.tabs.outline'),
            },
        };
    }
}
export { SSugarcssPluginUiTabInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ grow: false, fill: false, direction: 'horizontal', outline: true }, params);
    const vars = [];
    if (finalParams.outline) {
        vars.push(`
        & > *:focus:not(:hover) {
          @s.outline;
        }
      `);
    }
    vars.push(`@s.scope 'bare' {`);
    vars.push(`
        font-size: s.scalable(1rem);
        display: inline-flex;
        align-items: center;
        flex-wrap: nowrap;

        & > template {
          display: none;
        }
    `);
    if (finalParams.grow) {
        vars.push(`
          display: flex;
                
          & > * {
            flex-grow: 1;
          }
        `);
    }
    vars.push('}');
    vars.push(`@s.scope 'lnf' {`);
    if (finalParams.fill) {
        vars.push(`
        background: s.color(current, surface);
      `);
    }
    vars.push(`
          user-select: none;

          & > * {
            text-align: center;
            padding-inline: s.padding(ui.tabs.paddingInline);
            padding-block: s.padding(ui.tabs.paddingBlock);
            transition: s.theme(ui.tabs.transition);
            cursor: pointer;
            display: block;      
          }
      `);
    vars.push(`
          & > * {
            @s.state.active {
              background-color: s.color(current);

              &, * {
                color: s.color(current, foreground);
              }
            }
            @s.state.hover {
              background-color: s.color(current, --lighten 5);

              &, * {
                color: s.color(current, foreground);
              }
            }       
          }
        `);
    vars.push(`

                border-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));

                & > *:first-child,
                & > template + * {
                  border-top-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));
                  border-bottom-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }
                & > *:last-child {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));
                  border-bottom-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));
                }

                [dir="rtl"] & > *:first-child,
                &[dir="rtl"] > *:first-child,
                [dir="rtl"] & > template + *,
                &[dir="rtl"] > template + * {
                  border-top-left-radius: 0;
                  border-bottom-left-radius: 0;
                  border-top-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));
                  border-bottom-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));
                }
                [dir="rtl"] & > *:last-child,
                &[dir="rtl"] > *:last-child {
                  border-top-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));
                  border-bottom-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius));
                  border-top-right-radius: 0;
                  border-bottom-right-radius: 0;
                }

                & > *:first-child:last-child,
                & > template + *:last-child {
                  border-top-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
                  border-bottom-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
                  border-top-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
                  border-bottom-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
                }
              `);
    vars.push('}');
    vars.push(`@s.scope 'bare' {`);
    if (finalParams.direction === 'vertical') {
        vars.push(`
          display: block;

          & > * {
            display: block;
            text-align: inherit;
          }
        `);
        vars.push(`
            & > *:first-child,
            & > template + * {
              border-top-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
              border-bottom-left-radius: 0 !important;
              border-top-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
              border-bottom-right-radius: 0 !important;
            }
            & > *:last-child {
              border-top-left-radius: 0 !important;
              border-bottom-left-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
              border-top-right-radius: 0 !important;
              border-bottom-right-radius: var(--s-shape, s.border.radius(ui.tabs.borderRadius)) !important;
            }
        `);
    }
    vars.push('}');
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBRUgsTUFBTSw2QkFBOEIsU0FBUSxZQUFZO0lBQ3BELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLHNFQUFzRTtnQkFDMUUsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLDJFQUEyRTtnQkFDL0UsT0FBTyxFQUFFLEtBQUs7YUFDakI7WUFDRCxTQUFTLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUFFLG9DQUFvQztnQkFDakQsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQztnQkFDbEMsT0FBTyxFQUFFLFlBQVk7YUFDeEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUNQLDJEQUEyRDtnQkFDL0QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO2FBQ25EO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVNELE9BQU8sRUFBRSw2QkFBNkIsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV0RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxLQUFLLEVBQ1gsSUFBSSxFQUFFLEtBQUssRUFDWCxTQUFTLEVBQUUsWUFBWSxFQUN2QixPQUFPLEVBQUUsSUFBSSxJQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7O09BSVgsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFL0IsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7O0tBU1QsQ0FBQyxDQUFDO0lBRUgsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFO1FBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztTQU1ULENBQUMsQ0FBQztLQUNOO0lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUU5QixJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUU7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQzs7T0FFWCxDQUFDLENBQUM7S0FDSjtJQUVELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7O09BV1AsQ0FBQyxDQUFDO0lBRUwsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FpQkwsQ0FBQyxDQUFDO0lBRVAsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBMENDLENBQUMsQ0FBQztJQUViLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFFL0IsSUFBSSxXQUFXLENBQUMsU0FBUyxLQUFLLFVBQVUsRUFBRTtRQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O1NBT1QsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7U0FjVCxDQUFDLENBQUM7S0FDTjtJQUVELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=