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
    // alpha: {
    //   type: 'Number',
    //   default: undefined
    // },
    // opacify: {
    //   type: 'Number',
    //   default: 0
    // },
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
      required: true,
      alias: 'n'
    },
    modifier: {
      type: 'String',
      alias: 'm'
    },
    return: {
      type: 'String',
      values: ['var', 'value'],
      default: 'var'
    }
  };
}
export { postcssSugarPluginColorInterface as interface };

export interface IPostcssSugarPluginColorParams {
  name: string;
  modifier: string;
  return: 'var' | 'value';
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

  console.log(finalParams);

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
    // if (
    //   modifierParams.saturate ||
    //   modifierParams.desaturate ||
    //   modifierParams.lighten ||
    //   modifierParams.spin ||
    //   modifierParams.darken
    //   // (modifierParams.alpha !== undefined || modifierParams.opacify)
    // ) {
    //   throw new Error(
    //     `<red>postcssSugarPlugin.function.color</red> Sorry but you cannot use HSL modifiers with RGBA ones...`
    //   );
    // }

    let colorVar = `--s-theme-color-${colorName}-default`;
    let schemaVar = `--s-theme-color-schema-${colorName}`;

    let colorModifierVar = `--s-theme-color-${colorName}`;
    if (colorStateName) {
      colorModifierVar += `--${colorStateName}`;
    }
    if (finalParams.modifier && !finalParams.modifier.match(/^--/)) {
      colorModifierVar += `-${colorModifier}`;
    }

    // if (colorName === 'primary' && colorStateName) {
    //   console.log(colorModifierVar);
    // }

    let finalValue = colorVar;

    // if (
    //   modifierParams.saturate ||
    //   modifierParams.desaturate ||
    //   modifierParams.lighten ||
    //   modifierParams.darken ||
    //   modifierParams.hue !== undefined
    // ) {

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
        var(${schemaVar}-h, var(${colorVar}-h))
        +
        var(${colorModifierVar}-spin ,${modifierParams.spin ?? 0})
      ),
      calc(
        (
          var(${schemaVar}-s, var(${colorVar}-s))
          + 
          ${saturationOffset}
        )
        * 1%
      ),
      calc(
        (
          var(${schemaVar}-l, var(${colorVar}-l))
          +
          ${lightnessOffset}
        )
        * 1%
      )
    )`;

    // calc((var(${schemaVar}-s, var(${colorVar}-s)) ${
    //   modifierParams.saturate ? '+' : '-'
    // } ${
    //   modifierParams.saturate
    //     ? `var(${colorModifierVar}-saturate , ${modifierParams.saturate})`
    //     : modifierParams.desaturate
    //     ? `var(${colorModifierVar}-desaturate , ${modifierParams.desaturate})`
    //     : 0
    // }) * 1%), calc((var(${schemaVar}-s, var(${colorVar}-s)) ${
    //   modifierParams.lighten ? '+' : '-'
    // } ${
    //   modifierParams.lighten
    //     ? `var(${colorModifierVar}-lighten , ${modifierParams.lighten})`
    //     : modifierParams.darken
    //     ? `var(${colorModifierVar}-darken , ${modifierParams.darken})`
    //     : 0
    // }) * 1%))`;
    // } else if (
    //   modifierParams.alpha !== undefined ||
    //   modifierParams.opacity !== undefined ||
    //   modifierParams.opacify
    // ) {
    //   let a = `var(${schemaVar}-a, var(${colorVar}-a))`;
    //   if (modifierParams.alpha !== undefined) a = modifierParams.alpha;
    //   else if (modifierParams.opacity !== undefined) a = modifierParams.opacity;
    //   else if (modifierParams.opacify)
    //     a = `calc(${a} + var(${colorModifierVar}-opacity , ${modifierParams.opacity}))`;
    //   finalValue = `rgba(var(${schemaVar}-r, var(${colorVar}-r)),var(${schemaVar}-g, var(${colorVar}-g)), var(${schemaVar}-b, var(${colorVar}-b)), ${a})`;
    // } else {
    //   finalValue = `var(${schemaVar}, var(${colorVar}))`;
    // }

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
