import __theme from './theme';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __SInterface from '@coffeekraken/s-interface';
import __minifyVar from './minifyVar';

export default function (theme: string): string[] {

    const themesObj = __theme().themes;
  if (!themesObj[theme])
    throw new Error(
      `Sorry but the requested theme "<yellow>${theme}</yellow>" does not exists...`
    );

  // @ts-ignore
  const flattenedTheme = __flatten(themesObj[theme]);
  let vars: string[] = [];
  Object.keys(flattenedTheme).forEach((key) => {
    const value = flattenedTheme[key];
    const varKey = key
      .replace(/\./gm, '-')
      .replace(/:/gm, '-')
      .replace(/\?/gm, '')
      .replace(/--/gm, '-');
    
    if (`${value}`.match(/:/)) {
    vars.push(`${__minifyVar(`--s-theme-${varKey}`)}: "${flattenedTheme[key]}";`);
    } else {
    vars.push(`${__minifyVar(`--s-theme-${varKey}`)}: ${flattenedTheme[key]};`);
    }
  });

  vars = vars.filter((v) => {
    return (
      !v.match(/-(saturate|desaturate|lighten|darken|help|grayscale):\s/) &&
      !v.match(/\s0;$/)
    );
  });

  return vars;
}
