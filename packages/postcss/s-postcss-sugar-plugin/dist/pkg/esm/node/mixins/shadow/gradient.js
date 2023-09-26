import __SInterface from '@coffeekraken/s-interface';
/**
 * @name           shadow
 * @as              @s.shadow.gradient
 * @namespace      node.mixin.shadow
 * @type           PostcssMixin
 * @platform        css
 * @status        alpha
 *
 * This mixin allows you to apply a linear gradient shadow to any HTMLElement.
 * Note that this mixin make use of the :before pseudo class.
 *
 * @param       {Number|String}         [x=0]           The x offset
 * @param       {Number|String}         [y=0]           The y offset
 * @param       {Number|String}         [blur=0]        The blur amount
 * @param       {Number|String}         [spread=0]      The spread amount
 * @param       {String}                [startColor=sugar.color(accent)]            The start color
 * @param       {String}                [endColor=sugar.color(complementary)]       The end color
 * @param           {String}            [angle=90deg]           The gradient angle
 * @return        {Css}           The generated css
 *
 * @example        css
 * .myCoolElement {
 *    @s.shadow.gradient(0, 10px, 10px, 0, s.color(accent), s.color(complementary));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFFSCxNQUFNLHlDQUEwQyxTQUFRLFlBQVk7SUFDaEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUscUJBQXFCO2FBQ2pDO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSw0QkFBNEI7YUFDeEM7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsT0FBTyxFQUFFLE9BQU87YUFDbkI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBWUQsT0FBTyxFQUFFLHlDQUF5QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBQ2xFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsQ0FBQyxFQUFFLENBQUMsRUFDSixDQUFDLEVBQUUsQ0FBQyxFQUNKLElBQUksRUFBRSxDQUFDLEVBQ1AsTUFBTSxFQUFFLENBQUMsRUFDVCxVQUFVLEVBQUUsRUFBRSxFQUNkLFFBQVEsRUFBRSxFQUFFLEVBQ1osS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNO0lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OEJBTUUsT0FBTyxXQUFXLENBQUMsQ0FBQyxLQUFLLFFBQVE7UUFDN0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsSUFBSTtRQUN0QixDQUFDLENBQUMsV0FBVyxDQUFDLENBQ3RCOytCQUVJLE9BQU8sV0FBVyxDQUFDLENBQUMsS0FBSyxRQUFRO1FBQzdCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLElBQUk7UUFDdEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUN0Qjs7MENBRThCLFdBQVcsQ0FBQyxLQUFLLEtBQ25ELFdBQVcsQ0FBQyxVQUNoQixLQUFLLFdBQVcsQ0FBQyxRQUFROzJCQUNGLFdBQVcsQ0FBQyxJQUFJO3FEQUNVLFdBQVcsQ0FBQyxNQUFNOztjQUV6RCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQzs7O0tBRzlELENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==