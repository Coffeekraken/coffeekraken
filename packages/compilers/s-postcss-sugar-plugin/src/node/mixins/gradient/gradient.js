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
    angle: {
        type: 'Number | String',
        default: 0
    }
};
export { postcssSugarPluginGradientInterface as interface };
export default function ({ params, atRule, processNested }) {
    const finalParams = Object.assign({ start: 'primary--50', end: 'primary--70', type: 'linear', angle: 0 }, params);
    let startColorVar = `var(--s-gradient-start-color-inline, sugar.color(${finalParams.start}))`;
    let endColorVar = `var(--s-gradient-end-color-inline, sugar.color(${finalParams.end}))`;
    let angleVar = `var(--s-gradient-angle-inline, ${finalParams.angle}deg)`;
    let gradientCss = `background: linear-gradient(${angleVar}, ${startColorVar} 0%, ${endColorVar} 100%);`;
    if (finalParams.type === 'radial') {
        gradientCss = `background: radial-gradient(circle, ${startColorVar} 0%, ${endColorVar} 100%);`;
    }
    const vars = [gradientCss];
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhZGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJncmFkaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUVyRCxNQUFNLG1DQUFvQyxTQUFRLFlBQVk7O0FBQ3JELDhDQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLEtBQUssRUFBRSxHQUFHO0tBQ1g7SUFDRCxHQUFHLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztRQUM1QixPQUFPLEVBQUUsUUFBUTtLQUNsQjtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxpQkFBaUI7UUFDdkIsT0FBTyxFQUFFLENBQUM7S0FDWDtDQUNGLENBQUM7QUFVSixPQUFPLEVBQUUsbUNBQW1DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFNUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsYUFBYSxFQUNwQixHQUFHLEVBQUUsYUFBYSxFQUNsQixJQUFJLEVBQUUsUUFBUSxFQUNkLEtBQUssRUFBRSxDQUFDLElBQ0wsTUFBTSxDQUNWLENBQUM7SUFFRixJQUFJLGFBQWEsR0FBRyxvREFBb0QsV0FBVyxDQUFDLEtBQUssSUFBSSxDQUFDO0lBQzlGLElBQUksV0FBVyxHQUFHLGtEQUFrRCxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDeEYsSUFBSSxRQUFRLEdBQUcsa0NBQWtDLFdBQVcsQ0FBQyxLQUFLLE1BQU0sQ0FBQztJQUV6RSxJQUFJLFdBQVcsR0FBRywrQkFBK0IsUUFBUSxLQUFLLGFBQWEsUUFBUSxXQUFXLFNBQVMsQ0FBQztJQUN4RyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1FBQ2pDLFdBQVcsR0FBRyx1Q0FBdUMsYUFBYSxRQUFRLFdBQVcsU0FBUyxDQUFDO0tBQ2hHO0lBRUQsTUFBTSxJQUFJLEdBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUVyQyxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQyJ9