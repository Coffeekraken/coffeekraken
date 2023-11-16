import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
class SSugarcssPluginGradientInterface extends __SInterface {
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
                default: __STheme.current.get('gradient.defaultX'),
            },
            y: {
                type: 'String',
                default: __STheme.current.get('gradient.defaultY'),
            },
            angle: {
                type: 'Number | String',
                default: __STheme.current.get('gradient.defaultAngle'),
            },
            size: {
                type: 'String',
                default: 'farthest-corner',
            },
        };
    }
}
export { SSugarcssPluginGradientInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ start: '', end: '', x: '50%', y: '50%', type: 'linear', angle: '90deg', size: 'circle' }, params);
    let startColorValue = finalParams.start, endColorValue = finalParams.end;
    const themeColorsObj = __STheme.current.get('color');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFFSCxNQUFNLGdDQUFpQyxTQUFRLFlBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztnQkFDNUIsT0FBTyxFQUFFLFFBQVE7YUFDcEI7WUFDRCxDQUFDLEVBQUU7Z0JBQ0MsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDO2FBQ3JEO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQzthQUNyRDtZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDekQ7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGlCQUFpQjthQUM3QjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFZRCxPQUFPLEVBQUUsZ0NBQWdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFekQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxFQUNULEdBQUcsRUFBRSxFQUFFLEVBQ1AsQ0FBQyxFQUFFLEtBQUssRUFDUixDQUFDLEVBQUUsS0FBSyxFQUNSLElBQUksRUFBRSxRQUFRLEVBQ2QsS0FBSyxFQUFFLE9BQU8sRUFDZCxJQUFJLEVBQUUsUUFBUSxJQUNYLE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxlQUFlLEdBQUcsV0FBVyxDQUFDLEtBQUssRUFDbkMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7SUFFcEMsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFckQsSUFDSSxlQUFlLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1FBQzFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsRUFDakM7UUFDRSxlQUFlLEdBQUcsV0FBVyxlQUFlLEdBQUcsQ0FBQztLQUNuRDtJQUNELElBQ0ksYUFBYSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztRQUN4QyxjQUFjLENBQUMsYUFBYSxDQUFDLEVBQy9CO1FBQ0UsYUFBYSxHQUFHLFdBQVcsYUFBYSxHQUFHLENBQUM7S0FDL0M7SUFFRCxNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFFckIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDO0lBRWpDLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDL0IsV0FBVyxDQUFDLElBQUksQ0FDWiw2REFBNkQsV0FBVyxDQUFDLEtBQUssOEJBQThCLGVBQWUsK0JBQStCLGFBQWEsVUFBVSxDQUNwTCxDQUFDO0tBQ0w7U0FBTSxJQUFJLFdBQVcsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQ3RDLFdBQVcsQ0FBQyxJQUFJLENBQ1oscUNBQXFDLFdBQVcsQ0FBQyxJQUFJLDJCQUEyQixXQUFXLENBQUMsQ0FBQyx5QkFBeUIsV0FBVyxDQUFDLENBQUMsOEJBQThCLGVBQWUsK0JBQStCLGFBQWEsVUFBVSxDQUN6TyxDQUFDO0tBQ0w7SUFFRCxPQUFPLFdBQVcsQ0FBQztBQUN2QixDQUFDIn0=