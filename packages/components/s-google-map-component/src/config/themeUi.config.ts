export default function (api) {
    if (api.env.platform !== 'node') return;

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
