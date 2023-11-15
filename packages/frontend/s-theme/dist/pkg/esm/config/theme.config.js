import __SSugarJson from '@coffeekraken/s-sugar-json';
import { __deepMerge } from '@coffeekraken/sugar/object';
/**
 * @name                    theme
 * @as                      Theme
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  stable
 *
 * Specify the @coffeekraken/s-theme available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export function preprocess(api) {
    // setting theme from sugar.json
    const sugarJsonInstance = new __SSugarJson();
    const sugarJson = sugarJsonInstance.current();
    // theme from sugar.json
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
                api.this.themes[themeId] = __deepMerge(api.this.themes[themeId] || {}, api.config[configId].variants[variantName]);
            });
        }
    });
    return api.this;
}
export function postprocess(api) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxNQUFNLFVBQVUsVUFBVSxDQUFDLEdBQUc7SUFDMUIsZ0NBQWdDO0lBQ2hDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQUM3QyxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUU5Qyx3QkFBd0I7SUFDeEIsSUFBSSxTQUFTLENBQUMsS0FBSztRQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7SUFDdEQsSUFBSSxTQUFTLENBQUMsT0FBTztRQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxPQUFPLENBQUM7SUFFNUQsNERBQTREO0lBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1FBQ3pDLE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkMsSUFBSSxTQUFTLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQyxRQUFRLElBQUksU0FBUyxDQUFDLEtBQUssRUFBRTtZQUM5RCxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDcEQsTUFBTSxPQUFPLEdBQUcsR0FBRyxTQUFTLENBQUMsU0FBUyxJQUFJLFdBQVcsRUFBRSxDQUFDO2dCQUN4RCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxXQUFXLENBQ2xDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFDOUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQzdDLENBQUM7WUFDTixDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDcEIsQ0FBQztBQUVELE1BQU0sVUFBVSxXQUFXLENBQUMsR0FBRztJQUMzQixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDakQsSUFBSSxLQUFLLENBQUMsU0FBUyxJQUFJLEtBQUssQ0FBQyxLQUFLLEVBQUU7WUFDaEMsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDL0QsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUU7b0JBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO3dCQUNqQixRQUFRLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztxQkFDdkI7b0JBQ0QsUUFBUSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzdEO2FBQ0o7U0FDSjtLQUNKO0lBQ0QsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxXQUFXLEdBQUc7SUFDeEIsT0FBTztRQUNIOzs7Ozs7Ozs7V0FTRztRQUNILEtBQUssRUFBRSxTQUFTO1FBRWhCOzs7Ozs7Ozs7V0FTRztRQUNILE9BQU8sRUFBRSxPQUFPO1FBRWhCOzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUUsRUFBRTtLQUNiLENBQUM7QUFDTixDQUFDIn0=