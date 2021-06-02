import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __unique from '@coffeekraken/sugar/shared/array/unique';
class postcssSugarPluginLayoutClassesInterface extends __SInterface {
}
postcssSugarPluginLayoutClassesInterface.definition = {};
export { postcssSugarPluginLayoutClassesInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    vars.push(`/**
  * @name          s-container
  * @namespace          sugar.css.layout
  * @type               CssClass
  * 
  * This class allows you to apply the container styling to any HTMLElement
  * 
  * @example        html
  * <div class="s-container">
  *     <h1 class="s-h1">Hello world</h1>
  * </div>
  */
.s-container {
    @sugar.layout.container;
}`);
    const layouts = __theme().config('layout.layout');
    Object.keys(layouts).forEach((id) => {
        const layout = layouts[id];
        const colsCount = __unique(layout.split(/\n\s/)).length;
        vars.push(`
      /**
       * @name       s-grid-${id}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * 
       * This class represent a layout of "<yellow>${layout}</yellow>"
       * 
       * @example     html
       * <div class="s-container">
       *    ${Array(colsCount)
            .map((idx) => {
            return `<div>I'm the area ${idx}</div>`;
        })
            .join('\n')}
       * </div>
       * 
       * @since     2.0.0
       * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      .s-grid-${id} {
        @sugar.layout.grid('${layout}');
      }
    `);
    });
    const spaces = __theme().config('space');
    Object.keys(spaces).forEach(spaceName => {
        const clsX = `s-grid-gutter-x-${spaceName}`.replace('-default', '');
        const clsY = `s-grid-gutter-y-${spaceName}`.replace('-default', '');
        const cls = `s-grid-gutter-${spaceName}`.replace('-default', '');
        vars.push(`
      /**
       * @name       ${clsX}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * 
       * This class allows you to apply some left and right gutters on your s-grid items
       * 
       * @example     html
       * <div class="s-grid-123 ${clsX}">
       *    ${Array(3)
            .map((idx) => {
            return `<div>I'm the area ${idx}</div>`;
        })
            .join('\n')}
       * </div>
       * 
       * @since     2.0.0
       * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      [class*="${clsX}"] > * {
        padding-left: sugar.space(${spaceName});
        padding-right: sugar.space(${spaceName});
      }
    `);
        vars.push(`
      /**
       * @name       ${clsY}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * 
       * This class allows you to apply some left and right gutters on your s-grid items
       * 
       * @example     html
       * <div class="s-grid-123 ${clsY}">
       *    ${Array(3)
            .map((idx) => {
            return `<div>I'm the area ${idx}</div>`;
        })
            .join('\n')}
       * </div>
       * 
       * @since     2.0.0
       * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
        [class*="${clsY}"] > * {
        padding-top: sugar.space(${spaceName});
        padding-bottom: sugar.space(${spaceName});
      }
    `);
        vars.push(`
      /**
       * @name       ${cls}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * 
       * This class allows you to apply some left and right gutters on your s-grid items
       * 
       * @example     html
       * <div class="s-grid-123 ${cls}">
       *    ${Array(3)
            .map((idx) => {
            return `<div>I'm the area ${idx}</div>`;
        })
            .join('\n')}
       * </div>
       * 
       * @since     2.0.0
       * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      [class*="${cls}"]:not([class*="s-grid-gutter-x"]).not([class*="s-grid-gutter-y"]) > * {
        padding: sugar.space(${spaceName});
      }
    `);
    });
    vars.push(`
     /**
       * @name       s-grid-gutter:between
       * @namespace     sugar.css.layout
       * @type          CssClass
       * 
       * This class allows you to specify that you want only gutters between grid items
       * 
       * @example     html
       * <div class="s-grid-123 s-grid-gutter:between">
       *    ${Array(3)
        .map((idx) => {
        return `<div>I'm the area ${idx}</div>`;
    })
        .join('\n')}
       * </div>
       * 
       * @since     2.0.0
       * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
       */
      [class*="s-grid-gutter"][class*=":between"] > * {
        &:first-child {
          padding-left: 0 !important;
        }
        &:last-child {
          padding-right: 0 !important;
        }
      }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFFL0QsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZOztBQUMxRCxtREFBVSxHQUFHLEVBQUUsQ0FBQztBQUt6QixPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7OztFQWNWLENBQUMsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUVsRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1FBQ2xDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDOzs4QkFFZ0IsRUFBRTs7OztxREFJcUIsTUFBTTs7OztjQUk3QyxLQUFLLENBQUMsU0FBUyxDQUFDO2FBQ3BCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1gsT0FBTyxxQkFBcUIsR0FBRyxRQUFRLENBQUM7UUFDMUMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O2dCQU1KLEVBQUU7OEJBQ1ksTUFBTTs7S0FFL0IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLE1BQU0sR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFekMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFFdEMsTUFBTSxJQUFJLEdBQUcsbUJBQW1CLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkUsTUFBTSxJQUFJLEdBQUcsbUJBQW1CLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkUsTUFBTSxHQUFHLEdBQUcsaUJBQWlCLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFFaEUsSUFBSSxDQUFDLElBQUksQ0FBQzs7dUJBRVMsSUFBSTs7Ozs7OztrQ0FPTyxJQUFJO2NBQ3hCLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDWixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNYLE9BQU8scUJBQXFCLEdBQUcsUUFBUSxDQUFDO1FBQzFDLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztpQkFNSCxJQUFJO29DQUNlLFNBQVM7cUNBQ1IsU0FBUzs7S0FFekMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7dUJBRVMsSUFBSTs7Ozs7OztrQ0FPTyxJQUFJO2NBQ3hCLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDWixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNYLE9BQU8scUJBQXFCLEdBQUcsUUFBUSxDQUFDO1FBQzFDLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OzttQkFNRCxJQUFJO21DQUNZLFNBQVM7c0NBQ04sU0FBUzs7S0FFMUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7dUJBRVMsR0FBRzs7Ozs7OztrQ0FPUSxHQUFHO2NBQ3ZCLEtBQUssQ0FBQyxDQUFDLENBQUM7YUFDWixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNYLE9BQU8scUJBQXFCLEdBQUcsUUFBUSxDQUFDO1FBQzFDLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OztpQkFNSCxHQUFHOytCQUNXLFNBQVM7O0tBRW5DLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7OztjQVVFLEtBQUssQ0FBQyxDQUFDLENBQUM7U0FDWixHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUNYLE9BQU8scUJBQXFCLEdBQUcsUUFBUSxDQUFDO0lBQzFDLENBQUMsQ0FBQztTQUNELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7O0dBY2pCLENBQUMsQ0FBQztJQUdILFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=