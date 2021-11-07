import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name           gradient
 * @namespace      node.mixins.gradient
 * @type           PostcssMixin
 * @platform      css
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
    static get definition() {
        var _a;
        return ((_a = this.cached()) !== null && _a !== void 0 ? _a : this.cache({
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
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncmFkaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsTUFBTSxtQ0FBb0MsU0FBUSxZQUFZO0lBQzFELE1BQU0sS0FBSyxVQUFVOztRQUNqQixPQUFPLENBQ0gsTUFBQSxJQUFJLENBQUMsTUFBTSxFQUFFLG1DQUNiLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDUCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7Z0JBQzVCLE9BQU8sRUFBRSxRQUFRO2FBQ3BCO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsQ0FBQyxFQUFFO2dCQUNDLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxJQUFJLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLGVBQWU7YUFDM0I7U0FDSixDQUFDLENBQ0wsQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVlELE9BQU8sRUFBRSxtQ0FBbUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUU1RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxFQUFFLEVBQ1QsR0FBRyxFQUFFLEVBQUUsRUFDUCxDQUFDLEVBQUUsS0FBSyxFQUNSLENBQUMsRUFBRSxLQUFLLEVBQ1IsSUFBSSxFQUFFLFFBQVEsRUFDZCxLQUFLLEVBQUUsQ0FBQyxFQUNSLElBQUksRUFBRSxlQUFlLElBQ2xCLE1BQU0sQ0FDWixDQUFDO0lBRUYsSUFBSSxhQUFhLEdBQUcsV0FBVyxDQUFDLEtBQUssRUFDakMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUM7SUFFbEMsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVoRCxJQUNJLGFBQWEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUM7UUFDeEMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxFQUMvQjtRQUNFLGFBQWEsR0FBRyxlQUFlLGFBQWEsR0FBRyxDQUFDO0tBQ25EO0lBQ0QsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLElBQUksY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ3ZFLFdBQVcsR0FBRyxlQUFlLFdBQVcsR0FBRyxDQUFDO0tBQy9DO0lBRUQsTUFBTSxRQUFRLEdBQ1YsT0FBTyxXQUFXLENBQUMsS0FBSyxLQUFLLFFBQVE7UUFDakMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssS0FBSztRQUMzQixDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQztJQUU1QixJQUFJLFdBQVcsR0FBRywrQkFBK0IsUUFBUSxLQUFLLGFBQWEsUUFBUSxXQUFXLFNBQVMsQ0FBQztJQUV4RyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQy9CLFdBQVcsR0FBRywrQkFBK0IsV0FBVyxDQUFDLElBQUksT0FBTyxXQUFXLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLEtBQUssYUFBYSxRQUFRLFdBQVcsU0FBUyxDQUFDO0tBQ3BKO0lBQ0QsTUFBTSxJQUFJLEdBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUVyQyxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=