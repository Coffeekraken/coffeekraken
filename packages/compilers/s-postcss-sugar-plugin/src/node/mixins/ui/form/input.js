import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiFormInputInterface extends __SInterface {
}
postcssSugarPluginUiFormInputInterface.definition = {
    color: {
        type: 'String',
        required: true,
        default: 'default',
        alias: 'c'
    },
    textColor: {
        type: 'String',
        alias: 't'
    },
    style: {
        type: 'String',
        values: ['default'],
        default: 'default'
    }
};
export { postcssSugarPluginUiFormInputInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ color: 'default', textColor: 'text', style: 'default' }, params);
    const vars = [];
    const defaultSize = __theme().config('size.default');
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
          background-color: transparent;
          border-color: sugar.color(${finalParams.color});
          color: sugar.color(${finalParams.textColor}, --darken 20);
          border-style: solid;
          border-width: ${1 / parseInt(defaultSize)}em;
          padding: ${__themeVar('ui.form.padding')};
          &:hover {
            border-color: sugar.color(${finalParams.color});
          }
        `);
            break;
    }
    vars.push('}');
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFVBQVUsTUFBTSx5QkFBeUIsQ0FBQztBQUVqRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxNQUFNLHNDQUF1QyxTQUFRLFlBQVk7O0FBQ3hELGlEQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUNuQixPQUFPLEVBQUUsU0FBUztLQUNuQjtDQUNGLENBQUM7QUFTSixPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsU0FBUyxFQUNoQixTQUFTLEVBQUUsTUFBTSxFQUNqQixLQUFLLEVBQUUsU0FBUyxJQUNiLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sV0FBVyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVyRCxPQUFPO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7O21CQUdPLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQzs7S0FFM0MsQ0FBQyxDQUFDO0lBRUwsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUM7O0dBRVQsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzt1QkFDVyxVQUFVLENBQUMsc0JBQXNCLENBQUM7b0JBQ3JDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQztHQUNqRCxDQUFDLENBQUM7SUFFSCxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDekI7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDOztzQ0FFc0IsV0FBVyxDQUFDLEtBQUs7K0JBQ3hCLFdBQVcsQ0FBQyxTQUFTOzswQkFFMUIsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7cUJBQzlCLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQzs7d0NBRVYsV0FBVyxDQUFDLEtBQUs7O1NBRWhELENBQUMsQ0FBQztZQUNMLE1BQU07S0FDVDtJQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9