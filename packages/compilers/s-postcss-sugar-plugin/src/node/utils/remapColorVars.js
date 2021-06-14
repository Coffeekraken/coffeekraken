import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __theme from './theme';
export default function (from, to) {
    const flattenedTheme = __flatten(__theme().config(`.`));
    let vars = [];
    let fromVars = [], toVars = [];
    // let vars: string[] = [];
    Object.keys(flattenedTheme).forEach((key) => {
        if (key.includes(`color.${from}`)) {
            const internalColorKey = key.replace(`color.${from}.`, '');
            fromVars.push(internalColorKey);
        }
        else if (key.includes(`color.${to}`)) {
            const internalColorKey = key.replace(`color.${to}.`, '');
            toVars.push(internalColorKey);
        }
    });
    fromVars.forEach(key => {
        const varKey = key.replace(/\./gm, '-')
            .replace(/:/gm, '-')
            .replace(/\?/gm, '')
            .replace(/--/gm, '-');
        // console.log(varKey);
        if (toVars.indexOf(key) === -1) {
            // vars.push(`--s-theme-color-${from}-${varKey}: initial;`);
        }
        else {
            vars.push(`--s-theme-color-${from}-${varKey}: var(--s-theme-color-${to}-${varKey});`);
            toVars = toVars.filter(l => l !== key);
        }
    });
    vars = vars.filter((v) => {
        return (!v.match(/-(saturate|desaturate|lighten|darken|help|grayscale):\s/) &&
            !v.match(/\s0;$/));
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtYXBDb2xvclZhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZW1hcENvbG9yVmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFNBQVMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFFOUIsTUFBTSxDQUFDLE9BQU8sV0FBVyxJQUFZLEVBQUUsRUFBVTtJQUMvQyxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFFeEQsSUFBSSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksUUFBUSxHQUFhLEVBQUUsRUFDckIsTUFBTSxHQUFhLEVBQUUsQ0FBQztJQUUxQiwyQkFBMkI7SUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUUxQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxJQUFJLEVBQUUsQ0FBQyxFQUFFO1lBQy9CLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQzNELFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztTQUNuQzthQUFNLElBQUksR0FBRyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLEVBQUU7WUFDcEMsTUFBTSxnQkFBZ0IsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDekQsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3JCLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQzthQUNwQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQzthQUNuQixPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQzthQUNuQixPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXRCLHVCQUF1QjtRQUV2QixJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDNUIsNERBQTREO1NBQy9EO2FBQU07WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksTUFBTSx5QkFBeUIsRUFBRSxJQUFJLE1BQU0sSUFBSSxDQUFDLENBQUM7WUFDdEYsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7U0FDMUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdkIsT0FBTyxDQUNMLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyx5REFBeUQsQ0FBQztZQUNuRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQ2xCLENBQUM7SUFDSixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQyJ9