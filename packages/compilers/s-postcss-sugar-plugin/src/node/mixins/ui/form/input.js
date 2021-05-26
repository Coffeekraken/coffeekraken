import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
class postcssSugarPluginUiFormInputInterface extends __SInterface {
}
postcssSugarPluginUiFormInputInterface.definition = {
    style: {
        type: 'String',
        values: ['default'],
        default: 'default'
    }
};
export { postcssSugarPluginUiFormInputInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ style: 'default' }, params);
    const vars = [];
    // bare
    vars.push(`
      @sugar.scope.bare {
        display: inline-block;
        padding: ${__themeVar('ui.form.padding')};
      }
    `);
    // lnf
    vars.push(`
      @sugar.scope.lnf {
  `);
    vars.push(`
      border-radius: ${__themeVar('ui.form.borderRadius')};
      transition: ${__themeVar('ui.form.transition')};
  `);
    switch (finalParams.style) {
        default:
            vars.push(`
          color: sugar.color(ui, text);
          background-color: sugar.color(ui, surface);
          padding: ${__themeVar('ui.form.padding')};
          border: sugar.color(ui) solid 1px;
          @sugar.depth(10);

          &:hover {
            @sugar.depth(20);
            border: sugar.color(accent) solid 2px;
          }
        `);
            break;
    }
    vars.push('}');
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUlqRCxNQUFNLHNDQUF1QyxTQUFRLFlBQVk7O0FBQ3hELGlEQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDbkIsT0FBTyxFQUFFLFNBQVM7S0FDbkI7Q0FDRixDQUFDO0FBT0osT0FBTyxFQUFFLHNDQUFzQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsS0FBSyxFQUFFLFNBQVMsSUFDYixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7O21CQUdPLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQzs7S0FFM0MsQ0FBQyxDQUFDO0lBRUwsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUM7O0dBRVQsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzt1QkFDVyxVQUFVLENBQUMsc0JBQXNCLENBQUM7b0JBQ3JDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQztHQUNqRCxDQUFDLENBQUM7SUFFSCxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDekI7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7cUJBR0ssVUFBVSxDQUFDLGlCQUFpQixDQUFDOzs7Ozs7OztTQVF6QyxDQUFDLENBQUM7WUFDTCxNQUFNO0tBQ1Q7SUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==