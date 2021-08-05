import __theme from './theme';
export default function (from, to) {
    let vars = [];
    // protect from remaping same colors
    if (from === to)
        return [];
    let fromVariable, toVariable;
    const baseColors = __theme().baseColors();
    Object.keys(baseColors).forEach(colorName => {
        const colorObj = baseColors[colorName];
        if (colorName === from && !fromVariable) {
            fromVariable = colorObj.variable;
        }
        else if (colorName === to && !toVariable) {
            toVariable = colorObj.variable;
        }
        if (fromVariable && toVariable)
            return -1;
    });
    vars.push([
        `${fromVariable}-h: var(${toVariable}-h);`,
        `${fromVariable}-s: var(${toVariable}-s);`,
        `${fromVariable}-l: var(${toVariable}-l);`,
        `${fromVariable}-a: var(${toVariable}-a);`,
        `${fromVariable}-saturation-offset: var(${toVariable}-saturation-offset, 0);`,
        `${fromVariable}-lightness-offset: var(${toVariable}-lightness-offset, 0);`,
    ].join('\n'));
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtYXBDb2xvclZhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZW1hcENvbG9yVmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFJOUIsTUFBTSxDQUFDLE9BQU8sV0FBVyxJQUFZLEVBQUUsRUFBVTtJQUUvQyxJQUFJLElBQUksR0FBYSxFQUFFLENBQUM7SUFFeEIsb0NBQW9DO0lBQ3BDLElBQUksSUFBSSxLQUFLLEVBQUU7UUFBRSxPQUFPLEVBQUUsQ0FBQztJQUUzQixJQUFJLFlBQVksRUFBRSxVQUFVLENBQUM7SUFFN0IsTUFBTSxVQUFVLEdBQUcsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUM7SUFFMUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7UUFDMUMsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksU0FBUyxLQUFLLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN2QyxZQUFZLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztTQUNsQzthQUFNLElBQUksU0FBUyxLQUFLLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUMxQyxVQUFVLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztTQUNoQztRQUNELElBQUksWUFBWSxJQUFJLFVBQVU7WUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNSLEdBQUcsWUFBWSxXQUFXLFVBQVUsTUFBTTtRQUMxQyxHQUFHLFlBQVksV0FBVyxVQUFVLE1BQU07UUFDMUMsR0FBRyxZQUFZLFdBQVcsVUFBVSxNQUFNO1FBQzFDLEdBQUcsWUFBWSxXQUFXLFVBQVUsTUFBTTtRQUMxQyxHQUFHLFlBQVksMkJBQTJCLFVBQVUseUJBQXlCO1FBQzdFLEdBQUcsWUFBWSwwQkFBMEIsVUFBVSx3QkFBd0I7S0FDNUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUVkLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyJ9