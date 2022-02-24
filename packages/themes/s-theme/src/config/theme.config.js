import __SSugarJson from '@coffeekraken/s-sugar-json';
export function preprocess(env, rawThemeConfig, rawConfig) {
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
export function postprocess(env, themeConfig, config) {
    const themes = themeConfig.themes;
    // console.log(themes['default-light']);
    Object.keys(themes).forEach((themeName) => {
        const themeObj = themes[themeName];
        if (!themeObj.color.current) {
            if (themeObj.defaultColor) {
                themeObj.color.current = Object.assign({}, themeObj.color[themeObj.defaultColor]);
            }
            else {
                const firstColor = themeObj.color[Object.keys(themeObj.color)[0]];
                themeObj.color.current = Object.assign({}, firstColor);
            }
        }
        if (!themeObj.color.primary) {
            if (themeObj.defaultColor) {
                themeObj.color.primary = Object.assign({}, themeObj.color[themeObj.defaultColor]);
            }
            else {
                const firstColor = themeObj.color[Object.keys(themeObj.color)[0]];
                themeObj.color.primary = Object.assign({}, firstColor);
            }
        }
        if (!themeObj.color.secondary) {
            if (themeObj.defaultColor) {
                themeObj.color.secondary = Object.assign({}, themeObj.color[themeObj.defaultColor]);
            }
            else {
                const firstColor = themeObj.color[Object.keys(themeObj.color)[0]];
                themeObj.color.secondary = Object.assign({}, firstColor);
            }
        }
    });
    return themeConfig;
}
export default function (env, config) {
    return {
        /**
         * @name          theme
         * @namespace     config.theme
         * @default         default
         *
         * Specify the theme to use in your project. You can also specify it through a `sugar.json` file
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        theme: 'default',
        /**
         * @name          variant
         * @namespace     config.theme
         * @default         light
         *
         * Specify the theme variant to use in your project. You can also specify it through a `sugar.json` file
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        variant: 'light',
        /**
         * @name          cssVariables
         * @namespace     config.theme
         * @type          String[]
         * @default       ['*']
         *
         * Specify which config(s) you want to be printed in your css as variables.
         * If we have a configuration available like "some.thing.cool", the outgoing variable
         * will be "--s-theme-some-thing-cool".
         * You can specify some patterns like "color.*", "typo.something.*" cause the check will be
         * made using micromatch package
         *
         * @see           https://www.npmjs.com/package/micromatch
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        cssVariables: ['*'],
        /**
         * @name          themes
         * @namespace     config.theme
         * @type          Object
         * @default         {}
         *
         * Store all the themes inside a property each like "default", "myCoolTheme", etc...
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        themes: {},
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBRXRELE1BQU0sVUFBVSxVQUFVLENBQUMsR0FBRyxFQUFFLGNBQWMsRUFBRSxTQUFTO0lBQ3JELGdDQUFnQztJQUNoQyxNQUFNLGlCQUFpQixHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDN0MsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFOUMsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLGNBQWMsQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztJQUM1RCxJQUFJLFNBQVMsQ0FBQyxPQUFPO1FBQUUsY0FBYyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO0lBRWxFLDREQUE0RDtJQUM1RCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3hDLE1BQU0sU0FBUyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN0QyxJQUFJLFNBQVMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLFFBQVEsRUFBRTtZQUMzQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDcEQsTUFBTSxPQUFPLEdBQUcsR0FBRyxTQUFTLENBQUMsU0FBUyxJQUFJLFdBQVcsRUFBRSxDQUFDO2dCQUN4RCxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDakMsY0FBYyxDQUFDLE1BQU0sQ0FDakIsT0FBTyxDQUNWLEdBQUcsV0FBVyxRQUFRLGFBQWEsV0FBVyxHQUFHLENBQUM7aUJBQ3REO1lBQ0wsQ0FB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