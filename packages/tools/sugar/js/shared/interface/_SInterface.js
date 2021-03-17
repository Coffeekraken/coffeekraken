// @shared
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
        define(["require", "exports", "../descriptor/SDescriptor", "../object/deepMerge", "./getAvailableInterfaceTypes", "./SInterfaceResult"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SDescriptor_1 = __importDefault(require("../descriptor/SDescriptor"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var getAvailableInterfaceTypes_1 = __importDefault(require("./getAvailableInterfaceTypes"));
    var SInterfaceResult_1 = __importDefault(require("./SInterfaceResult"));
    // @ts-ignore
    (global || window)._registeredInterfacesTypes = {};
    var SInterface = /** @class */ (function () {
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
             * @type              ISInterfaceDefinitionMap
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
             * @type              ISInterfaceSettings
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
            this._settings = deepMerge_1.default(this.constructor.settings, this._settings, settings);
            if (this._settings.name === undefined)
                this._settings.name =
                    this.constructor.overridedName || this.constructor.name;
            this._definition = this.constructor.definition;
        }
        Object.defineProperty(SInterface, "definition", {
            get: function () {
                if (!this._definition.help) {
                    this._definition.help = {
                        type: 'Boolean',
                        description: "Display the help for this \"<yellow>" + this.name + "</yellow>\" interface...",
                        default: false
                    };
                }
                return this._definition;
            },
            set: function (value) {
                this._definition = value;
            },
            enumerable: false,
            configurable: true
        });
        SInterface.registerRenderer = function (rendererClass) {
            if (!rendererClass.id) {
                throw new Error("Sorry but the interface renderer \"<yellow>" + rendererClass.name + "</yellow>\" that you want to register is missing the required <yellow>static</yellow> <green>id</green> property...");
            }
            this._registeredRenderers[rendererClass.id] = rendererClass;
        };
        /**
         * @name      overrie
         * @type      Function
         * @static
         *
         * This static method is usefull to make a duplicate of the base interface with some updates
         * in the definition object.
         *
         * @param     {Object}      definition      A definition object to override or extends the base one
         * @return    {SInterface}                  A new interface overrided with your new values
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SInterface.override = function (definition) {
            var _this = this;
            var SInterfaceOverrided = /** @class */ (function (_super) {
                __extends(SInterfaceOverrided, _super);
                function SInterfaceOverrided() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                SInterfaceOverrided.overridedName = _this.name + " (overrided)";
                SInterfaceOverrided.definition = deepMerge_1.default(_this.definition, definition);
                return SInterfaceOverrided;
            }(this));
            return SInterfaceOverrided;
        };
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
                throw: false
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
         * @name            help
         * @type            Function
         * @static
         *
         * This static method allows you to get back the help using the
         * passed renderer. Awailable rendered are for now:
         * - terminal (default): The default terminal renderer
         * - more to come depending on needs...
         *
         * @param         {String}          [renderer="terminal"]        The registered renderer you want to use.
         * @param         {ISInterfaceRendererSettings}     [settings={}]     Some settings to configure your render
         *
         * @setting     {'terminal'}        [renderer="terminal"]       The renderer you want to use.
         * @setting     {Array<String>}     [exclude=['help']]                An array of properties you don't want to render
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SInterface.render = function (renderer, settings) {
            if (renderer === void 0) { renderer = 'terminal'; }
            var set = deepMerge_1.default({
                renderer: 'terminal',
                exclude: ['help']
            }, settings);
            // check that the renderer is registered
            if (!this._registeredRenderers[renderer]) {
                throw new Error("Sorry but the requested renderer \"<yellow>" + renderer + "</yellow>\" does not exists... Here's the available renderers: <green>" + Object.keys(this._registeredRenderers).join(', ') + "</green>");
            }
            // instanciate the renderer and render the interface
            var rendererInstance = new this._registeredRenderers[renderer](this, set);
            return rendererInstance.render();
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
            var descriptor = new SDescriptor_1.default(__assign({ id: settings.id, name: settings.name, type: 'Object', rules: this._definition, arrayAsValue: settings.arrayAsValue, complete: settings.complete === undefined ? true : settings.complete, throw: false }, (settings.descriptorSettings || {})));
            var descriptorResult = descriptor.apply(instance);
            // nativeConsole.log('in', this._definition);
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
        // static definition: ISDescriptorRules = {};
        // @ts-ignore
        SInterface._definition = {};
        /**
         * @name      registerRenderer
         * @type      Function
         * @static
         *
         * This static method allows you to register a renderer that you can then
         * use through the ```interface.render('{rendererId}')``` interface method
         *
         * @param     {SInterfaceRenderer}      rendererClass       The renderer class you want to register
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SInterface._registeredRenderers = {};
        /**
         * @name              settings
         * @type              ISInterfaceSettings
         * @static
         *
         * This property store all the settings for your SInterface class. These settings
         * can be overrided at instance level
         *
         * @since             2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        SInterface.settings = {};
        return SInterface;
    }());
    exports.default = SInterface;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2hhcmVkL2ludGVyZmFjZS9fU0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVWLDBFQUdtQztJQUVuQyxrRUFBOEM7SUFDOUMsNEZBQXdFO0lBRXhFLHdFQUEyRTtJQXVFM0UsYUFBYTtJQUNiLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztJQUNuRDtRQW9RRTs7Ozs7Ozs7O1dBU0c7UUFDSCxvQkFBWSxRQUFrQztZQUFsQyx5QkFBQSxFQUFBLGFBQWtDO1lBdEo5Qzs7Ozs7Ozs7OztlQVVHO1lBQ0gsZ0JBQVcsR0FBNkIsRUFBRSxDQUFDO1lBZTNDOzs7Ozs7Ozs7ZUFTRztZQUNILGNBQVMsR0FBd0I7Z0JBQy9CLFlBQVksRUFBRSxLQUFLO2dCQUNuQixLQUFLLEVBQUUsS0FBSztnQkFDWixRQUFRLEVBQUUsSUFBSTthQUNmLENBQUM7WUErR0EsYUFBYTtZQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDcEIsSUFBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQ2hDLElBQUksQ0FBQyxTQUFTLEVBQ2QsUUFBUSxDQUNULENBQUM7WUFDRixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLFNBQVM7Z0JBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTtvQkFDWCxJQUFJLENBQUMsV0FBWSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUVuRSxJQUFJLENBQUMsV0FBVyxHQUFTLElBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1FBQ3hELENBQUM7UUEzUUQsc0JBQVcsd0JBQVU7aUJBQXJCO2dCQUNFLElBQUksQ0FBQyxJQUFJLENB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