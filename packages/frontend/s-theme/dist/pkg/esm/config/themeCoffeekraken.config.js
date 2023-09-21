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
export default function (api) {
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
            // /**
            //  * @name          light
            //  * @namespace     config.themeCoffeekraken.variants
            //  * @type          Object
            //  * @default      config.themeCoffeekrakenLight
            //  *
            //  * Specify the default theme light variant
            //  *
            //  * @since       2.0.0
            //  * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
            //  */
            // get light() {
            //     return api.config.themeCoffeekrakenLight;
            // },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7R0FZRztBQUVILE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILFNBQVMsRUFBRSxjQUFjO1FBRXpCLEtBQUssRUFBRTtRQUNIOzs7Ozs7Ozs7V0FTRztRQUNIOzs7Ozs7Ozs7V0FTRztTQUNOO1FBRUQsUUFBUSxFQUFFO1lBQ04sTUFBTTtZQUNOLDBCQUEwQjtZQUMxQixzREFBc0Q7WUFDdEQsMkJBQTJCO1lBQzNCLGlEQUFpRDtZQUNqRCxLQUFLO1lBQ0wsNkNBQTZDO1lBQzdDLEtBQUs7WUFDTCx3QkFBd0I7WUFDeEIsa0dBQWtHO1lBQ2xHLE1BQU07WUFDTixnQkFBZ0I7WUFDaEIsZ0RBQWdEO1lBQ2hELEtBQUs7WUFFTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxJQUFJO2dCQUNKLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQztZQUM1QyxDQUFDO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9