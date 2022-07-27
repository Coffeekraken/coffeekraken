export default (env, config) => {
    return {
        colorPicker: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.colorPicker
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
             * @namespace     config.themeUi.colorPicker
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
             * @namespace     config.themeUi.colorPicker
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
             * @name          transition
             * @namespace     config.themeUi.colorPicker
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
             * @namespace     config.themeUi.colorPicker
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
             * @namespace     config.themeUi.colorPicker
             * @type          Number
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your filtrable input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.default.defaultStyle]',
            /**
             * @name          depth
             * @namespace     config.themeUi.colorPicker
             * @type          String
             * @default      100
             *
             * Specify the default depth for input items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: 100,
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.colorPicker
             * @type          Object
             * @default      [theme.ui.default.rhythmVertical]
             *
             * Specify the default vertical rhythm for your color picker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.default.rhythmVertical]',
        },
    };
};
