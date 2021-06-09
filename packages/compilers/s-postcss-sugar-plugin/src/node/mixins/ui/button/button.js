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
    const finalParams = Object.assign({ style: 'default', shrinked: false, scope: ['bare', 'lnf', 'style'] }, params);
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
      @sugar.scope.bare {
        display: inline-block;
        cursor: pointer;

        & > * {
          pointer-events: none;
        }
      }
    `);
    }
    // style
    if (finalParams.scope.indexOf('style') !== -1) {
        vars.push(`
      @sugar.scope.lnf {
      `);
        switch (finalParams.style) {
            case 'gradient':
                vars.push(`
            @sugar.gradient(sugar.color(ui, gradientStart), sugar.color(ui, gradientEnd), $angle: 90);

            &:hover, &:focus {
              @sugar.gradient(sugar.color(ui,gradientEnd), sugar.color(ui, gradientStart), $angle: 90);
            }
        `);
                break;
            case 'default':
            default:
                break;
        }
        vars.push('}');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBRWpELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBRTNDLE1BQU0sbUNBQW9DLFNBQVEsWUFBWTs7QUFDckQsOENBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQztRQUNuRCxPQUFPLEVBQUUsU0FBUztLQUNuQjtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxlQUFlO1FBQ3JCLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sQ0FBQztRQUN6QyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE9BQU8sQ0FBQztLQUNoQztDQUNGLENBQUM7QUFTSixPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFDNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsU0FBUyxFQUNoQixRQUFRLEVBQUUsS0FBSyxFQUNmLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBQyxLQUFLLEVBQUMsT0FBTyxDQUFDLElBQzFCLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sT0FBTyxHQUNYLFdBQVcsQ0FBQyxLQUFLLEtBQUssU0FBUztRQUM3QixDQUFDLENBQUMsV0FBVztRQUNiLENBQUMsQ0FBQyxjQUFjLFdBQVcsQ0FBQyxLQUFLLEdBQUcsQ0FBQztJQUV6QyxNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDOztLQUVULENBQUMsQ0FBQztLQUNKO0lBRUQsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7O0tBU1QsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxRQUFRO0lBQ1IsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDOztPQUVQLENBQUMsQ0FBQztRQUVMLFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN6QixLQUFLLFVBQVU7Z0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O1NBTVQsQ0FBQyxDQUFDO2dCQUVILE1BQU07WUFDUixLQUFLLFNBQVMsQ0FBQztZQUNmO2dCQUNFLE1BQU07U0FDVDtRQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDaEI7SUFFRCxXQUFXO0lBQ1gsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUVoRCxNQUFNLGFBQWEsR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUMvRCxNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUVsRyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O3NCQU9RLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQzs7Ozs7c0JBS2xDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQzs7Ozs7Ozs7OEJBUTFCLFFBQVE7Ozs7Ozs7S0FPakMsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9