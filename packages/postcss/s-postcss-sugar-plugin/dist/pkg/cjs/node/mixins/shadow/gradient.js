"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0seUNBQTBDLFNBQVEscUJBQVk7SUFDaEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsZUFBZTtnQkFDckIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELFVBQVUsRUFBRTtnQkFDUixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUscUJBQXFCO2FBQ2pDO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSw0QkFBNEI7YUFDeEM7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsT0FBTyxFQUFFLE9BQU87YUFDbkI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBWXFELDhEQUFTO0FBQy9ELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixDQUFDLEVBQUUsQ0FBQyxFQUNKLENBQUMsRUFBRSxDQUFDLEVBQ0osSUFBSSxFQUFFLENBQUMsRUFDUCxNQUFNLEVBQUUsQ0FBQyxFQUNULFVBQVUsRUFBRSxFQUFFLEVBQ2QsUUFBUSxFQUFFLEVBQUUsRUFDWixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU07SUFDTixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs4QkFNRSxPQUFPLFdBQVcsQ0FBQyxDQUFDLEtBQUssUUFBUTtRQUM3QixDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxJQUFJO1FBQ3RCLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FDdEI7K0JBRUksT0FBTyxXQUFXLENBQUMsQ0FBQyxLQUFLLFFBQVE7UUFDN0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsSUFBSTtRQUN0QixDQUFDLENBQUMsV0FBVyxDQUFDLENBQ3RCOzswQ0FFOEIsV0FBVyxDQUFDLEtBQUssS0FDbkQsV0FBVyxDQUFDLFVBQ2hCLEtBQUssV0FBVyxDQUFDLFFBQVE7MkJBQ0YsV0FBVyxDQUFDLElBQUk7cURBQ1UsV0FBVyxDQUFDLE1BQU07O2NBRXpELE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDOzs7S0FHOUQsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQW5ERCw0QkFtREMifQ==