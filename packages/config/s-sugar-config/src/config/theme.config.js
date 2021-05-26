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
                        // themeObj.color[colorName][
                        //   `${colorVariantName}-${modifierName}`
                        // ] = modifierValue;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sZUFBZSxNQUFNLDJDQUEyQyxDQUFDO0FBRXhFLE1BQU0sVUFBVSxPQUFPLENBQUMsV0FBVyxFQUFFLE1BQU07SUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7UUFDcEQsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM3RCxNQUFNLElBQUksS0FBSyxDQUNiLG1EQUFtRCxTQUFTLGlEQUFpRCxRQUFRLENBQUMsT0FBTyw4Q0FBOEMsQ0FDNUssQ0FBQztTQUNIO2FBQU0sSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO1lBQzNCLFdBQVcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUN6QyxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFDcEMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FDOUIsQ0FBQztZQUNGLE9BQU8sV0FBVyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUM7U0FDOUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFO2dCQUNsRSxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQy9ELElBQUksZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDL0QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxZQUFZLEVBQUUsRUFBRTt3QkFDL0MsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUUvQyxJQUNFLGdCQUFnQixLQUFLLFFBQVE7NEJBQzdCLGdCQUFnQixLQUFLLFFBQVE7NEJBQzdCLGdCQUFnQixLQUFLLFNBQVMsRUFDOUI7NEJBQ0EsTUFBTSxJQUFJLEtBQUssQ0FDYixzQkFBc0IsU0FBUyxVQUFVLFNBQVMsSUFBSSxnQkFBZ0IsSUFBSSxZQUFZLDBEQUEwRCxZQUFZLCtGQUErRixDQUM1UCxDQUFDO3lCQUNIO3dCQUVELElBQUksU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUFFOzRCQUM1QixNQUFNLElBQUksS0FBSyxDQUNiLHNCQUFzQixTQUFTLFVBQVUsU0FBUyxJQUFJLGdCQUFnQixJQUFJLFlBQVksZ0hBQWdILENBQ3ZNLENBQUM7eUJBQ0g7d0JBQ0QsNkJBQTZCO3dCQUM3QiwwQ0FBMEM7d0JBQzFDLHFCQUFxQjtvQkFDdkIsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7cUJBQU0sSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLEVBQUU7b0JBQ2hDLE1BQU0sS0FBSyxHQUFHLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDO29CQUN2QyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEdBQUcsZ0JBQWdCLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzdELFFBQVEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxnQkFBZ0IsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDN0QsUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxHQUFHLGdCQUFnQixJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDO2lCQUM5RDtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUM7QUFFRCxlQUFlO0lBQ2I7OztPQUdHO0lBQ0gsU0FBUyxFQUFFLE1BQU07SUFFakI7Ozs7Ozs7OztPQVNHO0lBQ0gsTUFBTSxFQUFFO1FBQ04sS0FBSyxFQUFFLHFCQUFxQjtRQUM1QixJQUFJLEVBQUUsb0JBQW9CO0tBQzNCO0NBQ0YsQ0FBQyJ9