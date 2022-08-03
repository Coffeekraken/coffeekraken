"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postprocess = exports.preprocess = void 0;
const s_sugar_json_1 = __importDefault(require("@coffeekraken/s-sugar-json"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
function preprocess(api) {
    // setting theme from sugar.json
    const sugarJsonInstance = new s_sugar_json_1.default();
    const sugarJson = sugarJsonInstance.current();
    if (sugarJson.theme)
        api.this.theme = sugarJson.theme;
    if (sugarJson.variant)
        api.this.variant = sugarJson.variant;
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
exports.preprocess = preprocess;
function postprocess(api) {
    for (let [key, value] of Object.entries(api.config)) {
        if (value.themeName && value.metas) {
            for (let [themeName, themeObj] of Object.entries(api.this.themes)) {
                if (themeName.startsWith(`${value.themeName}-`)) {
                    if (!themeObj.metas) {
                        themeObj.metas = {};
                    }
                    themeObj.metas = (0, deepMerge_1.default)(themeObj.metas, value.metas);
                }
            }
        }
    }
    return api.this;
}
exports.postprocess = postprocess;
function default_1(api) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhFQUFzRDtBQUN0RCw0RkFBc0U7QUFFdEUsU0FBZ0IsVUFBVSxDQUFDLEdBQUc7SUFDMUIsZ0NBQWdDO0lBQ2hDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxzQkFBWSxFQUFFLENBQUM7SUFDN0MsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxFQUFFLENBQUM7SUFFOUMsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFDdEQsSUFBSSxTQUFTLENBQUMsT0FBTztRQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7SUFFNUQsNERBQTREO0lBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3pDLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsSUFBSSxTQUFTLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRTtZQUM5RCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDcEQsTUFBTSxPQUFPLEdBQUcsR0FBRyxTQUFTLENBQUMsU0FBUyxJQUFJLFdBQVcsRUFBRSxDQUFDO2dCQUN4RCxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQzNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQzt3QkFDcEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQ2xEO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDTjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ3BCLENBQUM7QUF0QkQsZ0NBc0JDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLEdBQUc7SUFDM0IsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2pELElBQUksS0FBSyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ2hDLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQy9ELElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFO29CQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTt3QkFDakIsUUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7cUJBQ3ZCO29CQUNELFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBQSxtQkFBVyxFQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM3RDthQUNKO1NBQ0o7S0FDSjtJQUNELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztBQUNwQixDQUFDO0FBZEQsa0NBY0M7QUFFRCxtQkFBeUIsR0FBRztJQUN4QixPQUFPO1FBQ0g7Ozs7Ozs7OztXQVNHO1FBQ0gsS0FBSyxFQUFFLFNBQVM7UUFFaEI7Ozs7Ozs7OztXQVNHO1FBQ0gsT0FBTyxFQUFFLE9BQU87UUFFaEI7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0gsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBRW5COzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUUsRUFBRTtLQUNiLENBQUM7QUFDTixDQUFDO0FBekRELDRCQXlEQyJ9