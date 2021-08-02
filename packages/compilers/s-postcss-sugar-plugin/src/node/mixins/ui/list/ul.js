import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';
class postcssSugarPluginUiListUlInterface extends __SInterface {
}
postcssSugarPluginUiListUlInterface.definition = {
    icon: {
        type: 'Boolean',
        default: false
    }
};
export { postcssSugarPluginUiListUlInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ icon: false }, params);
    const vars = [];
    let iconSelector = '&:before';
    if (finalParams.icon) {
        iconSelector = '& > i:first-child';
    }
    vars.push(`
      position: relative;

      & > li,
      & > dt {
        display: block !important;
        padding-left: 1em;
        margin-bottom: 0.5em;
        
        & > ul,
        & > ol,
        & > dl {
          margin-top: 0.5em;
        }

        ${iconSelector} {  
          ${!finalParams.icon ? `
              content: '●';
              margin-top: 0.25em;
              font-size: 0.7em;
          ` : `
              margin-top: 0.25em;
              font-size: 0.8em;
          `}    
          display: inline-block;
          position: absolute;
          left: 0.5em;
          transform: translateX(-50%);
          color: sugar.color(ui);
        }

        ${finalParams.icon ? `
          padding-left: 1.5em;
          &:before {
            content: ' ' !important;
          }
        ` : ''}
        
      }

      @sugar.rhythm.vertical {
        ${__jsObjectToCssProperties(__theme().config('ui.list.:rhythmVertical'))}
    } 
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLHlCQUF5QixNQUFNLHdDQUF3QyxDQUFDO0FBRS9FLE1BQU0sbUNBQW9DLFNBQVEsWUFBWTs7QUFDckQsOENBQVUsR0FBRztJQUNoQixJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0NBQ0osQ0FBQztBQU9KLE9BQU8sRUFBRSxtQ0FBbUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU1RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0csTUFBTSxXQUFXLG1CQUNmLElBQUksRUFBRSxLQUFLLElBQ1IsTUFBTSxDQUNWLENBQUM7SUFFSixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxZQUFZLEdBQUcsVUFBVSxDQUFDO0lBQzlCLElBQUksV0FBVyxDQUFDLElBQUksRUFBRTtRQUNsQixZQUFZLEdBQUcsbUJBQW1CLENBQUM7S0FDdEM7SUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7VUFlRixZQUFZO1lBQ1YsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7OztXQUlyQixDQUFBLENBQUMsQ0FBQzs7O1dBR0Y7Ozs7Ozs7O1VBUUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Ozs7O1NBS3BCLENBQUEsQ0FBQyxDQUFDLEVBQUU7Ozs7O1VBS0gseUJBQXlCLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHlCQUF5QixDQUFDLENBQUM7O0dBRTdFLENBQUMsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=