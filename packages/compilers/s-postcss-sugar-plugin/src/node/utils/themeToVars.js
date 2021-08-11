import __theme from './theme';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __micromatch from 'micromatch';
export default function (theme) {
    const themesObj = __theme().themes;
    if (!themesObj[theme])
        throw new Error(`Sorry but the requested theme "<yellow>${theme}</yellow>" does not exists...`);
    // @ts-ignore
    const themeInstance = __theme(theme);
    const themesConfig = themeInstance.themesConfig();
    let vars = [];
    // handle colors
    themeInstance.loopOnColors(colorObj => {
        const baseVariable = colorObj.value.variable;
        if (!__micromatch(`color.${colorObj.name}`, themesConfig.cssVariables).length)
            return;
        if (!colorObj.state && !colorObj.variant && colorObj.value.color) {
            vars.push(`${baseVariable}-h: ${colorObj.value.h};`);
            vars.push(`${baseVariable}-s: ${colorObj.value.s};`);
            vars.push(`${baseVariable}-l: ${colorObj.value.l};`);
        }
        else if (!colorObj.value.color) {
            if (colorObj.value.saturate) {
                vars.push(`${baseVariable}-saturation-offset: ${colorObj.value.saturate};`);
            }
            else if (colorObj.value.desaturate) {
                vars.push(`${baseVariable}-saturation-offset: ${colorObj.value.desaturate * -1};`);
            }
            if (colorObj.value.lighten) {
                vars.push(`${baseVariable}-lightness-offset: ${colorObj.value.lighten};`);
            }
            else if (colorObj.value.darken) {
                vars.push(`${baseVariable}-lightness-offset: ${colorObj.value.darken * -1};`);
            }
            if (colorObj.value.alpha >= 0 && colorObj.value.alpha <= 1) {
                vars.push(`${baseVariable}-a: ${colorObj.value.alpha};`);
            }
        }
    });
    // others than colors
    const themeObjWithoutColors = Object.assign({}, themesObj[theme]);
    delete themeObjWithoutColors.color;
    const flattenedTheme = __flatten(themeObjWithoutColors);
    Object.keys(flattenedTheme).forEach((key) => {
        if (!__micromatch(key, themesConfig.cssVariables).length)
            return;
        const value = flattenedTheme[key];
        const varKey = key
            .replace(/\./gm, '-')
            .replace(/:/gm, '-')
            .replace(/\?/gm, '')
            .replace(/--/gm, '-');
        let variable = `--s-theme-${varKey}`;
        if (`${value}`.match(/:/)) {
            vars.push(`${variable}: "${flattenedTheme[key]}";`);
        }
        else {
            vars.push(`${variable}: ${flattenedTheme[key]};`);
        }
    });
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVUb1ZhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZVRvVmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFHbEUsT0FBTyxZQUFZLE1BQU0sWUFBWSxDQUFDO0FBRXRDLE1BQU0sQ0FBQyxPQUFPLFdBQVcsS0FBYTtJQUVsQyxNQUFNLFNBQVMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FDYiwwQ0FBMEMsS0FBSywrQkFBK0IsQ0FDL0UsQ0FBQztJQUVKLGFBQWE7SUFFYixNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFckMsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRWxELElBQUksSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUV4QixnQkFBZ0I7SUFDaEIsYUFBYSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNwQyxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUU3QyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUV0RixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDaEUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxH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