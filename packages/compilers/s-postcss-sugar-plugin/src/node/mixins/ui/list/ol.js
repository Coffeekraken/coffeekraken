import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';
class postcssSugarPluginUiListOlMixinInterface extends __SInterface {
}
postcssSugarPluginUiListOlMixinInterface.definition = {};
export { postcssSugarPluginUiListOlMixinInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const iconSelector = '&:before';
    vars.push(`
      position: relative;
      counter-reset: list-ol; 

      & > li,
      & > dt {
        display: block !important;
        padding-left: 1.5em;
        margin-bottom: 0.5em;
      
        &:before {  
          counter-increment: list-ol;    
          content: counter(list-ol);
          font-size: 1em;
          display: inline-block;
          position: absolute;
          left: 0.5em;
          transform: translateX(-50%);
          color: sugar.color(ui);
          text-align: right;
          width: 2ch;
        }          
      }

      &.s-rhythm--vertical,
      .s-rhythm--vertical & {
        ${__jsObjectToCssProperties(__theme().config('ui.list.:rhythmVertical'))}
     } 
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2wuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJvbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLHlCQUF5QixNQUFNLHdDQUF3QyxDQUFDO0FBRS9FLE1BQU0sd0NBQXlDLFNBQVEsWUFBWTs7QUFDMUQsbURBQVUsR0FBRyxFQUNuQixDQUFDO0FBTUosT0FBTyxFQUFFLHdDQUF3QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRWpFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDRyxNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFSixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxZQUFZLEdBQUcsVUFBVSxDQUFDO0lBRWhDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VBMEJGLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOztHQUU3RSxDQUFDLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9