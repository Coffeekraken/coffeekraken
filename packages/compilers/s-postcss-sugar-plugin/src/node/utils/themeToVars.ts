import __theme from './theme';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __SInterface from '@coffeekraken/s-interface';
import __minifyVar from './minifyVar';
import __micromatch from 'micromatch';

export default function (theme: string): string[] {

    const themesObj = __theme().themes;
  if (!themesObj[theme])
    throw new Error(
      `Sorry but the requested theme "<yellow>${theme}</yellow>" does not exists...`
    );

  // @ts-ignore

  const themesConfig = __theme().themesConfig();

  let vars: string[] = [];

  // handle colors
  __theme().loopOnColors(colorObj => {
    const baseVariable = colorObj.value.variable;

    if (!__micromatch(`color.${colorObj.name}`, themesConfig.cssVariables).length) return;

    if (!colorObj.state && !colorObj.variant) {
      vars.push(`${baseVariable}-h: ${colorObj.value.h};`);
      vars.push(`${baseVariable}-s: ${colorObj.value.s};`);
      vars.push(`${baseVariable}-l: ${colorObj.value.l};`);
      // vars.push(`${baseVariable}-a: ${colorObj.value.a};`);
    } else if (colorObj.value.modifiers) {
      if (colorObj.value.modifiers.saturate) {
        vars.push(`${baseVariable}-saturation-offset: ${colorObj.value.modifiers.saturate};`);
      } else if (colorObj.value.modifiers.desaturate) {
        vars.push(`${baseVariable}-saturation-offset: ${colorObj.value.modifiers.desaturate * -1};`);
      }
      if (colorObj.value.modifiers.lighten) {
        vars.push(`${baseVariable}-lightness-offset: ${colorObj.value.modifiers.lighten};`);
      } else if (colorObj.value.modifiers.darken) {
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

    if (!__micromatch(key, themesConfig.cssVariables).length) return;

    const value = flattenedTheme[key];
    const varKey = key
      .replace(/\./gm, '-')
      .replace(/:/gm, '-')
      .replace(/\?/gm, '')
      .replace(/--/gm, '-');

    let variable = `--s-theme-${varKey}`;

    if (`${value}`.match(/:/)) {
      vars.push(`${variable}: "${flattenedTheme[key]}";`);
    } else {
      vars.push(`${variable}: ${flattenedTheme[key]};`);
    }

  });

  return vars;
}
