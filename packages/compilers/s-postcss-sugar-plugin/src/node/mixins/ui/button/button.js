import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiButtonInterface extends __SInterface {
}
postcssSugarPluginUiButtonInterface.definition = {
    style: {
        type: 'String',
        values: ['default', 'gradient', 'outline', 'text'],
        default: __theme().config('ui.button.defaultStyle'),
    },
    scope: {
        type: 'Array<String>',
        values: ['bare', 'lnf'],
        default: ['bare', 'lnf'],
    },
};
export { postcssSugarPluginUiButtonInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: __theme().config('ui.button.defaultStyle'), scope: ['bare', 'lnf'] }, params);
    const vars = [];
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
      @sugar.ui.base(button);
    `);
    }
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
      display: inline-block;
      cursor: pointer;
      white-space: nowrap;

      & > * {
        pointer-events: none;
      }
      & > i,
      & > .s-icon {
        font-size: 1em;
      }
    `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.style) {
            case 'gradient':
                vars.push(`
            @sugar.gradient(sugar.color(ui, gradientStart), sugar.color(ui, gradientEnd), $angle: 90);
            color: sugar.color(ui, foreground);

            &:hover, &:focus {
              @sugar.gradient(sugar.color(ui,gradientEnd), sugar.color(ui, gradientStart), $angle: 90);
              color: sugar.color(ui:hover, foreground);
            }
        `);
                break;
            case 'outline':
                vars.push(`
                background-color: sugar.color(ui, --alpha 0);
                border: sugar.color(ui) solid sugar.theme(ui.button.borderWidth);

                &:hover, &:focus {
                  background-color: sugar.color(ui, --alpha 0.3);
                }
              `);
                break;
            case 'text':
                vars.push(`
                  background-color: sugar.color(ui, --alpha 0);
                  border: none !important;
                  color: sugar.color(ui);

                  &:hover, &:focus {
                    background-color: sugar.color(ui, --alpha 0);
                    transform: scale(1.1);
                  }
                `);
                break;
            case 'default':
            default:
                vars.push(`
            background-color: sugar.color(ui);
            color: sugar.color(ui, foreground);

            &:hover, &:focus {
              background-color: sugar.color(ui:hover, 50);
              color: sugar.color(ui:hover, foreground);
            }
        `);
                break;
        }
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBR3JELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE1BQU0sbUNBQW9DLFNBQVEsWUFBWTs7QUFDbkQsOENBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQztRQUNsRCxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDO0tBQ3REO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO0tBQzNCO0NBQ0osQ0FBQztBQVFOLE9BQU8sRUFBRSxtQ0FBbUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUM1RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsRUFDakQsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOztLQUViLENBQUMsQ0FBQztLQUNGO0lBRUQsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O0tBWWIsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7O1NBUWpCLENBQUMsQ0FBQztnQkFFSyxNQUFNO1lBQ1YsS0FBSyxTQUFTO2dCQUNWLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7ZUFPWCxDQUFDLENBQUM7Z0JBQ0QsTUFBTTtZQUNWLEtBQUssTUFBTTtnQkFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7aUJBU1QsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVixLQUFLLFNBQVMsQ0FBQztZQUNmO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7O1NBUWpCLENBQUMsQ0FBQztnQkFDSyxNQUFNO1NBQ2I7S0FDSjtJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=