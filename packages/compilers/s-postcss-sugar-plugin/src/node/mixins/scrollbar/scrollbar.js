import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           scrollbar
 * @namespace      node.mixins.scrollbar
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to skin your scrollbar easily by applying a color and
 * a width to it.
 *
 * @return        {Css}           The generated css
 *
 * @example         postcss
 * body {
 *    @sugar.scrollbar(accent, 5px);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginScrollbarInterface extends __SInterface {
    static get _definition() {
        return {
            color: {
                type: 'String',
                default: __STheme.config('ui.scrollbar.defaultColor'),
            },
            background: {
                type: 'String',
                default: __STheme.config('ui.scrollbar.defaultColor'),
            },
            size: {
                type: 'String',
                default: __STheme.config('ui.scrollbar.size'),
            },
        };
    }
}
export { postcssSugarPluginScrollbarInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ size: '5px', color: 'accent', background: 'main' }, params);
    const vars = [];
    // lnf
    vars.push(`
      &::-webkit-scrollbar {
          width: ${finalParams.size};
          height: ${finalParams.size};
      }
      &::-webkit-scrollbar-track {
          background-color: sugar.color(${finalParams.background}, --alpha 0.1);
      }
      &::-webkit-scrollbar-thumb {
          background-color: sugar.color(${finalParams.color});
      }
  `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2Nyb2xsYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZO0lBQzNELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUM7YUFDeEQ7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsMkJBQTJCLENBQUM7YUFDeEQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUM7YUFDaEQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUUQsT0FBTyxFQUFFLG9DQUFvQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQzdELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEtBQUssRUFDWCxLQUFLLEVBQUUsUUFBUSxFQUNmLFVBQVUsRUFBRSxNQUFNLElBQ2YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUM7O21CQUVLLFdBQVcsQ0FBQyxJQUFJO29CQUNmLFdBQVcsQ0FBQyxJQUFJOzs7MENBR00sV0FBVyxDQUFDLFVBQVU7OzswQ0FHdEIsV0FBVyxDQUFDLEtBQUs7O0dBRXhELENBQUMsQ0FBQztJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==