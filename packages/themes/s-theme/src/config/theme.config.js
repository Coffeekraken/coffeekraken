import __SSugarJson from '@coffeekraken/s-sugar-json';
export function preprocess(rawThemeConfig, rawConfig) {
    // setting theme from sugar.json
    const sugarJsonInstance = new __SSugarJson();
    const sugarJson = sugarJsonInstance.current();
    if (sugarJson.theme)
        rawThemeConfig.theme = sugarJson.theme;
    if (sugarJson.variant)
        rawThemeConfig.variant = sugarJson.variant;
    // inject each available themes inside the "themes" property
    Object.keys(rawConfig).forEach((configId) => {
        const configObj = rawConfig[configId];
        if (configObj.themeName && configObj.variants) {
            Object.keys(configObj.variants).forEach((variantName) => {
                const themeId = `${configObj.themeName}-${variantName}`;
                if (!rawThemeConfig.themes[themeId]) {
                    rawThemeConfig.themes[themeId] = `[config.${configId}.variants.${variantName}]`;
                }
            });
        }
    });
    return rawThemeConfig;
}
export function postprocess(themeConfig, config) {
    const themes = themeConfig.themes;
    // console.log(themes['default-light']);
    Object.keys(themes).forEach((themeName) => {
        const themeObj = themes[themeName];
        if (!themeObj.color.current) {
            if (themeObj.defaultColor) {
                themeObj.color.current = Object.assign({}, themeObj.color[themeObj.defaultColor]);
            }
            else
                const firstColor = themeObj.color[Object.keys(themeObj.color)[0]];
            themeObj.color.current = Object.assign({}, firstColor);
        }
    });
}
;
return themeConfig;
export default function (env, config) {
    return {
        /**
         * @name          theme
         * @namespace     config.theme
         */
        theme: 'default',
        /**
         * @name          variant
         * @namespace     config.theme
         */
        variant: 'light',
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
        themes: {},
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBRXRELE1BQU0sVUFBVSxVQUFVLENBQUMsY0FBYyxFQUFFLFNBQVM7SUFDaEQsZ0NBQWdDO0lBQ2hDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUM3QyxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUU5QyxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsY0FBYyxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQzVELElBQUksU0FBUyxDQUFDLE9BQU87UUFBRSxjQUFjLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7SUFFbEUsNERBQTREO0lBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDeEMsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksU0FBUyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUNwRCxNQUFNLE9BQU8sR0FBRyxHQUFHLFNBQVMsQ0FBQyxTQUFTLElBQUksV0FBVyxFQUFFLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNqQyxjQUFjLENBQUMsTUFBTSxDQUNqQixPQUFPLENBQ1YsR0FBRyxXQUFXLFFBQVEsYUFBYSxXQUFXLEdBQUcsQ0FBQztpQkFDdEQ7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLGNBQWMsQ0FBQztBQUMxQixDQUFDO0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxXQUFXLEVBQUUsTUFBTTtJQUMzQyxNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO0lBRWxDLHdDQUF3QztJQUV4QyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUU7WUFDekIsSUFBSSxRQUFRLENBQUMsWUFBWSxFQUFFO2dCQUN2QixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNsQyxFQUFFLEVBQ0YsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQ3hDLENBQUM7YUFDTDs7Z0JBQ0csTUFBTSxVQUFVLEdBQ1osUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25ELFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1NBQzFEO0lBQ0wsQ0FBQyxDQUFBLENBQUE7QUFDTCxDQUFDO0FBQUMsQ0FBQztBQUNILE9BQU8sV0FBVyxDQUFDO0FBR3ZCLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRyxFQUFFLE1BQU07SUFDaEMsT0FBTztRQUNIOzs7V0FHRztRQUNILEtBQUssRUFBRSxTQUFTO1FBRWhCOzs7V0FHRztRQUNILE9BQU8sRUFBRSxPQUFPO1FBRWhCOzs7Ozs7Ozs7Ozs7O1dBYUc7UUFDSCxZQUFZLEVBQUUsQ0FBQyxHQUFHLENBQUM7UUFFbkI7Ozs7Ozs7OztXQVNHO1FBQ0gsTUFBTSxFQUFFLEVBQUU7S0FDYixDQUFDO0FBQ04sQ0FBQyJ9