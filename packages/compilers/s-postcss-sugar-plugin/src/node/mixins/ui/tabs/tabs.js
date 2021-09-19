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
        type: {
            type: 'Array<String>',
            splitChars: [',', ' '],
        },
        values: ['bare', 'lnf', 'grow', 'direction'],
        default: ['bare', 'lnf', 'grow', 'direction'],
    },
};
export { postcssSugarPluginUiTabInterface as interface };
export default function ({ params, atRule, applyNoScopes, replaceWith, }) {
    const finalParams = Object.assign({ style: __theme().config('ui.tabs.defaultStyle'), grow: false, direction: 'horizontal', focusOutline: true, scope: ['bare', 'lnf', 'grow', 'direction'] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
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

          & > * > * {
            @sugar.color.remap(ui, main);
          }

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
            @sugar.state.active {
              background-color: sugar.color(ui);
              color: sugar.color(ui, foreground);
            }
            @sugar.state.hover {
              background-color: sugar.color(ui, --lighten 5);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsTUFBTSxnQ0FBaUMsU0FBUSxZQUFZOztBQUNoRCwyQ0FBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUM7S0FDcEQ7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO1FBQ2xDLE9BQU8sRUFBRSxZQUFZO0tBQ3hCO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDO0tBQ3BEO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLGVBQWU7WUFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztTQUN6QjtRQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQztRQUM1QyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUM7S0FDaEQ7Q0FDSixDQUFDO0FBV04sT0FBTyxFQUFFLGdDQUFnQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXpELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBQ2IsV0FBVyxHQU1kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsRUFDL0MsSUFBSSxFQUFFLEtBQUssRUFDWCxTQUFTLEVBQUUsWUFBWSxFQUN2QixZQUFZLEVBQUUsSUFBSSxFQUNsQixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsSUFDeEMsTUFBTSxDQUNaLENBQUM7SUFDRixXQUFXLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFckQsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksV0FBVyxDQUFDLFlBQVksRUFBRTtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7O09BSVgsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O0tBS2IsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQztRQUVSLFdBQVcsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3hELENBQUMsQ0FBQzs7OztPQUlUO1lBQ08sQ0FBQyxDQUFDLEVBQ1Y7S0FDRCxDQUFDLENBQUM7S0FDRjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxRFgsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN2QixLQUFLLE9BQU8sQ0FBQztZQUNiO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7U0FVakIsQ0FBQyxDQUFDO2dCQUNLLE1BQU07U0FDYjtLQUNKO0lBRUQsdUZBQXVGO0lBQ3ZGLGtCQUFrQjtJQUNsQixZQUFZO0lBQ1osWUFBWTtJQUNaLGFBQWE7SUFDYixZQUFZO0lBQ1osMkJBQTJCO0lBQzNCLHlKQUF5SjtJQUN6SixRQUFRO0lBQ1IsNEJBQTRCO0lBQzVCLG1JQUFtSTtJQUNuSSxRQUFRO0lBQ1IsTUFBTTtJQUNOLE1BQU07SUFDTixJQUFJO0lBRUosSUFBSSxXQUFXLENBQUMsU0FBUyxLQUFLLFVBQVUsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN2RixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O0tBT2IsQ0FBQyxDQUFDO1FBQ0MsSUFBSSxXQUFXLENBQUMsU0FBUyxLQUFLLFVBQVUsRUFBRTtZQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7O1NBYWIsQ0FBQyxDQUFDO1NBQ0Y7S0FDSjtJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=