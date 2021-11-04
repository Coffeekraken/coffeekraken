export default (env, config) => {
    if (env.platform !== 'node')
        return;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVVaS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZVVpLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUFlLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzNCLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUVwQyxPQUFPO1FBQ0gsY0FBYyxFQUFFO1lBQ1o7Ozs7Ozs7Ozs7ZUFVRztZQUNILGFBQWEsRUFBRSxrQ0FBa0M7WUFDakQ7Ozs7Ozs7Ozs7ZUFVRztZQUNILFlBQVksRUFBRSxpQ0FBaUM7WUFDL0M7Ozs7Ozs7Ozs7ZUFVRztZQUNILFlBQVksRUFBRSxpQ0FBaUM7WUFDL0M7Ozs7Ozs7Ozs7ZUFVRztZQUNILFdBQVcsRUFBRSxnQ0FBZ0M7WUFDN0M7Ozs7Ozs7Ozs7ZUFVRztZQUNILFVBQVUsRUFBRSwrQkFBK0I7WUFDM0M7Ozs7Ozs7Ozs7ZUFVRztZQUNILFlBQVksRUFBRSxpQ0FBaUM7WUFDL0M7Ozs7Ozs7Ozs7ZUFVRztZQUNILFlBQVksRUFBRSxPQUFPO1lBQ3JCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxLQUFLLEVBQUUsbUJBQW1CO1lBQzFCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxPQUFPLEVBQUUsMkJBQTJCO1lBQ3BDOzs7Ozs7Ozs7O2VBVUc7WUFDSCxjQUFjLEVBQUUsbUNBQW1DO1NBQ3REO0tBQ0osQ0FBQztBQUNOLENBQUMsQ0FBQyJ9