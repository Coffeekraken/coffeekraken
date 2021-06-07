import __SColor from '@coffeekraken/s-color';
import __isColor from '@coffeekraken/sugar/shared/is/color';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
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
        if (themeObj.color) {
            Object.keys(themeObj.color).forEach((colorName) => {
                Object.keys(themeObj.color[colorName]).forEach((colorVariantName) => {
                    const colorValue = themeObj.color[colorName][colorVariantName];
                    if (colorVariantName.match(/^:/) && __isPlainObject(colorValue)) {
                        Object.keys(colorValue).forEach((modifierName) => {
                            const modifierValue = colorValue[modifierName];
                            if (colorVariantName !== ':hover' &&
                                colorVariantName !== ':focus' &&
                                colorVariantName !== ':active') {
                                throw new Error(`<red>[config.theme.${themeName}.color.${colorName}.${colorVariantName}.${modifierName}]</red> Sorry but the specified state variant "<yellow>${modifierName}</yellow>" is not a valid one. Supported states are <green>:hover, :focus and :active</green>`);
                            }
                            if (__isColor(modifierValue)) {
                                throw new Error(`<red>[config.theme.${themeName}.color.${colorName}.${colorVariantName}.${modifierName}]</red> Sorry but a color state variant cannot be a color but just a color modifier like "--darken 10", etc...`);
                            }
                        });
                    }
                    else if (__isColor(colorValue)) {
                        const color = new __SColor(colorValue);
                        themeObj.color[colorName][`${colorVariantName}-h`] = color.h;
                        themeObj.color[colorName][`${colorVariantName}-s`] = color.s;
                        themeObj.color[colorName][`${colorVariantName}-l`] = color.l;
                    }
                });
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
    theme: 'dark',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRzdDLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBRXhFLE1BQU0sVUFBVSxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU07SUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDcEQsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxtRUFBbUU7UUFDbkUscUJBQXFCO1FBQ3JCLGtMQUFrTDtRQUNsTCxPQUFPO1FBQ1AsaUNBQWlDO1FBQ2pDLGlEQUFpRDtRQUNqRCw0Q0FBNEM7UUFDNUMsb0NBQW9DO1FBQ3BDLE9BQU87UUFDUCxrREFBa0Q7UUFDbEQsSUFBSTtRQUNKLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTtZQUNsQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDaEQsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTtvQkFDbEUsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUMvRCxJQUFJLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxlQUFlLENBQUMsVUFBVSxDQUFDLEVBQUU7d0JBQy9ELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxFQUFFLEVBQUU7NEJBQy9DLE1BQU0sYUFBYSxHQUFHLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQzs0QkFFL0MsSUFDRSxnQkFBZ0IsS0FBSyxRQUFRO2dDQUM3QixnQkFBZ0IsS0FBSyxRQUFRO2dDQUM3QixnQkFBZ0IsS0FBSyxTQUFTLEVBQzlCO2dDQUNBLE1BQU0sSUFBSSxLQUFLLENBQ2Isc0JBQXNCLFNBQVMsVUFBVSxTQUFTLElBQUksZ0JBQWdCLElBQUksWUFBWSwwREFBMEQsWUFBWSwrRkFBK0YsQ0FDNVAsQ0FBQzs2QkFDSDs0QkFFRCxJQUFJLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBRTtnQ0FDNUIsTUFBTSxJQUFJLEtBQUssQ0FDYixzQkFBc0IsU0FBUyxVQUFVLFNBQVMsSUFBSSxnQkFBZ0IsSUFBSSxZQUFZLGdIQUFnSCxDQUN2TSxDQUFDOzZCQUNIO3dCQUNILENBQUMsQ0FBQyxDQUFDO3FCQUNKO3lCQUFNLElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFO3dCQUNoQyxNQUFNLEtBQUssR0FBRyxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDdkMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLGdCQUFnQixJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUM3RCxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsZ0JBQWdCLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQzdELFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxnQkFBZ0IsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztxQkFDOUQ7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDO0FBRUQsZUFBZTtJQUNiOzs7T0FHRztJQUNILEtBQUssRUFBRSxNQUFNO0lBRWI7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLG9CQUFvQjtRQUMxQixLQUFLLEVBQUUscUJBQXFCO1FBQzVCLElBQUksRUFBRSxvQkFBb0I7S0FDM0I7Q0FDRixDQUFDIn0=