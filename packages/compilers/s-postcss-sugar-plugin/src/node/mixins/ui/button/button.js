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
    focusOutline: {
        type: 'Boolean',
        default: __theme().config('ui.button.focusOutline'),
    },
    scope: {
        type: 'Array<String>',
        values: ['bare', 'lnf'],
        default: ['bare', 'lnf'],
    },
};
export { postcssSugarPluginUiButtonInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: __theme().config('ui.button.defaultStyle'), focusOutline: true, scope: ['bare', 'lnf'] }, params);
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
        position: relative;
      display: inline-block;
      cursor: pointer;
      white-space: nowrap;
      vertical-align: middle;

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
        vars.push(`
        & > * {
          @sugar.color.remap(ui, main);
        }
      `);
        switch (finalParams.style) {
            case 'gradient':
                vars.push(`
                    background: none !important;
                    color: sugar.color(ui, foreground);
                    transition: sugar.theme(ui.button.transition);
                    border: none !important;

                    --borderWidth: sugar.theme(ui.button.borderWidth);

                    & > * {
                      position: relative;
                      z-index: 1;
                    }

                    &:before {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      border-radius: sugar.theme(ui.button.borderRadius);
                      @sugar.gradient(sugar.color(ui, gradientStart), sugar.color(ui, gradientEnd), $angle: 90);
                      transition: sugar.theme(ui.button.transition);
                    }

                    &:after {
                      content: '';
                      position: absolute;
                      top: 0;
                      left: 0;
                      width: 100%;
                      height: 100%;
                      border-radius: sugar.theme(ui.button.borderRadius);
                      @sugar.gradient(sugar.color(ui,gradientEnd), sugar.color(ui, gradientStart), $angle: 90);
                      opacity: 0;
                      transition: sugar.theme(ui.button.transition);
                    }

                    &:hover, &:focus {
                      color: sugar.color(ui:hover, foreground);

                      &:after {
                        opacity: 1;
                      }
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
        if (finalParams.focusOutline) {
            vars.push(`
            @sugar.state.focusOutline;
        `);
        }
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBR3JELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE1BQU0sbUNBQW9DLFNBQVEsWUFBWTs7QUFDbkQsOENBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQztRQUNsRCxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDO0tBQ3REO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDO0tBQ3REO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO0tBQzNCO0NBQ0osQ0FBQztBQVNOLE9BQU8sRUFBRSxtQ0FBbUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUM1RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsRUFDakQsWUFBWSxFQUFFLElBQUksRUFDbEIsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOztLQUViLENBQUMsQ0FBQztLQUNGO0lBRUQsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7S0FjYixDQUFDLENBQUM7S0FDRjtJQUVELE1BQU07SUFDTixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7T0FJWCxDQUFDLENBQUM7UUFFRCxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsS0FBSyxVQUFVO2dCQUNYLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkE2Q1QsQ0FBQyxDQUFDO2dCQUVILE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OztlQU9YLENBQUMsQ0FBQztnQkFDRCxNQUFNO1lBQ1YsS0FBSyxNQUFNO2dCQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7OztpQkFTVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssU0FBUyxDQUFDO1lBQ2Y7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7U0FRakIsQ0FBQyxDQUFDO2dCQUNLLE1BQU07U0FDYjtRQUVELElBQUksV0FBVyxDQUFDLFlBQVksRUFBRTtZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDOztTQUViLENBQUMsQ0FBQztTQUNGO0tBQ0o7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9