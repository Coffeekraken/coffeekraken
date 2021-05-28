import __SColor from '@coffeekraken/s-color';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __isColor from '@coffeekraken/sugar/shared/is/color';
import __isPlainObject from '@coffeekraken/sugar/shared/is/plainObject';
export function prepare(themeConfig, config) {
    Object.keys(themeConfig.themes).forEach((themeName) => {
        const themeObj = themeConfig.themes[themeName];
        if (themeObj.extends && !themeConfig.themes[themeObj.extends]) {
            throw new Error(`<red>[theme.config.js]</red> The theme "<yellow>${themeName}</yellow>" need to extends the theme "<yellow>${themeObj.extends}</yellow>" but this theme does not exists...`);
        }
        else if (themeObj.extends) {
            themeConfig.themes[themeName] = __deepMerge(themeConfig.themes[themeObj.extends], themeConfig.themes[themeName]);
            delete themeConfig.themes[themeName].extends;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBRXhFLE1BQU0sVUFBVSxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU07SUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDcEQsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3RCxNQUFNLElBQUksS0FBSyxDQUNiLG1EQUFtRCxTQUFTLGlEQUFpRCxRQUFRLENBQUMsT0FBTyw4Q0FBOEMsQ0FDNUssQ0FBQztTQUNIO2FBQU0sSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQzNCLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUN6QyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFDcEMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FDOUIsQ0FBQztZQUNGLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDOUM7UUFDRCxJQUFJLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ2hELE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLGdCQUFnQixFQUFFLEVBQUU7b0JBQ2xFLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDL0QsSUFBSSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxDQUFDLFVBQVUsQ0FBQyxFQUFFO3dCQUMvRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFlBQVksRUFBRSxFQUFFOzRCQUMvQyxNQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUM7NEJBRS9DLElBQ0UsZ0JBQWdCLEtBQUssUUFBUTtnQ0FDN0IsZ0JBQWdCLEtBQUssUUFBUTtnQ0FDN0IsZ0JBQWdCLEtBQUssU0FBUyxFQUM5QjtnQ0FDQSxNQUFNLElBQUksS0FBSyxDQUNiLHNCQUFzQixTQUFTLFVBQVUsU0FBUyxJQUFJLGdCQUFnQixJQUFJLFlBQVksMERBQTBELFlBQVksK0ZBQStGLENBQzVQLENBQUM7NkJBQ0g7NEJBRUQsSUFBSSxTQUFTLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0NBQzVCLE1BQU0sSUFBSSxLQUFLLENBQ2Isc0JBQXNCLFNBQVMsVUFBVSxTQUFTLElBQUksZ0JBQWdCLElBQUksWUFBWSxnSEFBZ0gsQ0FDdk0sQ0FBQzs2QkFDSDt3QkFDSCxDQUFDLENBQUMsQ0FBQztxQkFDSjt5QkFBTSxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTt3QkFDaEMsTUFBTSxLQUFLLEdBQUcsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ3ZDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxnQkFBZ0IsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQzt3QkFDN0QsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLGdCQUFnQixJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUM3RCxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsZ0JBQWdCLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7cUJBQzlEO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxXQUFXLENBQUM7QUFDckIsQ0FBQztBQUVELGVBQWU7SUFDYjs7O09BR0c7SUFDSCxLQUFLLEVBQUUsTUFBTTtJQUViOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sRUFBRTtRQUNOLElBQUksRUFBRSxvQkFBb0I7UUFDMUIsS0FBSyxFQUFFLHFCQUFxQjtRQUM1QixJQUFJLEVBQUUsb0JBQW9CO0tBQzNCO0NBQ0YsQ0FBQyJ9