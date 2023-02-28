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
 * @namespace      node.mixin.gradient
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the css needed to apply a gradient on your elements
 *
 * @return        {Css}         The generated css
 *
 * @snippet         @sugar.gradient($1, $2, $3)
 *
 * @example        css
 * .my-cool-element {
 *    \@sugar.gradient(accent, secondary, radial);
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
        startColorValue = `sugar.color(${startColorValue})`;
    }
    if (endColorValue.match(/^[a-zA-Z0-9:_-]+$/) &&
        themeColorsObj[endColorValue]) {
        endColorValue = `sugar.color(${endColorValue})`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBTSxtQ0FBb0MsU0FBUSxxQkFBWTtJQUMxRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO2dCQUM1QixPQUFPLEVBQUUsUUFBUTthQUNwQjtZQUNELENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7YUFDN0M7WUFDRCxDQUFDLEVBQUU7Z0JBQ0MsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO2FBQzdDO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQzthQUNqRDtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsaUJBQWlCO2FBQzdCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVkrQyx3REFBUztBQUV6RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsRUFDVCxHQUFHLEVBQUUsRUFBRSxFQUNQLENBQUMsRUFBRSxLQUFLLEVBQ1IsQ0FBQyxFQUFFLEtBQUssRUFDUixJQUFJLEVBQUUsUUFBUSxFQUNkLEtBQUssRUFBRSxPQUFPLEVBQ2QsSUFBSSxFQUFFLFFBQVEsSUFDWCxNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksZUFBZSxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQ25DLGFBQWEsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDO0lBRXBDLE1BQU0sY0FBYyxHQUFHLGlCQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTdDLElBQ0ksZUFBZSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztRQUMxQyxjQUFjLENBQUMsZUFBZSxDQUFDLEVBQ2pDO1FBQ0UsZUFBZSxHQUFHLGVBQWUsZUFBZSxHQUFHLENBQUM7S0FDdkQ7SUFDRCxJQUNJLGFBQWEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUM7UUFDeEMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxFQUMvQjtRQUNFLGFBQWEsR0FBRyxlQUFlLGFBQWEsR0FBRyxDQUFDO0tBQ25EO0lBRUQsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBRXJCLElBQUksV0FBVyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztJQUVqQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQy9CLFdBQVcsQ0FBQyxJQUFJLENBQ1osNkRBQTZELFdBQVcsQ0FBQyxLQUFLLDhCQUE4QixlQUFlLCtCQUErQixhQUFhLFVBQVUsQ0FDcEwsQ0FBQztLQUNMO1NBQU0sSUFBSSxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUN0QyxXQUFXLENBQUMsSUFBSSxDQUNaLHFDQUFxQyxXQUFXLENBQUMsSUFBSSwyQkFBMkIsV0FBVyxDQUFDLENBQUMseUJBQXlCLFdBQVcsQ0FBQyxDQUFDLDhCQUE4QixlQUFlLCtCQUErQixhQUFhLFVBQVUsQ0FDek8sQ0FBQztLQUNMO0lBRUQsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQztBQXJERCw0QkFxREMifQ==