import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiButtonInterface extends __SInterface {
}
postcssSugarPluginUiButtonInterface.definition = {
    style: {
        type: 'String',
        values: ['default', 'gradient', 'outlined', 'text'],
        default: 'default'
    }
};
export { postcssSugarPluginUiButtonInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ style: 'default' }, params);
    const vars = [];
    const dotPath = finalParams.style === 'default'
        ? `ui.button`
        : `ui.button.:${finalParams.style}?`;
    // bare
    vars.push(`
    @sugar.scope.bare {
        display: inline-block;
        cursor: pointer;
        padding: sugar.space(${__theme().config(`${dotPath}.padding`)});
      }
    `);
    // lnf
    vars.push(`
    @sugar.scope.lnf {
      border-radius: ${__themeVar(`${dotPath}.borderRadius`)};
      transition: ${__themeVar(`${dotPath}.transition`)};
  `);
    switch (finalParams.style) {
        // case 'outlined':
        //   vars.push(`
        //       background-color: sugar.color(ui, background);
        //       border-color: sugar.color(ui, border});
        //       color: sugar.color(ui, text);
        //       border-style: solid;
        //       border-width: ${1 / parseInt(defaultSize)}em;
        //       &:hover {
        //         background-color: sugar.color(ui:hover, background);
        //         border-color: sugar.color(ui:hover, border);
        //         color: sugar.color(ui:hover, text);
        //       }
        //       &:focus {
        //         background-color: sugar.color(ui:focus, background);
        //         border-color: sugar.color(ui:focus, border);
        //         color: sugar.color(ui:focus, text);
        //       }
        //     `);
        //   break;
        // case 'text':
        //   vars.push(`
        //       background-color: transparent;
        //       color: sugar.color(${finalParams.color});
        //       &:hover {
        //         background-color: sugar.color(${
        //           finalParams.textColor
        //             ? finalParams.textColor
        //             : `${finalParams.color}--10`
        //         });
        //       }
        //   `);
        //   break;
        case 'gradient':
            vars.push(`
          color: sugar.color(ui, text);
          @sugar.gradient(ui, sugar.color(ui, --darken 20 --saturate 50), $angle: 90);
          padding: ${__themeVar(`${dotPath}.padding`)};

          &:hover, &:focus {
            @sugar.gradient(sugar.color(ui, --darken 20 --saturate 50), ui, $angle: 90);
            color: sugar.color(ui, text);
          }
      `);
            break;
        case 'default':
        default:
            vars.push(`
        background-color: sugar.color(ui, background);
        color: sugar.color(ui, text);

        &:hover {
          background-color: sugar.color(ui:hover, background);
          color: sugar.color(ui:hover, text);
        }
        &:focus {
          background-color: sugar.color(ui:focus, background);
          color: sugar.color(ui:focus, text);
        }
      `);
            break;
    }
    vars.push('}');
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE1BQU0sbUNBQW9DLFNBQVEsWUFBWTs7QUFDckQsOENBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQztRQUNuRCxPQUFPLEVBQUUsU0FBUztLQUNuQjtDQUNGLENBQUM7QUFPSixPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFDNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsU0FBUyxJQUNiLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sT0FBTyxHQUNYLFdBQVcsQ0FBQyxLQUFLLEtBQUssU0FBUztRQUM3QixDQUFDLENBQUMsV0FBVztRQUNiLENBQUMsQ0FBQyxjQUFjLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQztJQUV6QyxPQUFPO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzsrQkFJbUIsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsT0FBTyxVQUFVLENBQUM7O0tBRWhFLENBQUMsQ0FBQztJQUVMLE1BQU07SUFDTixJQUFJLENBQUMsSUFBSSxDQUFDOzt1QkFFVyxVQUFVLENBQUMsR0FBRyxPQUFPLGVBQWUsQ0FBQztvQkFDeEMsVUFBVSxDQUFDLEdBQUcsT0FBTyxhQUFhLENBQUM7R0FDcEQsQ0FBQyxDQUFDO0lBRUgsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3pCLG1CQUFtQjtRQUNuQixnQkFBZ0I7UUFDaEIsdURBQXVEO1FBQ3ZELGdEQUFnRDtRQUNoRCxzQ0FBc0M7UUFDdEMsNkJBQTZCO1FBQzdCLHNEQUFzRDtRQUN0RCxrQkFBa0I7UUFDbEIsK0RBQStEO1FBQy9ELHVEQUF1RDtRQUN2RCw4Q0FBOEM7UUFDOUMsVUFBVTtRQUNWLGtCQUFrQjtRQUNsQiwrREFBK0Q7UUFDL0QsdURBQXVEO1FBQ3ZELDhDQUE4QztRQUM5QyxVQUFVO1FBQ1YsVUFBVTtRQUNWLFdBQVc7UUFDWCxlQUFlO1FBQ2YsZ0JBQWdCO1FBQ2hCLHVDQUF1QztRQUN2QyxrREFBa0Q7UUFDbEQsa0JBQWtCO1FBQ2xCLDJDQUEyQztRQUMzQyxrQ0FBa0M7UUFDbEMsc0NBQXNDO1FBQ3RDLDJDQUEyQztRQUMzQyxjQUFjO1FBQ2QsVUFBVTtRQUNWLFFBQVE7UUFDUixXQUFXO1FBQ1gsS0FBSyxVQUFVO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQzs7O3FCQUdLLFVBQVUsQ0FBQyxHQUFHLE9BQU8sVUFBVSxDQUFDOzs7Ozs7T0FNOUMsQ0FBQyxDQUFDO1lBRUgsTUFBTTtRQUNSLEtBQUssU0FBUyxDQUFDO1FBQ2Y7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7T0FZVCxDQUFDLENBQUM7WUFDSCxNQUFNO0tBQ1Q7SUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUMifQ==