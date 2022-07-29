export default function ({ env, config, theme }) {
    return {
        codeExample: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.codeExample
             * @type          String
             * @default      [theme.padding.50]
             *
             * Specify the default padding inline for code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get paddingInline() {
                return theme.padding['50'];
            },

            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.codeExample
             * @type          String
             * @default      [theme.padding.50]
             *
             * Specify the default padding block for code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get paddingBlock() {
                return theme.padding['50'];
            },

            /**
             * @name          borderRadius
             * @namespace     config.themeUi.codeExample
             * @type          String
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the default border radius for code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get borderRadius() {
                return theme.ui.default.borderRadius;
            },

            /**
             * @name          borderWidth
             * @namespace     config.themeUi.codeExample
             * @type          String
             * @default      [theme.ui.default.borderWidth]
             *
             * Specify the default border width for code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get borderWidth() {
                return theme.ui.default.borderWidth;
            },

            /**
             * @name          transition
             * @namespace     config.themeUi.codeExample
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get transition() {
                return theme.ui.default.transition;
            },

            /**
             * @name          defaultColor
             * @namespace     config.themeUi.codeExample
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default color for code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return theme.ui.default.defaultColor;
            },

            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.codeExample
             * @type          Number
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultStyle() {
                return theme.ui.default.defaultStyle;
            },

            /**
             * @name          depth
             * @namespace     config.themeUi.codeExample
             * @type          String
             * @default      [theme.ui.default.depth]
             *
             * Specify the default depth for code items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get depth() {
                return theme.ui.default.depth;
            },

            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.codeExample
             * @type          Object
             * @default      [theme.ui.default.rhythmVertical]
             *
             * Specify the default vertical rhythm for your code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get rhythmVertical() {
                return theme.ui.default.rhythmVertical;
            },
        },
    };
}
