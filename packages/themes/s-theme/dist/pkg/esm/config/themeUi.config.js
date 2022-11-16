export default (api) => {
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
             * @name          defaultLnf
             * @namespace     config.themeUi.default
             * @type          String
             * @default      default
             *
             * Specify the default style for ui's.
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultLnf: 'default',
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
             * @name          defaultLnf
             * @namespace     config.themeUi.form
             * @type          String
             * @default      default
             *
             * Specify the default style for form items
             *
             * @since       2.0.0
             * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
             */
            defaultLnf: 'default',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGVBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLE1BQU07UUFBRSxPQUFPO0lBRXhDLE9BQU87UUFDSCxPQUFPLEVBQUU7WUFDTDs7Ozs7Ozs7OztlQVVHO1lBQ0gsYUFBYSxFQUFFLEdBQUc7WUFDbEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILFlBQVksRUFBRSxJQUFJO1lBQ2xCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxZQUFZLEVBQUUsQ0FBQztZQUNmOzs7Ozs7Ozs7O2VBVUc7WUFDSCxJQUFJLFdBQVc7Z0JBQ1gsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQzFDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsSUFBSSxVQUFVO2dCQUNWLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ3JDLENBQUM7WUFFRDs7Ozs7Ozs7OztlQVVHO1lBQ0gsWUFBWSxFQUFFLE1BQU07WUFDcEI7Ozs7Ozs7Ozs7ZUFVRztZQUNILFlBQVksRUFBRSxPQUFPO1lBQ3JCOzs7Ozs7Ozs7O2VBVUc7WUFDSCxVQUFVLEVBQUUsU0FBUztZQUNyQjs7Ozs7Ozs7OztlQVVHO1lBQ0gsWUFBWSxFQUFFLFNBQVM7WUFDdkI7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksS0FBSztnQkFDTCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNuQyxDQUFDO1lBQ0Q7Ozs7Ozs7Ozs7ZUFVRztZQUNILElBQUksT0FBTztnQkFDUCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUM7WUFDdkMsQ0FBQztZQUNEOzs7Ozs7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