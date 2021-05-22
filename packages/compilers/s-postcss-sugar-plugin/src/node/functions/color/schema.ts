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
      values: ['default', 'accent', 'complementary'],
      required: true
    },
    modifier: {
      type: 'String',
      alias: 'm'
    }
  };
}
export { postcssSugarPluginColorInterface as interface };

export interface IPostcssSugarPluginColorParams {
  color: string;
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
    return: 'var',
    ...params
  };

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

  let schemaVar = `--s-theme-colorSchema-${colorName}-default`;

  let colorModifierVar = `--s-theme-colorSchema-${colorName}`;
  if (colorStateName) {
    colorModifierVar += `--${colorStateName}`;
  }
  if (finalParams.modifier && !finalParams.modifier.match(/^--/)) {
    colorModifierVar += `-${colorModifier}`;
  }

  let finalValue = schemaVar;

  let saturationOffset = modifierParams.saturate
    ? modifierParams.saturate
    : modifierParams.desaturate
    ? modifierParams.desaturate * -1
    : undefined;
  if (saturationOffset === undefined)
    saturationOffset = `var(${colorModifierVar}-saturationOffset, 0)`;

  let lightnessOffset = modifierParams.lighten
    ? modifierParams.lighten
    : modifierParams.darken
    ? modifierParams.darken * -1
    : undefined;
  if (lightnessOffset === undefined)
    lightnessOffset = `var(${colorModifierVar}-lightnessOffset, 0)`;

  finalValue = `hsl(
      calc(
        var(${schemaVar}-h)
        +
        var(${colorModifierVar}-spin ,${modifierParams.spin ?? 0})
      ),
      calc(
        (
          var(${schemaVar}-s)
          + 
          ${saturationOffset}
        )
        * 1%
      ),
      calc(
        (
           var(${schemaVar}-l)
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
