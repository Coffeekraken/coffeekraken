import __theme from './theme';
import __flatten from '@coffeekraken/sugar/shared/object/flatten';
import __SInterface from '@coffeekraken/s-interface';

class ColorModifierInterface extends __SInterface {
  static definition = {
    saturate: {
      type: 'Number|String',
      default: 0
    },
    desaturate: {
      type: 'Number',
      default: 0
    },
    darken: {
      type: 'Number',
      default: 0
    },
    lighten: {
      type: 'Number',
      default: 0
    },
    spin: {
      type: 'Number',
      default: 0
    },
    grayscale: {
      type: 'Boolean',
      default: false
    }
  };
}

export default function (color: string): string[] {
  const flattenedTheme = __flatten(__theme().config(`.`));

  let vars: string[] = [];

  // let vars: string[] = [];
  Object.keys(flattenedTheme).forEach((key) => {
    if (!key.includes(`color.${color}`)) return;

    const value = flattenedTheme[key];
    const varKey = key.replace(/\./gm, '-').replace(/:/gm, '-');
    if (
      key.match(/^color\./) &&
      typeof value === 'string' &&
      value.match(/^--/)
    ) {
      const modifierParams = ColorModifierInterface.apply(value).value;
      Object.keys(modifierParams).forEach((propKey) => {
        const propValue = modifierParams[propKey];
        vars.push(`--s-theme-${varKey}-${propKey}: ${propValue};`);
      });

      if (modifierParams.saturate > 0) {
        vars.push(
          `--s-theme-${varKey}-saturationOffset: ${modifierParams.saturate};`
        );
      } else if (modifierParams.desaturate > 0) {
        vars.push(
          `--s-theme-${varKey}-saturationOffset: ${
            modifierParams.desaturate * -1
          };`
        );
      } else {
        vars.push(`--s-theme-${varKey}-saturationOffset: 0;`);
      }
      if (modifierParams.lighten > 0) {
        vars.push(
          `--s-theme-${varKey}-lightnessOffset: ${modifierParams.lighten};`
        );
      } else if (modifierParams.darken > 0) {
        vars.push(
          `--s-theme-${varKey}-lightnessOffset: ${modifierParams.darken * -1};`
        );
      } else {
        vars.push(`--s-theme-${varKey}-lightnessOffset: 0;`);
      }
    } else {
      if (`${value}`.match(/:/)) {
        vars.push(`--s-theme-${varKey}: "${flattenedTheme[key]}";`);
      } else {
        vars.push(`--s-theme-${varKey}: ${flattenedTheme[key]};`);
      }
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
