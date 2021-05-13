import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiButtonInterface extends __SInterface {
}
postcssSugarPluginUiButtonInterface.definition = {
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
        values: ['default', 'outlined', 'text'],
        default: 'default'
    }
};
export { postcssSugarPluginUiButtonInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ color: 'default', textColor: '', style: 'default' }, params);
    const vars = [];
    const defaultSize = __theme().config('size.default');
    // bare
    vars.push(`
      @sugar.scope.bare {
        display: inline-block;
        cursor: pointer;
        padding: ${__themeVar('ui.button.padding')};
      }
    `);
    // lnf
    vars.push(`
      @sugar.scope.lnf {
  `);
    vars.push(`
      border-radius: ${__themeVar('ui.button.borderRadius')};
      transition: ${__themeVar('ui.button.transition')};
  `);
    switch (finalParams.style) {
        case 'outlined':
            vars.push(`
          background-color: transparent;
          border-color: sugar.color(${finalParams.color});
          color: sugar.color(${finalParams.color});
          border-style: solid;
          border-width: ${1 / parseInt(defaultSize)}em;
          &:hover {
            background-color: sugar.color(${finalParams.textColor
                ? finalParams.textColor
                : `${finalParams.color}--10`});
          }
        `);
            break;
        case 'text':
            vars.push(`
          background-color: transparent;
          color: sugar.color(${finalParams.color});
          &:hover {
            background-color: sugar.color(${finalParams.textColor
                ? finalParams.textColor
                : `${finalParams.color}--10`});
          }
      `);
            break;
        case 'default':
        default:
            vars.push(`
        background-color: sugar.color(${finalParams.color});
        color: sugar.color(${finalParams.textColor
                ? finalParams.textColor
                : `${finalParams.color}--i`});
        &:hover {
          background-color: sugar.color(${finalParams.textColor
                ? finalParams.textColor
                : `${finalParams.color}--i`});
          color: sugar.color(${finalParams.color});
        }
      `);
            break;
    }
    vars.push('}');
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE1BQU0sbUNBQW9DLFNBQVEsWUFBWTs7QUFDckQsOENBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUM7UUFDdkMsT0FBTyxFQUFFLFNBQVM7S0FDbkI7Q0FDRixDQUFDO0FBU0osT0FBTyxFQUFFLG1DQUFtQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQzVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsS0FBSyxFQUFFLFNBQVMsRUFDaEIsU0FBUyxFQUFFLEVBQUUsRUFDYixLQUFLLEVBQUUsU0FBUyxJQUNiLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sV0FBVyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVyRCxPQUFPO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzttQkFJTyxVQUFVLENBQUMsbUJBQW1CLENBQUM7O0tBRTdDLENBQUMsQ0FBQztJQUVMLE1BQU07SUFDTixJQUFJLENBQUMsSUFBSSxDQUFDOztHQUVULENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUM7dUJBQ1csVUFBVSxDQUFDLHdCQUF3QixDQUFDO29CQUN2QyxVQUFVLENBQUMsc0JBQXNCLENBQUM7R0FDbkQsQ0FBQyxDQUFDO0lBRUgsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3pCLEtBQUssVUFBVTtZQUNiLElBQUksQ0FBQyxJQUFJLENBQUM7O3NDQUVzQixXQUFXLENBQUMsS0FBSzsrQkFDeEIsV0FBVyxDQUFDLEtBQUs7OzBCQUV0QixDQUFDLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQzs7NENBR3JDLFdBQVcsQ0FBQyxTQUFTO2dCQUNuQixDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVM7Z0JBQ3ZCLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLE1BQzFCOztTQUVILENBQUMsQ0FBQztZQUNMLE1BQU07UUFDUixLQUFLLE1BQU07WUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOzsrQkFFZSxXQUFXLENBQUMsS0FBSzs7NENBR2xDLFdBQVcsQ0FBQyxTQUFTO2dCQUNuQixDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVM7Z0JBQ3ZCLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLE1BQzFCOztPQUVMLENBQUMsQ0FBQztZQUNILE1BQU07UUFDUixLQUFLLFNBQVMsQ0FBQztRQUNmO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQzt3Q0FDd0IsV0FBVyxDQUFDLEtBQUs7NkJBRS9DLFdBQVcsQ0FBQyxTQUFTO2dCQUNuQixDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVM7Z0JBQ3ZCLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEtBQzFCOzswQ0FHSSxXQUFXLENBQUMsU0FBUztnQkFDbkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTO2dCQUN2QixDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxLQUMxQjsrQkFDcUIsV0FBVyxDQUFDLEtBQUs7O09BRXpDLENBQUMsQ0FBQztZQUNILE1BQU07S0FDVDtJQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9