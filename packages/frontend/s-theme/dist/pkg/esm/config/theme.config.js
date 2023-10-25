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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUV6RDs7Ozs7Ozs7Ozs7O0dBWUc7QUFFSCxNQUFNLFVBQVUsVUFBVSxDQUFDLEdBQUc7SUFDMUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNuQixnQ0FBZ0M7SUFDaEMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQzdDLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRTlDLElBQUksU0FBUyxDQUFDLEtBQUs7UUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQ3RELElBQUksU0FBUyxDQUFDLE9BQU87UUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO0lBRTVELDREQUE0RDtJQUM1RCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUN6QyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksU0FBUyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7WUFDOUQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ3BELE1BQU0sT0FBTyxHQUFHLEdBQUcsU0FBUyxDQUFDLFNBQVMsSUFBSSxXQUFXLEVBQUUsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUMzQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7d0JBQ3BCLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNsRDtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztBQUNwQixDQUFDO0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxHQUFHO0lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDcEIsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ2pELElBQUksS0FBSyxDQUFDLFNBQVMsSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFO1lBQ2hDLEtBQUssSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQy9ELElBQUksU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFO29CQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTt3QkFDakIsUUFBUSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7cUJBQ3ZCO29CQUNELFFBQVEsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUM3RDthQUNKO1NBQ0o7S0FDSjtJQUNELE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztBQUNwQixDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxHQUFHO0lBQ3hCLE9BQU87UUFDSDs7Ozs7Ozs7O1dBU0c7UUFDSCxLQUFLLEVBQUUsU0FBUztRQUVoQjs7Ozs7Ozs7O1dBU0c7UUFDSCxPQUFPLEVBQUUsT0FBTztRQUVoQjs7Ozs7Ozs7OztXQVVHO1FBQ0gsTUFBTSxFQUFFLEVBQUU7S0FDYixDQUFDO0FBQ04sQ0FBQyJ9