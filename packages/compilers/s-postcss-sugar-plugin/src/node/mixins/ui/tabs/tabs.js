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
    scope: {
        type: 'Array<String>',
        values: ['bare', 'lnf', 'grow', 'direction'],
        default: ['bare', 'lnf', 'grow', 'direction'],
    },
};
export { postcssSugarPluginUiTabInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: __theme().config('ui.tabs.defaultStyle'), grow: false, direction: 'horizontal', scope: ['bare', 'lnf', 'grow', 'direction'] }, params);
    const vars = [];
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
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
          /** background-color: sugar.color(ui, surface); */
          border-radius: sugar.theme(ui.tabs.borderRadius);
          overflow: hidden;
          user-select: none;

            & > * {
              text-align: center;
              padding-inline: sugar.scalable(sugar.theme(ui.tabs.paddingInline));
              padding-block: sugar.scalable(sugar.theme(ui.tabs.paddingBlock));
              transition: sugar.theme(ui.tabs.transition);
              cursor: pointer;
              display: block;      
            }
      `);
        if (finalParams.direction !== 'vertical') {
            vars.push(`
          & > *:last-child:not([dir="rtl"] & > *) {
            border-top-right-radius: sugar.theme(ui.tabs.borderRadius);
            border-bottom-right-radius: sugar.theme(ui.tabs.borderRadius);
          }
          [dir="rtl"] & > *:last-child,
          &[dir="rtl"] > *:last-child {
            border-top-left-radius: sugar.theme(ui.tabs.borderRadius);
            border-bottom-left-radius: sugar.theme(ui.tabs.borderRadius);
          }
        `);
        }
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`
          & > dt,
          & > li,
          & > div {
            @sugar.state.hover {
              background-color: sugar.color(ui, --alpha 0.4);
            }
            @sugar.state.focus {
              background-color: sugar.color(ui, --alpha 0.3);
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

      & > dt,
      & > li,
      & > div,
      & > * {
        display: block;
        text-align: inherit;
      }
    `);
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsTUFBTSxnQ0FBaUMsU0FBUSxZQUFZOztBQUNoRCwyQ0FBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUM7S0FDcEQ7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO1FBQ2xDLE9BQU8sRUFBRSxZQUFZO0tBQ3hCO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDO1FBQzVDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFdBQVcsQ0FBQztLQUNoRDtDQUNKLENBQUM7QUFVTixPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEVBQy9DLElBQUksRUFBRSxLQUFLLEVBQ1gsU0FBUyxFQUFFLFlBQVksRUFDdkIsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsV0FBVyxDQUFDLElBQ3hDLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztLQUliLENBQUMsQ0FBQztLQUNGO0lBRUQsSUFBSSxXQUFXLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzlELElBQUksQ0FBQyxJQUFJLENBQUM7UUFFUixXQUFXLENBQUMsSUFBSSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN4RCxDQUFDLENBQUM7Ozs7T0FJVDtZQUNPLENBQUMsQ0FBQyxFQUNWO0tBQ0QsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7O09BY1gsQ0FBQyxDQUFDO1FBQ0QsSUFBSSxXQUFXLENBQUMsU0FBUyxLQUFLLFVBQVUsRUFBRTtZQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7O1NBVWIsQ0FBQyxDQUFDO1NBQ0Y7S0FDSjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLEtBQUssT0FBTyxDQUFDO1lBQ2I7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O1NBZWpCLENBQUMsQ0FBQztnQkFDSyxNQUFNO1NBQ2I7S0FDSjtJQUVELHVGQUF1RjtJQUN2RixrQkFBa0I7SUFDbEIsWUFBWTtJQUNaLFlBQVk7SUFDWixhQUFhO0lBQ2IsWUFBWTtJQUNaLDJCQUEyQjtJQUMzQix5SkFBeUo7SUFDekosUUFBUTtJQUNSLDRCQUE0QjtJQUM1QixtSUFBbUk7SUFDbkksUUFBUTtJQUNSLE1BQU07SUFDTixNQUFNO0lBQ04sSUFBSTtJQUVKLElBQUksV0FBVyxDQUFDLFNBQVMsS0FBSyxVQUFVLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDdkYsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7OztLQVViLENBQUMsQ0FBQztLQUNGO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==