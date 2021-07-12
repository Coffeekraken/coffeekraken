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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRzdDLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sc0JBQXVCLFNBQVEsWUFBWTs7QUFDeEMsaUNBQVUsR0FBRztJQUNsQixRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztLQUNmO0NBQ0YsQ0FBQztBQUdKLE1BQU0sVUFBVSxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU07SUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDcEQsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUvQyxTQUFTLGNBQWMsQ0FBQyxRQUFRO1lBRTlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMs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