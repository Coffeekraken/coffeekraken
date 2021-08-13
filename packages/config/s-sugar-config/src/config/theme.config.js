import __isColor from '@coffeekraken/sugar/shared/is/color';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
import __SInterface from '@coffeekraken/s-interface';
class ColorModifierInterface extends __SInterface {
}
ColorModifierInterface.definition = {
    saturate: {
        type: 'Number|String',
        default: 0,
    },
    desaturate: {
        type: 'Number',
        default: 0,
    },
    darken: {
        type: 'Number',
        default: 0,
    },
    lighten: {
        type: 'Number',
        default: 0,
    },
    spin: {
        type: 'Number',
        default: 0,
    },
    alpha: {
        type: 'Number',
    },
};
function expandColorObj(colorObj, path = '', baseObj = {}, baseColor = '#ff0000', currentColorStringBase = '') {
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
            colorObj[colorVariantName.replace(/^:/, '')] = expandColorObj(newObj, path + '-' + colorVariantName.replace(/^:/, ''), baseObj, baseColor, currentColorStringBase);
            delete colorObj[colorVariantName];
        }
        else if (typeof colorValue === 'string' && colorValue.trim().match(/^--/)) {
            colorObj[colorVariantName] = {
                // get color() {
                //   if (!this._color) {
                //     Object.defineProperty(this, '_color', {
                //       enumerable: false,
                //       value: new __SColor(baseColor)
                //     });
                //   }
                //   console.log('GET');
                //   return this._color.toHex();
                // },
                // get modifiers() {
                //   if (!this._modifiers) {
                //     Object.defineProperty(this, '_modifiers', {
                //       enumerable: false,
                //       value: ColorModifierInterface.apply(colorValue)
                //     });
                //     return this._modifiers;
                //   }
                // },
                variable: currentColorString + '-' + colorVariantName,
                // get r() {
                //   return this.color.r;
                // },
                // get g() {
                //   return this.color.g;
                // },
                // get b() {
                //   return this.color.b;
                // },
                // get h() {
                //   return this.color.h;
                // },
                // get s() {
                //   return this.color.s;
                // },
                // get l() {
                //   return this.color.l;
                // },
                // get a() {
                //   return this.color.a;
                // }
            };
            // delete colorObj[colorVariantName].modifiers.help;
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
// export function prepare(themeConfig, config) {
//   const duration = new __SDuration();
//   Object.keys(themeConfig.themes).forEach((themeName) => {
//     const themeObj = themeConfig.themes[themeName];
//     console.log(themeName);
//     // let currentColorStringBase = `--s-theme-color-`;
//     // let currentColor;
//     // if (themeObj.color) {
//     //   Object.keys(themeObj.color).forEach((colorName) => {
//     //     const colorObj = themeObj.color[colorName];
//     //     if (!colorObj.color) {
//     //     throw new Error(`<red>[config.theme.prepare]</red> Sorry but the color <cyan>${colorName}</cyan> missed the required "<yellow>color</yellow>" property...`);
//     //   }
//     //     const baseObj = __filter(Object.assign({}, colorObj), (key, value) => {
//     //       if (key.match(/^:/)) return false;
//     //       if (key === 'color') return false;
//     //       return true;
//     //     });
//     //     const baseColor = colorObj.color;
//     //     // themeObj.color[colorName] = expandColorObj(colorObj, colorName, baseObj, baseColor, currentColorStringBase);
//     //   });
//     // }
//   });
//   console.log(duration.end().formatedDuration);
//   return themeConfig;
// }
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
    cssVariables: ['*'],
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
        dark: '[config.themeDark]',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3hFLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBSXJELE1BQU0sc0JBQXVCLFNBQVEsWUFBWTs7QUFDdEMsaUNBQVUsR0FBRztJQUNoQixRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsZUFBZTtRQUNyQixPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsQ0FBQztLQUNiO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7S0FDakI7Q0FDSixDQUFDO0FBR04sU0FBUyxjQUFjLENBQUMsUUFBUSxFQUFFLElBQUksR0FBRyxFQUFFLEVBQUUsT0FBTyxHQUFHLEVBQUUsRUFBRSxTQUFTLEdBQUcsU0FBUyxFQUFFLHNCQUFzQixHQUFHLEVBQUU7SUFDekcsSUFBSSxrQkFBa0IsR0FBRyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7SUFDdkQsMENBQTBDO0lBRTFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtRQUMvQyxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUU5QyxJQUFJLGdCQUFnQixLQUFLLE9BQU8sRUFBRTtZQUM5QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDO1lBQUUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDO1FBRWpFLElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUM3RCxNQUFNLE1BQU0sbUNBQ0wsT0FBTyxHQUNQLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUNoQyxDQUFDO1lBRUYsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxjQUFjLENBQ3pELE1BQU0sRUFDTixJQUFJLEdBQUcsR0FBRyxHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLEVBQy9DLE9BQU8sRUFDUCxTQUFTLEVBQ1Qsc0JBQXNCLENBQ3pCLENBQUM7WUFDRixPQUFPLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ3JDO2FBQU0sSUFBSSxPQUFPLFVBQVUsS0FBSyxRQUFRLElBQUksVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6RSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsR0FBRztnQkFDekIsZ0JBQWdCO2dCQUNoQix3QkFBd0I7Z0JBQ3hCLDhDQUE4QztnQkFDOUMsMkJBQTJCO2dCQUMzQix1Q0FBdUM7Z0JBQ3ZDLFVBQVU7Z0JBQ1YsTUFBTTtnQkFDTix3QkFBd0I7Z0JBQ3hCLGdDQUFnQztnQkFDaEMsS0FBSztnQkFDTCxvQkFBb0I7Z0JBQ3BCLDRCQUE0QjtnQkFDNUIsa0RBQWtEO2dCQUNsRCwyQkFBMkI7Z0JBQzNCLHdEQUF3RDtnQkFDeEQsVUFBVTtnQkFDViw4QkFBOEI7Z0JBQzlCLE1BQU07Z0JBQ04sS0FBSztnQkFDTCxRQUFRLEVBQUUsa0JBQWtCLEdBQUcsR0FBRyxHQUFHLGdCQUFnQjtnQkFDckQsWUFBWTtnQkFDWix5QkFBeUI7Z0JBQ3pCLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWix5QkFBeUI7Z0JBQ3pCLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWix5QkFBeUI7Z0JBQ3pCLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWix5QkFBeUI7Z0JBQ3pCLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWix5QkFBeUI7Z0JBQ3pCLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWix5QkFBeUI7Z0JBQ3pCLEtBQUs7Z0JBQ0wsWUFBWTtnQkFDWix5QkFBeUI7Z0JBQ3pCLElBQUk7YUFDUCxDQUFDO1lBRUYsb0RBQW9EO1NBQ3ZEO2FBQU0sSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDOUIsMENBQTBDO1lBQzFDLGlDQUFpQztZQUNqQywwQkFBMEI7WUFDMUIsMkRBQTJEO1lBQzNELGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGdCQUFnQjtZQUNoQixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLGdCQUFnQjtZQUNoQixLQUFLO1NBQ1I7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sUUFBUSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxpREFBaUQ7QUFFakQsd0NBQXdDO0FBRXhDLDZEQUE2RDtBQUM3RCxzREFBc0Q7QUFFdEQsOEJBQThCO0FBRTlCLDBEQUEwRDtBQUMxRCwyQkFBMkI7QUFFM0IsK0JBQStCO0FBQy9CLGdFQUFnRTtBQUNoRSx5REFBeUQ7QUFDekQsb0NBQW9DO0FBQ3BDLDBLQUEwSztBQUMxSyxhQUFhO0FBQ2IscUZBQXFGO0FBQ3JGLGtEQUFrRDtBQUNsRCxrREFBa0Q7QUFDbEQsNEJBQTRCO0FBQzVCLGlCQUFpQjtBQUNqQiwrQ0FBK0M7QUFDL0MsNkhBQTZIO0FBQzdILGVBQWU7QUFDZixXQUFXO0FBQ1gsUUFBUTtBQUVSLGtEQUFrRDtBQUVsRCx3QkFBd0I7QUFDeEIsSUFBSTtBQUVKLGVBQWU7SUFDWDs7O09BR0c7SUFDSCxLQUFLLEVBQUUsT0FBTztJQUVkOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUM7SUFFbkI7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxFQUFFO1FBQ0osSUFBSSxFQUFFLG9CQUFvQjtRQUMxQixLQUFLLEVBQUUscUJBQXFCO1FBQzVCLElBQUksRUFBRSxvQkFBb0I7S0FDN0I7Q0FDSixDQUFDIn0=