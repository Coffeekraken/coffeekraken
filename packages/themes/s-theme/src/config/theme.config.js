export function preprocess(rawThemeConfig, rawConfig) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVNBLE1BQU0sVUFBVSxVQUFVLENBQUMsY0FBYyxFQUFFLFNBQVM7SUFDaEQsNERBQTREO0lBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDeEMsTUFBTSxTQUFTLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RDLElBQUksU0FBUyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsUUFBUSxFQUFFO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUNwRCxNQUFNLE9BQU8sR0FBRyxHQUFHLFNBQVMsQ0FBQyxTQUFTLElBQUksV0FBVyxFQUFFLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNqQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFdBQVcsUUFBUSxhQUFhLFdBQVcsR0FBRyxDQUFDO2lCQUNuRjtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sY0FBYyxDQUFDO0FBQzFCLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUcsRUFBRSxNQUFNO0lBQ2hDLE9BQU87UUFDSDs7O1dBR0c7UUFDSCxLQUFLLEVBQUUsU0FBUztRQUVoQjs7O1dBR0c7UUFDSCxPQUFPLEVBQUUsT0FBTztRQUVoQjs7Ozs7Ozs7Ozs7OztXQWFHO1FBQ0gsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBRW5COzs7Ozs7Ozs7V0FTRztRQUNILE1BQU0sRUFBRSxFQUFFO0tBQ2IsQ0FBQztBQUNOLENBQUMifQ==