import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';
class postcssSugarPluginUiListUlInterface extends __SInterface {
}
postcssSugarPluginUiListUlInterface.definition = {
    icon: {
        type: 'Boolean',
        default: false,
    },
};
export { postcssSugarPluginUiListUlInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
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
          ${!finalParams.icon
        ? `
              content: '●';
              margin-top: 0.25em;
              font-size: 0.7em;
          `
        : `
              margin-top: 0.25em;
              font-size: 0.8em;
          `}    
          display: inline-block;
          position: absolute;
          left: 0.5em;
          transform: translateX(-50%);
          color: sugar.color(current);
        }

        ${finalParams.icon
        ? `
          padding-left: 1.5em;
          &:before {
            content: ' ' !important;
          }
        `
        : ''}
        
      }

      @sugar.rhythm.vertical {
        ${__jsObjectToCssProperties(__theme().config('ui.list.:rhythmVertical'))}
    } 
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLHlCQUF5QixNQUFNLHdDQUF3QyxDQUFDO0FBRS9FLE1BQU0sbUNBQW9DLFNBQVEsWUFBWTs7QUFDbkQsOENBQVUsR0FBRztJQUNoQixJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0NBQ0osQ0FBQztBQU9OLE9BQU8sRUFBRSxtQ0FBbUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU1RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxLQUFLLElBQ1IsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxZQUFZLEdBQUcsVUFBVSxDQUFDO0lBQzlCLElBQUksV0FBVyxDQUFDLElBQUksRUFBRTtRQUNsQixZQUFZLEdBQUcsbUJBQW1CLENBQUM7S0FDdEM7SUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7VUFlSixZQUFZO1lBRVIsQ0FBQyxXQUFXLENBQUMsSUFBSTtRQUNiLENBQUMsQ0FBQzs7OztXQUlUO1FBQ08sQ0FBQyxDQUFDOzs7V0FJVjs7Ozs7Ozs7VUFTRSxXQUFXLENBQUMsSUFBSTtRQUNaLENBQUMsQ0FBQzs7Ozs7U0FLVDtRQUNPLENBQUMsQ0FBQyxFQUNWOzs7OztVQUtFLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDOztHQUU3RSxDQUFDLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9