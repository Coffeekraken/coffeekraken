var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-sugar-json"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.postprocess = exports.preprocess = void 0;
    const s_sugar_json_1 = __importDefault(require("@coffeekraken/s-sugar-json"));
    function preprocess(env, rawThemeConfig, rawConfig) {
        // setting theme from sugar.json
        const sugarJsonInstance = new s_sugar_json_1.default();
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
    exports.preprocess = preprocess;
    function postprocess(env, themeConfig, config) {
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
    exports.postprocess = postprocess;
    function default_1(env, config) {
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
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWUuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztJQVFBLDhFQUFzRDtJQUV0RCxTQUFnQixVQUFVLENBQUMsR0FBRyxFQUFFLGNBQWMsRUFBRSxTQUFTO1FBQ3JELGdDQUFnQztRQUNoQyxNQUFNLGlCQUFpQixHQUFHLElBQUksc0JBQVksRUFBRSxDQUFDO1FBQzdDLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO1FBRTlDLElBQUksU0FBUyxDQUFDLEtBQUs7WUFBRSxjQUFjLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFDNUQsSUFBSSxTQUFTLENBQUMsT0FBTztZQUFFLGNBQWMsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztRQUVsRSw0REFBNEQ7UUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUN4QyxNQUFNLFNBQVMsR0FBRyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDdEMsSUFBSSxTQUFTLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUU7Z0JBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO29CQUNwRCxNQUFNLE9BQU8sR0FBRyxHQUFHLFNBQVMsQ0FBQyxTQUFTLElBQUksV0FBVyxFQUFFLENBQUM7b0JBQ3hELElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUNqQyxjQUFjLENBQUMsTUFBTSxDQUNqQixPQUFPLENBQ1YsR0FBRyxXQUFXLFFBQVEsYUFBYSxXQUFXLEdBQUcsQ0FBQztxQkFDdEQ7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxjQUFjLENBQUM7SUFDMUIsQ0FBQztJQXZCRCxnQ0F1QkM7SUFFRCxTQUFnQixXQUFXLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRSxNQUFNO1FBQ2hELE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7UUFFbEMsd0NBQXdDO1FBRXhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDdEMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDekIsSUFBSSxRQUFRLENBQUMsWUFBWSxFQUFFO29CQUN2QixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNsQyxFQUFFLEVBQ0YsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQ3hDLENBQUM7aUJBQ0w7cUJBQU07b0JBQ0gsTUFBTSxVQUFVLEdBQ1osUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuRCxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDMUQ7YUFDSjtZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDekIsSUFBSSxRQUFRLENBQUMsWUFBWSxFQUFFO29CQUN2QixRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNsQyxFQUFFLEVBQ0YsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQ3hDLENBQUM7aUJBQ0w7cUJBQU07b0JBQ0gsTUFBTSxVQUFVLEdBQ1osUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuRCxRQUFRLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDMUQ7YUFDSjtZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDM0IsSUFBSSxRQUFRLENBQUMsWUFBWSxFQUFFO29CQUN2QixRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUNwQyxFQUFFLEVBQ0YsUUFBUSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQ3hDLENBQUM7aUJBQ0w7cUJBQU07b0JBQ0gsTUFBTSxVQUFVLEdBQ1osUUFBUSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNuRCxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxVQUFVLENBQUMsQ0FBQztpQkFDNUQ7YUFDSjtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQTdDRCxrQ0E2Q0M7SUFFRCxtQkFBeUIsR0FBRyxFQUFFLE1BQU07UUFDaEMsT0FBTztZQUNIOzs7Ozs7Ozs7ZUFTRztZQUNILEtBQUssRUFBRSxTQUFTO1lBRWhCOzs7Ozs7Ozs7ZUFTRztZQUNILE9BQU8sRUFBRSxPQUFPO1lBRWhCOzs7Ozs7Ozs7Ozs7Ozs7ZUFlRztZQUNILFlBQVksRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUVuQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsTUFBTSxFQUFFLEVBQUU7U0FDYixDQUFDO0lBQ04sQ0FBQztJQXpERCw0QkF5REMifQ==