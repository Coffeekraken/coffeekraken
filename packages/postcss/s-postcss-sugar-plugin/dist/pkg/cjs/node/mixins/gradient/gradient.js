"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name           gradient
 * @as              @s.gradient
 * @namespace      node.mixin.gradient
 * @type           PostcssMixin
 * @platform      postcss
 * @status        alpha
 *
 * This mixin generate all the css needed to apply a gradient on your elements
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @s.gradient($1, $2, $3)
 *
 * @example        css
 * .my-cool-element {
 *    @s.gradient(accent, secondary, radial);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginGradientInterface extends s_interface_1.default {
    static get _definition() {
        return {
            start: {
                type: 'String',
                required: true,
                alias: 's',
            },
            end: {
                type: 'String',
                required: true,
                alias: 'e',
            },
            type: {
                type: 'String',
                values: ['linear', 'radial'],
                default: 'linear',
            },
            x: {
                type: 'String',
                default: s_theme_1.default.get('gradient.defaultX'),
            },
            y: {
                type: 'String',
                default: s_theme_1.default.get('gradient.defaultY'),
            },
            angle: {
                type: 'Number | String',
                default: s_theme_1.default.get('gradient.defaultAngle'),
            },
            size: {
                type: 'String',
                default: 'farthest-corner',
            },
        };
    }
}
exports.interface = postcssSugarPluginGradientInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ start: '', end: '', x: '50%', y: '50%', type: 'linear', angle: '90deg', size: 'circle' }, params);
    let startColorValue = finalParams.start, endColorValue = finalParams.end;
    const themeColorsObj = s_theme_1.default.get('color');
    if (startColorValue.match(/^[a-zA-Z0-9:_-]+$/) &&
        themeColorsObj[startColorValue]) {
        startColorValue = `s.color(${startColorValue})`;
    }
    if (endColorValue.match(/^[a-zA-Z0-9:_-]+$/) &&
        themeColorsObj[endColorValue]) {
        endColorValue = `s.color(${endColorValue})`;
    }
    const variables = [];
    let gradientCss = [...variables];
    if (finalParams.type === 'linear') {
        gradientCss.push(`background-image: linear-gradient(var(--s-gradient-angle, ${finalParams.angle}), var(--s-gradient-start, ${startColorValue}) 0%, var(--s-gradient-end, ${endColorValue}) 100%);`);
    }
    else if (finalParams.type === 'radial') {
        gradientCss.push(`background-image: radial-gradient(${finalParams.size} at var(--s-gradient-x, ${finalParams.x}) var(--s-gradient-y, ${finalParams.y}), var(--s-gradient-start, ${startColorValue}) 0%, var(--s-gradient-end, ${endColorValue}) 100%);`);
    }
    return gradientCss;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUVILE1BQU0sbUNBQW9DLFNBQVEscUJBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztnQkFDNUIsT0FBTyxFQUFFLFFBQVE7YUFDcEI7WUFDRCxDQUFDLEVBQUU7Z0JBQ0MsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO2FBQzdDO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQzthQUM3QztZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDakQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFpQjthQUM3QjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFZK0Msd0RBQVM7QUFFekQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxFQUFFLEVBQ1QsR0FBRyxFQUFFLEVBQUUsRUFDUCxDQUFDLEVBQUUsS0FBSyxFQUNSLENBQUMsRUFBRSxLQUFLLEVBQ1IsSUFBSSxFQUFFLFFBQVEsRUFDZCxLQUFLLEVBQUUsT0FBTyxFQUNkLElBQUksRUFBRSxRQUFRLElBQ1gsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLGVBQWUsR0FBRyxXQUFXLENBQUMsS0FBSyxFQUNuQyxhQUFhLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQztJQUVwQyxNQUFNLGNBQWMsR0FBRyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU3QyxJQUNJLGVBQWUsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUM7UUFDMUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxFQUNqQztRQUNFLGVBQWUsR0FBRyxXQUFXLGVBQWUsR0FBRyxDQUFDO0tBQ25EO0lBQ0QsSUFDSSxhQUFhLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1FBQ3hDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFDL0I7UUFDRSxhQUFhLEdBQUcsV0FBVyxhQUFhLEdBQUcsQ0FBQztLQUMvQztJQUVELE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUVyQixJQUFJLFdBQVcsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7SUFFakMsSUFBSSxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUMvQixXQUFXLENBQUMsSUFBSSxDQUNaLDZEQUE2RCxXQUFXLENBQUMsS0FBSyw4QkFBOEIsZUFBZSwrQkFBK0IsYUFBYSxVQUFVLENBQ3BMLENBQUM7S0FDTDtTQUFNLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDdEMsV0FBVyxDQUFDLElBQUksQ0FDWixxQ0FBcUMsV0FBVyxDQUFDLElBQUksMkJBQTJCLFdBQVcsQ0FBQyxDQUFDLHlCQUF5QixXQUFXLENBQUMsQ0FBQyw4QkFBOEIsZUFBZSwrQkFBK0IsYUFBYSxVQUFVLENBQ3pPLENBQUM7S0FDTDtJQUVELE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUM7QUFyREQsNEJBcURDIn0=