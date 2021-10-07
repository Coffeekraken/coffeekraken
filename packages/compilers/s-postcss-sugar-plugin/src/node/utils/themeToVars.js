import __theme from './theme';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __micromatch from 'micromatch';
export default function (theme, variant) {
    // @ts-ignore
    const themeInstance = __theme(theme, variant);
    if (!themeInstance)
        throw new Error(`Sorry but the requested theme "<yellow>${theme}-${variant}</yellow>" does not exists...`);
    const themesConfig = themeInstance.themesConfig();
    let vars = [];
    // handle colors
    themeInstance.loopOnColors((colorObj) => {
        const baseVariable = colorObj.value.variable;
        if (!__micromatch(`color.${colorObj.name}`, themesConfig.cssVariables)
            .length)
            return;
        if (!colorObj.state && !colorObj.variant && colorObj.value.color) {
            vars.push(`${baseVariable}-h: ${colorObj.value.h};`);
            vars.push(`${baseVariable}-s: ${colorObj.value.s};`);
            vars.push(`${baseVariable}-l: ${colorObj.value.l};`);
            vars.push(`${baseVariable}-a: ${colorObj.value.a};`);
            vars.push(`${baseVariable}-origin-h: ${colorObj.value.h};`);
            vars.push(`${baseVariable}-origin-s: ${colorObj.value.s};`);
            vars.push(`${baseVariable}-origin-l: ${colorObj.value.l};`);
            vars.push(`${baseVariable}-origin-a: ${colorObj.value.a};`);
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
    const themeObjWithoutColors = Object.assign({}, themeInstance.config('.'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVUb1ZhcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZVRvVmFycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDOUIsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFHbEUsT0FBTyxZQUFZLE1BQU0sWUFBWSxDQUFDO0FBRXRDLE1BQU0sQ0FBQyxPQUFPLFdBQVcsS0FBYSxFQUFFLE9BQWdCO0lBQ3BELGFBQWE7SUFDYixNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQzlDLElBQUksQ0FBQyxhQUFhO1FBQ2QsTUFBTSxJQUFJLEtBQUssQ0FDWCwwQ0FBMEMsS0FBSyxJQUFJLE9BQU8sK0JBQStCLENBQzVGLENBQUM7SUFFTixNQUFNLFlBQVksR0FBRyxhQUFhLENBQUMsWUFBWSxFQUFFLENBQUM7SUFFbEQsSUFBSSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRXhCLGdCQUFnQjtJQUNoQixhQUFhLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDcEMsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7UUFFN0MsSUFDSSxDQUFDLFlBQVksQ0FBQyxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxZQUFZLENBQUMsWUFBWSxDQUFDO2FBQzdELE1BQU07WUFFWCxPQUFPO1FBRVgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxZQUFZLE9BQU8sUUFBUSxDQUFDLEtB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