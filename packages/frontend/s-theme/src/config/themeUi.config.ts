/**
 * @name                    themeUi
 * @as                      UI
 * @namespace               config
 * @type                    Config
 * @plateform               node
 * @status                  beta
 *
 * Specify the @coffeekraken/s-theme UI available configurations
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export default (api) => {
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
             * @name          defaultLnf
             * @namespace     config.themeUi.default
             * @type          String
             * @default      solid
             *
             * Specify the default lnf for ui's.
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultLnf: 'solid',

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
             * @name          color
             * @namespace     config.themeUi.scrollbar
             * @type          String
             * @default      accent
             *
             * Specify the default color for scrollbar
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            color: 'accent',
        },
        label: {
            /**
             * @name          defaultLnf
             * @namespace     config.themeUi.label
             * @type          String
             * @default      inline
             *
             * Specify the default style for your label ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultLnf: 'inline',
        },
        dropdown: {
            /**
             * @name          paddingInline
             * @namespace     config.themeUi.dropdown
             * @type          String
             * @default      [theme.ui.default.paddingBlock]
             *
             * Specify the default padding inline for dropdown ui item
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get paddingInline() {
                return api.theme.ui.default.paddingBlock;
            },
            /**
             * @name          paddingBlock
             * @namespace     config.themeUi.dropdown
             * @type          String
             * @default      [theme.ui.default.paddingBlock]
             *
             * Specify the default padding block for dropdown ui item
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            get paddingBlock() {
                return api.theme.ui.default.paddingBlock;
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
        },
        list: {
            /**
             * @name          defaultLnf
             * @namespace     config.themeUi.list
             * @type          Number
             * @default      dl
             *
             * Specify the default style for your list ui
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultLnf: 'dl',
            /**
             * @name          bulletChar
             * @namespace     config.themeUi.list
             * @type          String
             * @default      -
             *
             * Specify if the bullet character to use
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            bulletChar: '-',
        },
        fsTree: {
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
        },
        tooltip: {
            /**
             * @name          defaultPosition
             * @namespace     config.themeUi.tooltip
             * @type          Object
             * @default      top
             *
             * Specify if the default position of the tooltips
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultPosition: 'top',
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
    };
};
