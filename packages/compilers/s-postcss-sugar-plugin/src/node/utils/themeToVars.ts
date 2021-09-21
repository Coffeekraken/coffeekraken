import __theme from './theme';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __SInterface from '@coffeekraken/s-interface';
import __minifyVar from './minifyVar';
import __micromatch from 'micromatch';

export default function (theme: string, variant?: string): string[] {
    // @ts-ignore
    const themeInstance = __theme(theme, variant);
    if (!themeInstance)
        throw new Error(`Sorry but the requested theme "<yellow>${theme}-${variant}</yellow>" does not exists...`);

    const themesConfig = themeInstance.themesConfig();

    let vars: string[] = [];

    // handle colors
    themeInstance.loopOnColors((colorObj) => {
        const baseVariable = colorObj.value.variable;

        if (!__micromatch(`color.${colorObj.name}`, themesConfig.cssVariables).length) return;

        if (!colorObj.state && !colorObj.variant && colorObj.value.color) {
            vars.push(`${baseVariable}-h: ${colorObj.value.h};`);
            vars.push(`${baseVariable}-s: ${colorObj.value.s};`);
            vars.push(`${baseVariable}-l: ${colorObj.value.l};`);
            vars.push(`${baseVariable}-origin-h: ${colorObj.value.h};`);
            vars.push(`${baseVariable}-origin-s: ${colorObj.value.s};`);
            vars.push(`${baseVariable}-origin-l: ${colorObj.value.l};`);
        } else if (!colorObj.value.color) {
            if (colorObj.value.saturate) {
                vars.push(`${baseVariable}-saturation-offset: ${colorObj.value.saturate};`);
            } else if (colorObj.value.desaturate) {
                vars.push(`${baseVariable}-saturation-offset: ${colorObj.value.desaturate * -1};`);
            }
            if (colorObj.value.lighten) {
                vars.push(`${baseVariable}-lightness-offset: ${colorObj.value.lighten};`);
            } else if (colorObj.value.darken) {
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
        if (!__micromatch(key, themesConfig.cssVariables).length) return;

        const value = flattenedTheme[key];
        const varKey = key.replace(/\./gm, '-').replace(/:/gm, '-').replace(/\?/gm, '').replace(/--/gm, '-');

        let variable = `--s-theme-${varKey}`;

        if (`${value}`.match(/:/)) {
            vars.push(`${variable}: "${flattenedTheme[key]}";`);
        } else {
            vars.push(`${variable}: ${flattenedTheme[key]};`);
        }
    });

    return vars;
}
