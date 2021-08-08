import __SColor from '@coffeekraken/s-color';
import __isColor from '@coffeekraken/sugar/shared/is/color';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __SInterface from '@coffeekraken/s-interface';
import __filter from '@coffeekraken/sugar/shared/object/filter';
import __SDuration from '@coffeekraken/s-duration';
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
    }
};
export function prepare(themeConfig, config) {
    console.log('PREPARE');
    const duration = new __SDuration();
    Object.keys(themeConfig.themes).forEach((themeName) => {
        const themeObj = themeConfig.themes[themeName];
        let currentColorStringBase = `--s-theme-color-`;
        let currentColor;
        function expandColorObj(colorObj, path = '', baseObj = {}, baseColor = '#ff0000') {
            let currentColorString = currentColorStringBase + path;
            // currentColor = new __SColor(baseColor);
            Object.keys(colorObj).forEach((colorVariantName) => {
                const colorValue = colorObj[colorVariantName];
                if (colorVariantName === 'color') {
                    return;
                }
                if (!colorObj[colorVariantName])
                    colorObj[colorVariantName] = {};
                if (colorVariantName.match(/^:/) && __isPlainObject(colorValue)) {
                    const newObj = Object.assign(Object.assign({}, baseObj), colorObj[colorVariantName]);
                    colorObj[colorVariantName.replace(/^:/, '')] = expandColorObj(newObj, path + '-' + colorVariantName.replace(/^:/, ''), baseObj, baseColor);
                    delete colorObj[colorVariantName];
                }
                else if (typeof colorValue === 'string' && colorValue.trim().match(/^--/)) {
                    colorObj[colorVariantName] = {
                        get color() {
                            if (!this._color) {
                                Object.defineProperty(this, '_color', {
                                    enumerable: false,
                                    value: new __SColor(baseColor)
                                });
                            }
                            return this._color.toHex();
                        },
                        get modifiers() {
                            if (!this._modifiers) {
                                Object.defineProperty(this, '_modifiers', {
                                    enumerable: false,
                                    value: ColorModifierInterface.apply(colorValue)
                                });
                                return this._modifiers;
                            }
                        },
                        variable: currentColorString + '-' + colorVariantName,
                        get r() {
                            return this.color.r;
                        },
                        get g() {
                            return this.color.g;
                        },
                        get b() {
                            return this.color.b;
                        },
                        get h() {
                            return this.color.h;
                        },
                        get s() {
                            return this.color.s;
                        },
                        get l() {
                            return this.color.l;
                        },
                        get a() {
                            return this.color.a;
                        }
                    };
                    delete colorObj[colorVariantName].modifiers.help;
                }
                else if (__isColor(colorValue)) {
                    // const color = new __SColor(colorValue);
                    // colorObj[colorVariantName] = {
                    //   color: color.toHex(),
                    //   variable: currentColorString + '-' + colorVariantName,
                    //   r: color.r,
                    //   g: color.g,
                    //   b: color.b,
                    //   h: color.h,
                    //   s: color.s,
                    //   l: color.l,
                    //   a: color.a,
                    // };
                }
            });
            return colorObj;
        }
        if (themeObj.color) {
            Object.keys(themeObj.color).forEach((colorName) => {
                const colorObj = themeObj.color[colorName];
                if (!colorObj.color) {
                    throw new Error(`<red>[config.theme.prepare]</red> Sorry but the color <cyan>${colorName}</cyan> missed the required "<yellow>color</yellow>" property...`);
                }
                const baseObj = __filter(Object.assign({}, colorObj), (key, value) => {
                    if (key.match(/^:/))
                        return false;
                    if (key === 'color')
                        return false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRzdDLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2hFLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELE1BQU0sc0JBQXVCLFNBQVEsWUFBWTs7QUFDeEMsaUNBQVUsR0FBRztJQUNsQixRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7S0FDZjtDQUNGLENBQUM7QUFHSixNQUFNLFVBQVUsT0FBTyxDQUFDLFdBQVcsRUFBRSxNQUFNO0lBRXpDLE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFdkIsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztJQUVuQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUs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