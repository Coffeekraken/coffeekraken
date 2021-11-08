import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          width
 * @namespace     node.mixins.border
 * @type          PostcssMixin
 * @platform      css
 * @status        beta
 *
 * This mixin allows you to apply a border width with a value coming
 * from the config.theme.border.width stack like 10, 20, etc...
 *
 * @param       {Number}      value     The border width value you want to apply like 10, 20, etc...
 * @return      {Css}                   The generated css
 *
 * @todo      Add multiple values support like @sugar.border.width(10);
 *
 * @example       css
 * .my-element {
 *    @sugar.border.width(10);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginBorderwidthMixinInterface extends __SInterface {
    static get _definition() {
        return {
            width: {
                type: 'Number|String',
                required: true,
                default: __STheme.config('border.width.default'),
            },
        };
    }
}
export { postcssSugarPluginBorderwidthMixinInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ width: 0 }, params);
    const vars = [
        `border-width: sugar.border.width(${finalParams.width});`,
    ];
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aWR0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNCRztBQUVILE1BQU0sMkNBQTRDLFNBQVEsWUFBWTtJQUNsRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxlQUFlO2dCQUNyQixRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQzthQUNuRDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNRCxPQUFPLEVBQUUsMkNBQTJDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFcEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsQ0FBQyxJQUNMLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDbkIsb0NBQW9DLFdBQVcsQ0FBQyxLQUFLLElBQUk7S0FDNUQsQ0FBQztJQUNGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==