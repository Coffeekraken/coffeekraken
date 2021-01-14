// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../descriptor/SDescriptor", "./getAvailableInterfaceTypes", "../object/deepMerge", "./SInterfaceResult"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    var SDescriptor_1 = __importDefault(require("../descriptor/SDescriptor"));
    var getAvailableInterfaceTypes_1 = __importDefault(require("./getAvailableInterfaceTypes"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var SInterfaceResult_1 = __importDefault(require("./SInterfaceResult"));
    /**
     * @name            SInterface
     * @namespace       sugar.js.interface
     * @type            Class
     *
     * This class allows you to define some rules that some object or instance
     * have to follow. You will be able to apply these rules and see what
     * does not fit correctly.
     *
     * @todo         doc
     * @todo        tests
     * @todo        add possibility to set a "details" on each rules for better returns
     *
     * @example         js
     * import SInterface from '@coffeekraken/sugar/js/interface/SInterface';
     * class MyCoolInterface extends SInterface {
     *     static rules = {
     *          myProperty: {
     *              type: 'String',
     *              required: true
     *          }
     *      }
     * }
     * MyCoolInterface.apply({
     *      myProperty: 'Hello'
     * }); // => true
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    // @ts-ignore
    (global || window)._registeredInterfacesTypes = {};
    var Cls = (_a = /** @class */ (function () {
            /**
             * @name              constructor
             * @type              Function
             * @constructor
             *
             * Constructor
             *
             * @since         2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            function SInterface(settings) {
                if (settings === void 0) { settings = {}; }
                /**
                 * @name              _definition
                 * @type              ISDescriptorRules
                 * @private
                 *
                 * This property store all the SDescriptor rules that this interface
                 * implements for each properties
                 *
                 * @since             2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                this._definition = {};
                /**
                 * @name              _settings
                 * @type              ISDescriptorRules
                 * @private
                 *
                 * This property store all the settings for your SInterface instance
                 *
                 * @since             2.0.0
                 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
                 */
                this._settings = {
                    arrayAsValue: false,
                    throw: false,
                    complete: true
                };
                // @ts-ignore
                this._settings = deepMerge_1.default(
                // @ts-ignore
                this.constructor.settings, this._settings, settings);
                if (this._settings.name === undefined)
                    this._settings.name = this.constructor.name;
                // @ts-ignore
                this._definition = this.constructor.definition;
            }
            /**
             * @name            getAvailableTypes
             * @type            Function
             * @static
             *
             * This static method allows you to get the types that have been make widely available
             * using the ```makeAvailableAsType``` method.
             *
             * @return      {Object<SInterface>}          An object listing all the interface types maked available widely
             *
             * @since     2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SInterface.getAvailableTypes = function () {
                return getAvailableInterfaceTypes_1.default();
            };
            /**
             * @name            makeAvailableAsType
             * @type            Function
             * @static
             *
             * This static method allows you to promote your interface at the level where it can be
             * used in the "type" interface definition property like so "Object<MyCoolType>"
             *
             * @param       {String}      [name=null]       A custom name to register your interface. Otherwise take the class name and register two types: MyClassInterface => MyClassInterface && MyClass
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SInterface.makeAvailableAsType = function (name) {
                if (name === void 0) { name = null; }
                var n = (name || this.name).toLowerCase();
                if (global !== undefined) {
                    // @ts-ignore
                    global._registeredInterfacesTypes[n] = this;
                    // @ts-ignore
                    global._registeredInterfacesTypes[n.replace('interface', '')] = this;
                }
                else if (window !== undefined) {
                    // @ts-ignore
                    window._registeredInterfacesTypes[n] = this;
                    // @ts-ignore
                    window._registeredInterfacesTypes[n.replace('interface', '')] = this;
                }
            };
            /**
             * @name              defaults
             * @type              Function
             * @static
             *
             * This function simply returns you the default interface values in object format
             *
             * @since         2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SInterface.defaults = function () {
                var result = this.apply({}, {
                    complete: true,
                    throw: false,
                    throwOnMissingRequiredProp: false
                });
                if (!result.hasIssues())
                    return result.value;
                return {};
            };
            /**
             * @name              apply
             * @type              Function
             * @static
             *
             * This static method allows you to apply the interface on an object instance.
             * By default, if something is wrong in your class implementation, an error with the
             * description of what's wrong will be thrown. You can change that behavior if you prefer having
             * true returned when all is ok, or a string describing the current issue by specify the "settings.throw" property to false.
             *
             * @param       {Any}                instance              The instance to apply the interface on
             * @param       {ISInterfaceSettings}               [settings={}]         An object of settings to configure your apply process
             * - throw (false) {Boolean}: Specify if you want that an error is throwned if the test does not pass
             * - return (String) {String}: Specify in which return you want the result back. Can be "String" of "Object".
             * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SInterface.apply = function (instance, settings) {
                if (settings === void 0) { settings = {}; }
                // instanciate a new SInterface
                var int = new this(settings);
                return int.apply(instance, settings);
            };
            /**
             * @name              apply
             * @type              Function
             *
             * This method allows you to apply the interface on an object instance.
             * By default, if something is wrong in your class implementation, an error with the
             * description of what's wrong will be thrown. You can change that behavior if you prefer having
             * true returned when all is ok, or a string describing the current issue by specify the "settings.throw" property to false.
             *
             * @param       {Any}                instance              The instance to apply the interface on
             * @param       {ISInterfaceSettings}               [settings={}]         An object of settings to configure your apply process
             * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
             */
            SInterface.prototype.apply = function (instance, settings) {
                if (settings === void 0) { settings = {}; }
                settings = deepMerge_1.default(this._settings, settings);
                var descriptor = new SDescriptor_1.default(__assign({ name: settings.name, type: 'Object', rules: this._definition, arrayAsValue: settings.arrayAsValue, complete: settings.complete === undefined ? true : settings.complete, throw: false, throwOnMissingRequiredProp: settings.throwOnMissingRequiredProp }, (settings.descriptorSettings || {})));
                var descriptorResult = descriptor.apply(instance);
                // instanciate a new interface result object
                var interfaceResult = new SInterfaceResult_1.default({
                    descriptorResult: descriptorResult
                });
                if (interfaceResult.hasIssues() && settings.throw) {
                    throw interfaceResult.toString();
                }
                // return new result object
                return interfaceResult;
            };
            return SInterface;
        }()),
        /**
         * @name              definition
         * @type              ISDescriptorRules
         * @static
         *
         * This property store all the SDescriptor rules that this interface
         * implements for each properties
         *
         * @since             2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        _a.definition = {},
        /**
         * @name              settings
         * @type              ISDescriptorRules
         * @static
         *
         * This property store all the settings for your SInterface class. These settings
         * can be overrided at instance level
         *
         * @since             2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        _a.settings = {},
        _a);
    return Cls;
});
//# sourceMappingURL=SInterface.js.map