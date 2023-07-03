"use strict";
/**
 * @name                    themeDefaultLight
 * @as                      Default light theme
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme default light available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    return api.extends(api.config.themeBase, {
        metas: {
            title: 'Default light',
            description: 'Nice and elegant light theme',
        },
        /**
         * @name            colorSchema
         * @namespace        config.themeDefaultDark
         * @type            String
         * @default         config.themeColorSchemaLight
         *
         * Specify the color schema to be used in the dark theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get colorSchema() {
            return api.config.themeColorSchemaLight;
        },
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1FBQ3JDLEtBQUssRUFBRTtZQUNILEtBQUssRUFBRSxlQUFlO1lBQ3RCLFdBQVcsRUFBRSw4QkFBOEI7U0FDOUM7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxXQUFXO1lBQ1gsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDO1FBQzVDLENBQUM7S0FDSixDQUFDLENBQUM7QUFDUCxDQUFDO0FBdEJELDRCQXNCQyJ9