import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiTabInterface extends __SInterface {
}
postcssSugarPluginUiTabInterface.definition = {
    style: {
        type: 'String',
        values: ['solid'],
        default: __theme().config('ui.tabs.defaultStyle'),
    },
    grow: {
        type: 'Boolean',
        default: false,
    },
    direction: {
        type: 'String',
        values: ['vertical', 'horizontal'],
        default: 'horizontal',
    },
    focusOutline: {
        type: 'Boolean',
        default: __theme().config('ui.tabs.focusOutline'),
    },
    scope: {
        type: 'Array<String>',
        values: ['bare', 'lnf', 'grow', 'direction'],
        default: ['bare', 'lnf', 'grow', 'direction'],
    },
};
export { postcssSugarPluginUiTabInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: __theme().config('ui.tabs.defaultStyle'), grow: false, direction: 'horizontal', focusOutline: true, scope: ['bare', 'lnf', 'grow', 'direction'] }, params);
    const vars = [];
    if (finalParams.focusOutline) {
        vars.push(`
        & > * {
          @sugar.state.focusOutline;
        }
      `);
    }
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        font-size: sugar.scalable(1rem);
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
          /** background-color: sugar.color(ui, surface); */
          border-radius: sugar.theme(ui.tabs.borderRadius);
          user-select: none;

            & > * {
              text-align: center;
              padding-inline: sugar.theme(ui.tabs.paddingInline);
              padding-block: sugar.theme(ui.tabs.paddingBlock);
              transition: sugar.theme(ui.tabs.transition);
              cursor: pointer;
              display: block;      
            }

            & > *:first-child {
              border-top-left-radius: sugar.theme(ui.tabs.borderRadius);
              border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius);
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
            }
            & > *:last-child {
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
              border-top-right-radius: sugar.theme(ui.tabs.borderRadius);
              border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius);
            }

            [dir="rtl"] & > *:first-child,
            &[dir="rtl"] > *:first-child {
              border-top-left-radius: 0;
              border-bottom-left-radius: 0;
              border-top-right-radius: sugar.theme(ui.tabs.borderRadius);
              border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius);
            }
            [dir="rtl"] & > *:last-child,
            &[dir="rtl"] > *:last-child {
              border-top-left-radius: sugar.theme(ui.tabs.borderRadius);
              border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius);
              border-top-right-radius: 0;
              border-bottom-right-radius: 0;
            }

            & > *:first-child:last-child {
              border-top-left-radius: sugar.theme(ui.tabs.borderRadius) !important;
              border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius) !important;
              border-top-right-radius: sugar.theme(ui.tabs.borderRadius) !important;
              border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius) !important;
            }

      `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`
          & > * {
            @sugar.state.hover {
              background-color: sugar.color(ui, --alpha 0.4);
            }
            @sugar.state.active {
              background-color: sugar.color(ui);
              color: sugar.color(ui, foreground);
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
    //       @sugar.gradient($start: sugar.color(ui, gradientStart), $end: sugar.color(ui, gradientEnd), $angle: 90deg, $type: linear);
    //     }
    //   }
    // `);
    // }
    if (finalParams.direction === 'vertical' && finalParams.scope.indexOf('direction') !== -1) {
        vars.push(`
      display: block;

      & > * {
        display: block;
        text-align: inherit;
      }
    `);
        if (finalParams.direction === 'vertical') {
            vars.push(`
          & > *:first-child {
              border-top-left-radius: sugar.theme(ui.tabs.borderRadius) !important;
              border-bottom-left-radius: 0 !important;
              border-top-right-radius: sugar.theme(ui.tabs.borderRadius) !important;
              border-bottom-right-radius: 0 !important;
            }
            & > *:last-child {
              border-top-left-radius: 0 !important;
              border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius) !important;
              border-top-right-radius: 0 !important;
              border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius) !important;
            }
        `);
        }
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsTUFBTSxnQ0FBaUMsU0FBUSxZQUFZOztBQUNoRCwyQ0FBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUM7S0FDcEQ7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO1FBQ2xDLE9BQU8sRUFBRSxZQUFZO0tBQ3hCO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDO0tBQ3BEO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDO1FBQzVDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQztLQUNoRDtDQUNKLENBQUM7QUFXTixPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEVBQy9DLElBQUksRUFBRSxLQUFLLEVBQ1gsU0FBUyxFQUFFLFlBQVksRUFDdkIsWUFBWSxFQUFFLElBQUksRUFDbEIsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLElBQ3hDLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksV0FBVyxDQUFDLFlBQVksRUFBRTtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7O09BSVgsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS2IsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQztRQUVSLFdBQVcsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQzs7OztPQUlUO1lBQ08sQ0FBQyxDQUFDLEVBQ1Y7S0FDRCxDQUFDLENBQUM7S0FDRjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWlEWCxDQUFDLENBQUM7S0FDSjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLEtBQUssT0FBTyxDQUFDO1lBQ2I7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7OztTQVVqQixDQUFDLENBQUM7Z0JBQ0ssTUFBTTtTQUNiO0tBQ0o7SUFFRCx1RkFBdUY7SUFDdkYsa0JBQWtCO0lBQ2xCLFlBQVk7SUFDWixZQUFZO0lBQ1osYUFBYTtJQUNiLFlBQVk7SUFDWiwyQkFBMkI7SUFDM0IseUpBQXlKO0lBQ3pKLFFBQVE7SUFDUiw0QkFBNEI7SUFDNUIsbUlBQW1JO0lBQ25JLFFBQVE7SUFDUixNQUFNO0lBQ04sTUFBTTtJQUNOLElBQUk7SUFFSixJQUFJLFdBQVcsQ0FBQyxTQUFTLEtBQUssVUFBVSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3ZGLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7S0FPYixDQUFDLENBQUM7UUFDQyxJQUFJLFdBQVcsQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUFFO1lBQ3RDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7U0FhYixDQUFDLENBQUM7U0FDRjtLQUNKO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==