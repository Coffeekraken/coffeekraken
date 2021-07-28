import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';
class postcssSugarPluginUiListInteractiveInterface extends __SInterface {
}
postcssSugarPluginUiListInteractiveInterface.definition = {};
export { postcssSugarPluginUiListInteractiveInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    //   const finalParams: IPostcssSugarPluginUiListInteractiveParams = {
    //     color: 'primary',
    //     ...params
    //   };
    const vars = [];
    vars.push(`
      background-color: sugar.color(surface);

      & > li,
      & > dt {
        @sugar.ui.base(list);
        display: block !important;
        
        .s-highlight {
          background-color: sugar.color(accent:highlight, background) !important;
          color: sugar.color(accent:highlight, foreground) !important;
        }
      }

      @sugar.rhythm.vertical {
        ${__jsObjectToCssProperties(__theme().config('ui.list.:rhythmVertical'))}
      } 

  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnRlcmFjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLHlCQUF5QixNQUFNLHdDQUF3QyxDQUFDO0FBRS9FLE1BQU0sNENBQTZDLFNBQVEsWUFBWTs7QUFDOUQsdURBQVUsR0FBRyxFQUNuQixDQUFDO0FBTUosT0FBTyxFQUFFLDRDQUE0QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXJFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxzRUFBc0U7SUFDdEUsd0JBQXdCO0lBQ3hCLGdCQUFnQjtJQUNoQixPQUFPO0lBRVAsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7OztVQWVGLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOzs7R0FHN0UsQ0FBQyxDQUFDO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==