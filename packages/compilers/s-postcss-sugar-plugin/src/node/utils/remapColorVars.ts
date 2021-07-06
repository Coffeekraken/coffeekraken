import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __theme from './theme';
import __minifyVar from '../utils/minifyVar';
import minifyVar from '../utils/minifyVar';

export default function (from: string, to: string): string[] {
  const flattenedTheme = __flatten(__theme().config(`.`));

  let vars: string[] = [];

let fromVars: string[] = [],
      toVars: string[] = [];

  // let vars: string[] = [];
  Object.keys(flattenedTheme).forEach((key) => {
    
    if (key.includes(`color.${from}`)) {
        const internalColorKey = key.replace(`color.${from}.`, '');
        fromVars.push(internalColorKey);
    } else if (key.includes(`color.${to}`)) {
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
      } else {
          vars.push(`${__minifyVar(`--s-theme-color-${from}-${varKey}`)}: var(${minifyVar(`--s-theme-color-${to}-${varKey}`)});`);
          toVars = toVars.filter(l => l !== key);
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
