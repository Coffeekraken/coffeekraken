export default (env, config) => {
    if (env.platform !== 'node')
        return;
    return {
        default: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.default
             * @type          String
             * @default      1.5em
             *
             * Specify the default padding inline for ui's
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '1.5em',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.default
             * @type          String
             * @default      0.75em
             *
             * Specify the default padding block for ui's
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '0.75em',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.default
             * @type          String
             * @default      [theme.border.radius.default]
             *
             * Specify the default border radius for ui's
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.border.radius.default]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.default
             * @type          String
             * @default      [theme.border.width.default]
             *
             * Specify the default border width for ui's
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.border.width.default]',
            /**
             * @name          transition
             * @namespace     config.themeUi.default
             * @type          String
             * @default      [theme.transition.fast]
             *
             * Specify the default transition for ui's
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.transition.fast]',
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.default
             * @type          String
             * @default      main
             *
             * Specify the default color for ui's
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultColor: 'main',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.default
             * @type          String
             * @default      solid
             *
             * Specify the default style for ui's.
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: 'solid',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.default
             * @type          String
             * @default      default
             *
             * Specify the default style for ui's.
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: 'default',
            /**
             * @name          depth
             * @namespace     config.themeUi.default
             * @type          String
             * @default      [theme.depth.default]
             *
             * Specify the default depth for ui's
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.depth.default]',
            rhythmVertical: {
                /**
                 * @name          margin-bottom
                 * @namespace     config.themeUi.default.rhythmVertical
                 * @type          Number
                 * @default      60
                 *
                 * Specify the default margin bottom when in vertical rhythm scope for ui's
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                'margin-bottom': 60,
            },
        },
        form: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.form
             * @type          String
             * @default      0.75em
             *
             * Specify the default padding inline for form items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '0.75em',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.form
             * @type          String
             * @default      0.5em
             *
             * Specify the default padding block for form items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '0.5em',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.form
             * @type          String
             * @default      [theme.border.radius.default]
             *
             * Specify the default border radius for form items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.border.radius.default]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.form
             * @type          String
             * @default      [theme.border.width.default]
             *
             * Specify the default border width for form items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.border.width.default]',
            /**
             * @name          transition
             * @namespace     config.themeUi.form
             * @type          String
             * @default      [theme.transition.fast]
             *
             * Specify the default transition for form items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.transition.fast]',
            /**
             * @name          outline
             * @namespace     config.themeUi.form
             * @type          String
             * @default      [theme.ui.outline.active]
             *
             * Specify if the outline is enabled for form items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outline: '[theme.ui.outline.active]',
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.form
             * @type          String
             * @default      accent
             *
             * Specify the default color for form items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultColor: 'accent',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.form
             * @type          String
             * @default      solid
             *
             * Specify the default style for form items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: 'solid',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.form
             * @type          String
             * @default      solid
             *
             * Specify the default shape for form items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: 'default',
            /**
             * @name          depth
             * @namespace     config.themeUi.form
             * @type          String
             * @default      [theme.ui.default.depth]
             *
             * Specify the default depth for form items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.default.depth]',
            rhythmVertical: {
                /**
                 * @name          margin-bottom
                 * @namespace     config.themeUi.form.rhythmVertical
                 * @type          Number
                 * @default      40
                 *
                 * Specify the default margin bottom for form items when in vertical rhythm scope
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                'margin-bottom': 40,
            },
        },
        outline: {
            /**
             * @name          active
             * @namespace     config.themeUi.outline
             * @type          Boolean
             * @default      true
             *
             * Specify if the outline is activated by default for ui elements
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            active: true,
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.outline
             * @type          String
             * @default      10px
             *
             * Specify the border width for outline ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '10px',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.outline
             * @type          String
             * @default      [theme.border.radius.default]
             *
             * Specify the border radius for outline ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.border.radius.default]',
            /**
             * @name          transition
             * @namespace     config.themeUi.outline
             * @type          String
             * @default      all .2s ease-out
             *
             * Specify the transition for outline ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: 'all .2s ease-out',
        },
        scrollbar: {
            /**
             * @name          size
             * @namespace     config.themeUi.scrollbar
             * @type          String
             * @default      2px
             *
             * Specify the size (width/height) for scrollbar
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            size: '2px',
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.scrollbar
             * @type          String
             * @default      accent
             *
             * Specify the default color for scrollbar
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultColor: 'accent',
        },
        button: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.button
             * @type          String
             * @default      [theme.ui.default.paddingInline]
             *
             * Specify the default padding inline for button ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.default.paddingInline]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.button
             * @type          String
             * @default      [theme.ui.default.paddingBlock]
             *
             * Specify the default padding block for button ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.default.paddingBlock]',
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
            borderRadius: '[theme.ui.default.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.button
             * @type          String
             * @default      [theme.ui.default.borderWidth]
             *
             * Specify the default border width for button ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.default.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.button
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for button ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.default.transition]',
            /**
             * @name          outline
             * @namespace     config.themeUi.button
             * @type          Boolean
             * @default      [theme.ui.outline.active]
             *
             * Specify if you want the outline on your button ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outline: '[theme.ui.outline.active]',
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
            depth: '[theme.ui.default.depth]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.button
             * @type          Number
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your button ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.default.defaultStyle]',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.button
             * @type          Number
             * @default      [theme.ui.default.defaultShape]
             *
             * Specify the default style for your button ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: '[theme.ui.default.defaultShape]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.button
             * @type          Object
             * @default      [theme.ui.default.rhythmVertical]
             *
             * Specify the default vertical rhythm for your button ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.default.rhythmVertical]',
        },
        avatar: {
            borderRadius: '[theme.ui.default.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.avatar
             * @type          String
             * @default      2px
             *
             * Specify the default border width for avatar ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '2px',
            /**
             * @name          transition
             * @namespace     config.themeUi.avatar
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for avatar ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.default.transition]',
            /**
             * @name          depth
             * @namespace     config.themeUi.avatar
             * @type          Number
             * @default      [theme.ui.default.depth]
             *
             * Specify the default depth for your avatar ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.default.depth]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.avatar
             * @type          String
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your avatar ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.default.defaultStyle]',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.avatar
             * @type          String
             * @default      [theme.ui.default.defaultShape]
             *
             * Specify the default shape for your avatar ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: '[theme.ui.default.defaultShape]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.avatar
             * @type          Object
             * @default      [theme.ui.default.rhythmVertical]
             *
             * Specify the default vertical rhythm for your avatar ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.default.rhythmVertical]',
        },
        colorPicker: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.colorPicker
             * @type          String
             * @default      [theme.ui.default.paddingInline]
             *
             * Specify the default padding inline for colorPicker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.form.paddingInline]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.colorPicker
             * @type          String
             * @default      [theme.ui.form.paddingBlock]
             *
             * Specify the default padding block for colorPicker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.form.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.colorPicker
             * @type          String
             * @default      [theme.ui.form.borderRadius]
             *
             * Specify the default border radius for colorPicker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.form.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.colorPicker
             * @type          String
             * @default      [theme.ui.form.borderWidth]
             *
             * Specify the default border width for colorPicker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.form.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.colorPicker
             * @type          String
             * @default      [theme.ui.form.transition]
             *
             * Specify the default transition for colorPicker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.form.transition]',
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.colorPicker
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default color for colorPicker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultColor: '[theme.ui.form.defaultColor]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.colorPicker
             * @type          Number
             * @default      [theme.ui.form.defaultStyle]
             *
             * Specify the default style for your colorPicker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.form.defaultStyle]',
            /**
             * @name          depth
             * @namespace     config.themeUi.colorPicker
             * @type          String
             * @default      [theme.ui.form.depth]
             *
             * Specify the default depth for colorPicker items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.form.depth]',
            /**
             * @name          outline
             * @namespace     config.themeUi.colorPicker
             * @type          Object
             * @default      [theme.ui.outline.active]
             *
             * Specify if the focus outline is activated for this ui element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outline: '[theme.ui.outline.active]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.colorPicker
             * @type          Object
             * @default      [theme.ui.form.rhythmVertical]
             *
             * Specify the default vertical rhythm for your colorPicker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.form.rhythmVertical]',
        },
        datePicker: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.datePicker
             * @type          String
             * @default      [theme.ui.default.paddingInline]
             *
             * Specify the default padding inline for datePicker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.form.paddingInline]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.datePicker
             * @type          String
             * @default      [theme.ui.form.paddingBlock]
             *
             * Specify the default padding block for datePicker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.form.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.datePicker
             * @type          String
             * @default      [theme.ui.form.borderRadius]
             *
             * Specify the default border radius for datePicker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.form.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.datePicker
             * @type          String
             * @default      [theme.ui.form.borderWidth]
             *
             * Specify the default border width for datePicker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.form.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.datePicker
             * @type          String
             * @default      [theme.ui.form.transition]
             *
             * Specify the default transition for datePicker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.form.transition]',
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.datePicker
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default color for datePicker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultColor: ['theme.ui.form.defaultColor'],
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.datePicker
             * @type          Number
             * @default      [theme.ui.form.defaultStyle]
             *
             * Specify the default style for your datePicker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.form.defaultStyle]',
            /**
             * @name          depth
             * @namespace     config.themeUi.datePicker
             * @type          String
             * @default      [theme.ui.form.depth]
             *
             * Specify the default depth for datePicker items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.form.depth]',
            /**
             * @name          outline
             * @namespace     config.themeUi.datePicker
             * @type          Object
             * @default      [theme.ui.outline.active]
             *
             * Specify if the focus outline is activated for this ui element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outline: '[theme.ui.outline.active]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.datePicker
             * @type          Object
             * @default      [theme.ui.form.rhythmVertical]
             *
             * Specify the default vertical rhythm for your datePicker ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.form.rhythmVertical]',
        },
        input: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.input
             * @type          String
             * @default      [theme.ui.form.paddingInline]
             *
             * Specify the default padding inline for input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.form.paddingInline]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.input
             * @type          String
             * @default      [theme.ui.form.paddingBlock]
             *
             * Specify the default padding block for input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.form.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.input
             * @type          String
             * @default      [theme.ui.form.borderRadius]
             *
             * Specify the default border radius for input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.form.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.input
             * @type          String
             * @default      [theme.ui.form.borderWidth]
             *
             * Specify the default border width for input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.form.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.input
             * @type          String
             * @default      [theme.ui.form.transition]
             *
             * Specify the default transition for input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.form.transition]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.input
             * @type          String
             * @default      [theme.ui.form.defaultStyle]
             *
             * Specify the default style for your input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: 'solid',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.input
             * @type          String
             * @default      [theme.ui.form.defaultShape]
             *
             * Specify the default shape for your input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: '[theme.ui.form.defaultShape]',
            /**
             * @name          depth
             * @namespace     config.themeUi.input
             * @type          String
             * @default      [theme.ui.form.depth]
             *
             * Specify the default depth for input items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.form.depth]',
            /**
             * @name          outline
             * @namespace     config.themeUi.input
             * @type          Object
             * @default      [theme.ui.outline.active]
             *
             * Specify if the focus outline is activated for this ui element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outline: '[theme.ui.outline.active]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.input
             * @type          Object
             * @default      [theme.ui.form.rhythmVertical]
             *
             * Specify the default vertical rhythm for your input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.form.rhythmVertical]',
        },
        radio: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.radio
             * @type          String
             * @default      [theme.ui.form.paddingInline]
             *
             * Specify the default padding inline for radio ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.form.paddingInline]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.radio
             * @type          String
             * @default      [theme.ui.form.paddingBlock]
             *
             * Specify the default padding block for radio ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.form.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.radio
             * @type          String
             * @default      0.5em
             *
             * Specify the default border radius for radio ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '0.5em',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.radio
             * @type          String
             * @default      [theme.ui.form.borderWidth]
             *
             * Specify the default border width for radio ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.form.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.radio
             * @type          String
             * @default      [theme.ui.form.transition]
             *
             * Specify the default transition for radio ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.form.transition]',
            /**
             * @name          depth
             * @namespace     config.themeUi.radio
             * @type          String
             * @default      [theme.ui.form.depth]
             *
             * Specify the default depth for radio items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.form.depth]',
            /**
             * @name          outline
             * @namespace     config.themeUi.radio
             * @type          Object
             * @default      [theme.ui.outline.active]
             *
             * Specify if the focus outline is activated for this ui element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outline: '[theme.ui.outline.active]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.radio
             * @type          Number
             * @default      [theme.ui.form.defaultStyle]
             *
             * Specify the default style for your radio ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.form.defaultStyle]',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.radio
             * @type          Number
             * @default      [theme.ui.form.defaultShape]
             *
             * Specify the default style for your radio ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: '[theme.ui.form.defaultShape]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.radio
             * @type          Object
             * @default      [theme.ui.form.rhythmVertical]
             *
             * Specify the default vertical rhythm for your radio ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.form.rhythmVertical]',
        },
        checkbox: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.checkbox
             * @type          String
             * @default      [theme.ui.form.paddingInline]
             *
             * Specify the default padding inline for checkbox ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.form.paddingInline]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.checkbox
             * @type          String
             * @default      [theme.ui.form.paddingBlock]
             *
             * Specify the default padding block for checkbox ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.form.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.checkbox
             * @type          String
             * @default      0.2em
             *
             * Specify the default border radius for checkbox ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '0.2em',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.checkbox
             * @type          String
             * @default      [theme.ui.form.borderWidth]
             *
             * Specify the default border width for checkbox ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.form.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.checkbox
             * @type          String
             * @default      [theme.ui.form.transition]
             *
             * Specify the default transition for checkbox ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.form.transition]',
            /**
             * @name          depth
             * @namespace     config.themeUi.checkbox
             * @type          String
             * @default      [theme.ui.form.depth]
             *
             * Specify the default depth for checkbox items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.form.depth]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.checkbox
             * @type          String
             * @default      [theme.ui.form.defaultStyle]
             *
             * Specify the default style for your checkbox ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.default.defaultStyle]',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.checkbox
             * @type          String
             * @default      [theme.ui.default.defaultShape]
             *
             * Specify the default style for your checkbox ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: '[theme.ui.default.defaultShape]',
            /**
             * @name          outline
             * @namespace     config.themeUi.checkbox
             * @type          Object
             * @default      [theme.ui.outline.active]
             *
             * Specify if the focus outline is activated for this ui element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outline: '[theme.ui.outline.active]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.checkbox
             * @type          Object
             * @default      [theme.ui.form.rhythmVertical]
             *
             * Specify the default vertical rhythm for your checkbox ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.form.rhythmVertical]',
        },
        range: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.range
             * @type          String
             * @default      [theme.ui.form.paddingInline]
             *
             * Specify the default padding inline for range ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.form.paddingInline]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.range
             * @type          String
             * @default      [theme.ui.form.paddingBlock]
             *
             * Specify the default padding block for range ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.form.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.range
             * @type          String
             * @default      [theme.ui.form.borderRadius]
             *
             * Specify the default border radius for range ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.form.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.range
             * @type          String
             * @default      [theme.ui.form.borderWidth]
             *
             * Specify the default border width for range ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.form.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.range
             * @type          String
             * @default      [theme.ui.form.transition]
             *
             * Specify the default transition for range ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.form.transition]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.range
             * @type          Number
             * @default      [theme.ui.form.defaultStyle]
             *
             * Specify the default style for your range ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.form.defaultStyle]',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.range
             * @type          Number
             * @default      [theme.ui.form.defaultShape]
             *
             * Specify the default style for your range ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: '[theme.ui.form.defaultShape]',
            /**
             * @name          depth
             * @namespace     config.themeUi.range
             * @type          String
             * @default      [theme.ui.form.depth]
             *
             * Specify the default depth for range items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.form.depth]',
            /**
             * @name          outline
             * @namespace     config.themeUi.range
             * @type          Object
             * @default      [theme.ui.outline.active]
             *
             * Specify if the focus outline is activated for this ui element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outline: '[theme.ui.outline.active]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.range
             * @type          Object
             * @default      [theme.ui.form.rhythmVertical]
             *
             * Specify the default vertical rhythm for your range ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.form.rhythmVertical]',
        },
        label: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.label
             * @type          String
             * @default      [theme.ui.form.paddingInline]
             *
             * Specify the default padding inline for label ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.form.paddingInline]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.label
             * @type          String
             * @default      [theme.ui.form.paddingBlock]
             *
             * Specify the default padding block for label ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.form.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.label
             * @type          String
             * @default      [theme.ui.form.borderRadius]
             *
             * Specify the default border radius for label ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.form.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.label
             * @type          String
             * @default      [theme.ui.form.borderWidth]
             *
             * Specify the default border width for label ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.form.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.label
             * @type          String
             * @default      [theme.ui.form.transition]
             *
             * Specify the default transition for label ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.form.transition]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.label
             * @type          String
             * @default      inline
             *
             * Specify the default style for your label ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: 'inline',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.label
             * @type          String
             * @default      default
             *
             * Specify the default shape for your label ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: '[theme.ui.form.defaultShape]',
            /**
             * @name          depth
             * @namespace     config.themeUi.label
             * @type          String
             * @default      [theme.ui.form.depth]
             *
             * Specify the default depth for label items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.form.depth]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.label
             * @type          Object
             * @default      [theme.ui.form.rhythmVertical]
             *
             * Specify the default vertical rhythm for your label ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.form.rhythmVertical]',
        },
        select: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.select
             * @type          String
             * @default      [theme.ui.form.paddingInline]
             *
             * Specify the default padding inline for select ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.form.paddingInline]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.select
             * @type          String
             * @default      [theme.ui.form.paddingBlock]
             *
             * Specify the default padding block for select ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.form.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.select
             * @type          String
             * @default      [theme.ui.form.borderRadius]
             *
             * Specify the default border radius for select ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.form.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.select
             * @type          String
             * @default      [theme.ui.form.borderWidth]
             *
             * Specify the default border width for select ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.form.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.select
             * @type          String
             * @default      [theme.ui.form.transition]
             *
             * Specify the default transition for select ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.form.transition]',
            /**
             * @name          depth
             * @namespace     config.themeUi.select
             * @type          String
             * @default      [theme.ui.form.depth]
             *
             * Specify the default depth for select items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.form.depth]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.select
             * @type          String
             * @default      [theme.ui.form.defaultStyle]
             *
             * Specify the default style for your select ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.form.defaultStyle]',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.select
             * @type          String
             * @default      [theme.ui.form.defaultShape]
             *
             * Specify the default style for your select ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: '[theme.ui.form.defaultShape]',
            /**
             * @name          outline
             * @namespace     config.themeUi.select
             * @type          Object
             * @default      [theme.ui.outline.active]
             *
             * Specify if the focus outline is activated for this ui element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outline: '[theme.ui.outline.active]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.select
             * @type          Object
             * @default      [theme.ui.form.rhythmVertical]
             *
             * Specify the default vertical rhythm for your select ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.form.rhythmVertical]',
        },
        switch: {
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.switch
             * @type          String
             * @default      [theme.ui.form.borderRadius]
             *
             * Specify the default border radius for switch ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.form.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.switch
             * @type          String
             * @default      [theme.ui.form.borderWidth]
             *
             * Specify the default border width for switch ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.form.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.switch
             * @type          String
             * @default      [theme.ui.form.transition]
             *
             * Specify the default transition for switch ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.default.transition]',
            /**
             * @name          depth
             * @namespace     config.themeUi.switch
             * @type          String
             * @default      [theme.ui.form.depth]
             *
             * Specify the default depth for switch items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.form.depth]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.switch
             * @type          Number
             * @default      [theme.ui.form.defaultStyle]
             *
             * Specify the default style for your switch ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.form.defaultStyle]',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.switch
             * @type          Number
             * @default      [theme.ui.form.defaultShape]
             *
             * Specify the default shape for your switch ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: '[theme.ui.form.defaultShape]',
            /**
             * @name          outline
             * @namespace     config.themeUi.switch
             * @type          Object
             * @default      [theme.ui.outline.active]
             *
             * Specify if the focus outline is activated for this ui element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outline: '[theme.ui.outline.active]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.switch
             * @type          Object
             * @default      [theme.ui.form.rhythmVertical]
             *
             * Specify the default vertical rhythm for your switch ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.form.rhythmVertical]',
        },
        dropdown: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.dropdown
             * @type          String
             * @default      [theme.ui.default.paddingInline]
             *
             * Specify the default padding inline for dropdown ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.default.paddingBlock]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.dropdown
             * @type          String
             * @default      [theme.ui.default.paddingBlock]
             *
             * Specify the default padding block for dropdown ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.default.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.dropdown
             * @type          String
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the default border radius for dropdown ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.default.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.dropdown
             * @type          String
             * @default      0
             *
             * Specify the default border width for dropdown ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: 0,
            /**
             * @name          transition
             * @namespace     config.themeUi.dropdown
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for dropdown ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.default.transition]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.dropdown
             * @type          String
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your dropdown ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.default.defaultStyle]',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.dropdown
             * @type          String
             * @default      default
             *
             * Specify the default shape for your dropdown ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: 'default',
            /**
             * @name          depth
             * @namespace     config.themeUi.dropdown
             * @type          String
             * @default      50
             *
             * Specify the default depth for dropdown items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: 50,
            /**
             * @name          outline
             * @namespace     config.themeUi.dropdown
             * @type          Object
             * @default      [theme.ui.outline.active]
             *
             * Specify if the focus outline is activated for this ui element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outline: '[theme.ui.outline.active]',
        },
        list: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.list
             * @type          String
             * @default      [theme.ui.default.paddingInline]
             *
             * Specify the default padding inline for list ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.default.paddingInline]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.list
             * @type          String
             * @default      [theme.ui.default.paddingBlock]
             *
             * Specify the default padding block for list ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.default.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.list
             * @type          String
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the default border radius for list ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.default.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.list
             * @type          String
             * @default      [theme.ui.default.borderWidth]
             *
             * Specify the default border width for list ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.default.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.list
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for list ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.default.transition]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.list
             * @type          Number
             * @default      dl
             *
             * Specify the default style for your list ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: 'dl',
            /**
             * @name          depth
             * @namespace     config.themeUi.list
             * @type          String
             * @default      [theme.ui.default.depth]
             *
             * Specify the default depth for list items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.default.depth]',
            /**
             * @name          bulletChar
             * @namespace     config.themeUi.list
             * @type          String
             * @default      ●
             *
             * Specify if the bullet character to use
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            bulletChar: '-',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.list
             * @type          Object
             * @default      [theme.ui.default.rhythmVertical]
             *
             * Specify the default vertical rhythm for your list ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.default.rhythmVertical]',
        },
        fsTree: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.fsTree
             * @type          String
             * @default      [theme.ui.default.paddingInline]
             *
             * Specify the default padding inline for fsTree ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.default.paddingInline]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.fsTree
             * @type          String
             * @default      [theme.ui.default.paddingBlock]
             *
             * Specify the default padding block for fsTree ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.default.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.fsTree
             * @type          String
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the default border radius for fsTree ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.default.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.fsTree
             * @type          String
             * @default      [theme.ui.default.borderWidth]
             *
             * Specify the default border width for fsTree ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.default.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.fsTree
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for fsTree ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.default.transition]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.fsTree
             * @type          String
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your fsTree ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.default.defaultStyle]',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.fsTree
             * @type          String
             * @default      [theme.ui.default.defaultShape]
             *
             * Specify the default shape for your fsTree ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: '[theme.ui.default.defaultShape]',
            /**
             * @name          depth
             * @namespace     config.themeUi.fsTree
             * @type          String
             * @default      [theme.ui.default.depth]
             *
             * Specify the default depth for fsTree items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.default.depth]',
            /**
             * @name          bulletChar
             * @namespace     config.themeUi.fsTree
             * @type          String
             * @default      ●
             *
             * Specify if the bullet character to use
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            bulletChar: '●',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.fsTree
             * @type          Object
             * @default      [theme.ui.default.rhythmVertical]
             *
             * Specify the default vertical rhythm for your fsTree ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.default.rhythmVertical]',
        },
        tabs: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.tabs
             * @type          String
             * @default      [theme.ui.default.paddingInline]
             *
             * Specify the default padding inline for tabs ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.default.paddingInline]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.tabs
             * @type          String
             * @default      [theme.ui.default.paddingBlock]
             *
             * Specify the default padding block for tabs ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.default.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.tabs
             * @type          String
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the default border radius for tabs ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.default.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.tabs
             * @type          String
             * @default      [theme.ui.default.borderWidth]
             *
             * Specify the default border width for tabs ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.default.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.tabs
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for tabs ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.default.transition]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.tabs
             * @type          Number
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your tabs ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.default.defaultStyle]',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.tabs
             * @type          Number
             * @default      [theme.ui.default.defaultShape]
             *
             * Specify the default style for your tabs ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: '[theme.ui.default.defaultShape]',
            /**
             * @name          depth
             * @namespace     config.themeUi.tabs
             * @type          String
             * @default      [theme.ui.default.depth]
             *
             * Specify the default depth for tabs items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.default.depth]',
            /**
             * @name          outline
             * @namespace     config.themeUi.tabs
             * @type          Object
             * @default      [theme.ui.outline.active]
             *
             * Specify if the focus outline is activated for this ui element
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            outline: '[theme.ui.outline.active]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.tabe
             * @type          Object
             * @default      [theme.ui.default.rhythmVertical]
             *
             * Specify the default vertical rhythm for your tabe ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.default.rhythmVertical]',
        },
        terminal: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.terminal
             * @type          String
             * @default      [theme.ui.default.paddingInline]
             *
             * Specify the default padding inline for terminal ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.default.paddingInline]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.terminal
             * @type          String
             * @default      [theme.ui.default.paddingBlock]
             *
             * Specify the default padding block for terminal ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.default.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.terminal
             * @type          String
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the default border radius for terminal ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.default.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.terminal
             * @type          String
             * @default      [theme.ui.default.borderWidth]
             *
             * Specify the default border width for terminal ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.default.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.terminal
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for terminal ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.default.transition]',
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.terminal
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default color for terminal ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultColor: '[theme.ui.default.defaultColor]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.terminal
             * @type          Number
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your terminal ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.default.defaultStyle]',
            /**
             * @name          depth
             * @namespace     config.themeUi.terminal
             * @type          String
             * @default      [theme.ui.default.depth]
             *
             * Specify the default depth for terminal items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.default.depth]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.terminal
             * @type          Object
             * @default      [theme.ui.default.rhythmVertical]
             *
             * Specify the default vertical rhythm for your terminal ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.default.rhythmVertical]',
        },
        tooltip: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.tooltip
             * @type          String
             * @default      [theme.ui.default.paddingInline]
             *
             * Specify the default padding inline for tooltip ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.default.paddingBlock]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.tooltip
             * @type          String
             * @default      [theme.ui.default.paddingBlock]
             *
             * Specify the default padding block for tooltip ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.default.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.tooltip
             * @type          String
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the default border radius for tooltip ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.default.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.tooltip
             * @type          String
             * @default      [theme.ui.default.borderWidth]
             *
             * Specify the default border width for tooltip ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.default.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.tooltip
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for tooltip ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.default.transition]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.tooltip
             * @type          String
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your tooltip ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.default.defaultStyle]',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.tooltip
             * @type          String
             * @default      [theme.ui.default.defaultShape]
             *
             * Specify the default shape for your tooltip ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: '[theme.ui.default.defaultShape]',
            /**
             * @name          depth
             * @namespace     config.themeUi.tooltip
             * @type          String
             * @default      [theme.ui.default.depth]
             *
             * Specify the default depth for tooltip items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.default.depth]',
            /**
             * @name          arrowSize
             * @namespace     config.themeUi.tooltip
             * @type          Object
             * @default      15px
             *
             * Specify if the arrow size of the tooltips
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            arrowSize: '15px',
        },
        code: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.code
             * @type          String
             * @default      [theme.padding.50]
             *
             * Specify the default padding inline for code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.padding.50]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.code
             * @type          String
             * @default      [theme.padding.50]
             *
             * Specify the default padding block for code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.padding.50]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.code
             * @type          String
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the default border radius for code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.default.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.code
             * @type          String
             * @default      [theme.ui.default.borderWidth]
             *
             * Specify the default border width for code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.default.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.code
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.default.transition]',
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.code
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default color for code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultColor: '[theme.ui.default.defaultColor]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.code
             * @type          Number
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.default.defaultStyle]',
            /**
             * @name          depth
             * @namespace     config.themeUi.code
             * @type          String
             * @default      [theme.ui.default.depth]
             *
             * Specify the default depth for code items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.default.depth]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.code
             * @type          Object
             * @default      [theme.ui.default.rhythmVertical]
             *
             * Specify the default vertical rhythm for your code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.default.rhythmVertical]',
        },
        blockquote: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.blockquote
             * @type          String
             * @default      [theme.ui.default.paddingInline]
             *
             * Specify the default padding inline for blockquote ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.default.paddingInline]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.blockquote
             * @type          String
             * @default      [theme.ui.default.paddingBlock]
             *
             * Specify the default padding block for blockquote ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.default.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.blockquote
             * @type          String
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the default border radius for blockquote ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.default.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.blockquote
             * @type          String
             * @default      [theme.ui.default.borderWidth]
             *
             * Specify the default border width for blockquote ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.default.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.blockquote
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for blockquote ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.default.transition]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.blockquote
             * @type          String
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your blockquote ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.default.defaultStyle]',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.blockquote
             * @type          String
             * @default      [theme.ui.default.defaultShape]
             *
             * Specify the default shape for your blockquote ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: '[theme.ui.default.defaultShape]',
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.blockquote
             * @type          String
             * @default      accent
             *
             * Specify the default color for your blockquote ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultColor: 'accent',
            /**
             * @name          depth
             * @namespace     config.themeUi.blockquote
             * @type          String
             * @default      [theme.ui.default.depth]
             *
             * Specify the default depth for blockquote items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.default.depth]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.blockquote
             * @type          Object
             * @default      [theme.ui.default.rhythmVertical]
             *
             * Specify the default vertical rhythm for your blockquote ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.default.rhythmVertical]',
        },
        table: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.table
             * @type          String
             * @default      [theme.ui.default.paddingInline]
             *
             * Specify the default padding inline for table ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '[theme.ui.default.paddingInline]',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.table
             * @type          String
             * @default      [theme.ui.default.paddingBlock]
             *
             * Specify the default padding block for table ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '[theme.ui.default.paddingBlock]',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.table
             * @type          String
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the default border radius for table ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.default.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.table
             * @type          String
             * @default      [theme.border.width.10]
             *
             * Specify the default border width for table ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.border.width.10]',
            /**
             * @name          transition
             * @namespace     config.themeUi.table
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for table ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.default.transition]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.table
             * @type          Number
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your table ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.default.defaultStyle]',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.table
             * @type          Number
             * @default      [theme.ui.default.defaultShape]
             *
             * Specify the default shape for your table ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: '[theme.ui.default.defaultShape]',
            /**
             * @name          depth
             * @namespace     config.themeUi.table
             * @type          String
             * @default      [theme.ui.default.depth]
             *
             * Specify the default depth for table items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: '[theme.ui.default.depth]',
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.table
             * @type          Object
             * @default      [theme.ui.default.rhythmVertical]
             *
             * Specify the default vertical rhythm for your table ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.default.rhythmVertical]',
        },
        badge: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.badge
             * @type          String
             * @default         0.65em
             *
             * Specify the default padding inline for badge ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: '.65em',
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.badge
             * @type          String
             * @default      0.35em
             *
             * Specify the default padding block for badge ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: '.35em',
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.badge
             * @type          String
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the default border radius for badge ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: '[theme.ui.default.borderRadius]',
            /**
             * @name          borderWidth
             * @namespace     config.themeUi.badge
             * @type          String
             * @default      [theme.ui.default.borderWidth]
             *
             * Specify the default border width for badge ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderWidth: '[theme.ui.default.borderWidth]',
            /**
             * @name          transition
             * @namespace     config.themeUi.badge
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for badge ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            transition: '[theme.ui.default.transition]',
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.badge
             * @type          Number
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your badge ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: '[theme.ui.default.defaultStyle]',
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.badge
             * @type          Number
             * @default      [theme.ui.default.defaultShape]
             *
             * Specify the default shape for your badge ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: '[theme.ui.default.defaultShape]',
            /**
             * @name          depth
             * @namespace     config.themeUi.badge
             * @type          String
             * @default      0
             *
             * Specify the default depth for badge items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            depth: 0,
            /**
             * @name          rhythmVertical
             * @namespace     config.themeUi.badge
             * @type          Object
             * @default      [theme.ui.default.rhythmVertical]
             *
             * Specify the default vertical rhythm for your badge ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            rhythmVertical: '[theme.ui.default.rhythmVertical]',
        },
        loader: {
            /**
             * @name          duration
             * @namespace     config.themeUi.loader
             * @type          String
             * @default      1s
             *
             * Specify the duration of a loader
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            duration: '1s',
            /**
             * @name          easing
             * @namespace     config.themeUi.loader
             * @type          String
             * @default      linear
             *
             * Specify the easing of a loader
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            easing: 'linear',
        },
        loaderSpinner: {
            /**
             * @name          duration
             * @namespace     config.themeUi.loaderSpinner
             * @type          String
             * @default      [theme.ui.loader.duration]
             *
             * Specify the duration of the spinner loader
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            duration: '[theme.ui.loader.duration]',
            /**
             * @name          duration
             * @namespace     config.themeUi.loaderSpinner
             * @type          String
             * @default      [theme.ui.loader.easing]
             *
             * Specify the easing of the spinner loader
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            easing: '[theme.ui.loader.easing]',
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVVaS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZVVpLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUFlLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQzNCLElBQUksR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNO1FBQUUsT0FBTztJQUNwQyxPQUFPO1FBQ0gsT0FBTyxFQUFFO1lBQ0w7Ozs7Ozs7Ozs7ZUFVRztZQUNILGFBQWEsRUFBRSxPQUFPO1lBQ3RCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxZQUFZLEVBQUUsUUFBUTtZQUN0Qjs7Ozs7Ozs7OztlQVVHO1lBQ0gsWUFBWSxFQUFFLCtCQUErQjtZQUM3Qzs7Ozs7Ozs7OztlQVVHO1lBQ0gsV0FBVyxFQUFFLDhCQUE4QjtZQUMzQzs7Ozs7Ozs7OztlQVVHO1lBQ0gsVUFBVSxFQUFFLHlCQUF5QjtZQUNyQzs7Ozs7Ozs7OztlQVVHO1lBQ0gsWUFBWSxFQUFFLE1BQU07WUFDcEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILFlBQVksRUFBRSxPQUFPO1lBQ3JCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxZQUFZLEVBQUUsU0FBUztZQUN2Qjs7Ozs7Ozs7OztlQVVHO1lBQ0gsS0FBSyxFQUFFLHVCQUF1QjtZQUU5QixjQUFjLEVBQUU7Z0JBQ1o7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsZUFBZSxFQUFFLEVBQUU7YUFDdEI7U0FDSjtRQUNELElBQUksRUFBRTtZQUNGOzs7Ozs7Ozs7O2VBVUc7WUFDSCxhQUFhLEVBQUUsUUFBUTtZQUN2Qjs7Ozs7Ozs7OztlQVVHO1lBQ0gsWUFBWSxFQUFFLE9BQU87WUFDckI7Ozs7Ozs7Ozs7ZUFVRztZQUNILFlBQVksRUFBRSwrQkFBK0I7WUFDN0M7Ozs7Ozs7Ozs7ZUFVRztZQUNILFdBQVcsRUFBRSw4QkFBOEI7WUFDM0M7Ozs7Ozs7Ozs7ZUFVRztZQUNILFVBQVUsRUFBRSx5QkFBeUI7WUFDckM7Ozs7Ozs7Ozs7ZUFVRztZ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