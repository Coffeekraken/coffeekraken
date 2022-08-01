export default function (api) {
    return {
        panel: {
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.panel
             * @type          String
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the default border radius for panel ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get borderRadius() {
                return api.theme.ui.default.borderRadius;
            },

            /**
             * @name          transition
             * @namespace     config.themeUi.panel
             * @type          String
             * @default      [theme.transition.default]
             *
             * Specify the default transition for panel ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get transition() {
                return api.theme.transition.default;
            },

            /**
             * @name          depth
             * @namespace     config.themeUi.panel
             * @type          Number
             * @default      5
             *
             * Specify the default depth for your panel ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: 5,
        },
    };
}
