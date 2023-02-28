import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sbUNBQW9DLFNBQVEsWUFBWTtJQUMxRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDO2dCQUM1QixPQUFPLEVBQUUsUUFBUTthQUNwQjtZQUNELENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQzthQUM3QztZQUNELENBQUMsRUFBRTtnQkFDQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQzthQUM3QztZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQzthQUNqRDtZQUNELElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsaUJBQWlCO2FBQzdCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVlELE9BQU8sRUFBRSxtQ0FBbUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU1RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxFQUFFLEVBQ1QsR0FBRyxFQUFFLEVBQUUsRUFDUCxDQUFDLEVBQUUsS0FBSyxFQUNSLENBQUMsRUFBRSxLQUFLLEVBQ1IsSUFBSSxFQUFFLFFBQVEsRUFDZCxLQUFLLEVBQUUsT0FBTyxFQUNkLElBQUksRUFBRSxRQUFRLElBQ1gsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLGVBQWUsR0FBRyxXQUFXLENBQUMsS0FBSyxFQUNuQyxhQUFhLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQztJQUVwQyxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRTdDLElBQ0ksZUFBZSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztRQUMxQyxjQUFjLENBQUMsZUFBZSxDQUFDLEVBQ2pDO1FBQ0UsZUFBZSxHQUFHLGVBQWUsZUFBZSxHQUFHLENBQUM7S0FDdkQ7SUFDRCxJQUNJLGFBQWEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUM7UUFDeEMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxFQUMvQjtRQUNFLGFBQWEsR0FBRyxlQUFlLGFBQWEsR0FBRyxDQUFDO0tBQ25EO0lBRUQsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBRXJCLElBQUksV0FBVyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQztJQUVqQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQy9CLFdBQVcsQ0FBQyxJQUFJLENBQ1osNkRBQTZELFdBQVcsQ0FBQyxLQUFLLDhCQUE4QixlQUFlLCtCQUErQixhQUFhLFVBQVUsQ0FDcEwsQ0FBQztLQUNMO1NBQU0sSUFBSSxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUN0QyxXQUFXLENBQUMsSUFBSSxDQUNaLHFDQUFxQyxXQUFXLENBQUMsSUFBSSwyQkFBMkIsV0FBVyxDQUFDLENBQUMseUJBQXlCLFdBQVcsQ0FBQyxDQUFDLDhCQUE4QixlQUFlLCtCQUErQixhQUFhLFVBQVUsQ0FDek8sQ0FBQztLQUNMO0lBRUQsT0FBTyxXQUFXLENBQUM7QUFDdkIsQ0FBQyJ9