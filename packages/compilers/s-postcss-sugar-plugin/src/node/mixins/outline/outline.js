import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginStateOutlineMixinInterface extends __SInterface {
    static get _definition() {
        return {
            where: {
                type: 'String',
                values: ['after', 'before', 'element'],
                default: 'after',
            },
        };
    }
}
export { postcssSugarPluginStateOutlineMixinInterface as interface };
/**
 * @name           outline
 * @namespace      node.mixins.outline
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a nice outline on any HTMLElement.
 * This outline will be display on hover and focus by default but can be displayed
 * always by passing the `on` parameter to `always` like so `@sugar.outline(always)`
 *
 *
 * @return      {Css}         The generated css
 *
 * @example         postcss
 * .myCoolItem {
 *      @sugar.outline();
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ where: 'after' }, (params !== null && params !== void 0 ? params : {}));
    const vars = [];
    let sel = `&:${finalParams.where}`;
    if (finalParams.where === 'element')
        sel = '&';
    vars.push(`

        @keyframes s-outline-in {
            from {
                box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.3);
            }
            to {
                box-shadow: 0 0 0 sugar.theme(ui.outline.borderWidth) sugar.color(current, --alpha 0.3);
            }
        }

        position: relative;
        
        ${sel} {
            animation: s-outline-in sugar.theme(timing.default) sugar.theme(easing.default) forwards;
            box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.3);
            
            ${finalParams.where !== 'element'
        ? `
                border-radius: sugar.theme(ui.outline.borderRadius);
                content: '';
                position: absolute;
                top: 0; left: 0;
                width: 100%; height: 100%;
            `
        : ''}
        }
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3V0bGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm91dGxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZO0lBQ25FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLENBQUM7Z0JBQ3RDLE9BQU8sRUFBRSxPQUFPO2FBQ25CO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU1yRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxHQUFHLGdCQUNoQixLQUFLLEVBQUUsT0FBTyxJQUNYLENBQUMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ3BCLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxHQUFHLEdBQUcsS0FBSyxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDbkMsSUFBSSxXQUFXLENBQUMsS0FBSyxLQUFLLFNBQVM7UUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBRS9DLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7VUFhSixHQUFHOzs7O2NBS0csV0FBVyxDQUFDLEtBQUssS0FBSyxTQUFTO1FBQzNCLENBQUMsQ0FBQzs7Ozs7O2FBTVQ7UUFDTyxDQUFDLENBQUMsRUFDVjs7S0FFUCxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=