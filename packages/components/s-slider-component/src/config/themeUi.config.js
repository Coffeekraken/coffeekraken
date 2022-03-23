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
    function default_1(env, config) {
        return {
            slider: {
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
                 * @name          transition
                 * @namespace     config.themeUi.button
                 * @type          String
                 * @default      all .5s ease-in-out
                 *
                 * Specify the default transition for button ui
                 *
                 * @since       2.0.0
                 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                 */
                transition: 'all .5s ease-in-out',
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
                depth: '[theme.ui.default.depth]'
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVVaS5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZVVpLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztJQUFBLG1CQUF3QixHQUFHLEVBQUUsTUFBTTtRQUMvQixPQUFPO1lBQ0gsTUFBTSxFQUFFO2dCQUNKOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFlBQVksRUFBRSxpQ0FBaUM7Z0JBQy9DOzs7Ozs7Ozs7O21CQVVHO2dCQUNILFVBQVUsRUFBRSxxQkFBcUI7Z0JBQ2pDOzs7Ozs7Ozs7O21CQVVHO2dCQUNILEtBQUssRUFBRSwwQkFBMEI7YUFDcEM7U0FDSixDQUFBO0lBQ0wsQ0FBQztJQXpDRCw0QkF5Q0MifQ==