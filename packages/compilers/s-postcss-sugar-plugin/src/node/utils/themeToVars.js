import __theme from './theme';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __micromatch from 'micromatch';
export default function (theme) {
    const themesObj = __theme().themes;
    if (!themesObj[theme])
        throw new Error(`Sorry but the requested theme "<yellow>${theme}</yellow>" does not exists...`);
    // @ts-ignore
    const themesConfig = __theme().themesConfig();
    let vars = [];
    // handle colors
    __theme().loopOnColors(colorObj => {
        const baseVariable = colorObj.value.variable;
        if (!__micromatch(`color.${colorObj.name}`, themesConfig.cssVariables).length)
            return;
        if (!colorObj.state && !colorObj.variant) {
            vars.push(`${baseVariable}-h: ${colorObj.value.h};`);
            vars.push(`${baseVariable}-s: ${colorObj.value.s};`);
            vars.push(`${baseVariable}-l: ${colorObj.value.l};`);
            // vars.push(`${baseVariable}-a: ${colorObj.value.a};`);
        }
        else if (colorObj.value.modifiers) {
            if (colorObj.value.modifiers.saturate) {
                vars.push(`${baseVariable}-saturation-offset: ${colorObj.value.modifiers.saturate};`);
            }
            else if (colorObj.value.modifiers.desaturate) {
                vars.push(`${baseVariable}-saturation-offset: ${colorObj.value.modifiers.desaturate * -1};`);
            }
            if (colorObj.value.modifiers.lighten) {
                vars.push(`${baseVariable}-lightness-offset: ${colorObj.value.modifiers.lighten};`);
            }
            else if (colorObj.value.modifiers.darken) {
                vars.push(`${baseVariable}-lightness-offset: ${colorObj.value.modifiers.darken * -1};`);
            }
            if (colorObj.value.modifiers.alpha >= 0 && colorObj.value.modifiers.alpha <= 1) {
                vars.push(`${baseVariable}-a: ${colorObj.value.modifiers.alpha};`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVUb1ZhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZVRvVmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFHbEUsT0FBTyxZQUFZLE1BQU0sWUFBWSxDQUFDO0FBRXRDLE1BQU0sQ0FBQyxPQUFPLFdBQVcsS0FBYTtJQUVsQyxNQUFNLFNBQVMsR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDckMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FDYiwwQ0FBMEMsS0FBSywrQkFBK0IsQ0FDL0UsQ0FBQztJQUVKLGFBQWE7SUFFYixNQUFNLFlBQVksR0FBRyxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUU5QyxJQUFJLElBQUksR0FBYSxFQUFFLENBQUM7SUFFeEIsZ0JBQWdCO0lBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNoQyxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUU3QyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNO1lBQUUsT0FBTztRQUV0RixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUU7WUFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLFlBQVksT0FBTyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckQsSUFBSSxD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