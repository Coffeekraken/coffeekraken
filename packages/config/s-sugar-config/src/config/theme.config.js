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
        let currentColorStringBase = `--s-theme-color-`;
        let currentColor;
        function expandColorObj(colorObj, path = '') {
            let currentColorString = currentColorStringBase + path;
            Object.keys(colorObj).forEach((colorVariantName) => {
                const colorValue = colorObj[colorVariantName];
                if (colorVariantName === 'color') {
                    currentColor = new __SColor(colorValue);
                    return;
                }
                if (!colorObj[colorVariantName])
                    colorObj[colorVariantName] = {};
                if (colorVariantName.match(/^:/) && __isPlainObject(colorValue)) {
                    colorObj[colorVariantName.replace(/^:/, '')] = expandColorObj(colorObj[colorVariantName], path + '-' + colorVariantName.replace(/^:/, ''));
                    delete colorObj[colorVariantName];
                }
                else if (typeof colorValue === 'string' && colorValue.trim().match(/^--/)) {
                    const modifierParams = ColorModifierInterface.apply(colorValue);
                    const newColor = new __SColor(currentColor).apply(modifierParams);
                    colorObj[colorVariantName] = {
                        // original: {
                        // color: currentColor.toHex(),
                        // r: currentColor.r,
                        // g: currentColor.g,
                        // b: currentColor.b,
                        // h: currentColor.h,
                        // s: currentColor.s,
                        // l: currentColor.l,
                        // a: currentColor.a
                        // },
                        modifiers: modifierParams,
                        // color: newColor.toHex(),
                        variable: currentColorString + '-' + colorVariantName,
                        // r: newColor.r,
                        // g: newColor.g,
                        // b: newColor.b,
                        // h: newColor.h,
                        // s: newColor.s,
                        // l: newColor.l,
                        // a: newColor.a
                        color: currentColor.toHex(),
                        r: currentColor.r,
                        g: currentColor.g,
                        b: currentColor.b,
                        h: currentColor.h,
                        s: currentColor.s,
                        l: currentColor.l,
                        a: currentColor.a
                    };
                    delete colorObj[colorVariantName].modifiers.help;
                }
                else if (__isColor(colorValue)) {
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
                themeObj.color[colorName] = expandColorObj(colorObj, colorName);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRzdDLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sc0JBQXVCLFNBQVEsWUFBWTs7QUFDeEMsaUNBQVUsR0FBRztJQUNsQixRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtDQUNGLENBQUM7QUFHSixNQUFNLFVBQVUsT0FBTyxDQUFDLFdBQVcsRUFBRSxNQUFNO0lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3BELE1BQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFL0MsSUFBSSxzQkFBc0IsR0FBRyxrQkFB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