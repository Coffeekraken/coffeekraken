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
    alpha: {
      type: 'Number',
      default: undefined
    },
    opacity: {
      type: 'Number',
      default: undefined
    },
    opacify: {
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
    name: {
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
    name: '',
    modifier: '',
    return: 'var',
    ...params
  };

  let colorName = finalParams.name;
  let modifierName = 'default';

  // const nameParts = finalParams.name.split('.');
  // if (nameParts.length === 2) {
  //   colorName = nameParts[0];
  //   modifierName = nameParts[1];
  // }

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
    modifierName = finalParams.modifier;
  }

  if (__isColor(colorName)) {
    const color = new __SColor(colorName);
    if (finalParams.modifier) {
      color.apply(finalParams.modifier);
    }
    return color.toString();
  } else {
    // get the color value
    // const colorValue = __theme().config(`color.${colorName}.${modifierName}`);

    if (
      (modifierParams.saturate ||
        modifierParams.desaturate ||
        modifierParams.lighten ||
        modifierParams.spin ||
        modifierParams.darken) &&
      (modifierParams.alpha !== undefined ||
        modifierParams.opacity !== undefined ||
        modifierParams.opacify)
    ) {
      throw new Error(
        `<red>postcssSugarPlugin.function.color</red> Sorry but you cannot use HSL modifiers with RGBA ones...`
      );
    }

    let colorVar = `--s-theme-color-${colorName}-${modifierName}`;
    // if (colorName === 'current') colorVar = `--s-theme-current-color`;
    let finalValue = colorVar;

    if (
      modifierParams.saturate ||
      modifierParams.desaturate ||
      modifierParams.lighten ||
      modifierParams.darken ||
      modifierParams.hue !== undefined
    ) {
      const spin = modifierParams.spin;

      finalValue = `hsl(calc(var(${colorVar}-h) + ${spin}), calc((var(${colorVar}-s) ${
        modifierParams.saturate ? '+' : '-'
      } ${
        modifierParams.saturate ?? modifierParams.desaturate
      }) * 1%), calc((var(${colorVar}-l) ${
        modifierParams.lighten ? '+' : '-'
      } ${modifierParams.lighten ?? modifierParams.darken}) * 1%))`;
    } else if (
      modifierParams.alpha !== undefined ||
      modifierParams.opacity !== undefined ||
      modifierParams.opacify
    ) {
      let a = `var(${colorVar}-a)`;
      if (modifierParams.alpha !== undefined) a = modifierParams.alpha;
      else if (modifierParams.opacity !== undefined) a = modifierParams.opacity;
      else if (modifierParams.opacify)
        a = `calc(${a} + ${modifierParams.opacify})`;
      finalValue = `rgba(var(${colorVar}-r),var(${colorVar}-g), var(${colorVar}-b), ${a})`;
    } else {
      finalValue = `var(${finalValue})`;
    }

    if (finalParams.return === 'var') {
      return finalValue;
    } else {
      // return colorValue;
    }
  }
}
