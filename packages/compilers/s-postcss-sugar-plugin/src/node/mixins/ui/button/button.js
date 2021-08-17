import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../../utils/themeVar';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiButtonInterface extends __SInterface {
}
postcssSugarPluginUiButtonInterface.definition = {
    style: {
        type: 'String',
        values: ['default', 'gradient', 'outline', 'text'],
        default: __theme().config('ui.button.defaultStyle'),
    },
    shrinked: {
        type: 'Boolean',
        default: false,
    },
    scope: {
        type: 'Array<String>',
        values: ['bare', 'lnf', 'shrinked', 'style'],
        default: ['bare', 'lnf', 'style'],
    },
};
export { postcssSugarPluginUiButtonInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: __theme().config('ui.button.defaultStyle'), shrinked: false, scope: ['bare', 'lnf', 'style'] }, params);
    const vars = [];
    const dotPath = finalParams.style === 'default' ? `ui.button` : `ui.button.:${finalParams.style}`;
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
            color: sugar.color(ui, foreground);

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
            color: sugar.color(ui, foreground);

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
        const duration = transitionStr
            .split(' ')
            .map((l) => l.trim())
            .filter((v) => v.match(/[0-9.]+s$/))[0];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE1BQU0sbUNBQW9DLFNBQVEsWUFBWTs7QUFDbkQsOENBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQztRQUNsRCxPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDO0tBQ3REO0lBQ0QsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNqQjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLE9BQU8sQ0FBQztRQUM1QyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQztLQUNwQztDQUNKLENBQUM7QUFTTixPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFDNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLHdCQUF3QixDQUFDLEVBQ2pELFFBQVEsRUFBRSxLQUFLLEVBQ2YsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsSUFDNUIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsY0FBYyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFbEcsTUFBTTtJQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7S0FFYixDQUFDLENBQUM7S0FDRjtJQUVELE9BQU87SUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7S0FPYixDQUFDLENBQUM7S0FDRjtJQUVELFFBQVE7SUFDUixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzNDLFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN2QixLQUFLLFVBQVU7Z0JBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7U0FRakIsQ0FBQyxDQUFDO2dCQUVLLE1BQU07WUFDVixLQUFLLFNBQVMsQ0FBQztZQUNmO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7O1NBUWpCLENBQUMsQ0FBQztnQkFDSyxNQUFNO1NBQ2I7S0FDSjtJQUVELFdBQVc7SUFDWCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzlDLE1BQU0sYUFBYSxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQy9ELE1BQU0sUUFBUSxHQUFHLGFBQWE7YUFDekIsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ3BCLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7c0JBT0ksVUFBVSxDQUFDLHNCQUFzQixDQUFDOzs7OztzQkFLbEMsVUFBVSxDQUFDLHNCQUFzQixDQUFDOzs7Ozs7Ozs4QkFRMUIsUUFBUTs7Ozs7OztLQU9qQyxDQUFDLENBQUM7S0FDRjtJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=