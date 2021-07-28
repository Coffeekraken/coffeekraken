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
    alpha: {
        type: 'Number'
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
                        if (['saturate', 'desaturate', 'lighten', 'darken', 'alpha', 'help'].indexOf(propKey) !== -1)
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
                    if (modifierParams.alpha >= 0 && modifierParams.alpha <= 1) {
                        colorObj[`${colorVariantName}-a`] = modifierParams.alpha;
                    }
                    else {
                        colorObj[`${colorVariantName}-a`] = 1;
                    }
                    delete colorObj[colorVariantName];
                }
                else if (__isColor(colorValue)) {
                    const color = new __SColor(colorValue);
                    colorObj[`${colorVariantName}-h`] = color.h;
                    colorObj[`${colorVariantName}-s`] = color.s;
                    colorObj[`${colorVariantName}-l`] = color.l;
                    colorObj[`${colorVariantName}-a`] = color.a;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRzdDLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sc0JBQXVCLFNBQVEsWUFBWTs7QUFDeEMsaUNBQVUsR0FBRztJQUNsQixRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtDQUNGLENBQUM7QUFHSixNQUFNLFVBQVUsT0FBTyxDQUFDLFdBQVcsRUFBRSxNQUFNO0lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3BELE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFL0MsU0FBUyxjQUFjLENBQUMsUUFBUTtZ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