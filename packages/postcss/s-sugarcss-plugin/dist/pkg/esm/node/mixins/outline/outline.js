import __SInterface from '@coffeekraken/s-interface';
class SSugarcssPluginStateOutlineMixinInterface extends __SInterface {
    static get _definition() {
        return {
            color: {
                type: 'String',
                default: 'current',
            },
        };
    }
}
export { SSugarcssPluginStateOutlineMixinInterface as interface };
/**
 * @name           outline
 * @as              @s.outline
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
 * @snippet         @s.outline
 *
 * @example        css
 * .myCoolItem {
 *      @s.outline();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ color: 'current' }, (params !== null && params !== void 0 ? params : {}));
    const vars = [];
    vars.push(`

        @keyframes s-outline-in-${finalParams.color} {
            from {
                outline: 0px solid s.color(${finalParams.color}, --alpha 0);
            }
            to {
                outline: 10px solid s.color(${finalParams.color}, --alpha 0.2);
            }
        }

        animation: s-outline-in-${finalParams.color} .1s ease-out forwards;    
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0seUNBQTBDLFNBQVEsWUFBWTtJQUNoRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxTQUFTO2FBQ3JCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSx5Q0FBeUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU1sRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLEdBQUcsZ0JBQ2hCLEtBQUssRUFBRSxTQUFTLElBQ2IsQ0FBQyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDcEIsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLENBQUMsSUFBSSxDQUFDOztrQ0FFb0IsV0FBVyxDQUFDLEtBQUs7OzZDQUVOLFdBQVcsQ0FBQyxLQUFLOzs7OENBR2hCLFdBQVcsQ0FBQyxLQUFLOzs7O2tDQUk3QixXQUFXLENBQUMsS0FBSztLQUM5QyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=