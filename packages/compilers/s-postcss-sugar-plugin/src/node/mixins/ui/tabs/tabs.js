import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiTabInterface extends __SInterface {
}
postcssSugarPluginUiTabInterface.definition = {
    style: {
        type: 'String',
        values: ['default', 'gradient'],
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
        values: ['bare', 'lnf', 'grow', 'style', 'direction'],
        default: ['bare', 'lnf', 'grow', 'style', 'direction'],
    },
};
export { postcssSugarPluginUiTabInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: __theme().config('ui.tabs.defaultStyle'), grow: false, direction: 'horizontal', scope: ['bare', 'lnf', 'grow', 'style', 'direction'] }, params);
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
      background-color: sugar.color(ui, surface);
      border-radius: sugar.theme(ui.tabs.borderRadius);
      box-shadow: sugar.theme(ui.tabs.depth);
      overflow: hidden;

        & > * {
          text-align: center;
          padding-inline: sugar.scalable(sugar.theme(ui.tabs.paddingInline));
         padding-block: sugar.scalable(sugar.theme(ui.tabs.paddingBlock));
          background-color: sugar.color(ui, surface);
          color: sugar.color(ui, foreground);
          transition: sugar.theme(ui.tabs.transition);
          cursor: pointer;
          display: block;      
        }
    `);
    }
    if (finalParams.style === 'default' && finalParams.scope.indexOf('style') !== -1) {
        vars.push(`
      & > dt,
      & > li,
      & > div {
        @sugar.state.hover {
          background-color: sugar.color(complementary);
          color: sugar.color(complementary, foreground);
        }
        @sugar.state.active {
          background-color: sugar.color(accent);
          color: sugar.color(accent, foreground);
        }          
      }
    `);
    }
    if (finalParams.style === 'gradient' && finalParams.scope.indexOf('style') !== -1) {
        vars.push(`
      & > dt,
      & > li,
      & > div,
      & > * {
        @sugar.state.hover {
          @sugar.gradient($start: sugar.color(complementary, gradientStart), $end: sugar.color(complementary, gradientEnd), $angle: 90deg, $type: linear);
        }
        @sugar.state.active {
          @sugar.gradient($start: sugar.color(accent, gradientStart), $end: sugar.color(accent, gradientEnd), $angle: 90deg, $type: linear);
        }          
      }
    `);
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRhYnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFFM0MsTUFBTSxnQ0FBaUMsU0FBUSxZQUFZOztBQUNoRCwyQ0FBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsQ0FBQztRQUMvQixPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDO0tBQ3BEO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELFNBQVMsRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQztRQUNsQyxPQUFPLEVBQUUsWUFBWTtLQUN4QjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxXQUFXLENBQUM7UUFDckQsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQztLQUN6RDtDQUNKLENBQUM7QUFVTixPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLEVBQy9DLElBQUksRUFBRSxLQUFLLEVBQ1gsU0FBUyxFQUFFLFlBQVksRUFDdkIsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFdBQVcsQ0FBQyxJQUNqRCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJYixDQUFDLENBQUM7S0FDRjtJQUVELElBQUksV0FBVyxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRVIsV0FBVyxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEQsQ0FBQyxDQUFDOzs7O09BSVQ7WUFDTyxDQUFDLENBQUMsRUFDVjtLQUNELENBQUMsQ0FBQztLQUNGO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0tBZ0JiLENBQUMsQ0FBQztLQUNGO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxLQUFLLFNBQVMsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM5RSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7O0tBYWIsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLEtBQUssVUFBVSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQy9FLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7OztLQVliLENBQUMsQ0FBQztLQUNGO0lBRUQsSUFBSSxXQUFXLENBQUMsU0FBUyxLQUFLLFVBQVUsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN2RixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7O0tBVWIsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9