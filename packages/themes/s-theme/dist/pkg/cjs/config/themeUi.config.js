"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (api) => {
    if (api.env.platform !== 'node')
        return;
    return {
        default: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.default
             * @type          String
             * @default      1.5
             *
             * Specify the default padding inline for ui's
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: 1.5,
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.default
             * @type          String
             * @default      0.75
             *
             * Specify the default padding block for ui's
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: 0.75,
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.default
             * @type          String
             * @default      1
             *
             * Specify the default border radius for ui's
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: 1,
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
            get borderWidth() {
                return api.theme.border.width.default;
            },
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
            get transition() {
                return api.theme.transition.fast;
            },
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
            get depth() {
                return api.theme.depth.default;
            },
            /**
             * @name          spacing
             * @namespace     config.themeUi.default
             * @type          String
             * @default      [theme.space.30]
             *
             * Specify the default padding block for ui's
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get spacing() {
                return api.theme.space['30'];
            },
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
             * @default      1
             *
             * Specify the default padding inline for form items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: 1,
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.form
             * @type          String
             * @default      0.75
             *
             * Specify the default padding block for form items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: 0.75,
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.form
             * @type          String
             * @default      1
             *
             * Specify the default border radius for form items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: 1,
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
            get borderWidth() {
                return api.theme.border.width.default;
            },
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
            get transition() {
                return api.theme.transition.fast;
            },
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
            get outline() {
                return api.theme.ui.outline.active;
            },
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
            get depth() {
                return api.theme.ui.default.depth;
            },
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
             * @default      [theme.ui.default.borderRadius]
             *
             * Specify the border radius for outline ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get borderRadius() {
                return api.theme.ui.default.borderRadius;
            },
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
            get paddingInline() {
                return api.theme.ui.default.paddingInline;
            },
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
            get paddingBlock() {
                return api.theme.ui.default.paddingBlock;
            },
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
            get borderWidth() {
                return api.theme.ui.default.borderWidth;
            },
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
            get transition() {
                return api.theme.ui.default.transition;
            },
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
            get outline() {
                return api.theme.ui.outline.active;
            },
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
            get defaultStyle() {
                return api.theme.ui.default.defaultStyle;
            },
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
            get defaultShape() {
                return api.theme.ui.default.defaultShape;
            },
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.button
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default style for your button ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.default.defaultColor;
            },
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
            get rhythmVertical() {
                return api.theme.ui.default.rhythmVertical;
            },
        },
        backdrop: {
            /**
             * @name          transition
             * @namespace     config.themeUi.backdrop
             * @type          String
             * @default      [theme.ui.default.transition]
             *
             * Specify the default transition for backdrop ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get transition() {
                return api.theme.ui.default.transition;
            },
            /**
             * @name          defaultStyle
             * @namespace     config.themeUi.backdrop
             * @type          Number
             * @default      solid
             *
             * Specify the default style for your backdrop ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultStyle: 'solid',
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.backdrop
             * @type          Number
             * @default      solid
             *
             * Specify the default color for your backdrop ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.default.defaultColor;
            },
        },
        avatar: {
            get borderRadius() {
                return api.theme.ui.default.borderRadius;
            },
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
            get transition() {
                return api.theme.ui.default.transition;
            },
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
            get depth() {
                return api.theme.ui.default.depth;
            },
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
            get defaultStyle() {
                return api.theme.ui.default.defaultStyle;
            },
            /**
             * @name          defaultShape
             * @namespace     config.themeUi.avatar
             * @type          String
             * @default      rounded
             *
             * Specify the default shape for your avatar ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultShape: 'rounded',
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.avatar
             * @type          Number
             * @default      solid
             *
             * Specify the default color for your avatar ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.default.defaultColor;
            },
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
            get rhythmVertical() {
                return api.theme.ui.default.rhythmVertical;
            },
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
            get paddingInline() {
                return api.theme.ui.form.paddingInline;
            },
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
            get paddingBlock() {
                return api.theme.ui.form.paddingBlock;
            },
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
            get borderRadius() {
                return api.theme.ui.form.borderRadius;
            },
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
            get borderWidth() {
                return api.theme.ui.form.borderWidth;
            },
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
            get transition() {
                return api.theme.ui.form.transition;
            },
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
            get defaultShape() {
                return api.theme.ui.form.defaultShape;
            },
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.input
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default style for your input ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.form.defaultColor;
            },
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
            get depth() {
                return api.theme.ui.form.depth;
            },
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
            get outline() {
                return api.theme.ui.outline.active;
            },
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
            get rhythmVertical() {
                return api.theme.ui.form.rhythmVertical;
            },
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
            get paddingInline() {
                return api.theme.ui.form.paddingInline;
            },
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
            get paddingBlock() {
                return api.theme.ui.form.paddingBlock;
            },
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.radio
             * @type          String
             * @default      100
             *
             * Specify the default border radius for radio ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: 100,
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
            get borderWidth() {
                return api.theme.ui.form.borderWidth;
            },
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
            get transition() {
                return api.theme.ui.form.transition;
            },
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
            get depth() {
                return api.theme.ui.form.depth;
            },
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
            get outline() {
                return api.theme.ui.outline.active;
            },
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
            get defaultStyle() {
                return api.theme.ui.form.defaultStyle;
            },
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
            get defaultShape() {
                return api.theme.ui.form.defaultShape;
            },
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.radio
             * @type          String
             * @default      [theme.ui.form.defaultColor]
             *
             * Specify the default style for your radio ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.form.defaultColor;
            },
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
            get rhythmVertical() {
                return api.theme.ui.form.rhythmVertical;
            },
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
            get paddingInline() {
                return api.theme.ui.form.paddingInline;
            },
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
            get paddingBlock() {
                return api.theme.ui.form.paddingBlock;
            },
            /**
             * @name          borderRadius
             * @namespace     config.themeUi.checkbox
             * @type          String
             * @default      0.2
             *
             * Specify the default border radius for checkbox ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            borderRadius: 0.2,
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
            get borderWidth() {
                return api.theme.ui.form.borderWidth;
            },
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
            get transition() {
                return api.theme.ui.form.transition;
            },
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
            get depth() {
                return api.theme.ui.form.depth;
            },
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
            get defaultStyle() {
                return api.theme.ui.default.defaultStyle;
            },
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
            get defaultShape() {
                return api.theme.ui.default.defaultShape;
            },
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.checkbox
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default style for your checkbox ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.form.defaultColor;
            },
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
            get outline() {
                return api.theme.ui.outline.active;
            },
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
            get rhythmVertical() {
                return api.theme.ui.form.rhythmVertical;
            },
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
            get paddingInline() {
                return api.theme.ui.form.paddingInline;
            },
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
            get paddingBlock() {
                return api.theme.ui.form.paddingBlock;
            },
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
            get borderRadius() {
                return api.theme.ui.form.borderRadius;
            },
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
            get borderWidth() {
                return api.theme.ui.form.borderWidth;
            },
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
            get transition() {
                return api.theme.ui.form.transition;
            },
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
            get defaultStyle() {
                return api.theme.ui.form.defaultStyle;
            },
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
            get defaultShape() {
                return api.theme.ui.form.defaultShape;
            },
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.range
             * @type          String
             * @default      [theme.ui.form.defaultColor]
             *
             * Specify the default style for your range ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.form.defaultColor;
            },
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
            get depth() {
                return api.theme.ui.form.depth;
            },
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
            get outline() {
                return api.theme.ui.outline.active;
            },
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
            get rhythmVertical() {
                return api.theme.ui.form.rhythmVertical;
            },
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
            get paddingInline() {
                return api.theme.ui.form.paddingInline;
            },
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
            get paddingBlock() {
                return api.theme.ui.form.paddingBlock;
            },
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
            get borderRadius() {
                return api.theme.ui.form.borderRadius;
            },
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
            get borderWidth() {
                return api.theme.ui.form.borderWidth;
            },
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
            get transition() {
                return api.theme.ui.form.transition;
            },
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
            get defaultShape() {
                return api.theme.ui.form.defaultShape;
            },
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.label
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default style for your label ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.default.defaultColor;
            },
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
            get depth() {
                return api.theme.ui.form.depth;
            },
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
            get rhythmVertical() {
                return api.theme.ui.form.rhythmVertical;
            },
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
            get paddingInline() {
                return api.theme.ui.form.paddingInline;
            },
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
            get paddingBlock() {
                return api.theme.ui.form.paddingBlock;
            },
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
            get borderRadius() {
                return api.theme.ui.form.borderRadius;
            },
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
            get borderWidth() {
                return api.theme.ui.form.borderWidth;
            },
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
            get transition() {
                return api.theme.ui.form.transition;
            },
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
            get depth() {
                return api.theme.ui.form.depth;
            },
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
            get defaultStyle() {
                return api.theme.ui.form.defaultStyle;
            },
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
            get defaultShape() {
                return api.theme.ui.form.defaultShape;
            },
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.select
             * @type          String
             * @default      [theme.ui.form.defaultColor]
             *
             * Specify the default style for your select ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.form.defaultColor;
            },
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
            get outline() {
                return api.theme.ui.outline.active;
            },
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
            get rhythmVertical() {
                return api.theme.ui.form.rhythmVertical;
            },
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
            get borderRadius() {
                return api.theme.ui.form.borderRadius;
            },
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
            get borderWidth() {
                return api.theme.ui.form.borderWidth;
            },
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
            get transition() {
                return api.theme.ui.default.transition;
            },
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
            get depth() {
                return api.theme.ui.form.depth;
            },
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
            get defaultStyle() {
                return api.theme.ui.form.defaultStyle;
            },
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
            get defaultShape() {
                return api.theme.ui.form.defaultShape;
            },
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.switch
             * @type          String
             * @default      [theme.ui.form.defaultColor]
             *
             * Specify the default style for your switch ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.form.defaultColor;
            },
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
            get outline() {
                return api.theme.ui.outline.active;
            },
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
            get rhythmVertical() {
                return api.theme.ui.form.rhythmVertical;
            },
        },
        dropdown: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.dropdown
             * @type          String
             * @default      '[theme.padding['10']]'
             *
             * Specify the default padding inline for dropdown ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get paddingInline() {
                return api.theme.padding['10'];
            },
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.dropdown
             * @type          String
             * @default      '[theme.padding['10']]'
             *
             * Specify the default padding block for dropdown ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get paddingBlock() {
                return api.theme.padding['10'];
            },
            /**
             * @name          itemPaddingInline
             * @namespace     config.themeUi.dropdown
             * @type          String
             * @default      [theme.ui.default.paddingInline]
             *
             * Specify the default padding inline for dropdown ui item
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get itemPaddingInline() {
                return api.theme.ui.default.paddingInline;
            },
            /**
             * @name          itemPaddingBlock
             * @namespace     config.themeUi.dropdown
             * @type          String
             * @default      [theme.ui.default.paddingBlock]
             *
             * Specify the default padding block for dropdown ui item
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get itemPaddingBlock() {
                return api.theme.ui.default.paddingBlock;
            },
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
            get borderRadius() {
                return api.theme.ui.default.borderRadius;
            },
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
            get transition() {
                return api.theme.ui.default.transition;
            },
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
            get defaultStyle() {
                return api.theme.ui.default.defaultStyle;
            },
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
             * @name          defaultColor
             * @namespace     config.themeUi.dropdown
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default style for your dropdown ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.default.defaultColor;
            },
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
            get outline() {
                return api.theme.ui.outline.active;
            },
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
            get paddingInline() {
                return api.theme.ui.default.paddingInline;
            },
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
            get paddingBlock() {
                return api.theme.ui.default.paddingBlock;
            },
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
            get borderRadius() {
                return api.theme.ui.default.borderRadius;
            },
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
            get borderWidth() {
                return api.theme.ui.default.borderWidth;
            },
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
            get transition() {
                return api.theme.ui.default.transition;
            },
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
             * @name          defaultColor
             * @namespace     config.themeUi.label
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default style for your label ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.default.defaultColor;
            },
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
            get depth() {
                return api.theme.ui.default.depth;
            },
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
            get rhythmVertical() {
                return api.theme.ui.default.rhythmVertical;
            },
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
            get paddingInline() {
                return api.theme.ui.default.paddingInline;
            },
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
            get paddingBlock() {
                return api.theme.ui.default.paddingBlock;
            },
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
            get borderRadius() {
                return api.theme.ui.default.borderRadius;
            },
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
            get borderWidth() {
                return api.theme.ui.default.borderWidth;
            },
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
            get transition() {
                return api.theme.ui.default.transition;
            },
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
            get defaultStyle() {
                return api.theme.ui.default.defaultStyle;
            },
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
            get defaultShape() {
                return api.theme.ui.default.defaultShape;
            },
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.fsTree
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default style for your fsTree ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.default.defaultColor;
            },
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
            get depth() {
                return api.theme.ui.default.depth;
            },
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
            get rhythmVertical() {
                return api.theme.ui.default.rhythmVertical;
            },
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
            get paddingInline() {
                return api.theme.ui.default.paddingInline;
            },
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
            get paddingBlock() {
                return api.theme.ui.default.paddingBlock;
            },
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
            get borderRadius() {
                return api.theme.ui.default.borderRadius;
            },
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
            get borderWidth() {
                return api.theme.ui.default.borderWidth;
            },
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
            get transition() {
                return api.theme.ui.default.transition;
            },
            /**
             * @name          defaultLnf
             * @namespace     config.themeUi.tabs
             * @type          Number
             * @default      [theme.ui.default.defaultStyle]
             *
             * Specify the default style for your tabs ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultLnf() {
                return api.theme.ui.default.defaultStyle;
            },
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
            get defaultShape() {
                return api.theme.ui.default.defaultShape;
            },
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.tabs
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default style for your tabs ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.default.defaultColor;
            },
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
            get depth() {
                return api.theme.ui.default.depth;
            },
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
            get outline() {
                return api.theme.ui.outline.active;
            },
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
            get rhythmVertical() {
                return api.theme.ui.default.rhythmVertical;
            },
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
            get paddingInline() {
                return api.theme.ui.default.paddingBlock;
            },
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
            get paddingBlock() {
                return api.theme.ui.default.paddingBlock;
            },
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
            get borderRadius() {
                return api.theme.ui.default.borderRadius;
            },
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
            get borderWidth() {
                return api.theme.ui.default.borderWidth;
            },
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
            get transition() {
                return api.theme.ui.default.transition;
            },
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
            get defaultStyle() {
                return api.theme.ui.default.defaultStyle;
            },
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
            get defaultShape() {
                return api.theme.ui.default.defaultShape;
            },
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.tooltip
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default style for your tooltip ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.default.defaultColor;
            },
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
            get depth() {
                return api.theme.ui.default.depth;
            },
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
             * @default      [theme.padding['50']]
             *
             * Specify the default padding inline for code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get paddingInline() {
                return api.theme.padding['50'];
            },
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.code
             * @type          String
             * @default      [theme.padding['50']]
             *
             * Specify the default padding block for code ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get paddingBlock() {
                return api.theme.padding['50'];
            },
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
            get borderRadius() {
                return api.theme.ui.default.borderRadius;
            },
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
            get borderWidth() {
                return api.theme.ui.default.borderWidth;
            },
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
            get transition() {
                return api.theme.ui.default.transition;
            },
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
            get defaultStyle() {
                return api.theme.ui.default.defaultStyle;
            },
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
            get depth() {
                return api.theme.ui.default.depth;
            },
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
            get rhythmVertical() {
                return api.theme.ui.default.rhythmVertical;
            },
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
            get paddingInline() {
                return api.theme.ui.default.paddingInline;
            },
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
            get paddingBlock() {
                return api.theme.ui.default.paddingBlock;
            },
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
            get borderRadius() {
                return api.theme.ui.default.borderRadius;
            },
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
            get borderWidth() {
                return api.theme.ui.default.borderWidth;
            },
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
            get transition() {
                return api.theme.ui.default.transition;
            },
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
            get defaultStyle() {
                return api.theme.ui.default.defaultStyle;
            },
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
            get defaultShape() {
                return api.theme.ui.default.defaultShape;
            },
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.blockquote
             * @type          String
             * @default      accent
             *
             * Specify the default style for your blockquote ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return 'accent';
            },
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
            get depth() {
                return api.theme.ui.default.depth;
            },
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
            get rhythmVertical() {
                return api.theme.ui.default.rhythmVertical;
            },
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
            get paddingInline() {
                return api.theme.ui.default.paddingInline;
            },
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
            get paddingBlock() {
                return api.theme.ui.default.paddingBlock;
            },
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
            get borderRadius() {
                return api.theme.ui.default.borderRadius;
            },
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
            get borderWidth() {
                return api.theme.border.width['10'];
            },
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
            get transition() {
                return api.theme.ui.default.transition;
            },
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
            get defaultStyle() {
                return api.theme.ui.default.defaultStyle;
            },
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
            get defaultShape() {
                return api.theme.ui.default.defaultShape;
            },
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.switch
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default style for your switch ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.default.defaultColor;
            },
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
            get depth() {
                return api.theme.ui.default.depth;
            },
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
            get rhythmVertical() {
                return api.theme.ui.default.rhythmVertical;
            },
        },
        badge: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.badge
             * @type          String
             * @default         0.6
             *
             * Specify the default padding inline for badge ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingInline: 0.6,
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.badge
             * @type          String
             * @default      0.3
             *
             * Specify the default padding block for badge ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            paddingBlock: 0.3,
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
            get borderRadius() {
                return api.theme.ui.default.borderRadius;
            },
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
            get borderWidth() {
                return api.theme.ui.default.borderWidth;
            },
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
            get transition() {
                return api.theme.ui.default.transition;
            },
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
            get defaultStyle() {
                return api.theme.ui.default.defaultStyle;
            },
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
            get defaultShape() {
                return api.theme.ui.default.defaultShape;
            },
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.badge
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default style for your badge ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.default.defaultColor;
            },
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
            get rhythmVertical() {
                return api.theme.ui.default.rhythmVertical;
            },
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
            /**
             * @name          defaultColor
             * @namespace     config.themeUi.loader
             * @type          String
             * @default      [theme.ui.default.defaultColor]
             *
             * Specify the default style for your loader ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get defaultColor() {
                return api.theme.ui.default.defaultColor;
            },
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
            get duration() {
                return api.theme.ui.loader.duration;
            },
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
            get easing() {
                return api.theme.ui.loader.easing;
            },
        },
        loaderSquareDots: {
            /**
             * @name          duration
             * @namespace     config.themeUi.loaderSquareDots
             * @type          String
             * @default      1s
             *
             * Specify the duration of the loaderSquareDots
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            duration: '1s',
        },
        loaderRound: {
            /**
             * @name          duration
             * @namespace     config.themeUi.loaderRound
             * @type          String
             * @default      [theme.ui.loader.duration]
             *
             * Specify the duration of the round loader
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get duration() {
                return api.theme.ui.loader.duration;
            },
            /**
             * @name          duration
             * @namespace     config.themeUi.loaderRound
             * @type          String
             * @default      [theme.ui.loader.easing]
             *
             * Specify the easing of the round loader
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get easing() {
                return api.theme.ui.loader.easing;
            },
        },
        loaderDrop: {
            /**
             * @name          duration
             * @namespace     config.themeUi.loaderDrop
             * @type          String
             * @default      [theme.ui.loader.duration]
             *
             * Specify the duration of the drop loader
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get duration() {
                return api.theme.ui.loader.duration;
            },
            /**
             * @name          duration
             * @namespace     config.themeUi.loaderDrop
             * @type          String
             * @default      [theme.ui.loader.easing]
             *
             * Specify the easing of the drop loader
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get easing() {
                return api.theme.ui.loader.easing;
            },
        },
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxPQUFPLEVBQUU7WUFDTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsYUFBYSxFQUFFLEdBQUc7WUFDbEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILFlBQVksRUFBRSxJQUFJO1lBQ2xCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxZQUFZLEVBQUUsQ0FBQztZQUNmOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLFdBQVc7Z0JBQ1gsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQzFDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxVQUFVO2dCQUNWLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ3JDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsWUFBWSxFQUFFLE1BQU07WUFDcEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILFlBQVksRUFBRSxPQUFPO1lBQ3JCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxZQUFZLEVBQUUsU0FBUztZQUN2Qjs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxLQUFLO2dCQUNMLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ25DLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxPQUFPO2dCQUNQLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsQ0FBQztZQUVELGNBQWMsRUFBRTtnQkFDWjs7Ozs7Ozs7OzttQkFVRztnQkFDSCxlQUFlLEVBQUUs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