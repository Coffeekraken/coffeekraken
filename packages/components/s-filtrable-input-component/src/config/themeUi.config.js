(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = (env, config) => {
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                defaultStyle: 'solid',
                /**
                 * @name          depth
                 * @namespace     config.themeUi.filtrableInput
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
                 * @name          outline
                 * @namespace     config.themeUi.filtrableInput
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
                 * @namespace     config.themeUi.filtrableInput
                 * @type          Object
                 * @default      [theme.ui.default.rhythmVertical]
                 *
                 * Specify the default vertical rhythm for your filtrable input ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                rhythmVertical: '[theme.ui.default.rhythmVertical]',
            },
        };
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVVaS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZVVpLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLGtCQUFlLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzNCLE9BQU87WUFDSCxjQUFjLEVBQUU7Z0JBQ1o7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsYUFBYSxFQUFFLGtDQUFrQztnQkFDakQ7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsWUFBWSxFQUFFLGlDQUFpQztnQkFDL0M7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsWUFBWSxFQUFFLGlDQUFpQztnQkFDL0M7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsV0FBVyxFQUFFLGdDQUFnQztnQkFDN0M7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsVUFBVSxFQUFFLCtCQUErQjtnQkFDM0M7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsWUFBWSxFQUFFLGlDQUFpQztnQkFDL0M7Ozs7Ozs7Ozs7bUJBVUc7Z0JBQ0gsWUFBWSxFQUFFLE9BQU87Z0JBQ3JCOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSxHQUFHO2dCQUNWOzs7Ozs7Ozs7O21CQVVHO2dCQUNILE9BQU8sRUFBRSwyQkFBMkI7Z0JBQ3BDOzs7Ozs7Ozs7O21CQVVHO2dCQUNILGNBQWMsRUFBRSxtQ0FBbUM7YUFDdEQ7U0FDSixDQUFDO0lBQ04sQ0FBQyxDQUFDIn0=