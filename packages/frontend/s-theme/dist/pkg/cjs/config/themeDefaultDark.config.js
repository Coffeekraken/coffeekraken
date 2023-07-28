"use strict";
/**
 * @name                    themeDefaultDark
 * @as                      Default dark theme
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme default dark available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    return api.extends(api.config.themeBase, {
        metas: {
            title: 'Default dark',
            description: 'Nice and elegant dark theme',
        },
        /**
         * @name            shades
         * @namespace        config.themeDefaultDark
         * @type            String
         * @default         config.themeShadesDark
         *
         * Specify the color shades to be used in the dark theme
         *
         * @since           2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        get shades() {
            return api.config.themeShadesDark;
        },
    });
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFO1FBQ3JDLEtBQUssRUFBRTtZQUNILEtBQUssRUFBRSxjQUFjO1lBQ3JCLFdBQVcsRUFBRSw2QkFBNkI7U0FDN0M7UUFFRDs7Ozs7Ozs7OztXQVVHO1FBQ0gsSUFBSSxNQUFNO1lBQ04sT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQztRQUN0QyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQXRCRCw0QkFzQkMifQ==