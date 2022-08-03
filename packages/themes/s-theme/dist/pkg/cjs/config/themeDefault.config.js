"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(api) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsbUJBQXlCLEdBQUc7SUFDeEIsT0FBTztRQUNIOzs7Ozs7Ozs7O1dBVUc7UUFDSCxTQUFTLEVBQUUsU0FBUztRQUVwQixLQUFLLEVBQUU7WUFDSDs7Ozs7Ozs7O2VBU0c7WUFDSCxLQUFLLEVBQUUsd0JBQXdCO1lBRS9COzs7Ozs7Ozs7ZUFTRztZQUNILFdBQVcsRUFDUCw2RUFBNkU7U0FDcEY7UUFFRCxRQUFRLEVBQUU7WUFDTjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxLQUFLO2dCQUNMLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztZQUN4QyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksSUFBSTtnQkFDSixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7WUFDdkMsQ0FBQztTQUNKO0tBQ0osQ0FBQztBQUNOLENBQUM7QUExRUQsNEJBMEVDIn0=