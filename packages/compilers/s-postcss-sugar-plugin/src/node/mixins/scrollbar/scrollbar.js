import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
/**
 * @name           scrollbar
 * @namespace      mixins.scrollbar
 * @type           Mixin
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
}
postcssSugarPluginScrollbarInterface.definition = {
    size: {
        type: 'String',
        default: __theme().config('ui.scrollbar.size'),
    },
    color: {
        type: 'String',
        default: __theme().config('ui.scrollbar.defaultColor'),
    },
};
export { postcssSugarPluginScrollbarInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ size: '5px', color: 'accent' }, params);
    const vars = [];
    // lnf
    vars.push(`
      &::-webkit-scrollbar {
          width: ${finalParams.size};
          height: ${finalParams.size};
      }
      &::-webkit-scrollbar-track {
          background-color: sugar.color(${finalParams.color}, --darken 30);
          background: rgba(0,0,0,0);
      }
      &::-webkit-scrollbar-thumb {
          background-color: sugar.color(${finalParams.color});
      }
  `);
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2Nyb2xsYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLG1CQUFtQixDQUFDO0FBRXhDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZOztBQUNwRCwrQ0FBVSxHQUFHO0lBQ2hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztLQUNqRDtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsQ0FBQztLQUN6RDtDQUNKLENBQUM7QUFRTixPQUFPLEVBQUUsb0NBQW9DLElBQUksU0FBUyxFQUFFLENBQUM7QUFDN0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsS0FBSyxFQUNYLEtBQUssRUFBRSxRQUFRLElBQ1osTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUM7O21CQUVLLFdBQVcsQ0FBQyxJQUFJO29CQUNmLFdBQVcsQ0FBQyxJQUFJOzs7MENBR00sV0FBVyxDQUFDLEtBQUs7Ozs7MENBSWpCLFdBQVcsQ0FBQyxLQUFLOztHQUV4RCxDQUFDLENBQUM7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9