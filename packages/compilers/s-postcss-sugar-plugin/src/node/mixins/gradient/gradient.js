import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           gradient
 * @namespace      node.mixins.gradient
 * @type           PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin generate all the css needed to apply a gradient on your elements
 *
 * @return        {Css}         The generated css
 *
 * @example         postcss
 * .my-cool-element {
 *    \@sugar.gradient(accent, secondary, radial);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
            },
            y: {
                type: 'String',
            },
            angle: {
                type: 'Number | String',
                default: 0,
            },
            size: {
                type: 'String',
                default: 'farthest-side',
            },
        };
    }
}
export { postcssSugarPluginGradientInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ start: '', end: '', x: '50%', y: '50%', type: 'linear', angle: 0, size: 'farthest-side' }, params);
    let startColorVar = finalParams.start, endColorVar = finalParams.end;
    const themeColorsObj = __STheme.config('color');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncmFkaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsTUFBTSxtQ0FBb0MsU0FBUSxZQUFZO0lBQzFELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7Z0JBQzVCLE9BQU8sRUFBRSxRQUFRO2FBQ3BCO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGVBQWU7YUFDM0I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBWUQsT0FBTyxFQUFFLG1DQUFtQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsRUFDVCxHQUFHLEVBQUUsRUFBRSxFQUNQLENBQUMsRUFBRSxLQUFLLEVBQ1IsQ0FBQyxFQUFFLEtBQUssRUFDUixJQUFJLEVBQUUsUUFBUSxFQUNkLEtBQUssRUFBRSxDQUFDLEVBQ1IsSUFBSSxFQUFFLGVBQWUsSUFDbEIsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLGFBQWEsR0FBRyxXQUFXLENBQUMsS0FBSyxFQUNqQyxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQztJQUVsQyxNQUFNLGNBQWMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBRWhELElBQ0ksYUFBYSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQztRQUN4QyxjQUFjLENBQUMsYUFBYSxDQUFDLEVBQy9CO1FBQ0UsYUFBYSxHQUFHLGVBQWUsYUFBYSxHQUFHLENBQUM7S0FDbkQ7SUFDRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsSUFBSSxjQUFjLENBQUMsV0FBVyxDQUFDLEVBQUU7UUFDdkUsV0FBVyxHQUFHLGVBQWUsV0FBVyxHQUFHLENBQUM7S0FDL0M7SUFFRCxNQUFNLFFBQVEsR0FDVixPQUFPLFdBQVcsQ0FBQyxLQUFLLEtBQUssUUFBUTtRQUNqQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxLQUFLO1FBQzNCLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO0lBRTVCLElBQUksV0FBVyxHQUFHLCtCQUErQixRQUFRLEtBQUssYUFBYSxRQUFRLFdBQVcsU0FBUyxDQUFDO0lBRXhHLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDL0IsV0FBVyxHQUFHLCtCQUErQixXQUFXLENBQUMsSUFBSSxPQUFPLFdBQVcsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUMsS0FBSyxhQUFhLFFBQVEsV0FBVyxTQUFTLENBQUM7S0FDcEo7SUFDRCxNQUFNLElBQUksR0FBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXJDLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==