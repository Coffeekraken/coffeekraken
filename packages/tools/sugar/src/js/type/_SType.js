// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../object/deepMerge", "./parseTypeString"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var parseTypeString_1 = __importDefault(require("./parseTypeString"));
    /**
     * @name                SType
     * @namespace           sugar.js.type
     * @type                Class
     *
     * This class is the main one that MUST be used as parent one
     * when creating any type like object, string, etc...
     *
     * @param       {ISTypeSettings}      settings        An object of setting to configure your descriptor instance
     *
     * @example       js
     * import SType from '@coffeekraken/sugar/js/descriptor/SType';
     * class MyDescriptor extends SType {
     *    constructor(settings) {
     *      super(settings);
     *      // do something...
     *    }
     * }
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    var Cls = (_a = /** @class */ (function () {
            /**
             * @name      constructor
             * @type      Function
             * @constructor
             *
             * Constructor
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            function SType(typeString, settings) {
                if (settings === void 0) { settings = {}; }
                /**
                 * @name      array
                 * @type      Boolean
                 *
                 * This specify if this type instance represent an array of types
                 *
                 * @since       2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                this.array = false;
                // parse the typeString
                if (typeString.includes('|') !== -1) {
                    var parsedString = parseTypeString_1.default(typeString);
                    console.log('parsed', parsedString);
                }
                else {
                    // check if we got a [] at the end
                    if (typeString.match(/\[\]$/gm)) {
                        // mark this type as array
                        this.array = true;
                    }
                    this.type = typeString.replace('[]', '').trim();
                }
                // save the settings
                this._settings = deepMerge_1.default({}, this.constructor.settings, settings);
            }
            /**
             * @name      registerType
             * @type      Function
             * @static
             *
             * This static method allows you to register a new rule
             * by passing a valid ISDescriptorRule object
             *
             * @param     {ISDescriptorRule}        rule        The rule object to register
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com>
             */
            SType.registerType = function (type) {
                if (type.id === undefined || typeof type.id !== 'string') {
                    throw "Sorry but you try to register a type that does not fit the ISTypeDescriptor interface...";
                }
                this._registeredTypes[type.id] = type;
            };
            Object.defineProperty(SType.prototype, "name", {
                /**
                 * @name          name
                 * @type          String
                 * @get
                 *
                 * Access the descriptor name. Either the value of settings.name, or the constructor name
                 *
                 * @since         2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com>
                 */
                get: function () {
                    return this._settings.name !== undefined
                        ? this._settings.name
                        : this.constructor.name;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(SType.prototype, "id", {
                /**
                 * @name          id
                 * @type          String
                 * @get
                 *
                 * Access the descriptor id. Either the value of settings.name, or the constructor name
                 *
                 * @since         2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com>
                 */
                get: function () {
                    return this._settings.id !== undefined
                        ? this._settings.id
                        : this.constructor.id;
                },
                enumerable: false,
                configurable: true
            });
            return SType;
        }()),
        /**
         * @name      _registeredTypes
         * @type      ISTypeRegisteredTypes
         * @static
         *
         * Store the registered _registeredTypes into a simple object
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com>
         */
        _a._registeredTypes = {},
        _a);
    return Cls;
});
