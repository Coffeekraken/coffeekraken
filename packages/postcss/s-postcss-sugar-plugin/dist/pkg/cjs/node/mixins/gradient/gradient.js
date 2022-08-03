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
            },
            y: {
                type: 'String',
            },
            angle: {
                type: 'Number | String',
                default: 0,
            },
            size: {
                type: 'String',
                default: 'farthest-side',
            },
        };
    }
}
exports.interface = postcssSugarPluginGradientInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ start: '', end: '', x: '50%', y: '50%', type: 'linear', angle: 0, size: 'farthest-side' }, params);
    let startColorVar = finalParams.start, endColorVar = finalParams.end;
    const themeColorsObj = s_theme_1.default.get('color');
    if (startColorVar.match(/^[a-zA-Z0-9:_-]+$/) &&
        themeColorsObj[startColorVar]) {
        startColorVar = `sugar.color(${startColorVar})`;
    }
    if (endColorVar.match(/^[a-zA-Z0-9:_-]+$/) && themeColorsObj[endColorVar]) {
        endColorVar = `sugar.color(${endColorVar})`;
    }
    const angleVar = typeof finalParams.angle === 'number'
        ? `${finalParams.angle}deg`
        : finalParams.angle;
    let gradientCss = `background: linear-gradient(${angleVar}, ${startColorVar} 0%, ${endColorVar} 100%);`;
    if (finalParams.type === 'radial') {
        gradientCss = `background: radial-gradient(${finalParams.size} at ${finalParams.x} ${finalParams.y}, ${startColorVar} 0%, ${endColorVar} 100%);`;
    }
    const vars = [gradientCss];
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQUVILE1BQU0sbUNBQW9DLFNBQVEscUJBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztnQkFDNUIsT0FBTyxFQUFFLFFBQVE7YUFDcEI7WUFDRCxDQUFDLEVBQUU7Z0JBQ0MsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxDQUFDLEVBQUU7Z0JBQ0MsSUFBSSxFQUFFLFFBQVE7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLGlCQUFpQjtnQkFDdkIsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsZUFBZTthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFZK0Msd0RBQVM7QUFFekQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxFQUFFLEVBQ1QsR0FBRyxFQUFFLEVBQUUsRUFDUCxDQUFDLEVBQUUsS0FBSyxFQUNSLENBQUMsRUFBRSxLQUFLLEVBQ1IsSUFBSSxFQUFFLFFBQVEsRUFDZCxLQUFLLEVBQUUsQ0FBQyxFQUNSLElBQUksRUFBRSxlQUFlLElBQ2xCLE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxhQUFhLEdBQUcsV0FBVyxDQUFDLEtBQUssRUFDakMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7SUFFbEMsTUFBTSxjQUFjLEdBQUcsaUJBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFN0MsSUFDSSxhQUFhLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1FBQ3hDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFDL0I7UUFDRSxhQUFhLEdBQUcsZUFBZSxhQUFhLEdBQUcsQ0FBQztLQUNuRDtJQUNELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUN2RSxXQUFXLEdBQUcsZUFBZSxXQUFXLEdBQUcsQ0FBQztLQUMvQztJQUVELE1BQU0sUUFBUSxHQUNWLE9BQU8sV0FBVyxDQUFDLEtBQUssS0FBSyxRQUFRO1FBQ2pDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEtBQUs7UUFDM0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFFNUIsSUFBSSxXQUFXLEdBQUcsK0JBQStCLFFBQVEsS0FBSyxhQUFhLFFBQVEsV0FBVyxTQUFTLENBQUM7SUFFeEcsSUFBSSxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUMvQixXQUFXLEdBQUcsK0JBQStCLFdBQVcsQ0FBQyxJQUFJLE9BQU8sV0FBVyxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxLQUFLLGFBQWEsUUFBUSxXQUFXLFNBQVMsQ0FBQztLQUNwSjtJQUNELE1BQU0sSUFBSSxHQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFckMsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQWhERCw0QkFnREMifQ==