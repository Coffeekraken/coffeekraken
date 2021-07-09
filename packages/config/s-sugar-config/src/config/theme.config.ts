import __SColor from '@coffeekraken/s-color';
import __get from '@coffeekraken/sugar/shared/object/get';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __isColor from '@coffeekraken/sugar/shared/is/color';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
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

export function prepare(themeConfig, config) {
  Object.keys(themeConfig.themes).forEach((themeName) => {
    const themeObj = themeConfig.themes[themeName];
    // if (themeObj.extends && !themeConfig.themes[themeObj.extends]) {
    //   throw new Error(
    //     `<red>[theme.config.js]</red> The theme "<yellow>${themeName}</yellow>" need to extends the theme "<yellow>${themeObj.extends}</yellow>" but this theme does not exists...`
    //   );
    // } else if (themeObj.extends) {
    //   themeConfig.themes[themeName] = __deepMerge(
    //     themeConfig.themes[themeObj.extends],
    //     themeConfig.themes[themeName]
    //   );
    //   delete themeConfig.themes[themeName].extends;
    // }

    function expandColorObj(colorObj) {

      Object.keys(colorObj).forEach((colorVariantName) => {
        const colorValue = colorObj[colorVariantName];

        if (colorVariantName.match(/^:/) && __isPlainObject(colorValue)) {

          colorObj[colorVariantName.replace(/^:/, '')] = expandColorObj(colorObj[colorVariantName]);
          delete colorObj[colorVariantName];

        } else if (typeof colorValue === 'string' && colorValue.trim().match(/^--/)) {

          const modifierParams = ColorModifierInterface.apply(colorValue);

          Object.keys(modifierParams).forEach((propKey) => {
            const propValue = modifierParams[propKey];
            if (['saturate','desaturate','lighten','darken','help'].indexOf(propKey) !== -1) return;
            colorObj[`${colorVariantName}-${propKey}`] = propValue;
          });

          if (modifierParams.saturate > 0) {
            colorObj[`${colorVariantName}-saturationOffset`] = modifierParams.saturate;
          } else if (modifierParams.desaturate > 0) {
            colorObj[`${colorVariantName}-saturationOffset`] = modifierParams.desaturate * -1;
          } else {
            colorObj[`${colorVariantName}-saturationOffset`] = 0;
          }
          if (modifierParams.lighten > 0) {
            colorObj[`${colorVariantName}-lightnessOffset`] = modifierParams.lighten;
          } else if (modifierParams.darken > 0) {
            colorObj[`${colorVariantName}-lightnessOffset`] = modifierParams.darken * -1;
          } else {
            colorObj[`${colorVariantName}-lightnessOffset`] = 0;
          }

        } else if (__isColor(colorValue)) {
          const color = new __SColor(colorValue);
          colorObj[`${colorVariantName}-h`] = color.h;
          colorObj[`${colorVariantName}-s`] = color.s;
          colorObj[`${colorVariantName}-l`] = color.l;
        }
      });

      return colorObj;

    }

    if (themeObj.color) {
      Object.keys(themeObj.color).forEach((colorName) => {
        const colorObj = themeObj.color[colorName];
        themeObj.color[colorName] = expandColorObj(colorObj);
      });
    }
  });

  return themeConfig;
}

export default {
  /**
   * @name          theme
   * @namespace     config.theme
   */
  theme: 'light',

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
