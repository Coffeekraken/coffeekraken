import __SColor from '@coffeekraken/s-color';
import __isColor from '@coffeekraken/sugar/shared/is/color';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __SInterface from '@coffeekraken/s-interface';
class ColorModifierInterface extends __SInterface {
}
ColorModifierInterface.definition = {
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
                }
                else if (typeof colorValue === 'string' && colorValue.trim().match(/^--/)) {
                    const modifierParams = ColorModifierInterface.apply(colorValue);
                    Object.keys(modifierParams).forEach((propKey) => {
                        const propValue = modifierParams[propKey];
                        if (['saturate', 'desaturate', 'lighten', 'darken', 'help'].indexOf(propKey) !== -1)
                            return;
                        colorObj[`${colorVariantName}-${propKey}`] = propValue;
                    });
                    if (modifierParams.saturate > 0) {
                        colorObj[`${colorVariantName}-saturationOffset`] = modifierParams.saturate;
                    }
                    else if (modifierParams.desaturate > 0) {
                        colorObj[`${colorVariantName}-saturationOffset`] = modifierParams.desaturate * -1;
                    }
                    else {
                        colorObj[`${colorVariantName}-saturationOffset`] = 0;
                    }
                    if (modifierParams.lighten > 0) {
                        colorObj[`${colorVariantName}-lightnessOffset`] = modifierParams.lighten;
                    }
                    else if (modifierParams.darken > 0) {
                        colorObj[`${colorVariantName}-lightnessOffset`] = modifierParams.darken * -1;
                    }
                    else {
                        colorObj[`${colorVariantName}-lightnessOffset`] = 0;
                    }
                }
                else if (__isColor(colorValue)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRzdDLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sc0JBQXVCLFNBQVEsWUFBWTs7QUFDeEMsaUNBQVUsR0FBRztJQUNsQixRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNmO0NBQ0YsQ0FBQztBQUdKLE1BQU0sVUFBVSxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU07SUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDcEQsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxtRUFBbUU7UUFDbkUscUJBQXFCO1FBQ3JCLGtMQUFrTDtRQUNsTCxPQUFPO1FBQ1AsaUNBQWlDO1FBQ2pD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