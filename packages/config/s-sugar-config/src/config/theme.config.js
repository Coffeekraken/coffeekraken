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
    },
    grayscale: {
        type: 'Boolean',
        default: false
    }
};
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
                if (!colorObj[colorVariantName])
                    colorObj[colorVariantName] = {};
                if (colorVariantName.match(/^:/) && __isPlainObject(colorValue)) {
                    const newObj = Object.assign(Object.assign({}, baseObj), colorObj[colorVariantName]);
                    colorObj[colorVariantName.replace(/^:/, '')] = expandColorObj(newObj, path + '-' + colorVariantName.replace(/^:/, ''), baseObj, baseColor);
                    delete colorObj[colorVariantName];
                }
                else if (typeof colorValue === 'string' && colorValue.trim().match(/^--/)) {
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
                if (!colorObj.color) {
                    throw new Error(`<red>[config.theme.prepare]</red> Sorry but the color ${colorName} missed the required "<yellow>color</yellow>" property...`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRzdDLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLDBDQUEwQyxDQUFDO0FBQ2hFLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELE1BQU0sc0JBQXVCLFNBQVEsWUFBWTs7QUFDeEMsaUNBQVUsR0FBRztJQUNsQixRQUFRLEVBQUU7UUFDUixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsVUFBVSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsT0FBTyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNYO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7S0FDZjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLEtBQUs7S0FDZjtDQUNGLENBQUM7QUFHSixNQUFNLFVBQVUsT0FBTyxDQUFDLFdBQVcsRUFBRSxNQUFNO0lBRXpDLE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7SUFFbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDcEQsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUUvQyxJQUFJLHNCQUFzQixHQUFHLGtCQUFrQixDQUFDO1FBQ2hELElBQUksWUFBWSxDQUFDO1FBRWpCLFNBQVMsY0FBYyxDQUFDLFFBQVEsRUFBRSxJQUFJLEdBQUcsRUFBRSxFQUFFLE9BQU8sR0FBRyxFQUFFLEVBQUUsU0FBUyxHQUFHLFNBQVM7WUFFOUUsSUFBSSxrQkFBa0IsR0FBRyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7WUFDdkQsWUFBWSxHQUFHLElBQUksUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRXZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtnQkFDakQsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBRTlDLElBQUksZ0JBQWdCLEtBQUssT0FBTyxFQUFFO29CQUNoQyxPQUFPO2lCQUNSO2dCQUVELElBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUM7b0JBQUUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDO2dCQUVqRSxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBRS9ELE1BQU0sTUFBTSxtQ0FDUCxPQUFPLEdBQ1AsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQzlCLENBQUM7b0JBRUYsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsTUFBTSxFQUFFLElBQUksR0FBRyxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7b0JBQzNJLE9BQU8sUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7aUJBRW5DO3FCQUFNLElBQUksT0FBTyxVQUFVLEtBQUssUUFBUSxJQUFJLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBRTNFLE1BQU0sY0FBYyxHQUFHLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDaEUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUc7d0JBQzNCLEtBQUssRUFBRSxZQUFZLENBQUMsS0FBSyxFQUFFO3dCQUMzQixTQUFTLEVBQUUsY0FBYzt3QkFDekIsUUFBUSxFQUFFLGtCQUFrQixHQUFHLEdBQUcsR0FBRyxnQkFBZ0I7d0JBQ3JELENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQzt3QkFDakIsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO3dCQUNqQixDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7d0JBQ2pCLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQzt3QkFDakIsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO3dCQUNqQixDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7d0JBQ2pCLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztxQkFDbEIsQ0FBQztvQkFFRixPQUFPLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7aUJBRWxEO3FCQUFNLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUNoQyxNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDdkMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUc7d0JBQzNCLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFFO3dCQUNwQixRQUFRLEVBQUUsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLGdCQUFnQjt3QkFDckQsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUNWLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDVixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQ1YsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO3dCQUNWLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQzt3QkFDVixDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7d0JBQ1YsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO3FCQUNYLENBQUM7aUJBQ0g7WUFDSCxDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sUUFBUSxDQUFDO1FBRWxCLENBQUM7UUFFRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ2hELE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO29CQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLHlEQUF5RCxTQUFTLDJEQUEyRCxDQUFDLENBQUM7aUJBQ2hKO2dCQUNDLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDbkUsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQzt3QkFBRSxPQUFPLEtBQUssQ0FBQztvQkFDbEMsSUFBSSxHQUFHLEtBQUssT0FBTzt3QkFBRSxPQUFPLEtBQUssQ0FBQztvQkFDbEMsT0FBTyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFDakMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxjQUFjLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdEYsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztJQUU3QyxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBRUQsZUFBZTtJQUNiOzs7T0FHRztJQUNILEtBQUssRUFBRSxPQUFPO0lBRWQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILFlBQVksRUFBRTtRQUNaLEdBQUc7S0FDSjtJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsS0FBSyxFQUFFLHFCQUFxQjtRQUM1QixJQUFJLEVBQUUsb0JBQW9CO0tBQzNCO0NBQ0YsQ0FBQyJ9