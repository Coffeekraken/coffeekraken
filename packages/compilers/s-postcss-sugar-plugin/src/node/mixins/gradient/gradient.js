import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
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
}
postcssSugarPluginGradientInterface.definition = {
    start: {
        type: 'String',
        required: true,
        alias: 's'
    },
    end: {
        type: 'String',
        required: true,
        alias: 'e'
    },
    type: {
        type: 'String',
        values: ['linear', 'radial'],
        default: 'linear'
    },
    x: {
        type: 'String'
    },
    y: {
        type: 'String'
    },
    angle: {
        type: 'Number | String',
        default: 0
    },
    size: {
        type: 'String',
        default: 'farthest-side'
    }
};
export { postcssSugarPluginGradientInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ start: '', end: '', x: '50%', y: '50%', type: 'linear', angle: 0, size: 'farthest-side' }, params);
    let startColorVar = finalParams.start, endColorVar = finalParams.end;
    const themeColorsObj = __theme().config('color');
    if (startColorVar.match(/^[a-zA-Z0-9:_-]+$/) &&
        themeColorsObj[startColorVar]) {
        startColorVar = `sugar.color(${startColorVar})`;
    }
    if (endColorVar.match(/^[a-zA-Z0-9:_-]+$/) && themeColorsObj[endColorVar]) {
        endColorVar = `sugar.color(${endColorVar})`;
    }
    const angleVar = typeof finalParams.angle === 'number' ? `${finalParams.angle}deg` : finalParams.angle;
    let gradientCss = `background: linear-gradient(${angleVar}, ${startColorVar} 0%, ${endColorVar} 100%);`;
    if (finalParams.type === 'radial') {
        gradientCss = `background: radial-gradient(${finalParams.size} at ${finalParams.x} ${finalParams.y}, ${startColorVar} 0%, ${endColorVar} 100%);`;
    }
    const vars = [gradientCss];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncmFkaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUV4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsTUFBTSxtQ0FBb0MsU0FBUSxZQUFZOztBQUNyRCw4Q0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsR0FBRyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7UUFDNUIsT0FBTyxFQUFFLFFBQVE7S0FDbEI7SUFDRCxDQUFDLEVBQUU7UUFDRCxJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsQ0FBQyxFQUFFO1FBQ0QsSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsT0FBTyxFQUFFLGVBQWU7S0FDekI7Q0FDRixDQUFDO0FBYUosT0FBTyxFQUFFLG1DQUFtQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEVBS1o7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsS0FBSyxFQUFFLEVBQUUsRUFDVCxHQUFHLEVBQUUsRUFBRSxFQUNQLENBQUMsRUFBRSxLQUFLLEVBQ1IsQ0FBQyxFQUFFLEtBQUssRUFDUixJQUFJLEVBQUUsUUFBUSxFQUNkLEtBQUssRUFBRSxDQUFDLEVBQ1IsSUFBSSxFQUFFLGVBQWUsSUFDbEIsTUFBTSxDQUNWLENBQUM7SUFFRixJQUFJLGFBQWEsR0FBRyxXQUFXLENBQUMsS0FBSyxFQUNuQyxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQztJQUVoQyxNQUFNLGNBQWMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFakQsSUFDRSxhQUFhLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1FBQ3hDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFDN0I7UUFDQSxhQUFhLEdBQUcsZUFBZSxhQUFhLEdBQUcsQ0FBQztLQUNqRDtJQUNELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUN6RSxXQUFXLEdBQUcsZUFBZSxXQUFXLEdBQUcsQ0FBQztLQUM3QztJQUVELE1BQU0sUUFBUSxHQUFHLE9BQU8sV0FBVyxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO0lBRXZHLElBQUksV0FBVyxHQUFHLCtCQUErQixRQUFRLEtBQUssYUFBYSxRQUFRLFdBQVcsU0FBUyxDQUFDO0lBRXhHLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDakMsV0FBVyxHQUFHLCtCQUErQixXQUFXLENBQUMsSUFBSSxPQUFPLFdBQVcsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUMsS0FBSyxhQUFhLFFBQVEsV0FBVyxTQUFTLENBQUM7S0FDbEo7SUFDRCxNQUFNLElBQUksR0FBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXJDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQixDQUFDIn0=