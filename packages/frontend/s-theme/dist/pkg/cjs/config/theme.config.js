"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postprocess = exports.preprocess = void 0;
const s_sugar_json_1 = __importDefault(require("@coffeekraken/s-sugar-json"));
const object_1 = require("@coffeekraken/sugar/object");
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
function preprocess(api) {
    console.log('PRE');
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
    console.log('POST');
    for (let [key, value] of Object.entries(api.config)) {
        if (value.themeName && value.metas) {
            for (let [themeName, themeObj] of Object.entries(api.this.themes)) {
                if (themeName.startsWith(`${value.themeName}-`)) {
                    if (!themeObj.metas) {
                        themeObj.metas = {};
                    }
                    themeObj.metas = (0, object_1.__deepMerge)(themeObj.metas, value.metas);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDhFQUFzRDtBQUN0RCx1REFBeUQ7QUFFekQ7Ozs7Ozs7Ozs7OztHQVlHO0FBRUgsU0FBZ0IsVUFBVSxDQUFDLEdBQUc7SUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQixnQ0FBZ0M7SUFDaEMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLHNCQUFZLEVBQUUsQ0FBQztJQUM3QyxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUU5QyxJQUFJLFNBQVMsQ0FBQyxLQUFLO1FBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQztJQUN0RCxJQUFJLFNBQVMsQ0FBQyxPQUFPO1FBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQU8sQ0FBQztJQUU1RCw0REFBNEQ7SUFDNUQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7UUFDekMsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUN2QyxJQUFJLFNBQVMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUMsS0FBSyxFQUFFO1lBQzlELE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUNwRCxNQUFNLE9BQU8sR0FBRyxHQUFHLFNBQVMsQ0FBQyxTQUFTLElBQUksV0FBVyxFQUFFLENBQUM7Z0JBQ3hELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDM0IsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDO3dCQUNwQixHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDbEQ7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDcEIsQ0FBQztBQXhCRCxnQ0F3QkM7QUFFRCxTQUFnQixXQUFXLENBQUMsR0FBRztJQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3BCLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNqRCxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNoQyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMvRCxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRTtvQkFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7d0JBQ2pCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO3FCQUN2QjtvQkFDRCxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUEsb0JBQVcsRUFBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDN0Q7YUFDSjtTQUNKO0tBQ0o7SUFDRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDcEIsQ0FBQztBQWZELGtDQWVDO0FBRUQsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTztRQUNIOzs7Ozs7Ozs7V0FTRztRQUNILEtBQUssRUFBRSxTQUFTO1FBRWhCOzs7Ozs7Ozs7V0FTRztRQUNILE9BQU8sRUFBRSxPQUFPO1FBRWhCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUUsRUFBRTtLQUNiLENBQUM7QUFDTixDQUFDO0FBdkNELDRCQXVDQyJ9