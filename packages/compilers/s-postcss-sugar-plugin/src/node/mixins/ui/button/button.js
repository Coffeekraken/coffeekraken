import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiButtonInterface extends __SInterface {
}
postcssSugarPluginUiButtonInterface.definition = {
    style: {
        type: 'String',
        values: ['default', 'gradient', 'outline', 'text'],
        default: __theme().config('ui.button.defaultStyle')
    },
    shrinked: {
        type: 'Boolean',
        default: false
    },
    scope: {
        type: 'Array<String>',
        values: ['bare', 'lnf', 'shrinked', 'style'],
        default: ['bare', 'lnf', 'style']
    }
};
export { postcssSugarPluginUiButtonInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ style: __theme().config('ui.button.defaultStyle'), shrinked: false, scope: ['bare', 'lnf', 'style'] }, params);
    const vars = [];
    const dotPath = finalParams.style === 'default'
        ? `ui.button`
        : `ui.button.:${finalParams.style}?`;
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

      & > * {
        pointer-events: none;
      }
    `);
    }
    // style
    if (finalParams.scope.indexOf('style') !== -1) {
        switch (finalParams.style) {
            case 'gradient':
                vars.push(`
            @sugar.gradient(sugar.color(ui, gradientStart), sugar.color(ui, gradientEnd), $angle: 90);

            &:hover, &:focus {
              @sugar.gradient(sugar.color(ui,gradientEnd), sugar.color(ui, gradientStart), $angle: 90);
              color: sugar.color(ui:hover, foreground);
            }
        `);
                break;
            case 'default':
            default:
                vars.push(`
            background-color: sugar.color(ui);

            &:hover, &:focus {
              background-color: sugar.color(ui:hover);
              color: sugar.color(ui:hover, foreground);
            }
        `);
                break;
        }
    }
    // shrinked
    if (finalParams.scope.indexOf('shrinked') !== -1) {
        const transitionStr = __theme().config('ui.button.transition');
        const duration = transitionStr.split(' ').map(l => l.trim()).filter(v => v.match(/[0-9.]+s$/))[0];
        vars.push(`
      max-width: 1em;
      white-space: nowrap;

      & > *:not(i) {
        opacity: 0;
        white-space: nowrap;
        transition: ${__themeVar('ui.button.transition')};
      }

      & > i {
        transform: translateX(-50%);
        transition: ${__themeVar('ui.button.transition')};
      }

      &:hover {
        max-width: 30ch;

        & > *:not(i) {
          opacity: 1;
          transition-delay: ${duration}
        }

        & > i {
          transform: translateX(0);
        }
      }
    `);
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE1BQU0sbUNBQW9DLFNBQVEsWUFBWTs7QUFDckQsOENBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQztRQUNsRCxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDO0tBQ3BEO0lBQ0QsUUFBUSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNmO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxVQUFVLEVBQUMsT0FBTyxDQUFDO1FBQ3pDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxDQUFDO0tBQ2hDO0NBQ0YsQ0FBQztBQVNKLE9BQU8sRUFBRSxtQ0FBbUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUM1RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxFQUtaO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsRUFDakQsUUFBUSxFQUFFLEtBQUssRUFDZixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sQ0FBQyxJQUMxQixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLE9BQU8sR0FDWCxXQUFXLENBQUMsS0FBSyxLQUFLLFNBQVM7UUFDN0IsQ0FBQyxDQUFDLFdBQVc7UUFDYixDQUFDLENBQUMsY0FBYyxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUM7SUFFekMsTUFBTTtJQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQzs7S0FFVCxDQUFDLENBQUM7S0FDSjtJQUVELE9BQU87SUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7S0FPVCxDQUFDLENBQUM7S0FDSjtJQUVELFFBQVE7SUFDUixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBRTdDLFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN6QixLQUFLLFVBQVU7Z0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OztTQU9ULENBQUMsQ0FBQztnQkFFSCxNQUFNO1lBQ1IsS0FBSyxTQUFTLENBQUM7WUFDZjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O1NBT1gsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDVDtLQUNGO0lBRUQsV0FBVztJQUNYLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFFaEQsTUFBTSxhQUFhLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDLENBQUM7UUFDL0QsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFbEcsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OztzQkFPUSxVQUFVLENBQUMsc0JBQXNCLENBQUM7Ozs7O3NCQUtsQyxVQUFVLENBQUMsc0JBQXNCLENBQUM7Ozs7Ozs7OzhCQVExQixRQUFROzs7Ozs7O0tBT2pDLENBQUMsQ0FBQztLQUNKO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==