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
            extends: 'themeBase',
            colorSchemas: {
                default: {
                    '0': {
                        /**
                         * @name          darken
                         * @namespace     config.themeLightBase.colorSchemas.default.0
                         * @type          Number
                         * @default      50
                         *
                         * Specify the darken value for the "0" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        darken: 50,
                    },
                    '5': {
                        /**
                         * @name          darken
                         * @namespace     config.themeLightBase.colorSchemas.default.5
                         * @type          Number
                         * @default      45
                         *
                         * Specify the darken value for the "5" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        darken: 45,
                    },
                    '10': {
                        /**
                         * @name          darken
                         * @namespace     config.themeLightBase.colorSchemas.default.10
                         * @type          Number
                         * @default      40
                         *
                         * Specify the darken value for the "10" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        darken: 40,
                    },
                    '15': {
                        /**
                         * @name          darken
                         * @namespace     config.themeLightBase.colorSchemas.default.15
                         * @type          Number
                         * @default      35
                         *
                         * Specify the darken value for the "15" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        darken: 35,
                    },
                    '20': {
                        /**
                         * @name          darken
                         * @namespace     config.themeLightBase.colorSchemas.default.20
                         * @type          Number
                         * @default      30
                         *
                         * Specify the darken value for the "20" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        darken: 30,
                    },
                    '25': {
                        /**
                         * @name          darken
                         * @namespace     config.themeLightBase.colorSchemas.default.25
                         * @type          Number
                         * @default      25
                         *
                         * Specify the darken value for the "25" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        darken: 25,
                    },
                    '30': {
                        /**
                         * @name          darken
                         * @namespace     config.themeLightBase.colorSchemas.default.30
                         * @type          Number
                         * @default      20
                         *
                         * Specify the darken value for the "30" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        darken: 20,
                    },
                    '35': {
                        /**
                         * @name          darken
                         * @namespace     config.themeLightBase.colorSchemas.default.35
                         * @type          Number
                         * @default      15
                         *
                         * Specify the darken value for the "35" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        darken: 15,
                    },
                    '40': {
                        /**
                         * @name          darken
                         * @namespace     config.themeLightBase.colorSchemas.default.40
                         * @type          Number
                         * @default      10
                         *
                         * Specify the darken value for the "40" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        darken: 10,
                    },
                    '45': {
                        /**
                         * @name          darken
                         * @namespace     config.themeLightBase.colorSchemas.default.45
                         * @type          Number
                         * @default      5
                         *
                         * Specify the darken value for the "45" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        darken: 5,
                    },
                    '50': {
                        /**
                         * @name          darken
                         * @namespace     config.themeLightBase.colorSchemas.default.50
                         * @type          Number
                         * @default      0
                         *
                         * Specify the darken value for the "50" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        darken: 0,
                    },
                    '55': {
                        /**
                         * @name          lighten
                         * @namespace     config.themeLightBase.colorSchemas.default.55
                         * @type          Number
                         * @default      5
                         *
                         * Specify the lighten value for the "55" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        lighten: 5,
                    },
                    '60': {
                        /**
                         * @name          lighten
                         * @namespace     config.themeLightBase.colorSchemas.default.60
                         * @type          Number
                         * @default      10
                         *
                         * Specify the lighten value for the "60" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        lighten: 10,
                    },
                    '65': {
                        /**
                         * @name          lighten
                         * @namespace     config.themeLightBase.colorSchemas.default.65
                         * @type          Number
                         * @default      15
                         *
                         * Specify the lighten value for the "65" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        lighten: 15,
                    },
                    '70': {
                        /**
                         * @name          lighten
                         * @namespace     config.themeLightBase.colorSchemas.default.70
                         * @type          Number
                         * @default      20
                         *
                         * Specify the lighten value for the "70" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        lighten: 20,
                    },
                    '75': {
                        /**
                         * @name          lighten
                         * @namespace     config.themeLightBase.colorSchemas.default.75
                         * @type          Number
                         * @default      25
                         *
                         * Specify the lighten value for the "75" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        lighten: 25,
                    },
                    '80': {
                        /**
                         * @name          lighten
                         * @namespace     config.themeLightBase.colorSchemas.default.80
                         * @type          Number
                         * @default      30
                         *
                         * Specify the lighten value for the "80" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        lighten: 30,
                    },
                    '85': {
                        /**
                         * @name          lighten
                         * @namespace     config.themeLightBase.colorSchemas.default.85
                         * @type          Number
                         * @default      35
                         *
                         * Specify the lighten value for the "85" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        lighten: 35,
                    },
                    '90': {
                        /**
                         * @name          lighten
                         * @namespace     config.themeLightBase.colorSchemas.default.90
                         * @type          Number
                         * @default      40
                         *
                         * Specify the lighten value for the "90" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        lighten: 40,
                    },
                    '95': {
                        /**
                         * @name          lighten
                         * @namespace     config.themeLightBase.colorSchemas.default.95
                         * @type          Number
                         * @default      45
                         *
                         * Specify the lighten value for the "95" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        lighten: 48,
                    },
                    '100': {
                        /**
                         * @name          lighten
                         * @namespace     config.themeLightBase.colorSchemas.default.100
                         * @type          Number
                         * @default      50
                         *
                         * Specify the lighten value for the "100" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        lighten: 50,
                    },
                    text: {
                        /**
                         * @name          darken
                         * @namespace     config.themeLightBase.colorSchemas.default.text
                         * @type          Number
                         * @default      0
                         *
                         * Specify the lighten value for the "text" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        darken: 0
                    },
                    placeholder: {
                        /**
                         * @name          darken
                         * @namespace     config.themeLightBase.colorSchemas.default.placeholder
                         * @type          Number
                         * @default      0
                         *
                         * Specify the darken value for the "placeholder" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        darken: 0,
                        /**
                         * @name          alpha
                         * @namespace     config.themeLightBase.colorSchemas.default.placeholder
                         * @type          Number
                         * @default      0.2
                         *
                         * Specify the alpha value for the "placeholder" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        alpha: 0.2,
                    },
                    foreground: {
                        /**
                         * @name          lighten
                         * @namespace     config.themeLightBase.colorSchemas.default.foreground
                         * @type          Number
                         * @default      50
                         *
                         * Specify the lighten value for the "foreground" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        lighten: 50,
                    },
                    background: {
                        /**
                         * @name          lighten
                         * @namespace     config.themeLightBase.colorSchemas.default.background
                         * @type          Number
                         * @default      50
                         *
                         * Specify the lighten value for the "background" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        lighten: 50,
                    },
                    backgroundForeground: {
                        /**
                         * @name          darken
                         * @namespace     config.themeLightBase.colorSchemas.default.backgroundForeground
                         * @type          Number
                         * @default      45
                         *
                         * Specify the darken value for the "backgroundForeground" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        darken: 45,
                    },
                    surface: {
                        /**
                         * @name          lighten
                         * @namespace     config.themeLightBase.colorSchemas.default.surface
                         * @type          Number
                         * @default      35
                         *
                         * Specify the lighten value for the "surface" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        lighten: 35,
                    },
                    surfaceForeground: {
                        /**
                         * @name          lighten
                         * @namespace     config.themeLightBase.colorSchemas.default.surfaceForeground
                         * @type          Number
                         * @default      45
                         *
                         * Specify the lighten value for the "surfaceForeground" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        darken: 45,
                    },
                    ui: {
                        /**
                         * @name          lighten
                         * @namespace     config.themeLightBase.colorSchemas.default.ui
                         * @type          Number
                         * @default      50
                         *
                         * Specify the lighten value for the "ui" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        lighten: 50,
                    },
                    uiForeground: {
                        /**
                         * @name          darken
                         * @namespace     config.themeLightBase.colorSchemas.default.uiForeground
                         * @type          Number
                         * @default      25
                         *
                         * Specify the darken value for the "uiForeground" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        darken: 25,
                    },
                    border: {
                        /**
                         * @name          alpha
                         * @namespace     config.themeLightBase.colorSchemas.default.border
                         * @type          Number
                         * @default      0.2
                         *
                         * Specify the alpha value for the "border" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        alpha: 0.2,
                    },
                    gradientStart: {
                        /**
                         * @name          lighten
                         * @namespace     config.themeLightBase.colorSchemas.default.gradientStart
                         * @type          Number
                         * @default      0
                         *
                         * Specify the lighten value for the "gradientStart" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        lighten: 0,
                    },
                    gradientEnd: {
                        /**
                         * @name          lighten
                         * @namespace     config.themeLightBase.colorSchemas.default.gradientEnd
                         * @type          Number
                         * @default      20
                         *
                         * Specify the lighten value for the "gradientEnd" color variant
                         *
                         * @since       2.0.0
                         * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
                         */
                        lighten: 20,
                    },
                },
            },
        };
    }
    exports.default = default_1;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWVMaWdodEJhc2UuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidGhlbWVMaWdodEJhc2UuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0lBQUEsbUJBQXlCLEdBQUcsRUFBRSxNQUFNO1FBQ2hDLE9BQU87WUFDSCxPQUFPLEVBQUUsV0FBVztZQUVwQixZQUFZLEVBQUU7Z0JBQ1YsT0FBTyxFQUFFO29CQUNMLEdBQUcsRUFBRTt3QkFDRDs7Ozs7Ozs7OzsyQkFVRzt3QkFDSCxNQUFNLEVBQUUsRUFBRTtxQkFDYjtvQkFDRCxHQUFHLEVBQUU7d0JBQ0Q7Ozs7Ozs7Ozs7MkJBVUc7d0JBQ0gsTUFBTSxFQUFFLEVBQUU7cUJBQ2I7b0JBQ0QsSUFBSSxFQUFFO3dCQUNGOzs7Ozs7Ozs7OzJCQVVHO3dCQUNILE1BQU0sRUFBRSxFQUFFO3FCQUNiO29CQUNELElBQUksRUFBRTt3QkFDRjs7Ozs7Ozs7OzsyQkFVRzt3QkFDSCxNQUFNLEVBQUUsRUFBRTtxQkFDYjtvQkFDRCxJQUFJLEVBQUU7d0JBQ0Y7Ozs7Ozs7Ozs7MkJBVUc7d0JBQ0gsTUFBTSxFQUFFLEVBQUU7cUJBQ2I7b0JBQ0QsSUFBSSxFQUFFO3dCQUNGOzs7Ozs7Ozs7OzJCQVVHO3dCQUNILE1BQU0sRUFBRSxFQUFFO3FCQUNiO29CQUNELElBQUksRUFBRTt3QkFDRjs7Ozs7Ozs7OzsyQkFVRzt3QkFDSCxNQUFNLEVBQUUsRUFBRTtxQkFDYjtvQkFDRCxJQUFJLEVBQUU7d0JBQ0Y7Ozs7Ozs7Ozs7MkJBVUc7d0JBQ0gsTUFBTSxFQUFFLEVBQUU7cUJBQ2I7b0JBQ0QsSUFBSSxFQUFFO3dCQUNGOzs7Ozs7Ozs7OzJCQVVHO3dCQUNILE1BQU0sRUFBRSxFQUFFO3FCQUNiO29CQUNELElBQUksRUFBRTt3QkFDRjs7Ozs7Ozs7OzsyQkFVRzt3QkFDSCxNQUFNLEVBQUUsQ0FBQztxQkFDWjtvQkFDRCxJQUFJLEVBQUU7d0JBQ0Y7Ozs7Ozs7Ozs7MkJB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