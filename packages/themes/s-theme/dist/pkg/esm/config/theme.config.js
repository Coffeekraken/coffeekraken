import __SSugarJson from '@coffeekraken/s-sugar-json';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
export function preprocess(api) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDRCQUE0QixDQUFDO0FBQ3RELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBRXRFLE1BQU0sVUFBVSxVQUFVLENBQUMsR0FBRztJQUMxQixnQ0FBZ0M7SUFDaEMsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFBRSxDQUFDO0lBQzdDLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFDO0lBRTlDLElBQUksU0FBUyxDQUFDLEtBQUs7UUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDO0lBQ3RELElBQUksU0FBUyxDQUFDLE9BQU87UUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDO0lBRTVELDREQUE0RDtJQUM1RCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtRQUN6QyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLElBQUksU0FBUyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQyxLQUFLLEVBQUU7WUFDOUQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ3BELE1BQU0sT0FBTyxHQUFHLEdBQUcsU0FBUyxDQUFDLFNBQVMsSUFBSSxXQUFXLEVBQUUsQ0FBQztnQkFDeEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUMzQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7d0JBQ3BCLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNsRDtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQztBQUNwQixDQUFDO0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FBQyxHQUFHO0lBQzNCLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNqRCxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLEtBQUssRUFBRTtZQUNoQyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUMvRCxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsRUFBRTtvQkFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7d0JBQ2pCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO3FCQUN2QjtvQkFDRCxRQUFRLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDN0Q7YUFDSjtTQUNKO0tBQ0o7SUFDRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDcEIsQ0FBQztBQUVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0g7Ozs7Ozs7OztXQVNHO1FBQ0gsS0FBSyxFQUFFLFNBQVM7UUFFaEI7Ozs7Ozs7OztXQVNHO1FBQ0gsT0FBTyxFQUFFLE9BQU87UUFFaEI7Ozs7Ozs7Ozs7Ozs7OztXQWVHO1FBQ0gsWUFBWSxFQUFFLENBQUMsR0FBRyxDQUFDO1FBRW5COzs7Ozs7Ozs7O1dBVUc7UUFDSCxNQUFNLEVBQUUsRUFBRTtLQUNiLENBQUM7QUFDTixDQUFDIn0=