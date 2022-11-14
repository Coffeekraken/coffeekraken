export default function (api) {
    if (api.env.platform !== 'node')
        return;
    return {
        googleMap: {
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.googleMap
             * @type          String
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the default borderRadius for google map
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get borderRadius() {
                return api.theme.ui.default.borderRadius;
            },
            /**
             * @name          transition
             * @namespace     config.themeUi.googleMap
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for google map
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get transition() {
                return api.theme.ui.default.transition;
            },
            /**
             * @name          depth
             * @namespace     config.themeUi.googleMap
             * @type          String
             * @default      [theme.ui.default.depth]
             *
             * Specify the default depth for google map
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get depth() {
                return api.theme.ui.default.depth;
            },
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.googleMap
             * @type          Object
             * @default      [theme.ui.default.rhythmVertical]
             *
             * Specify the default vertical rhythm for your google map
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get rhythmVertical() {
                return api.theme.ui.default.rhythmVertical;
            },
        },
        googleMapMarker: {
            /**
             * @name          transition
             * @namespace     config.themeUi.googleMapMarker
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for google map marker
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get transition() {
                return api.theme.ui.default.transition;
            },
        },
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxTQUFTLEVBQUU7WUFDUDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxZQUFZO2dCQUNaLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQztZQUM3QyxDQUFDO1lBRUQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksVUFBVTtnQkFDVixPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFDM0MsQ0FBQztZQUVEOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLEtBQUs7Z0JBQ0wsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1lBQ3RDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxjQUFjO2dCQUNkLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQztZQUMvQyxDQUFDO1NBQ0o7UUFDRCxlQUFlLEVBQUU7WUFDYjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxVQUFVO2dCQUNWLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQztZQUMzQyxDQUFDO1NBQ0o7S0FDSixDQUFDO0FBQ04sQ0FBQyJ9