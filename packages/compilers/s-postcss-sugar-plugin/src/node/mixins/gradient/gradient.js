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
}
postcssSugarPluginGradientInterface.definition = {
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
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncmFkaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBRUgsTUFBTSxtQ0FBb0MsU0FBUSxZQUFZOztBQUNuRCw4Q0FBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNiO0lBQ0QsR0FBRyxFQUFFO1FBQ0QsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ2I7SUFDRCxJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7UUFDNUIsT0FBTyxFQUFFLFFBQVE7S0FDcEI7SUFDRCxDQUFDLEVBQUU7UUFDQyxJQUFJLEVBQUUsUUFBUTtLQUNqQjtJQUNELENBQUMsRUFBRTtRQUNDLElBQUksRUFBRSxRQUFRO0tBQ2pCO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsZUFBZTtLQUMzQjtDQUNKLENBQUM7QUFhTixPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxFQUNULEdBQUcsRUFBRSxFQUFFLEVBQ1AsQ0FBQyxFQUFFLEtBQUssRUFDUixDQUFDLEVBQUUsS0FBSyxFQUNSLElBQUksRUFBRSxRQUFRLEVBQ2QsS0FBSyxFQUFFLENBQUMsRUFDUixJQUFJLEVBQUUsZUFBZSxJQUNsQixNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksYUFBYSxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQ2pDLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDO0lBRWxDLE1BQU0sY0FBYyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFaEQsSUFDSSxhQUFhLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDO1FBQ3hDLGNBQWMsQ0FBQyxhQUFhLENBQUMsRUFDL0I7UUFDRSxhQUFhLEdBQUcsZUFBZSxhQUFhLEdBQUcsQ0FBQztLQUNuRDtJQUNELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBRTtRQUN2RSxXQUFXLEdBQUcsZUFBZSxXQUFXLEdBQUcsQ0FBQztLQUMvQztJQUVELE1BQU0sUUFBUSxHQUNWLE9BQU8sV0FBVyxDQUFDLEtBQUssS0FBSyxRQUFRO1FBQ2pDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEtBQUs7UUFDM0IsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFFNUIsSUFBSSxXQUFXLEdBQUcsK0JBQStCLFFBQVEsS0FBSyxhQUFhLFFBQVEsV0FBVyxTQUFTLENBQUM7SUFFeEcsSUFBSSxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUMvQixXQUFXLEdBQUcsK0JBQStCLFdBQVcsQ0FBQyxJQUFJLE9BQU8sV0FBVyxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxLQUFLLGFBQWEsUUFBUSxXQUFXLFNBQVMsQ0FBQztLQUNwSjtJQUNELE1BQU0sSUFBSSxHQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFckMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==