import __SInterface from '@coffeekraken/s-interface';
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
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ start: undefined, end: undefined, x: '50%', y: '50%', type: 'linear', angle: 0, size: 'farthest-side' }, params);
    let startColorVar = finalParams.start, endColorVar = finalParams.end;
    startColorVar = `sugar.color(${finalParams.start})`;
    endColorVar = `sugar.color(${finalParams.end})`;
    const angleVar = `${finalParams.angle}deg`;
    let gradientCss = `background: linear-gradient(${angleVar}, ${startColorVar} 0%, ${endColorVar} 100%);`;
    if (finalParams.type === 'radial') {
        gradientCss = `background: radial-gradient(${finalParams.size} at ${finalParams.x} ${finalParams.y}, ${startColorVar} 0%, ${endColorVar} 100%);`;
    }
    const vars = [gradientCss];
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncmFkaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxNQUFNLG1DQUFvQyxTQUFRLFlBQVk7O0FBQ3JELDhDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztRQUM1QixPQUFPLEVBQUUsUUFBUTtLQUNsQjtJQUNELENBQUMsRUFBRTtRQUNELElBQUksRUFBRSxRQUFRO0tBQ2Y7SUFDRCxDQUFDLEVBQUU7UUFDRCxJQUFJLEVBQUUsUUFBUTtLQUNmO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLGlCQUFpQjtRQUN2QixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsZUFBZTtLQUN6QjtDQUNGLENBQUM7QUFhSixPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsU0FBUyxFQUNoQixHQUFHLEVBQUUsU0FBUyxFQUNkLENBQUMsRUFBRSxLQUFLLEVBQ1IsQ0FBQyxFQUFFLEtBQUssRUFDUixJQUFJLEVBQUUsUUFBUSxFQUNkLEtBQUssRUFBRSxDQUFDLEVBQ1IsSUFBSSxFQUFFLGVBQWUsSUFDbEIsTUFBTSxDQUNWLENBQUM7SUFFRixJQUFJLGFBQWEsR0FBRyxXQUFXLENBQUMsS0FBSyxFQUNuQyxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQztJQUVoQyxhQUFhLEdBQUcsZUFBZSxXQUFXLENBQUMsS0FBSyxHQUFHLENBQUM7SUFDcEQsV0FBVyxHQUFHLGVBQWUsV0FBVyxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ2hELE1BQU0sUUFBUSxHQUFHLEdBQUcsV0FBVyxDQUFDLEtBQUssS0FBSyxDQUFDO0lBRTNDLElBQUksV0FBVyxHQUFHLCtCQUErQixRQUFRLEtBQUssYUFBYSxRQUFRLFdBQVcsU0FBUyxDQUFDO0lBQ3hHLElBQUksV0FBVyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDakMsV0FBVyxHQUFHLCtCQUErQixXQUFXLENBQUMsSUFBSSxPQUFPLFdBQVcsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUMsS0FBSyxhQUFhLFFBQVEsV0FBVyxTQUFTLENBQUM7S0FDbEo7SUFFRCxNQUFNLElBQUksR0FBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBRXJDLE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=