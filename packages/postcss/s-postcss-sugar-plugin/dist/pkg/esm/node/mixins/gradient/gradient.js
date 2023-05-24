import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           gradient
 * @as              @sugar.gradient
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
class postcssSugarPluginGradientInterface extends __SInterface {
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
                default: __STheme.get('gradient.defaultX'),
            },
            y: {
                type: 'String',
                default: __STheme.get('gradient.defaultY'),
            },
            angle: {
                type: 'Number | String',
                default: __STheme.get('gradient.defaultAngle'),
            },
            size: {
                type: 'String',
                default: 'farthest-corner',
            },
        };
    }
}
export { postcssSugarPluginGradientInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ start: '', end: '', x: '50%', y: '50%', type: 'linear', angle: '90deg', size: 'circle' }, params);
    let startColorValue = finalParams.start, endColorValue = finalParams.end;
    const themeColorsObj = __STheme.get('color');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLG1DQUFvQyxTQUFRLFlBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztnQkFDNUIsT0FBTyxFQUFFLFFBQVE7YUFDcEI7WUFDRCxDQUFDLEVBQUU7Z0JBQ0MsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7YUFDN0M7WUFDRCxDQUFDLEVBQUU7Z0JBQ0MsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUM7YUFDN0M7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLGlCQUFpQjtnQkFDdkIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDakQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFpQjthQUM3QjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFZRCxPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxFQUNULEdBQUcsRUFBRSxFQUFFLEVBQ1AsQ0FBQyxFQUFFLEtBQUssRUFDUixDQUFDLEVBQUUsS0FBSyxFQUNSLElBQUksRUFBRSxRQUFRLEVBQ2QsS0FBSyxFQUFFLE9BQU8sRUFDZCxJQUFJLEVBQUUsUUFBUSxJQUNYLE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxlQUFlLEdBQUcsV0FBVyxDQUFDLEtBQUssRUFDbkMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7SUFFcEMsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUU3QyxJQUNJLGVBQWUsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUM7UUFDMUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxFQUNqQztRQUNFLGVBQWUsR0FBRyxlQUFlLGVBQWUsR0FBRyxDQUFDO0tBQ3ZEO0lBQ0QsSUFDSSxhQUFhLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1FBQ3hDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFDL0I7UUFDRSxhQUFhLEdBQUcsZUFBZSxhQUFhLEdBQUcsQ0FBQztLQUNuRDtJQUVELE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUVyQixJQUFJLFdBQVcsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUM7SUFFakMsSUFBSSxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUMvQixXQUFXLENBQUMsSUFBSSxDQUNaLDZEQUE2RCxXQUFXLENBQUMsS0FBSyw4QkFBOEIsZUFBZSwrQkFBK0IsYUFBYSxVQUFVLENBQ3BMLENBQUM7S0FDTDtTQUFNLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDdEMsV0FBVyxDQUFDLElBQUksQ0FDWixxQ0FBcUMsV0FBVyxDQUFDLElBQUksMkJBQTJCLFdBQVcsQ0FBQyxDQUFDLHlCQUF5QixXQUFXLENBQUMsQ0FBQyw4QkFBOEIsZUFBZSwrQkFBK0IsYUFBYSxVQUFVLENBQ3pPLENBQUM7S0FDTDtJQUVELE9BQU8sV0FBVyxDQUFDO0FBQ3ZCLENBQUMifQ==