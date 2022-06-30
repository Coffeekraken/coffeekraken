export default (env, config) => {
    return {
        datetimePicker: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.datetimePicker
             * @type          String
             * @default      [theme.ui.default.paddingInline]
             *
             * Specify the default padding inline for filtrable input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.default.paddingInline]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.datetimePicker
             * @type          String
             * @default      [theme.ui.default.paddingBlock]
             *
             * Specify the default padding block for filtrable input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.default.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.datetimePicker
             * @type          String
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the default border radius for filtrable input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.default.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.datetimePicker
             * @type          String
             * @default      [theme.ui.default.borderWidth]
             *
             * Specify the default border width for filtrable input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.default.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.datetimePicker
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for filtrable input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.default.transition]',
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.datetimePicker
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default color for filtrable input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultColor: '[theme.ui.default.defaultColor]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.datetimePicker
             * @type          Number
             * @default      solid
             *
             * Specify the default style for your filtrable input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: 'solid',
            /**
             * @name          depth
             * @namespace     config.themeUi.datetimePicker
             * @type          String
             * @default      100
             *
             * Specify the default depth for input items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: 100,
        },
    };
};
