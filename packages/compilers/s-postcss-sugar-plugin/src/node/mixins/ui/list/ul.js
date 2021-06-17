import __SInterface from '@coffeekraken/s-interface';
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
    @sugar.scope.lnf {
        position: relative;

        & > li,
        & > dt {
          display: block !important;
          padding-left: 1em;
          margin-bottom: 0.5em;
        
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
            color: sugar.color(accent);
          }

          ${finalParams.icon ? `
            padding-left: 1.5em;
            &:before {
              content: ' ' !important;
            }
          ` : ''}
          
        }
    }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1bC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUtyRCxNQUFNLG1DQUFvQyxTQUFRLFlBQVk7O0FBQ3JELDhDQUFVLEdBQUc7SUFDaEIsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNqQjtDQUNKLENBQUM7QUFPSixPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNHLE1BQU0sV0FBVyxtQkFDZixJQUFJLEVBQUUsS0FBSyxJQUNSLE1BQU0sQ0FDVixDQUFDO0lBRUosTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksWUFBWSxHQUFHLFVBQVUsQ0FBQztJQUM5QixJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUU7UUFDbEIsWUFBWSxHQUFHLG1CQUFtQixDQUFDO0tBQ3RDO0lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7OztZQVVBLFlBQVk7Y0FDVixDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7O2FBSXJCLENBQUEsQ0FBQyxDQUFDOzs7YUFHRjs7Ozs7Ozs7WUFRRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7Ozs7V0FLcEIsQ0FBQSxDQUFDLENBQUMsRUFBRTs7OztHQUlaLENBQUMsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=