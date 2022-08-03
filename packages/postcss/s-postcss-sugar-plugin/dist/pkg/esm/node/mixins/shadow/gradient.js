import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           shadow
 * @namespace      node.mixin.shadow
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to apply a linear gradient shadow to any HTMLElement.
 * Note that this mixin make use of the :before pseudo class.
 *
 * @return        {Css}           The generated css
 *
 * @example        css
 * .myCoolElement {
 *    @sugar.shadow.gradient(0, 10px, 10px, 0, sugar.color(accent), sugar.color(complementary));
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginShadowGradientInterface extends __SInterface {
    static get _definition() {
        return {
            x: {
                type: 'Number|String',
                required: true,
                default: 0,
            },
            y: {
                type: 'Number|String',
                required: true,
                default: 0,
            },
            blur: {
                type: 'Number|String',
                required: true,
                default: 0,
            },
            spread: {
                type: 'Number|String',
                required: true,
                default: 0,
            },
            startColor: {
                type: 'String',
                required: true,
                default: 'sugar.color(accent)',
            },
            endColor: {
                type: 'String',
                required: true,
                default: 'sugar.color(complementary)',
            },
            angle: {
                type: 'String',
                required: false,
                default: '90deg',
            },
        };
    }
}
export { postcssSugarPluginShadowGradientInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ x: 0, y: 0, blur: 0, spread: 0, startColor: '', endColor: '', angle: '' }, params);
    const vars = [];
    // lnf
    vars.push(`
        &:before {
            z-index: 0;
            content: '';
            position: absolute;
            top: calc(50% + ${typeof finalParams.y === 'number'
        ? finalParams.y + 'px'
        : finalParams.y});
            left: calc(50% + ${typeof finalParams.x === 'number'
        ? finalParams.x + 'px'
        : finalParams.x});
            width: 100%; height: 100%;
            background: linear-gradient(${finalParams.angle}, ${finalParams.startColor}, ${finalParams.endColor});
            filter: blur(${finalParams.blur});
            transform: translate(-50%, -50%) scale(${finalParams.spread});

            ${atRule.nodes.map((node) => node.toString()).join(';')}

        }
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSx5Q0FBMEMsU0FBUSxZQUFZO0lBQ2hFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxDQUFDLEVBQUU7Z0JBQ0MsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxDQUFDLEVBQUU7Z0JBQ0MsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxVQUFVLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLHFCQUFxQjthQUNqQztZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsNEJBQTRCO2FBQ3hDO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxLQUFLO2dCQUNmLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVlELE9BQU8sRUFBRSx5Q0FBeUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUNsRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLENBQUMsRUFBRSxDQUFDLEVBQ0osQ0FBQyxFQUFFLENBQUMsRUFDSixJQUFJLEVBQUUsQ0FBQyxFQUNQLE1BQU0sRUFBRSxDQUFDLEVBQ1QsVUFBVSxFQUFFLEVBQUUsRUFDZCxRQUFRLEVBQUUsRUFBRSxFQUNaLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OzhCQU1FLE9BQU8sV0FBVyxDQUFDLENBQUMsS0FBSyxRQUFRO1FBQzdCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLElBQUk7UUFDdEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUN0QjsrQkFFSSxPQUFPLFdBQVcsQ0FBQyxDQUFDLEtBQUssUUFBUTtRQUM3QixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxJQUFJO1FBQ3RCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FDdEI7OzBDQUU4QixXQUFXLENBQUMsS0FBSyxLQUNuRCxXQUFXLENBQUMsVUFDaEIsS0FBSyxXQUFXLENBQUMsUUFBUTsyQkFDRixXQUFXLENBQUMsSUFBSTtxREFDVSxXQUFXLENBQUMsTUFBTTs7Y0FFekQsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7OztLQUc5RCxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=