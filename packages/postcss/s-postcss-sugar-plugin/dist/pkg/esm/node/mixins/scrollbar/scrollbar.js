import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           scrollbar
 * @namespace      node.mixin.scrollbar
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to skin your scrollbar easily by applying a color and
 * a width to it.
 *
 * @return        {Css}           The generated css
 *
 * @example        css
 * body {
 *    @sugar.scrollbar(accent, 5px);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginScrollbarInterface extends __SInterface {
    static get _definition() {
        return {
            color: {
                type: 'String',
                default: __STheme.get('ui.scrollbar.defaultColor'),
            },
            background: {
                type: 'String',
                default: __STheme.get('ui.scrollbar.defaultColor'),
            },
            size: {
                type: 'String',
                default: __STheme.get('ui.scrollbar.size'),
            },
        };
    }
}
export { postcssSugarPluginScrollbarInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    var _a;
    const finalParams = Object.assign({ size: '5px', color: 'accent', background: 'main' }, params);
    const vars = [];
    // lnf
    vars.push(`
      &::-webkit-scrollbar {
          width: ${finalParams.size};
          height: ${finalParams.size};
      }
      &::-webkit-scrollbar-track {
            ${((_a = finalParams.background.match(/^sugar\.color/)) !== null && _a !== void 0 ? _a : finalParams.background.match(/^(var|hsla?|rgba?)\(/))
        ? `
                background-color: ${finalParams.background};
            `
        : `
                background-color: sugar.color(${finalParams.background}, --alpha 0.1);
            `}

      }
      &::-webkit-scrollbar-thumb {
          ${finalParams.color.match(/^sugar\.color/) ||
        finalParams.color.match(/^(var|hsla?|rgba?)\(/)
        ? `
                background-color: ${finalParams.color};
          `
        : `
            background-color: sugar.color(${finalParams.color});
          `}
      }
  `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUM7YUFDckQ7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsMkJBQTJCLENBQUM7YUFDckQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7YUFDN0M7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUUQsT0FBTyxFQUFFLG9DQUFvQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQzdELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7O0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxLQUFLLEVBQ1gsS0FBSyxFQUFFLFFBQVEsRUFDZixVQUFVLEVBQUUsTUFBTSxJQUNmLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU07SUFDTixJQUFJLENBQUMsSUFBSSxDQUFDOzttQkFFSyxXQUFXLENBQUMsSUFBSTtvQkFDZixXQUFXLENBQUMsSUFBSTs7O2NBSXBCLENBQUEsTUFBQSxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsbUNBQzdDLFdBQVcsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDO1FBQ2hELENBQUMsQ0FBQztvQ0FDYyxXQUFXLENBQUMsVUFBVTthQUM3QztRQUNPLENBQUMsQ0FBQztnREFDMEIsV0FBVyxDQUFDLFVBQVU7YUFFMUQ7Ozs7WUFLRSxXQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUM7UUFDeEMsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsc0JBQXNCLENBQUM7UUFDM0MsQ0FBQyxDQUFDO29DQUNnQixXQUFXLENBQUMsS0FBSztXQUMxQztRQUNPLENBQUMsQ0FBQzs0Q0FDd0IsV0FBVyxDQUFDLEtBQUs7V0FFbkQ7O0dBRVAsQ0FBQyxDQUFDO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9