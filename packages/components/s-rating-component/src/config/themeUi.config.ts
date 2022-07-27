export default function (env, config) {
    return {
        rating: {
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.rating
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default color for rating ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultColor: '[theme.ui.default.defaultColor]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.rating
             * @type          Number
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your rating ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.default.defaultStyle]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.datetimePicker
             * @type          Object
             * @default      [theme.ui.default.rhythmVertical]
             *
             * Specify the default vertical rhythm for your datetime picker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.default.rhythmVertical]',
        },
    };
}
