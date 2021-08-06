import __SColor from '@coffeekraken/s-color';
import __get from '@coffeekraken/sugar/shared/object/get';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __isColor from '@coffeekraken/sugar/shared/is/color';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __SInterface from '@coffeekraken/s-interface';
import __filter from '@coffeekraken/sugar/shared/object/filter';
import __SDuration from '@coffeekraken/s-duration';

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
      type: 'Number'
    },
    grayscale: {
      type: 'Boolean',
      default: false
    }
  };
}

export function prepare(themeConfig, config) {

  const duration = new __SDuration();

  Object.keys(themeConfig.themes).forEach((themeName) => {
    const themeObj = themeConfig.themes[themeName];

    let currentColorStringBase = `--s-theme-color-`;
    let currentColor;

    function expandColorObj(colorObj, path = '', baseObj = {}, baseColor = '#ff0000') {

      let currentColorString = currentColorStringBase + path;
      currentColor = new __SColor(baseColor);

      Object.keys(colorObj).forEach((colorVariantName) => {
        const colorValue = colorObj[colorVariantName];
        
        if (colorVariantName === 'color') {  
          return;
        }

        if (!colorObj[colorVariantName]) colorObj[colorVariantName] = {};

        if (colorVariantName.match(/^:/) && __isPlainObject(colorValue)) {

          const newObj = {
            ...baseObj,
            ...colorObj[colorVariantName]
          };

          colorObj[colorVariantName.replace(/^:/, '')] = expandColorObj(newObj, path + '-' + colorVariantName.replace(/^:/, ''), baseObj, baseColor);
          delete colorObj[colorVariantName];

        } else if (typeof colorValue === 'string' && colorValue.trim().match(/^--/)) {

          const modifierParams = ColorModifierInterface.apply(colorValue);
          colorObj[colorVariantName] = {
            color: currentColor.toHex(),
            modifiers: modifierParams,
            variable: currentColorString + '-' + colorVariantName,
            r: currentColor.r,
            g: currentColor.g,
            b: currentColor.b,
            h: currentColor.h,
            s: currentColor.s,
            l: currentColor.l,
            a: currentColor.a
          };

          delete colorObj[colorVariantName].modifiers.help;

        } else if (__isColor(colorValue)) {
          const color = new __SColor(colorValue);
          colorObj[colorVariantName] = {
            color: color.toHex(),
            variable: currentColorString + '-' + colorVariantName,
            r: color.r,
            g: color.g,
            b: color.b,
            h: color.h,
            s: color.s,
            l: color.l,
            a: color.a,
          };
        }
      });

      return colorObj;

    }

    if (themeObj.color) {
      Object.keys(themeObj.color).forEach((colorName) => {
        const colorObj = themeObj.color[colorName];
        if (!colorObj.color) {
        throw new Error(`<red>[config.theme.prepare]</red> Sorry but the color ${colorName} missed the required "<yellow>color</yellow>" property...`);
      }
        const baseObj = __filter(Object.assign({}, colorObj), (key, value) => {
          if (key.match(/^:/)) return false;
          if (key === 'color') return false;
          return true;
        });
        const baseColor = colorObj.color;
        themeObj.color[colorName] = expandColorObj(colorObj, colorName, baseObj, baseColor);
      });
    }
  });

  console.log(duration.end().formatedDuration);

  return themeConfig;
}

export default {
  /**
   * @name          theme
   * @namespace     config.theme
   */
  theme: 'light',

  /**
   * @name          cssVariables
   * @namespace     config.theme
   * 
   * Specify which config(s) you want to be printed in your css as variables.
   * If we have a configuration available like "some.thing.cool", the outgoing variable
   * will be "--s-theme-some-thing-cool".
   * You can specify some patterns like "color.*", "typo.something.*" cause the check will be
   * made using micromatch package
   * 
   * @see           https://www.npmjs.com/package/micromatch
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  cssVariables: [
    '*'
  ],

  /**
   * @name          themes
   * @namespace     config.theme
   * @type          Object
   *
   * Store all the themes inside a property each like "default", "myCoolTheme", etc...
   *
   * @since       2.0.0
   * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  themes: {
    base: '[config.themeBase]',
    light: '[config.themeLight]',
    dark: '[config.themeDark]'
  }
};
