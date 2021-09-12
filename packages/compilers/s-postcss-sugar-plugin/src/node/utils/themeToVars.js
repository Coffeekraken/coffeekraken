import __theme from './theme';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __micromatch from 'micromatch';
export default function (theme, variant) {
    const themesObj = __theme().themes;
    if (!themesObj[theme])
        throw new Error(`Sorry but the requested theme "<yellow>${theme}</yellow>" does not exists...`);
    // @ts-ignore
    const themeInstance = __theme(theme, variant);
    const themesConfig = themeInstance.themesConfig();
    let vars = [];
    // handle colors
    themeInstance.loopOnColors((colorObj) => {
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
        const varKey = key.replace(/\./gm, '-').replace(/:/gm, '-').replace(/\?/gm, '').replace(/--/gm, '-');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVUb1ZhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZVRvVmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFHbEUsT0FBTyxZQUFZLE1BQU0sWUFBWSxDQUFDO0FBRXRDLE1BQU0sQ0FBQyxPQUFPLFdBQVcsS0FBYSxFQUFFLE9BQWdCO0lBQ3BELE1BQU0sU0FBUyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQztRQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLDBDQUEwQyxLQUFLLCtCQUErQixDQUFDLENBQUM7SUFFcEcsYUFBYTtJQUViLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFOUMsTUFBTSxZQUFZLEdBQUcsYUFBYSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBRWxELElBQUksSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUV4QixnQkFBZ0I7SUFDaEIsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3BDLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1FBRTdDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLE1BQU07WUFBRSxPQUFPO1FBRXRGLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsWUFBWSxPQUFPLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZ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