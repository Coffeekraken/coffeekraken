"use strict";
/**
 * @name                    themeCoffeekraken
 * @as                      Coffeekraken theme
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme coffeekraken available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
    return {
        /**
         * @name          themeName
         * @namespace     config.themeCoffeekraken
         * @type          Number
         * @default      coffeekraken
         *
         * Specify the default theme name
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        themeName: 'coffeekraken',
        metas: {
        /**
         * @name            title
         * @namespace       config.themeCoffeekraken.metas
         * @type            String
         *
         * Specify the theme title
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        /**
         * @name            description
         * @namespace       config.themeCoffeekraken.metas
         * @type            String
         *
         * Specify the theme description
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        },
        variants: {
            /**
             * @name          light
             * @namespace     config.themeCoffeekraken.variants
             * @type          Object
             * @default      config.themeCoffeekrakenLight
             *
             * Specify the default theme light variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get light() {
                return api.config.themeCoffeekrakenLight;
            },
            /**
             * @name          dark
             * @namespace     config.themeCoffeekraken.variants
             * @type          Object
             * @default      config.themeCoffeekrakenDark
             *
             * Specify the default theme dark variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get dark() {
                return api.config.themeCoffeekrakenDark;
            },
        },
    };
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7Ozs7Ozs7O0dBWUc7O0FBRUgsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxTQUFTLEVBQUUsY0FBYztRQUV6QixLQUFLLEVBQUU7UUFDSDs7Ozs7Ozs7O1dBU0c7UUFDSDs7Ozs7Ozs7O1dBU0c7U0FDTjtRQUVELFFBQVEsRUFBRTtZQUNOOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEtBQUs7Z0JBQ0wsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLHNCQUFzQixDQUFDO1lBQzdDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxJQUFJO2dCQUNKLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztZQUM1QyxDQUFDO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQztBQXRFRCw0QkFzRUMifQ==