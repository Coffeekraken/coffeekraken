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
        default: 'accent',
    },
    size: {
        type: 'String',
        default: '5px',
    },
};
export { postcssSugarPluginScrollbarInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ color: 'accent', size: '5px' }, params);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsYmFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2Nyb2xsYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSxvQ0FBcUMsU0FBUSxZQUFZOztBQUNwRCwrQ0FBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLFFBQVE7S0FDcEI7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsUUFBUTtRQUNkLE9BQU8sRUFBRSxLQUFLO0tBQ2pCO0NBQ0osQ0FBQztBQVFOLE9BQU8sRUFBRSxvQ0FBb0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUM3RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxRQUFRLEVBQ2YsSUFBSSxFQUFFLEtBQUssSUFDUixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNO0lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQzs7bUJBRUssV0FBVyxDQUFDLElBQUk7b0JBQ2YsV0FBVyxDQUFDLElBQUk7OzswQ0FHTSxXQUFXLENBQUMsS0FBSzs7OzswQ0FJakIsV0FBVyxDQUFDLEtBQUs7O0dBRXhELENBQUMsQ0FBQztJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=