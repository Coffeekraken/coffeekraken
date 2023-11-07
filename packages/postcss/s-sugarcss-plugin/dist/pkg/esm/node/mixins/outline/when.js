import __SInterface from '@coffeekraken/s-interface';
class SSugarcssPluginStateOutlineWhenMixinInterface extends __SInterface {
    static get _definition() {
        return {
            when: {
                type: 'Array<String>',
                values: ['hover', 'focus', 'always'],
                default: ['focus'],
            },
            color: {
                type: 'String',
                default: 'current',
            },
        };
    }
}
export { SSugarcssPluginStateOutlineWhenMixinInterface as interface };
/**
 * @name           when
 * @as              @s.outline.when
 * @namespace      node.mixin.outline
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a nice outline on any HTMLElement.
 * This outline will be display on hover and focus by default but can be displayed
 * always by passing the `on` parameter to `always` like so `@s.outline(always)`
 *
 * @return      {Css}         The generated css
 *
 * @snippet         @s.outline.when($1)
 *
 * @example        css
 * .myCoolItem {
 *      @s.outline.when(focus);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ when: ['focus'], color: 'current' }, (params !== null && params !== void 0 ? params : {}));
    const vars = [];
    if (finalParams.when.indexOf('focus') !== -1) {
        vars.push(`
            &:focus,
            &:focus-within {
                &:not(:hover) {
                    @s.outline(${finalParams.color});
                }
            }
        `);
    }
    if (finalParams.when.indexOf('hover') !== -1) {
        vars.push(`
                &:hover {
                    @s.outline(${finalParams.color});
                }
            `);
    }
    if (finalParams.when.indexOf('always') !== -1) {
        vars.push(`
           & {
                @s.outline(${finalParams.color});
            }
        `);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sNkNBQThDLFNBQVEsWUFBWTtJQUNwRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxlQUFlO2dCQUNyQixNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLFFBQVEsQ0FBQztnQkFDcEMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO2FBQ3JCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxTQUFTO2FBQ3JCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSw2Q0FBNkMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU90RTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUNmLEtBQUssRUFBRSxTQUFTLElBQ2IsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7aUNBSWUsV0FBVyxDQUFDLEtBQUs7OztTQUd6QyxDQUFDLENBQUM7S0FDTjtJQUVELElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7aUNBRWUsV0FBVyxDQUFDLEtBQUs7O2FBRXJDLENBQUMsQ0FBQztLQUNWO0lBRUQsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMzQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs2QkFFVyxXQUFXLENBQUMsS0FBSzs7U0FFckMsQ0FBQyxDQUFDO0tBQ047SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=