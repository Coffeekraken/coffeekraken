import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
import __jsObjectToCssProperties from '../../../utils/jsObjectToCssProperties';
class postcssSugarPluginUiTerminalInterface extends __SInterface {
}
postcssSugarPluginUiTerminalInterface.definition = {};
export { postcssSugarPluginUiTerminalInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [`@sugar.ui.base(terminal);`];
    // bare
    vars.push(`
      &:before {
          content: '$';
          color: sugar.color(complementary);
      }

      @sugar.rhythm.vertical {
        ${__jsObjectToCssProperties(__theme().config('ui.terminal.rhythmVertical'))}
    } 

    `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVybWluYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0ZXJtaW5hbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUMzQyxPQUFPLHlCQUF5QixNQUFNLHdDQUF3QyxDQUFDO0FBRS9FLE1BQU0scUNBQXNDLFNBQVEsWUFBWTs7QUFDckQsZ0RBQVUsR0FBRyxFQUFFLENBQUM7QUFLM0IsT0FBTyxFQUFFLHFDQUFxQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTlELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFFckQsT0FBTztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7VUFPSix5QkFBeUIsQ0FDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLDRCQUE0QixDQUFDLENBQ2pEOzs7S0FHSixDQUFDLENBQUM7SUFFSCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9