export default function (api) {
    return {
        slider: {
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.button
             * @type          String
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the default border radius for button ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get borderRadius() {
                return api.theme.ui.default.borderRadius;
            },

            /**
             * @name          defaultColor
             * @namespace     config.themeUi.slider
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default color for datetime picker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.default.defaultColor;
            },

            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.slider
             * @type          Number
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your filtrable input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultStyle() {
                return api.theme.ui.default.defaultStyle;
            },

            /**
             * @name          transition
             * @namespace     config.themeUi.button
             * @type          String
             * @default      all .5s ease-in-out
             *
             * Specify the default transition for button ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: 'all .5s ease-in-out',
            /**
             * @name          depth
             * @namespace     config.themeUi.button
             * @type          Number
             * @default      [theme.ui.default.depth]
             *
             * Specify the default depth for your button ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get depth() {
                return api.theme.ui.default.depth;
            },

            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.slider
             * @type          Object
             * @default      [theme.ui.default.rhythmVertical]
             *
             * Specify the default vertical rhythm for your datetime picker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get rhythmVertical() {
                return api.theme.ui.default.rhythmVertical;
            },
        },
    };
}
