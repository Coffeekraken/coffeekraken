import __SColor from '@coffeekraken/s-color';
import __get from '@coffeekraken/sugar/shared/object/get';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __isColor from '@coffeekraken/sugar/shared/is/color';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';

export function prepare(themeConfig, config) {
  Object.keys(themeConfig.themes).forEach((themeName) => {
    const themeObj = themeConfig.themes[themeName];
    if (themeObj.extends && !themeConfig.themes[themeObj.extends]) {
      throw new Error(
        `<red>[theme.config.js]</red> The theme "<yellow>${themeName}</yellow>" need to extends the theme "<yellow>${themeObj.extends}</yellow>" but this theme does not exists...`
      );
    } else if (themeObj.extends) {
      themeConfig.themes[themeName] = __deepMerge(
        themeConfig.themes[themeObj.extends],
        themeConfig.themes[themeName]
      );
      delete themeConfig.themes[themeName].extends;
    }

    Object.keys(themeObj.color).forEach((colorName) => {
      Object.keys(themeObj.color[colorName]).forEach((colorVariantName) => {
        const colorValue = themeObj.color[colorName][colorVariantName];
        if (colorVariantName.match(/^:/) && __isPlainObject(colorValue)) {
          Object.keys(colorValue).forEach((modifierName) => {
            const modifierValue = colorValue[modifierName];

            if (
              colorVariantName !== ':hover' &&
              colorVariantName !== ':focus' &&
              colorVariantName !== ':active'
            ) {
              throw new Error(
                `<red>[config.theme.${themeName}.color.${colorName}.${colorVariantName}.${modifierName}]</red> Sorry but the specified state variant "<yellow>${modifierName}</yellow>" is not a valid one. Supported states are <green>:hover, :focus and :active</green>`
              );
            }

            if (__isColor(modifierValue)) {
              throw new Error(
                `<red>[config.theme.${themeName}.color.${colorName}.${colorVariantName}.${modifierName}]</red> Sorry but a color state variant cannot be a color but just a color modifier like "--darken 10", etc...`
              );
            }
            // themeObj.color[colorName][
            //   `${colorVariantName}-${modifierName}`
            // ] = modifierValue;
          });
        } else if (__isColor(colorValue)) {
          const color = new __SColor(colorValue);
          themeObj.color[colorName][`${colorVariantName}-h`] = color.h;
          themeObj.color[colorName][`${colorVariantName}-s`] = color.s;
          themeObj.color[colorName][`${colorVariantName}-l`] = color.l;
        }
      });
    });
  });

  return themeConfig;
}

export default {
  /**
   * @name          baseTheme
   * @namespace     config.theme
   */
  baseTheme: 'dark',

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
    light: '[config.themeLight]',
    dark: '[config.themeDark]'
  }
};
