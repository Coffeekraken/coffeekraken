"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
class postcssSugarPluginShadowGradientInterface extends s_interface_1.default {
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
exports.interface = postcssSugarPluginShadowGradientInterface;
function default_1({ params, atRule, replaceWith, }) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBRUgsTUFBTSx5Q0FBMEMsU0FBUSxxQkFBWTtJQUNoRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxlQUFlO2dCQUNyQixRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxlQUFlO2dCQUNyQixRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxlQUFlO2dCQUNyQixRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLElBQUksRUFBRSxlQUFlO2dCQUNyQixRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxxQkFBcUI7YUFDakM7WUFDRCxRQUFRLEVBQUU7Z0JBQ04sSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLDRCQUE0QjthQUN4QztZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsS0FBSztnQkFDZixPQUFPLEVBQUUsT0FBTzthQUNuQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFZcUQsOERBQVM7QUFDL0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLENBQUMsRUFBRSxDQUFDLEVBQ0osQ0FBQyxFQUFFLENBQUMsRUFDSixJQUFJLEVBQUUsQ0FBQyxFQUNQLE1BQU0sRUFBRSxDQUFDLEVBQ1QsVUFBVSxFQUFFLEVBQUUsRUFDZCxRQUFRLEVBQUUsRUFBRSxFQUNaLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7OzhCQU1FLE9BQU8sV0FBVyxDQUFDLENBQUMsS0FBSyxRQUFRO1FBQzdCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLElBQUk7UUFDdEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUN0QjsrQkFFSSxPQUFPLFdBQVcsQ0FBQyxDQUFDLEtBQUssUUFBUTtRQUM3QixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxJQUFJO1FBQ3RCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FDdEI7OzBDQUU4QixXQUFXLENBQUMsS0FBSyxLQUNuRCxXQUFXLENBQUMsVUFDaEIsS0FBSyxXQUFXLENBQUMsUUFBUTsyQkFDRixXQUFXLENBQUMsSUFBSTtxREFDVSxXQUFXLENBQUMsTUFBTTs7Y0FFekQsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7OztLQUc5RCxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBbkRELDRCQW1EQyJ9