import __theme from './theme';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
export default function (theme) {
    const themesObj = __theme().themes;
    if (!themesObj[theme])
        throw new Error(`Sorry but the requested theme "<yellow>${theme}</yellow>" does not exists...`);
    // @ts-ignore
    const flattenedTheme = __flatten(themesObj[theme]);
    let vars = [];
    Object.keys(flattenedTheme).forEach((key) => {
        const value = flattenedTheme[key];
        const varKey = key
            .replace(/\./gm, '-')
            .replace(/:/gm, '-')
            .replace(/\?/gm, '')
            .replace(/--/gm, '-');
        if (`${value}`.match(/:/)) {
            vars.push(`--s-theme-${varKey}: "${flattenedTheme[key]}";`);
        }
        else {
            vars.push(`--s-theme-${varKey}: ${flattenedTheme[key]};`);
        }
    });
    vars = vars.filter((v) => {
        return (!v.match(/-(saturate|desaturate|lighten|darken|help|grayscale):\s/) &&
            !v.match(/\s0;$/));
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVUb1ZhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZVRvVmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFHbEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxLQUFhO0lBRWxDLE1BQU0sU0FBUyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUNuQixNQUFNLElBQUksS0FBSyxDQUNiLDBDQUEwQyxLQUFLLCtCQUErQixDQUMvRSxDQUFDO0lBRUosYUFBYTtJQUNiLE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNuRCxJQUFJLElBQUksR0FBYSxFQUFFLENBQUM7SUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUMxQyxNQUFNLEtBQUssR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsTUFBTSxNQUFNLEdBQUcsR0FBRzthQUNmLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDO2FBQ3BCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDO2FBQ25CLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFeEIsSUFBSSxHQUFHLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsTUFBTSxNQUFNLGNBQWMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0Q7YUFBTTtZQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxNQUFNLEtBQUssY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN6RDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN2QixPQUFPLENBQ0wsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLHlEQUF5RCxDQUFDO1lBQ25FLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FDbEIsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDIn0=