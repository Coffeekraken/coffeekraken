import __SInterface from '@coffeekraken/s-interface';
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
    color: {
        type: 'String',
        default: 'accent'
    },
    width: {
        type: 'String',
        default: '5px'
    }
};
export { postcssSugarPluginScrollbarInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ color: 'accent', width: '5px' }, params);
    const vars = [];
    // lnf
    vars.push(`
      &::-webkit-scrollbar {
          width: ${finalParams.width}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2Nyb2xsYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZOztBQUN0RCwrQ0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLFFBQVE7S0FDbEI7SUFDRCxLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxLQUFLO0tBQ2Y7Q0FDRixDQUFDO0FBUUosT0FBTyxFQUFFLG9DQUFvQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQzdELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsS0FBSyxFQUFFLFFBQVEsRUFDZixLQUFLLEVBQUUsS0FBSyxJQUNULE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU07SUFDTixJQUFJLENBQUMsSUFBSSxDQUFDOzttQkFFTyxXQUFXLENBQUMsS0FBSzs7OzBDQUdNLFdBQVcsQ0FBQyxLQUFLOzs7OzBDQUlqQixXQUFXLENBQUMsS0FBSzs7R0FFeEQsQ0FBQyxDQUFDO0lBRUgsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==