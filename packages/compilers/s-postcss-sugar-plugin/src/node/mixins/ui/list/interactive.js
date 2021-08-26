import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';
class postcssSugarPluginUiListInteractiveInterface extends __SInterface {
}
postcssSugarPluginUiListInteractiveInterface.definition = {};
export { postcssSugarPluginUiListInteractiveInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    //   const finalParams: IPostcssSugarPluginUiListInteractiveParams = {
    //     color: 'primary',
    //     ...params
    //   };
    const vars = [];
    vars.push(`

      & li,
      & dt {
        @sugar.ui.base(list);
        background: none;
        border:none;
        display: block !important;
        
        @sugar.state.hover {
          background-color: sugar.color(ui, --alpha 0.5);
          color: sugar.color(ui, foreground);
        }
        @sugar.state.active {
          background-color: sugar.color(ui);
          color: sugar.color(ui, foreground);
        }
        @sugar.state.focus {
          background-color: sugar.color(ui, --alpha 0.5);
          color: sugar.color(ui, foreground);
        }
      }

      @sugar.rhythm.vertical {
        ${__jsObjectToCssProperties(__theme().config('ui.list.:rhythmVertical'))}
      } 

  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZXJhY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnRlcmFjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLHlCQUF5QixNQUFNLHdDQUF3QyxDQUFDO0FBRS9FLE1BQU0sNENBQTZDLFNBQVEsWUFBWTs7QUFDNUQsdURBQVUsR0FBRyxFQUFFLENBQUM7QUFLM0IsT0FBTyxFQUFFLDRDQUE0QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXJFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxzRUFBc0U7SUFDdEUsd0JBQXdCO0lBQ3hCLGdCQUFnQjtJQUNoQixPQUFPO0lBRVAsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQXdCSix5QkFBeUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMseUJBQXlCLENBQUMsQ0FBQzs7O0dBRzdFLENBQUMsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=