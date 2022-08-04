import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginStateOutlineWhenMixinInterface extends __SInterface {
    static get _definition() {
        return {
            when: {
                type: 'Array<String>',
                values: ['hover', 'focus', 'always'],
                default: ['focus'],
            },
        };
    }
}
export { postcssSugarPluginStateOutlineWhenMixinInterface as interface };
/**
 * @name           outline
 * @namespace      node.mixin.outline
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a nice outline on any HTMLElement.
 * This outline will be display on hover and focus by default but can be displayed
 * always by passing the `on` parameter to `always` like so `@sugar.outline(always)`
 *
 *
 * @return      {Css}         The generated css
 *
 * @example        css
 * .myCoolItem {
 *      @sugar.outline();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ when: ['focus'] }, (params !== null && params !== void 0 ? params : {}));
    const vars = [];
    if (finalParams.when.indexOf('focus') !== -1) {
        vars.push(`
            &:focus-visible {
                &:not(:hover):not(:active) {
                    @sugar.outline;
                }
            }
        `);
    }
    if (finalParams.when.indexOf('hover') !== -1) {
        vars.push(`
                &:hover {
                    @sugar.outline;
                }
            `);
    }
    if (finalParams.when.indexOf('always') !== -1) {
        vars.push(`
           & {
                @sugar.outline;
            }
        `);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sZ0RBQWlELFNBQVEsWUFBWTtJQUN2RSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQztnQkFDcEMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3JCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSxnREFBZ0QsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU16RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFDWixDQUFDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FBQyxDQUNwQixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O1NBTVQsQ0FBQyxDQUFDO0tBQ047SUFFRCxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7YUFJTCxDQUFDLENBQUM7S0FDVjtJQUVELElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztTQUlULENBQUMsQ0FBQztLQUNOO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9