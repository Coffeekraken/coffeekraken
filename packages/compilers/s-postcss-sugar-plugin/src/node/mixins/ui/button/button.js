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
        type: {
            type: 'Array<String>',
            splitChars: [',', ' '],
        },
        values: ['bare', 'lnf'],
        default: ['bare', 'lnf'],
    },
};
export { postcssSugarPluginUiButtonInterface as interface };
export default function ({ params, atRule, applyNoScopes, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ style: __theme().config('ui.button.defaultStyle'), focusOutline: true, scope: ['bare', 'lnf'] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
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
                      @sugar.color.remap(ui, main);
                    }

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

                & > * {
                  @sugar.color.remap(ui, main);
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

                  & > * {
                    @sugar.color.remap(ui, main);
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

                  & > * {
                    @sugar.color.remap(ui, main);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBR3JELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE1BQU0sbUNBQW9DLFNBQVEsWUFBWTs7QUFDbkQsOENBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQztRQUNsRCxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDO0tBQ3REO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDO0tBQ3REO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFO1lBQ0YsSUFBSSxFQUFFLGVBQWU7WUFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztTQUN6QjtRQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztLQUMzQjtDQUNKLENBQUM7QUFTTixPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFDNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFDYixVQUFVLEVBQ1YsV0FBVyxHQU9kO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsRUFDakQsWUFBWSxFQUFFLElBQUksRUFDbEIsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUNGLFdBQVcsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVyRCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTTtJQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7S0FFYixDQUFDLENBQUM7S0FDRjtJQUVELE9BQU87SUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7O0tBY2IsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOztPQUVYLENBQUMsQ0FBQztRQUVELFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN2QixLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkFpRFQsQ0FBQyxDQUFDO2dCQUVILE1BQU07WUFDVixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7ZUFXWCxDQUFDLENBQUM7Z0JBQ0QsTUFBTTtZQUNWLEtBQUssTUFBTTtnQkFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7O2lCQWFULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1YsS0FBSyxTQUFTLENBQUM7WUFDZjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7U0FZakIsQ0FBQyxDQUFDO2dCQUNLLE1BQU07U0FDYjtRQUVELElBQUksV0FBVyxDQUFDLFlBQVksRUFBRTtZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDOztTQUViLENBQUMsQ0FBQztTQUNGO0tBQ0o7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9