import __SSugarJson from '@coffeekraken/s-sugar-json';

export function preprocess(env, rawThemeConfig, rawConfig) {
    // setting theme from sugar.json
    const sugarJsonInstance = new __SSugarJson();
    const sugarJson = sugarJsonInstance.current();

    if (sugarJson.theme) rawThemeConfig.theme = sugarJson.theme;
    if (sugarJson.variant) rawThemeConfig.variant = sugarJson.variant;

    // inject each available themes inside the "themes" property
    Object.keys(rawConfig).forEach((configId) => {
        const configObj = rawConfig[configId];
        if (configObj.themeName && configObj.variants) {
            Object.keys(configObj.variants).forEach((variantName) => {
                const themeId = `${configObj.themeName}-${variantName}`;
                if (!rawThemeConfig.themes[themeId]) {
                    rawThemeConfig.themes[
                        themeId
                    ] = `[config.${configId}.variants.${variantName}]`;
                }
            });
        }
    });
    return rawThemeConfig;
}

// export function postprocess(env, themeConfig, config) {
//     const themes = themeConfig.themes;

//     Object.keys(themes).forEach((themeName) => {
//         const themeObj = themes[themeName];

//         // if (!themeObj.color.current) {
//         //     if (themeObj.defaultColor) {
//         //         themeObj.color.current = Object.assign(
//         //             {},
//         //             themeObj.color[themeObj.defaultColor],
//         //         );
//         //     } else {
//         //         const firstColor =
//         //             themeObj.color[Object.keys(themeObj.color)[0]];
//         //         themeObj.color.current = Object.assign({}, firstColor);
//         //     }
//         // }
//         // if (!themeObj.color.accent) {
//         //     if (themeObj.defaultColor) {
//         //         themeObj.color.accent = Object.assign(
//         //             {},
//         //             themeObj.color[themeObj.defaultColor],
//         //         );
//         //     } else {
//         //         const firstColor =
//         //             themeObj.color[Object.keys(themeObj.color)[0]];
//         //         themeObj.color.accent = Object.assign({}, firstColor);
//         //     }
//         // }
//         // if (!themeObj.color.complementary) {
//         //     if (themeObj.defaultColor) {
//         //         themeObj.color.complementary = Object.assign(
//         //             {},
//         //             themeObj.color[themeObj.defaultColor],
//         //         );
//         //     } else {
//         //         const firstColor =
//         //             themeObj.color[Object.keys(themeObj.color)[0]];
//         //         themeObj.color.complementary = Object.assign({}, firstColor);
//         //     }
//         // }
//     });
//     return themeConfig;
// }

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
