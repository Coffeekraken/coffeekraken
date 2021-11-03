import __theme from './theme';
export default function (from, to) {
    let vars = [];
    const toColorName = to.split('-').slice(0, 1)[0], fromColorName = from.split('-').slice(0, 1)[0];
    let toColorVariant = to.split('-').pop(), fromColorVariant = from.split('-').pop();
    if (toColorName === toColorVariant)
        toColorVariant = undefined;
    if (fromColorName === fromColorVariant)
        fromColorVariant = undefined;
    let fromVariable = `--s-theme-color-${fromColorName}`, toVariable = `--s-theme-color-${toColorName}`;
    __theme().loopOnColors((colorObj) => {
        if (colorObj.name === toColorName) {
            if (toColorVariant) {
                if (colorObj.variant === toColorVariant) {
                    console.log(colorObj);
                    vars.push(`${fromVariable}-saturation-offset: var(${toVariable}-${colorObj.variant}-saturation-offset, 0);`);
                    vars.push(`${fromVariable}-lightness-offset: var(${toVariable}-${colorObj.variant}-lightness-offset, 0);`);
                    vars.push(`${fromVariable}-a: var(${toVariable}-a, 1);`);
                }
            }
            else {
                if (!colorObj.state &&
                    !colorObj.variant &&
                    colorObj.value.color) {
                    vars.push(`${fromVariable}-h: ${colorObj.value.h};`);
                    vars.push(`${fromVariable}-s: ${colorObj.value.s};`);
                    vars.push(`${fromVariable}-l: ${colorObj.value.l};`);
                }
                else if (!colorObj.value.color) {
                    vars.push(`${fromVariable}-${colorObj.variant}-saturation-offset: var(${toVariable}-${colorObj.variant}-saturation-offset, 0);`);
                    vars.push(`${fromVariable}-${colorObj.variant}-lightness-offset: var(${toVariable}-${colorObj.variant}-lightness-offset, 0);`);
                    vars.push(`${fromVariable}-a: var(${toVariable}-a, 1);`);
                }
            }
        }
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtYXBDb2xvclZhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZW1hcENvbG9yVmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFJOUIsTUFBTSxDQUFDLE9BQU8sV0FBVyxJQUFZLEVBQUUsRUFBVTtJQUM3QyxJQUFJLElBQUksR0FBYSxFQUFFLENBQUM7SUFFeEIsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUM1QyxhQUFhLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25ELElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQ3BDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7SUFDN0MsSUFBSSxXQUFXLEtBQUssY0FBYztRQUFFLGNBQWMsR0FBRyxTQUFTLENBQUM7SUFDL0QsSUFBSSxhQUFhLEtBQUssZ0JBQWdCO1FBQUUsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO0lBRXJFLElBQUksWUFBWSxHQUFHLG1CQUFtQixhQUFhLEVBQUUsRUFDakQsVUFBVSxHQUFHLG1CQUFtQixXQUFXLEVBQUUsQ0FBQztJQUVsRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUNoQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEtBQUssV0FBVyxFQUFFO1lBQy9CLElBQUksY0FBYyxFQUFFO2dCQUNoQixJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssY0FBYyxFQUFFO29CQUNyQyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN0QixJQUFJLENBQUMsSUFBSSxDQUNMLEdBQUcsWUFBWSwyQkFBMkIsVUFBVSxJQUFJLFFBQVEsQ0FBQyxPQUFPLHlCQUF5QixDQUNwRyxDQUFDO29CQUNGLElBQUksQ0FBQyxJQUFJLENBQ0wsR0FBRyxZQUFZLDBCQUEwQixVQUFVLElBQUksUUFBUSxDQUFDLE9BQU8sd0JBQXdCLENBQ2xHLENBQUM7b0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksV0FBVyxVQUFVLFNBQVMsQ0FBQyxDQUFDO2lCQUM1RDthQUNKO2lCQUFNO2dCQUNILElBQ0ksQ0FBQyxRQUFRLENBQUMsS0FBSztvQkFDZixDQUFDLFFBQVEsQ0FBQyxPQUFPO29CQUNqQixRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFDdEI7b0JBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDeEQ7cUJBQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO29CQUM5QixJQUFJLENBQUMsSUFBSSxDQUNMLEdBQUcsWUFBWSxJQUFJLFFBQVEsQ0FBQyxPQUFPLDJCQUEyQixVQUFVLElBQUksUUFBUSxDQUFDLE9BQU8seUJBQXlCLENBQ3hILENBQUM7b0JBQ0YsSUFBSSxDQUFDLElBQUksQ0FDTCxHQUFHLFlBQVksSUFBSSxRQUFRLENBQUMsT0FBTywwQkFBMEIsVUFBVSxJQUFJLFFBQVEsQ0FBQyxPQUFPLHdCQUF3QixDQUN0SCxDQUFDO29CQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLFdBQVcsVUFBVSxTQUFTLENBQUMsQ0FBQztpQkFDNUQ7YUFDSjtTQUNKO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=