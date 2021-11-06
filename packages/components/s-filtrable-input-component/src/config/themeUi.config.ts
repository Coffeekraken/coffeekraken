export default (env, config) => {
    return {
        filtrableInput: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.filtrableInput
             * @type          String
             * @default      [theme.ui.default.paddingInline]
             *
             * Specify the default padding inline for filtrable input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            paddingInline: '[theme.ui.default.paddingInline]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.filtrableInput
             * @type          String
             * @default      [theme.ui.default.paddingBlock]
             *
             * Specify the default padding block for filtrable input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            paddingBlock: '[theme.ui.default.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.filtrableInput
             * @type          String
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the default border radius for filtrable input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            borderRadius: '[theme.ui.default.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.filtrableInput
             * @type          String
             * @default      [theme.ui.default.borderWidth]
             *
             * Specify the default border width for filtrable input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            borderWidth: '[theme.ui.default.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.filtrableInput
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for filtrable input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            transition: '[theme.ui.default.transition]',
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.filtrableInput
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default color for filtrable input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            defaultColor: '[theme.ui.default.defaultColor]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.filtrableInput
             * @type          Number
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your filtrable input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            defaultStyle: 'solid',
            /**
             * @name          depth
             * @namespace     config.themeUi.filtrableInput
             * @type          String
             * @default      [theme.depth.100]
             *
             * Specify the default depth for input items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            depth: '[theme.depth.100]',
            /**
             * @name          outline
             * @namespace     config.themeUi.filtrableInput
             * @type          Object
             * @default      [theme.ui.outline.active]
             *
             * Specify if the focus outline is activated for this ui element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            outline: '[theme.ui.outline.active]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.filtrableInput
             * @type          Object
             * @default      [theme.ui.default.rhythmVertical]
             *
             * Specify the default vertical rhythm for your filtrable input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            rhythmVertical: '[theme.ui.default.rhythmVertical]',
        },
    };
};
