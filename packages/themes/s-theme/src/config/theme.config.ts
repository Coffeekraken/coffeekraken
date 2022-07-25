import __SSugarJson from '@coffeekraken/s-sugar-json';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';

export function preprocess(env, rawThemeConfig, rawConfig) {
    // setting theme from sugar.json
    const sugarJsonInstance = new __SSugarJson();
    const sugarJson = sugarJsonInstance.current();

    if (sugarJson.theme) rawThemeConfig.theme = sugarJson.theme;
    if (sugarJson.variant) rawThemeConfig.variant = sugarJson.variant;

    // inject each available themes inside the "themes" property
    Object.keys(rawConfig).forEach((configId) => {
        const configObj = rawConfig[configId];
        if (configObj.themeName && configObj.variants && configObj.metas) {
            Object.keys(configObj.variants).forEach((variantName) => {
                const themeId = `${configObj.themeName}-${variantName}`;
                if (!rawThemeConfig.themes[themeId]) {
                    rawThemeConfig.themes[
                        themeId
                    ] = `[config.${configId}.variants.${variantName}]`;
                }
                // if (!rawThemeConfig.themes[themeId].metas && configObj.metas) {
                //     rawThemeConfig.themes[
                //         themeId
                //     ].metas = `[config.${configId}.metas]`;
                // }
            });
        }
    });
    return rawThemeConfig;
}

export function postprocess(env, themeConfig, config) {
    for (let [key, value] of Object.entries(config)) {
        if (value.themeName && value.metas) {
            for (let [themeName, themeObj] of Object.entries(
                themeConfig.themes,
            )) {
                if (themeName.startsWith(`${value.themeName}-`)) {
                    if (!themeObj.metas) {
                        themeObj.metas = {};
                    }
                    themeObj.metas = __deepMerge(themeObj.metas, value.metas);
                }
            }
        }
    }
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
