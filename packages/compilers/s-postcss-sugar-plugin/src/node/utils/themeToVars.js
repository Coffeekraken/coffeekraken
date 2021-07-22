import __theme from './theme';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __minifyVar from './minifyVar';
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
            vars.push(`${__minifyVar(`--s-theme-${varKey}`)}: "${flattenedTheme[key]}";`);
        }
        else {
            vars.push(`${__minifyVar(`--s-theme-${varKey}`)}: ${flattenedTheme[key]};`);
        }
    });
    vars = vars.filter((v) => {
        return (!v.match(/-(saturate|desaturate|lighten|darken|help|grayscale):\s/) &&
            !v.match(/\s0;$/));
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVUb1ZhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZVRvVmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFFbEUsT0FBTyxXQUFXLE1BQU0sYUFBYSxDQUFDO0FBRXRDLE1BQU0sQ0FBQyxPQUFPLFdBQVcsS0FBYTtJQUVsQyxNQUFNLFNBQVMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FDYiwwQ0FBMEMsS0FBSywrQkFBK0IsQ0FDL0UsQ0FBQztJQUVKLGFBQWE7SUFDUCxNQUFNLGNBQWMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFFekQsSUFBSSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBQ3hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFFMUMsTUFBTSxLQUFLLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sTUFBTSxHQUFHLEdBQUc7YUFDZixPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQzthQUNwQixPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQzthQUNuQixPQUFPLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQzthQUNuQixPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXhCLElBQUksR0FBRyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxhQUFhLE1BQU0sRUFBRSxDQUFDLE1BQU0sY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM3RTthQUFNO1lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxhQUFhLE1BQU0sRUFBRSxDQUFDLEtBQUssY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUMzRTtJQUVILENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN2QixPQUFPLENBQ0wsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLHlEQUF5RCxDQUFDO1lBQ25FLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FDbEIsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDIn0=