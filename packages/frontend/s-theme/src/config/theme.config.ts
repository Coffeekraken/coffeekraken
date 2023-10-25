import __SSugarJson from '@coffeekraken/s-sugar-json';
import { __deepMerge } from '@coffeekraken/sugar/object';

/**
 * @name                    theme
 * @as                      Theme
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export function preprocess(api) {
    console.log('PRE');
    // setting theme from sugar.json
    const sugarJsonInstance = new __SSugarJson();
    const sugarJson = sugarJsonInstance.current();

    if (sugarJson.theme) api.this.theme = sugarJson.theme;
    if (sugarJson.variant) api.this.variant = sugarJson.variant;

    // inject each available themes inside the "themes" property
    Object.keys(api.config).forEach((configId) => {
        const configObj = api.config[configId];
        if (configObj.themeName && configObj.variants && configObj.metas) {
            Object.keys(configObj.variants).forEach((variantName) => {
                const themeId = `${configObj.themeName}-${variantName}`;
                if (!api.this.themes[themeId]) {
                    api.this.themes[themeId] =
                        api.config[configId].variants[variantName];
                }
            });
        }
    });

    return api.this;
}

export function postprocess(api) {
    console.log('POST');
    for (let [key, value] of Object.entries(api.config)) {
        if (value.themeName && value.metas) {
            for (let [themeName, themeObj] of Object.entries(api.this.themes)) {
                if (themeName.startsWith(`${value.themeName}-`)) {
                    if (!themeObj.metas) {
                        themeObj.metas = {};
                    }
                    themeObj.metas = __deepMerge(themeObj.metas, value.metas);
                }
            }
        }
    }
    return api.this;
}

export default function (api) {
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
