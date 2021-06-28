// @ts-nocheck

import __SInterface from '@coffeekraken/s-interface';
import __SColor from '@coffeekraken/s-color';
import __theme from '../../utils/theme';
import __isColor from '@coffeekraken/sugar/shared/is/color';

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

class postcssSugarPluginColorInterface extends __SInterface {
  static definition = {
    color: {
      type: 'String',
      alias: 'n'
    },
    modifier: {
      type: 'String',
      alias: 'm'
    }
  };
}
export { postcssSugarPluginColorInterface as interface };

export interface IPostcssSugarPluginColorParams {
  name: string;
  modifier: string;
}

export default function color({
  params
}: {
  params: Partial<IPostcssSugarPluginColorParams>;
}) {
  const finalParams: IPostcssSugarPluginColorParams = {
    color: '',
    modifier: undefined,
    ...params
  };

  if (finalParams.color.match(/^(hsl\rgba?|hsv)\(/)) return finalParams.color;
  if (finalParams.color.match(/^var\(--/)) return finalParams.color;

  let colorName = finalParams.color;
  let colorModifier = finalParams.modifier ? finalParams.modifier : 'default';
  let colorStateName = '';

  const nameParts = finalParams.color.split(':');
  if (nameParts.length === 2) {
    colorName = nameParts[0];
    colorStateName = nameParts[1];
  }

  let modifierParams = {};
  if (finalParams.modifier && finalParams.modifier.match(/^--/)) {
    modifierParams = ColorModifierInterface.apply(finalParams.modifier);
    if (!modifierParams.hasIssues()) {
      modifierParams = modifierParams.value;
    }
  } else if (
    finalParams.modifier &&
    finalParams.modifier.trim().match(/[a-zA-Z0-9_-]+/)
  ) {
    colorModifier = finalParams.modifier;
  }

  if (__isColor(colorName)) {
    const color = new __SColor(colorName);
    if (finalParams.modifier) {
      color.apply(finalParams.modifier);
    }
    return color.toString();
  } else {
    const colorVar = `--s-theme-color-${colorName}-default`;

    let colorModifierVar = `--s-theme-color-${colorName}`;
    if (colorStateName) {
      colorModifierVar += `-${colorStateName}`;
    }
    if (finalParams.modifier && !finalParams.modifier.match(/^--/)) {
      colorModifierVar += `-${colorModifier}`;
    }

    let finalValue = colorVar;

    let saturationOffset = modifierParams.saturate
      ? modifierParams.saturate
      : modifierParams.desaturate
      ? modifierParams.desaturate * -1
      : undefined;
    if (saturationOffset === undefined) {
      saturationOffset = `var(${colorModifierVar}-saturationOffset, 0)`;
    }

    let lightnessOffset = modifierParams.lighten
      ? modifierParams.lighten
      : modifierParams.darken
      ? modifierParams.darken * -1
      : undefined;
    if (lightnessOffset === undefined)
      lightnessOffset = `var(${colorModifierVar}-lightnessOffset, 0)`;

    finalValue = `hsl(
      calc(
        var(${colorVar}-h, 0)
        +
        var(${colorModifierVar}-spin ,${modifierParams.spin ?? 0})
      ),
      calc(
        (
          var(${colorVar}-s, 0)
          + 
          ${saturationOffset}
        )
        * 1%
      ),
      calc(
        (
           var(${colorVar}-l, 0)
          +
          ${lightnessOffset}
        )
        * 1%
      )
    )`;

    finalValue = finalValue
      .replace(/(\n|\s{2,99999999})/gm, '')
      .replace(/\t/gm, ' ')
      .replace(/\s?\+\s?/gm, ' + ')
      .replace(/\)\-\s?/gm, ') - ')
      .replace(/\s?\*\s?/gm, ' * ')
      .replace(/\s?\/\s?/gm, ' / ');

      return finalValue;
  }
}
