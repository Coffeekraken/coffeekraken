export default function (api) {
    return {
        /**
         * @name          themeName
         * @namespace     config.themeDefault
         * @type          Number
         * @default      default
         *
         * Specify the default theme name
         *
         * @since       2.0.0
         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        themeName: 'default',
        metas: {
            /**
             * @name            title
             * @namespace       config.themeDefault.metas
             * @type            String
             *
             * Specify the theme title
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            title: 'Coffeekraken (default)',
            /**
             * @name            description
             * @namespace       config.themeDefault.metas
             * @type            String
             *
             * Specify the theme description
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            description: 'Default Coffeekraken theme that you can use as a base for your custom theme',
        },
        variants: {
            /**
             * @name          light
             * @namespace     config.themeDefault.variants
             * @type          Object
             * @default      [config.themeDefaultLight]
             *
             * Specify the default theme light variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get light() {
                return api.config.themeDefaultLight;
            },
            /**
             * @name          dark
             * @namespace     config.themeDefault.variants
             * @type          Object
             * @default      [config.themeDefaultDark]
             *
             * Specify the default theme dark variant
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get dark() {
                return api.config.themeDefaultDark;
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixPQUFPO1FBQ0g7Ozs7Ozs7Ozs7V0FVRztRQUNILFNBQVMsRUFBRSxTQUFTO1FBRXBCLEtBQUssRUFBRTtZQUNIOzs7Ozs7Ozs7ZUFTRztZQUNILEtBQUssRUFBRSx3QkFBd0I7WUFFL0I7Ozs7Ozs7OztlQVNHO1lBQ0gsV0FBVyxFQUNQLDZFQUE2RTtTQUNwRjtRQUVELFFBQVEsRUFBRTtZQUNOOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEtBQUs7Z0JBQ0wsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO1lBQ3hDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxJQUFJO2dCQUNKLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztZQUN2QyxDQUFDO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9