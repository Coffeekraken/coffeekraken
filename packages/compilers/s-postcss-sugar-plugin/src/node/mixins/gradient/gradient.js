import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncmFkaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUV4QyxNQUFNLG1DQUFvQyxTQUFRLFlBQVk7O0FBQ3JELDhDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztRQUM1QixPQUFPLEVBQUUsUUFBUTtLQUNsQjtJQUNELENBQUMsRUFBRTtRQUNELElBQUksRUFBRSxRQUFRO0tBQ2Y7SUFDRCxDQUFDLEVBQUU7UUFDRCxJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsZUFBZTtLQUN6QjtDQUNGLENBQUM7QUFhSixPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsRUFBRSxFQUNULEdBQUcsRUFBRSxFQUFFLEVBQ1AsQ0FBQyxFQUFFLEtBQUssRUFDUixDQUFDLEVBQUUsS0FBSyxFQUNSLElBQUksRUFBRSxRQUFRLEVBQ2QsS0FBSyxFQUFFLENBQUMsRUFDUixJQUFJLEVBQUUsZUFBZSxJQUNsQixNQUFNLENBQ1YsQ0FBQztJQUVGLElBQUksYUFBYSxHQUFHLFdBQVcsQ0FBQyxLQUFLLEVBQ25DLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDO0lBRWhDLE1BQU0sY0FBYyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVqRCxJQUNFLGFBQWEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUM7UUFDeEMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxFQUM3QjtRQUNBLGFBQWEsR0FBRyxlQUFlLGFBQWEsR0FBRyxDQUFDO0tBQ2pEO0lBQ0QsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLElBQUksY0FBYyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ3pFLFdBQVcsR0FBRyxlQUFlLFdBQVcsR0FBRyxDQUFDO0tBQzdDO0lBRUQsTUFBTSxRQUFRLEdBQUcsT0FBTyxXQUFXLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFFdkcsSUFBSSxXQUFXLEdBQUcsK0JBQStCLFFBQVEsS0FBSyxhQUFhLFFBQVEsV0FBVyxTQUFTLENBQUM7SUFFeEcsSUFBSSxXQUFXLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUNqQyxXQUFXLEdBQUcsK0JBQStCLFdBQVcsQ0FBQyxJQUFJLE9BQU8sV0FBVyxDQUFDLENBQUMsSUFBSSxXQUFXLENBQUMsQ0FBQyxLQUFLLGFBQWEsUUFBUSxXQUFXLFNBQVMsQ0FBQztLQUNsSjtJQUNELE1BQU0sSUFBSSxHQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7SUFFckMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BCLENBQUMifQ==