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
       * @name       s-grid--${id}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * 
       * This class represent a layout of "<yellow>${layout}</yellow>"
       * 
       * @example     html
       * <div class="s-container s-grid--${id}">
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
      .s-grid--${id} {
        @sugar.layout.grid('${layout}');
      }
    `);
    });
    const spaces = __theme().config('space');
    Object.keys(spaces).forEach(spaceName => {
        const clsX = `s-grid-gutter-x--${spaceName}`.replace('-default', '');
        const clsY = `s-grid-gutter-y--${spaceName}`.replace('-default', '');
        const cls = `s-grid-gutter--${spaceName}`.replace('-default', '');
        vars.push(`
      /**
       * @name       ${clsX}
       * @namespace     sugar.css.layout
       * @type          CssClass
       * 
       * This class allows you to apply some left and right gutters on your s-grid items
       * 
       * @example     html
       * <div class="s-grid--123 ${clsX}">
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
      .${clsX} > * {
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
       * <div class="s-grid--123 ${clsY}">
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
        .${clsY} > * {
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
       * <div class="s-grid--123 ${cls}">
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
      .${cls} > * {
        padding: sugar.space(${spaceName});
      }
    `);
    });
    vars.push(`
     /**
       * @name       s-grid-gutter--between
       * @namespace     sugar.css.layout
       * @type          CssClass
       * 
       * This class allows you to specify that you want only gutters between grid items
       * 
       * @example     html
       * <div class="s-grid--123 s-grid-gutter--between">
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
      .s-grid-gutter--between > * {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhc3Nlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsYXNzZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFFL0QsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZOztBQUMxRCxtREFBVSxHQUFHLEVBQUUsQ0FBQztBQUt6QixPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7OztFQWNWLENBQUMsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUVsRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1FBQ2xDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMzQixNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUN4RCxJQUFJLENBQUMsSUFBSSxDQUFDOzsrQkFFaUIsRUFBRTs7OztxREFJb0IsTUFBTTs7OzJDQUdoQixFQUFFO2NBQy9CLEtBQUssQ0FBQyxTQUFTLENBQUM7YUFDcEIsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDWCxPQUFPLHFCQUFxQixHQUFHLFFBQVEsQ0FBQztRQUMxQyxDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7aUJBTUgsRUFBRTs4QkFDVyxNQUFNOztLQUUvQixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sTUFBTSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUV6QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtRQUV0QyxNQUFNLElBQUksR0FBRyxvQkFBb0IsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUNwRSxNQUFNLElBQUksR0FBRyxvQkFBb0IsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUNwRSxNQUFNLEdBQUcsR0FBRyxrQkFBa0IsU0FBUyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUVqRSxJQUFJLENBQUMsSUFBSSxDQUFDOzt1QkFFUyxJQUFJOzs7Ozs7O21DQU9RLElBQUk7Y0FDekIsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNaLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1gsT0FBTyxxQkFBcUIsR0FBRyxRQUFRLENBQUM7UUFDMUMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O1NBTVgsSUFBSTtvQ0FDdUIsU0FBUztxQ0FDUixTQUFTOztLQUV6QyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDOzt1QkFFUyxJQUFJOzs7Ozs7O21DQU9RLElBQUk7Y0FDekIsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNaLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1gsT0FBTyxxQkFBcUIsR0FBRyxRQUFRLENBQUM7UUFDMUMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O1dBTVQsSUFBSTttQ0FDb0IsU0FBUztzQ0FDTixTQUFTOztLQUUxQyxDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDOzt1QkFFUyxHQUFHOzs7Ozs7O21DQU9TLEdBQUc7Y0FDeEIsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUNaLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1gsT0FBTyxxQkFBcUIsR0FBRyxRQUFRLENBQUM7UUFDMUMsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O1NBTVgsR0FBRzsrQkFDbUIsU0FBUzs7S0FFbkMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7O2NBVUUsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNaLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ1gsT0FBTyxxQkFBcUIsR0FBRyxRQUFRLENBQUM7SUFDMUMsQ0FBQyxDQUFDO1NBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7R0FjakIsQ0FBQyxDQUFDO0lBR0gsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==