export default function (api) {
    if (api.env.platform !== 'node') return;

    return {
        themeSwitcher: {
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.themeSwitcher
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default color for theme switcher
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.default.defaultColor;
            },

            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.themeSwitcher
             * @type          Number
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your theme switcher
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultStyle() {
                return api.theme.ui.default.defaultStyle;
            },

            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.themeSwitcher
             * @type          Object
             * @default      [theme.ui.default.rhythmVertical]
             *
             * Specify the default vertical rhythm for your theme switcher
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
