"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name          dropdown
 * @as              @s.ui.dropdown
 * @namespace     node.mixin.ui.dropdown
 * @type               PostcssMixin
 * @interface     ./dropdown          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the dropdown style to any element
 *
 * @param       {'top'|'top-start'|'top-end'|'bottom'|'bottom-start'|'bottom-end'}          [position='bottom']         The position of the dropdown
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 * @scope       position        Position css
 *
 * @snippet         @s.ui.dropdown
 *
 * @example     css
 * .my-dropdown {
 *    @s.ui.dropdown;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiDropdownInterface extends s_interface_1.default {
    static get _definition() {
        return {
            position: {
                type: 'String',
                values: [
                    'top',
                    'top-start',
                    'top-end',
                    'bottom',
                    'bottom-start',
                    'bottom-end',
                ],
                default: 'bottom',
            },
        };
    }
}
exports.interface = SSugarcssPluginUiDropdownInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ position: 'bottom' }, params);
    const vars = [];
    vars.push(`
            @s.scope 'bare' {
                font-size: s.scalable(1rem);
                position: absolute;
                -webkit-appearance: none;
                appearance: none;
                line-height: 1;
                outline: 0;
                white-space: nowrap;
                cursor: auto;
                z-index: 50;

                @s.state.disabled {
                    @s.disabled;
                    opacity: 0 !important;
                }
            }
      `);
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`
            background-color: s.color(main, background);
            border: s.border.width(ui.dropdown.borderWidth) solid s.color(current, border);
            @s.border.radius(ui.dropdown.borderRadius);
            padding-inline: s.padding(ui.dropdown.paddingInline);
            padding-block: s.padding(ui.dropdown.paddingBlock);
            @s.depth(ui.dropdown.depth);
            @s.transition(fast);
        `);
    vars.push('}');
    vars.push(`@s.scope 'position' {`);
    switch (finalParams.position) {
        case 'top':
            vars.push(`
                    bottom: 100%;
                    top: auto;
                    left: 50%;
                    transform: translateX(-50%);
                `);
            break;
        case 'top-end':
            vars.push(`
                    bottom: 100%;
                    top: auto;
                    left: auto;
                    right: 0;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: auto;
                        left: 0;
                    }

                `);
            break;
        case 'top-start':
            vars.push(`
                    bottom: 100%;
                    top: auto;
                    left: 0;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: 0;
                        left: auto;
                    }
                `);
            break;
        case 'bottom-start':
            vars.push(`
                    top: 100%;
                    left: 0;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: 0;
                        left: auto;
                    }
                `);
            break;
        case 'bottom-end':
            vars.push(`
                    top: 100%;
                    right: 0;
                    left: auto;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: auto;
                        left: 0;
                    }
                `);
            break;
        case 'bottom':
        default:
            vars.push(`
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                `);
            break;
    }
    vars.push('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBRUgsTUFBTSxrQ0FBbUMsU0FBUSxxQkFBWTtJQUN6RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRTtvQkFDSixLQUFLO29CQUNMLFdBQVc7b0JBQ1gsU0FBUztvQkFDVCxRQUFRO29CQUNSLGNBQWM7b0JBQ2QsWUFBWTtpQkFDZjtnQkFDRCxPQUFPLEVBQUUsUUFBUTthQUNwQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFZOEMsdURBQVM7QUFFeEQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLFFBQVEsRUFBRSxRQUFRLElBQ2YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQlAsQ0FBQyxDQUFDO0lBRUwsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzlCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7O1NBUUwsQ0FBQyxDQUFDO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLElBQUksQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQztJQUNuQyxRQUFRLFdBQVcsQ0FBQyxRQUFRLEVBQUU7UUFDMUIsS0FBSyxLQUFLO1lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7aUJBS0wsQ0FBQyxDQUFDO1lBQ1AsTUFBTTtRQUNWLEtBQUssU0FBUztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7aUJBYUwsQ0FBQyxDQUFDO1lBQ1AsTUFBTTtRQUNWLEtBQUssV0FBVztZQUNaLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7O2lCQVdMLENBQUMsQ0FBQztZQUNQLE1BQU07UUFDVixLQUFLLGNBQWM7WUFDZixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7O2lCQVVMLENBQUMsQ0FBQztZQUNQLE1BQU07UUFDVixLQUFLLFlBQVk7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7OztpQkFXTCxDQUFDLENBQUM7WUFDUCxNQUFNO1FBQ1YsS0FBSyxRQUFRLENBQUM7UUFDZDtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7aUJBSUwsQ0FBQyxDQUFDO1lBQ1AsTUFBTTtLQUNiO0lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUE5SEQsNEJBOEhDIn0=