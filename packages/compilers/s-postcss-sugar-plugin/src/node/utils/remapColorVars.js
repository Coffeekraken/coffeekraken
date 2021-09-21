export default function (from, to) {
    let vars = [];
    let fromVariable = `--s-theme-color-${from}`, toVariable = `--s-theme-color-${to}-origin`;
    // const baseColors = __theme().baseColors();
    // Object.keys(baseColors).forEach((colorName) => {
    //     const colorObj = baseColors[colorName];
    //     if (colorName === from && !fromVariable) {
    //         fromVariable = colorObj.variable;
    //     } else if (colorName === to && !toVariable) {
    //         // toVariable = colorObj.variable;
    //         toVariable = `--s-theme-color-${to}-origin`;
    //     }
    //     // if (fromVariable && toVariable) return -1;
    // });
    vars.push([
        `${fromVariable}-h: var(${toVariable}-h);`,
        `${fromVariable}-s: var(${toVariable}-s);`,
        `${fromVariable}-l: var(${toVariable}-l);`,
        // `${fromVariable}-a: var(${toVariable}-a);`,
        // `${fromVariable}-saturation-offset: var(${toVariable}-saturation-offset, 0);`,
        // `${fromVariable}-lightness-offset: var(${toVariable}-lightness-offset, 0);`,
    ].join('\n'));
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtYXBDb2xvclZhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZW1hcENvbG9yVmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxNQUFNLENBQUMsT0FBTyxXQUFXLElBQVksRUFBRSxFQUFVO0lBQzdDLElBQUksSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUV4QixJQUFJLFlBQVksR0FBRyxtQkFBbUIsSUFBSSxFQUFFLEVBQ3hDLFVBQVUsR0FBRyxtQkFBbUIsRUFBRSxTQUFTLENBQUM7SUFFaEQsNkNBQTZDO0lBRTdDLG1EQUFtRDtJQUNuRCw4Q0FBOEM7SUFDOUMsaURBQWlEO0lBQ2pELDRDQUE0QztJQUM1QyxvREFBb0Q7SUFDcEQsNkNBQTZDO0lBQzdDLHVEQUF1RDtJQUN2RCxRQUFRO0lBQ1Isb0RBQW9EO0lBQ3BELE1BQU07SUFFTixJQUFJLENBQUMsSUFBSSxDQUNMO1FBQ0ksR0FBRyxZQUFZLFdBQVcsVUFBVSxNQUFNO1FBQzFDLEdBQUcsWUFBWSxXQUFXLFVBQVUsTUFBTTtRQUMxQyxHQUFHLFlBQVksV0FBVyxVQUFVLE1BQU07UUFDMUMsOENBQThDO1FBQzlDLGlGQUFpRjtRQUNqRiwrRUFBK0U7S0FDbEYsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2YsQ0FBQztJQUVGLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==